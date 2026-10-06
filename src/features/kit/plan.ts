// The kit plan — a site built in three steps:
//   1. Style  — the same on every page (look, movement, big idea, colours, lettering, shape, menu, behaviour)
//   2. Pages  — page by page, top to bottom: sections, each with its look, its photo layout (photo sections) and its moments
//   3. Recipe — the recipe and Build Package for a tool
// Behaviours (how headlines, links and buttons act; whole-site extras) are site-wide; moments sit on one section and stay there.
// Pure (no storage, no React), so check.ts tests it and the builder recomposes the recipe on every change.

import { sectionVariants } from '@/data/section-variants'
import { blockFor } from '@/data/blocks'
import { accentSets, palettes, typography } from '@/data/ingredients'
import { EFFECTS, concepts, footerStyles, heroes, imagePresentations, navStyles, pageTypes, sections, shapeStyles } from '@/data/patterns'
import { behaviourOf, behaviours, isMoment, pieces } from '@/data/pieces'
import { directions, goals, motionLevels, purposes } from '@/data/taxonomy'
import { PHOTO_SECTIONS, defaultPagesFor, isValidSpec, normalizeSpec, recommendSectionPhotos, resolveHero, recommendPalette } from '@/features/recipes/engine'
import type { BehaviourId, ChromeId, GoalId, DirectionId, ImagePresentationId, KitPlan, MediaPlan, MotionLevel, PageSpec, PageTypeId, PieceId, PlanPage, PlanSection, PurposeId, RecipeSpec, SectionId } from '@/types/domain'

export const EMPTY_PLAN: KitPlan = { pages: [] }
export const DEFAULT_LOOK: DirectionId = 'swiss-editorial'
const LEVEL: MotionLevel[] = ['still', 'subtle', 'dynamic', 'immersive']

const key = () => Math.random().toString(36).slice(2, 10)
const MEDIA_PLANS: MediaPlan[] = ['have', 'image-to-video', 'temporary', 'image-alternative']
const inst = (id: SectionId): PlanSection => ({ key: key(), id, pieces: [] })

// ─── Catalogues, grouped the way people think about a site ───────────────────

/** Content sections you can place on a page (navbar, hero and footer are the page frame, set elsewhere). */
export const sectionGroups: { name: string; job: string; line: string; ids: SectionId[] }[] = [
  { name: 'Say who you are', job: 'Introduce yourself', line: 'Statements and story', ids: ['intro', 'manifesto', 'about', 'editorial-story', 'timeline', 'team'] },
  { name: 'Show the work', job: 'Show your work', line: 'Projects and atmosphere', ids: ['featured-work', 'case-study', 'gallery', 'listen', 'specs'] },
  { name: 'Proof', job: 'Build trust', line: 'Who vouches for you', ids: ['testimonials', 'clients', 'stats', 'press', 'trust'] },
  { name: 'Explain the offer', job: 'Explain what you offer', line: 'What you do and how', ids: ['chapters', 'services', 'curriculum', 'process', 'how-it-works', 'feature-grid', 'feature-rows', 'integrations', 'pricing'] },
  { name: 'Sell', job: 'Show your products', line: 'Products and collections', ids: ['product-buy', 'collection', 'lookbook', 'product-grid', 'product-highlight', 'categories'] },
  { name: 'Bring people in', job: 'Help people visit', line: 'Food, bookings, places, programmes', ids: ['menu', 'reservation', 'location', 'schedule'] },
  // Three different jobs, not three looks of one: each ends a page in its own way (the CTA band asks mid-page).
  { name: 'Next step', job: 'Ask for the next step', line: 'One clear action, mid-page or at the end', ids: ['contact-cta', 'cta-band', 'donate'] },
  { name: 'Questions', job: 'Answer questions', line: 'What people ask before they decide', ids: ['faq'] },
  { name: 'News', job: 'Share news', line: 'Posts, updates, what’s new', ids: ['article', 'journal', 'newsletter'] },
]

/** A section's job on the page, in plain words ("Show your work"); sections doing the same job can replace each other. */
export const jobOf = (id: SectionId) => sectionGroups.find((g) => g.ids.includes(id))?.job ?? sections[id].name

