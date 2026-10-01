import type { AssetKey } from '@/config/assets'

// All copy for the site lives here, so pages stay layout only.

export const site = {
  name: 'Slow Atlas',
  description: 'An independent magazine of long-form travel essays — one place, told slowly.',
  email: 'editors@slowatlas.com',
  issue: 'Issue 84',
  issueDate: '27 September 2026',
}

export type Essay = {
  slug: string
  title: string
  /** Desktop line breaks for the headline; each line may wrap on its own on small screens. */
  titleLines: string[]
  place: string
  category: string
  date: string
  author: string
  image: AssetKey
  caption: string
  quote: string
  paragraphs: string[]
}

// Newest first.
export const essays: Essay[] = [
  {
    slug: 'the-red-house-above-the-sound',
    title: 'The red house above the sound',
    titleLines: ['The red house', 'above the sound'],
    place: 'Nólsoy, Faroe Islands',
    category: 'Islands',
    date: '2026-09-27',
    author: 'Marit Lund',
    image: 'story',
    caption: 'The house at the top of the village path, in the one clear hour of the week. Photograph: Cassie Boca, Unsplash.',
    quote: 'If you can see the red house, you have gone too far.',
    paragraphs: [
      'There is one red house above the harbour on Nólsoy, and everyone on the island gives directions from it. Go past the red house. Stop before the red house. If you can see the red house, you have gone too far.',
      'I rented the room under its roof for six weeks in March, when the ferry keeps its winter timetable and the café opens when the owner feels like it. The plan was to write about the island. For the first ten days I wrote about the weather, because the weather was the only thing that moved.',
      'Then the house started to teach me the island. The postman stops at its gate to rest his knees. The children cut across its field on the way to school. The light reaches its gable first every morning, and the sheep know it, and after a while so did I.',
      'By the end I could tell the time by which window the sun was in. That is the only kind of local knowledge worth having, and it cannot be had in a weekend.',
    ],
  },
  {
    slug: 'the-lake-road-in-fog',
    title: 'The lake road in fog',
    titleLines: ['The lake road', 'in fog'],
    place: 'Bohinj, Slovenia',
    category: 'Roads',
    date: '2026-09-13',
    author: 'Daniel Okafor',
    image: 'article1',
    caption: 'The south shore road at nine in the morning, before the fog lifts. Photograph: Zach Miller, Unsplash.',
    quote: 'The fog takes the distance out of sound.',
    paragraphs: [
      'I walked the road along the south shore of Lake Bohinj every morning for a month. In September the fog sits on the water until ten, and the road disappears thirty metres ahead of you, so the walk becomes a series of small arrivals.',
      'A bench. A fisherman’s car with both doors open. A cow, once, standing in the middle of the tarmac as if it had been placed there to make a point.',
      'By the second week I stopped bringing headphones. The fog takes the distance out of sound. You hear a bicycle long before you see it, and the church bell from the far shore arrives as if it were next to you.',
      'Most visitors drive this road in ten minutes and see the lake. Walk it slowly enough and you see the road.',
    ],
  },
  {
    slug: 'two-boats-one-harbour',
    title: 'Two boats, one harbour, no hurry',
    titleLines: ['Two boats, one harbour,', 'no hurry'],
    place: 'Mousehole, Cornwall',
    category: 'Coast',
    date: '2026-08-30',
    author: 'Ines Varga',
    image: 'article2',
    caption: 'The two boats that stay all year, just before the tide turns. Photograph: JOGphotos, Unsplash.',
    quote: 'Nothing happened quickly. A rope was replaced over four days.',
    paragraphs: [
      'Mousehole harbour empties twice a day. At low tide the two boats that stay all year lie on their sides in the mud, and their owners walk out in boots to do the jobs you can only do when a boat is lying down.',
      'I watched them for three weeks from a rented room above the slipway. Nothing happened quickly. A rope was replaced over four days. A hull was painted one plank a morning, because the paint needs the afternoon sun to set.',
      'Summer visitors come for the cottages and leave before the tide turns. They miss the best part: the hour when the water comes back and both boats lift, slowly, and sit upright again as if nothing had happened.',
      'The harbour keeps its own time. You can fight it, or you can rent a room above it.',
    ],
  },
  {
    slug: 'the-long-way-down-the-c14',
    title: 'The long way down the C14',
    titleLines: ['The long way', 'down the C14'],
    place: 'Namib Desert, Namibia',
    category: 'Desert',
    date: '2026-08-16',
    author: 'Daniel Okafor',
    image: 'article3',
    caption: 'South of the Kuiseb, where the radio gave up. Photograph: Andrew Svk, Unsplash.',
    quote: 'The road is not the way to the place. It is the place.',
    paragraphs: [
      'The C14 runs south-east from Walvis Bay into the Namib, and for long stretches it is the only straight line for a hundred kilometres. I drove it in the slowest car the rental company had, and I stopped every time I wanted to.',
      'That turned out to be often. A sign warning of zebra where there were no zebra. A farm stall at Solitaire selling apple pie in the middle of the desert. A gravel shoulder so quiet I could hear my own watch.',
      'The radio gave up after the first hour. After that the road was the programme: the corrugations changing under the tyres, the dust behind the car hanging in the air for minutes after I had gone.',
      'People cross this desert to reach the dunes. The road is not the way to the place. It is the place.',
    ],
  },
  {
    slug: 'a-winter-of-blue-hours',
    title: 'A winter of blue hours',
    titleLines: ['A winter of', 'blue hours'],
    place: 'Tromsø, Norway',
    category: 'North',
    date: '2026-08-02',
    author: 'Marit Lund',
    image: 'article4',
    caption: 'Fishermen’s houses on the shore at midday in December. Photograph: Camille Gerstenhaber, Unsplash.',
    quote: 'The town does not perform darkness for visitors.',
    paragraphs: [
      'In December the sun does not rise in Tromsø. What you get instead is the blue hour, which lasts most of the day and turns the snow, the water and the red wooden houses on the shore the same deep colour.',
      'I came for two weeks and stayed for nine. The town does not perform darkness for visitors. It carries on: children walk to school with lights on their hats, the bakery opens at seven as if it were July, and nobody apologises for the weather.',
      'The houses by the water were built for fishermen and painted red because red paint was the cheapest. That is the kind of fact you only learn by standing in front of the same house every day until someone comes out and tells you.',
      'In January the light came back, a few minutes a day. I was almost sorry.',
    ],
  },
  {
    slug: 'kotor-after-the-ships-leave',
    title: 'Kotor after the ships leave',
    titleLines: ['Kotor after', 'the ships leave'],
    place: 'Kotor, Montenegro',
    category: 'Towns',
    date: '2026-07-19',
    author: 'Ines Varga',
    image: 'article5',
    caption: 'The lane behind the shoemaker, an hour after the last tender. Photograph: Linda Gerbec, Unsplash.',
    quote: 'Visit in the afternoon and you see a set. Stay the night and you meet the cast.',
    paragraphs: [
      'Between nine and five, the old town of Kotor belongs to the cruise ships. At six the last tender leaves the quay, and the lanes inside the walls go quiet so quickly that you can hear the shutters open.',
      'I stayed through October in a flat above a shoemaker, behind an arch so narrow that the baker’s boy carried the bread in on his shoulder. Every evening I walked the same loop of lanes, and every evening there were fewer people in them.',
      'The cats came out first, then the grandmothers with their chairs, then the men who play cards on an upturned crate by the church. None of them are in the brochures. All of them had been there the whole day, waiting for the town to be theirs again.',
      'Visit in the afternoon and you see a set. Stay the night and you meet the cast.',
    ],
  },
  {
    slug: 'belgrade-to-bar-eleven-hours',
    title: 'Belgrade to Bar, eleven hours',
    titleLines: ['Belgrade to Bar,', 'eleven hours'],
    place: 'Belgrade to Bar railway',
    category: 'Rail',
    date: '2026-07-05',
    author: 'Daniel Okafor',
    image: 'article6',
    caption: 'Somewhere before Kolašin, at full speed, which is not very fast. Photograph: viktor rejent, Unsplash.',
    quote: 'A plane does the trip in fifty minutes. It does not show you the cake.',
    paragraphs: [
      'The train from Belgrade to Bar takes eleven hours if it is on time, and nobody expects it to be. It crosses 435 bridges and runs through 254 tunnels, and for most of the morning the view is a blur of green with a river at the bottom of it.',
      'I bought a second-class seat and a bag of plums and never opened my book. The compartment filled and emptied at stations whose names I could not read: a soldier going home, a woman carrying a cake in a box, two students arguing about football.',
      'Somewhere after Kolašin the mountains opened and the window went from green to grey to a sudden, impossible blue. That was the sea, still two hours away.',
      'A plane does the trip in fifty minutes. It does not show you the cake.',
    ],
  },
]

export const essayHref = (e: Essay) => `/articles/${e.slug}`

export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
}

export const team = [
  { name: 'Marit Lund', role: 'Editor', line: 'I commission one place at a time and say no to most pitches.', image: 'team1' as const },
  { name: 'Daniel Okafor', role: 'Senior writer', line: 'I take the slowest transport available and write down what happens.', image: 'team2' as const },
  { name: 'Ines Varga', role: 'Writer and picture editor', line: 'I choose photographs that show the place, not the person who went there.', image: 'team3' as const },
]

export const about = {
  label: 'About Slow Atlas',
  statement: 'Three editors who pay their own way and stay until a place stops performing for them.',
  bio: 'Slow Atlas started in 2023 at a kitchen table in Bergen, after Marit Lund left the travel desk of a daily paper. Three editors run it today. There are no sponsored trips, no affiliate links and no lists.',
  caption: 'Marit Lund, editor',
}

export const nav = [
  { label: 'Latest', href: essayHref(essays[0]) },
  { label: 'Articles', href: '/articles' },
  { label: 'About', href: '/about' },
  { label: 'Newsletter', href: '/newsletter' },
]

export const subscribeHref = '/newsletter#subscribe'
