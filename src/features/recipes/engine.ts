// Design Decision Engine: deterministic composition of curated ingredients into a Universal Recipe.
// Same spec in → same recipe out. Remix = change one spec field and recompose.

import { characters, directions, goals, leads, motionLevels, purposes } from '@/data/taxonomy'
import { accentSets, colorRoles, layouts, palettes, typography } from '@/data/ingredients'
import { GENERIC_TELLS, components, concepts, heroes, imagePresentations, media, motionPatterns, footerStyles, navStyles, pageTypes, sections, shapeStyles, signaturePatterns, UI_ALWAYS, uiByGoal, uiByPage, uiBySection, uiNames } from '@/data/patterns'
import { recipeSeeds, seedBySlug } from '@/data/recipes'
import { MAX_HEAVY_PIECES, behaviourOf, pieces as pieceCatalog } from '@/data/pieces'
import { blockFor, heroBlocks } from '@/data/blocks'
import { sectionVariants, variantFor } from '@/data/section-variants'
import { resources } from '@/data/resources'
import { lookKnowledge } from '@/data/look-knowledge'
import { contrast, contrastLabel, isHex, oklab } from '@/lib/color'
import { FRAMES } from '@/lib/frame'
import type { TakenPart,
  Shot, InspirationReference,
  AssetCreationPath, AssetRequirement, ChromeId, ConceptId, RecipeConcept, FooterStyle, AssetSpec, BehaviourId, Brief, BuildTarget, DirectionId, ColorRole, ColorToken, ComponentId, HeroId, HeroPattern, ImagePresentationId, ImageryPlan, PieceId, RecipePiece,
  FamilyId, GoalId, LeadId, LayoutId, MediaPlacement, MotionPattern, FooterStyleId, SectionTone, MotionLevel, NavStyleId, ShapeStyle, UiKit, SignaturePattern, PageBlueprint, PageSection, ShapeId, SignatureMoment, PageSpec, PageTypeId, PaletteColors, PaletteId, PurposeId, RecipeSeed, RecipeSpec, SectionId, TypographyId, UniversalRecipe,
} from '@/types/domain'

// ─── Spec helpers ────────────────────────────────────────────────────────────

export function defaultPagesFor(purpose: PurposeId, starter?: string): PageSpec[] {
  return (purposes[purpose].starters?.find((s) => s.id === starter)?.pages ?? purposes[purpose].pages).filter((p) => p.tier === 'recommended').map((p) => ({
    id: crypto.randomUUID().slice(0, 8),
    type: p.type,
    label: p.label,
    purpose: pageTypes[p.type].defaultPurpose,
    sections: p.sections ?? pageTypes[p.type].sections,
  }))
}

export function specFromSeed(seed: RecipeSeed): RecipeSpec {
  return { ...seed.spec, base: seed.slug, assets: [], pages: defaultPagesFor(seed.spec.purpose), target: 'not-sure' }
}

export function heroOptions(lead: LeadId, motion: MotionLevel): HeroPattern[] {
  return Object.values(heroes).filter((h) => h.leads.includes(lead) && h.motion.includes(motion))
}

export function resolveHero(spec: Pick<RecipeSpec, 'lead' | 'motion' | 'hero'> & { direction?: DirectionId }): HeroPattern {
  const options = heroOptions(spec.lead, spec.motion)
  const chosen = spec.hero && options.find((h) => h.id === spec.hero)
  if (chosen) return chosen
  const preferred = spec.direction && directions[spec.direction].hero
  if (preferred && options.some((h) => h.id === preferred)) return heroes[preferred]
  const byLead: Record<LeadId, HeroId> = {
    photography: spec.motion === 'dynamic' || spec.motion === 'immersive' ? 'parallax-photo' : 'editorial-image',
    video: spec.motion === 'immersive' ? 'scroll-video' : 'ambient-video',
    typography: spec.motion === 'dynamic' || spec.motion === 'immersive' ? 'kinetic-type' : 'type-statement',
    product: 'product-stage', illustration: 'illustrated', '3d': 'webgl-scene',
  }
  return heroes[byLead[spec.lead]]
}

/** Trust boundary for the free-text + id parts of the brief (they come back from localStorage). */
function cleanBrief(b: unknown): Brief | undefined {
  if (!b || typeof b !== 'object') return undefined
  const x = b as Record<string, unknown>
  const text = (v: unknown, max: number) => (typeof v === 'string' && v.trim() ? v.trim().slice(0, max) : undefined)
  const goal = typeof x.goal === 'string' && Object.hasOwn(goals, x.goal) ? (x.goal as Brief['goal']) : undefined
  return { name: text(x.name, 60), offer: text(x.offer, 160), goal, photos: text(x.photos, 400) }
}

/** Known ids only, no repeats, one per slot (the later pick wins) — so a kit never gives a page two voices for one job.
 *  Whole-site extras (preloader, smooth scroll, sound…) each do their own job, so they never replace each other. */
export function cleanPieces(ids: unknown): PieceId[] {
  if (!Array.isArray(ids)) return []
  const bySlot = new Map<string, PieceId>()
  for (const id of ids) if (typeof id === 'string' && Object.hasOwn(pieceCatalog, id)) { const p = pieceCatalog[id as PieceId]; bySlot.set(p.slot === 'site' ? p.id : p.slot, id as PieceId) }
  const keep = new Set(bySlot.values())
  return [...new Set(ids as PieceId[])].filter((id) => keep.has(id))
}

/** Soft problems with a kit for this recipe: said plainly, never silently removed (the user may keep a piece). */
export function pieceIssues(spec: Pick<RecipeSpec, 'motion' | 'pieces'>): Partial<Record<PieceId, string>> {
  const out: Partial<Record<PieceId, string>> = {}
  const ids = spec.pieces ?? []
  for (const id of ids) {
    if (!pieceCatalog[id].levels.includes(spec.motion)) out[id] = `Needs more movement than “${motionLevels[spec.motion].name}” — it will feel out of place.`
  }
  ids.filter((id) => pieceCatalog[id].heavy).slice(MAX_HEAVY_PIECES).forEach((id) => { out[id] = `More than ${MAX_HEAVY_PIECES} big interactive pieces compete for attention — keep the one that matters most.` })
  return out
}

/** Places each kit piece on the first page section it suits; navbar/footer pieces go to the site chrome. */
function placePieces(spec: RecipeSpec, pages: PageBlueprint[], signatures: SignatureMoment[]): RecipePiece[] {
  const issues = pieceIssues(spec)
  // Each photo section's layout brings its own piece (marquee, ring, field…) onto that very section.
  const fromPhotos = new Map<PieceId, string[]>()
  for (const pg of pages) for (const s of pg.sections) if (s.photos?.piece) fromPhotos.set(s.photos.piece, [...(fromPhotos.get(s.photos.piece) ?? []), `${pg.label} → ${s.name} (its photo layout)`])
  const WHERE: Record<BehaviourId, string> = { headlines: 'Every page — the h1, plus at most two section headings per page (not every heading)', links: 'Every page — menu, footer and text links', buttons: 'Every page — the main action', transitions: 'Whole site — every internal link; mount once in app/layout.tsx', site: 'Whole site — mount once in app/layout.tsx' }
  // A signature moment with a ready piece brings that piece to where the moment lands (a whole-site piece to the root layout).
  for (const m of signatures) {
    const id = signaturePatterns.find((p) => p.id === m.id)?.piece
    if (id) fromPhotos.set(id, [...(fromPhotos.get(id) ?? []), pieceCatalog[id].slot === 'site' ? `${WHERE.site} (the “${m.name}” moment, ${m.where})` : `${m.where} (the “${m.name}” moment)`])
  }
  const ids = uniq([...(spec.pieces ?? []), ...fromPhotos.keys()])
  return ids.map((id) => {
    const p = pieceCatalog[id]
    const b = behaviourOf(id)
    const placed = [...(spec.piecePlacements ?? []).filter((x) => x.piece === id).map((x) => { if (x.page === '*') return b ? WHERE[b] : pieceCatalog[id].slot === 'site' ? WHERE.site : 'Menu and footer — on every page'; const pg = pages.find((q) => q.id === x.page)!; return `${pg.label} → ${pg.sections[x.index].name.split(' — ')[0]}` }), ...(fromPhotos.get(id) ?? [])]
    const hit = pages.flatMap((pg) => pg.sections.map((s) => ({ pg, s }))).find(({ s }) => p.sections.includes(s.id))
    const chrome = p.sections.find((s) => s === 'navbar' || s === 'footer')
    const where = placed.length ? placed.join('; ') : hit ? `${hit.pg.label} → ${hit.s.name.split(' — ')[0]}` : chrome ? (chrome === 'navbar' ? 'Navigation (every page)' : 'Footer (every page)') : 'The home page section where it fits best'
    return { ...p, where, path: `src/components/pieces/${p.file}`, ...(issues[id] ? { issue: issues[id] } : {}) }
  })
}

/** Keeps a spec coherent after any change (kit or Remix). Only dependent decisions move. */
const TAKEN_KINDS = ['site', 'like', 'section', 'hero', 'menu', 'footer', 'effect']
export const cleanTaken = (x: unknown): TakenPart[] | undefined => {
  const t = Array.isArray(x) ? x.filter((i): i is TakenPart => !!i && typeof i.site === 'string' && /^(example|seed):[a-z0-9-]{1,60}$/.test(i.site) && TAKEN_KINDS.includes(i.kind) && typeof i.id === 'string') : []
  return t.length ? t : undefined
}

export function normalizeSpec(spec: RecipeSpec): RecipeSpec {
  const next = { ...spec, characters: spec.characters.slice(0, 2), brief: cleanBrief(spec.brief) }
  if (!next.brief) delete next.brief
  if (next.taken !== undefined) { const t = cleanTaken(next.taken); if (t) next.taken = t; else delete next.taken }
  if (next.hero && !heroOptions(next.lead, next.motion).some((h) => h.id === next.hero)) delete next.hero
  const hero = resolveHero(next)
  if (hero.forcesLayout) next.layout = hero.forcesLayout
  const locked = directions[next.direction].layoutLocked
  if (locked) next.layout = locked
  if (next.lead !== 'video' && next.mediaPlan === 'image-to-video') delete next.mediaPlan
  if (next.videoFrame !== 'wide' && next.videoFrame !== 'original') delete next.videoFrame
  if (next.nav && !Object.hasOwn(navStyles, next.nav)) delete next.nav
  if (next.footer && !Object.hasOwn(footerStyles, next.footer)) delete next.footer
  if (next.shape && !Object.hasOwn(shapeStyles, next.shape)) delete next.shape
  if (next.signatures) next.signatures = next.signatures.filter((id) => signaturePatterns.some((p) => p.id === id)).slice(0, 4)
  if (next.concept && next.concept !== 'off' && !(Object.hasOwn(concepts, next.concept) && concepts[next.concept].levels.includes(next.motion))) delete next.concept
  if (next.customPalette && !Object.values(next.customPalette).every(isHex)) delete next.customPalette
  if (next.imagePresentation && !Object.hasOwn(imagePresentations, next.imagePresentation)) delete next.imagePresentation
  if (next.sectionPhotos) next.sectionPhotos = next.sectionPhotos.filter((x) => Object.hasOwn(imagePresentations, x.presentation) && PHOTO_SECTIONS.includes(next.pages.find((p) => p.id === x.page)?.sections[x.index] as SectionId))
  if (next.sectionPhotos && !next.sectionPhotos.length) delete next.sectionPhotos
  if (next.sectionVariants) next.sectionVariants = next.sectionVariants.filter((x) => sectionVariants[next.pages.find((p) => p.id === x.page)?.sections[x.index] as SectionId]?.options.some((o) => o.id === x.variant))
  if (next.sectionVariants && !next.sectionVariants.length) delete next.sectionVariants
  if (next.heroBands) next.heroBands = next.heroBands.filter((x) => Object.hasOwn(heroes, x.hero) && next.pages.find((p) => p.id === x.page)?.sections[x.index] === 'hero')
  if (next.heroBands && !next.heroBands.length) delete next.heroBands
  if (next.piecePlacements) next.piecePlacements = next.piecePlacements.filter((x) => Object.hasOwn(pieceCatalog, x.piece) && (x.page === '*' || next.pages.some((p) => p.id === x.page && x.index >= 0 && x.index < p.sections.length)))
  if (next.rotation && next.rotation !== 'off' && !Object.hasOwn(accentSets, next.rotation)) delete next.rotation
  if (next.piecePlacements?.length) next.pieces = [...new Set(next.piecePlacements.map((x) => x.piece))] // placed per section: the one-per-slot rule is per section, set by the plan
  else if (next.pieces) next.pieces = cleanPieces(next.pieces)
  if (next.piecePlacements && !next.piecePlacements.length) delete next.piecePlacements
  if (next.pieces && !next.pieces.length) delete next.pieces
  if (!seedBySlug[next.base]) next.base = directions[next.direction].baseRecipe
  if (next.pages.length === 0) next.pages = defaultPagesFor(next.purpose)
  next.pages = next.pages.map(({ hide, ...p }) => { const h = [...new Set((Array.isArray(hide) ? hide : []).filter((c) => c === 'navbar' || c === 'footer'))]; return h.length ? { ...p, hide: h } : p })
  return next
}

export function remix(spec: RecipeSpec, change: Partial<RecipeSpec>): RecipeSpec {
  const next = { ...spec, ...change }
  if (change.palette) delete next.customPalette
  if (change.lead && change.lead !== spec.lead) { delete next.hero; delete next.mediaPlan }
  if (change.direction) next.base = directions[change.direction].baseRecipe
  if (change.purpose && change.purpose !== spec.purpose) next.pages = defaultPagesFor(change.purpose)
  return normalizeSpec(next)
}

/** Trust boundary: specs come back from localStorage / URLs. */
// Palette/type ids retired on 2026-09-27 (the cream + trend-font library). Saved recipes are upgraded in place.
// ponytail: drop once recipes saved before that date no longer matter.
const LEGACY_PALETTE: Record<string, PaletteId> = {
  'warm-ivory': 'legal-pad', 'rice-paper': 'pink-plaster', 'dark-cinematic': 'black-box', monochrome: 'signal-white', earthy: 'yerba-leaf',
  'muted-color': 'pink-plaster', 'deep-color': 'oxblood-room', 'high-contrast': 'hazard-yellow', 'swiss-signal': 'signal-white',
  'atelier-noir': 'bottle-green', 'midnight-signal': 'night-ink', 'gallery-cobalt': 'klein-field',
  // Retired 2026-10-04 (dusty mid-tone grounds, docs/research/2026-10-04-colour.md).
  'pool-tile': 'mint-fresh', 'wet-slate': 'graphite-sand', 'rose-leaf': 'bubblegum', 'airmail-blue': 'studio-aqua',
  'deep-teal': 'bottle-green', 'celery-room': 'yerba-leaf', 'peach-fuzz': 'signal-orange',
}
const LEGACY_TYPE: Record<string, TypographyId> = {
  'editorial-serif': 'high-low', 'modern-sans': 'grid-discipline', 'elegant-contrast': 'soft-couture', 'bold-display': 'photocopy-zine',
  technical: 'control-room', experimental: 'stretch-test', 'quiet-serif': 'ink-and-paper', 'swiss-grotesk': 'grid-discipline',
  'soft-humanist': 'corner-bakery', 'warm-classic': 'main-street', 'raw-grotesk': 'workshop-manual',
}

