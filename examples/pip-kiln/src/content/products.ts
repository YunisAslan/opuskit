// Copy deck — the catalogue. Six pieces, one per product photo in the shot list (productGrid-1…6).
// PLACEHOLDER: every name, price, size and stock level below is invented for the build — the owner replaces them
// with the real catalogue. Order here = order in the grid; `photo` is the productGrid file it uses.

export type ProductType = 'mugs' | 'plates' | 'vases'
export type Glaze = 'Sunshine' | 'Raspberry' | 'Liquorice'

export type Product = {
  slug: string
  name: string
  type: ProductType
  price: number
  /** in stock, a few left, or sold out — shown on every card */
  stock: number
  photo: number
  line: string
  /** the h1 on the product page swaps this nickname when the glaze changes */
  nicknames: Record<Glaze, string>
  details: { title: string; text: string }[]
  highlight: { title: string; text: string; facts: { label: string; value: string }[] }
}

export const glazes: Glaze[] = ['Sunshine', 'Raspberry', 'Liquorice']

export const glazeLine: Record<Glaze, string> = {
  Sunshine: 'Butter-bright and glossy. Looks like a good mood.',
  Raspberry: 'Deep pink that pools darker at the rim. Loud, on purpose.',
  Liquorice: 'Almost-black with a soft shine. Yellow’s cool cousin.',
}

const delivery = { title: 'Delivery', text: 'Packed in two boxes and posted within two working days. Free in the UK on bags over £50.' }
const returns = { title: 'Returns', text: 'Changed your mind? Send it back within 30 days. Arrived broken? We send a new one, no fuss.' }

