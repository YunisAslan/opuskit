// The real site closest to what the kit has picked, so a few seconds of it can show "a site like this"
// (docs/plan-examples.md §1). Pure: the kit and scripts/check.ts both call it.
import exampleSpecs from '@/data/example-specs.generated.json'
import { examples, type ExampleProject } from '@/data/examples'
import { directions } from '@/data/taxonomy'
import { composeRecipe, recommendedFooter, recommendedNav, resolveHero } from '@/features/recipes/engine'
import { concepts } from '@/data/patterns'
import type { ConceptId, HeroId, MotionLevel, PieceId, RecipeSpec, SectionId } from '@/types/domain'

const HERO_GROUP: Record<HeroId, string> = {
  'ambient-video': 'film', 'scroll-video': 'film', 'scroll-video-page': 'film',
  'editorial-image': 'photo', 'parallax-photo': 'photo',
  'type-statement': 'type', 'kinetic-type': 'type',
  'product-stage': 'object', 'webgl-scene': 'object',
  illustrated: 'illustration', 'orbit-stickers': 'illustration',
}
const MOTION_GROUP: Record<MotionLevel, string> = { still: 'calm', subtle: 'calm', dynamic: 'lively', immersive: 'immersive' }

type Fit = Pick<RecipeSpec, 'direction' | 'lead' | 'motion' | 'hero'>
type ChromeFit = Fit & Pick<RecipeSpec, 'purpose' | 'nav' | 'footer'>
export type Match = { example: ExampleProject; clip: string; score: number }

const specs = exampleSpecs as unknown as Record<string, RecipeSpec>
const tags = (s: Fit) => ({ hero: HERO_GROUP[resolveHero(s).id], motion: MOTION_GROUP[s.motion], family: directions[s.direction].families[0], look: s.direction })
// The very same look breaks a tie between two sites of one feel.
const same = (a: ReturnType<typeof tags>, b: ReturnType<typeof tags>) => (a.motion === b.motion ? 2 : 0) + (a.family === b.family ? 1 : 0) + (a.look === b.look ? 0.5 : 0)
// The old examples are never offered (§2, §9); a new one counts once its recipe has been recovered.
const pool = () => examples.filter((e) => !e.legacy && specs[e.slug])

function best(spec: Fit, clipOf: (e: ExampleProject) => string | undefined, score: (a: ReturnType<typeof tags>, b: ReturnType<typeof tags>) => number, min: number): Match | undefined {
  const want = tags(spec)
  return pool()
    .map((e) => ({ example: e, clip: clipOf(e), score: score(want, tags(specs[e.slug])) }))
    .filter((m): m is Match => !!m.clip && m.score >= min)
    .sort((a, b) => b.score - a.score)[0]
}

/** Whole site: first-screen group 3 + movement 2 + feel 1. Below 5 (first screen and movement both alike) shows nothing. */
export const closestSite = (spec: Fit) =>
  best(spec, (e) => e.clip, (a, b) => (a.hero === b.hero ? 3 : 0) + (a.motion === b.motion ? 2 : 0) + (a.family === b.family ? 1 : 0), 5)

/** One part: the same ready section on a real site, moving the same way (movement 2 + feel 1). */
export const closestSection = (spec: Fit, section: SectionId) =>
  best(spec, (e) => e.sectionClips?.[section], same, 2)

// The kit's own defaults for a menu and footer nobody picked (same as PagesStep).
const styleOf = (s: ChromeFit, part: 'navbar' | 'footer') =>
  part === 'navbar' ? s.nav ?? recommendedNav({ purpose: s.purpose, direction: s.direction }) : s.footer ?? recommendedFooter(s)

/** Menu or footer: only the same style counts — a floating dock and a classic bar behave nothing alike; any site with it will do. */
export const closestChrome = (spec: ChromeFit, part: 'navbar' | 'footer') =>
  best(spec, (e) => (styleOf(specs[e.slug], part) === styleOf(spec, part) ? e.sectionClips?.[part] : undefined), same, 0)

// An effect is the same code on every site, so any real site that uses it will do; the closest feel comes first.


/** One piece (a behaviour or a moment) on a real site. */
export const closestPiece = (spec: Fit, piece: PieceId) => best(spec, (e) => e.pieceClips?.[piece], same, 0)

/** A big idea: a real site built around the same one — one of its signature moments, else the whole site. */
export const closestConcept = (spec: Fit, concept: ConceptId) =>
  best(spec, (e) => (specs[e.slug].concept === concept ? concepts[concept].signatures.map((s) => e.signatureClips?.[s]).find(Boolean) ?? e.clip : undefined), same, 0)

/** A look: a real site in that very look (`exactLook`), else the closest site. */
export const exactLook = (spec: Fit) => best(spec, (e) => (specs[e.slug].direction === spec.direction ? e.clip : undefined), same, 0)
export const closestLook = (spec: Fit) => exactLook(spec) ?? closestSite(spec)

// Option tiles show any real site that has the very thing — the reader is browsing, not matching their whole site.
/** A ready section on any real site, the closest feel first. */
export const anySection = (spec: Fit, section: SectionId) => best(spec, (e) => e.sectionClips?.[section], same, 0)
/** A real site built with this very design of a section — Pages shows it as proof of where the design can go, never as
 *  the owner's site. A design with no clip on any site shows nothing. */
const designs = new Map<string, Set<string>>()
const designsOn = (slug: string) => {
  if (!designs.has(slug)) designs.set(slug, new Set(composeRecipe(specs[slug]).pages.flatMap((p) => p.sections.map((s) => `${s.id}:${s.variant?.id ?? ''}`))))
  return designs.get(slug)!
}
export const sectionDesign = (spec: Fit, section: SectionId, variant?: string) =>
  best(spec, (e) => (designsOn(e.slug).has(`${section}:${variant ?? ''}`) ? e.sectionClips?.[section] : undefined), same, 0)
/** A first screen: a real site that opens with that very one. */
export const heroSite = (spec: Fit, hero: HeroId) => best(spec, (e) => (specs[e.slug].hero === hero ? e.clip : undefined), same, 0)
