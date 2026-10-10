// The Library's Collection (docs/plan-library.md): whatever the person took off the shelves — sites, parts, effects —
// free, in any mix. Rules never block here; they only speak up as quiet notes. `collectionToPlan` turns it into a studio
// plan (Compose): a site in it is the start, every part and effect lands where it fits, the engine fills the rest.
// Pure (no storage, no React), so check.ts tests it.

import type { OfferId } from './inspire'
import exampleSpecs from '@/data/example-specs.generated.json'
import { examples } from '@/data/examples'
import { EFFECTS, footerStyles, navStyles, pageTypes, sections } from '@/data/patterns'
import { MAX_HEAVY_PIECES, behaviourOf, behaviours, pieces } from '@/data/pieces'
import { recipeSeeds, seedBySlug } from '@/data/recipes'
import { sectionVariants } from '@/data/section-variants'
import { goals, purposes } from '@/data/taxonomy'
import { CLOSING, EMPTY_PLAN, addSuggested, moveSection, effectOn, onChrome, pageSuggestions, piecesFor, replaceSection, sectionGroups, setBehaviour, setHero, setSectionVariant, setStyle, specToPlan, start, toggleSitePiece, togglePiece } from '@/features/studio/plan'
import { composeRecipe, isValidSpec, specFromSeed } from '@/features/recipes/engine'
import { TRAITS, TRAIT_IDS, starterFrom, type Trait } from './inspire'
import type { TakenPart, GoalId, DirectionId, FooterStyleId, HeroId, StudioPlan, NavStyleId, PageTypeId, PieceId, PlanSection, PurposeId, RecipeSpec, SectionId } from '@/types/domain'

/** A site is `example:{slug}` (built, real) or `seed:{slug}` (a recipe drawn by the engine) — the studio's own `from` ids. */
export type SiteRef = `example:${string}` | `seed:${string}`
export type CollectionItem =
  | { kind: 'site'; site: SiteRef }
  | { kind: 'section'; id: SectionId; variant?: string; from?: SiteRef }
  | { kind: 'hero'; id: HeroId; from?: SiteRef }
  | { kind: 'menu'; id: NavStyleId; from?: SiteRef }
  | { kind: 'footer'; id: FooterStyleId; from?: SiteRef }
  | { kind: 'effect'; id: PieceId; from?: SiteRef }
  /** One quality of a site (decision 35): its colours, lettering, first screen or movement — not the site. */
  | { kind: 'like'; what: Trait; site: SiteRef }

export type Collection = { items: CollectionItem[]; purpose?: PurposeId; name?: string; about?: string; look?: SiteRef
  /** The answer picked to "What are you making?" — a kind can sit in two (a spa is a service and a place). */
  offer?: OfferId
  /** What visitors should do (You): the main action, forms and buttons follow it. */
  goal?: GoalId
  /** "Home like Sela Mor": a page kind that follows one collected site instead of the blend. */
  like?: Partial<Record<PageTypeId, SiteRef>> }
export const EMPTY_COLLECTION: Collection = { items: [] }

/** One taken thing: what it is and where it was taken (decision 35) — Fennwood's gallery and Halden's are two things in
 *  the Collection, each shown as it was taken, even in the same design. A page still gets the part once (`applyItems`). */
const fromOf = (i: CollectionItem) => ('from' in i && i.from ? `@${i.from}` : '')
export const itemKey = (i: CollectionItem) => (i.kind === 'site' ? `site:${i.site}` : i.kind === 'like' ? `like:${i.what}:${i.site}` : i.kind === 'section' ? `section:${i.id}:${i.variant ?? ''}${fromOf(i)}` : `${i.kind}:${i.id}${fromOf(i)}`)
/** What Direction composes from: when it is unchanged, the plan made from it (or opened into it) is kept as it is. */
export const collectionSig = (c: Collection) => JSON.stringify([c.items.map(itemKey), c.purpose, c.about])
export const hasItem = (c: Collection, i: CollectionItem) => c.items.some((x) => itemKey(x) === itemKey(i))
export const toggleItem = (c: Collection, i: CollectionItem): Collection =>
  hasItem(c, i) ? { ...c, items: c.items.filter((x) => itemKey(x) !== itemKey(i)) } : { ...c, items: [...c.items, i] }
