import type { AssetKey } from '@/config/assets'

export type ProductType = 'cleanse' | 'treat' | 'moisturise'
export type Product = {
  slug: string; name: string; price: number; size: string; type: ProductType; line: string
  images: AssetKey[]; inside: string; use: string; specs: { label: string; value: string }[]; extra?: boolean
}

export const money = (n: number) => `${n}\u00a0₼`

export const TYPES: { id: ProductType; name: string; image: AssetKey; alt: string }[] = [
  { id: 'cleanse', name: 'Cleanse', image: 'bathroom', alt: 'A round stone basin on a wooden counter' },
  { id: 'treat', name: 'Treat', image: 'serum3', alt: 'The Saffron Serum among jars on linen' },
  { id: 'moisturise', name: 'Moisturise', image: 'ritualHands', alt: 'Hands opening a jar of cream over a sink' },
]

const common = (made: string, keeps: string) => [
  { label: 'Made in', value: 'Mardakan, Absheron, in batches of 300' },
  { label: 'Batch', value: made },
  { label: 'Keeps', value: keeps },
  { label: 'Skin', value: 'Every type, including sensitive. Patch-tested on 40 people' },
  { label: 'Never in it', value: 'Fragrance, alcohol, silicones, anything tested on animals' },
]

export const products: Product[] = [
  {
    slug: 'salt-cleanser', name: 'Salt Cleanser', price: 34, size: '150 ml', type: 'cleanse', images: ['cleanser'],
    line: 'A soft gel with Masazir salt that lifts the day off your face without leaving it tight.',
    inside: 'Masazir salt, aloe leaf juice, sunflower glycerin, chamomile, a little oat. Nothing else.',
    use: 'Morning and night. Massage a pump onto damp skin for half a minute, then rinse with warm water.',
    specs: [{ label: 'Size', value: '150 ml, about three months' }, { label: 'What it does', value: 'Cleans without stripping; leaves no film' }, { label: 'Bottle', value: 'Recycled plastic with a pump' }, ...common('No. 14, poured in September', '12 months after opening')],
  },
  {
    slug: 'mineral-toner', name: 'Mineral Toner', price: 28, size: '120 ml', type: 'cleanse', images: ['toner'],
    line: 'Water from the salt pans, softened with rose and a little saffron. Splash it on after you wash.',
    inside: 'Filtered salt-pan water, rose water from Ganja, saffron extract, glycerin.',
    use: 'After the cleanser. Shake a few drops into your palms and press them into your face and neck.',
    specs: [{ label: 'Size', value: '120 ml, about two months' }, { label: 'What it does', value: 'Calms and wakes up skin after washing' }, { label: 'Bottle', value: 'Glass with an aluminium cap' }, ...common('No. 14, poured in September', '9 months after opening')],
  },
  {
    slug: 'saffron-serum', name: 'Saffron Serum', price: 58, size: '30 ml', type: 'treat', images: ['serum1', 'serum2', 'serum4', 'serum3'],
    line: 'Our first product, and still the one we are proudest of. Bilgah saffron steeped in squalane for six weeks, for skin that looks rested.',
    inside: 'Saffron threads from Bilgah, olive squalane, sea buckthorn oil, vitamin E.',
    use: 'Three drops after the toner, morning or night. Warm them between your fingertips and press in.',
    specs: [{ label: 'Size', value: '30 ml, about two months' }, { label: 'What it does', value: 'Evens tone and softens dry patches' }, { label: 'Saffron', value: '0.2 g of threads in every bottle' }, { label: 'Bottle', value: 'Amber glass with a glass dropper' }, ...common('No. 14, poured in September', '6 months after opening')],
  },
  {
    slug: 'day-cream', name: 'Day Cream', price: 42, size: '50 ml', type: 'moisturise', images: ['cream'],
    line: 'A light cream that sinks in within a minute. Wear it on its own or under sunscreen.',
    inside: 'Shea butter, oat, Masazir salt, saffron extract, sunflower oil.',
    use: 'Every morning, a pea-sized amount over the serum. Spread it outwards from the centre of your face.',
    specs: [{ label: 'Size', value: '50 ml, about two months' }, { label: 'What it does', value: 'Keeps skin soft all day; no shine' }, { label: 'Jar', value: 'Glass with a stone-coloured lid' }, ...common('No. 13, poured in July', '9 months after opening')],
  },
  {
    slug: 'night-oil', name: 'Night Oil', price: 46, size: '30 ml', type: 'treat', images: ['oil'],
    line: 'Goychay pomegranate seed and saffron in a dry oil. Four drops before bed, pressed in, not rubbed.',
    inside: 'Pomegranate seed oil from Goychay, saffron, squalane, rosehip.',
    use: 'Last thing at night, on clean skin. Four drops, pressed in with flat palms.',
    specs: [{ label: 'Size', value: '30 ml, about two months' }, { label: 'What it does', value: 'Feeds dry skin overnight' }, { label: 'Bottle', value: 'Amber glass with a dropper' }, ...common('No. 14, poured in September', '6 months after opening')],
  },
  {
    slug: 'salt-scrub', name: 'Salt Scrub', price: 32, size: '200 g', type: 'cleanse', images: ['scrub'],
    line: 'Coarse Masazir salt in sunflower and almond oil, for elbows, heels and anywhere rough. Once a week is plenty.',
    inside: 'Masazir salt, sunflower oil, sweet almond oil, a drop of saffron.',
    use: 'In the shower, on wet skin. Rub in small circles, then rinse. Not for the face.',
    specs: [{ label: 'Size', value: '200 g, about ten scrubs' }, { label: 'What it does', value: 'Smooths rough skin and leaves a thin layer of oil' }, { label: 'Jar', value: 'Glass with a metal lid' }, ...common('No. 12, poured in May', '12 months after opening')],
  },
  {
    slug: 'hand-balm', name: 'Hand Balm', price: 18, size: '75 ml', type: 'moisturise', images: ['balm'], extra: true,
    line: 'The small extra we sell beside the six. A thick balm with beeswax and salt-pan clay, for hands that work.',
    inside: 'Beeswax from Lankaran, sunflower oil, salt-pan clay, shea butter.',
    use: 'Whenever your hands feel tight. A little goes a long way; rub it in until it disappears.',
    specs: [{ label: 'Size', value: '75 ml, about a month of daily use' }, { label: 'What it does', value: 'Seals in moisture without feeling greasy' }, { label: 'Tube', value: 'Recyclable aluminium tube' }, ...common('No. 14, poured in September', '12 months after opening')],
  },
]

