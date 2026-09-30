// The showcase plan — a site built in three steps, no questions asked:
//   1. Style  — the same on every page (look, colours, lettering, shape, menu, photo layout)
//   2. Pages  — page by page, top to bottom: sections, and the ready pieces attached to each section
//   3. Create — the recipe and Build Package for a tool
// Pure (no storage, no React), so check.ts tests it and the builder recomposes the recipe on every change.

import { blockFor } from '@/data/blocks'
import { accentSets, palettes, typography } from '@/data/ingredients'
import { EFFECTS, heroes, imagePresentations, navStyles, pageTypes, sections, shapeStyles } from '@/data/patterns'
import { pieces } from '@/data/pieces'
import { directions, goals, motionLevels, purposes } from '@/data/taxonomy'
import { defaultPagesFor, isValidSpec, normalizeSpec } from '@/features/recipes/engine'
import type { DirectionId, KitPlan, MediaPlan, MotionLevel, PageSpec, PageTypeId, PieceId, PlanPage, PlanSection, PurposeId, RecipeSpec, SectionId } from '@/types/domain'

export const EMPTY_PLAN: KitPlan = { pages: [] }
export const DEFAULT_LOOK: DirectionId = 'swiss-editorial'
const LEVEL: MotionLevel[] = ['still', 'subtle', 'dynamic', 'immersive']

const key = () => Math.random().toString(36).slice(2, 10)
const MEDIA_PLANS: MediaPlan[] = ['have', 'image-to-video', 'temporary', 'image-alternative']
const inst = (id: SectionId): PlanSection => ({ key: key(), id, pieces: [] })

// ─── Catalogues, grouped the way people think about a site ───────────────────

/** Content sections you can place on a page (navbar, hero and footer are the page frame, set elsewhere). */
export const sectionGroups: { name: string; line: string; ids: SectionId[] }[] = [
  { name: 'Say who you are', line: 'Statements and story', ids: ['intro', 'manifesto', 'about', 'editorial-story'] },
  { name: 'Show the work', line: 'Proof and atmosphere', ids: ['featured-work', 'case-study', 'gallery', 'clients'] },
  { name: 'Explain the offer', line: 'What you do and how', ids: ['chapters', 'services', 'process', 'how-it-works', 'feature-grid', 'pricing'] },
  { name: 'Sell', line: 'Products and collections', ids: ['collection', 'lookbook', 'product-grid', 'product-highlight'] },
  { name: 'Bring people in', line: 'Food, bookings, places', ids: ['menu', 'reservation', 'location'] },
  { name: 'Close the page', line: 'Answers, news, next step', ids: ['faq', 'journal', 'contact-cta'] },
]

export const pageGroups: { name: string; ids: PageTypeId[] }[] = [
  { name: 'Main pages', ids: ['home', 'about', 'work', 'services', 'contact', 'journal', 'gallery', 'team', 'testimonials', 'press', 'careers'] },
  { name: 'Selling', ids: ['shop', 'collections', 'product-detail', 'cart', 'checkout', 'account', 'pricing', 'features', 'comparison', 'size-guide', 'shipping-returns', 'gift-cards', 'wholesale'] },
  { name: 'Hospitality & events', ids: ['menu', 'reservations', 'order-online', 'catering', 'locations'] },
  { name: 'Help & legal', ids: ['faq', 'newsletter', 'sign-in', 'sign-up', 'privacy-policy', 'terms-of-service', 'cookie-policy', 'accessibility', 'not-found'] },
]

/** What each kind of page is usually made of, in reading order — used to start a new page and to suggest what to add.
 *  Pages with none (sign-in, legal, 404…) are standard pages written for you; they need no sections. */