export const removeItem = (c: Collection, key: string): Collection => ({ ...c, items: c.items.filter((x) => itemKey(x) !== key) })

// ─── Sites ──────────────────────────────────────────────────────────────────

const specs = exampleSpecs as unknown as Record<string, RecipeSpec>
/** The recipe a site was made from: an example's recorded spec, or a seed's. */
export function siteSpec(ref: SiteRef): RecipeSpec | undefined {
  const [kind, slug] = ref.split(':')
  if (kind === 'example') return isValidSpec(specs[slug]) ? specs[slug] : undefined
  return kind === 'seed' && seedBySlug[slug] ? specFromSeed(seedBySlug[slug]) : undefined
}
export function siteName(ref: SiteRef): string {
  const [kind, slug] = ref.split(':')
  return (kind === 'example' ? examples.find((e) => e.slug === slug)?.title.split(/ [—|:] |, |: /)[0] : seedBySlug[slug]?.title) ?? slug
}
/** Every site on the shelf: the built ones first (proof), then the recipes. */
export const allSites: SiteRef[] = [
  ...examples.filter((e) => !e.legacy && isValidSpec(specs[e.slug])).map((e) => `example:${e.slug}` as const),
  ...recipeSeeds.map((s) => `seed:${s.slug}` as const),
]
/** The Sites shelf: built, real sites only (drawn recipes stay valid in a Collection, but are not offered). */
export const shelfSites: SiteRef[] = allSites.filter((r) => r.startsWith('example:'))
/** Real sites that use a ready section — so a part's card can say where it lives. */
export const sitesWith = (id: SectionId): SiteRef[] => allSites.filter((r) => r.startsWith('example:') && siteSpec(r)?.pages.some((p) => p.sections.includes(id)))

// ─── Names, for cards, notes and the Collection page ────────────────────────

export function itemName(i: CollectionItem): string {
  switch (i.kind) {
    case 'site': return siteName(i.site)
    case 'section': { const v = i.variant && sectionVariants[i.id]?.options.find((o) => o.id === i.variant); return `${v ? `${sections[i.id].name} · ${v.name}` : sections[i.id].name}${i.from ? ` · ${siteName(i.from)}` : ''}` }
    case 'hero': return EFFECTS.find((e) => e.hero === i.id)?.name ?? i.id
    case 'menu': return `Navigation · ${navStyles[i.id].name}${i.from ? ` · ${siteName(i.from)}` : ''}`
    case 'footer': return `Footer · ${footerStyles[i.id].name}${i.from ? ` · ${siteName(i.from)}` : ''}`
    case 'effect': return `${pieces[i.id].name}${i.from ? ` · ${siteName(i.from)}` : ''}`
    case 'like': return `${TRAITS[i.what].name} · ${siteName(i.site)}`
  }
}

/** The site-wide choices taken by name, which a new look never replaces: colours and lettering, and a menu or footer
 *  taken from a site (Ninth Row, #25: a new look silently replaced the taken Big name footer). */
export const keptByName = (items: CollectionItem[]) => new Set(items.flatMap((i) => (i.kind === 'like' ? [i.what === 'colours' ? 'palette' : i.what === 'lettering' ? 'typography' : ''] : i.kind === 'menu' ? ['nav'] : i.kind === 'footer' ? ['footer'] : [])))

/** The Collection's picks as the recipe keeps them (decision 45): each with the site it came from. */
export const takenOf = (items: CollectionItem[]): TakenPart[] => items.flatMap((i): TakenPart[] => {
  const site = i.kind === 'site' || i.kind === 'like' ? i.site : i.from
  return site ? [{ site, kind: i.kind, id: i.kind === 'site' ? '' : i.kind === 'like' ? i.what : i.id }] : []
})

/** One pick in words: "whole look", "colours", "Menu", "Words that arrive". */
export function takenName(t: TakenPart): string {
  switch (t.kind) {
    case 'site': return 'whole look'
    case 'like': return TRAITS[t.id as Trait]?.name.toLowerCase() ?? t.id
    case 'section': return sections[t.id as SectionId]?.name ?? t.id
    case 'effect': return pieces[t.id as PieceId]?.name ?? t.id
    case 'hero': return EFFECTS.find((e) => e.hero === t.id)?.name ?? 'first screen'
    default: return t.kind
  }
}

