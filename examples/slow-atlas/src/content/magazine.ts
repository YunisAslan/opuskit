import { assets, type AssetKey } from '@/config/assets'

export const site = {
  name: 'Slow Atlas',
  description: 'An independent magazine of long-form travel essays. One place per essay, told slowly, every second Sunday.',
  email: 'hello@slowatlas.com',
  pitches: 'pitches@slowatlas.com',
  // Your email provider's form URL (Buttondown, Mailchimp, …). Empty = the form confirms on the page only.
  newsletterAction: '',
}

export type CategorySlug = 'by-road' | 'by-water' | 'on-foot' | 'by-rail'

export const categories: { slug: CategorySlug; name: string; image: AssetKey; line: string }[] = [
  { slug: 'by-road', name: 'By road', image: 'article3', line: 'Essays from behind the wheel, where the road sets the pace.' },
  { slug: 'by-water', name: 'By water', image: 'article2', line: 'Harbours, fjords and shores, read by the tide.' },
  { slug: 'on-foot', name: 'On foot', image: 'article5', line: 'Places small enough to walk, and worth walking twice.' },
  { slug: 'by-rail', name: 'By rail', image: 'article6', line: 'Long lines and slow trains, seen from the window seat.' },
]

export type Essay = {
  slug: string; title: string; dek: string; place: string; category: CategorySlug; author: string
  date: string; issue: number; image: AssetKey; caption: string; pullQuote: string; paragraphs: string[]
}