export const pageSuggestions: Partial<Record<PageTypeId, SectionId[]>> = {
  home: ['intro', 'featured-work', 'clients', 'manifesto', 'product-highlight', 'how-it-works', 'gallery', 'faq', 'contact-cta'],
  work: ['featured-work', 'case-study', 'clients', 'contact-cta'],
  about: ['about', 'editorial-story', 'process', 'clients', 'contact-cta'],
  contact: ['contact-cta', 'location', 'faq'],
  services: ['services', 'process', 'pricing', 'clients', 'faq', 'contact-cta'],
  collections: ['collection', 'lookbook', 'editorial-story'],
  shop: ['product-grid', 'product-highlight', 'collection', 'faq'],
  'product-detail': ['product-highlight', 'gallery', 'faq', 'product-grid'],
  cart: ['product-grid'],
  features: ['feature-grid', 'how-it-works', 'product-highlight', 'pricing', 'faq', 'contact-cta'],
  pricing: ['pricing', 'faq', 'clients', 'contact-cta'],
  faq: ['faq', 'contact-cta'],
  journal: ['journal', 'manifesto'],
  experiment: ['gallery', 'editorial-story', 'manifesto'],
  menu: ['menu', 'gallery', 'reservation'],
  gallery: ['gallery', 'lookbook'],
  reservations: ['reservation', 'location', 'faq'],
  team: ['about', 'gallery', 'contact-cta'],
  careers: ['editorial-story', 'process', 'faq', 'contact-cta'],
  testimonials: ['clients', 'case-study', 'contact-cta'],
  press: ['journal', 'clients', 'contact-cta'],
  integrations: ['feature-grid', 'faq'],
  changelog: ['journal'],
  security: ['feature-grid', 'faq', 'contact-cta'],
  comparison: ['pricing', 'feature-grid', 'faq'],
  partners: ['clients', 'contact-cta'],
  'shipping-returns': ['faq'],
  'size-guide': ['faq'],
  'gift-cards': ['product-highlight', 'faq'],
  locations: ['location', 'gallery', 'reservation'],
  catering: ['services', 'gallery', 'reservation', 'contact-cta'],
  'order-online': ['menu', 'faq'],
  newsletter: ['journal', 'contact-cta'],
  wholesale: ['product-grid', 'contact-cta', 'faq'],
  custom: ['intro', 'contact-cta'],
}
/** A page with no sections of its own and no suggestions is a standard page (sign-in, legal, 404) written for you. */
export const isStandardPage = (type: PageTypeId) => !pageTypes[type].sections.length && !pageSuggestions[type]?.length
const CLOSING: SectionId[] = ['faq', 'contact-cta']

/** Suggestions for one page: what it usually has, marked with whether it's already there. */
export const suggestionsFor = (page: PlanPage) => (pageSuggestions[page.type] ?? []).map((id) => ({ id, added: page.sections.some((s) => s.id === id) }))

/** Adds a suggested section where it reads right: before the closing sections (FAQ, contact) unless it is one of them. */
export function addSuggested(plan: KitPlan, pageId: string, id: SectionId): KitPlan {
  const page = plan.pages.find((p) => p.id === pageId)
  if (!page) return plan
  const closing = CLOSING.includes(id) ? -1 : page.sections.findIndex((s) => CLOSING.includes(s.id))
  return addSection(plan, pageId, id, closing < 0 ? page.sections.length : closing)
}

/** Pages this kind of site usually has that the plan doesn't yet (recommended first). */
export function missingPages(plan: KitPlan): { type: PageTypeId; label: string; recommended: boolean }[] {
  const purpose = purposes[inferPurpose(plan)]
  const have = new Set(plan.pages.map((p) => p.type))
  return purpose.pages.filter((p) => !have.has(p.type)).map((p) => ({ type: p.type, label: p.label, recommended: p.tier === 'recommended' }))
    .sort((a, b) => Number(b.recommended) - Number(a.recommended))
}

/** Kinds of site to start from — each brings its usual pages and sections. */
export const starters = (Object.values(purposes)).filter((p) => p.id !== 'other').map((p) => ({ id: p.id, name: p.name, pages: defaultPagesFor(p.id).map((x) => x.label) }))