export function isValidSpec(x: unknown): x is RecipeSpec {
  if (!x || typeof x !== 'object') return false
  const s = x as Record<string, unknown>
  if (typeof s.palette === 'string' && LEGACY_PALETTE[s.palette]) s.palette = LEGACY_PALETTE[s.palette]
  if (typeof s.typography === 'string' && LEGACY_TYPE[s.typography]) s.typography = LEGACY_TYPE[s.typography]
  const inKb = (v: unknown, kb: object) => typeof v === 'string' && Object.hasOwn(kb, v)
  return inKb(s.purpose, purposes) && inKb(s.direction, directions) && inKb(s.lead, leads) && inKb(s.motion, motionLevels)
    && inKb(s.layout, layouts) && inKb(s.palette, palettes) && inKb(s.typography, typography)
    && Array.isArray(s.characters) && s.characters.every((c) => inKb(c, characters))
    && Array.isArray(s.assets) && Array.isArray(s.pages) && typeof s.base === 'string' && typeof s.target === 'string'
}

export function recommendedTarget(spec: RecipeSpec): BuildTarget {
  if (spec.target !== 'not-sure') return spec.target
  const c = complexity(spec)
  return c === 'advanced' ? 'claude-code' : c === 'moderate' ? 'cursor' : 'v0'
}

export function complexity(spec: Pick<RecipeSpec, 'lead' | 'motion'>): UniversalRecipe['metadata']['complexity'] {
  if (spec.motion === 'immersive' || spec.lead === '3d') return 'advanced'
  if (spec.motion === 'dynamic' || spec.lead === 'video') return 'moderate'
  return 'light'
}

// ─── Composition ─────────────────────────────────────────────────────────────

const uniq = <T,>(xs: T[]) => [...new Set(xs)]
const camel = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+(.)/g, (_, c: string) => c.toUpperCase()).replace(/[^a-zA-Z0-9]/g, '')
const sameCore = (a: RecipeSeed['spec'], b: RecipeSpec) =>
  a.purpose === b.purpose && a.direction === b.direction && a.lead === b.lead && a.motion === b.motion
  && a.layout === b.layout && a.palette === b.palette && a.typography === b.typography && !b.customPalette

const TEXTURED = new Set(['japanese-minimal', 'organic-modern', 'film-inspired', 'raw-editorial', 'warm-hospitality'])

const WORDS_TO_AVOID = ['Elevate your brand', 'The future of…', 'Seamless experiences', 'Unlock your potential', 'Built for modern teams', 'Cutting-edge', 'Revolutionary', 'World-class']

function paletteTokens(colors: PaletteColors, usage: Partial<Record<ColorRole, string>>): ColorToken[] {
  const bg = colors.background
  const check: Partial<Record<ColorRole, [string, string]>> = {
    text: [colors.text, bg], muted: [colors.muted, bg], primary: [colors.primary, bg], accent: [colors.accent, bg], surface: [colors.text, colors.surface],
  }
  return (Object.keys(colorRoles) as ColorRole[]).map((role) => {
    const pair = check[role]
    const ratio = pair && contrast(pair[0], pair[1])
    return {
      role, hex: colors[role].toUpperCase(), purpose: colorRoles[role].purpose, usage: usage[role] ?? colorRoles[role].usage,
      contrast: ratio ? `${role === 'surface' ? 'Text on surface' : 'On background'}: ${ratio.toFixed(2)}:1 — ${contrastLabel(ratio)}` : undefined,
    }
  })
}

// Attached files are counted per row in buildAssets — so photos for the gallery don't also mark the video poster as "have".
function assetStatus(spec: RecipeSpec, a: AssetSpec): AssetRequirement['status'] {
  if (spec.assets.includes(a.asset)) return 'have'
  if (a.level === 'optional') return 'optional'
  // Made from the hero film by scripts/prepare-video.sh — never found separately (Halden, #20).
  if (a.label === 'Mobile video encode' || a.label === 'Scrub-ready encode') return spec.mediaPlan === 'temporary' ? 'temporary' : 'create'
  if (a.asset === 'video' && spec.mediaPlan === 'image-to-video') return 'create'
  if (spec.mediaPlan === 'temporary' && a.level === 'required' && ['images', 'video', 'product-photos', 'illustrations', '3d'].includes(a.asset)) return 'temporary'
  // The owner's own products, copy and logo are made, never found in a stock library (Maison Vey, #18).
  if (a.asset === 'copy' || a.asset === 'logo' || a.asset === 'product-photos') return 'create'
  return 'find'
}

const SOURCE: Record<string, string> = {
  stickers: 'Your brand identity (or an illustrator)',
  images: 'Unsplash / Pexels', video: 'Pexels Videos / Coverr', 'product-photos': 'Own photoshoot', illustrations: 'Commissioned illustrator',
  '3d': 'Spline / Poly Haven', audio: 'Pixabay Music / Freesound (check each file’s licence)', fonts: 'Google Fonts', copy: 'Written by you', logo: 'Your brand identity',
}

const PHOTO_WORDS = {
  grid: /\b(shop|store|menu|product|products|catalog(ue)?|collection|range|goods|dishes)\b/,
  lookbook: /\b(lookbook|fashion|wear|clothing|apparel|garment|linen|model|editorial)\b/,
  gallery: /\b(portfolio|gallery|photograph(y|er|s)?|work|projects|archive|art|artist)\b/,
  story: /\b(story|journal|travel|journey|process|behind|chef|farm|workshop|made)\b/,
}
// The owner's own words about their photos (English + Azerbaijani). Most specific first: "3D slider" is a ring, not a carousel.
const NOTE_WORDS: [ImagePresentationId, RegExp][] = [
  ['liquid-glass', /liquid|glass|şüşə|maye/], ['dome-gallery', /dome|sphere|globe|günbəz|kürə/],
  ['ring-3d', /\b3d\b|3-d|ring|circular|wheel|spiral|orbit|halqa|dairəvi/], ['infinite-canvas', /infinite|endless|canvas|draggable|sonsuz/],
  ['tilted-grid', /tilt|perspective|əyil/], ['marquee-rows', /marquee|ticker|rows|axan/], ['card-stack', /stack|deck|üst-üstə/],
  ['swipe-carousel', /carou?sel|slider|slide|swipe|karusel|slayd/], ['horizontal-rail', /horizontal|sideways|üfüqi|yana/],
  ['hover-reveal', /hover|list of|siyahı/], ['lookbook-spreads', /lookbook|spread|magazine|jurnal/],
  ['masonry-gallery', /masonry|pinterest|gallery|lightbox|qalereya/], ['uniform-grid', /\bgrid\b|tiles|şəbəkə/],
  ['editorial-sequence', /\bstory\b|hekayə|alternat/], ['single-feature', /full.?(bleed|screen|width)|tam ekran|one by one|tək-tək/],
]

/**
 * Picks how the photos are shown — by approach, not by count: the owner's note first, then the kind of site, its style and
 * motion, then what the photos themselves suggest (how many, which shape). Motion-heavy approaches are only recommended
 * to sites that move; the user can still pick any of them.
 */
/** Sections that show a set of photos — each chooses how (Pages → that part). */
export const PHOTO_SECTIONS: SectionId[] = ['gallery', 'featured-work', 'collection', 'lookbook', 'product-grid']

/** How a photo section shows its photos by default: the section's own nature first (a product grid compares, a lookbook
 *  pairs), then — for a gallery — what the owner's photos, note and site suggest. */
export function recommendSectionPhotos(spec: RecipeSpec, sid: SectionId): ImagePresentationId {
  const moving = spec.motion !== 'still'
  switch (sid) {
    case 'product-grid': return 'uniform-grid'
    case 'lookbook': return 'lookbook-spreads'
    case 'collection': return moving ? 'horizontal-rail' : 'uniform-grid'
    // Featured work is there to show the work: never a list of names hiding the pictures unless the owner asks (Fieldhouse, #17).
    case 'featured-work': return 'editorial-sequence'
    // A gallery is there to show its photos: never a list of names that hides them (Fieldhouse, #17).
    case 'gallery': { const r = recommendPresentation(spec).id; return r === 'hover-reveal' ? (moving ? 'horizontal-rail' : 'editorial-sequence') : r }
    default: return recommendPresentation(spec).id
  }
}

export function recommendPresentation(spec: RecipeSpec): { id: ImagePresentationId; why: string; photos: number; orientation: string } {
  const photos = (spec.uploads ?? []).filter((u) => u.asset === 'images' && u.kind === 'image')
  const n = photos.length
  const shape = (u: (typeof photos)[number]) => !u.width || !u.height ? 'square' : u.height > u.width * 1.1 ? 'portrait' : u.width > u.height * 1.1 ? 'landscape' : 'square'
  const count = { portrait: 0, landscape: 0, square: 0 }
  photos.forEach((u) => count[shape(u)]++)
  const major = n ? (Object.keys(count) as (keyof typeof count)[]).find((k) => count[k] >= n * 0.7) : undefined
  const orientation = !n ? 'not known yet' : major ? `mostly ${major}` : 'mixed shapes'
  const note = spec.brief?.photos?.toLowerCase() ?? ''
  const text = [spec.brief?.name, spec.brief?.offer, ...spec.pages.map((p) => p.label)].join(' ').toLowerCase()
  const says = (k: keyof typeof PHOTO_WORDS) => PHOTO_WORDS[k].test(text)
  const kind = purposes[spec.purpose].noun.toLowerCase()
  const bold = directions[spec.direction].families.some((f) => f === 'experimental' || f === 'futuristic' || f === 'bold')
  const moving = spec.motion !== 'still'

  const pick = (): [ImagePresentationId, string] => {
    const asked = NOTE_WORDS.find(([, re]) => re.test(note))
    if (asked) return [asked[0], 'it is what you asked for']
    if (n && n <= 2) return ['single-feature', `${n === 1 ? 'one photo' : 'two photos'} — each deserves a section of its own`]
    if (['ecommerce', 'product'].includes(spec.purpose) || says('grid')) return ['uniform-grid', `a ${kind} — visitors compare items side by side`]
    if ((spec.purpose === 'fashion' || says('lookbook')) && (!n || count.portrait >= n / 2)) return ['lookbook-spreads', `a ${kind} — portrait pairs read like a printed lookbook`]
    if (spec.motion === 'immersive' && (bold || spec.purpose === 'experiment')) {
      return spec.purpose === 'experiment' ? ['ring-3d', 'an immersive experiment — the photos become the experience'] : ['infinite-canvas', `an immersive ${kind} — visitors explore the work by dragging, not scrolling past it`]
    }
    if (n >= 4 && major === 'landscape' && moving) return ['horizontal-rail', 'wide photos on a site that moves — a sideways strip gives each one the full width']
    if (says('story') || spec.purpose === 'restaurant' || (n >= 3 && n <= 6)) return ['editorial-sequence', `a ${kind} — photos carry the story between short paragraphs`]
    if (says('gallery') || ['portfolio', 'experiment', 'personal-brand'].includes(spec.purpose)) return ['masonry-gallery', `a ${kind} — the work is the point, so show it all, each photo in its real shape`]
    if (moving && n >= 6) return ['swipe-carousel', 'a set of photos that reads best one at a time']
    return ['editorial-sequence', `a ${kind} — photos alongside the words`]
  }
  const [id, why] = pick()
  return { id, why, photos: n, orientation }
}

/** How the site shows its photos (the user's choice wins over the recommendation). Absent when photos play no part. */
export function imageryPlan(spec: RecipeSpec): ImageryPlan | undefined {
  const rec = recommendPresentation(spec)
  const first = spec.sectionPhotos?.[0]?.presentation
  if (!spec.imagePresentation && !first && !rec.photos && !spec.brief?.photos && spec.lead !== 'photography') return undefined
  return { presentation: imagePresentations[spec.imagePresentation ?? first ?? rec.id], photos: rec.photos, orientation: rec.orientation, recommended: rec.id, why: rec.why, note: spec.brief?.photos }
}

/** The owner's uploaded hero video, when its shape is not already 16:9 (±5%) — vertical phone clips, square, 4:3, ultra-wide. */
export function offShapeVideo(spec: Pick<RecipeSpec, 'lead' | 'uploads'>) {
  const u = spec.lead === 'video' ? spec.uploads?.find((x) => x.asset === 'video' && x.width && x.height) : undefined
  if (!u || Math.abs(u.width! / u.height! / (16 / 9) - 1) <= 0.05) return undefined
  return { width: u.width!, height: u.height!, tall: u.height! > u.width!, name: u.name }
}

function videoFraming(spec: RecipeSpec): string | undefined {
  const v = offShapeVideo(spec)
  if (!v) return undefined
  const shape = `${v.width}×${v.height}${v.tall ? ', vertical' : ''}`
  return spec.videoFrame === 'original'
    ? `The owner asked to keep the video in its own shape (${shape}) on every screen. Desktop: a tall frame at full viewport height, width set by the video’s own ratio, with headline and scene text in the columns beside it — never cropped wide, stretched or blurred-filled. Phones: full screen.`
    : `The owner’s video is ${shape}, but desktop and tablet screens are wide: always present it 16:9, edge to edge (object-fit: cover on a 16:9 or full-viewport frame) — never letterboxed, pillarboxed, stretched or shown as a narrow strip. Desktop plays the 16:9 files made by scripts/prepare-video.sh (heroVideo / scrubReadyEncode); phones play the original shape (mobileVideoEncode), which needs no crop. Pick <source media> by aspect-ratio or width so each screen downloads only its own file.`
}

