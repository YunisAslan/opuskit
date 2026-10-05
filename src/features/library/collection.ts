// The Library's Collection (docs/plan-library.md): whatever the person took off the shelves — sites, parts, effects —
// free, in any mix. Rules never block here; they only speak up as quiet notes. `collectionToPlan` turns it into a kit
// plan (Compose): a site in it is the start, every part and effect lands where it fits, the engine fills the rest.
// Pure (no storage, no React), so check.ts tests it.

import exampleSpecs from '@/data/example-specs.generated.json'
import { examples } from '@/data/examples'
import { EFFECTS, footerStyles, navStyles, sections } from '@/data/patterns'
import { MAX_HEAVY_PIECES, behaviourOf, behaviours, pieces } from '@/data/pieces'
import { recipeSeeds, seedBySlug } from '@/data/recipes'
import { sectionVariants } from '@/data/section-variants'
import { purposes } from '@/data/taxonomy'
import { EMPTY_PLAN, addSuggested, effectOn, onChrome, pageSuggestions, piecesFor, replaceSection, sectionGroups, setBehaviour, setHero, setSectionVariant, setStyle, specToPlan, start, toggleSitePiece, togglePiece } from '@/features/kit/plan'
import { isValidSpec, specFromSeed } from '@/features/recipes/engine'
import type { DirectionId, FooterStyleId, HeroId, KitPlan, NavStyleId, PieceId, PurposeId, RecipeSpec, SectionId } from '@/types/domain'

/** A site is `example:{slug}` (built, real) or `seed:{slug}` (a recipe drawn by the engine) — the kit's own `from` ids. */
export type SiteRef = `example:${string}` | `seed:${string}`
export type CollectionItem =
  | { kind: 'site'; site: SiteRef }
  | { kind: 'section'; id: SectionId; variant?: string; from?: SiteRef }
  | { kind: 'hero'; id: HeroId; from?: SiteRef }
  | { kind: 'menu'; id: NavStyleId; from?: SiteRef }
  | { kind: 'footer'; id: FooterStyleId; from?: SiteRef }
  | { kind: 'effect'; id: PieceId; from?: SiteRef }

export type Collection = { items: CollectionItem[]; purpose?: PurposeId; name?: string; about?: string; look?: SiteRef }
export const EMPTY_COLLECTION: Collection = { items: [] }

/** Two items are the same thing when they would add the same thing (where it was seen doesn't matter). */
export const itemKey = (i: CollectionItem) => (i.kind === 'site' ? `site:${i.site}` : i.kind === 'section' ? `section:${i.id}:${i.variant ?? ''}` : `${i.kind}:${i.id}`)
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
/** Real sites that use a ready section — so a part's card can say where it lives. */
export const sitesWith = (id: SectionId): SiteRef[] => allSites.filter((r) => r.startsWith('example:') && siteSpec(r)?.pages.some((p) => p.sections.includes(id)))

// ─── Names, for cards, notes and the Collection page ────────────────────────

export function itemName(i: CollectionItem): string {
  switch (i.kind) {
    case 'site': return siteName(i.site)
    case 'section': { const v = i.variant && sectionVariants[i.id]?.options.find((o) => o.id === i.variant); return v ? `${sections[i.id].name} · ${v.name}` : sections[i.id].name }
    case 'hero': return EFFECTS.find((e) => e.hero === i.id)?.name ?? i.id
    case 'menu': return `Menu · ${navStyles[i.id].name}`
    case 'footer': return `Footer · ${footerStyles[i.id].name}`
    case 'effect': return pieces[i.id].name
  }
}

// ─── Quiet notes: rules that suggest, never block ───────────────────────────

export type Note = { keys: string[]; text: string }

export function notes(c: Collection): Note[] {
  const out: Note[] = []
  const of = <K extends CollectionItem['kind']>(k: K) => c.items.filter((i): i is Extract<CollectionItem, { kind: K }> => i.kind === k)
  const sites = of('site')
  if (sites.length > 1) out.push({ keys: sites.map(itemKey), text: `${sites.length} sites: one is the start — you pick it on Pages. From the others, take single parts with + on their page.` })
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
  blog: 'news-grid', event: 'cinematic-editorial', nonprofit: 'soft-pastel', 'real-estate': 'scandinavian-minimal', hotel: 'coastal-calm', course: 'organic-modern', clinic: 'japanese-minimal',
}
export const lookFor = (purpose?: PurposeId): DirectionId | undefined => (purpose ? LOOK_FOR[purpose] : undefined)

/** The plan the shelves are drawn in: the start site's look, else the kind of site's, so every card shows what you'd get. */
export function previewPlan(c: Collection): KitPlan {
  const s = startSite(c), spec = s && siteSpec(s)
  if (spec) return { ...specToPlan(spec), name: c.name }
  const d = lookFor(c.purpose)
  return { pages: [], purpose: c.purpose, name: c.name, ...(d ? { direction: d } : {}) }
}