export const pageGroups: { name: string; ids: PageTypeId[] }[] = [
  { name: 'Main pages', ids: ['home', 'about', 'work', 'project', 'services', 'contact', 'journal', 'article', 'gallery', 'team', 'testimonials', 'press', 'careers', 'donate', 'listen'] },
  { name: 'Selling', ids: ['shop', 'collections', 'product-detail', 'cart', 'checkout', 'account', 'pricing', 'features', 'comparison', 'size-guide', 'shipping-returns', 'gift-cards', 'wholesale'] },
  { name: 'Hospitality & events', ids: ['menu', 'reservations', 'order-online', 'catering', 'locations'] },
  { name: 'Help & legal', ids: ['faq', 'newsletter', 'sign-in', 'sign-up', 'privacy-policy', 'terms-of-service', 'cookie-policy', 'accessibility', 'not-found'] },
]

/** What each kind of page is usually made of, in reading order — used to start a new page and to suggest what to add.
 *  Pages with none (sign-in, legal, 404…) are standard pages written for you; they need no sections. */
export const pageSuggestions: Partial<Record<PageTypeId, SectionId[]>> = {
  home: ['intro', 'featured-work', 'feature-rows', 'categories', 'clients', 'press', 'manifesto', 'product-highlight', 'how-it-works', 'schedule', 'gallery', 'trust', 'cta-band', 'faq', 'newsletter', 'contact-cta'],
  work: ['featured-work', 'case-study', 'listen', 'clients', 'contact-cta'],
  about: ['about', 'editorial-story', 'timeline', 'process', 'clients', 'press', 'contact-cta'],
  contact: ['contact-cta', 'location', 'faq'],
  services: ['services', 'process', 'feature-rows', 'pricing', 'trust', 'clients', 'cta-band', 'faq', 'contact-cta'],
  collections: ['collection', 'lookbook', 'editorial-story', 'categories'],
  shop: ['categories', 'product-grid', 'product-highlight', 'collection', 'trust', 'faq', 'newsletter'],
  'product-detail': ['product-buy', 'product-highlight', 'specs', 'gallery', 'testimonials', 'feature-rows', 'trust', 'faq', 'product-grid'],
  project: ['case-study', 'gallery', 'specs', 'editorial-story', 'testimonials', 'featured-work'],
  article: ['article', 'journal', 'newsletter'],
  cart: ['product-grid'],
  features: ['curriculum', 'specs', 'feature-grid', 'feature-rows', 'how-it-works', 'integrations', 'product-highlight', 'pricing', 'cta-band', 'faq', 'contact-cta'],
  pricing: ['pricing', 'trust', 'faq', 'clients', 'contact-cta'],
  donate: ['donate', 'trust', 'stats', 'testimonials', 'faq'],
  listen: ['listen', 'intro', 'featured-work', 'newsletter', 'contact-cta'],
  faq: ['faq', 'contact-cta'],
  journal: ['journal', 'categories', 'article', 'newsletter'],
  experiment: ['gallery', 'editorial-story', 'manifesto'],
  menu: ['menu', 'gallery', 'reservation'],
  gallery: ['gallery', 'lookbook'],
  reservations: ['reservation', 'location', 'schedule', 'faq'],
  team: ['team', 'about', 'contact-cta'],
  careers: ['editorial-story', 'process', 'faq', 'contact-cta'],
  testimonials: ['testimonials', 'clients', 'press', 'case-study', 'contact-cta'],
  press: ['press', 'journal', 'clients', 'contact-cta'],
  integrations: ['integrations', 'feature-grid', 'faq'],
  changelog: ['journal'],
  security: ['feature-grid', 'faq', 'trust', 'contact-cta'],
  comparison: ['pricing', 'feature-grid', 'integrations', 'faq'],
  partners: ['clients', 'contact-cta'],
  'shipping-returns': ['faq'],
  'size-guide': ['faq'],
  'gift-cards': ['product-highlight', 'faq'],
  locations: ['location', 'gallery', 'reservation'],
  catering: ['services', 'gallery', 'reservation', 'contact-cta'],
  'order-online': ['menu', 'faq'],
  newsletter: ['newsletter', 'journal', 'contact-cta'],
  wholesale: ['product-grid', 'contact-cta', 'categories', 'faq'],
  custom: ['intro', 'contact-cta'],
}