function buildAssets(spec: RecipeSpec, hero: HeroPattern): AssetRequirement[] {
  const t = typography[spec.typography]
  const list: AssetSpec[] = [
    { asset: 'logo', label: 'Logo', quantity: '1 set', level: 'required', usage: 'Navigation, footer, favicon', specs: 'SVG; dark and light versions; square symbol for favicon. Until the owner’s own exists: the name set as a wordmark in the display face, and its first letter as the favicon — no invented symbol to throw away later' },
    { asset: 'fonts', label: 'Typefaces', quantity: `${uniq([t.display.family, t.body.family, t.utility.family]).length} families`, level: 'required', usage: 'All text', specs: uniq([t.display.family, t.heading.family, t.body.family, t.utility.family]).join(', ') + ` (${t.source})` },
    { asset: 'copy', label: 'Final copy', quantity: 'All sections', level: 'required', usage: 'Headlines, body, CTAs', specs: 'Written in the recipe voice before layout; headlines ≤ 8 words' },
    ...media[spec.lead].assets.map((a) => (a.label === 'Hero video' && FILM_LENGTH[hero.id] ? { ...a, specs: `1920×1080 min, ${FILM_LENGTH[hero.id]!.seconds}, ${FILM_LENGTH[hero.id]!.loop ? 'slow continuous motion that loops' : 'one continuous move, not a loop'}, no text burned in` } : a)),
  ]
  // Photos for the rest of the site, whatever leads the first screen. First 'images' row, so it claims the user's photos.
  const imagery = imageryPlan(spec)
  if (imagery && spec.lead !== 'photography') {
    list.splice(3, 0, { asset: 'images', label: 'Your photos', quantity: imagery.photos ? `${imagery.photos} photos` : imagery.presentation.ideal, level: 'recommended',
      usage: `${imagery.presentation.name} — ${imagery.presentation.line.toLowerCase()}`, specs: 'Min 2400px long edge, one consistent grade; keep each photo’s original shape unless the layout says otherwise', set: true })
  }
  // A film band mid-page (a hero part showing its own video) needs its own film, even when the first screen has none.
  // ponytail: prepare-video.sh names its files after the first screen (heroVideo.mp4…); a site with both renames the band's by hand.
  const band = (spec.heroBands ?? []).map((b) => heroes[b.hero]).find((h) => h.leads.includes('video'))
  if (band && !hero.leads.includes('video')) list.push(
    { asset: 'video', label: 'Film for the band', quantity: '1 clip', level: 'required', usage: `The ${band.name.toLowerCase()} band mid-page — its own film, not the first screen's media`, specs: `${filmFormat(band.id)}; run it through scripts/prepare-video.sh` },
    { asset: 'images', label: 'Band poster', quantity: '1 image', level: 'required', usage: 'Shown before the band’s film loads and on reduced motion', specs: 'First frame of the film, same crop' },
  )
  if (hero.id === 'scroll-video' || hero.id === 'scroll-video-page') list.push({ asset: 'video', label: 'Scrub-ready encode', quantity: '1 file', level: 'required', usage: hero.id === 'scroll-video' ? 'Scroll-controlled hero' : 'Scroll-controlled page background', specs: 'Made by scripts/prepare-video.sh from the ORIGINAL file: CRF 20, keyframe every 6 frames, ≤ 1920 px' })
  const off = offShapeVideo(spec)
  if (off && spec.videoFrame !== 'original') list.push({ asset: 'video', label: 'Widescreen version', quantity: '1 file', level: 'recommended', usage: 'Desktop and tablet hero — fills 16:9 screens',
    specs: `16:9, 1920×1080 or larger, made from your ${off.width}×${off.height} video. Best: an AI “expand” to 16:9, which keeps every pixel of your video sharp. Otherwise prepare-video.sh crops and upscales it. Phones keep your original.` })
  // Brand stickers: the orbit hero and the sticker piece are only as good as the brand's own marks.
  if (hero.id === 'orbit-stickers' || spec.pieces?.includes('stickers')) list.push({ asset: 'stickers', label: 'Brand stickers', quantity: '8–14', level: hero.id === 'orbit-stickers' ? 'required' : 'recommended', usage: 'Sticker orbit, stickers on sections', specs: 'Transparent PNG (1200px) or SVG; bold outlines, the brand’s own slogans, marks and characters — never AI-generated clip art' })
  if (spec.pieces?.includes('ambient-sound')) list.push({ asset: 'audio', label: 'Ambient sound', quantity: '1 loop', level: 'required', usage: 'The sound switch (AmbientSound) — off until the visitor turns it on', specs: 'One calm, seamless loop of 30–90 s; MP3 128 kbps, ≤ 1.5 MB; no voice or lyrics; quiet (about −18 LUFS)' })
  if (TEXTURED.has(spec.direction)) list.push({ asset: 'images', label: 'Texture', quantity: '1–2', level: 'optional', usage: 'Subtle paper/grain overlay at ≤ 4% opacity', specs: 'Seamless tile, 1024px, WebP' })

  // Ties uploaded files to the first requirement row of the same asset type (list order), so a single
  // uploaded video backs "Hero video" rather than being claimed by every video-shaped row at once.
  const claimed = new Set<string>()
  return list.map((a) => {
    const files = (spec.uploads ?? []).filter((u) => u.asset === a.asset && u.fileId && !claimed.has(u.fileId))
    files.forEach((u) => claimed.add(u.fileId!))
    // Another row of this type holds the actual upload: derived rows (mobile encode) come from it; an optional extra (secondary video) is still missing.
    const sibling = !files.length && !!spec.uploads?.some((u) => u.asset === a.asset && u.fileId)
    const status = a.label === 'Widescreen version' ? 'create' : files.length ? 'have' : sibling && a.level === 'optional' ? 'optional' : assetStatus(spec, a)
    const providedFiles = files.length ? files.map((u) => ({ fileId: u.fileId!, name: u.name })) : undefined
    const providedNote = providedFiles ? `user-provided: ${files.map((u) => (u.place ? `${u.name} (for ${u.place})` : u.name)).join(', ')}` : sibling ? 'made from your uploaded file' : 'marked as available — no file attached yet'
    return {
      // A key is a JS identifier in src/config/assets.ts: one that would start with a digit ("3D model…") gets a word first.
      ...a, key: ((k) => (/^\d/.test(k) ? `asset${k[0]}${k.slice(1)}` : k))(camel(a.label)), status, providedFiles,
      source: status === 'have' ? providedNote : status === 'temporary' ? 'curated-placeholder' : status === 'create' && a.asset === 'video' ? 'image-to-video' : SOURCE[a.asset],
      replaceWith: status === 'have' ? '—' : `user-owned-${a.asset}`,
    }
  })
}

function videoPrompt(spec: RecipeSpec): string {
  const d = directions[spec.direction]
  const p = palettes[spec.palette]
  const f = FILM_LENGTH[resolveHero(spec).id] ?? FILM_LENGTH['ambient-video']!
  return [
    `Slow, continuous cinematic camera movement (gentle forward dolly) through the scene in the reference image.`,
    `Mood: ${d.mood.join(', ').toLowerCase()}. Lighting and color stay faithful to the image; ${p.dark ? 'deep shadows, soft highlights' : 'soft natural light, gentle contrast'}.`,
    `No cuts, no text, no people entering the frame, no sudden motion. Subtle atmospheric movement only (light, air, fabric, water).`,
    `Duration ${f.seconds.replace(' s', ' seconds')}, 16:9, 24fps, stable horizon${f.loop ? ', end frame close to start frame so it can loop' : ', one move forward from start to end (visitors scroll through it — not a loop)'}.`,
  ].join(' ')
}

function buildCreationPaths(spec: RecipeSpec, reqs: AssetRequirement[]): AssetCreationPath[] {
  const missing = new Set(reqs.filter((r) => r.level === 'required' && r.status !== 'have').map((r) => r.asset))
  const paths: AssetCreationPath[] = []
  const smallVideo = spec.uploads?.find((u) => u.asset === 'video' && u.width && u.width < 1920)
  const off = offShapeVideo(spec)
  if (off && spec.videoFrame !== 'original') paths.push({
    asset: 'video', title: `Make a widescreen version of your ${off.tall ? 'vertical ' : ''}video`,
    steps: [
      `Your video is ${off.width}×${off.height}. Desktop screens are 16:9, so the site shows a widescreen version there and your original on phones.`,
      'Best quality: open your ORIGINAL file in an AI video tool with “Expand” / “Reframe” / “Outpaint”, choose 16:9 and 1920×1080 or larger. It paints the missing sides, so nothing is cut and your subject stays sharp.',
      'Then run: bash scripts/prepare-video.sh original.mp4 --wide widescreen.mp4 — desktop files come from the widescreen version, phone files from your original.',
      `No AI tool? Run bash scripts/prepare-video.sh original.mp4 — it crops a 16:9 window and sharpens it back to full size automatically (add --upscale footage for people and real scenes). Move the window with FOCUS_Y=0 (top) … 1 (bottom)${off.tall ? ' — a vertical video keeps only a band of its height, so check the subject stays in frame' : ''}.`,
      'Never let the browser stretch a small crop — that is what makes a hero look soft.',
    ],
    settings: { 'Source': `Your ${off.width}×${off.height} original`, 'Target': '16:9, 1920×1080 or larger', 'Phones': 'Your original, unchanged' },
    tools: ['runway', 'luma', 'real-esrgan', 'ffmpeg'],
  })
  if (smallVideo) paths.push({
    asset: 'video', title: 'Sharpen your video for free',
    steps: [
      `Your video is ${smallVideo.width}×${smallVideo.height}. A full-screen hero is stretched ~${(1920 / smallVideo.width!).toFixed(1)}× on a laptop and more on large screens, which is what makes it look soft.`,
      'Best: export the original again at 1920 px or wider (or 4K) from your camera or AI tool. Many tools offer this at no extra cost.',
      'Otherwise it is sharpened free on your own computer: install ffmpeg and run bash scripts/prepare-video.sh original.mp4 — it downloads Real-ESRGAN once and upscales automatically (fast model). For people, fabric and real scenes add --upscale footage: slower, most natural.',
      'Always start from the original file, never from a copy already compressed for the web.',
    ],
    tools: ['real-esrgan', 'ffmpeg'],
  })
  if (missing.has('video')) {
    paths.push({
      asset: 'video', title: 'Turn an image into your hero video',
      steps: ['Pick one strong still with depth (foreground + background) and a clear focal point.', 'Generate 3–4 takes with the prompt below in an image-to-video tool.', `Choose the steadiest take; keep ${(FILM_LENGTH[resolveHero(spec).id] ?? FILM_LENGTH['ambient-video']!).seconds}; export the original at 1920×1080 or larger.`, 'Run bash scripts/prepare-video.sh on that original — it writes the desktop, phone and scroll encodes and both posters into public/media under the names the asset layer expects.', 'No code changes needed.'],
      prompt: videoPrompt(spec),
      settings: { 'Source': 'Your image', 'Creation': 'Image → Video', 'Suggested motion': 'Slow cinematic forward camera movement', 'Suggested duration': (FILM_LENGTH[resolveHero(spec).id] ?? FILM_LENGTH['ambient-video']!).seconds, 'Aspect ratio': '16:9 (plus 9:16 for mobile)', 'Usage': resolveHero(spec).name },
      tools: ['runway', 'kling-ai', 'luma', 'google-flow', 'higgsfield'],
    })
    paths.push({
      asset: 'video', title: 'Use a temporary video now, replace it later',
      steps: ['Search free libraries for a slow, single-shot clip that matches the palette.', 'Download 1080p; mark it as temporary in the asset manifest.', 'Replace before launch — the asset layer makes this a one-line change.'],
      tools: ['pexels-videos', 'coverr', 'mixkit'],
    })
  }
  if (missing.has('images')) paths.push({
    asset: 'images', title: 'Find or shoot a consistent photo set',
    steps: ['Collect 15–20 candidates with the same light direction and color temperature.', 'Select 6–10; apply one shared grade (same warmth, contrast, grain).', 'Export 2400px long edge; let next/image generate responsive sizes.', 'Crop mobile versions with the focal point centred.'],
    tools: ['unsplash', 'pexels', 'squoosh'],
  })
  if (missing.has('product-photos')) paths.push({
    asset: 'product-photos', title: 'Shoot products on a seamless background',
    steps: [`Use a paper sweep in the recipe surface color (${palettes[spec.palette].colors.surface}).`, 'One soft key light at 45°, one fill card; same lens and height for every product.', 'Shoot exactly what the shot list (recipe/media.md) asks for each product — the grid picture, then the product page’s views.', 'Export at the shot list’s sizes; next/image makes AVIF/WebP. Until the shoot, a stock photo of a similar object is only a temporary stand-in, marked as such.'],
    tools: ['squoosh'],
  })
  if (missing.has('illustrations')) paths.push({
    asset: 'illustrations', title: 'Commission or source illustrations',
    steps: ['Brief one illustrator with the palette hex values and the mood words.', 'Ask for layered SVGs (background / midground / foreground) if motion is planned.', 'Use an open-licence set temporarily while the commission is in progress.'],
    tools: ['blush', 'open-peeps', 'undraw'],
  })
  if (missing.has('3d')) paths.push({
    asset: '3d', title: 'Create the 3D hero',
    steps: ['Block out the object in Spline or Blender; keep it under 100k triangles.', 'Light with one key and one rim light; use 2–3 materials maximum.', 'Export GLB with Draco compression (< 3MB) and render a poster image from the hero camera.', 'Until ready, use a pre-rendered still as the hero.'],
    tools: ['spline', 'poly-haven', 'three-js'],
  })
  return paths
}

function pickResources(spec: RecipeSpec, textured: boolean): string[] {
  const ids = ['google-fonts', 'realtime-colors', 'webaim-contrast-checker', 'lucide']
  const byLead: Record<LeadId, string[]> = {
    photography: ['unsplash', 'pexels', 'squoosh'],
    video: ['pexels-videos', 'coverr', 'ffmpeg', 'handbrake', 'runway', 'kling-ai'],
    typography: ['google-fonts', 'fonts-in-use', 'velvetyne'],
    product: ['squoosh', 'unsplash'],
    illustration: ['blush', 'open-peeps'],
    '3d': ['spline', 'three-js', 'react-three-fiber', 'drei', 'poly-haven'],
  }
  ids.push(...byLead[spec.lead])
  if (spec.motion !== 'still') ids.push('motion')
  if (spec.motion === 'immersive' || spec.pieces?.includes('smooth-scroll')) ids.push('lenis')
  if (textured) ids.push('texturelabs', 'ambientcg')
  const imagery = imageryPlan(spec)
  if (imagery) ids.push(...imagery.presentation.resources)
  const known = new Set(resources.map((r) => r.id))
  return uniq(ids).filter((id) => known.has(id))
}

