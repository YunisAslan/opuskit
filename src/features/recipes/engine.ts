// Design Decision Engine: deterministic composition of curated ingredients into a Universal Recipe.
// Same spec in → same recipe out. Remix = change one spec field and recompose.

import { characters, directions, goals, leads, motionLevels, purposes } from '@/data/taxonomy'
import { colorRoles, layouts, palettes, typography } from '@/data/ingredients'
import { GENERIC_TELLS, components, heroes, imagePresentations, media, motionPatterns, navStyles, pageTypes, sections, shapeStyles, signaturePatterns, UI_ALWAYS, uiByPage, uiBySection, uiNames } from '@/data/patterns'
import { recipeSeeds, seedBySlug } from '@/data/recipes'
import { resources } from '@/data/resources'
import { contrast, contrastLabel, isHex } from '@/lib/color'
import type {
  AssetCreationPath, AssetRequirement, AssetSpec, Brief, BuildTarget, ColorRole, ColorToken, ComponentId, HeroId, HeroPattern, ImagePresentationId, ImageryPlan,
  LeadId, MotionLevel, NavStyleId, ShapeStyle, UiKit, SignaturePattern, PageBlueprint, ShapeId, SignatureMoment, PageSpec, PaletteColors, PaletteId, PurposeId, RecipeSeed, RecipeSpec, SectionId, TypographyId, UniversalRecipe,
} from '@/types/domain'

// ─── Spec helpers ────────────────────────────────────────────────────────────

