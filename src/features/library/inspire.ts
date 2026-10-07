// Inspiration, not imitation (docs/plan-library.md decision 35). What a site is — its kind, pages, words — comes only
// from its owner (their sentence, or the kind they pick). What they liked in other sites comes in as qualities: a site's
// whole look, or just its colours, lettering, first screen or movement. `directionsFor` mixes those qualities into three
// directions for the owner's own site, and no direction takes more than two of look, colours, lettering and first screen
// from one site, so none is a copy of what inspired it. Pure, so check.ts tests it.

import { directions, families, purposes } from '@/data/taxonomy'
import { EMPTY_PLAN, planToSpec, setHero, setStyle, specToPlan, start } from '@/features/kit/plan'
import { resolveHero } from '@/features/recipes/engine'
import type { DirectionId, GoalId, HeroId, KitPlan, MotionLevel, PaletteId, PurposeId, RecipeSpec, TypographyId } from '@/types/domain'
import { allSites, applyItems, lookFor, siteName, siteSpec, type Collection, type SiteRef } from './collection'

// ─── Qualities ──────────────────────────────────────────────────────────────

/** What can be liked in a site, beside the site's whole look. */
export const TRAITS = {
  colours: { name: 'Colours', line: 'Its palette' },
  lettering: { name: 'Lettering', line: 'Its typefaces' },
  opening: { name: 'First screen', line: 'How it opens' },
  motion: { name: 'Movement', line: 'How much it moves' },
} as const
export type Trait = keyof typeof TRAITS
export const TRAIT_IDS = Object.keys(TRAITS) as Trait[]

/** A site's own value for each quality, as its recipe builds it. */
export type SiteTraits = { direction: DirectionId; palette: PaletteId; typography: TypographyId; hero: HeroId; motion: MotionLevel; spec: RecipeSpec }
const traitsOf = new Map<SiteRef, SiteTraits>()
export function siteTraits(ref: SiteRef): SiteTraits | undefined {
  if (traitsOf.has(ref)) return traitsOf.get(ref)
  const spec = siteSpec(ref)
  if (!spec) return undefined
  const full = planToSpec(specToPlan(spec))
  const t: SiteTraits = { direction: spec.direction, palette: full.palette, typography: spec.typography ?? directions[spec.direction].defaults.typography, hero: resolveHero(spec).id, motion: full.motion, spec }
  traitsOf.set(ref, t)
  return t
}

// ─── The kind of site, read from the owner's own words ──────────────────────

// Words people use about what they do → the kind of site. The first match by weight wins; the owner sees it and can pick another.
const WORDS: [PurposeId, RegExp][] = [
  ['restaurant', /\b(restaurant|caf[eé]|coffee|bakery|bistro|bar|kitchen|dining|eatery|pizzeria|brewery|wine bar)\b/i],
  ['hotel', /\b(hotel|guest ?house|inn|b&b|lodge|cabins?|rooms to stay|retreat|hostel)\b/i],
  ['spa', /\b(spa|sauna|bath ?house|massage|wellness|hammam)\b/i],
  ['clinic', /\b(clinic|therap(y|ist)|dentist|dental|doctor|physio|counsell?ing|psycholog)/i],
  ['fashion', /\b(clothing|clothes|fashion|apparel|garments|jewell?ery|accessories|label)\b/i],
  ['ecommerce', /\b(shop|store|sell|selling|online|products?|handmade|ceramics?|pottery|tableware|candles?|prints|goods|homeware|order)\b/i],
  ['product', /\b(device|gadget|keyboard|speaker|hardware|app for|one product)\b/i],
  ['saas', /\b(software|saas|platform|app|tool for|dashboard|api)\b/i],
  ['course', /\b(course|classes|lessons|workshops?|teach(ing)?|school|tutor)\b/i],
  ['event', /\b(festival|wedding|conference|event|gig|concert|exhibition)\b/i],
  ['nonprofit', /\b(charity|non-?profit|foundation|volunteers?|donat|cause)\b/i],
  ['real-estate', /\b(real estate|property|properties|apartments|homes for sale|lettings)\b/i],
  ['blog', /\b(blog|magazine|journal|newsletter|writing|essays)\b/i],
  ['agency', /\b(agency|marketing|branding|we help (brands|companies))\b/i],
  ['studio', /\b(architect(ure)?|interior|design studio|studio)\b/i],
  ['portfolio', /\b(portfolio|photographer|illustrator|designer|artist|my work)\b/i],
  ['personal-brand', /\b(coach|consultant|speaker|author|freelance)\b/i],
]
export function purposeFrom(text?: string): PurposeId | undefined {
  if (!text?.trim()) return undefined
  const hits = WORDS.map(([p, re]) => [p, (text.match(new RegExp(re.source, 'gi')) ?? []).length] as const).filter(([, n]) => n > 0)
  // More matches win; on a tie the earlier, more specific kind (a ceramics studio that sells is a shop, not an architect).
  return hits.sort((a, b) => b[1] - a[1])[0]?.[0]
}