/** Scroll-controlled film: the craft a user would otherwise have to spell out in a follow-up prompt. */
function filmStory(spec: RecipeSpec, hero: HeroPattern): string[] | undefined {
  if (hero.id !== 'scroll-video' && hero.id !== 'scroll-video-page') return undefined
  const range = hero.id === 'scroll-video' ? 'the pinned hero scroll range' : 'the whole page scroll'
  const sells = ['ecommerce', 'product', 'fashion'].includes(spec.purpose)
  const hasFilm = !!spec.uploads?.some((u) => u.asset === 'video' && u.fileId)
  return [
    `Scroll controls time: map ${range} to the full video timeline (0 → duration). Slow scroll moves the film slowly, fast scroll moves it fast, scrolling up plays it backward. Never autoplay the sequence.`,
    'Keep it tightly connected: smooth the progress with useSpring (no lag beyond ~0.3 s), and the scroll encode from scripts/prepare-video.sh (keyframe every 6 frames) so seeking never stutters.',
    hasFilm
      ? 'Before coding, watch the video and write a scene map in src/config/scenes.ts: every meaningful moment (a new subject, a pause, a zoom, a change of light) with its start and end as a fraction of the timeline, and the message that belongs to it.'
      : 'The film is not here yet: write src/config/scenes.ts now with three messages for the opening, the middle and the end, spread evenly, and say plainly in it that the timings wait for the film. When the film arrives, watch it and move each start and end to what is on screen — the messages may change too; no other code changes.',
    'One message per scene, about what is on screen right now. It arrives as its scene begins, holds while the scene plays, and leaves before the next scene’s message arrives — never two at once, never at arbitrary scroll points.',
    ...(sells ? ['This site sells: when the camera pauses or zooms on a product, that scene’s message names the product, adds one line about it and its price, with a quiet link to its product page.'] : []),
    'Video and type are one system: drive both from one Motion scroll progress (useScroll), with each text’s useTransform range placed at its scene’s fraction — not two separate animation setups.',
    'Text transitions, varied per scene: masked line-by-line reveals, short vertical travel (≤ 24px), clip-path wipes, a small tracking or scale change. No repeated plain fade-ins, nothing bouncy.',
    'Legibility over footage: a soft gradient scrim only behind the text, never a flat dark overlay across the whole film.',
    hero.id === 'scroll-video'
      ? 'When the film ends, release into the next section without a hard cut (overlap it, or ease the last frame into the page background); later sections keep the same type and spacing.'
      : 'Sections scroll over the film on semi-opaque surfaces; line up the film’s key moments with section boundaries so each section has its own scene.',
    'Mobile keeps the same story and scene map: shorter scroll distance, 9:16 encode, simpler reveals (opacity + small translate). If seeking stutters on a phone, step through poster stills per scene instead.',
    'Verify in a real browser at 1440px and 390px: scroll slowly, quickly and upward — each message must appear exactly on its scene.',
  ]
}

/** Heroes that are already the show — a cursor gimmick on top would compete with them. */
const FEATURE_HEROES = new Set<HeroId>(['scroll-video', 'scroll-video-page', 'webgl-scene', 'ambient-video'])

/** 2–4 signature interactions that fit this recipe: on sections it actually has, at its motion level, scored by purpose and style. */
/** Where a signature pattern could live in this recipe: the first matching section that exists and is not taken. */
function signatureSlots(spec: RecipeSpec, hero: HeroPattern, pages: PageBlueprint[]) {
  const where = (sid: SectionId) => {
    if (sid === 'navbar') return 'Navigation'
    if (sid === 'footer') return 'Footer'
    const page = pages.find((p) => p.sections.some((s) => s.id === sid))
    return page && `${page.label} — ${page.sections.find((s) => s.id === sid)!.name}`
  }
  const fits = (p: SignaturePattern, used: Set<SectionId>) => p.levels.includes(spec.motion)
    ? p.sections.find((s) => !used.has(s) && where(s) && !(s === 'hero' && FEATURE_HEROES.has(hero.id))) : undefined
  return { where, fits }
}

/** Every signature pattern that can be placed in this recipe, best fit first, with the engine's own pick marked. */
export function signatureChoices(r: UniversalRecipe) {
  const spec = r.metadata.spec
  const { fits } = signatureSlots(spec, r.media.hero, r.pages)
  const auto = pickSignatures({ ...spec, signatures: undefined }, r.media.hero, r.pages, r.concept?.id).map((m) => m.id)
  return signaturePatterns.filter((p) => fits(p, new Set())).map((p) => ({ ...p, recommended: auto.includes(p.id) }))
    .sort((a, b) => Number(b.recommended) - Number(a.recommended))
}

/** How well a pattern's `fits` match this recipe: its kind of site counts 3, each shared style word 1. */
function fitScore(fits: string[], spec: RecipeSpec) {
  const d = directions[spec.direction]
  const style = new Set<string>([...d.tags, ...d.families, ...spec.characters])
  return (fits.includes(spec.purpose) ? 3 : 0) + fits.filter((f) => style.has(f)).length
}

/** The big idea that suits this recipe: at its motion level, carried by a signature that has a section to live on. */
function recommendConcept(spec: RecipeSpec, hero: HeroPattern, pages: PageBlueprint[]): ConceptId | undefined {
  const { fits } = signatureSlots(spec, hero, pages)
  const placeable = Object.values(concepts).filter((c) => c.levels.includes(spec.motion) && c.signatures.some((id) => fits(signaturePatterns.find((p) => p.id === id)!, new Set())))
  const ranked = placeable.map((c, order) => ({ c, score: fitScore(c.fits, spec), order })).sort((a, b) => b.score - a.score || a.order - b.order)
  return ranked[0]?.c.id
}

/** Every big idea that works at this recipe's motion level, the recommended one marked. */
export function conceptChoices(r: UniversalRecipe) {
  const spec = r.metadata.spec
  const auto = recommendConcept(spec, r.media.hero, r.pages)
  return Object.values(concepts).filter((c) => c.levels.includes(spec.motion)).map((c) => ({ ...c, recommended: c.id === auto }))
    .sort((a, b) => Number(b.recommended) - Number(a.recommended))
}

function resolveConcept(spec: RecipeSpec, hero: HeroPattern, pages: PageBlueprint[]): RecipeConcept | undefined {
  if (spec.concept === 'off') return undefined
  const auto = recommendConcept(spec, hero, pages)
  const id = spec.concept ?? auto
  if (!id) return undefined
  const { fits: _f, levels: _l, signatures: _s, ...c } = concepts[id]
  const why = spec.concept ? 'Chosen by the owner.' : `It suits ${/^[aeiou]/i.test(purposes[spec.purpose].noun) ? 'an' : 'a'} ${purposes[spec.purpose].noun.toLowerCase()} with a ${directions[spec.direction].name} look at ${motionLevels[spec.motion].name.toLowerCase()} movement.`
  return { ...c, why, recommended: id === auto }
}

/** 2–4 signature interactions: the concept's own first, then the user's picks if any, else the best fits for sections,
 *  motion level, purpose and style. */
function pickSignatures(spec: RecipeSpec, hero: HeroPattern, pages: PageBlueprint[], concept?: ConceptId): SignatureMoment[] {
  const { where, fits } = signatureSlots(spec, hero, pages)
  const byId = (id: string) => signaturePatterns.find((p) => p.id === id)
  const own = spec.signatures
    ? spec.signatures.map(byId).filter((p): p is SignaturePattern => !!p)
    : signaturePatterns.flatMap((p, order) => {
      const score = p.viaConcept ? 0 : fitScore(p.fits, spec)
      return score > 0 ? [{ p, score, order }] : []
    }).sort((a, b) => b.score - a.score || a.order - b.order).map((c) => c.p)
  // The concept brings its first two (its ending is in its words); the rest stay the recipe's own best fits.
  const candidates = uniq([...(concept ? concepts[concept].signatures.slice(0, 2).map(byId).filter((p): p is SignaturePattern => !!p) : []), ...own])
  const used = new Set<SectionId>()
  const out: SignatureMoment[] = []
  for (const p of candidates) {
    const sid = fits(p, used)
    if (out.length === 4 || !sid) continue
    used.add(sid)
    const experience = p.id === 'footer-moment' && concept ? concepts[concept].ending : p.experience
    out.push({ id: p.id, name: p.name, where: where(sid)!, experience, implementation: p.implementation, mobile: p.mobile, reducedMotion: p.reducedMotion, components: p.components })
  }
  return out
}

// ─── Section entrance per family (replaces one fade-and-rise on every site) ────
const ENTRANCE: Record<FamilyId, Partial<MotionPattern>> = {
  quiet: { name: 'Soft fade', behavior: 'opacity 0→1 only, no movement; children 90ms apart.', duration: '800–1000ms', easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)', purpose: 'Let sections settle in like light changing — nothing moves, it simply appears.' },
  minimal: { name: 'Soft fade', behavior: 'opacity 0→1 only, no movement; children 60ms apart.', duration: '600ms', easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)', purpose: 'A quiet entrance that keeps the layout perfectly still.' },
  editorial: { name: 'Clip reveal', behavior: 'blocks unmask upward: clip-path inset(100% 0 0 0) → inset(0); images settle from scale 1.06; text lines follow 70ms apart.', duration: '700–900ms', easing: 'cubic-bezier(0.65, 0, 0.35, 1)', purpose: 'Sections open like turning a page — the frame first, then the words.' },
  cinematic: { name: 'Clip reveal', behavior: 'media unmask from a thin line to full height; text fades in after the media lands.', duration: '900–1200ms', easing: 'cubic-bezier(0.65, 0, 0.35, 1)', purpose: 'Every section enters like a cut in a film — image first, words second.' },
  bold: { name: 'Hard cut', behavior: 'elements snap in: opacity 0→1 in 120ms with a 24px slide over 250ms; children 40ms apart; no blur, no bounce.', duration: '250ms', easing: 'cubic-bezier(0.2, 0, 0, 1)', purpose: 'Fast and confident — content is simply there, like a poster being slapped up.' },
  raw: { name: 'Hard cut', behavior: 'elements appear without easing (steps(2)), slightly offset then square; children 50ms apart.', duration: '200ms', easing: 'steps(2)', purpose: 'Unpolished on purpose — things land like paper on a table.' },
  experimental: { name: 'Spring settle', behavior: 'elements rise 32px and settle with a spring (stiffness 180, damping 16), a 2° tilt straightening as they land.', duration: 'spring', easing: 'spring', purpose: 'Things arrive with a little life of their own.' },
  organic: { name: 'Spring settle', behavior: 'elements rise 20px with a soft spring (stiffness 120, damping 20); images fade in under them.', duration: 'spring', easing: 'spring', purpose: 'Warm and unhurried — like something placed by hand.' },
  futuristic: { name: 'Decode', behavior: 'opacity 0→1 with blur 8px→0; labels decode character by character; lines draw from left.', duration: '400–500ms', easing: 'cubic-bezier(0.16, 1, 0.3, 1)', purpose: 'Sections come online like a system booting — precise, not floaty.' },
}

// ─── Page rhythm: tone and media placement per section ─────────────────────────
const PROOF: SectionId[] = ['testimonials', 'clients', 'stats', 'trust', 'press', 'integrations']
const OFFER: SectionId[] = ['services', 'feature-grid', 'pricing', 'menu', 'schedule', 'curriculum', 'categories']
export const MEDIA_SECTIONS: SectionId[] = ['about', 'location', 'product-highlight', 'editorial-story', 'case-study', 'feature-rows']
const MEDIA_ORDER: Record<LayoutId, MediaPlacement[]> = {
  balanced: ['side', 'full'], editorial: ['side', 'full', 'over'], asymmetric: ['side', 'over'], grid: ['full', 'side'],
  'full-bleed': ['over', 'full'], experimental: ['over', 'side', 'full'],
}
/** Gives each section of a page a tone and, for image + text sections, a media placement, so a page has rhythm instead
 *  of one strip: proof on the surface, one offer on a chapter colour (when the look has colour chapters), the closing
 *  part on the inverse — never the same tone twice in a row; quiet looks stay mostly on the ground. Media placement
 *  follows the layout and never repeats on consecutive image + text sections. */
function pageRhythm(list: PageSection[], spec: RecipeSpec, chapters: boolean, footerInverse: boolean): PageSection[] {
  const quiet = directions[spec.direction].families.some((f) => f === 'quiet' || f === 'minimal')
  let chapterUsed = false, media = 0
  const order = MEDIA_ORDER[spec.layout]
  const out = list.map((s, i): PageSection => {
    const last = i === list.length - 1
    let tone: SectionTone = 'ground'
    // The closing part ends the page on the inverse — unless the footer under it is an inverse band already (two in a
    // row read as one block); then it takes the surface (Fieldhouse, #17).
    if (s.id === 'contact-cta' && last) tone = footerInverse ? 'surface' : 'inverse'
    else if (s.id === 'cta-band') tone = chapters ? 'chapter' : 'inverse'
    else if (PROOF.includes(s.id)) tone = 'surface'
    else if (!quiet && chapters && !chapterUsed && OFFER.includes(s.id)) { tone = 'chapter'; chapterUsed = true }
    // A case study opens its project's page: its picture leads, full width — never a small card at the side (Fieldhouse, #17).
    const m = s.id === 'case-study' ? 'full' : MEDIA_SECTIONS.includes(s.id) ? order[media++ % order.length] : undefined
    return { ...s, ...(tone !== 'ground' ? { tone } : {}), ...(m ? { media: m } : {}) }
  })
  // Never the same tone on two neighbours: the second one goes back to the ground.
  for (let i = 1; i < out.length; i++) if (out[i].tone && out[i].tone === out[i - 1].tone) delete out[i].tone
  return out
}

/** Footer that suits the look, unless the user picked one: quiet and minimal looks end on one calm line, bold ones on
 *  the name set large, warm and raw ones on an open invitation, editorial and cinematic ones on full columns. */
export function recommendedFooter(spec: Pick<RecipeSpec, 'direction' | 'purpose' | 'concept'>, concept = spec.concept): FooterStyleId {
  const fam = directions[spec.direction].families[0]
  const byFamily: Record<string, FooterStyleId> = { quiet: 'line', minimal: 'line', futuristic: 'line', bold: 'wordmark', experimental: 'wordmark', raw: 'contact', organic: 'contact', editorial: 'signature', cinematic: 'signature' }
  // Shops and clinics need their full set of links whatever the look.
  if (spec.purpose === 'ecommerce' || spec.purpose === 'clinic' || spec.purpose === 'hotel' || spec.purpose === 'spa') return 'signature'
  // Content-rich sites end on a map of everything they hold.
  if (spec.purpose === 'blog') return 'index'
  // A big idea brings its own ending: only giant chapters end on the name set huge.
  const byConcept: Partial<Record<ConceptId, FooterStyleId>> = { 'giant-chapters': 'wordmark', 'loud-and-quiet': 'line', 'live-console': 'line', 'guided-walk': 'contact' }
  return (concept && concept !== 'off' && byConcept[concept]) || byFamily[fam] || 'signature'
}