export const bySlug = (slug: string) => products.find((p) => p.slug === slug)

export const delivery = 'Orders open in spring. From then: free delivery in Baku on orders over 60 ₼, 2 to 4 days anywhere else in Azerbaijan.'

export const productFaq = [
  { q: 'When can I order?', a: 'In spring. We are pouring the first batches for the shop now. Add what you like to your bag and it will wait for you, or leave your email and we will write on the day orders open.' },
  { q: 'Is it all right for sensitive skin?', a: 'Every product was patch-tested on 40 people before we kept it, and there is no fragrance or alcohol in any of them. If you react easily, start with the cleanser and add one thing at a time.' },
  { q: 'Is the saffron real?', a: 'Yes, threads from two growers in Bilgah, a few kilometres from our lab. You can see them settle in the bottom of the serum; give it a gentle tip before you use it.' },
  { q: 'Why are the batches so small?', a: 'We pour 300 bottles at a time so each batch is fresh when it reaches you. When a batch is gone, the next one is usually three or four weeks away.' },
  { q: 'Do you test on animals?', a: 'No, never, and none of our suppliers do either. The only testers are people, all of them volunteers.' },
  { q: 'Can I return something?', a: 'Unopened, within 30 days, for a full refund. Opened and it did not suit you? Write to us anyway; we would rather know.' },
]

export const testimonials = [
  { quote: 'I have used the serum every night since batch three. My skin has not changed overnight, but it has stopped arguing with me.', name: 'Sabina', role: 'tester since batch 3, Baku' },
  { quote: 'The cleanser smells of nothing, which is exactly what I wanted.', name: 'Elvin', role: 'tester, Sumgait' },
  { quote: 'My grandmother kept Caspian salt by the sink. The balm is the first thing that reminded me of her.', name: 'Günel', role: 'tester, Mardakan' },
  { quote: 'Four drops of the oil and I wake up looking like I slept by the sea.', name: 'Murad', role: 'tester, Ganja' },
]