/** The picks grouped by the site they came from, in the order taken. */
export function takenBySite(t: TakenPart[]): { site: SiteRef; parts: TakenPart[] }[] {
  const by = new Map<SiteRef, TakenPart[]>()
  for (const x of t) by.set(x.site as SiteRef, [...(by.get(x.site as SiteRef) ?? []), x])
  return [...by].map(([site, parts]) => ({ site, parts }))
}

/** What was taken, by the site it came from: "Fennwood’s first screen, Menu and Reservation". */
export function takenFrom(t: TakenPart[]): string[] {
  const list = (xs: string[]) => (xs.length > 1 ? `${xs.slice(0, -1).join(', ')} and ${xs.at(-1)}` : xs[0])
  return takenBySite(t).map(({ site, parts }) => { const n = siteName(site); return `${n}${n.endsWith('s') ? '’' : '’s'} ${list(parts.map(takenName))}` })
}

// ─── Quiet notes: rules that suggest, never block ───────────────────────────

export type Note = { keys: string[]; text: string }

export function notes(c: Collection): Note[] {
  const out: Note[] = []
  const of = <K extends CollectionItem['kind']>(k: K) => c.items.filter((i): i is Extract<CollectionItem, { kind: K }> => i.kind === k)
  const sites = of('site')
  for (const k of ['hero', 'menu', 'footer'] as const) {
    const xs = of(k)
    if (xs.length > 1) out.push({ keys: xs.map(itemKey), text: `${xs.length} ${k === 'hero' ? 'first screens' : `${k}s`}: a site has one — the first is used, the others stay here.` })
  }
  // One per behaviour (headlines, links, button, page change): the last one picked wins.
  const fx = of('effect')
  for (const b of Object.keys(behaviours) as (keyof typeof behaviours)[]) {
    if (behaviours[b].many) continue
    const xs = fx.filter((i) => behaviourOf(i.id) === b)
    if (xs.length > 1) out.push({ keys: xs.map(itemKey), text: `${xs.map((i) => pieces[i.id].name).join(' and ')} do the same job (${behaviours[b].name.toLowerCase()}) — the site keeps one; the last one you added is used.` })
  }
  const heavy = fx.filter((i) => pieces[i.id].heavy)
  if (heavy.length > MAX_HEAVY_PIECES) out.push({ keys: heavy.map(itemKey), text: `${heavy.length} big effects — a site carries ${MAX_HEAVY_PIECES} at most, or it feels busy and loads slowly. Keep the two you like most.` })
  // What this kind of site usually has and the Collection doesn't (only when there is no site to start from).
  if (!sites.length && c.purpose) {
    const have = new Set(of('section').map((i) => i.id))
    const usual = (purposes[c.purpose].pages[0]?.sections ?? []).filter((id) => id !== 'hero' && !have.has(id))
    if (usual.length) out.push({ keys: [], text: `A ${purposes[c.purpose].name.toLowerCase()} usually also has ${usual.map((id) => sections[id].name.toLowerCase()).join(', ')} — we’ll add ${usual.length > 1 ? 'them' : 'it'}; you can change ${usual.length > 1 ? 'them' : 'it'} in Compose.` })
  }
  return out
}

// ─── Looks ──────────────────────────────────────────────────────────────────

/** The sites whose look the Collection could take. More than one: the person picks (About you). */
export const lookChoices = (c: Collection): SiteRef[] => c.items.flatMap((i) => (i.kind === 'site' ? [i.site] : []))
/** The site whose look (and pages) the plan starts from: the one picked, else the first site in the Collection. */
export const startSite = (c: Collection): SiteRef | undefined => {
  const xs = lookChoices(c)
  return c.look && xs.includes(c.look) ? c.look : xs[0]
}