// ─── Palette by fit (docs/research/2026-10-04-colour.md §7) — never by "unused" ──────────────
// Where colour lives decides the ground: photos, film and 3D bring the colour, so the ground goes neutral (light, dark or
// deep); type- and illustration-led sites carry it in a committed or clear pale ground. Then the kind of site, then the
// look's own pick as a tie-break. Only the look's palettes are candidates.
const PURPOSE_PALETTES: Partial<Record<PurposeId, PaletteId[]>> = {
  restaurant: ['limestone', 'warm-black', 'espresso', 'olive-grove', 'oxblood-room', 'apricot-hall'],
  hotel: ['limestone', 'warm-black', 'espresso', 'olive-grove', 'oxblood-room'],
  'real-estate': ['signal-white', 'limestone', 'gallery-grey', 'warm-black'],
  fashion: ['black-box', 'signal-white', 'paper-cobalt', 'bubblegum', 'grape-soda'],
  ecommerce: ['signal-white', 'paper-cobalt', 'limestone', 'black-box'],
  saas: ['paper-cobalt', 'wet-concrete', 'console-lilac', 'night-market'],
  product: ['paper-cobalt', 'wet-concrete', 'console-lilac', 'night-market'],
  studio: ['charcoal-signal', 'gallery-grey', 'black-box', 'klein-field', 'grape-soda'],
  agency: ['charcoal-signal', 'gallery-grey', 'black-box', 'klein-field', 'grape-soda'],
  portfolio: ['charcoal-signal', 'gallery-grey', 'black-box', 'klein-field', 'grape-soda'],
  event: ['black-box', 'charcoal-signal', 'grading-suite', 'midnight-chapters', 'hazard-yellow'],
  nonprofit: ['sage-white', 'signal-white', 'paper-cobalt', 'mint-fresh'],
  clinic: ['sage-white', 'signal-white', 'paper-cobalt', 'mint-fresh'],
  spa: ['limestone', 'warm-black', 'graphite-sand', 'sage-white', 'charcoal-signal', 'black-box'],
  course: ['sage-white', 'signal-white', 'paper-cobalt', 'mint-fresh'],
  blog: ['signal-white', 'limestone', 'legal-pad', 'cherry-red'],
}
type Zone = 'neutral' | 'committed' | 'pale' | 'deep' | 'mid'
const zoneOf = (hex: string): Zone => { const o = oklab(hex); return o.C < 0.03 ? 'neutral' : o.C >= 0.12 ? 'committed' : o.L >= 0.86 ? 'pale' : o.L < 0.36 ? 'deep' : 'mid' }

/** The look's palettes ranked by fit to this site, best first. */
export function rankPalettes(spec: Pick<RecipeSpec, 'direction' | 'purpose' | 'lead'>): PaletteId[] {
  const d = directions[spec.direction]
  const inMedia = spec.lead === 'photography' || spec.lead === 'video' || spec.lead === '3d'
  const quiet = d.families.some((f) => f === 'quiet' || f === 'minimal')
  const score = (id: PaletteId) => {
    const z = zoneOf(palettes[id].colors.background)
    const media = inMedia ? { neutral: 1, deep: 0.6, pale: 0.3, committed: 0, mid: 0 }[z] : { committed: 1, pale: 1, neutral: 0.5, deep: 0.5, mid: 0 }[z]
    return 3 * media + 2 * Number(!!PURPOSE_PALETTES[spec.purpose]?.includes(id)) + 1.5 * Number(id === d.defaults.palette) + (quiet && z === 'neutral' ? 1 : 0)
  }
  return d.palettes.map((id, order) => ({ id, s: score(id), order })).sort((a, b) => b.s - a.s || a.order - b.order).map((x) => x.id)
}
export const recommendPalette = (spec: Pick<RecipeSpec, 'direction' | 'purpose' | 'lead'>) => rankPalettes(spec)[0]

/** Menu style that suits the kind of site, unless the user picked one. */
export function recommendedNav(spec: Pick<RecipeSpec, 'purpose' | 'direction'>): NavStyleId {
  const d = directions[spec.direction]
  if (d.nav) return d.nav
  if (d.families.includes('editorial') && (spec.purpose === 'portfolio' || spec.purpose === 'studio')) return 'side-index'
  const byPurpose: Record<PurposeId, NavStyleId> = {
    portfolio: 'fullscreen-menu', agency: 'fullscreen-menu', studio: 'fullscreen-menu', fashion: 'centered-logo', restaurant: 'centered-logo',
    ecommerce: 'classic-bar', product: 'floating-pill', saas: 'floating-pill', 'personal-brand': 'bottom-dock', experiment: 'status-bar', other: 'classic-bar',
    blog: 'classic-bar', event: 'centered-logo', nonprofit: 'floating-pill', 'real-estate': 'classic-bar', hotel: 'centered-logo', course: 'floating-pill', clinic: 'classic-bar', spa: 'centered-logo',
  }
  return byPurpose[spec.purpose]
}

/** Corner language that suits the direction, unless the user picked one. */
export function recommendedShape(spec: Pick<RecipeSpec, 'direction'>): ShapeId {
  const d = directions[spec.direction]
  if (d.tags.some((t) => t === 'brutalist' || t === 'raw')) return 'brutal'
  if (['playful-pop', 'soft-pastel', 'pixel-art'].includes(d.id)) return 'pill'
  if (d.id === 'ethereal') return 'glass'
  if (d.id === 'maximalism') return 'clay'
  if (['bento-product', 'y2k-chrome', 'digital-futurism'].includes(d.id)) return 'round'
  if (d.families.some((f) => f === 'quiet' || f === 'organic')) return 'soft'
  if (d.families.includes('minimal')) return 'outline'
  return 'sharp'
}


/** Every control and form this site has, built from shadcn/ui and themed with the recipe's exact colors and shape. */
function uiKit(pages: PageBlueprint[], colors: PaletteColors, shape: ShapeStyle, goal: GoalId | undefined, purpose: PurposeId): UiKit {
  const where = new Map<string, Set<string>>()
  const add = (slug: string, place: string) => where.set(slug, (where.get(slug) ?? new Set()).add(place))
  UI_ALWAYS.forEach((slug) => add(slug, 'every page'))
  uiBySection.navbar?.forEach((slug) => add(slug, 'navigation'))
  if (goal) uiByGoal[goal].forEach((slug) => add(slug, `main action — ${goals[goal].name.toLowerCase()}`))
  // Plans by month or year only where a subscription is sold (software, courses): a monthly/yearly switch elsewhere is a stray SaaS habit.
  const billed = purpose === 'saas' || purpose === 'product' || purpose === 'course'
  for (const p of pages) {
    if (billed && (p.type === 'pricing' || p.sections.some((x) => x.id === 'pricing'))) ['tabs', 'switch'].forEach((slug) => add(slug, `${p.label} — monthly or yearly`))
    uiByPage[p.type]?.forEach((slug) => add(slug, p.label))
    p.sections.forEach((sec) => uiBySection[sec.id]?.forEach((slug) => add(slug, `${p.label} — ${sec.name}`)))
  }
  const components = [...where].map(([slug, places]) => ({ slug, name: uiNames[slug] ?? slug, where: [...places] }))
  const radius = shape.button === '999px' ? '1rem' : shape.card
  const theme = [
    ':root {',
    `  --background: ${colors.background}; --foreground: ${colors.text};`,
    `  --card: ${colors.surface}; --card-foreground: ${colors.text}; --popover: ${colors.surface}; --popover-foreground: ${colors.text};`,
    `  --primary: ${colors.primary}; --primary-foreground: ${colors.background}; --secondary: ${colors.secondary}; --secondary-foreground: ${colors.text};`,
    `  --muted: ${colors.surface}; --muted-foreground: ${colors.muted}; --accent: ${colors.secondary}; --accent-foreground: ${colors.text};`,
    `  --border: ${colors.border}; --input: ${colors.muted}; --ring: ${colors.text}; --radius: ${radius};`,
    '}',
  ].join('\n')
  return {
    library: 'shadcn/ui (Radix primitives)', url: 'https://ui.shadcn.com/docs/components',
    components,
    install: `npx shadcn@latest init && npx shadcn@latest add ${components.map((c) => c.slug).join(' ')}`,
    theme,
    rules: [
      'Every interactive control — select, date picker, checkbox, radio, switch, tabs, accordion, dialog, menu, toast — comes from these components. Never ship an unstyled native <select>, <input type="date"> or a hand-rolled dropdown.',
      ...(components.some((c) => c.slug === 'calendar') ? [`Date fields are a Calendar inside a Popover (shadcn “Date Picker” pattern); times and counts (${purpose === 'restaurant' ? 'guests at the table' : 'people, sessions'}) are a Select.`] : []),
      'Forms use Form (react-hook-form + zod) with inline errors under each field, in --color-error.',
      'Where a form goes: nothing is connected unless the owner names a service. A contact, booking or enquiry form opens the visitor’s email app with every field filled in (mailto: to the address in the copy deck) and says so on screen; a newsletter field does the same. Sign in / Sign up without an account service check their fields, then say plainly that accounts are not open yet and give the email. Never fake a sent message, a booking or a login.',
      'Install only the components below; a component listed for a part the site no longer has is left out, not shipped unused.',
      'After `shadcn init`, replace the :root color values it writes with the theme block below — hex values, so shadcn components and the recipe tokens always match. Do not map them back to --color-* (that makes a loop).',
      'Button text uses the recipe’s type roles, never shadcn’s own text-sm / font-medium; a button beside links (the menu’s action) is set exactly like them — same role, size and width — so the row reads as one.',
      `Restyle, don't ship the demo look: recipe fonts, ${shape.name.toLowerCase()} shape (buttons ${shape.button}, cards ${shape.card}), ${shape.border} borders.`,
      'No focus rings, glows or outlines on fields, selects, menus or their options — remove shadcn’s ring-* / outline classes. A focused field only darkens its border to the text color; a highlighted option only changes its background.',
      'Keep Radix accessibility intact: labels tied to fields, keyboard navigation, 44px touch targets, prefers-reduced-motion on every open/close animation.',
      'Mobile: Select, Popover and Dropdown open as a bottom Sheet/Drawer on screens under 640px.',
    ],
  }
}

// ─── Words and pictures for this site, not for the look it came from ─────────

/** A look's own words (do / avoid / principles) are written for its own palettes, lettering and corners. When the owner
 *  picked others, a line about type, colour or corners contradicts the recipe's own tokens ("pair a chunky serif with a
 *  humanist sans" over a one-family sans) and the builder takes the weaker reading — so such a line is left out. */
export const TYPE_WORDS = /\b(serifs?|sans|grotesk|fonts?|typefaces?|lettering|script|mono(space)?|italics?|display face)\b/i
export const COLOUR_WORDS = /\b(colou?rs?|palettes?|accents?|black|white|cream|beige|neon|pastels?|monochrome)\b/i
export const SHAPE_WORDS = /\b(rounded|round|corners?|radius|arch(ed|es)?|pills?|sharp edges?|square corners)\b/i
export function fitPicks(lines: string[], keep: { type: boolean; colour: boolean; shape: boolean }): string[] {
  return lines.filter((l) => (keep.type || !TYPE_WORDS.test(l)) && (keep.colour || !COLOUR_WORDS.test(l)) && (keep.shape || !SHAPE_WORDS.test(l)))
}

/** Lines that would forbid what the owner picked: a dark ground under a "no tinted charcoal / near-black" rule, a cream
 *  ground under "no cream", the owner's own fonts under "don't fall back to …". Halden's own palette (charcoal, orange
 *  accent) was banned by its look's avoid list and the generic tells, so its checks could never pass (#20). */
/** The look's knowledge as this site can use it: a line that would forbid the owner's own colours or fonts is left out. */
function fitStyle(id: DirectionId, look: string, colors: PaletteColors, fonts: string[]): UniversalRecipe['style'] {
  const k = lookKnowledge[id]
  return { look, moves: fitTells(k.moves, colors, fonts), craft: fitTells(k.craft, colors, fonts), sparks: fitTells(k.sparks, colors, fonts), traps: k.traps, seen: k.seen }
}

export function fitTells(lines: string[], colors: PaletteColors, fonts: string[]): string[] {
  const g = oklab(colors.background)
  const dark = g.L < 0.34, cream = g.L > 0.86 && g.C < 0.06 && g.b > 0.008
  return lines.filter((l) => !(dark && /charcoal|near-black|coloured dark/i.test(l)) && !(cream && /\bcream|beige/i.test(l)) && !fonts.some((f) => l.includes(f)))
}

/** What each media part's picture shows — written for any business; the shot list adds whose. One row per part, sized to
 *  what its ready section takes (one image, a set, one per item): `n` files at `ratio`, `px` on the long edge. */
