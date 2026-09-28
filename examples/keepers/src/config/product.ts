import type { AssetKey } from './assets'

export const packs: { name: string; price: string; per: string; note: string; image: AssetKey; recommended?: boolean; includes: string[] }[] = [
  {
    name: 'Four-pack',
    price: '€12',
    per: '€3.00 a can',
    note: 'One-off. Try it before you commit.',
    image: 'canDetail',
    includes: ['4 cans, 330 ml', 'Ships in a recycled-card sleeve', 'Delivery €4, free over €30'],
  },
  {
    name: 'Twelve every month',
    price: '€32',
    per: '€2.67 a can',
    note: 'Pause, skip or cancel from your account.',
    image: 'canFloat',
    recommended: true,
    includes: ['12 cans, 330 ml', 'Free delivery', 'First box ships 3 November', 'Skip any month'],
  },
  {
    name: 'Office case',
    price: '€112',
    per: '€2.33 a can',
    note: 'Invoiced monthly. For teams of 10 or more.',
    image: 'glassPour',
    includes: ['48 cans, 330 ml', 'Free delivery, one address', 'VAT invoice', 'Chiller-shelf card'],
  },
]

export const details = [
  { label: 'Material', value: '68%', unit: 'recycled', text: 'Aluminium can, BPA-free lining. Recycled again without loss of quality.' },
  { label: 'Size', value: '330', unit: 'ml', text: '115 mm tall, 66 mm across. Fits a standard cup holder and fridge door.' },
  { label: 'Caffeine', value: '45', unit: 'mg', text: 'About half an espresso. Enough to lift an afternoon, not enough to wreck the night.' },
  { label: 'Energy', value: '35', unit: 'kcal', text: '6 g cane sugar per can. A cola the same size carries 35 g.' },
]
