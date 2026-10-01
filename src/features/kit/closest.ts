// The real site closest to what the kit has picked, so a few seconds of it can show "a site like this"
// (docs/plan-for-fit.md §4, §8). Pure: the kit and scripts/check.ts both call it.
import exampleSpecs from '@/data/example-specs.generated.json'
import { examples, type ExampleProject } from '@/data/examples'
import { directions } from '@/data/taxonomy'
import { recommendedNav, resolveHero } from '@/features/recipes/engine'
import type { HeroId, MotionLevel, RecipeSpec, SectionId } from '@/types/domain'

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
const tags = (s: Fit) => ({ hero: HERO_GROUP[resolveHero(s).id], motion: MOTION_GROUP[s.motion], family: directions[s.direction].families[0] })
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
  best(spec, (e) => e.sectionClips?.[section], (a, b) => (a.motion === b.motion ? 2 : 0) + (a.family === b.family ? 1 : 0), 2)

// The kit's own defaults for a menu and footer nobody picked (same as PagesStep).
const styleOf = (s: ChromeFit, part: 'navbar' | 'footer') =>
  part === 'navbar' ? s.nav ?? recommendedNav({ purpose: s.purpose, direction: s.direction }) : s.footer ?? 'signature'

/** Menu or footer: only the same style counts — a floating dock and a classic bar behave nothing alike. Then as a part. */
export const closestChrome = (spec: ChromeFit, part: 'navbar' | 'footer') =>
  best(spec, (e) => (styleOf(specs[e.slug], part) === styleOf(spec, part) ? e.sectionClips?.[part] : undefined), (a, b) => (a.motion === b.motion ? 2 : 0) + (a.family === b.family ? 1 : 0), 2)
