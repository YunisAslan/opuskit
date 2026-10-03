// Scene map of the page film (public/media/scrubReadyEncode.mp4, 25.4 s, one continuous shot): a figure walks from
// the dark of a tunnel toward an arch of warm light, getting smaller as he nears it.
// `at` is the moment in the film (fraction of its length) each Home stop is pinned to: ScrollFilm measures where each
// film window sits on the page and bends the scroll → time mapping so that moment is on screen while the window is.
// One message per scene, about what is on screen; it arrives as its window opens, holds, and leaves before the next.
export type Scene = {
  id: string
  at: number
  film: string
  lines: [string, string]
  card: { name: string; text: string; link: { label: string; href: string } }
}

export const scenes: Scene[] = [
  {
    id: 'programme', at: 0.24, film: 'He is a few steps in; the arch is still far away.',
    lines: ['One film a night,', 'scored in the room.'],
    card: { name: 'The programme', text: 'Three nights. Doors at 19:00, the film at 20:30.', link: { label: 'Hold a seat', href: '/rsvp' } },
  },
  {
    id: 'players', at: 0.5, film: 'Halfway: the silhouette is small against the trees outside.',
    lines: ['Four players', 'beneath the screen.'],
    card: { name: 'The players', text: 'Each score is written for this hangar and played once.', link: { label: 'Who plays when', href: '#players' } },
  },
  {
    id: 'hangar', at: 0.74, film: 'Close to the arch now; the trees outside come into focus.',
    lines: ['The light at the end', 'is the coast.'],
    card: { name: 'The hangar', text: '40 minutes east of Baku, with a free shuttle from 28 May metro.', link: { label: 'Getting here', href: '/venue-and-travel#getting-here' } },
  },
  {
    id: 'way-in', at: 0.97, film: 'He stands at the threshold, about to step out.',
    lines: ['Step out', 'into the light.'],
    card: { name: 'The way in', text: 'Entry is free with an RSVP. 220 seats a night.', link: { label: 'RSVP', href: '#rsvp' } },
  },
]
