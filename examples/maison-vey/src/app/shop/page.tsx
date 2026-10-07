import type { Metadata } from 'next'
import { ShopView } from './ShopView'

export const metadata: Metadata = { title: 'Shop', description: 'Five scents made by hand in Sète, and a discovery set of all five.' }

// Shop: Product Grid → Product Highlight → Collection → FAQ
export default function ShopPage() {
  return <ShopView />
}
