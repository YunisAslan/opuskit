// Scene map for the whole-page scroll film (scrubReadyEncode / mobileVideoEncode, 23s).
// start/end are fractions of the video timeline, which is mapped 1:1 to total page scroll on Home.
// Measured from the footage (scene cuts at 2.6s, 5.2s, 8.6s, 11.4s, 14.8s, 17.5s).
export type SceneTransition = 'lines' | 'wipe' | 'rise' | 'tracking' | 'scale'

export type Scene = {
  id: string
  start: number
  end: number
  onScreen: string
  title?: string[] // one entry per line, broken by hand
  body?: string
  transition?: SceneTransition
}

export const FILM_DURATION = 23

export const scenes: Scene[] = [
  // Scene 1 is the Hero itself (h1 in the page); scene 7 is the Intro section.
  { id: 'beans', start: 0, end: 0.113, onScreen: 'Roasted beans falling through the frame' },
  { id: 'grinder', start: 0.113, end: 0.226, onScreen: 'Beans tumbling into the grinder', title: ['Ground fresh', 'for every cup'], body: 'We grind to order, never ahead. It takes a minute longer, and you can taste it.', transition: 'lines' },
  { id: 'grounds', start: 0.226, end: 0.374, onScreen: 'Water drops onto fresh grounds', title: ['Hot water,', 'slow bloom'], body: 'The grounds rest for thirty seconds before the pour, so the coffee opens up.', transition: 'wipe' },
  { id: 'milk', start: 0.374, end: 0.496, onScreen: 'Cold milk pouring and splashing', title: ['Milk, steamed', 'to silk'], body: 'Cold milk, textured by hand into a fine, glossy foam. Oat and almond too.', transition: 'rise' },
  { id: 'espresso', start: 0.496, end: 0.643, onScreen: 'Espresso dripping from the portafilter', title: ['A short,', 'honest shot'], body: 'Twenty-five seconds from the first drop. Sweet at the start, bright at the end.', transition: 'tracking' },
  { id: 'pour', start: 0.643, end: 0.761, onScreen: 'Espresso poured into milk foam', title: ['Poured together,', 'slowly'], body: 'Espresso meets milk in one steady line. No rush at the bar.', transition: 'scale' },
  { id: 'crema', start: 0.761, end: 1, onScreen: 'Crema swirling on the surface of the cup' },
]
