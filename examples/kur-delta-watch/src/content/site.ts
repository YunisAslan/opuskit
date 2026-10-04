import type { AssetKey } from '@/config/assets'

export const contact = {
  email: 'hello@kurdeltawatch.az',
  phone: '+994 21 274 30 18',
  address: 'Kür Delta Watch\nBoat shed 3, Liman street\nNeftchala AZ1700, Azerbaijan',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Neftchala%2C%20Azerbaijan',
}

// The menu: a compact bar that opens into one card per part of the site.
export const menuCards: { title: string; href: string; image: AssetKey; links: { label: string; href: string }[] }[] = [
  { title: 'The river', href: '/the-river', image: 'delta2', links: [
    { label: 'Who we are', href: '/the-river#who' },
    { label: 'The delta’s story', href: '/the-river#story' },
    { label: 'The people', href: '/the-river#team' },
  ] },
  { title: 'What we do', href: '/what-we-do', image: 'cleanup2', links: [
    { label: 'Our work', href: '/what-we-do#work' },
    { label: 'A cleanup Saturday', href: '/what-we-do#saturday' },
    { label: 'Volunteer', href: '/contact#message' },
  ] },
  { title: 'Field notes', href: '/field-notes', image: 'heron1', links: [
    { label: 'In their words', href: '/field-notes#voices' },
    { label: 'The water test', href: '/field-notes#water' },
    { label: 'Photo story', href: '/field-notes#photos' },
  ] },
  { title: 'Donate', href: '/donate', image: 'boat1', links: [
    { label: 'Give once or monthly', href: '/donate#give' },
    { label: 'Where it goes', href: '/donate#where' },
    { label: 'Contact', href: '/contact' },
  ] },
]

export const pages = [
  { label: 'Home', href: '/' },
  { label: 'The river', href: '/the-river' },
  { label: 'What we do', href: '/what-we-do' },
  { label: 'Field notes', href: '/field-notes' },
  { label: 'Donate', href: '/donate' },
  { label: 'Contact', href: '/contact' },
]

export type Post = { slug: string; title: string; date: string; iso: string; category: string; image: AssetKey; caption: string; body: string[] }

export const posts: Post[] = [
  {
    slug: 'september-water-test',
    title: 'September water test: oxygen up, nitrates steady',
    date: '28 September 2026', iso: '2026-09-28', category: 'Water test', image: 'waterTest',
    caption: 'Sampling point 4, the north channel by the old ferry landing.',
    body: [
      'Nigar and two volunteers took the six September samples on the first Sunday of the month, between seven and nine in the morning, as always. The lab in Baku sent the results back on Thursday.',
      'Dissolved oxygen averaged 7.4 mg/l across the six points, up from 6.9 in August. That is the usual autumn rise as the water cools, and it is the best September figure since we started testing in 2020.',
      'Nitrates held at 2.1 mg/l, much the same as the last three months. Oil products stayed under the lab’s detection limit at five points; at point 6, below the fish-processing yard, they were just above it again (0.06 mg/l). We have sent the figure to the district environment office, as we did in June.',
      'The full table, with every month since January 2020, is in the logbook. Write to us and we will send it as a spreadsheet.',
    ],
  },
  {
    slug: 'pelicans-north-channel',
    title: 'Forty-one pelicans on the north channel',
    date: '14 September 2026', iso: '2026-09-14', category: 'Birds', image: 'pelicans',
    caption: 'White pelicans on the north channel, below the reed wall.',
    body: [
      'The autumn bird count went out on two boats on Sunday, on the same route as every count since 2020: up the north channel to the old fish ponds and back along the sea edge.',
      'We counted 41 pelicans in one loose group below the reeds: 37 white and four Dalmatian. In our first count, in September 2020, there were nine. Gulnara, who has watched birds here since the 1980s, says she has not seen a group that size on this channel in twenty years.',
      'We are careful with what that means. One good count is not a trend, and the birds follow fish, not us. But the reeds on that stretch were thick with bags and floats in 2020, and they are clean now, and the birds are there.',
      'The full list, 63 species this time, is in the logbook.',
    ],
  },
  {
    slug: 'south-bank-saturday',
    title: 'South bank, last Saturday: 3.4 tonnes and a fridge',
    date: '30 August 2026', iso: '2026-08-30', category: 'Cleanup', image: 'cleanup3',
    caption: 'Masks and bottles caught where the current slows, south bank.',
    body: [
      'Fifty-two people signed in at the boat shed on Saturday, including a class of fifteen from School No. 2 and their geography teacher.',
      'We worked the south bank from the bridge to the pumping station, about 1.6 km, where the current slows and the rubbish settles in the reeds. Most of it was what it always is: bottles, bags, food packaging and the floats from fishing nets. One boat crew found a fridge half buried in the mud at the bend and needed four people and an hour to get it out.',
      'Everything was weighed on the bank before it went in the skip: 3.4 tonnes, the biggest single day this year. That takes the total since October 2019 to 2,131 tonnes. We expect to pass 2,140 before the end of September.',
      'Thank you to everyone who came, and to the municipality for the truck.',
    ],
  },
]