type ShotSpec = { shows: string; ratio: string; px: number; n: number; per?: string; note?: string; /** The section crops to the layout's card or media ratio: the file takes that ratio, not `ratio`. */ frame?: 'card' | 'media' }
const SHOTS: Partial<Record<SectionId, ShotSpec>> = {
  gallery: { shows: 'the place and what it makes, as a set: wide views, close details, people at work — one light, one grade', ratio: '3:2', px: 2400, n: 8, note: 'people and things may be 4:5' },
  'featured-work': { shows: 'one strong picture of each project — the real work itself, never a mock-up (the same photo leads its project page)', ratio: '3:2', px: 2400, n: 4, note: 'one per project', frame: 'card' },
  collection: { shows: 'one picture per range: its best piece, all styled and lit the same way', ratio: '4:5', px: 2400, n: 4, note: 'one per range', frame: 'card' },
  lookbook: { shows: 'people wearing or using it in a real setting, with room to breathe', ratio: '4:5', px: 2400, n: 6 },
  'product-grid': { shows: 'each product alone on the same ground, from the same angle, in the same light', ratio: '4:5', px: 2000, n: 6, note: 'one per product', frame: 'card' },
  'product-buy': { shows: 'the product from the front, at three-quarters and one close detail — the same ground and light as the grid', ratio: '4:5', px: 2000, n: 3, per: 'product', frame: 'card' },
  about: { shows: 'a real portrait of the person or the team, in their own place', ratio: '4:5', px: 2400, n: 1, frame: 'media' },
  team: { shows: 'one portrait per person, in the same light and framing, ideally where they work', ratio: '4:5', px: 2000, n: 4, note: 'one per person', frame: 'card' },
  location: { shows: 'the way in as visitors arrive — the door, the street, the path', ratio: '3:2', px: 2400, n: 1, frame: 'media' },
  'product-highlight': { shows: 'the main product up close: in hand or in use, its material visible', ratio: '4:5', px: 2400, n: 1, frame: 'media' },
  'editorial-story': { shows: 'the picture that carries the story: a detail, the place or the people', ratio: '3:2', px: 2400, n: 1, frame: 'media' },
  'case-study': { shows: 'the project at its best, wide — the picture that opens its page', ratio: '3:2', px: 2400, n: 1, per: 'project', frame: 'media' },
  'feature-rows': { shows: 'one picture per row, showing that feature at work', ratio: '4:3', px: 2000, n: 3, note: 'one per row', frame: 'media' },
  article: { shows: 'the picture that opens the story', ratio: '3:2', px: 2400, n: 1, per: 'article', frame: 'media' },
  journal: { shows: 'one picture per post, the one that opens it', ratio: '3:2', px: 2000, n: 3, note: 'one per post', frame: 'media' },
  categories: { shows: 'one picture per category: its best piece', ratio: '4:5', px: 2000, n: 4, note: 'one per category', frame: 'card' },
}
/** Parts whose ready design shows a picture only in some designs (Pages → Other designs). */
const VARIANT_SHOTS: Partial<Record<SectionId, Record<string, ShotSpec>>> = {
  'how-it-works': { cards: { shows: 'one picture per step, showing that step happening', ratio: '4:3', px: 2000, n: 4, note: 'one per step' } },
  process: { cards: { shows: 'one picture per step, showing that step happening', ratio: '4:3', px: 2000, n: 4, note: 'one per step' } },
}
/** Pages that repeat for every item: their parts need one set of pictures per item, not one for the site. */
const ITEM_PAGES: Partial<Record<PageTypeId, string>> = { 'product-detail': 'product', project: 'project', article: 'article' }
/** Lists of the other items (more projects, related products): on an item page they show the same pictures as everywhere. */
const LIST_SECTIONS = new Set<SectionId>(['featured-work', 'product-grid', 'collection', 'categories', 'journal', 'team'])
const sizeOf = (ratio: string, px: number) => { const [w, h] = ratio.split(':').map(Number); return w >= h ? `${px}×${Math.round((px * h) / w)}` : `${Math.round((px * w) / h)}×${px}` }

/** How long the first screen's film is — one value per film hero, used by the shot list, the checklist, the hero's
 *  needs and the image-to-video prompt alike (they used to say 5–8, 5–15 and 15–30 s in one recipe — Halden, #20). */
export const FILM_LENGTH: Partial<Record<HeroId, { seconds: string; loop: boolean }>> = {
  'ambient-video': { seconds: '8–15 s', loop: true },
  'scroll-video': { seconds: '10–20 s', loop: false },
  'scroll-video-page': { seconds: '15–30 s', loop: false },
}
export const filmFormat = (h: HeroId) => {
  const f = FILM_LENGTH[h] ?? FILM_LENGTH['ambient-video']!
  return `1920×1080 or larger, ${f.seconds}, one continuous shot with a slow, steady camera move, no cuts${f.loop ? '; the end close to the start so it loops' : ' — not a loop: it plays forward as visitors scroll'}; plus a still for the poster`
}

/** The checklist's photo-set rows take their count from the shot list, so the checklist, the shot list and the asset
 *  layer name one number. A product site splits product shots from the rest; two set rows of one kind become one. */
function fitSets(reqs: AssetRequirement[], shots: Shot[]): AssetRequirement[] {
  const photos = shots.filter((x) => x.kind === 'photo')
  if (!photos.length) return reqs
  const isProduct = (x: Shot) => x.key === 'hero' || /product|collection|categor/i.test(x.key)
  const hasProductRow = reqs.some((a) => a.set && a.asset === 'product-photos')
  const seen = new Set<string>()
  return reqs.flatMap((a) => {
    if (!a.set) return [a]
    if (seen.has(a.asset)) return []
    seen.add(a.asset)
    const mine = !hasProductRow ? photos : a.asset === 'product-photos' ? photos.filter(isProduct) : photos.filter((x) => !isProduct(x))
    if (!mine.length) return []
    const n = mine.reduce((t, x) => t + x.count, 0)
    const per = uniq(mine.flatMap((x) => (x.per ? [x.per] : [])))
    return [{ ...a, quantity: `${n} photo${n > 1 ? 's' : ''}${per.length ? `, plus a set per ${per.join(' and per ')}` : ''}`, usage: `The parts in the shot list (recipe/media.md): ${mine.map((x) => x.where.split(';')[0].split(' · ').pop()).join(', ')}`, specs: 'One file per shot-list slot, at the size and ratio it gives; one grade across all' }]
  })
}

/** What the pages without ready parts say — they were left to "the page brief" and every builder invented them (Maison
 *  Vey's cart and checkout, Halden's sign in). */
const PAGE_COPY: Partial<Record<PageTypeId, { part: string; says: string }[]>> = {
  cart: [{ part: 'The bag', says: 'Each item with its picture, name, option and price; quantity to change, a way to remove it; the subtotal, what delivery costs or when it is free, and one button to checkout. Empty: one line and a way back to the shop.' }],
  checkout: [{ part: 'Checkout', says: 'Contact, delivery address, delivery choice, then payment — one column, the order summary beside it (above it on phones). Without a payment service, the last step says plainly that payment is not open yet and how to order by email instead.' }],
  account: [{ part: 'Account', says: 'Orders with their status, saved addresses, details; sign out.' }],
  'sign-in': [{ part: 'Sign in', says: 'Email and password, “forgot password”, a link to sign up. Without an account service it says plainly that accounts are not open yet and gives the email.' }],
  'sign-up': [{ part: 'Sign up', says: 'Only the fields an account really needs, what having one gives, the terms in one line. Without an account service it says plainly that accounts are not open yet and gives the email.' }],
  'not-found': [{ part: '404', says: 'One line in the site’s voice that the page is not here, and the two ways on most people want.' }],
  'privacy-policy': [{ part: 'Privacy', says: 'What is collected (forms, analytics, cookies), why, how long it is kept, who sees it, how to ask for it to be deleted — plain sentences, marked as a draft for the owner to check.' }],
  'terms-of-service': [{ part: 'Terms', says: 'The terms in plain sentences, marked as a draft for the owner to check.' }],
}

/** One reference per kind of site, so a site whose look came from another kind's seed (a perfume house on the fashion
 *  seed, an architecture studio on it too — Maison Vey, Fieldhouse) studies sites of its own kind. */
const AWW = (slug: string) => `https://www.awwwards.com/websites/${slug}/`
const kindRef = (title: string, url: string, study: string): InspirationReference => ({ source: url.includes('awwwards') ? 'awwwards' : url.includes('land-book') ? 'land-book' : 'siteinspire', title, url, study, why: 'Sites of the same kind show what visitors of this kind expect to find, and in which order.', principle: 'Meet the visitor’s expectations, then surprise' })
const KIND_REFS: Record<PurposeId, InspirationReference> = {
  portfolio: kindRef('Portfolio websites', AWW('portfolio'), 'How the work is ordered and how little text it needs.'),
  agency: kindRef('Agency websites', AWW('design-agencies'), 'How agencies prove results: case studies, clients, the way in to a project.'),
  studio: kindRef('Studio websites', AWW('design-agencies'), 'How small studios show a few projects in depth, with the people behind them.'),
  fashion: kindRef('Fashion websites', AWW('fashion'), 'Type–image relationships and how collections are paced.'),
  restaurant: kindRef('Food & drink websites', AWW('food-drink'), 'How restaurants balance atmosphere with hours, menu and booking.'),
  ecommerce: kindRef('E-commerce websites', AWW('e-commerce'), 'How premium stores keep product grids calm: gutters, image ratios, quiet prices.'),
  product: kindRef('Technology websites', AWW('technology'), 'How one product is shown in depth: details, use, the way to buy.'),
  saas: kindRef('Land-book — SaaS category', 'https://land-book.com/', 'How software sites explain the product with real screens and one clear sign-up.'),
  'personal-brand': kindRef('Siteinspire — personal sites', 'https://www.siteinspire.com/', 'How one person’s site carries a voice: writing, work, a way to get in touch.'),
  experiment: kindRef('Experimental websites', AWW('experimental'), 'How experiments stay usable while breaking expectations.'),
  other: kindRef('Siteinspire', 'https://www.siteinspire.com/', 'Sites of the same kind as this one: what they show first and what they leave out.'),
  blog: kindRef('Blog websites', AWW('blog'), 'Reading comfort: column width, type size, how articles are listed.'),
  event: kindRef('Event websites', AWW('events'), 'How events show the date, the programme and the way to come.'),
  nonprofit: kindRef('Siteinspire — non-profit', 'https://www.siteinspire.com/', 'How causes show where the money goes and make giving one step.'),
  'real-estate': kindRef('Architecture websites', AWW('architecture'), 'How homes are shown: photography grading, plans, the way to a viewing.'),
  hotel: kindRef('Hotel & travel websites', AWW('travel'), 'How stays are sold: rooms, place, availability one tap away.'),
  course: kindRef('Siteinspire — education', 'https://www.siteinspire.com/', 'How courses show what you learn, who teaches it and when it starts.'),
  clinic: kindRef('Siteinspire — health', 'https://www.siteinspire.com/', 'How practices make booking and contact easy and reassuring.'),
  spa: kindRef('Siteinspire — spa & wellness', 'https://www.siteinspire.com/', 'How spas and bathhouses sell a feeling and still make prices, hours and booking plain.'),
}
/** A seed reference about another kind of site (its category is that kind's). */
const KIND_WORDS = /fashion|e-commerce|shop|food|restaurant|hospitality|architecture|agenc|technology/i

/** Headline and CTA examples per kind of site, used when the base recipe was written for a different kind
 * (a store must never get a portfolio's "Selected work, 2019—2026"). Examples of register, not copy to paste. */
const PURPOSE_COPY: Record<PurposeId, { headlines: string[]; cta: string[] }> = {
  portfolio: { headlines: ['Selected work, 2019—2026', 'Design for things that last', 'Currently taking on new projects'], cta: ['See the work', 'Get in touch'] },
  agency: { headlines: ['We make brands people remember', 'Strategy, design, launch', 'Work that moved the numbers'], cta: ['Start a project', 'See case studies'] },
  studio: { headlines: ['A small studio with a point of view', 'Made slowly, on purpose', 'Recent work'], cta: ['Say hello', 'Visit the studio'] },
  fashion: { headlines: ['The new collection', 'Cut close, worn loose', 'Made in small runs'], cta: ['Discover the collection', 'Shop the look'] },
  restaurant: { headlines: ['Dinner, from seven', 'Seasonal plates, open fire', 'A table is waiting'], cta: ['Book a table', 'See the menu'] },
  ecommerce: { headlines: ['Made to be used every day', 'New this week', 'Small batches, sent in two days'], cta: ['Add to bag', 'See them all'] },
  product: { headlines: ['Meet the new one', 'Everything you need, nothing you don’t', 'Designed around one idea'], cta: ['Pre-order', 'See how it works'] },
  saas: { headlines: ['Close your books in one click', 'Less busywork, more work', 'Set up in five minutes'], cta: ['Start free', 'Book a demo'] },
  'personal-brand': { headlines: ['Hi, I write about type', 'Notes from the work', 'Latest writing'], cta: ['Subscribe', 'Read the latest'] },
  experiment: { headlines: ['Scroll to play', 'Everything here moves', 'An experiment in type'], cta: ['Keep exploring', 'Start'] },
  other: { headlines: ['What we do, in one line', 'Why it matters', 'How to get started'], cta: ['Get in touch', 'Learn more'] },
  blog: { headlines: ['The case for slower design', 'This week: three essays', 'Read the archive'], cta: ['Subscribe', 'Read the latest'] },
  event: { headlines: ['14 June, Sheki', 'Join us', 'The day, hour by hour'], cta: ['RSVP', 'See the schedule'] },
  nonprofit: { headlines: ['Every village deserves a library', '312 libraries built so far', 'Where your gift goes'], cta: ['Donate', 'Volunteer with us'] },
  'real-estate': { headlines: ['Homes by the sea', 'New this month', 'Viewings this weekend'], cta: ['Book a viewing', 'See all listings'] },
  hotel: { headlines: ['Nine rooms above the olive groves', 'Stay a while', 'Slow mornings, long dinners'], cta: ['Check availability', 'See the rooms'] },
  course: { headlines: ['Learn lettering in six weeks', 'Next cohort starts 3 March', 'What you’ll make'], cta: ['Enrol now', 'Watch a free lesson'] },
  clinic: { headlines: ['Gentle care, open late', 'Treatments for the whole family', 'Meet your dentist'], cta: ['Book an appointment', 'Call the practice'] },
  spa: { headlines: ['Heat first, then the sea', 'Two hours, nothing else to do', 'Open from first light'], cta: ['Book a visit', 'See the prices'] },
}

const TECH_LABEL = { css: 'CSS (transitions, scroll-driven animations)', motion: 'Motion', lenis: 'Lenis', three: 'React Three Fiber + drei' } as const