/** Pieces that belong on this section: made for it, and no second piece for a job the section already has. */
export function piecesFor(section: PlanSection): PieceId[] {
  const taken = new Set(section.pieces.map((id) => pieces[id].slot))
  return (Object.keys(pieces) as PieceId[]).filter((id) => pieces[id].sections.includes(section.id) && (section.pieces.includes(id) || !taken.has(pieces[id].slot)))
}

// ─── Building the plan ──────────────────────────────────────────────────────

/** A new page starts with its own sections — or, when the page type has none, the first ones it usually has. Never blank by accident. */
const newPage = (type: PageTypeId, label = pageTypes[type].name): PlanPage => {
  const own = pageTypes[type].sections
  const start = own.length ? own : (pageSuggestions[type] ?? []).slice(0, 2)
  return { id: key(), type, label, purpose: pageTypes[type].defaultPurpose, sections: start.map(inst) }
}

/** A starter replaces the pages (the style stays); `null` = start blank with just a Home page. */
export function start(plan: KitPlan, purpose: PurposeId | null): KitPlan {
  if (!purpose) return { ...plan, purpose: undefined, pages: [newPage('home')] }
  // Every page arrives filled: one with nothing listed gets what that kind of page usually starts with.
  return { ...plan, purpose, pages: defaultPagesFor(purpose).map((p) => ({ id: key(), type: p.type, label: p.label, purpose: p.purpose, sections: (p.sections.length ? p.sections : newPage(p.type).sections.map((s) => s.id)).map(inst) })) }
}

export type StyleKey = 'direction' | 'palette' | 'typography' | 'shape' | 'nav' | 'imagePresentation' | 'rotation' | 'motion'
/** Sets (or, with undefined, clears back to the look's default) one site-wide choice. A new look keeps every choice the
 *  user made (colours, lettering, shape…); only what they never picked follows the new look. */
export function setStyle(plan: KitPlan, k: StyleKey, v: string | undefined): KitPlan {
  const next = { ...plan, [k]: v } as KitPlan
  if (v === undefined) delete next[k]
  return next
}

const mapPage = (plan: KitPlan, pageId: string, f: (p: PlanPage) => PlanPage): KitPlan => ({ ...plan, pages: plan.pages.map((p) => (p.id === pageId ? f(p) : p)) })

export const addPage = (plan: KitPlan, type: PageTypeId, label?: string): { plan: KitPlan; id: string } => { const p = newPage(type, label); return { plan: { ...plan, pages: [...plan.pages, p] }, id: p.id } }
export const removePage = (plan: KitPlan, pageId: string): KitPlan => ({ ...plan, pages: plan.pages.filter((p) => p.id !== pageId) })
export const renamePage = (plan: KitPlan, pageId: string, label: string) => mapPage(plan, pageId, (p) => ({ ...p, label }))
/** What the page is for, in the owner's words — the recipe hands it to the builder as the page's brief. */
export const setPagePurpose = (plan: KitPlan, pageId: string, purpose: string) => mapPage(plan, pageId, (p) => ({ ...p, purpose: purpose.slice(0, 400) }))
export function movePage(plan: KitPlan, pageId: string, by: -1 | 1): KitPlan {
  const i = plan.pages.findIndex((p) => p.id === pageId), j = i + by
  if (i < 0 || j < 0 || j >= plan.pages.length) return plan
  const pages = [...plan.pages];[pages[i], pages[j]] = [pages[j], pages[i]]
  return { ...plan, pages }
}

/** Inserts a section at `at` (0 = top of the page; the first screen always stays first). */
export const addSection = (plan: KitPlan, pageId: string, id: SectionId, at: number) =>
  mapPage(plan, pageId, (p) => { const s = [...p.sections]; s.splice(Math.max(p.sections[0]?.id === 'hero' ? 1 : 0, at), 0, inst(id)); return { ...p, sections: s } })
