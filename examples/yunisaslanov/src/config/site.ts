import type { AssetKey } from './assets'

// Draft copy written in the recipe voice. Replace the email and the project/quote copy with your own (see README notes).
export const site = {
  name: 'Yunis Aslanov',
  email: 'hello@yunisaslanov.com',
  nav: [
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' },
  ],
}

export type ProjectData = {
  slug: string; title: string; kind: string; year: string; client: string; place: string; role: string
  intro: string[]; cover: AssetKey; photos: { key: AssetKey; caption: string; focus?: string }[]
}

export const projects: ProjectData[] = [
  {
    slug: 'quiet-hours', title: 'Quiet Hours', kind: 'Photo series', year: '2026', client: 'Personal', place: 'Lakes and coast', role: 'Photographs and sequencing',
    intro: ['Quiet Hours is what I see when nobody needs me for an hour. Early water, late light, places that stay still long enough to be looked at.', 'Thirty frames became six. These are the ones that still felt quiet a month later.'],
    cover: 'quietHoursCover',
    photos: [
      { key: 'quietHours1', caption: 'The pier, before anyone else, 6:40' },
      { key: 'quietHours2', caption: 'Rain stopped halfway through a roof' },
      { key: 'quietHours3', caption: 'Night, the lake not moving at all' },
      { key: 'quietHours4', caption: 'Tulips, shot through a window' },
      { key: 'quietHours5', caption: 'A jetty nobody fixed', focus: '40% 50%' },
      { key: 'quietHours6', caption: 'The loudest quiet hour' },
    ],
  },
  {
    slug: 'northbound', title: 'Northbound', kind: 'Travel journal', year: '2025', client: 'Self-published', place: 'City to summit', role: 'Photographs, layout and print',
    intro: ['One trip, read from the bottom of the map to the top. It starts in a church, climbs through glass towers and ends above the clouds.', 'Printed as a small run of folded zines, each one numbered by hand.'],
    cover: 'northboundCover',
    photos: [
      { key: 'northbound1', caption: 'Stripes, day one' },
      { key: 'northbound2', caption: 'Two towers, one sky' },
      { key: 'northbound3', caption: 'From the window seat' },
      { key: 'northbound4', caption: 'The cloud that followed us' },
      { key: 'northbound5', caption: 'Last climb before the top' },
      { key: 'northbound6', caption: 'Back down to the sea' },
    ],
  },
  {
    slug: 'paper-weather', title: 'Paper Weather', kind: 'Photo essay', year: '2024', client: 'Personal', place: 'Fields and roads', role: 'Photographs and words',
    intro: ['Weather you can almost touch: fog, wheat, a sail filling up. I kept it the way you keep a newspaper clipping, a little creased.', 'Every picture went on the wall before it went on the page.'],
    cover: 'paperWeatherCover',
    photos: [
      { key: 'paperWeather1', caption: 'Fog, holding the bridge in place' },
      { key: 'paperWeather2', caption: 'One gull, no horizon' },
      { key: 'paperWeather3', caption: 'Into the mountain' },
      { key: 'paperWeather4', caption: 'Wheat, ten minutes before dark' },
      { key: 'paperWeather5', caption: 'Wind you can see' },
      { key: 'paperWeather6', caption: 'Where the words got written' },
    ],
  },
  {
    slug: 'high-ground', title: 'High Ground', kind: 'Photo series', year: '2023', client: 'Personal', place: 'Mountains and shore', role: 'Photographs',
    intro: ['Things that stand up: a peak, a tower, a pine. A series about looking up and staying put.', 'Shot over one long year, mostly on foot.'],
    cover: 'highGroundCover',
    photos: [
      { key: 'highGround1', caption: 'A pavilion holding out against the waves' },
      { key: 'highGround2', caption: 'Looking down instead' },
      { key: 'highGround3', caption: 'Still leaning' },
      { key: 'highGround4', caption: 'The peak, at last' },
      { key: 'highGround5', caption: 'Lines somebody mowed' },
      { key: 'highGround6', caption: 'Sun through the last trees' },
    ],
  },
]
