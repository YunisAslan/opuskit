// Scene map for the hero film (heroVideo.mp4, 15.09s). Cuts measured with
// ffmpeg scene detection; start/end are fractions of the timeline, which is
// mapped 1:1 to total page scroll on Home.
// Scenes 0–5 carry an overlay message in the hero. Scenes 6–7 play behind the
// Product Highlight (its chapters are the message); scene 8 plays under the
// product cards and footer. HERO_END aligns the hero/product boundary with a cut.

export const FILM_DURATION = 15.093

export type SceneFx = 'lines' | 'wipe' | 'rise' | 'track' | 'scale'

export type Scene = {
  id: string
  start: number
  end: number
  shot: string
  fx?: SceneFx
  title?: string[]
  body?: string
  meta?: string
  link?: { href: string; label: string }
}

const t = (s: number) => s / FILM_DURATION

export const scenes: Scene[] = [
  { id: 'open', start: 0, end: t(1.21), shot: 'Can with orange halves and a water splash' },
  {
    id: 'ingredients', start: t(1.21), end: t(2.25), shot: 'Lemon, coffee beans and ice in mid-air', fx: 'lines',
    title: ['Four ingredients.', 'Nothing hidden.'],
    body: 'Cold-brew arabica from Huila, Colombia. Orange and lemon peel. Sparkling water. Cane sugar, 6 g per can.',
  },
  {
    id: 'ringpull', start: t(2.25), end: t(3.9), shot: 'A hand pulls the ring on a wet can', fx: 'wipe',
    title: ['Open it at 4°C.'],
    body: 'Chilled cans hold their carbonation longer. The ring is wide enough for a gloved thumb, and the lining is BPA-free.',
  },
  {
    id: 'brew', start: t(3.9), end: t(6.21), shot: 'Amber coffee splashing into a crown', fx: 'rise',
    title: ['Steeped for 18 hours.'],
    body: 'Coarse-ground beans rest in cold water overnight, then we filter twice and carbonate. Low acidity. No burnt edge.',
  },
  {
    id: 'product', start: t(6.21), end: t(8.21), shot: 'The can floats, turning, splash behind it', fx: 'track',
    title: ['Keepers Citrus', 'Coffee Soda'],
    body: '330 ml of sparkling cold brew with orange peel. 45 mg caffeine, 35 kcal.',
    meta: '€3 a can. €32 for twelve.',
    link: { href: '/features', label: 'Product details' },
  },
  {
    id: 'can', start: t(8.21), end: t(10.17), shot: 'Label close-up, then the ring pulls again', fx: 'scale',
    title: ['Aluminium.', 'Back on the shelf in 60 days.'],
    body: 'Each can is 68% recycled aluminium and can be recycled again without loss. The roast date is printed on the base.',
  },
  { id: 'glassPour', start: t(10.17), end: t(12.42), shot: 'Poured over ice into a tumbler' },
  { id: 'glassIce', start: t(12.42), end: t(14), shot: 'Full glass, bubbles rising, cold vapour' },
  { id: 'final', start: t(14), end: 1, shot: 'The can drifts through vapour' },
]

export const HERO_END = scenes[6].start