export const removeSection = (plan: KitPlan, pageId: string, k: string) => mapPage(plan, pageId, (p) => ({ ...p, sections: p.sections.filter((s) => s.key !== k) }))
export function moveSection(plan: KitPlan, pageId: string, k: string, by: -1 | 1): KitPlan {
  return mapPage(plan, pageId, (p) => {
    const i = p.sections.findIndex((s) => s.key === k), j = i + by
    if (i < 0 || j < 0 || j >= p.sections.length || p.sections[j].id === 'hero') return p
    const s = [...p.sections];[s[i], s[j]] = [s[j], s[i]]
    return { ...p, sections: s }
  })
}
/** Drops a section at position `to` (drag and drop). The first screen never moves and nothing goes above it. */
export function placeSection(plan: KitPlan, pageId: string, k: string, to: number): KitPlan {
  return mapPage(plan, pageId, (p) => {
    const from = p.sections.findIndex((s) => s.key === k)
    if (from < 0 || p.sections[from].id === 'hero') return p
    const s = [...p.sections]
    const [moved] = s.splice(from, 1)
    const floor = s[0]?.id === 'hero' ? 1 : 0
    s.splice(Math.min(Math.max(floor, to > from ? to - 1 : to), s.length), 0, moved)
    return { ...p, sections: s }
  })
}
/** Attaches a piece to one section (replacing a piece that does the same job there), or detaches it. */
export function togglePiece(plan: KitPlan, pageId: string, k: string, piece: PieceId): KitPlan {
  return mapPage(plan, pageId, (p) => ({ ...p, sections: p.sections.map((s) => s.key !== k ? s : s.pieces.includes(piece)
    ? { ...s, pieces: s.pieces.filter((x) => x !== piece) }
    : { ...s, pieces: [...s.pieces.filter((x) => pieces[x].slot !== pieces[piece].slot), piece] }) }))
}
/** Turns a whole-site piece (transition, cursor, cookie note) on or off. */
export function toggleSitePiece(plan: KitPlan, piece: PieceId): KitPlan {
  const cur = plan.sitePieces ?? []
  return { ...plan, sitePieces: cur.includes(piece) ? cur.filter((x) => x !== piece) : [...cur, piece] }
}
/** Pieces made for the menu or footer — the frame every page shares — are placed once, for the whole site. */
export const onChrome = (id: PieceId) => pieces[id].sections.some((s) => s === 'navbar' || s === 'footer')
export const sitePieceIds = (Object.keys(pieces) as PieceId[]).filter((id) => pieces[id].slot === 'site')

/** The first screen is the top of the first page: choosing one adds a hero there if the page has none. */
export function setHero(plan: KitPlan, hero: KitPlan['hero']): KitPlan {
  const next = { ...plan, hero }
  const first = next.pages[0]
  if (hero && first && first.sections[0]?.id !== 'hero') next.pages = [{ ...first, sections: [inst('hero'), ...first.sections] }, ...next.pages.slice(1)]
  return next
}

// ─── Swap, don't build: pages arrive filled; a section is replaced by one that does the same job ─────────

/** What can take a section's place: sections doing the same job, then others this kind of page usually has. */
export function swapOptions(page: PlanPage, id: SectionId): { job: SectionId[]; page: SectionId[] } {
  const job = (sectionGroups.find((g) => g.ids.includes(id))?.ids ?? []).filter((x) => x !== id)
  return { job, page: (pageSuggestions[page.type] ?? []).filter((x) => x !== id && x !== 'hero' && !job.includes(x)) }
}

/** Replaces one section in place. Effects it can't carry move to the next section that can. */
export function replaceSection(plan: KitPlan, pageId: string, k: string, id: SectionId): KitPlan {
  const old = plan.pages.find((p) => p.id === pageId)?.sections.find((s) => s.key === k)
  if (!old) return plan
  const keep = old.pieces.filter((x) => pieces[x].sections.includes(id))
  let next = mapPage(plan, pageId, (p) => ({ ...p, sections: p.sections.map((s) => (s.key === k ? { ...s, id, pieces: keep } : s)) }))
  for (const x of old.pieces.filter((x) => !keep.includes(x))) next = placeEffect(next, x, false)
  return next
}