// ─── Collection → plan (Compose) ────────────────────────────────────────────

const NOT_SWAPPED = new Set<SectionId>(['contact-cta', 'cta-band', 'donate']) // three different jobs (see sectionGroups)
const jobIds = (id: SectionId) => sectionGroups.find((g) => g.ids.includes(id))?.ids ?? [id]

export type Composed = { plan: KitPlan; picked: number; unplaced: PieceId[] }

/** Builds the kit plan: the start site (or the kind of site's usual pages), then every part and effect where it fits.
 *  A part replaces the same job's default part on its page (never one the person collected), else joins the page. */
export function collectionToPlan(c: Collection): Composed {
  const s = startSite(c), spec = s && siteSpec(s)
  const purpose = c.purpose ?? spec?.purpose
  let plan: KitPlan = spec ? { ...specToPlan(spec), fromId: undefined } : start(lookFor(purpose) ? setStyle(EMPTY_PLAN, 'direction', lookFor(purpose)) : EMPTY_PLAN, purpose ?? null)
  plan = { ...plan, purpose: purpose ?? plan.purpose, name: c.name?.trim() || undefined, about: c.about?.trim() || undefined }
  const collected = new Set<string>() // section instance keys that came from the Collection
  let picked = 0
  const unplaced: PieceId[] = []

  const once = new Set<string>() // a site has one first screen, menu and footer: the first collected is used
  for (const i of c.items) {
    if (i.kind === 'site') continue
    picked++
    if (i.kind === 'hero' || i.kind === 'menu' || i.kind === 'footer') {
      if (once.has(i.kind)) continue
      once.add(i.kind)
      plan = i.kind === 'hero' ? setHero(plan, i.id) : setStyle(plan, i.kind === 'menu' ? 'nav' : 'footer', i.id)
      continue
    }
    if (i.kind === 'section') {
      // The page it belongs on: one that has it, else one with a part doing its job, else one that usually has it, else the first.
      const job = jobIds(i.id)
      const page = plan.pages.find((p) => p.sections.some((x) => x.id === i.id))
        ?? (NOT_SWAPPED.has(i.id) ? undefined : plan.pages.find((p) => p.sections.some((x) => job.includes(x.id))))
        ?? plan.pages.find((p) => pageSuggestions[p.type]?.includes(i.id)) ?? plan.pages[0]
      if (!page) continue
      let k = page.sections.find((x) => x.id === i.id && !collected.has(x.key))?.key
      if (!k && !NOT_SWAPPED.has(i.id)) {
        const same = page.sections.find((x) => job.includes(x.id) && !NOT_SWAPPED.has(x.id) && !collected.has(x.key))
        if (same) { plan = replaceSection(plan, page.id, same.key, i.id); k = same.key }
      }
      if (!k) {
        const before = new Set(page.sections.map((x) => x.key))
        plan = addSuggested(plan, page.id, i.id)
        k = plan.pages.find((p) => p.id === page.id)!.sections.find((x) => !before.has(x.key))?.key
      }
      if (k) { collected.add(k); if (i.variant) plan = setSectionVariant(plan, page.id, k, i.variant) }
      continue
    }
    // Effects: a behaviour or a whole-site extra is site-wide; a moment goes on the first part that can carry it.
    const id = i.id, b = behaviourOf(id)
    if (b && !behaviours[b].many) { plan = setBehaviour(plan, b, id); continue }
    if (b || pieces[id].slot === 'site' || onChrome(id)) { if (!(plan.sitePieces ?? []).includes(id)) plan = toggleSitePiece(plan, id); continue }
    const host = plan.pages.flatMap((p) => p.sections.map((x) => ({ p, x }))).find(({ x }) => x.pieces.includes(id) || piecesFor(x).includes(id))
    if (!host) { unplaced.push(id); continue }
    if (!host.x.pieces.includes(id)) plan = togglePiece(plan, host.p.id, host.x.key, id)
  }
  return { plan, picked, unplaced }
}

/** Where the Collection went: what is on the pages, and what waits (a second site, a moment no part can carry, a part
 *  the owner removed). Pages says so, so nothing collected disappears without a word. */
export function placement(plan: KitPlan, c: Collection): { placed: CollectionItem[]; waiting: CollectionItem[] } {
  const start = startSite(c), parts = plan.pages.flatMap((p) => p.sections)
  const on = (i: CollectionItem) => {
    switch (i.kind) {
      case 'site': return i.site === start
      case 'section': return parts.some((x) => x.id === i.id && (!i.variant || x.variant === i.variant))
      case 'hero': return plan.hero === i.id || parts.some((x) => x.hero === i.id)
      case 'menu': return plan.nav === i.id
      case 'footer': return plan.footer === i.id
      case 'effect': return effectOn(plan, i.id)
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
  }
}