/** A good-looking start for a kind of site when the Collection has no site in it. */
const LOOK_FOR: Partial<Record<PurposeId, DirectionId>> = {
  portfolio: 'art-editorial', agency: 'swiss-modern', studio: 'architectural-minimal', fashion: 'fashion-editorial', restaurant: 'warm-hospitality',
  ecommerce: 'scandinavian-minimal', product: 'bento-product', saas: 'technical-minimal', 'personal-brand': 'modern-heritage', experiment: 'digital-futurism',
  blog: 'news-grid', event: 'cinematic-editorial', nonprofit: 'soft-pastel', 'real-estate': 'scandinavian-minimal', hotel: 'coastal-calm', course: 'organic-modern', clinic: 'japanese-minimal', spa: 'coastal-calm',
}
export const lookFor = (purpose?: PurposeId): DirectionId | undefined => (purpose ? LOOK_FOR[purpose] : undefined)

/** The plan the shelves are drawn in: the start site's look, else the kind of site's, so every card shows what you'd get. */
export function previewPlan(c: Collection): StudioPlan {
  const s = startSite(c), spec = s && siteSpec(s)
  if (spec) return { ...specToPlan(spec), name: c.name }
  const d = lookFor(c.purpose)
  return { pages: [], purpose: c.purpose, name: c.name, ...(d ? { direction: d } : {}) }
}

// ─── Collection → plan (Compose) ────────────────────────────────────────────

const NOT_SWAPPED = new Set<SectionId>(['contact-cta', 'cta-band', 'donate']) // three different jobs (see sectionGroups)

/** The parts a site lends (decision 52): only what carries its design and feel — how it shows its work, its products,
 *  its story and its place. Everything else (questions, prices, a booking, the address, a newsletter, proof…) is the
 *  engine's: the kind of site and the owner's sentence give it, drawn in the look's design, and a taken part never
 *  replaces it. */
export const SIGNATURE_PARTS = new Set<SectionId>(['featured-work', 'case-study', 'gallery', 'lookbook', 'collection', 'product-highlight', 'product-grid', 'manifesto', 'editorial-story', 'timeline', 'chapters', 'menu', 'schedule', 'listen'])
const jobIds = (id: SectionId) => sectionGroups.find((g) => g.ids.includes(id))?.ids ?? [id]

export type Composed = { plan: StudioPlan; picked: number; unplaced: PieceId[] }

// ─── Many sites, one site: blend them, or let one page follow one site ─────

type SitePart = { id: SectionId; variant?: string }
const pagesOf = new Map<SiteRef, { type: PageTypeId; parts: SitePart[] }[]>()
/** A site's pages and their parts as its recipe builds them (each part in its own design). */
function sitePages(ref: SiteRef) {
  if (!pagesOf.has(ref)) {
    const spec = siteSpec(ref), r = spec && composeRecipe(spec)
    pagesOf.set(ref, r ? r.pages.map((p) => ({ type: p.type, parts: p.sections.filter((x) => x.id !== 'navbar' && x.id !== 'footer').map((x) => ({ id: x.id, ...(x.variant ? { variant: x.variant.id } : {}) })) })) : [])
  }
  return pagesOf.get(ref)!
}
/** The site's page of this kind (its first page stands in for a home page). */
const pageLikeOf = (ref: SiteRef, type: PageTypeId) => { const ps = sitePages(ref); return ps.find((p) => p.type === type) ?? (type === 'home' ? ps[0] : undefined) }

const newKey = () => Math.random().toString(36).slice(2, 10)
const sameJob = (a: SectionId, b: SectionId) => a === b || (!NOT_SWAPPED.has(a) && !NOT_SWAPPED.has(b) && jobIds(a).includes(b))

/** One page follows one site: its parts become that site's page's parts, in their designs. */
export function pageLike(plan: StudioPlan, pageId: string, ref: SiteRef): StudioPlan {
  const page = plan.pages.find((p) => p.id === pageId), sp = page && pageLikeOf(ref, page.type)
  if (!sp) return plan
  return { ...plan, pages: plan.pages.map((p) => (p.id !== pageId ? p : { ...p, sections: sp.parts.map((x) => ({ key: newKey(), id: x.id, pieces: [], ...(x.variant ? { variant: x.variant } : {}), from: ref })) })) }
}

/** A page made of all the collected sites: each of its parts is taken, in its design, from a site whose page of this
 *  kind has a part doing the same job — spread so every site gives something (the one that has given least goes first,
 *  then the order they were collected in). A part no site has stays the engine's. */
