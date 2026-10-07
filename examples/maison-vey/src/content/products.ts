// Copy deck: the five scents and the discovery set.
// PLACEHOLDER (owner to replace): every price, note, batch size and availability line below is invented
// in the house voice from "five scents by hand, each one a single place at a single hour".
import type { AssetKey } from '@/config/assets'

export type Hours = 'morning' | 'afternoon' | 'night'

export type Size = { label: string; price: number }

export type Scent = {
  slug: string
  name: string
  /** The place, said plainly. */
  place: string
  /** The hour, written as a time-code (shown in the accent). */
  hour: string
  hours: Hours
  /** One line: what it is. */
  line: string
  notes: string[]
  sizes: Size[]
  availability: string
  /** Shown as a quiet badge in the grid; never a discount. */
  badge?: string
  images: { front: AssetKey; angle: AssetKey; detail: AssetKey }
  alt: { front: string; angle: string; detail: string }
  details: { title: string; text: string }[]
}

const care = {
  delivery: 'Sent from the workshop within two working days, in a box we fold ourselves. Free across the EU on orders over €120.',
  returns: 'Unopened bottles come back free within 30 days. Every order carries a 2 ml sample, so you can wear it before you break the seal.',
}

const bottle = (slug: string) => ({
  front: `product-${slug}` as AssetKey,
  angle: `product-${slug}-angle` as AssetKey,
  detail: `product-${slug}-detail` as AssetKey,
})

const eauSizes: Size[] = [
  { label: '15 ml', price: 65 },
  { label: '50 ml', price: 185 },
  { label: '100 ml', price: 260 },
]