/** A page back to what that kind of page usually has — its sections and its brief; its effects find a new place. */
export function resetPage(plan: KitPlan, pageId: string): KitPlan {
  const page = plan.pages.find((p) => p.id === pageId)
  if (!page) return plan
  // What this kind of site starts that page with, else what that kind of page usually has.
  const usual = (plan.purpose ? purposes[plan.purpose].pages.find((p) => p.type === page.type)?.sections : undefined) ?? []
  const fresh = (usual.length ? usual : newPage(page.type).sections.map((s) => s.id)).map(inst)
  let next = mapPage(plan, pageId, (p) => ({ ...p, sections: fresh, purpose: pageTypes[p.type].defaultPurpose }))
  for (const x of page.sections.flatMap((s) => s.pieces)) next = placeEffect(next, x, false)
  return next
}

/** Swaps the pages for a kind of site's usual ones; style, brief, files and effects stay (effects find new places). */
export function usualPages(plan: KitPlan, purpose: PurposeId): KitPlan {
  const fx = [...new Set(plan.pages.flatMap((p) => p.sections.flatMap((s) => s.pieces)))]
  return fx.reduce<KitPlan>((x, id) => placeEffect(x, id), setHero(start(plan, purpose), plan.hero))
}

/** Effects are chosen once, with the style; each finds its own place. */
export const effectOn = (plan: KitPlan, id: PieceId) => (plan.sitePieces ?? []).includes(id) || plan.pages.some((p) => p.sections.some((s) => s.pieces.includes(id)))

/** Where an effect sits, in words ("Home · Intro", "Every page"), or null when it's off. */
export function effectWhere(plan: KitPlan, id: PieceId): string | null {
  if ((plan.sitePieces ?? []).includes(id)) return pieces[id].slot === 'site' ? 'Every page' : 'Menu & footer, every page'
  for (const p of plan.pages) for (const s of p.sections) if (s.pieces.includes(id)) return `${p.label} · ${s.id === 'hero' ? 'First screen' : sections[s.id].name}`
  return null
}

/** Puts an effect on the first section that can carry it (a free one before one that already has an effect of its kind),
 *  else across the site (menu/footer, site-wide), else — only when `grow` — adds the section it needs to the first page.
 *  Without `grow` (a swap or reset moving it) an effect with nowhere to go is turned off. */
export function placeEffect(plan: KitPlan, id: PieceId, grow = true): KitPlan {
  if (effectOn(plan, id)) return plan
  if (pieces[id].slot === 'site') return toggleSitePiece(plan, id)
  const hosts = plan.pages.flatMap((p) => p.sections.filter((s) => pieces[id].sections.includes(s.id)).map((s) => ({ page: p.id, s })))
  const host = hosts.find((h) => !h.s.pieces.some((x) => pieces[x].slot === pieces[id].slot)) ?? hosts[0]
  if (host) return togglePiece(plan, host.page, host.s.key, id)
  if (onChrome(id)) return toggleSitePiece(plan, id)
  const first = plan.pages[0]
  if (!first || !grow) return plan
  const need = pieces[id].sections.find((x) => x !== 'navbar' && x !== 'footer')
  if (!need) return plan
  const before = new Set(first.sections.map((s) => s.key))
  const next = need === 'hero' ? addSection(plan, first.id, 'hero', 0) : addSuggested(plan, first.id, need)
  const added = next.pages[0].sections.find((s) => !before.has(s.key))!
  return togglePiece(next, first.id, added.key, id)
}

