import { assets } from '@/config/assets'

export const EMAIL = 'hello@saintashe.ge'
export const ORDERS = 'orders@saintashe.ge'

export type Category = 'Outerwear' | 'Clothing' | 'Accessories'
export type ShopProduct = {
  slug: string; name: string; price: number; category: Category; material: string; note: string
  image: string; alt: string; sizes: string[]; stock: 'in' | 'few' | 'out'
}

const CLOTHES = ['XS', 'S', 'M', 'L', 'XL']
const BOOTS = ['37', '38', '39', '40', '41', '42', '43', '44']
const ONE = ['One size']

export const products: ShopProduct[] = [
  { slug: 'narikala-coat', name: 'Narikala coat', price: 640, category: 'Outerwear', material: 'Waxed wool, horn buttons', note: 'Long, heavy and dry in the rain. The wax goes matt where you wear it most.', image: assets.product1.src, alt: assets.product1.alt, sizes: CLOTHES, stock: 'in' },
  { slug: 'sololaki-rider', name: 'Sololaki rider', price: 890, category: 'Outerwear', material: 'Vegetable-tanned calf leather', note: 'Stiff on the first day, yours by the hundredth. Cut short in the body, long in the arm.', image: assets.product2.src, alt: assets.product2.alt, sizes: CLOTHES, stock: 'in' },
  { slug: 'heavy-tee', name: 'Heavy tee', price: 85, category: 'Clothing', material: '300 g cotton jersey', note: 'A tee that holds its shape. Dropped shoulder, wide neck rib, washed once before it leaves us.', image: assets.product3.src, alt: assets.product3.alt, sizes: CLOTHES, stock: 'in' },
  { slug: 'vake-trouser', name: 'Vake trouser', price: 280, category: 'Clothing', material: 'Dense wool twill', note: 'High in the waist and wide all the way down. Pressed crease, unfinished hem to cut to your length.', image: assets.product4.src, alt: assets.product4.alt, sizes: CLOTHES, stock: 'in' },
  { slug: 'slouch-boot', name: 'Slouch boot', price: 520, category: 'Accessories', material: 'Soft calf leather, stacked heel', note: 'Pulls on and falls in folds at the ankle. Resoled by us, for as long as you keep them.', image: assets.product5.src, alt: assets.product5.alt, sizes: BOOTS, stock: 'few' },
  { slug: 'round-bag', name: 'Round bag', price: 340, category: 'Accessories', material: 'Black bridle leather', note: 'One round body, one long strap, no hardware on show. Fits a book, keys and a bottle of water.', image: assets.product6.src, alt: assets.product6.alt, sizes: ONE, stock: 'in' },
  { slug: 'rib-turtleneck', name: 'Rib turtleneck', price: 190, category: 'Clothing', material: 'Merino wool, 2×2 rib', note: 'Close at the neck, close at the wrist. Worn alone or under the coat from October to April.', image: assets.product7.src, alt: assets.product7.alt, sizes: CLOTHES, stock: 'in' },
  { slug: 'waxed-cap', name: 'Waxed cap', price: 65, category: 'Accessories', material: 'Waxed cotton, leather strap', note: 'Six panels, no logo. This run has gone; the next is cut in November.', image: assets.product8.src, alt: assets.product8.alt, sizes: ONE, stock: 'out' },
]

export const bySlug = (slug: string) => products.find((p) => p.slug === slug)
export const euro = (n: number) => `€${n}`
