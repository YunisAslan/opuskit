// The showcase plan — a site built in three steps, no questions asked:
//   1. Style  — the same on every page (look, colours, lettering, shape, menu, photo layout)
//   2. Pages  — page by page, top to bottom: sections, and the ready pieces attached to each section
//   3. Create — the recipe and Build Package for a tool
// Pure (no storage, no React), so check.ts tests it and the builder recomposes the recipe on every change.

import { blockFor } from '@/data/blocks'
import { accentSets, palettes, typography } from '@/data/ingredients'
import { EFFECTS, heroes, imagePresentations, navStyles, pageTypes, sections, shapeStyles } from '@/data/patterns'
import { pieces } from '@/data/pieces'
import { directions, purposes } from '@/data/taxonomy'
import { defaultPagesFor, normalizeSpec } from '@/features/recipes/engine'
import type { DirectionId, KitPlan, MotionLevel, PageTypeId, PieceId, PlanPage, PlanSection, PurposeId, RecipeSpec, SectionId } from '@/types/domain'

export const EMPTY_PLAN: KitPlan = { pages: [] }
export const DEFAULT_LOOK: DirectionId = 'swiss-editorial'
const LEVEL: MotionLevel[] = ['still', 'subtle', 'dynamic', 'immersive']

const key = () => Math.random().toString(36).slice(2, 10)
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

/** Kinds of site to start from — each brings its usual pages and sections. */
export const starters = (Object.values(purposes)).filter((p) => p.id !== 'other').map((p) => ({ id: p.id, name: p.name, pages: defaultPagesFor(p.id).map((x) => x.label) }))

/** Pieces that belong on this section: made for it, and no second piece for a job the section already has. */
export function piecesFor(section: PlanSection): PieceId[] {
  const taken = new Set(section.pieces.map((id) => pieces[id].slot))
  return (Object.keys(pieces) as PieceId[]).filter((id) => pieces[id].sections.includes(section.id) && (section.pieces.includes(id) || !taken.has(pieces[id].slot)))
}

// ─── Building the plan ──────────────────────────────────────────────────────

const newPage = (type: PageTypeId, label = pageTypes[type].name): PlanPage =>
  ({ id: key(), type, label, purpose: pageTypes[type].defaultPurpose, sections: pageTypes[type].sections.map(inst) })

/** A starter replaces the pages (the style stays); `null` = start blank with just a Home page. */
export function start(plan: KitPlan, purpose: PurposeId | null): KitPlan {
  if (!purpose) return { ...plan, purpose: undefined, pages: [newPage('home')] }
  return { ...plan, purpose, pages: defaultPagesFor(purpose).map((p) => ({ id: key(), type: p.type, label: p.label, purpose: p.purpose, sections: p.sections.map(inst) })) }
}

export type StyleKey = 'direction' | 'palette' | 'typography' | 'shape' | 'nav' | 'imagePresentation' | 'rotation'
/** Sets (or, with undefined, clears back to the look's default) one site-wide choice. A new look resets colours and lettering to its own. */
export function setStyle(plan: KitPlan, k: StyleKey, v: string | undefined): KitPlan {
  const next = { ...plan, [k]: v } as KitPlan
  if (k === 'direction') { delete next.palette; delete next.typography; delete next.rotation }
  if (v === undefined) delete next[k]
  return next
}

const mapPage = (plan: KitPlan, pageId: string, f: (p: PlanPage) => PlanPage): KitPlan => ({ ...plan, pages: plan.pages.map((p) => (p.id === pageId ? f(p) : p)) })

export const addPage = (plan: KitPlan, type: PageTypeId): { plan: KitPlan; id: string } => { const p = newPage(type); return { plan: { ...plan, pages: [...plan.pages, p] }, id: p.id } }
export const removePage = (plan: KitPlan, pageId: string): KitPlan => ({ ...plan, pages: plan.pages.filter((p) => p.id !== pageId) })
export const renamePage = (plan: KitPlan, pageId: string, label: string) => mapPage(plan, pageId, (p) => ({ ...p, label }))
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
export const sitePieceIds = (Object.keys(pieces) as PieceId[]).filter((id) => pieces[id].slot === 'site')

/** The first screen is the top of the first page: choosing one adds a hero there if the page has none. */
export function setHero(plan: KitPlan, hero: KitPlan['hero']): KitPlan {
  const next = { ...plan, hero }
  const first = next.pages[0]
  if (hero && first && first.sections[0]?.id !== 'hero') next.pages = [{ ...first, sections: [inst('hero'), ...first.sections] }, ...next.pages.slice(1)]
  return next
}

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
  const purpose = inferPurpose(plan)
  const effect = EFFECTS.find((e) => e.hero === plan.hero)
  const pages = plan.pages.length
    ? plan.pages.map((p) => ({ id: p.id, type: p.type, label: p.label, purpose: p.purpose, sections: p.sections.map((s) => s.id) }))
    : defaultPagesFor(purpose)
  const placements = [...plan.pages.flatMap((p) => p.sections.flatMap((s, index) => s.pieces.map((piece) => ({ piece, page: p.id, index })))), ...(plan.sitePieces ?? []).map((piece) => ({ piece, page: '*', index: -1 }))]
  // Motion: the look's default, raised to what the first screen and the attached pieces need — but the chosen first screen wins.
  const need = [effect?.motion ?? dir.defaults.motion, ...placements.map((x) => pieces[x.piece].levels[0])]
  let motion = LEVEL[Math.max(...need.map((m) => LEVEL.indexOf(m)))]
  if (plan.hero && !heroes[plan.hero].motion.includes(motion)) motion = heroes[plan.hero].motion.at(-1)!
  const lead = effect?.lead ?? dir.defaults.lead
  return normalizeSpec({
    base: dir.baseRecipe, brief: { name: plan.name }, purpose, direction: dir.id, characters: dir.voice ? [dir.voice] : [],
    lead, motion, hero: plan.hero, layout: dir.defaults.layout,
    palette: plan.palette ?? dir.defaults.palette, typography: plan.typography ?? dir.defaults.typography,
    assets: [], uploads: [], mediaPlan: lead === 'video' || lead === '3d' ? 'temporary' : 'have',
    imagePresentation: plan.imagePresentation, nav: plan.nav, shape: plan.shape, rotation: plan.rotation,
    signatures: [], // what you see is what you get: no touches the user did not place
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
    purpose: known(p.purpose, purposes), direction: known(p.direction, directions), palette: known(p.palette, palettes), typography: known(p.typography, typography),
    shape: known(p.shape, shapeStyles), nav: known(p.nav, navStyles), hero: EFFECTS.some((e) => e.hero === p.hero) ? p.hero : undefined,
    imagePresentation: known(p.imagePresentation, imagePresentations), pages, target: typeof p.target === 'string' ? p.target : undefined,
    rotation: p.rotation === 'off' ? 'off' : known(p.rotation, accentSets),
    sitePieces: Array.isArray(p.sitePieces) ? p.sitePieces.filter((id) => Object.hasOwn(pieces, id) && pieces[id].slot === 'site') : undefined,
  }
}

export const hasBlock = (id: SectionId) => !!blockFor(id)