// ─── What the owner offers, and what visitors should do (You, decision 38) ──

/** Six plain answers to "what do you offer?" instead of eighteen kinds of site. Each holds the kinds it covers (the
 *  first is its default); the owner's sentence picks the closer one inside it, and they can name it exactly. */
export const OFFERS = {
  work: { name: 'My work', line: 'Projects, design, photos, art', kinds: ['portfolio', 'studio', 'agency', 'personal-brand', 'experiment'], goals: ['contact', 'explore', 'call'] },
  service: { name: 'A service', line: 'Care, advice, sessions, help', kinds: ['personal-brand', 'clinic', 'spa', 'agency', 'real-estate'], goals: ['book', 'contact', 'call'] },
  things: { name: 'Things to buy', line: 'A shop, one product, clothing', kinds: ['ecommerce', 'product', 'fashion'], goals: ['buy', 'visit', 'subscribe'] },
  place: { name: 'A place or an event', line: 'Food, rooms, a venue, a night', kinds: ['restaurant', 'hotel', 'spa', 'event'], goals: ['book', 'visit', 'call'] },
  online: { name: 'Something online', line: 'An app, a tool, a course', kinds: ['saas', 'course'], goals: ['signup', 'apply', 'download', 'subscribe'] },
  words: { name: 'Words or a cause', line: 'Writing, news, a cause', kinds: ['blog', 'nonprofit'], goals: ['subscribe', 'donate', 'explore'] },
} as const satisfies Record<string, { name: string; line: string; kinds: readonly PurposeId[]; goals: readonly GoalId[] }>
export type OfferId = keyof typeof OFFERS
export const OFFER_IDS = Object.keys(OFFERS) as OfferId[]
/** The offer a kind of site sits in (its first). */
export const offerOf = (p?: PurposeId): OfferId | undefined => (p ? OFFER_IDS.find((o) => (OFFERS[o].kinds as readonly PurposeId[]).includes(p)) : undefined)
/** The kind of site for an offer: the one the sentence names, if it is in this offer, else the offer's first. */
export const kindFor = (o: OfferId, text?: string): PurposeId => { const g = purposeFrom(text); return g && (OFFERS[o].kinds as readonly PurposeId[]).includes(g) ? g : OFFERS[o].kinds[0] }

// ─── Three directions ───────────────────────────────────────────────────────

export type Took = { what: 'look' | Trait; site?: SiteRef }
export type Direction = { plan: KitPlan; took: Took[] }

const CORE = 2 // the most of look, colours, lettering and first screen one site may give one direction

/** Three directions for the owner's site: their kind's pages and their words, in mixes of what they liked. Each leads
 *  with a different look (a liked site's, else close relatives, else the looks OpusKit's sites of their kind use); each
 *  quality comes from a liked site or the look's own, rotating so the three differ; picked parts and effects join all. */