export const products: Product[] = [
  {
    slug: 'morning-person-mug',
    name: 'Morning Person Mug',
    type: 'mugs',
    price: 26,
    stock: 18,
    photo: 1,
    line: 'A chunky 350ml mug with a thumb dip in the handle. Makes 7am feel like a choice.',
    nicknames: { Sunshine: 'the Optimist', Raspberry: 'the Show-off', Liquorice: 'the Night Owl' },
    details: [
      { title: 'Made of', text: 'Stoneware, thrown on the wheel and fired twice to 1,240°C. Glazed inside and out.' },
      { title: 'Size', text: '9cm tall, 8.5cm across. Holds 350ml, or one proper tea.' },
      delivery,
      returns,
    ],
    highlight: {
      title: 'The thumb dip',
      text: 'We press a little hollow into every handle while the clay is soft. Your thumb finds it before you are awake.',
      facts: [
        { label: 'Made of', value: 'Stoneware, fired to 1,240°C' },
        { label: 'Holds', value: '350ml' },
        { label: 'Best at', value: 'Being picked first' },
      ],
    },
  },
  {
    slug: 'big-hug-mug',
    name: 'Big Hug Mug',
    type: 'mugs',
    price: 32,
    stock: 4,
    photo: 2,
    line: 'A 500ml mug for soup, hot chocolate or very long phone calls. Two hands recommended.',
    nicknames: { Sunshine: 'the Optimist', Raspberry: 'the Show-off', Liquorice: 'the Night Owl' },
    details: [
      { title: 'Made of', text: 'Stoneware with a wide, rounded belly. Thrown, trimmed and handled by hand.' },
      { title: 'Size', text: '10cm tall, 11cm across. Holds 500ml.' },
      delivery,
      returns,
    ],
    highlight: {
      title: 'The two-hand belly',
      text: 'A rounder, wider body so both hands fit around it. Built for cold mornings and sofa evenings.',
      facts: [
        { label: 'Made of', value: 'Stoneware, fired to 1,240°C' },
        { label: 'Holds', value: '500ml' },
        { label: 'Best at', value: 'Warming both hands' },
      ],
    },
  },
  {
    slug: 'sunny-side-plate',
    name: 'Sunny Side Plate',
    type: 'plates',
    price: 28,
    stock: 12,
    photo: 3,
    line: 'A 26cm dinner plate with a little lip to stop peas escaping. Toast never looked so smug.',
    nicknames: { Sunshine: 'the Optimist', Raspberry: 'the Show-off', Liquorice: 'the Night Owl' },
    details: [
      { title: 'Made of', text: 'Stoneware, thrown flat and lifted by hand. Glazed on top, bare and smooth underneath.' },
      { title: 'Size', text: '26cm across, 2.5cm deep.' },
      delivery,
      returns,
    ],
    highlight: {
      title: 'The pea fence',
      text: 'A raised, rolled rim that keeps sauce on the plate and peas in line. Small detail, big dinner.',
      facts: [
        { label: 'Made of', value: 'Stoneware, fired to 1,240°C' },
        { label: 'Size', value: '26cm across' },
        { label: 'Best at', value: 'Keeping peas in line' },
      ],
    },
  },
  {
    slug: 'second-helping-plate',
    name: 'Second Helping Plate',
    type: 'plates',
    price: 22,
    stock: 0,
    photo: 4,
    line: 'A 20cm side plate for cake, crumpets and second helpings. Nobody is counting.',
    nicknames: { Sunshine: 'the Optimist', Raspberry: 'the Show-off', Liquorice: 'the Night Owl' },
    details: [
      { title: 'Made of', text: 'Stoneware, thrown and trimmed by hand. Glazed on top, bare underneath.' },
      { title: 'Size', text: '20cm across, 2cm deep.' },
      delivery,
      returns,
    ],
    highlight: {
      title: 'Cake-sized',
      text: 'Big enough for a proper slice, small enough to pretend it was a small one.',
      facts: [
        { label: 'Made of', value: 'Stoneware, fired to 1,240°C' },
        { label: 'Size', value: '20cm across' },
        { label: 'Best at', value: 'Seconds' },
      ],
    },
  },
  {
    slug: 'show-off-vase',
    name: 'Show-Off Vase',
    type: 'vases',
    price: 58,
    stock: 6,
    photo: 5,
    line: 'A 28cm vase with a fat belly and a skinny neck. Supermarket tulips, suddenly fancy.',
    nicknames: { Sunshine: 'the Optimist', Raspberry: 'the Show-off', Liquorice: 'the Night Owl' },
    details: [
      { title: 'Made of', text: 'Stoneware, thrown in two parts and joined by hand. Watertight glaze inside.' },
      { title: 'Size', text: '28cm tall, 16cm across at the belly.' },
      delivery,
      returns,
    ],
    highlight: {
      title: 'The skinny neck',
      text: 'A narrow neck holds stems upright, so even three tulips stand like they mean it.',
      facts: [
        { label: 'Made of', value: 'Stoneware, fired to 1,240°C' },
        { label: 'Size', value: '28cm tall' },
        { label: 'Best at', value: 'Making cheap flowers look rich' },
      ],
    },
  },
  {
    slug: 'bud-buddy-vase',
    name: 'Bud Buddy Vase',
    type: 'vases',
    price: 34,
    stock: 2,
    photo: 6,
    line: 'A 12cm bud vase for one stem, one sprig or one very good pen. Windowsill-sized joy.',
    nicknames: { Sunshine: 'the Optimist', Raspberry: 'the Show-off', Liquorice: 'the Night Owl' },
    details: [
      { title: 'Made of', text: 'Stoneware, thrown off the hump. Watertight glaze inside.' },
      { title: 'Size', text: '12cm tall, 8cm across.' },
      delivery,
      returns,
    ],
    highlight: {
      title: 'One-stem wonder',
      text: 'A tiny opening that holds a single stem straight. Pick a daisy, make an event of it.',
      facts: [
        { label: 'Made of', value: 'Stoneware, fired to 1,240°C' },
        { label: 'Size', value: '12cm tall' },
        { label: 'Best at', value: 'Windowsills' },
      ],
    },
  },
]

export const typeLabel: Record<ProductType, string> = { mugs: 'Mugs', plates: 'Plates', vases: 'Vases' }

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug)

/** Card copy for availability — honest, short, in the site's voice. */
export function stockLabel(stock: number) {
  if (stock <= 0) return 'Sold out'
  if (stock <= 5) return `Only ${stock} left`
  return 'In stock'
}