export function defaultPagesFor(purpose: PurposeId): PageSpec[] {
  return purposes[purpose].pages.filter((p) => p.tier === 'recommended').map((p) => ({
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

export function resolveHero(spec: Pick<RecipeSpec, 'lead' | 'motion' | 'hero'>): HeroPattern {
  const options = heroOptions(spec.lead, spec.motion)
  const chosen = spec.hero && options.find((h) => h.id === spec.hero)
  if (chosen) return chosen
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

/** Keeps a spec coherent after any change (questionnaire or Remix). Only dependent decisions move. */
export function normalizeSpec(spec: RecipeSpec): RecipeSpec {
  const next = { ...spec, characters: spec.characters.slice(0, 2), brief: cleanBrief(spec.brief) }
  if (!next.brief) delete next.brief
  if (next.hero && !heroOptions(next.lead, next.motion).some((h) => h.id === next.hero)) delete next.hero
  const hero = resolveHero(next)
  if (hero.forcesLayout) next.layout = hero.forcesLayout
  const locked = directions[next.direction].layoutLocked
  if (locked) next.layout = locked
  if (next.lead !== 'video' && next.mediaPlan === 'image-to-video') delete next.mediaPlan
  if (next.videoFrame !== 'wide' && next.videoFrame !== 'original') delete next.videoFrame
  if (next.nav && !Object.hasOwn(navStyles, next.nav)) delete next.nav
  if (next.shape && !Object.hasOwn(shapeStyles, next.shape)) delete next.shape
  if (next.signatures) next.signatures = next.signatures.filter((id) => signaturePatterns.some((p) => p.id === id)).slice(0, 4)
  if (next.customPalette && !Object.values(next.customPalette).every(isHex)) delete next.customPalette
  if (next.imagePresentation && !Object.hasOwn(imagePresentations, next.imagePresentation)) delete next.imagePresentation
  if (!seedBySlug[next.base]) next.base = directions[next.direction].baseRecipe
  if (next.pages.length === 0) next.pages = defaultPagesFor(next.purpose)
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
  'warm-ivory': 'legal-pad', 'rice-paper': 'pink-plaster', 'dark-cinematic': 'black-box', monochrome: 'signal-white', earthy: 'celery-room',
  'muted-color': 'pink-plaster', 'deep-color': 'oxblood-room', 'high-contrast': 'hazard-yellow', 'swiss-signal': 'signal-white',
  'atelier-noir': 'bottle-green', 'midnight-signal': 'night-ink', 'gallery-cobalt': 'klein-field',
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
  if (a.asset === 'video' && spec.mediaPlan === 'image-to-video') return 'create'
  if (spec.mediaPlan === 'temporary' && a.level === 'required' && ['images', 'video', 'product-photos', 'illustrations', '3d'].includes(a.asset)) return 'temporary'
  if (a.asset === 'copy' || a.asset === 'logo') return 'create'
  return 'find'
}

const SOURCE: Record<string, string> = {
  images: 'Unsplash / Pexels', video: 'Pexels Videos / Coverr', 'product-photos': 'Own photoshoot', illustrations: 'Commissioned illustrator',
  '3d': 'Spline / Poly Haven', fonts: 'Google Fonts', copy: 'Written by you', logo: 'Your brand identity',
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
    if (moving && ['agency', 'studio'].includes(spec.purpose)) return ['hover-reveal', `a ${kind} — a list of names stays calm and each photo appears when it is wanted`]
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
  if (!spec.imagePresentation && !rec.photos && !spec.brief?.photos && spec.lead !== 'photography') return undefined
  return { presentation: imagePresentations[spec.imagePresentation ?? rec.id], photos: rec.photos, orientation: rec.orientation, recommended: rec.id, why: rec.why, note: spec.brief?.photos }
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
    { asset: 'logo', label: 'Logo', quantity: '1 set', level: 'required', usage: 'Navigation, footer, favicon', specs: 'SVG; dark and light versions; square symbol for favicon' },
    { asset: 'fonts', label: 'Typefaces', quantity: `${uniq([t.display.family, t.body.family, t.utility.family]).length} families`, level: 'required', usage: 'All text', specs: uniq([t.display.family, t.heading.family, t.body.family, t.utility.family]).join(', ') + ` (${t.source})` },
    { asset: 'copy', label: 'Final copy', quantity: 'All sections', level: 'required', usage: 'Headlines, body, CTAs', specs: 'Written in the recipe voice before layout; headlines ≤ 8 words' },
    ...media[spec.lead].assets,
  ]
  // Photos for the rest of the site, whatever leads the first screen. First 'images' row, so it claims the user's photos.
  const imagery = imageryPlan(spec)
  if (imagery && spec.lead !== 'photography') {
    list.splice(3, 0, { asset: 'images', label: 'Your photos', quantity: imagery.photos ? `${imagery.photos} photos` : imagery.presentation.ideal, level: 'recommended',
      usage: `${imagery.presentation.name} — ${imagery.presentation.line.toLowerCase()}`, specs: 'Min 2400px long edge, one consistent grade; keep each photo’s original shape unless the layout says otherwise' })
  }
  if (hero.id === 'scroll-video' || hero.id === 'scroll-video-page') list.push({ asset: 'video', label: 'Scrub-ready encode', quantity: '1 file', level: 'required', usage: hero.id === 'scroll-video' ? 'Scroll-controlled hero' : 'Scroll-controlled page background', specs: 'Made by scripts/prepare-video.sh from the ORIGINAL file: CRF 20, keyframe every 6 frames, ≤ 1920 px' })
  const off = offShapeVideo(spec)
  if (off && spec.videoFrame !== 'original') list.push({ asset: 'video', label: 'Widescreen version', quantity: '1 file', level: 'recommended', usage: 'Desktop and tablet hero — fills 16:9 screens',
    specs: `16:9, 1920×1080 or larger, made from your ${off.width}×${off.height} video. Best: an AI “expand” to 16:9, which keeps every pixel of your video sharp. Otherwise prepare-video.sh crops and upscales it. Phones keep your original.` })
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
    const providedNote = providedFiles ? `user-provided: ${providedFiles.map((f) => f.name).join(', ')}` : sibling ? 'made from your uploaded file' : 'marked as available — no file attached yet'
    return {
      ...a, key: camel(a.label), status, providedFiles,
      source: status === 'have' ? providedNote : status === 'temporary' ? 'curated-placeholder' : status === 'create' && a.asset === 'video' ? 'image-to-video' : SOURCE[a.asset],
      replaceWith: status === 'have' ? '—' : `user-owned-${a.asset}`,
    }
  })
}

function videoPrompt(spec: RecipeSpec): string {
  const d = directions[spec.direction]
  const p = palettes[spec.palette]
  return [
    `Slow, continuous cinematic camera movement (gentle forward dolly) through the scene in the reference image.`,
    `Mood: ${d.mood.join(', ').toLowerCase()}. Lighting and color stay faithful to the image; ${p.dark ? 'deep shadows, soft highlights' : 'soft natural light, gentle contrast'}.`,
    `No cuts, no text, no people entering the frame, no sudden motion. Subtle atmospheric movement only (light, air, fabric, water).`,
    `Duration 5–8 seconds, 16:9, 24fps, stable horizon, end frame close to start frame so it can loop.`,
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
      `No AI tool? Run bash scripts/prepare-video.sh original.mp4 --upscale footage (or cgi). It crops a 16:9 window and sharpens it back to full size. Move the window with FOCUS_Y=0 (top) … 1 (bottom)${off.tall ? ' — a vertical video keeps only a band of its height, so check the subject stays in frame' : ''}.`,
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
      'Otherwise upscale it free on your own computer: install ffmpeg, download Real-ESRGAN, then run bash scripts/prepare-video.sh original.mp4 --upscale footage (people, fabric, real scenes) or --upscale cgi (product, 3D, liquid, animation — much faster).',
      'Always start from the original file, never from a copy already compressed for the web.',
    ],
    tools: ['real-esrgan', 'ffmpeg'],
  })
  if (missing.has('video')) {
    paths.push({
      asset: 'video', title: 'Turn an image into your hero video',
      steps: ['Pick one strong still with depth (foreground + background) and a clear focal point.', 'Generate 3–4 takes with the prompt below in an image-to-video tool.', 'Choose the steadiest take; trim to 5–8s; export 1920×1080 H.264.', 'Encode a WebM and a 9:16 mobile version; export the first frame as the poster.', 'Drop files into /public/media and update the asset config — no code changes needed.'],
      prompt: videoPrompt(spec),
      settings: { 'Source': 'Your image', 'Creation': 'Image → Video', 'Suggested motion': 'Slow cinematic forward camera movement', 'Suggested duration': '5–8 seconds', 'Aspect ratio': '16:9 (plus 9:16 for mobile)', 'Usage': resolveHero(spec).name },
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
    steps: [`Use a paper sweep in the recipe surface color (${palettes[spec.palette].colors.surface}).`, 'One soft key light at 45°, one fill card; same lens and height for every product.', 'Shoot front, 3/4 and one detail for each product.', 'Export 2400px, compress to AVIF/WebP.'],
    tools: ['squoosh', 'unsplash'],
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
  if (spec.motion === 'dynamic' || spec.motion === 'immersive') ids.push('gsap')
  if (spec.motion === 'immersive') ids.push('lenis')
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
  return [
    `Scroll controls time: map ${range} to the full video timeline (0 → duration). Slow scroll moves the film slowly, fast scroll moves it fast, scrolling up plays it backward. Never autoplay the sequence.`,
    'Keep it tightly connected: scrub ≈ 0.5 with smooth scroll, and the scroll encode from scripts/prepare-video.sh (keyframe every 6 frames) so seeking never stutters.',
    'Before coding, watch the video and write a scene map in src/config/scenes.ts: every meaningful moment (a new subject, a pause, a zoom, a change of light) with its start and end as a fraction of the timeline, and the message that belongs to it.',
    'One message per scene, about what is on screen right now. It arrives as its scene begins, holds while the scene plays, and leaves before the next scene’s message arrives — never two at once, never at arbitrary scroll points.',
    ...(sells ? ['This site sells: when the camera pauses or zooms on a product, that scene’s message names the product, adds one line about it and its price, with a quiet link to its product page.'] : []),
    'Video and type are one system: drive both from a single ScrollTrigger timeline, with each text tween placed at its scene’s fraction — not two separate animation setups.',
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
  const auto = pickSignatures({ ...spec, signatures: undefined }, r.media.hero, r.pages).map((m) => m.id)
  return signaturePatterns.filter((p) => fits(p, new Set())).map((p) => ({ ...p, recommended: auto.includes(p.id) }))
    .sort((a, b) => Number(b.recommended) - Number(a.recommended))
}

/** 2–4 signature interactions: the user's own picks if any, else the best fits for sections, motion level, purpose and style. */
function pickSignatures(spec: RecipeSpec, hero: HeroPattern, pages: PageBlueprint[]): SignatureMoment[] {
  const d = directions[spec.direction]
  const style = new Set<string>([...d.tags, ...d.families, ...spec.characters])
  const { where, fits } = signatureSlots(spec, hero, pages)
  const candidates = spec.signatures
    ? spec.signatures.map((id) => signaturePatterns.find((p) => p.id === id)!).filter(Boolean)
    : signaturePatterns.flatMap((p, order) => {
      const score = (p.fits.includes(spec.purpose) ? 3 : 0) + p.fits.filter((f) => style.has(f)).length
      return score > 0 ? [{ p, score, order }] : []
    }).sort((a, b) => b.score - a.score || a.order - b.order).map((c) => c.p)
  const used = new Set<SectionId>()
  const out: SignatureMoment[] = []
  for (const p of candidates) {
    const sid = fits(p, used)
    if (out.length === 4 || !sid) continue
    used.add(sid)
    out.push({ id: p.id, name: p.name, where: where(sid)!, experience: p.experience, implementation: p.implementation, mobile: p.mobile, reducedMotion: p.reducedMotion, components: p.components })
  }
  return out
}

/** Menu style that suits the kind of site, unless the user picked one. */
export function recommendedNav(spec: Pick<RecipeSpec, 'purpose' | 'direction'>): NavStyleId {
  const d = directions[spec.direction]
  if (d.families.includes('editorial') && (spec.purpose === 'portfolio' || spec.purpose === 'studio')) return 'side-index'
  const byPurpose: Record<PurposeId, NavStyleId> = {
    portfolio: 'fullscreen-menu', agency: 'fullscreen-menu', studio: 'fullscreen-menu', fashion: 'centered-logo', restaurant: 'centered-logo',
    ecommerce: 'classic-bar', product: 'floating-pill', saas: 'floating-pill', 'personal-brand': 'bottom-dock', experiment: 'card-menu', other: 'classic-bar',
  }
  return byPurpose[spec.purpose]
}

/** Corner language that suits the direction, unless the user picked one. */
export function recommendedShape(spec: Pick<RecipeSpec, 'direction'>): ShapeId {
  const d = directions[spec.direction]
  if (d.tags.some((t) => t === 'brutalist' || t === 'raw')) return 'brutal'
  if (['playful-pop', 'soft-pastel'].includes(d.id)) return 'pill'
  if (['bento-product', 'y2k-chrome', 'digital-futurism'].includes(d.id)) return 'round'
  if (d.families.some((f) => f === 'quiet' || f === 'organic')) return 'soft'
  if (d.families.includes('minimal')) return 'outline'
  return 'sharp'
}


/** Every control and form this site has, built from shadcn/ui and themed with the recipe's exact colors and shape. */
function uiKit(pages: PageBlueprint[], colors: PaletteColors, shape: ShapeStyle): UiKit {
  const where = new Map<string, Set<string>>()
  const add = (slug: string, place: string) => where.set(slug, (where.get(slug) ?? new Set()).add(place))
  UI_ALWAYS.forEach((slug) => add(slug, 'every page'))
  uiBySection.navbar?.forEach((slug) => add(slug, 'navigation'))
  for (const p of pages) {
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
      'Date fields are a Calendar inside a Popover (shadcn “Date Picker” pattern); times and party sizes are a Select. Forms use Form (react-hook-form + zod) with inline errors under each field.',
      'After `shadcn init`, replace the :root color values it writes with the theme block below — hex values, so shadcn components and the recipe tokens always match. Do not map them back to --color-* (that makes a loop).',
      `Restyle, don't ship the demo look: recipe fonts, ${shape.name.toLowerCase()} shape (buttons ${shape.button}, cards ${shape.card}), ${shape.border} borders.`,
      'No focus rings, glows or outlines on fields, selects, menus or their options — remove shadcn’s ring-* / outline classes. A focused field only darkens its border to the text color; a highlighted option only changes its background.',
      'Keep Radix accessibility intact: labels tied to fields, keyboard navigation, 44px touch targets, prefers-reduced-motion on every open/close animation.',
      'Mobile: Select, Popover and Dropdown open as a bottom Sheet/Drawer on screens under 640px.',
    ],
  }
}

const TECH_LABEL = { css: 'CSS (transitions, scroll-driven animations)', motion: 'Motion', gsap: 'GSAP + ScrollTrigger', lenis: 'Lenis', three: 'React Three Fiber + drei' } as const

export function composeRecipe(input: RecipeSpec, id?: string): UniversalRecipe {
  const spec = normalizeSpec(input)
  const seed = seedBySlug[spec.base] ?? recipeSeeds[0]
  const direction = directions[spec.direction]
  const purpose = purposes[spec.purpose]
  const palette = palettes[spec.palette]
  const type = typography[spec.typography]
  const layout = layouts[spec.layout]
  const motion = motionLevels[spec.motion]
  const hero = resolveHero(spec)
  const lead = media[spec.lead]
  const chars = spec.characters.map((c) => characters[c])
  const sameDirection = seed.spec.direction === spec.direction
  const unchanged = sameCore(seed.spec, spec)
  const textured = TEXTURED.has(spec.direction)

  const adjective = chars[0]?.adjective ?? ''
  const composedTitle = [direction.name.includes(adjective) ? '' : adjective, direction.name, purpose.noun].filter(Boolean).join(' ')
  const brief = spec.brief ?? {}
  const goal = brief.goal && goals[brief.goal]
  const title = brief.name ? `${brief.name} — ${composedTitle}` : unchanged ? seed.title : composedTitle
  const slug = unchanged ? seed.slug : camel(composedTitle).replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`).replace(/^-/, '')

  const baseSummary = unchanged && !brief.name ? seed.summary
    : `A ${purpose.noun.toLowerCase()} with a ${direction.name.toLowerCase()} direction: ${type.name.toLowerCase()} typography, a ${palette.name.toLowerCase()} palette, ${leads[spec.lead].name.toLowerCase()} leading the experience and ${motion.name.toLowerCase()} motion.`
  const summary = [
    brief.offer && `${brief.name ?? 'The project'}: ${brief.offer.replace(/\.$/, '')}.`,
    baseSummary,
    goal ? `Primary goal: ${goal.name.toLowerCase()}.` : '',
  ].filter(Boolean).join(' ')

  const colors = { ...palette.colors, ...spec.customPalette }
  const patterns = motionPatterns.filter((p) => p.levels.includes(spec.motion) && (!p.leads || p.leads.includes(spec.lead)))
  const techs = uniq(patterns.map((p) => p.tech))
  const assetRequirements = buildAssets(spec, hero)
  const imagery = imageryPlan(spec)

  const resolveSection = (sid: SectionId) => {
    const base = sections[sid]
    const note = sameDirection && seed.spec.purpose === spec.purpose ? seed.sectionNotes[sid] : undefined
    return sid === 'hero'
      ? { ...base, name: `Hero — ${hero.name}`, composition: hero.composition, behavior: hero.behavior, responsive: hero.responsive, note }
      : { ...base, note }
  }
  const nav = navStyles[spec.nav ?? recommendedNav(spec)]
  const shape = shapeStyles[spec.shape ?? recommendedShape(spec)]
  const chrome = {
    navbar: { ...resolveSection('navbar'), name: `Navigation — ${nav.name}`, composition: nav.composition, behavior: nav.behavior, responsive: nav.responsive },
    footer: resolveSection('footer'), nav,
  }
  const pages: PageBlueprint[] = spec.pages.map((p) => ({ id: p.id, type: p.type, label: p.label, purpose: p.purpose, sections: p.sections.map(resolveSection) }))

  const componentIds = uniq<ComponentId>([...purpose.components, 'MediaAsset', 'SectionHeader'])

  const deps: { name: string; why: string }[] = []
  if (techs.includes('motion')) deps.push({ name: 'motion', why: 'Viewport reveals, hover and layout animations in React' })
  if (techs.includes('gsap')) deps.push({ name: 'gsap', why: 'ScrollTrigger for pinned and scrubbed sequences (all plugins are free)' })
  if (techs.includes('lenis')) deps.push({ name: 'lenis', why: 'Smooth scroll synced to ScrollTrigger (desktop only)' })
  if (techs.includes('three')) deps.push({ name: 'three', why: 'WebGL renderer' }, { name: '@react-three/fiber', why: 'Declarative Three.js in React' }, { name: '@react-three/drei', why: 'Loaders, controls and helpers (useGLTF, Environment)' })

  const heading = `${type.display.family} / ${type.body.family}`

  return {
    id: id ?? seed.slug,
    title, slug, summary,
    creativeDirection: {
      mood: sameDirection ? seed.mood : uniq([...direction.mood, ...chars.map((c) => c.name)]),
      personality: sameDirection ? seed.personality : chars.map((c) => `${c.name} — ${c.line.toLowerCase()}`).join('; ') || direction.line,
      visualPrinciples: sameDirection ? seed.principles : direction.principles,
      do: sameDirection ? seed.do : direction.do,
      avoid: sameDirection ? seed.avoid : direction.avoid,
      genericAvoid: GENERIC_TELLS,
    },
    designPrinciples: uniq([...(sameDirection ? seed.principles : direction.principles), motion.principle]),
    visualSystem: {
      palette: { id: palette.id, name: spec.customPalette ? `${palette.name} (customised)` : palette.name, custom: !!spec.customPalette, dark: palette.dark, tokens: paletteTokens(colors, palette.usage) },
      typography: type,
      spacing: { base: '8px', scale: ['4', '8', '12', '16', '24', '32', '48', '64', '96', '128', '160', '240'].map((n) => `${n}px`), sectionSpacing: layout.sectionSpacing, note: 'Use only values from the scale. Space between sections is always larger than space within them.' },
      grid: { container: layout.container, columns: layout.grid, gutters: layout.gutters },
      shape,
    },
    layoutSystem: {
      id: layout.id, name: layout.name, container: layout.container, grid: layout.grid, columns: layout.columns, gutters: layout.gutters,
      sectionSpacing: layout.sectionSpacing, alignment: layout.alignment, heroComposition: hero.forcesLayout ? hero.composition : layout.heroComposition,
      cardProportions: layout.cardProportions, mediaProportions: layout.mediaProportions, why: layout.why,
    },
    chrome,
    pages,
    components: componentIds.map((c) => c === 'Hero' ? { ...components.Hero, anatomy: hero.composition, behavior: hero.behavior } : components[c]),
    media: { ...lead, hero, storytelling: filmStory(spec, hero), imagery, framing: videoFraming(spec) },
    motion: { level: motion, principle: motion.principle, patterns, libraries: techs.map((t) => TECH_LABEL[t]) },
    signatures: pickSignatures(spec, hero, pages),
    contentDirection: {
      tone: sameDirection ? seed.content.tone : chars.flatMap((c) => c.tone).join(', ') || direction.mood.join(', ').toLowerCase(),
      voice: chars.map((c) => c.voice).join(' ') || 'Plain, specific, confident.',
      headlineStyle: chars[0]?.headlineStyle ?? 'Short, specific statements',
      headlineExamples: seed.content.headlineExamples,
      paragraphLength: spec.lead === 'typography' ? '1–3 sentences; let headlines carry the page' : '2–4 sentences (40–80 words); never more than 65 characters per line',
      ctaStyle: goal ? `${goal.effect} ${purpose.ctaPattern}` : purpose.ctaPattern,
      ctaExamples: goal ? uniq([...goal.cta, ...seed.content.ctaExamples]).slice(0, 4) : seed.content.ctaExamples,
      wordsToAvoid: WORDS_TO_AVOID,
      density: seed.content.density,
    },
    assetRequirements,
    assetCreationPaths: buildCreationPaths(spec, assetRequirements),
    resources: pickResources(spec, textured),
    references: seed.references,
    implementation: {
      stack: ['Next.js (App Router)', 'TypeScript', 'Tailwind CSS', ...techs.filter((t) => t !== 'css').map((t) => TECH_LABEL[t])],
      dependencies: [...deps, { name: 'shadcn/ui', why: 'Accessible, themeable controls and forms (Radix primitives) — see UI components' }],
      fileStructure: [
        'src/',
        '  app/            — routes; layout.tsx loads fonts via next/font',
        '  components/     — ' + componentIds.join(', '),
        '  config/assets.ts — asset reference layer (every image/video by key)',
        '  styles/tokens.css — palette + type tokens as CSS variables',
        techs.includes('gsap') || techs.includes('lenis') ? '  lib/motion.ts   — ScrollTrigger/Lenis setup, reduced-motion guard' : '',
        techs.includes('three') ? '  components/scene/ — R3F canvas, lazy-loaded' : '',
        'public/media/     — optimised images and videos',
      ].filter(Boolean).join('\n'),
      sequence: [
        'Set up tokens: palette as CSS variables, fonts with next/font, spacing scale in Tailwind theme.',
        'Build the asset config layer (config/assets.ts) and <MediaAsset/> so every media reference is replaceable.',
        `Build static layout for all ${pages.length} pages (${pages.flatMap((p) => p.sections).length} sections plus navbar and footer) with real copy — no motion yet.`,
        `Build the hero: ${hero.name}.`,
        ...(imagery ? [`Build the photo layout: ${imagery.presentation.name} (see Media → Photos).`] : []),
        'Make every section responsive (mobile first, then tablet and desktop).',
        spec.motion === 'still' ? 'Add state feedback (hover/focus) only.' : `Add motion in order of importance: ${patterns.filter((p) => p.id !== 'state-feedback').map((p) => p.name).join(', ')}.`,
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
      ui: uiKit(pages, colors, shapeStyles[spec.shape ?? recommendedShape(spec)]),
      performance: [
        'Only the hero media uses priority loading; everything else lazy-loads.',
        'Animate transform and opacity only; avoid animating layout properties.',
        `Self-host fonts with next/font; ${heading} — subset display faces.`,
        ...(spec.lead === 'video' ? ['Video: preload="metadata", poster image, ≤ 6MB desktop / ≤ 3MB mobile, pause off-screen.'] : []),
        ...(spec.lead === '3d' ? ['3D: lazy-load the canvas, Draco-compress models, cap DPR at 2, stop rendering off-screen.'] : []),
        ...(techs.includes('gsap') ? ['Import only the GSAP plugins you use; kill ScrollTriggers on unmount.'] : []),
        'Target: LCP < 2.5s, CLS < 0.1, INP < 200ms on a mid-range phone.',
      ],
    },
    whyItWorks: {
      direction: sameDirection ? seed.whyDirection : direction.why,
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

/** Never let an incomplete Recipe reach Build Package generation. */
export function validateRecipe(r: UniversalRecipe): string[] {
  const problems: string[] = []
  if (!r.title) problems.push('title')
  if (!r.summary) problems.push('summary')
  if (r.visualSystem.palette.tokens.length !== 8) problems.push('palette tokens')
  if (!r.visualSystem.typography.display.family) problems.push('typography')
  if (r.pages.length < 1) problems.push('pages')
  if (r.pages.flatMap((p) => p.sections).length < 4) problems.push('page structure')
  if (!r.pages.some((p) => p.sections.some((s) => s.id === 'hero'))) problems.push('hero section')
  if (r.components.length < 3) problems.push('components')
  if (r.motion.patterns.length < 1) problems.push('motion system')
  if (r.assetRequirements.length < 3) problems.push('asset requirements')
  if (r.references.length < 1) problems.push('references')
  if (Object.values(r.whyItWorks).some((v) => !v)) problems.push('why it works')
  return problems
}

export const seedRecipes = () => recipeSeeds.map((s) => composeRecipe(specFromSeed(s)))