export function blendPage(plan: StudioPlan, pageId: string, sites: SiteRef[]): StudioPlan {
  const page = plan.pages.find((p) => p.id === pageId)
  if (!page || !sites.length) return plan
  const given = new Map<SiteRef, number>(sites.map((r) => [r, 0]))
  const used = new Map<SiteRef, Set<number>>(sites.map((r) => [r, new Set<number>()]))
  // A page never gets one part twice: two parts doing one job (a booking part and a closing call) must not both become
  // the same booking part from two sites. An offer is skipped when its part is already placed or still to come.
  const taken = new Set<SectionId>()
  const parts = page.sections.map((x, k) => {
    if (x.id === 'hero') return x
    const rest = new Set(page.sections.slice(k + 1).map((s) => s.id))
    const offers = sites.flatMap((r) => {
      const sp = pageLikeOf(r, page.type)
      const i = sp ? sp.parts.findIndex((y, n) => !used.get(r)!.has(n) && y.id !== 'hero' && sameJob(x.id, y.id) && !taken.has(y.id) && (y.id === x.id || !rest.has(y.id))) : -1
      return sp && i >= 0 ? [{ r, i, y: sp.parts[i] }] : []
    }).sort((a, b) => given.get(a.r)! - given.get(b.r)! || sites.indexOf(a.r) - sites.indexOf(b.r))
    const o = offers[0]
    if (!o) { taken.add(x.id); return x }
    taken.add(o.y.id)
    used.get(o.r)!.add(o.i); given.set(o.r, given.get(o.r)! + 1)
    const n: PlanSection = { key: x.key, id: o.y.id, pieces: x.pieces.filter((id) => pieces[id].sections.includes(o.y.id)), from: o.r }
    if (o.y.variant) n.variant = o.y.variant
    return n
  })
  return { ...plan, pages: plan.pages.map((p) => (p.id === pageId ? { ...p, sections: parts } : p)) }
}

/** Builds the studio plan from the Collection. One site: its own pages. Several: the kind of site's pages, each a blend of
 *  them — or, where the person said "Home like Sela Mor", that site's page. The look (until Brand) comes from the first
 *  site. Then every collected part and effect where it fits; a part replaces the same job's part on its page (never one
 *  the person collected), else joins the page. The goal is never asked: it is read from the parts (`inferGoal`). */
export function collectionToPlan(c: Collection): Composed {
  const sites = lookChoices(c), first = startSite(c), firstSpec = first && siteSpec(first)
  const kinds = sites.map((r) => siteSpec(r)!.purpose)
  const purpose = c.purpose ?? [...kinds].sort((a, b) => kinds.filter((k) => k === b).length - kinds.filter((k) => k === a).length)[0]
  let plan: StudioPlan = firstSpec ? { ...specToPlan(firstSpec), fromId: undefined } : lookFor(purpose) ? setStyle(EMPTY_PLAN, 'direction', lookFor(purpose)) : EMPTY_PLAN
  const own = sites.length === 1 && firstSpec?.purpose === purpose
  if (own) plan = { ...plan, pages: plan.pages.map((p) => ({ ...p, sections: p.sections.map((x) => ({ ...x, from: first })) })) }
  else plan = start(plan, purpose ?? null, starterFrom(purpose, c.about))
  plan = { ...plan, purpose: purpose ?? plan.purpose, name: c.name?.trim() || undefined, about: c.about?.trim() || undefined, goal: undefined }
  if (!own) for (const pg of plan.pages) {
    const like = c.like?.[pg.type]
    plan = like && sites.includes(like) ? pageLike(plan, pg.id, like) : blendPage(plan, pg.id, sites)
  }
  const r = applyItems(plan, c.items, true)
  return { plan: r.plan, picked: c.items.filter((i) => i.kind !== 'site').length, unplaced: r.unplaced }
}

/** Puts collected things into a plan. `replace`: a part takes the place of the default part doing its job (building
 *  from scratch); otherwise it joins its page (adding to pages the person has already worked on — nothing they
 *  arranged is touched). A first screen, menu or footer: the first one collected is used. A moment goes on the first
 *  part that can carry it; the ones no part can carry come back as `unplaced`. Sites are skipped: their parts wait in
 *  the Collection panel on Pages. */
