import type { Metadata } from 'next'
import TextPage from '@/components/TextPage'

export const metadata: Metadata = { title: 'Terms of service' }

export default function Terms() {
  return (
    <TextPage title="Terms of service" intro="Last updated 28 September 2026.">
      <h2>Using this site</h2>
      <p>The films, photographs and words here belong to CHEEKY. You are welcome to share links; please ask before reusing the images.</p>
      <h2>Listings</h2>
      <p>We describe every car as accurately as we can, including faults we know about. Prices include VAT where it applies and may change until a deposit is paid.</p>
      <h2>Deposits and sales</h2>
      <p>A holding deposit reserves a car for seven days and is refunded in full if you decide not to go ahead. A sale is complete when the balance is paid and the car is collected or delivered.</p>
      <h2>Gift cards</h2>
      <p>Gift cards are valid for three years from purchase and cannot be exchanged for cash.</p>
      <h2>Liability</h2>
      <p>Nothing in these terms limits your rights as a consumer. If something goes wrong, write to us first and we will try to put it right.</p>
    </TextPage>
  )
}