export function removeEffect(plan: KitPlan, id: PieceId): KitPlan {
  return { ...plan, sitePieces: (plan.sitePieces ?? []).filter((x) => x !== id), pages: plan.pages.map((p) => ({ ...p, sections: p.sections.map((s) => ({ ...s, pieces: s.pieces.filter((x) => x !== id) })) })) }
}
export const toggleEffect = (plan: KitPlan, id: PieceId) => (effectOn(plan, id) ? removeEffect(plan, id) : placeEffect(plan, id))

// ─── Plan → recipe ──────────────────────────────────────────────────────────

const BY_PAGE: [PurposeId, PageTypeId[]][] = [
  ['ecommerce', ['shop', 'cart', 'checkout', 'product-detail', 'shipping-returns']],
  ['restaurant', ['menu', 'reservations', 'order-online', 'catering']],
  ['fashion', ['collections', 'size-guide']],
  ['saas', ['pricing', 'features', 'integrations', 'changelog', 'security']],
  ['portfolio', ['work']],
  ['agency', ['services']],
  ['blog', ['journal', 'newsletter']],
  ['experiment', ['experiment']],
]

/** What kind of site the pages describe, when no starter says so. */
export function inferPurpose(plan: KitPlan): PurposeId {
  if (plan.purpose) return plan.purpose
  const types = new Set(plan.pages.map((p) => p.type))
  return BY_PAGE.find(([, ts]) => ts.some((t) => types.has(t)))?.[0] ?? 'other'
}

export function planToSpec(plan: KitPlan): RecipeSpec {
  const dir = directions[plan.direction ?? DEFAULT_LOOK]
  // Opened from a recipe: keep what the kit can't edit. Voice, layout, lead and touches only while its look is unchanged.
  const from = plan.from, same = from?.direction === dir.id ? from : undefined
  const purpose = inferPurpose(plan)
  const effect = EFFECTS.find((e) => e.hero === plan.hero)
  const pages = plan.pages.length
    ? plan.pages.map((p) => ({ id: p.id, type: p.type, label: p.label, purpose: p.purpose, sections: p.sections.map((s) => s.id) }))
    : defaultPagesFor(purpose)
  const placements = [...plan.pages.flatMap((p) => p.sections.flatMap((s, index) => s.pieces.map((piece) => ({ piece, page: p.id, index })))), ...(plan.sitePieces ?? []).map((piece) => ({ piece, page: '*', index: -1 }))]
  // Motion: the look's default, raised to what the first screen and the attached pieces need — but the chosen first screen wins.
  const need = [plan.motion ?? effect?.motion ?? same?.motion ?? dir.defaults.motion, ...placements.map((x) => pieces[x.piece].levels[0])]
  let motion = LEVEL[Math.max(...need.map((m) => LEVEL.indexOf(m)))]
  if (plan.hero && !heroes[plan.hero].motion.includes(motion)) motion = heroes[plan.hero].motion.at(-1)!
  const lead = effect?.lead ?? same?.lead ?? dir.defaults.lead
  const palette = plan.palette ?? dir.defaults.palette
  return normalizeSpec({
    base: same?.base ?? dir.baseRecipe, brief: { ...from?.brief, name: plan.name, offer: plan.about, goal: plan.goal, photos: plan.photoNote }, purpose, direction: dir.id, characters: same?.characters ?? (dir.voice ? [dir.voice] : []),
    lead, motion, hero: plan.hero ?? (lead === same?.lead ? same.hero : undefined), layout: same?.layout ?? dir.defaults.layout,
    palette, customPalette: from?.palette === palette ? from.customPalette : undefined, typography: plan.typography ?? dir.defaults.typography,
    assets: plan.assets ?? from?.assets ?? [], uploads: plan.uploads ?? from?.uploads ?? [], videoFrame: from?.videoFrame,
    mediaPlan: plan.mediaPlan ?? from?.mediaPlan ?? (lead === 'video' || lead === '3d' ? 'temporary' : 'have'),
    imagePresentation: plan.imagePresentation, nav: plan.nav, shape: plan.shape, rotation: plan.rotation,
    signatures: same?.signatures ?? [], // what you see is what you get: no touches the user did not place
    pieces: [...new Set(placements.map((x) => x.piece))], piecePlacements: placements,
    pages, target: plan.target ?? 'not-sure',
  })
}

