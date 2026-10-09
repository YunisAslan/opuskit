import type { Metadata } from 'next'
import { Bag } from '@/components/cart/Bag'
import { CartGrid } from '@/components/cart/CartGrid'

export const metadata: Metadata = { title: 'Your bag' }

export default function CartPage() {
  return (
    <>
      <Bag />
      <CartGrid />
    </>
  )
}