export function directionsFor(c: Collection): Direction[] {
  const purpose = c.purpose
  const liked = (what: Trait) => c.items.flatMap((i) => (i.kind === 'like' && i.what === what ? [i.site] : []))
  const whole = c.items.flatMap((i) => (i.kind === 'site' ? [i.site] : []))
  // A quality asked for by name comes before one that rides along with a whole look.
  const sources = (what: Trait) => [...new Set([...liked(what), ...whole])].filter((r) => siteTraits(r))
  // The looks to lead with: liked sites' looks, then their relatives, then looks of the owner's kind, then the kind's default.
  const leads: { d: DirectionId; site?: SiteRef }[] = []
  const lead = (d: DirectionId, site?: SiteRef) => { if (!leads.some((x) => x.d === d)) leads.push({ d, site }) }
  for (const r of whole) lead(siteTraits(r)!.direction, r)
  for (const x of [...leads]) for (const f of directions[x.d].families) for (const d of families[f].directions) lead(d as DirectionId)
  for (const r of allSites) { const t = siteTraits(r); if (t && t.spec.purpose === purpose) lead(t.direction) }
  const own = lookFor(purpose) ?? 'scandinavian-minimal'
  lead(own)
  for (const d of Object.keys(directions) as DirectionId[]) lead(d)

  return leads.slice(0, 3).map(({ d, site }, i) => {
    let plan = start(setStyle(EMPTY_PLAN, 'direction', d), purpose ?? null)
    plan = { ...plan, name: c.name?.trim() || undefined, about: c.about?.trim() || undefined, ...(c.goal ? { goal: c.goal } : {}) }
    const gave = new Map<SiteRef, number>()
    const give = (r: SiteRef) => gave.set(r, (gave.get(r) ?? 0) + 1)
    const took: Took[] = [{ what: 'look', site }]
    if (site) {
      // A liked look comes with that site's corners, menu and footer.
      const s = siteTraits(site)!.spec
      for (const k of ['shape', 'nav', 'footer', 'rotation'] as const) if (s[k]) plan = setStyle(plan, k, s[k] as string)
      give(site)
    }
    TRAIT_IDS.forEach((what, n) => {
      const xs = sources(what)
      // Rotate through the liked sites and the look's own (index xs.length), so three directions differ.
      const order = [...xs.keys(), xs.length].map((_, k) => (i + n + k) % (xs.length + 1))
      const k = order.find((k) => k === xs.length || what === 'motion' || (gave.get(xs[k]) ?? 0) < CORE)
      const pick = k === undefined || k === xs.length ? undefined : xs[k]
      if (!pick) {
        // The look's own — but never by chance the very colours or lettering of a site that inspired it.
        const seen = new Set(xs.map((r) => (what === 'colours' ? siteTraits(r)!.palette : siteTraits(r)!.typography) as string))
        if (what === 'colours') { const alt = directions[d].palettes.find((x) => !seen.has(x)); if (alt) plan = setStyle(plan, 'palette', alt) }
        if (what === 'lettering') { const alt = directions[d].typography.find((x) => !seen.has(x)); if (alt) plan = setStyle(plan, 'typography', alt) }
        took.push({ what }); return
      }
      const t = siteTraits(pick)!
      if (what === 'colours') plan = setStyle(plan, 'palette', t.palette)
      if (what === 'lettering') plan = setStyle(plan, 'typography', t.typography)
      if (what === 'opening') plan = setHero(plan, t.hero)
      if (what === 'motion') plan = { ...plan, motion: t.motion }
      if (what !== 'motion') give(pick)
      took.push({ what, site: pick })
    })
    plan = applyItems(plan, c.items, true).plan
    return { plan: { ...plan, via: 'studio' as const }, took }
  })
}

/** "Colours from Fennwood" — what a direction took, in words. */
export const tookLine = (t: Took) => `${t.what === 'look' ? 'Look' : TRAITS[t.what].name} ${t.site ? `from ${siteName(t.site)}` : 'chosen for you'}`
export const purposeName = (p?: PurposeId) => (p ? purposes[p].name : undefined)
