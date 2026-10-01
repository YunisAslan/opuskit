// Asset reference layer. Components never hardcode media paths — they ask for a key.
// Every file below is the owner's own photo (sources in media-src/SOURCES.md), already optimised into public/media/.
// Replacing one = replacing the file at that path or editing one line here.
export const assets = {
  work1: { src: '/media/work-1.jpg', alt: 'Two kraft menu covers, one printed FOOD and one MENU', status: 'have', usage: 'Bulvar 14 menus' },
  work2: { src: '/media/work-2.jpg', alt: 'A row of posters behind glass with a man walking past', status: 'have', usage: 'Neft Noise posters' },
  work3: { src: '/media/work-3.jpg', alt: 'A plain kraft coffee bag on a white table', status: 'have', usage: 'Qara Roasters packaging' },
  work4: { src: '/media/work-4.jpg', alt: 'A white cassette with its tape pulled out in loops, on an orange ground', status: 'have', usage: 'Mugham Tapes identity' },
  work5: { src: '/media/work-5.jpg', alt: 'A dark wayfinding sign with an arrow painted on concrete', status: 'have', usage: 'Depo 1905 wayfinding' },
  work6: { src: '/media/work-6.jpg', alt: 'Loaves of bread in a paper bag', status: 'have', usage: 'Tandir & Sons bakery' },
  studio: { src: '/media/studio.jpg', alt: 'Hand lettering in pencil on tracing paper', status: 'have', usage: 'About page' },
  team1: { src: '/media/team-1.jpg', alt: 'Portrait of Leyla Mammadova', status: 'have', usage: 'Team' },
  team2: { src: '/media/team-2.jpg', alt: 'Black and white portrait of Rauf Guliyev', status: 'have', usage: 'Team' },
  team3: { src: '/media/team-3.jpg', alt: 'Portrait of Nigar Hasanova', status: 'have', usage: 'Team' },
} as const

export type AssetKey = keyof typeof assets
