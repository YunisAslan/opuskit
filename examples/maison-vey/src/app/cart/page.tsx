import type { Metadata } from 'next'
import { CartView } from './CartView'

export const metadata: Metadata = { title: 'Your bag' }

// Cart: the bag itself, then Product Grid
export default function CartPage() {
  return <CartView />
}