export function applyItems(plan: StudioPlan, items: CollectionItem[], replace: boolean): { plan: StudioPlan; unplaced: PieceId[]; added: string[] } {
  const collected = new Set<string>() // section instance keys that came from the Collection
  const unplaced: PieceId[] = [], added: string[] = []
  const once = new Set<string>()
  const parts = new Set<string>() // one part in one design is added once, from whichever site it was taken first
  for (const i of items) {
    if (i.kind === 'site' || i.kind === 'like') continue
    if (i.kind === 'hero' || i.kind === 'menu' || i.kind === 'footer') {
      if (once.has(i.kind)) continue
      once.add(i.kind)
      plan = i.kind === 'hero' ? setHero(plan, i.id) : setStyle(plan, i.kind === 'menu' ? 'nav' : 'footer', i.id)
      continue
    }
    if (i.kind === 'section') {
      if (parts.has(`${i.id}:${i.variant ?? ''}`)) continue
      parts.add(`${i.id}:${i.variant ?? ''}`)
      // The page it belongs on: one that has it, else one with a part doing its job, else one that usually has it, else the first.
      const job = jobIds(i.id)
      const page = plan.pages.find((p) => p.sections.some((x) => x.id === i.id))
        ?? (NOT_SWAPPED.has(i.id) ? undefined : plan.pages.find((p) => p.sections.some((x) => job.includes(x.id))))
        ?? plan.pages.find((p) => pageSuggestions[p.type]?.includes(i.id)) ?? plan.pages[0]
      if (!page) continue
      let k = replace ? page.sections.find((x) => x.id === i.id && !collected.has(x.key))?.key : undefined
      if (!k && replace && !NOT_SWAPPED.has(i.id)) {
        // Only another signature part gives way: what the kind of site needs (a booking, the address, prices…) stays.
        const same = page.sections.find((x) => job.includes(x.id) && SIGNATURE_PARTS.has(x.id) && !NOT_SWAPPED.has(x.id) && !collected.has(x.key))
        if (same) {
          plan = replaceSection(plan, page.id, same.key, i.id); k = same.key
          // A part that replaced one after the page's closing part moves above it (a booking stays last; a page led by one keeps it first).
          for (let s = plan.pages.find((p) => p.id === page.id)!.sections, at = s.findIndex((x) => x.key === k); !CLOSING.includes(i.id) && at > 1 && CLOSING.includes(s[at - 1].id); at--) {
            plan = moveSection(plan, page.id, k, -1); s = plan.pages.find((p) => p.id === page.id)!.sections
          }
        }
      }
      if (!k) {
        const before = new Set(page.sections.map((x) => x.key))
        plan = addSuggested(plan, page.id, i.id)
        k = plan.pages.find((p) => p.id === page.id)!.sections.find((x) => !before.has(x.key))?.key
      }
      if (k) { collected.add(k); added.push(k); if (i.variant) plan = setSectionVariant(plan, page.id, k, i.variant) }
      continue
    }
    // Effects: a behaviour or a whole-site extra is site-wide; a moment goes on the first part that can carry it.
    const id = i.id, b = behaviourOf(id)
    if (b && !behaviours[b].many) { plan = setBehaviour(plan, b, id); continue }
    if (b || pieces[id].slot === 'site' || onChrome(id)) { if (!(plan.sitePieces ?? []).includes(id)) plan = toggleSitePiece(plan, id); continue }
    const host = plan.pages.flatMap((p) => p.sections.map((x) => ({ p, x }))).find(({ x }) => x.pieces.includes(id) || piecesFor(x).includes(id))
    if (!host) {
      // A taken effect never disappears: with no part to carry it, it brings the first part that can, on the page where
      // that part usually sits (Pip & Kiln's Prints on a desk on a shop with no gallery).
      const sec = pieces[id].sections.find((x) => x !== 'footer' && x !== 'navbar' && x !== 'hero')
      const page = sec && (plan.pages.find((p) => pageSuggestions[p.type]?.includes(sec)) ?? plan.pages[0])
      if (sec && page) {
        const before = new Set(page.sections.map((x) => x.key))
        plan = addSuggested(plan, page.id, sec)
        const k = plan.pages.find((p) => p.id === page.id)!.sections.find((x) => !before.has(x.key))?.key
        if (k) { plan = togglePiece(plan, page.id, k, id); added.push(k); continue }
      }
      unplaced.push(id); continue
    }
    if (!host.x.pieces.includes(id)) plan = togglePiece(plan, host.p.id, host.x.key, id)
  }
  return { plan, unplaced, added }
}

