import type { Metadata } from 'next'
import { CheckoutForm } from '@/components/site/CheckoutForm'
import { PageHeader } from '@/components/site/PageHeader'

export const metadata: Metadata = { title: 'Checkout', description: 'Delivery and payment. Orders open in spring.' }

export default function Checkout() {
  return (
    <>
      <PageHeader title="Checkout" line="Three short steps: who you are, where it goes, how you pay." />
      <CheckoutForm />
    </>
  )
}