// Newest first. One issue every second Sunday.
export const essays: Essay[] = [
  {
    slug: 'the-red-house-on-the-hill', title: 'The red house on the hill', issue: 41, date: '2026-09-27',
    place: 'Suðuroy, Faroe Islands', category: 'on-foot', author: 'Ingrid Solberg', image: 'story',
    dek: 'Three days walking to a house nobody lives in, and why it is still painted every spring.',
    caption: 'The house above Hvalba, painted every May by the farmer who owns the field.',
    pullQuote: 'From the sea it is the only thing that tells you where the island begins.',
    paragraphs: [
      'The house sits on the ridge above Hvalba like a word someone forgot to finish. There is no road to it, no path the map admits to, and no one has slept in it since 1971. From the harbour it looks close. It takes most of a morning to reach.',
      'We walked it three times in three days, because the first time the fog came down at the second stile and the second time the sheep had other plans. On the third morning the wind dropped, the grass went silver, and the door was unlocked. Inside: a table, one chair, a calendar with no year printed on it.',
      'The farmer who owns the field paints the walls every May. He does not know who built it. He paints it, he says, because from the sea it is the only thing that tells you where the island begins. A house nobody lives in, kept for the boats.',
      'That is the kind of place this magazine is for. Not the view from the top, but the reason someone keeps climbing up to paint it.',
    ],
  },
  {
    slug: 'fog-on-the-lake-road', title: 'Fog on the lake road', issue: 40, date: '2026-09-13',
    place: 'Lake Bohinj, Slovenia', category: 'by-road', author: 'Kofi Mensah', image: 'article1',
    dek: 'Twelve kilometres in an hour, because the lake would not let us see any further.',
    caption: 'The shore road at seven in the morning, before the fog lifts off the water.',
    pullQuote: 'The lake was only a sound, and every bend arrived without warning.',
    paragraphs: [
      'The road along the south shore is twelve kilometres long and we drove it in an hour. Not because of traffic. Because the fog sat on the water so thick that the lake was only a sound, and every bend arrived without warning.',
      'Locals call September the white month. Mornings fill the valley like milk in a bowl, and nothing moves until the sun clears the ridge around ten. The bakery in Ukanc opens at six anyway. The baker says the fog is good for business: nobody can leave.',
      'By noon it was gone, and the lake turned out to be green, and enormous, and full of swimmers. We liked it better in the morning, when you had to take it on trust.',
    ],
  },
  {
    slug: 'winter-at-the-edge-of-the-fjord', title: 'Winter at the edge of the fjord', issue: 39, date: '2026-08-30',
    place: 'Tromsø, Norway', category: 'by-water', author: 'Elin Varga', image: 'article4',
    dek: 'Six weeks without a sunrise, and the red houses that make it bearable.',
    caption: 'Boathouses on the west shore, shot on film in the last week of the polar night.',
    pullQuote: 'In a landscape with no shadows, a red wall is how you judge distance.',
    paragraphs: [
      'For six weeks each winter the sun does not rise over Tromsø. It does not set either. It waits below the mountains and lends the sky a blue that photographs never get right, the colour of the inside of a mussel shell.',
      'The boathouses on the west shore are painted red for the same reason barns are: red ochre was cheap and it lasted. Now it does a second job. In a landscape with no shadows, a red wall is how you judge distance. People here give directions by them.',
      'We stayed for the return of the light, when half the town climbs the hill to watch a sliver of sun touch the peaks for a few minutes. Nobody cheers. They stand there, and then they go back down for coffee.',
    ],
  },
  {
    slug: 'a-harbour-that-keeps-its-own-time', title: 'A harbour that keeps its own time', issue: 38, date: '2026-08-16',
    place: 'Port-en-Bessin, Normandy', category: 'by-water', author: 'Kofi Mensah', image: 'article2',
    dek: 'In a Normandy fishing port, the day is set by the tide, not the clock.',
    caption: 'Low water in the inner harbour; the boats wait for the sea to come back.',
    pullQuote: 'Nobody asks what time it is. They ask where the water is.',
    paragraphs: [
      'In Port-en-Bessin nobody asks what time it is. They ask where the water is. The inner harbour drains twice a day, and when it does the boats sit down on the mud like tired dogs and the town goes quiet until the sea comes back.',
      'We spent a week learning the rhythm. Market when the scallop boats come in, which is never the same hour twice. Lunch when the harbourmaster closes the gate. A walk along the jetty at low water, when you can read the names painted on the hulls at eye level.',
      'On the last morning the mist sat so low that the two boats in front of our window seemed to float on nothing. The fisherman who owns the red one told us he has never once left on time. He leaves when it is time.',
    ],
  },
  {
    slug: 'nine-hours-at-the-train-window', title: 'Nine hours at the train window', issue: 37, date: '2026-08-02',
    place: 'Oslo to Bergen, Norway', category: 'by-rail', author: 'Ingrid Solberg', image: 'article6',
    dek: 'The Bergen line crosses a mountain plateau most people only ever see from here.',
    caption: 'Somewhere after Finse, the highest station on the line, 1,222 metres up.',
    pullQuote: 'Phones go down somewhere after Geilo, when the trees give up.',
    paragraphs: [
      'The Bergen line takes under seven hours on paper. Ours took nine, because of snow on the track above Finse in the middle of July, and nobody in the carriage minded at all.',
      'This is a train people take to look out of. Phones go down somewhere after Geilo, when the trees give up and the plateau opens out, flat and enormous and the colour of wet slate. A woman across the aisle had made the journey every summer for forty years. She still had her face to the glass.',
      'We stopped for two hours at a station with no road to it. The conductor handed out waffles. Outside, a man got off with skis, in July, and walked away across the snow as if it were the most ordinary thing in the world. Up there, it is.',
    ],
  },
  {
    slug: 'kotor-before-the-cruise-ships', title: 'Kotor before the cruise ships', issue: 36, date: '2026-07-19',
    place: 'Kotor, Montenegro', category: 'on-foot', author: 'Elin Varga', image: 'article5',
    dek: 'Between dawn and the first gangway, the old town belongs to the people who live in it.',
    caption: 'Inside the old town walls at six in the morning, an hour before the first ship docks.',
    pullQuote: 'Between dawn and the first gangway, the town belongs to the people who live in it.',
    paragraphs: [
      'Kotor has two populations. One lives inside the old walls. The other arrives at eight in the morning on ships taller than the cathedral and leaves at six. Between dawn and the first gangway, the town belongs to the people who live in it.',
      'We walked it every morning for a week, from the Sea Gate to the river gate and back, through streets too narrow for two umbrellas. Shutters open in a set order: the bakery first, then the pharmacy, then the woman on the Milk Square who waters her geraniums from the second floor without looking down.',
      'By nine you cannot see the paving for people. By then we were halfway up the fortress steps, looking down at a town that had already lived the best hours of its day.',
    ],
  },
  {
    slug: 'two-hundred-kilometres-of-straight-road', title: 'Two hundred kilometres of straight road', issue: 35, date: '2026-07-05',
    place: 'Namib Desert, Namibia', category: 'by-road', author: 'Kofi Mensah', image: 'article3',
    dek: 'Driving south through the Namib, where the horizon is the only thing that will not move.',
    caption: 'South of Swakopmund, where the tar runs out of reasons to turn.',
    pullQuote: 'The horizon stays exactly where it is, however fast you drive.',
    paragraphs: [
      'The road south of Swakopmund does not turn for so long that you start to distrust it. The tar runs dead straight between two yellow lines, the desert on either side is the colour of a biscuit, and the horizon stays exactly where it is, however fast you drive.',
      'We saw four cars in a morning. Each driver raised a hand from the wheel as they passed, a wave that means: you are not alone out here, but nearly. At a fuel stop with one pump, the attendant sold us water, apples and a postcard of the road we were on.',
      'In the afternoon the wind drew thin rivers of sand across the tarmac, and for an hour the road seemed to flow. It was the only thing that moved all day, and it was enough.',
    ],
  },
]

export const editors = [
  { name: 'Ingrid Solberg', role: 'Editor', image: 'team1' as AssetKey, line: 'Reads every essay aloud before it goes out. If it cannot be read slowly, it goes back.' },
  { name: 'Kofi Mensah', role: 'Features editor', image: 'team2' as AssetKey, line: 'Commissions the writers who stayed somewhere longer than they meant to.' },
  { name: 'Elin Varga', role: 'Photo editor', image: 'team3' as AssetKey, line: 'Chooses one photograph for every essay, and argues for it.' },
]

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })

export const categoryOf = (slug: CategorySlug) => categories.find((c) => c.slug === slug)!
export const essaysIn = (slug: CategorySlug) => essays.filter((e) => e.category === slug)
export const countLabel = (n: number) => `${n} ${n === 1 ? 'essay' : 'essays'}`

/** An essay as a Journal entry. */
export const entry = (e: Essay) => ({
  title: e.title, date: formatDate(e.date), category: categoryOf(e.category).name, href: `/articles/${e.slug}`,
  image: assets[e.image].src, alt: assets[e.image].alt,
})

export const PER_PAGE = 4
export const pageCount = Math.ceil(essays.length / PER_PAGE)
