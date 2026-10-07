import type { AssetKey } from '@/config/assets'

// The catalogue. Five scents, one place at one hour each, plus the discovery set, the refill and the
// empty vessel the house sells alongside them. Prices, notes and copy are placeholders for the owner
// to confirm (see the copy deck notes in the final reply).
export type ProductKind = 'scent' | 'set' | 'refill' | 'vessel'

export type Product = {
  slug: string
  name: string
  kind: ProductKind
  hour?: string
  place?: string
  line: string
  price: string
  priceValue: number
  size: string
  concentration: string
  family: string
  notes: string[]
  image: AssetKey
  hoverImage: AssetKey
  highlightImage: AssetKey
  images: AssetKey[]
  soldOut?: boolean
}

export const products: Product[] = [
  {
    slug: 'quiet-harbour',
    name: 'Quiet Harbour',
    kind: 'scent',
    hour: '6 a.m.',
    place: 'A fishing port, before the boats go out',
    line: 'Salt air, wet rope and cold stone — the hour the water is still.',
    price: '£180',
    priceValue: 180,
    size: '50 ml',
    concentration: 'Eau de parfum',
    family: 'Marine, green',
    notes: ['Salt air', 'Wet rope', 'Cold stone'],
    image: 'quietHarbour',
    hoverImage: 'quietHarbourAlt',
    highlightImage: 'highlightQuietHarbour',
    images: ['quietHarbour', 'highlightQuietHarbour', 'quietHarbourAlt'],
  },
  {
    slug: 'warm-orchard',
    name: 'Warm Orchard',
    kind: 'scent',
    hour: '3 p.m.',
    place: 'The far end of a cider orchard',
    line: 'Sun-warmed apple and dry grass, at the last warm hour of the day.',
    price: '£180',
    priceValue: 180,
    size: '50 ml',
    concentration: 'Eau de parfum',
    family: 'Fruity, woody',
    notes: ['Sun-warmed apple', 'Dry grass', 'Cider'],
    image: 'warmOrchard',
    hoverImage: 'warmOrchardAlt',
    highlightImage: 'highlightQuietHarbour',
    images: ['warmOrchard', 'highlightQuietHarbour', 'warmOrchardAlt'],
  },
  {
    slug: 'reading-room',
    name: 'Reading Room',
    kind: 'scent',
    hour: '11 a.m.',
    place: 'A country-house library',
    line: 'Old paper, cold marble and the quiet of a lit beeswax candle.',
    price: '£175',
    priceValue: 175,
    size: '50 ml',
    concentration: 'Eau de parfum',
    family: 'Woody, paper',
    notes: ['Old paper', 'Cold marble', 'Beeswax'],
    image: 'readingRoom',
    hoverImage: 'readingRoomAlt',
    highlightImage: 'highlightQuietHarbour',
    images: ['readingRoom', 'highlightQuietHarbour', 'readingRoomAlt'],
  },
  {
    slug: 'first-rain',
    name: 'First Rain',
    kind: 'scent',
    hour: '7 p.m.',
    place: 'A courtyard at the first summer shower',
    line: 'Petrichor rising off hot terracotta, the garden breathing again.',
    price: '£185',
    priceValue: 185,
    size: '50 ml',
    concentration: 'Eau de parfum',
    family: 'Earthy, green',
    notes: ['Petrichor', 'Wet terracotta', 'Green stem'],
    image: 'firstRain',
    hoverImage: 'firstRainAlt',
    highlightImage: 'highlightFirstRain',
    images: ['firstRain', 'highlightFirstRain', 'firstRainAlt'],
  },
  {
    slug: 'night-garden',
    name: 'Night Garden',
    kind: 'scent',
    hour: '9 p.m.',
    place: 'A kitchen garden after dark',
    line: 'Crushed tomato leaf, mint and damp earth in the last of the light.',
    price: '£190',
    priceValue: 190,
    size: '50 ml',
    concentration: 'Eau de parfum',
    family: 'Herbal, green',
    notes: ['Tomato leaf', 'Mint', 'Damp earth'],
    image: 'nightGarden',
    hoverImage: 'nightGardenAlt',
    highlightImage: 'highlightQuietHarbour',
    images: ['nightGarden', 'highlightQuietHarbour', 'nightGardenAlt'],
  },
  {
    slug: 'discovery-set',
    name: 'The Discovery Set',
    kind: 'set',
    place: 'All five hours, to find yours',
    line: 'Five 2 ml sprays — every hour in the house, to wear before you commit to a bottle.',
    price: '£45',
    priceValue: 45,
    size: '5 × 2 ml',
    concentration: 'Eau de parfum',
    family: 'Sampler',
    notes: ['Quiet Harbour', 'Warm Orchard', 'Reading Room', 'First Rain', 'Night Garden'],
    image: 'quietHarbourAlt',
    hoverImage: 'quietHarbour',
    highlightImage: 'highlightQuietHarbour',
    images: ['quietHarbourAlt', 'firstRainAlt', 'nightGardenAlt'],
  },
  {
    slug: 'refill',
    name: 'The Refill',
    kind: 'refill',
    place: 'Your bottle, filled again',
    line: 'Return an empty bottle and we refill it by hand — a third less than a new one.',
    price: '£120',
    priceValue: 120,
    size: '50 ml',
    concentration: 'Eau de parfum',
    family: 'Refill',
    notes: ['Choose any scent', 'Hand-poured', 'Wax-sealed'],
    image: 'readingRoomAlt',
    hoverImage: 'readingRoom',
    highlightImage: 'highlightQuietHarbour',
    images: ['readingRoomAlt', 'highlightQuietHarbour', 'warmOrchardAlt'],
  },
  {
    slug: 'the-vessel',
    name: 'The Vessel',
    kind: 'vessel',
    place: 'An empty bottle, to keep',
    line: 'The same recycled-glass flacon, empty — for the refill, or your own.',
    price: '£30',
    priceValue: 30,
    size: '50 ml',
    concentration: 'Empty flacon',
    family: 'Vessel',
    notes: ['Recycled glass', 'Wax-sealed', 'Refillable'],
    image: 'nightGardenAlt',
    hoverImage: 'nightGarden',
    highlightImage: 'highlightQuietHarbour',
    images: ['nightGardenAlt', 'highlightQuietHarbour', 'nightGarden'],
  },
]

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

/** The five scents only — what the Home grid shows. */
export const scents = products.filter((p) => p.kind === 'scent')

/** The featured scent shown in the Home hero (the store's opening picture). */
export const featuredScent = products[0]