/** The "Add to page" list for one kind of page: what that page usually has comes first — the groups holding it, in the
 *  page's reading order, and inside each group its usual sections first (`usual`). The film/image part leads on Home. */
export function libraryFor(type: PageTypeId): { name: string; job: string; ids: SectionId[]; usual: SectionId[] }[] {
  const order = pageSuggestions[type] ?? []
  const rank = (id: SectionId) => (id === 'hero' ? (type === 'home' ? -1 : Infinity) : order.includes(id) ? order.indexOf(id) : Infinity)
  const groups = [{ name: 'Film or image', job: 'Show your film or image', ids: ['hero'] as SectionId[] }, ...sectionGroups]
  return groups
    .map((g, i) => ({ g, i, ids: [...g.ids].sort((a, b) => rank(a) - rank(b)) }))
    .sort((a, b) => Math.min(...a.ids.map(rank)) - Math.min(...b.ids.map(rank)) || a.i - b.i)
    .map(({ g, ids }) => ({ name: g.name, job: g.job, ids, usual: ids.filter((id) => rank(id) !== Infinity) }))
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
export const starters = (Object.values(purposes)).filter((p) => p.id !== 'other').flatMap((p) => [
  { id: p.id, starter: undefined as string | undefined, name: p.name, pages: defaultPagesFor(p.id).map((x) => x.label) },
  ...(p.starters ?? []).map((s) => ({ id: p.id, starter: s.id as string | undefined, name: s.name, pages: defaultPagesFor(p.id, s.id).map((x) => x.label) })),
])

/** Pieces that belong on this section: made for it, and no second piece for a job the section already has. */
export function piecesFor(section: PlanSection): PieceId[] {
  const taken = new Set(section.pieces.map((id) => pieces[id].slot))
  return (Object.keys(pieces) as PieceId[]).filter((id) => isMoment(id) && pieces[id].sections.includes(section.id) && (section.pieces.includes(id) || !taken.has(pieces[id].slot)))
}

// ─── Photo layout, per photo section ────────────────────────────────────────

export const isPhotoSection = (id: SectionId) => PHOTO_SECTIONS.includes(id)
/** How this section shows its photos: the owner's pick, else the recommendation for it. */
export function sectionPhotos(plan: KitPlan, s: PlanSection): { id: ImagePresentationId; recommended: ImagePresentationId; chosen: boolean } {
  const recommended = recommendSectionPhotos(planToSpec(plan), s.id)
  return { id: s.photos ?? recommended, recommended, chosen: !!s.photos }
}
/** Picks how one photo section shows its photos (undefined = back to the recommendation). */
export const setSectionPhotos = (plan: KitPlan, pageId: string, k: string, id: ImagePresentationId | undefined) =>
  mapPage(plan, pageId, (p) => ({ ...p, sections: p.sections.map((s) => { if (s.key !== k) return s; const n = { ...s, photos: id }; if (!id) delete n.photos; return n }) }))
/** Picks the design of one multi-design section (undefined = back to the look's own). */
export const setSectionVariant = (plan: KitPlan, pageId: string, k: string, id: string | undefined) =>
  mapPage(plan, pageId, (p) => ({ ...p, sections: p.sections.map((s) => { if (s.key !== k) return s; const n = { ...s, variant: id }; if (!id) delete n.variant; return n }) }))

// ─── Behaviour, site-wide ───────────────────────────────────────────────────

/** The piece chosen for a behaviour (headlines, links, buttons), or undefined for none. */
export const behaviourPick = (plan: KitPlan, b: BehaviourId) => behaviours[b].ids.find((id) => (plan.sitePieces ?? []).includes(id))
/** Sets one behaviour (one piece per behaviour; `site` extras are toggled instead). */
export function setBehaviour(plan: KitPlan, b: BehaviourId, id: PieceId | undefined): KitPlan {
  const rest = (plan.sitePieces ?? []).filter((x) => !behaviours[b].ids.includes(x))
  return { ...plan, sitePieces: id ? [...rest, id] : rest }
}

// ─── Building the plan ──────────────────────────────────────────────────────

/** A new page starts with its own sections — or, when the page type has none, the first ones it usually has. Never blank by accident. */
const newPage = (type: PageTypeId, label = pageTypes[type].name): PlanPage => {
  const own = pageTypes[type].sections
  const start = own.length ? own : (pageSuggestions[type] ?? []).slice(0, 2)
  return { id: key(), type, label, purpose: pageTypes[type].defaultPurpose, sections: start.map(inst) }
}

/** A starter replaces the pages (the style stays); `null` = start blank with just a Home page. */
export function start(plan: KitPlan, purpose: PurposeId | null, starter?: string): KitPlan {
  if (!purpose) return { ...plan, purpose: undefined, pages: [newPage('home')] }
  // Every page arrives filled: one with nothing listed gets what that kind of page usually starts with.
  return { ...plan, purpose, pages: defaultPagesFor(purpose, starter).map((p) => ({ id: key(), type: p.type, label: p.label, purpose: p.purpose, sections: (p.sections.length ? p.sections : newPage(p.type).sections.map((s) => s.id)).map(inst) })) }
}

export type StyleKey = 'direction' | 'palette' | 'typography' | 'shape' | 'nav' | 'footer' | 'rotation' | 'motion' | 'concept'
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

/** Inserts a section at `at` (0 = top of the page). Any part goes anywhere — a film or image can sit mid-page too. */
export const addSection = (plan: KitPlan, pageId: string, id: SectionId, at: number) =>
  mapPage(plan, pageId, (p) => { const s = [...p.sections]; s.splice(Math.max(0, at), 0, inst(id)); return { ...p, sections: s } })
export const removeSection = (plan: KitPlan, pageId: string, k: string) => mapPage(plan, pageId, (p) => ({ ...p, sections: p.sections.filter((s) => s.key !== k) }))
export function moveSection(plan: KitPlan, pageId: string, k: string, by: -1 | 1): KitPlan {
  return mapPage(plan, pageId, (p) => {
    const i = p.sections.findIndex((s) => s.key === k), j = i + by
    if (i < 0 || j < 0 || j >= p.sections.length) return p
    const s = [...p.sections];[s[i], s[j]] = [s[j], s[i]]
    return { ...p, sections: s }
  })
}
/** Drops a section at position `to` (drag and drop). Every part moves, the first screen too. */
export function placeSection(plan: KitPlan, pageId: string, k: string, to: number): KitPlan {
  return mapPage(plan, pageId, (p) => {
    const from = p.sections.findIndex((s) => s.key === k)
    if (from < 0) return p
    const s = [...p.sections]
    const [moved] = s.splice(from, 1)
    s.splice(Math.min(Math.max(0, to > from ? to - 1 : to), s.length), 0, moved)
    return { ...p, sections: s }
  })
}
/** Shows or leaves out the menu or the footer on one page (they stay the same on every page that shows them). */
export const toggleChrome = (plan: KitPlan, pageId: string, c: ChromeId) => mapPage(plan, pageId, (p) => {
  const hide = p.hide?.includes(c) ? p.hide.filter((x) => x !== c) : [...(p.hide ?? []), c]
  const { hide: _, ...rest } = p
  return hide.length ? { ...rest, hide } : rest
})
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

/** Picks what the big film/image part shows (the same wherever it sits). Where it sits is the user's: top, mid-page,
 *  any page — it is only added (top of the first page) when the site has none at all. */
export function setHero(plan: KitPlan, hero: KitPlan['hero']): KitPlan {
  const next = { ...plan, hero }
  const first = next.pages[0]
  if (hero && first && !next.pages.some((p) => p.sections.some((s) => s.id === 'hero'))) next.pages = [{ ...first, sections: [inst('hero'), ...first.sections] }, ...next.pages.slice(1)]
  return next
}
/** What one film/image part shows: its own pick, else the site's first screen. */
export const heroOf = (plan: KitPlan, s: PlanSection): KitPlan['hero'] => s.hero ?? plan.hero

/** Picks what one film/image part shows, and only that one. The site's first film/image part is its first screen —
 *  it sets the media and movement (`setHero`); every other part then keeps what it showed before. */
export function setPartHero(plan: KitPlan, pageId: string, k: string, hero: KitPlan['hero']): KitPlan {
  const all = plan.pages.flatMap((p) => p.sections.filter((s) => s.id === 'hero'))
  const map = (f: (s: PlanSection) => PlanSection): KitPlan => ({ ...plan, pages: plan.pages.map((p) => ({ ...p, sections: p.sections.map((s) => (s.id === 'hero' ? f(s) : s)) })) })
  if (all[0]?.key === k) {
    const was = plan.hero ?? resolveHero(planToSpec(plan)).id
    return setHero(map((s) => (s.key === k ? (({ hero: _, ...rest }) => rest)(s) : { ...s, hero: s.hero ?? was })), hero)
  }
  return map((s) => (s.key === k ? { ...s, hero: hero ?? plan.hero ?? resolveHero(planToSpec(plan)).id } : s))
}

/** The big film/image part's name where it sits: at the top it is the page's first screen, lower down a band. */
export const heroTitle = (p: PlanPage, s: PlanSection) => (p.sections[0]?.key === s.key ? 'First screen' : 'Film or image')

// ─── Swap, don't build: pages arrive filled; a section is replaced by one that does the same job ─────────

/** What can take a section's place: sections doing the same job, then others this kind of page usually has. */
export function swapOptions(page: PlanPage, id: SectionId): { job: SectionId[]; page: SectionId[] } {
  const job = (sectionGroups.find((g) => g.ids.includes(id))?.ids ?? []).filter((x) => x !== id)
  return { job, page: (pageSuggestions[page.type] ?? []).filter((x) => x !== id && x !== 'hero' && !job.includes(x)) }
}

/** Replaces one section in place. Its moments stay when the new section can carry them, else they are turned off —
 *  a moment never wanders to another section. Its photo layout stays when the new section shows photos too. */
export function replaceSection(plan: KitPlan, pageId: string, k: string, id: SectionId): KitPlan {
  const old = plan.pages.find((p) => p.id === pageId)?.sections.find((s) => s.key === k)
  if (!old) return plan
  const keep = old.pieces.filter((x) => pieces[x].sections.includes(id))
  return mapPage(plan, pageId, (p) => ({ ...p, sections: p.sections.map((s) => { if (s.key !== k) return s; const n: PlanSection = { key: s.key, id, pieces: keep }; if (s.photos && isPhotoSection(id)) n.photos = s.photos; return n }) }))
}

/** A page back to what that kind of page usually has — its sections and its brief. Its moments go with the old sections. */
export function resetPage(plan: KitPlan, pageId: string): KitPlan {
  const page = plan.pages.find((p) => p.id === pageId)
  if (!page) return plan
  // What this kind of site starts that page with, else what that kind of page usually has.
  const usual = (plan.purpose ? purposes[plan.purpose].pages.find((p) => p.type === page.type)?.sections : undefined) ?? []
  const fresh = (usual.length ? usual : newPage(page.type).sections.map((s) => s.id)).map(inst)
  return mapPage(plan, pageId, (p) => ({ ...p, sections: fresh, purpose: pageTypes[p.type].defaultPurpose }))
}

/** Swaps the pages for a kind of site's usual ones; style, brief, files and behaviours stay (moments go with the old pages). */
export function usualPages(plan: KitPlan, purpose: PurposeId): KitPlan {
  return setHero(start(plan, purpose), plan.hero)
}

/** Whether a piece is on anywhere — as a behaviour or as a moment on some section. */
export const effectOn = (plan: KitPlan, id: PieceId) => (plan.sitePieces ?? []).includes(id) || plan.pages.some((p) => p.sections.some((s) => s.pieces.includes(id)))

/** Where a piece sits, in words ("Home · Intro", "Every page"), or null when it's off. */
export function effectWhere(plan: KitPlan, id: PieceId): string | null {
  if ((plan.sitePieces ?? []).includes(id)) return behaviourOf(id) || pieces[id].slot === 'site' ? 'Every page' : 'Menu & footer, every page'
  for (const p of plan.pages) for (const s of p.sections) if (s.pieces.includes(id)) return `${p.label} · ${s.id === 'hero' ? heroTitle(p, s) : sections[s.id].name}`
  return null
}

export function removeEffect(plan: KitPlan, id: PieceId): KitPlan {
  return { ...plan, sitePieces: (plan.sitePieces ?? []).filter((x) => x !== id), pages: plan.pages.map((p) => ({ ...p, sections: p.sections.map((s) => ({ ...s, pieces: s.pieces.filter((x) => x !== id) })) })) }
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

const GOAL_OF: Partial<Record<PurposeId, GoalId>> = {
  portfolio: 'contact', agency: 'contact', studio: 'contact', 'personal-brand': 'contact', 'real-estate': 'contact', experiment: 'explore',
  ecommerce: 'buy', fashion: 'buy', product: 'buy', restaurant: 'book', hotel: 'book', clinic: 'book', event: 'book',
  saas: 'signup', blog: 'subscribe', nonprofit: 'donate', course: 'apply',
}
/** What visitors should do, read from what the site has (the owner never has to say): its parts and pages first —
 *  a donate part means donate, a buy box or a cart means buy, a booking part means book — then its kind. */
export function inferGoal(plan: KitPlan): GoalId {
  const parts = new Set(plan.pages.flatMap((p) => p.sections.map((s) => s.id))), pages = new Set(plan.pages.map((p) => p.type))
  const has = (...xs: string[]) => xs.some((x) => parts.has(x as SectionId) || pages.has(x as PageTypeId))
  const purpose = inferPurpose(plan)
  if (has('donate')) return 'donate'
  if (has('product-buy', 'product-grid', 'cart', 'checkout', 'shop')) return 'buy'
  if (has('reservation', 'reservations')) return 'book'
  if (has('sign-up') || (has('pricing') && purpose === 'saas')) return 'signup'
  if (has('curriculum', 'careers')) return 'apply'
  if (has('location') && (purpose === 'restaurant' || purpose === 'hotel')) return 'visit'
  return GOAL_OF[purpose] ?? (has('contact-cta', 'contact') ? 'contact' : 'explore')
}

export function planToSpec(plan: KitPlan): RecipeSpec {
  const dir = directions[plan.direction ?? DEFAULT_LOOK]
  // Opened from a recipe: keep what the kit can't edit. Voice, layout, lead and touches only while its look is unchanged.
  const from = plan.from, same = from?.direction === dir.id ? from : undefined
  const purpose = inferPurpose(plan)
  const effect = EFFECTS.find((e) => e.hero === plan.hero)
  const pages = plan.pages.length
    ? plan.pages.map((p) => ({ id: p.id, type: p.type, label: p.label, purpose: p.purpose, sections: p.sections.map((s) => s.id), ...(p.hide?.length ? { hide: p.hide } : {}) }))
    : defaultPagesFor(purpose)
  const placements = [...plan.pages.flatMap((p) => p.sections.flatMap((s, index) => s.pieces.map((piece) => ({ piece, page: p.id, index })))), ...(plan.sitePieces ?? []).map((piece) => ({ piece, page: '*', index: -1 }))]
  // Motion: the look's default, raised to what the first screen and the attached pieces need — but the chosen first screen wins.
  const need = [plan.motion ?? effect?.motion ?? same?.motion ?? dir.defaults.motion, ...placements.map((x) => pieces[x.piece].levels[0])]
  let motion = LEVEL[Math.max(...need.map((m) => LEVEL.indexOf(m)))]
  if (plan.hero && !heroes[plan.hero].motion.includes(motion)) motion = heroes[plan.hero].motion.at(-1)!
  const lead = effect?.lead ?? same?.lead ?? dir.defaults.lead
  const palette = plan.palette ?? recommendPalette({ direction: dir.id, purpose, lead })
  return normalizeSpec({
    base: same?.base ?? dir.baseRecipe, brief: { ...from?.brief, name: plan.name, offer: plan.about, goal: plan.goal ?? inferGoal(plan), photos: plan.photoNote }, purpose, direction: dir.id, characters: same?.characters ?? (dir.voice ? [dir.voice] : []),
    lead, motion, hero: plan.hero ?? (lead === same?.lead ? same.hero : undefined), layout: same?.layout ?? dir.defaults.layout,
    palette, customPalette: from?.palette === palette ? from.customPalette : undefined, typography: plan.typography ?? dir.defaults.typography,
    assets: plan.assets ?? from?.assets ?? [], uploads: plan.uploads ?? from?.uploads ?? [], videoFrame: from?.videoFrame,
    mediaPlan: plan.mediaPlan ?? from?.mediaPlan ?? (lead === 'video' || lead === '3d' ? 'temporary' : 'have'),
    nav: plan.nav, footer: plan.footer, shape: plan.shape, rotation: plan.rotation,
    // A Library-built site gets no big idea it did not pick: the concept brings signature moments and cover rules the
    // owner never saw in Pages (what you see is what you get).
    concept: plan.concept ?? (plan.via === 'studio' ? 'off' : undefined),
    sectionPhotos: plan.pages.flatMap((p) => p.sections.flatMap((s, index) => (s.photos ? [{ page: p.id, index, presentation: s.photos }] : []))),
    sectionVariants: plan.pages.flatMap((p) => p.sections.flatMap((s, index) => (s.variant ? [{ page: p.id, index, variant: s.variant }] : []))),
    heroBands: plan.pages.flatMap((p) => p.sections.flatMap((s, index) => (s.id === 'hero' && s.hero && s.hero !== plan.hero ? [{ page: p.id, index, hero: s.hero }] : []))),
    signatures: same?.signatures ?? [], // what you see is what you get: no touches the user did not place
    pieces: [...new Set(placements.map((x) => x.piece))], piecePlacements: placements,
    pages, target: plan.target ?? 'not-sure',
  })
}

/** Site-wide pieces, cleaned: known behaviours (one per behaviour; the pick wins over one found on a section of an older
 *  plan), whole-site extras, and menu/footer pieces. Behaviour pieces found on sections move here and leave the section. */
function siteFrom(raw: unknown, pages: PlanPage[]): PieceId[] | undefined {
  const known = (id: unknown): id is PieceId => typeof id === 'string' && Object.hasOwn(pieces, id)
  const listed = Array.isArray(raw) ? raw.filter(known).filter((id) => !!behaviourOf(id) || pieces[id].slot === 'site' || onChrome(id)) : []
  const onSections = pages.flatMap((p) => p.sections.flatMap((s) => s.pieces.filter((id) => !!behaviourOf(id))))
  for (const pg of pages) for (const s of pg.sections) s.pieces = s.pieces.filter(isMoment)
  const out: PieceId[] = []
  for (const id of [...listed, ...onSections]) { const b = behaviourOf(id); if (out.includes(id) || (b && !behaviours[b].many && out.some((x) => behaviourOf(x) === b))) continue; out.push(id) }
  return out.length ? out : undefined
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
      .filter((s) => !!s && Object.hasOwn(sections, s.id)).map((s) => {
        const n: PlanSection = { key: typeof s.key === 'string' ? s.key : key(), id: s.id, pieces: Array.isArray(s.pieces) ? [...new Set(s.pieces.filter((id) => Object.hasOwn(pieces, id)))] : [] }
        const ph = s.photos ?? (isPhotoSection(s.id) ? known<ImagePresentationId>(p.imagePresentation, imagePresentations) : undefined) // older plans: one photo layout for the whole site
        if (ph && isPhotoSection(s.id) && Object.hasOwn(imagePresentations, ph)) n.photos = ph
        if (s.id === 'hero' && s.hero && Object.hasOwn(heroes, s.hero)) n.hero = s.hero
        if (typeof s.variant === 'string' && sectionVariants[s.id]?.options.some((o) => o.id === s.variant)) n.variant = s.variant
        if (typeof s.from === 'string' && /^(example|seed):[a-z0-9-]{1,60}$/.test(s.from)) n.from = s.from
        return n
      }),
    ...(Array.isArray(pg.hide) && pg.hide.some((c) => c === 'navbar' || c === 'footer') ? { hide: [...new Set(pg.hide.filter((c) => c === 'navbar' || c === 'footer'))] } : {}),
  })) : []
  return {
    name: typeof p.name === 'string' ? p.name.slice(0, 60) : undefined,
    about: typeof p.about === 'string' ? p.about.slice(0, 160) : undefined,
    goal: known(p.goal, goals), motion: known(p.motion, motionLevels), photoNote: typeof p.photoNote === 'string' ? p.photoNote.slice(0, 400) : undefined,
    uploads: Array.isArray(p.uploads) ? p.uploads.filter((u) => !!u && typeof u.name === 'string' && typeof u.asset === 'string' && ['image', 'video', 'other'].includes(u.kind)) : undefined,
    assets: Array.isArray(p.assets) ? p.assets.filter((a) => typeof a === 'string') : undefined,
    mediaPlan: MEDIA_PLANS.includes(p.mediaPlan as MediaPlan) ? p.mediaPlan : undefined,
    purpose: known(p.purpose, purposes), direction: known(p.direction, directions), palette: known(p.palette, palettes), typography: known(p.typography, typography),
    shape: known(p.shape, shapeStyles), nav: known(p.nav, navStyles), footer: known(p.footer, footerStyles), hero: EFFECTS.some((e) => e.hero === p.hero) ? p.hero : undefined,
    pages, target: typeof p.target === 'string' ? p.target : undefined,
    rotation: p.rotation === 'off' ? 'off' : known(p.rotation, accentSets),
    concept: p.concept === 'off' ? 'off' : known(p.concept, concepts),
    sitePieces: siteFrom(p.sitePieces, pages),
    from: isValidSpec(p.from) ? p.from : undefined, fromId: typeof p.fromId === 'string' ? p.fromId : undefined,
    ...(p.via === 'studio' ? { via: 'studio' as const } : {}),
    ...(p.blank ? { blank: true as const } : {}),
  }
}