export function composeRecipe(input: RecipeSpec, id?: string): UniversalRecipe {
  const spec = normalizeSpec(input)
  const seed = seedBySlug[spec.base] ?? recipeSeeds[0]
  const direction = directions[spec.direction]
  const purpose = purposes[spec.purpose]
  const palette = palettes[spec.palette]
  const type = typography[spec.typography]
  const layout = layouts[spec.layout]
  const frame = FRAMES[spec.layout]
  const ratio = (r: string) => r.replace(/\s*\/\s*/, ':')
  const motion = motionLevels[spec.motion]
  const hero = resolveHero(spec)
  const lead = media[spec.lead]
  const chars = spec.characters.map((c) => characters[c])
  const sameDirection = seed.spec.direction === spec.direction
  // The seed's own voice (personality, principles, do/avoid, tone) is written for its kind of site: a shop's "SKU, price,
  // stock" must not reach a charity that shares its look. Other kinds get the look's own, purpose-neutral words.
  const seedVoice = sameDirection && seed.spec.purpose === spec.purpose
  const unchanged = sameCore(seed.spec, spec)
  const textured = TEXTURED.has(spec.direction)

  const adjective = chars[0]?.adjective ?? ''
  // "Cheeky Sticker Studio" + "Studio Site" reads "… Studio Site", not "… Studio Studio Site".
  const [kind, ...rest] = purpose.noun.split(' ')
  const noun = direction.name.endsWith(kind) ? rest.join(' ') : purpose.noun
  const composedTitle = [direction.name.includes(adjective) ? '' : adjective, direction.name, noun].filter(Boolean).join(' ')
  const brief = spec.brief ?? {}
  const goal = brief.goal && goals[brief.goal]
  const title = brief.name ? `${brief.name} — ${composedTitle}` : unchanged ? seed.title : composedTitle
  const slug = unchanged ? seed.slug : camel(composedTitle).replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`).replace(/^-/, '')

  const baseSummary = unchanged && !brief.name ? seed.summary
    : `${/^[aeiou]/i.test(purpose.noun) ? 'An' : 'A'} ${purpose.noun.toLowerCase()} in the ${direction.name} look: the ${type.name} lettering (${uniq([type.display.family, type.body.family]).join(' with ')}), the ${palette.name} palette, ${leads[spec.lead].name.toLowerCase()} leading and ${motion.name.toLowerCase()} motion.`
  const summary = [
    brief.offer && `${brief.name ?? 'The project'}: ${brief.offer.replace(/\.$/, '')}.`,
    baseSummary,
    goal ? `Primary goal: ${goal.name.toLowerCase()}.` : '',
  ].filter(Boolean).join(' ')

  const colors = { ...palette.colors, ...spec.customPalette }
  const rotationId = spec.rotation === 'off' ? undefined : spec.rotation ?? direction.rotation
  const rotationSet = rotationId ? accentSets[rotationId] : undefined
  // A picked headline behaviour replaces the generic line reveal; the section entrance speaks the look's own family.
  const headlinePiece = (spec.pieces ?? []).some((id) => behaviourOf(id) === 'headlines')
  // A hover preview needs a list of names to hover (featured work, journal, a hover-reveal photo layout) — not on every site that moves (Halden, #20).
  const listed = spec.pages.some((p) => p.sections.some((x) => x === 'featured-work' || x === 'journal')) || spec.imagePresentation === 'hover-reveal' || !!spec.sectionPhotos?.some((x) => x.presentation === 'hover-reveal')
  const patterns = motionPatterns.filter((p) => p.levels.includes(spec.motion) && (!p.leads || p.leads.includes(spec.lead)) && !(headlinePiece && p.id === 'line-reveal') && !(p.id === 'hover-preview' && !listed))
    .map((p) => (p.id === 'fade-rise' ? { ...p, ...ENTRANCE[direction.families[0]] } : p))
  const techs = uniq(patterns.map((p) => p.tech))
  const assetRequirements = buildAssets(spec, hero)
  const imagery = imageryPlan(spec)

  const resolveSection = (sid: SectionId, h: HeroPattern = hero) => {
    const base = sections[sid]
    // A seed's notes name its own fonts and roles — only when the lettering is the seed's too.
    const note = sameDirection && seed.spec.purpose === spec.purpose && seed.spec.typography === spec.typography ? seed.sectionNotes[sid] : undefined
    const heroCode = heroBlocks[h.id]
    return sid === 'hero'
      ? { ...base, name: `Hero — ${h.name}`, composition: h.composition, behavior: h.behavior, responsive: h.responsive, note, ...(heroCode ? { code: { path: `src/components/sections/${heroCode.file}`, exportName: heroCode.exportName, usage: heroCode.usage } } : {}) }
      : { ...base, note, ...(blockFor(sid) ? { code: { path: `src/components/sections/${blockFor(sid)!.file}`, exportName: blockFor(sid)!.exportName, usage: blockFor(sid)!.usage } } : {}) }
  }
  const nav = navStyles[spec.nav ?? recommendedNav(spec)]
  const shape = shapeStyles[spec.shape ?? recommendedShape(spec)]
  const laid: PageBlueprint[] = spec.pages.map((p) => ({ id: p.id, type: p.type, label: p.label, purpose: p.purpose, ...(p.hide ? { hide: p.hide } : {}), sections: p.sections.map((sid, index) => {
    // A film/image part can show something other than the first screen does: then it needs media of its own.
    const band = sid === 'hero' ? spec.heroBands?.find((x) => x.page === p.id && x.index === index) : undefined
    const shows = band && band.hero !== hero.id ? heroes[band.hero] : undefined
    const r = resolveSection(sid, shows)
    const s = shows ? { ...r, composition: `${r.composition} This part shows ${shows.name}, not what the site's first screen shows — it needs its own ${shows.leads.join(' or ')}, separate from the first screen's media.` } : r
    if (sid === 'hero' && index > 0) return midPageHero(s, p.sections[0], p.sections[index - 1])
    if (!PHOTO_SECTIONS.includes(sid)) return s
    const own = spec.sectionPhotos?.find((x) => x.page === p.id && x.index === index)?.presentation
    return { ...s, photos: { ...imagePresentations[own ?? spec.imagePresentation ?? recommendSectionPhotos(spec, sid)], chosen: !!own } }
  }) }))
  const concept = resolveConcept(spec, hero, laid)
  const footerStyle = footerStyles[spec.footer ?? recommendedFooter(spec, concept?.id)]
  const chrome = {
    navbar: { ...resolveSection('navbar'), name: `Navigation — ${nav.name}`, composition: nav.composition, behavior: nav.behavior, responsive: nav.responsive },
    footer: footerSection(resolveSection('footer'), footerStyle, direction.families[0], palette.dark), nav, footerStyle,
  }
  const fam = direction.families[0]
  // A footer band is the text colour as ground — on a dark palette that is a light band, so there it sits on the ground.
  const footerInverse = !palette.dark && footerStyle.id !== 'line' && footerStyle.id !== 'index'
  const pages = laid.map((p) => ({ ...p, sections: pageRhythm(p.sections, spec, !!rotationSet, footerInverse).map((s, index) => {
    const picked = spec.sectionVariants?.find((x) => x.page === p.id && x.index === index)?.variant
    const id = variantFor(s.id as SectionId, fam, picked)
    const o = id ? sectionVariants[s.id as SectionId]!.options.find((x) => x.id === id)! : undefined
    // The reference call shows the design this part is built in, not the component's default (Fieldhouse: "rail" over "columns").
    const code = o && s.code ? { ...s.code, usage: /variant="[^"]*"/.test(s.code.usage) ? s.code.usage.replace(/variant="[^"]*"/, `variant="${o.id}"`) : s.code.usage.replace(/^<(\w+)/, `<$1 variant="${o.id}"`) } : s.code
    return o ? { ...s, variant: { ...o, chosen: !!picked && picked === id }, ...(code ? { code } : {}) } : s
  }) }))
  const signatures = pickSignatures(spec, hero, pages, concept?.id)
  const who = brief.name ?? 'the business'
  // The copy deck: what every part of every page says, written before any layout, from the owner's own words.
  const copy = pages.map((p) => ({ page: p.label, brief: p.purpose, parts: [...(PAGE_COPY[p.type] ?? []), ...p.sections.map((s) => ({ part: s.name.split(' — ')[0], says: `${s.purpose}. ${s.content}.`.replace(/\.\./g, '.') }))] }))
  // The shot list: which picture or film the site needs, once each — a part on several pages (the product grid on Home,
  // Shop and Cart) is one set of files; a part on a page that repeats per item (each product, each project) is one set
  // per item. The asset layer and the checklist are built from it, so all three agree (Fieldhouse, Maison Vey, Halden).
  const shotMap = new Map<string, Shot>()
  const addShot = (where: string, make: () => Shot) => { const x = make(), had = shotMap.get(x.key); if (had) had.where += `; ${where}`; else shotMap.set(x.key, x) }
  const heroShows = (h: HeroPattern, film: boolean) => film
    ? `${who} in one continuous move: the place at its best light, with calm space where the headline sits`
    : h.id === 'product-stage' ? `${who}’s product alone, large and clean on a calm ground, from its best angle — with space where its name and price sit`
      : `The opening picture of ${who}: the place, the thing it makes or the person, at its best light, with calm space where the headline sits`
  pages.forEach((p, pi) => p.sections.forEach((s, i) => {
    const label = pages.length > 1 ? `${p.label} · ` : ''
    const sid = s.id as SectionId
    if (sid === 'hero') {
      const band = spec.heroBands?.find((x) => x.page === p.id && x.index === i)
      const h = band ? heroes[band.hero] : i === 0 || pi === 0 ? hero : undefined
      if (!h) return
      const film = band ? h.leads.includes('video') : spec.lead === 'video'
      if (!film && !(band ? h.leads.includes('photography') : ['photography', 'product'].includes(spec.lead))) return
      const where = `${label}${i === 0 ? 'First screen' : 'Film band'} — ${h.name}`
      const key = band && band.hero !== hero.id ? camel(`${p.label} band ${film ? 'video' : 'image'}`) : film ? 'heroVideo' : 'hero'
      const ratio = h.id === 'parallax-photo' || film ? '16:9' : '4:5', px = h.id === 'parallax-photo' ? 2800 : film ? 1920 : 2400
      return addShot(where, () => ({ key, where, kind: film ? 'film' : 'photo', shows: heroShows(h, film), count: 1, ratio, size: sizeOf(ratio, px),
        format: film ? filmFormat(h.id) : h.id === 'parallax-photo' ? 'min 2800px · 16:9 for desktop, plus a 4:5 crop for phones (Mobile hero crop)' : `1 photo · ${ratio} · ${sizeOf(ratio, px)}` }))
    }
    const sh = (s.variant && VARIANT_SHOTS[sid]?.[s.variant.id]) || SHOTS[sid]
    if (!sh) return
    const per = (LIST_SECTIONS.has(sid) ? undefined : ITEM_PAGES[p.type]) ?? sh.per
    // A per-item set is named for its page (productPageHighlight, projectPageGallery), never sharing a key with the same
    // part elsewhere on the site.
    const key = camel(per ? `${per} page ${sid.replace(`${per}-`, '')}` : sid)
    const where = `${label}${sections[sid].name}`
    // The file takes the ratio its section crops to — the layout's card or media token, a band 21:9 — so nothing is cut.
    const r = sh.frame === 'card' || (sh.frame === 'media' && s.media === 'side') ? ratio(frame.ratioCard) : sh.frame === 'media' ? (s.media === 'full' && ['editorial-story', 'case-study'].includes(sid) ? '21:9' : ratio(frame.ratioMedia)) : sh.ratio
    addShot(where, () => ({ key, where, kind: 'photo', shows: sh.shows, count: sh.n, ratio: r, size: sizeOf(r, sh.px), ...(per ? { per } : {}),
      format: `${sh.n} photo${sh.n > 1 ? 's' : ''}${per ? ` per ${per}` : ''}${sh.note ? ` (${sh.note})` : ''} · ${r} · ${sizeOf(r, sh.px)}` }))
  }))
  const shots = [...shotMap.values()]
  const kit = placePieces(spec, pages, signatures)

  // Menu, footer, first screen and closing CTA are defined by the chosen patterns (chrome, hero, ready sections) — listing
  // them again as generic components contradicted those picks. No forced SectionHeader: its "index number, label,
  // heading" is the 01 / // label chrome the recipe's own generic-tells list forbids.
  const CHROME: ComponentId[] = ['Navigation', 'Hero', 'CTA', 'Footer', 'SectionHeader']
  const componentIds = uniq<ComponentId>([...purpose.components.filter((c) => !CHROME.includes(c)), 'MediaAsset'])

  const deps: { name: string; why: string }[] = []
  if (techs.includes('motion') || kit.some((k) => k.deps.includes('motion')) || heroBlocks[hero.id]) deps.push({ name: 'motion', why: kit.length ? 'Viewport reveals, hover and layout animations — and the kit pieces in src/components/pieces/' : 'Viewport reveals, hover and layout animations in React' })
  if (kit.some((k) => k.deps.includes('@paper-design/shaders-react'))) deps.push({ name: '@paper-design/shaders-react', why: 'GPU backgrounds used by your kit (Apache-2.0)' })
  if (kit.some((k) => k.deps.includes('lenis'))) deps.push({ name: 'lenis', why: 'Smooth scroll for the SmoothScroll kit piece (MIT; mouse and trackpad only)' })
  else if (techs.includes('lenis')) deps.push({ name: 'lenis', why: 'Smooth scroll on desktop; Motion useScroll reads the scroll it keeps' })
  if (techs.includes('three')) deps.push({ name: 'three', why: 'WebGL renderer' }, { name: '@react-three/fiber', why: 'Declarative Three.js in React' }, { name: '@react-three/drei', why: 'Loaders, controls and helpers (useGLTF, Environment)' })

  const heading = `${type.display.family} / ${type.body.family}`
  const keep = seedVoice
    ? { type: spec.typography === seed.spec.typography, colour: spec.palette === seed.spec.palette && !spec.customPalette, shape: !spec.shape || spec.shape === recommendedShape(seed.spec) }
    : { type: direction.typography.includes(spec.typography), colour: direction.palettes.includes(spec.palette) && !spec.customPalette, shape: !spec.shape || spec.shape === recommendedShape(spec) }
  const fontsUsed = uniq([type.display.family, type.heading.family, type.body.family, type.utility.family])
  const principles = fitTells(fitPicks(seedVoice ? seed.principles : direction.principles, keep), colors, fontsUsed)

  return {
    id: id ?? seed.slug,
    title, slug, summary,
    creativeDirection: {
      mood: seedVoice ? seed.mood : uniq([...direction.mood, ...chars.map((c) => c.name)]),
      personality: seedVoice ? seed.personality : chars.map((c) => `${c.name} — ${c.line.toLowerCase()}`).join('; ') || direction.line,
      visualPrinciples: principles,
      do: fitTells(fitPicks(seedVoice ? seed.do : direction.do, keep), colors, fontsUsed),
      avoid: fitTells(fitPicks(seedVoice ? seed.avoid : direction.avoid, keep), colors, fontsUsed),
      genericAvoid: fitTells(GENERIC_TELLS, colors, fontsUsed),
    },
    style: fitStyle(direction.id, direction.name, colors, fontsUsed),
    designPrinciples: uniq([...principles, motion.principle]),
    visualSystem: {
      palette: { id: palette.id, name: spec.customPalette ? `${palette.name} (customised)` : palette.name, custom: !!spec.customPalette, dark: palette.dark, tokens: paletteTokens(colors, palette.usage) },
      typography: type,
      ...(rotationSet ? { rotation: rotationSet } : {}),
      spacing: { base: '8px', scale: ['4', '8', '12', '16', '24', '32', '48', '64', '96', '128', '160', '240'].map((n) => `${n}px`), sectionSpacing: `${frame.sectionY} (--section-y)`, note: 'Inside a section use only values from the scale; between sections use --section-y. Space between sections is always larger than space within them.' },
      grid: { container: frame.container, columns: layout.grid, gutters: frame.gutter },
      shape,
    },
    // Every number here is the token tokens.css ships (lib/frame.ts) — the text and the tokens used to disagree, and all
    // three builders rewrote the tokens (Fieldhouse, Maison Vey, Halden). The hero composition is the hero's own.
    layoutSystem: {
      id: layout.id, name: layout.name, container: `max-width ${frame.container === '100%' ? 'none (full width)' : frame.container}, side gutter ${frame.gutter} (--container, --gutter)`, grid: layout.grid, columns: layout.columns, gutters: `${frame.gutter} (--gutter)`,
      sectionSpacing: `${frame.sectionY} between sections (--section-y)`, alignment: layout.alignment, heroComposition: hero.composition,
      cardProportions: `${ratio(frame.ratioCard)} for project, product and people cards (--ratio-card)`, mediaProportions: `${ratio(frame.ratioMedia)} for pictures beside text (--ratio-media); 21:9 for a full-width band. Photo files follow the shot list (recipe/media.md)`, why: layout.why,
    },
    chrome,
    pages,
    components: componentIds.map((c) => c === 'Hero' ? { ...components.Hero, anatomy: hero.composition, behavior: hero.behavior } : components[c]),
    media: { ...lead, hero, storytelling: filmStory(spec, hero), imagery, framing: videoFraming(spec), shots },
    motion: { level: motion, principle: motion.principle, patterns, libraries: techs.map((t) => TECH_LABEL[t]) },
    ...(concept ? { concept } : {}),
    signatures,
    pieces: kit,
    contentDirection: {
      tone: seedVoice ? seed.content.tone : chars.flatMap((c) => c.tone).join(', ') || direction.mood.join(', ').toLowerCase(),
      voice: chars.map((c) => c.voice).join(' ') || 'Plain, specific, confident.',
      headlineStyle: chars[0]?.headlineStyle ?? 'Short, specific statements',
      headlineExamples: seed.spec.purpose === spec.purpose ? seed.content.headlineExamples : PURPOSE_COPY[spec.purpose].headlines,
      paragraphLength: spec.lead === 'typography' ? '1–3 sentences; let headlines carry the page' : '2–4 sentences (40–80 words); never more than 65 characters per line',
      ctaStyle: goal ? `${goal.effect} ${purpose.ctaPattern}` : purpose.ctaPattern,
      ctaExamples: (() => { const base = seed.spec.purpose === spec.purpose ? seed.content.ctaExamples : PURPOSE_COPY[spec.purpose].cta; return goal ? uniq([...goal.cta, ...base]).slice(0, 4) : base })(),
      wordsToAvoid: WORDS_TO_AVOID,
      density: seed.content.density,
      source: brief.name || brief.offer
        ? `Write from the owner's own words — ${[brief.name && `the name “${brief.name}”`, brief.offer && `“${brief.offer.replace(/\.$/, '')}.”`].filter(Boolean).join(' and ')} Every headline, line and claim grows from them: name what is really there — what is made, where, when, for whom. The headline and CTA examples are only the register, taken from another site: never reuse them. Anything you must invent (quotes, prices, names, numbers, dates) is marked in the copy deck as a placeholder for the owner to replace.`
        : 'Nothing from the owner yet: write plain, specific copy for this kind of site, and mark every invented fact (quotes, prices, names, numbers, dates) in the copy deck as a placeholder for the owner to replace.',
      copy,
    },
    assetRequirements: fitSets(assetRequirements, shots),
    assetCreationPaths: buildCreationPaths(spec, assetRequirements),
    resources: pickResources(spec, textured),
    references: seed.spec.purpose === spec.purpose ? seed.references.filter((x) => fitTells([`${x.study} ${x.why}`], colors, fontsUsed).length)
      : [KIND_REFS[spec.purpose], ...seed.references.filter((x) => !KIND_WORDS.test(x.title) && fitTells([`${x.study} ${x.why}`], colors, fontsUsed).length)],
    implementation: {
      stack: uniq(['Next.js (App Router)', 'TypeScript', 'Tailwind CSS', ...techs.filter((t) => t !== 'css').map((t) => TECH_LABEL[t]), ...(deps.some((d) => d.name === 'lenis') ? [TECH_LABEL.lenis] : [])]),
      dependencies: [...deps, { name: 'shadcn/ui', why: 'Accessible, themeable controls and forms (Radix primitives) — see UI components' }],
      fileStructure: [
        'src/',
        '  app/            — routes; layout.tsx loads fonts via next/font',
        '  components/     — ' + componentIds.join(', '),
        '  config/assets.ts — asset reference layer (every image/video by key)',
        kit.length ? `  components/pieces/ — your kit, ready to use: ${kit.map((k) => k.exportName).join(', ')}` : '',
        '  styles/tokens.css — palette + type tokens as CSS variables',
        techs.includes('lenis') ? '  lib/motion.ts   — Lenis setup, reduced-motion guard' : '',
        techs.includes('three') ? '  components/scene/ — R3F canvas, lazy-loaded' : '',
        'public/media/     — optimised images and videos',
      ].filter(Boolean).join('\n'),
      sequence: [
        'Write the copy deck first (recipe/content.md → Copy deck): every headline, line and button of every part, from the owner’s own words, into src/content/ — no layout before the words exist.',
        `Set up tokens: tokens.css is ready — load each face with next/font in app/layout.tsx with the variable tokens.css reads (${uniq([type.display.family, type.body.family, type.heading.family, type.utility.family]).map((f) => `${f} → --font-${f.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`).join(', ')})${type.display.italic ? ', the italic style included' : ''}. If next/font/google fails under Turbopack (“queries have exactly one entry”), run dev and build with --webpack, or download the faces into src/fonts and use next/font/local.`,
        'Build the asset config layer (config/assets.ts) and <MediaAsset/> so every media reference is replaceable; place media by the shot list (recipe/media.md) — a part still waiting for its media gets a temporary picture of the same subject and format, listed in your final reply.',
        `Build static layout for all ${pages.length} pages (${pages.flatMap((p) => p.sections).length} sections plus navbar and footer) with real copy — no motion yet.`,
        `Build the hero: ${hero.name}.`,
        ...(pages.some((p) => p.sections.some((x) => x.photos)) ? [`Build each photo part as its own Photos line says (recipe/layout.md): ${uniq(pages.flatMap((p) => p.sections.flatMap((x) => (x.photos ? [`${x.name.split(' — ')[0]} — ${x.photos.name}`] : [])))).join('; ')}.`] : imagery ? [`Build the photo layout: ${imagery.presentation.name} (see Media → Photos).`] : []),
        'Make every section responsive (mobile first, then tablet and desktop).',
        spec.motion === 'still' ? 'Add state feedback (hover/focus) only.' : `Add motion in order of importance: ${patterns.filter((p) => p.id !== 'state-feedback').map((p) => p.name).join(', ')}.`,
        `Build what you invented: the remembered moment of each page you named in your plan, the hand-overs between parts and every state, using the moves and craft of ${direction.name} (recipe/design.md → What ${direction.name} is known for).`,
        'Add reduced-motion variants, then run the visual QA checklist against this recipe.',
      ],
      responsive: [
        'Design mobile as its own composition, not a squeezed desktop.',
        `Hero: ${hero.responsive}`,
        `Type: display scales with clamp() — ${type.display.size}; re-break headlines manually on mobile.`,
        `Grid: ${layout.grid}; ${layout.gutters}.`,
        'Touch targets ≥ 44px; primary action reachable with a thumb.',
      ],
      accessibility: [
        'Semantic landmarks (header, nav, main, footer) and one h1 per page.',
        'Keyboard focus is shown without rings or outlines: a focused field darkens its border, a focused link or button gets an underline or background change.',
        'Every animation has a prefers-reduced-motion alternative (see Motion System).',
        'Alt text for meaningful images; empty alt for decorative ones.',
        ...(spec.lead === 'video' ? ['Video: pause control, no autoplay with sound, captions if speech.'] : []),
        ...(spec.lead === '3d' ? ['3D canvas is decorative (aria-hidden); all information also exists in HTML.'] : []),
        `Check contrast: body text must pass AA (${contrast(colors.text, colors.background).toFixed(1)}:1 on background).`,
      ],
      ui: uiKit(pages, colors, shapeStyles[spec.shape ?? recommendedShape(spec)], spec.brief?.goal, spec.purpose),
      performance: [
        'Only the hero media uses priority loading; everything else lazy-loads.',
        'Animate only transform, opacity and clip-path (all compositor-friendly); never layout properties such as width, height, top or margin.',
        `Self-host fonts with next/font; ${heading} — subset display faces.`,
        ...(spec.lead === 'video' ? ['Video: preload="metadata", poster image, ≤ 6MB desktop / ≤ 3MB mobile, pause off-screen.'] : []),
        ...(spec.lead === '3d' ? ['3D: lazy-load the canvas, Draco-compress models, cap DPR at 2, stop rendering off-screen.'] : []),
        spec.lead === 'video'
          ? 'Target: LCP < 2.5s on a mid-range phone, measured on the poster still — the LCP element: it is a plain <img> with priority, painted before any script; the film, the scroll pin and the motion library load after it. CLS < 0.1, INP < 200ms.'
          : 'Target: LCP < 2.5s, CLS < 0.1, INP < 200ms on a mid-range phone.',
      ],
    },
    whyItWorks: {
      direction: seedVoice ? seed.whyDirection : direction.why,
      typography: type.why,
      palette: spec.customPalette ? `${palette.why} Your custom colors keep the same roles, so the system still holds — check the contrast notes above.` : palette.why,
      layout: layout.why,
      motion: `${motion.why} ${patterns.length > 1 ? `Here, ${patterns.filter((p) => p.id !== 'state-feedback').slice(0, 2).map((p) => p.name.toLowerCase()).join(' and ')} serve the story: ${patterns.find((p) => p.id !== 'state-feedback')?.purpose.toLowerCase() ?? ''}` : ''}`.trim(),
      assets: lead.why,
    },
    metadata: {
      spec, familyIds: direction.families, complexity: complexity(spec), recommendedTarget: recommendedTarget(spec), version: 1,
      image: unchanged ? seed.image : direction.image,
    },
  }
}

