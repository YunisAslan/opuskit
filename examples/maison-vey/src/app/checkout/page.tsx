import type { Metadata } from 'next'
import { CheckoutView } from './CheckoutView'

export const metadata: Metadata = { title: 'Checkout' }

// Checkout: no composed sections — written from the page brief: collect payment and shipping with little friction.
export default function CheckoutPage() {
  return <CheckoutView />
}
