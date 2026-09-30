// Scene map for the hero film (ulooklonely.mp4, 19.77s, cut every ~0.7s).
// Scenes group the cuts by what is on screen; start/end are fractions of the timeline.
// One message per scene: it arrives as the scene begins, holds, and leaves before the next one.
export type Scene = { id: string; start: number; end: number; lines: string[]; shows: string }

export const FILM_DURATION = 19.766

export const scenes: Scene[] = [
  // 0.00–4.17s: snow on a fur collar, then a dark street with one red sign.
  { id: 'snow', start: 0, end: 0.211, lines: ['You look', 'lonely.'], shows: 'Snow, one man, a dark street' },
  // 4.17–6.10s: a packed neon bar, one lit window, a woman in an advert.
  { id: 'street', start: 0.211, end: 0.309, lines: ['A full street.', 'An empty window.'], shows: 'Crowd, window, advert' },
  // 6.10–10.07s: orange desert walk, a face in the haze, a violet hologram, grey snow from above.
  { id: 'heat', start: 0.309, end: 0.509, lines: ['Heat, neon,', 'and still no one.'], shows: 'Desert, hologram, snow from above' },
  // 10.07–15.40s: an open hand, hands on a head, an empty stage, a face on a screen, the car on the sand.
  { id: 'light', start: 0.509, end: 0.779, lines: ['Faces made of light,', 'never of skin.'], shows: 'Hands, stage, screen, car' },
  // 15.40–19.77s: darkness, a cigarette, two figures, a crowd, and a smile in a white room.
  { id: 'stay', start: 0.779, end: 1, lines: ['Stay a while.'], shows: 'Cigarette, crowd, white room' },
]