/** Trust boundary: plans come back from localStorage (including the older flat format). Unknown ids are dropped, never guessed. */
export function cleanPlan(x: unknown): KitPlan {
  if (!x || typeof x !== 'object') return EMPTY_PLAN
  const p = x as Partial<KitPlan> & { pieces?: unknown }
  const known = <T extends string>(v: unknown, kb: object) => (typeof v === 'string' && Object.hasOwn(kb, v) ? (v as T) : undefined)
  const pages: PlanPage[] = Array.isArray(p.pages) ? p.pages.filter((pg) => !!pg && typeof pg.id === 'string' && Object.hasOwn(pageTypes, pg.type) && Array.isArray(pg.sections)).map((pg) => ({
    id: pg.id, type: pg.type, label: typeof pg.label === 'string' ? pg.label.slice(0, 60) : pageTypes[pg.type].name, purpose: typeof pg.purpose === 'string' ? pg.purpose : pageTypes[pg.type].defaultPurpose,
    // Older plans stored bare section ids; newer ones store instances with pieces.
    sections: (pg.sections as unknown[]).map((s) => (typeof s === 'string' ? { key: key(), id: s as SectionId, pieces: [] } : s as PlanSection))
      .filter((s) => !!s && Object.hasOwn(sections, s.id)).map((s) => ({ key: typeof s.key === 'string' ? s.key : key(), id: s.id, pieces: Array.isArray(s.pieces) ? [...new Set(s.pieces.filter((id) => Object.hasOwn(pieces, id)))] : [] })),
  })) : []
  return {
    name: typeof p.name === 'string' ? p.name.slice(0, 60) : undefined,
    about: typeof p.about === 'string' ? p.about.slice(0, 160) : undefined,
    goal: known(p.goal, goals), motion: known(p.motion, motionLevels), photoNote: typeof p.photoNote === 'string' ? p.photoNote.slice(0, 400) : undefined,
    uploads: Array.isArray(p.uploads) ? p.uploads.filter((u) => !!u && typeof u.name === 'string' && typeof u.asset === 'string' && ['image', 'video', 'other'].includes(u.kind)) : undefined,
    assets: Array.isArray(p.assets) ? p.assets.filter((a) => typeof a === 'string') : undefined,
    mediaPlan: MEDIA_PLANS.includes(p.mediaPlan as MediaPlan) ? p.mediaPlan : undefined,
    purpose: known(p.purpose, purposes), direction: known(p.direction, directions), palette: known(p.palette, palettes), typography: known(p.typography, typography),
    shape: known(p.shape, shapeStyles), nav: known(p.nav, navStyles), hero: EFFECTS.some((e) => e.hero === p.hero) ? p.hero : undefined,
    imagePresentation: known(p.imagePresentation, imagePresentations), pages, target: typeof p.target === 'string' ? p.target : undefined,
    rotation: p.rotation === 'off' ? 'off' : known(p.rotation, accentSets),
    sitePieces: Array.isArray(p.sitePieces) ? p.sitePieces.filter((id) => Object.hasOwn(pieces, id) && (pieces[id].slot === 'site' || onChrome(id))) : undefined,
    from: isValidSpec(p.from) ? p.from : undefined, fromId: typeof p.fromId === 'string' ? p.fromId : undefined,
  }
}