/** Customise: a recipe back into a kit plan. Every piece gets a place — the one it was given, else the first section that suits it. */
export function specToPlan(spec: RecipeSpec, fromId?: string): KitPlan {
  // A placement pointing at a page or section that isn't there counts as unplaced, so the piece still finds a home.
  const placed = (spec.piecePlacements ?? []).filter((x) => x.page === '*' || spec.pages.find((p) => p.id === x.page)?.sections[x.index])
  const pages: PlanPage[] = spec.pages.map((p) => ({ id: p.id, type: p.type, label: p.label, purpose: p.purpose, hide: p.hide,
    sections: p.sections.map((id, i) => ({ key: key(), id, pieces: placed.filter((x) => x.page === p.id && x.index === i).map((x) => x.piece), photos: spec.sectionPhotos?.find((x) => x.page === p.id && x.index === i)?.presentation, hero: spec.heroBands?.find((x) => x.page === p.id && x.index === i)?.hero, variant: spec.sectionVariants?.find((x) => x.page === p.id && x.index === i)?.variant })) }))
  const sitePieces = placed.filter((x) => x.page === '*').map((x) => x.piece)
  for (const id of spec.pieces ?? []) {
    if (placed.some((x) => x.piece === id)) continue
    const host = pages.flatMap((p) => p.sections).find((s) => pieces[id].sections.includes(s.id))
    if (host) host.pieces.push(id); else if (pieces[id].slot === 'site' || onChrome(id)) sitePieces.push(id)
  }
  return cleanPlan({
    name: spec.brief?.name, about: spec.brief?.offer, goal: spec.brief?.goal, photoNote: spec.brief?.photos, purpose: spec.purpose, direction: spec.direction, palette: spec.palette, typography: spec.typography,
    shape: spec.shape, nav: spec.nav, footer: spec.footer, imagePresentation: spec.imagePresentation, rotation: spec.rotation, concept: spec.concept, hero: spec.hero,
    motion: spec.motion, sitePieces, pages, target: spec.target, from: spec, fromId, uploads: spec.uploads, assets: spec.assets, mediaPlan: spec.mediaPlan,
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
    concept: v('Big idea') === 'none' ? 'off' : byName(concepts, v('Big idea')) as RecipeSpec['concept'],
    assets: [], pages: pages.length ? pages : defaultPagesFor(purpose), target: 'not-sure',
  })
}

export const hasBlock = (id: SectionId) => !!blockFor(id)