/** Where the Collection went: what is on the pages, and what waits (a second site, a moment no part can carry, a part
 *  the owner removed). Pages says so, so nothing collected disappears without a word. */
export function placement(plan: StudioPlan, c: Collection): { placed: CollectionItem[]; waiting: CollectionItem[] } {
  const start = startSite(c), parts = plan.pages.flatMap((p) => p.sections)
  const on = (i: CollectionItem) => {
    switch (i.kind) {
      case 'site': return i.site === start || parts.some((x) => x.from === i.site)
      case 'section': return parts.some((x) => x.id === i.id && (!i.variant || x.variant === i.variant))
      case 'hero': return plan.hero === i.id || parts.some((x) => x.hero === i.id)
      case 'menu': return plan.nav === i.id
      case 'footer': return plan.footer === i.id
      case 'effect': return effectOn(plan, i.id)
      case 'like': return true
    }
  }
  return { placed: c.items.filter(on), waiting: c.items.filter((i) => !on(i)) }
}

/** Trust boundary: the Collection comes back from localStorage. Unknown ids are dropped, never guessed. */
export function cleanCollection(x: unknown): Collection {
  if (!x || typeof x !== 'object') return EMPTY_COLLECTION
  const c = x as Partial<Collection>
  const site = (v: unknown): v is SiteRef => typeof v === 'string' && !!siteSpec(v as SiteRef)
  const from = (v: unknown) => (site(v) ? { from: v } : {})
  const items = (Array.isArray(c.items) ? c.items : []).flatMap((i): CollectionItem[] => {
    if (!i || typeof i !== 'object') return []
    const r = i as Record<string, unknown>, id = r.id as string
    if (r.kind === 'site') return site(r.site) ? [{ kind: 'site', site: r.site }] : []
    if (r.kind === 'like') return site(r.site) && TRAIT_IDS.includes(r.what as Trait) ? [{ kind: 'like', what: r.what as Trait, site: r.site }] : []
    if (r.kind === 'section' && Object.hasOwn(sections, id) && !['hero', 'navbar', 'footer'].includes(id)) {
      const v = typeof r.variant === 'string' && sectionVariants[id as SectionId]?.options.some((o) => o.id === r.variant) ? { variant: r.variant } : {}
      return [{ kind: 'section', id: id as SectionId, ...v, ...from(r.from) }]
    }
    if (r.kind === 'hero' && EFFECTS.some((e) => e.hero === id)) return [{ kind: 'hero', id: id as HeroId, ...from(r.from) }]
    if (r.kind === 'menu' && Object.hasOwn(navStyles, id)) return [{ kind: 'menu', id: id as NavStyleId, ...from(r.from) }]
    if (r.kind === 'footer' && Object.hasOwn(footerStyles, id)) return [{ kind: 'footer', id: id as FooterStyleId, ...from(r.from) }]
    if (r.kind === 'effect' && Object.hasOwn(pieces, id)) return [{ kind: 'effect', id: id as PieceId, ...from(r.from) }]
    return []
  })
  const unique = items.filter((i, n) => items.findIndex((y) => itemKey(y) === itemKey(i)) === n)
  return {
    items: unique,
    purpose: typeof c.purpose === 'string' && Object.hasOwn(purposes, c.purpose) && c.purpose !== 'other' ? c.purpose : undefined,
    name: typeof c.name === 'string' ? c.name.slice(0, 60) : undefined,
    about: typeof c.about === 'string' ? c.about.slice(0, 160) : undefined,
    look: site(c.look) ? c.look : undefined,
    goal: typeof c.goal === 'string' && Object.hasOwn(goals, c.goal) ? c.goal : undefined,
    ...(typeof c.offer === 'string' ? { offer: c.offer as OfferId } : {}),
    like: c.like && typeof c.like === 'object' ? Object.fromEntries(Object.entries(c.like).filter(([k, v]) => Object.hasOwn(pageTypes, k) && site(v))) as Collection['like'] : undefined,
  }
}