export const scents: Scent[] = [
  {
    slug: 'salt-quay',
    name: 'Salt Quay',
    place: 'A harbour wall',
    hour: '5.40',
    hours: 'morning',
    line: 'The harbour wall before the boats go out: sea fennel, wet stone and the first coffee on deck.',
    notes: ['Sea fennel', 'Wet stone', 'Ambrette seed'],
    sizes: eauSizes,
    availability: 'In stock',
    images: bottle('salt-quay'),
    alt: {
      front: 'Salt Quay bottle standing alone on an oxblood ground',
      angle: 'Salt Quay bottle turned three-quarters to the light',
      detail: 'Close view of the Salt Quay label and glass stopper',
    },
    details: [
      { title: 'What is in it', text: 'Sea fennel, wet stone accord, ambrette seed, a trace of roasted coffee. 18% concentration in organic grape alcohol.' },
      { title: 'Size and bottle', text: 'Heavy clear glass with a ground stopper, labelled and numbered by hand. Lasts six to eight hours on skin.' },
      { title: 'Delivery', text: care.delivery },
      { title: 'Returns', text: care.returns },
    ],
  },
  {
    slug: 'orangery',
    name: 'Orangery',
    place: 'A glasshouse in March',
    hour: '8.00',
    hours: 'morning',
    line: 'A glasshouse in March with the vents just opened: neroli, crushed tomato leaf and warm panes.',
    notes: ['Neroli', 'Tomato leaf', 'White musk'],
    sizes: eauSizes,
    availability: 'In stock',
    images: bottle('orangery'),
    alt: {
      front: 'Orangery bottle standing alone on an oxblood ground',
      angle: 'Orangery bottle turned three-quarters to the light',
      detail: 'Close view of the Orangery label and glass stopper',
    },
    details: [
      { title: 'What is in it', text: 'Tunisian neroli, tomato leaf absolute, petitgrain, a clean white musk. 18% concentration in organic grape alcohol.' },
      { title: 'Size and bottle', text: 'Heavy clear glass with a ground stopper, labelled and numbered by hand. Lasts five to seven hours on skin.' },
      { title: 'Delivery', text: care.delivery },
      { title: 'Returns', text: care.returns },
    ],
  },
  {
    slug: 'fig-courtyard',
    name: 'Fig Courtyard',
    place: 'A walled garden',
    hour: '14.00',
    hours: 'afternoon',
    line: 'A walled garden after lunch, the shutters half closed: fig leaf, sun on stone and pale cedar.',
    notes: ['Fig leaf', 'Warm stone', 'Atlas cedar'],
    sizes: eauSizes,
    availability: 'In stock',
    images: bottle('fig-courtyard'),
    alt: {
      front: 'Fig Courtyard bottle standing alone on an oxblood ground',
      angle: 'Fig Courtyard bottle turned three-quarters to the light',
      detail: 'Close view of the Fig Courtyard label and glass stopper',
    },
    details: [
      { title: 'What is in it', text: 'Fig leaf, coconut milk in a whisper, warm mineral accord, Atlas cedar. 20% concentration in organic grape alcohol.' },
      { title: 'Size and bottle', text: 'Heavy clear glass with a ground stopper, labelled and numbered by hand. Lasts eight hours or more on skin.' },
      { title: 'Delivery', text: care.delivery },
      { title: 'Returns', text: care.returns },
    ],
  },
  {
    slug: 'reading-room',
    name: 'Reading Room',
    place: 'A library in November',
    hour: '16.00',
    hours: 'afternoon',
    line: 'A library in November as the lamps come on: orris, black tea and the dry sweetness of old paper.',
    notes: ['Orris', 'Black tea', 'Old paper'],
    sizes: eauSizes,
    availability: 'Last few of this batch',
    badge: 'Last few',
    images: bottle('reading-room'),
    alt: {
      front: 'Reading Room bottle standing alone on an oxblood ground',
      angle: 'Reading Room bottle turned three-quarters to the light',
      detail: 'Close view of the Reading Room label and glass stopper',
    },
    details: [
      { title: 'What is in it', text: 'Orris butter, Keemun tea, a paper accord we built over two winters, benzoin. 20% concentration in organic grape alcohol.' },
      { title: 'Size and bottle', text: 'Heavy clear glass with a ground stopper, labelled and numbered by hand. Lasts eight hours or more on skin.' },
      { title: 'Delivery', text: care.delivery },
      { title: 'Returns', text: care.returns },
    ],
  },
  {
    slug: 'night-ferry',
    name: 'Night Ferry',
    place: 'The deck of a crossing',
    hour: '23.00',
    hours: 'night',
    line: 'The open deck of a late crossing: vetiver, smoked birch and cold salt air off the wake.',
    notes: ['Vetiver', 'Smoked birch', 'Sea air'],
    sizes: eauSizes,
    availability: 'In stock',
    images: bottle('night-ferry'),
    alt: {
      front: 'Night Ferry bottle standing alone on an oxblood ground',
      angle: 'Night Ferry bottle turned three-quarters to the light',
      detail: 'Close view of the Night Ferry label and glass stopper',
    },
    details: [
      { title: 'What is in it', text: 'Haitian vetiver, birch tar in a careful dose, ozonic sea accord, labdanum. 20% concentration in organic grape alcohol.' },
      { title: 'Size and bottle', text: 'Heavy clear glass with a ground stopper, labelled and numbered by hand. Lasts ten hours or more on skin.' },
      { title: 'Delivery', text: care.delivery },
      { title: 'Returns', text: care.returns },
    ],
  },
  {
    slug: 'discovery-set',
    name: 'The Five Hours',
    place: 'Every place, one box',
    hour: '',
    hours: 'morning',
    line: 'All five scents in 2 ml vials, to wear for a week before you choose. The price comes off your first full bottle.',
    notes: ['Salt Quay', 'Orangery', 'Fig Courtyard', 'Reading Room', 'Night Ferry'],
    sizes: [{ label: '5 × 2 ml', price: 38 }],
    availability: 'In stock',
    images: bottle('discovery-set'),
    alt: {
      front: 'The Five Hours discovery set, five vials in a folded box',
      angle: 'The discovery set box seen from above with its lid open',
      detail: 'Close view of one discovery vial and its handwritten label',
    },
    details: [
      { title: 'What is in it', text: 'Five 2 ml glass vials with sprayers, one of each scent, and a card on the place and hour behind each one.' },
      { title: 'Credit', text: 'Keep the code inside the lid: it takes €38 off your first 50 ml or 100 ml bottle, for a year.' },
      { title: 'Delivery', text: care.delivery },
      { title: 'Returns', text: care.returns },
    ],
  },
]

export const getScent = (slug: string) => scents.find((s) => s.slug === slug)
export const fromPrice = (s: Scent) => Math.min(...s.sizes.map((z) => z.price))
export const formatPrice = (n: number) => `€${n}`
/** The grid price: the 50 ml for a scent, the set price for the set. */
export const gridPrice = (s: Scent) => formatPrice((s.sizes.find((z) => z.label === '50 ml') ?? s.sizes[0]).price)