/** Customise: a recipe back into a kit plan. Every piece gets a place — the one it was given, else the first section that suits it. */
export function specToPlan(spec: RecipeSpec, fromId?: string): KitPlan {
  // A placement pointing at a page or section that isn't there counts as unplaced, so the piece still finds a home.
  const placed = (spec.piecePlacements ?? []).filter((x) => x.page === '*' || spec.pages.find((p) => p.id === x.page)?.sections[x.index])
  const pages: PlanPage[] = spec.pages.map((p) => ({ id: p.id, type: p.type, label: p.label, purpose: p.purpose,
    sections: p.sections.map((id, i) => ({ key: key(), id, pieces: placed.filter((x) => x.page === p.id && x.index === i).map((x) => x.piece) })) }))
  const sitePieces = placed.filter((x) => x.page === '*').map((x) => x.piece)
  for (const id of spec.pieces ?? []) {
    if (placed.some((x) => x.piece === id)) continue
    const host = pages.flatMap((p) => p.sections).find((s) => pieces[id].sections.includes(s.id))
    if (host) host.pieces.push(id); else if (pieces[id].slot === 'site' || onChrome(id)) sitePieces.push(id)
  }
  return cleanPlan({
    name: spec.brief?.name, about: spec.brief?.offer, goal: spec.brief?.goal, photoNote: spec.brief?.photos, purpose: spec.purpose, direction: spec.direction, palette: spec.palette, typography: spec.typography,
    shape: spec.shape, nav: spec.nav, imagePresentation: spec.imagePresentation, rotation: spec.rotation, hero: spec.hero,
    sitePieces, pages, target: spec.target, from: spec, fromId, uploads: spec.uploads, assets: spec.assets, mediaPlan: spec.mediaPlan,
  })
}

/** A finished example's recipe, rebuilt from the choices it records (names, as the user saw them). Unknown names are left to the look's defaults. */
export function specFromChoices(choices: { label: string; value: string }[]): RecipeSpec | null {
  const v = (label: string) => choices.find((c) => c.label === label)?.value.toLowerCase().trim()
  const byName = <T extends { name: string }>(kb: Record<string, T>, value?: string) =>
    value ? (Object.keys(kb).find((k) => kb[k].name.toLowerCase() === value) ?? Object.keys(kb).find((k) => value.startsWith(kb[k].name.toLowerCase()) || kb[k].name.toLowerCase().startsWith(value.split(/[\s/—-]+/)[0]))) : undefined
  const direction = byName(directions, v('Style')) as DirectionId | undefined
  const purpose = byName(purposes, v('Making')) as PurposeId | undefined
  if (!direction || !purpose) return null
  const catalogue = purposes[purpose].pages
  const pages: PageSpec[] = (choices.find((c) => c.label === 'Pages')?.value ?? '').split(',').map((x) => x.trim()).filter(Boolean).map((label) => {
    const known = catalogue.find((p) => p.label.toLowerCase() === label.toLowerCase())
    const type = known?.type ?? ((Object.keys(pageTypes) as PageTypeId[]).find((k) => pageTypes[k].name.toLowerCase() === label.toLowerCase()) ?? 'custom')
    return { id: key(), type, label, purpose: pageTypes[type].defaultPurpose, sections: known?.sections ?? pageTypes[type].sections }
  })
  const d = directions[direction]
  const name = choices.find((c) => c.label === 'Name')?.value
  return normalizeSpec({
    base: d.baseRecipe, brief: { name }, purpose, direction, characters: d.voice ? [d.voice] : [], layout: d.defaults.layout,
    lead: v('First screen')?.includes('film') ? 'video' : d.defaults.lead, motion: (byName(motionLevels, v('Movement')) as MotionLevel | undefined) ?? d.defaults.motion,
    imagePresentation: byName(imagePresentations, v('Photos')?.split(' (')[0]) as RecipeSpec['imagePresentation'],
    palette: (byName(palettes, v('Colors')) as RecipeSpec['palette'] | undefined) ?? d.defaults.palette,
    typography: (byName(typography, v('Lettering')) as RecipeSpec['typography'] | undefined) ?? d.defaults.typography,
    assets: [], pages: pages.length ? pages : defaultPagesFor(purpose), target: 'not-sure',
  })
}

export const hasBlock = (id: SectionId) => !!blockFor(id)