/** What a page leaves out of the shared frame, in words ('' when it shows both). */
export const chromeNote = (p: { hide?: ChromeId[] }) => {
  const h = p.hide ?? []
  return h.length === 2 ? 'No menu and no footer on this page — it stands on its own.' : h[0] === 'navbar' ? 'No menu on this page (the footer stays).' : h[0] === 'footer' ? 'No footer on this page (the menu stays).' : ''
}

/** The footer as its chosen style: the style's layout, and the ready footer's matching `variant`. */
// The big name set whole, cut off by the page's bottom edge, or drawn as an outline — so wordmark footers differ.
const WORDMARK: Partial<Record<FamilyId, 'cropped' | 'outline'>> = { raw: 'cropped', experimental: 'cropped', bold: 'cropped', editorial: 'outline', cinematic: 'outline', futuristic: 'outline' }
const WORDMARK_LINE = { full: 'set whole', cropped: 'cut off by the bottom edge of the page (copyright and legal sit above it)', outline: 'drawn as an outline in the text colour, not filled' }

function footerSection(s: PageSection, f: FooterStyle, family: FamilyId, dark = false): PageSection {
  const mark = f.id === 'wordmark' ? WORDMARK[family] ?? 'full' : undefined
  // On a dark palette the footer keeps the page ground (`light`): the text colour as ground would be a cream band.
  const ground = dark && f.id !== 'line' && f.id !== 'index'
  const raw = f.id === 'signature' ? s.code?.usage : s.code?.usage.replace('<FooterSection ', `<FooterSection variant="${f.id}" ${mark ? `brand="…" ${mark === 'full' ? '' : `wordmark="${mark}" `}` : f.id === 'contact' ? 'invite="…" contact={[{ label, href }]} ' : ''}`)
  const usage = ground ? raw?.replace('<FooterSection ', '<FooterSection light ') : raw
  const comp = ground ? f.composition.replace(/^Dark band \(text colour as ground\): /, 'On the page ground, set off by a hairline above: ') + (/text colour as ground|dark band/i.test(f.composition) ? '' : ' It stays on the page ground (the palette is dark).') : f.composition
  const composition = mark ? `${comp} The name is ${WORDMARK_LINE[mark]}.` : comp
  return { ...s, name: `Footer — ${f.name}`, composition, behavior: f.behavior, responsive: f.responsive, ...(s.code && usage ? { code: { ...s.code, usage } } : {}) }
}

/** The hero pattern placed lower on a page (the owner's choice): the same film or image, built as a full-width band at
 *  that spot — not a first screen. The page's own first section opens it and carries the h1. */
function midPageHero(s: PageSection, first: SectionId, prev: SectionId): PageSection {
  const at = `Placed mid-page, right after ${sections[prev].name} — not the first screen. Build it as a full-width band at exactly this point of the page: the page opens with ${sections[first].name}, whose heading is the page's h1 (this band's headline is an h2), and the menu sits solid over that first section, never overlaid on this band. A pinned or scroll-driven version pins only while this band is in view and releases before the next section; its video loads and plays only as the band nears the viewport (preload="none" + IntersectionObserver), never at page load.`
  return { ...s, name: `${s.name} · mid-page`, composition: `${at} ${s.composition}` }
}

/** Never let an incomplete Recipe reach Build Package generation. */
export function validateRecipe(r: UniversalRecipe): string[] {
  const problems: string[] = []
  if (!r.title) problems.push('title')
  if (!r.summary) problems.push('summary')
  if (r.visualSystem.palette.tokens.length !== 8) problems.push('palette tokens')
  if (!r.visualSystem.typography.display.family) problems.push('typography')
  if (r.pages.length < 1) problems.push('pages')
  if (r.pages.flatMap((p) => p.sections).length < 4) problems.push('page structure')
  if (r.components.length < 3) problems.push('components')
  if (r.motion.patterns.length < 1) problems.push('motion system')
  if (r.assetRequirements.length < 3) problems.push('asset requirements')
  if (r.references.length < 1) problems.push('references')
  if (Object.values(r.whyItWorks).some((v) => !v)) problems.push('why it works')
  return problems
}

export const seedRecipes = () => recipeSeeds.map((s) => composeRecipe(specFromSeed(s)))
