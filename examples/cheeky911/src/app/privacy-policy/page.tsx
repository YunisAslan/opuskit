import type { Metadata } from 'next'
import TextPage from '@/components/TextPage'

export const metadata: Metadata = { title: 'Privacy policy' }

export default function PrivacyPolicy() {
  return (
    <TextPage title="Privacy policy" intro="Last updated 28 September 2026.">
      <h2>What we collect</h2>
      <p>Your name and email when you write to us, create an account or buy a gift card. If you view or buy a car, we also keep your address and the documents the sale requires.</p>
      <h2>Why</h2>
      <p>To answer you, arrange viewings, complete a sale and send the collection letter if you asked for it. Nothing else.</p>
      <h2>Who sees it</h2>
      <p>The two of us, our accountant, and the transport and payment companies needed to finish a sale. We never sell or rent your details.</p>
      <h2>How long we keep it</h2>
      <p>Enquiries for two years. Sale records for as long as the law requires, currently ten years.</p>
      <h2>Your rights</h2>
      <p>You can ask to see, correct or delete what we hold about you. Write to <a href="mailto:hello@cheeky911.com">hello@cheeky911.com</a> and we will reply within a month.</p>
    </TextPage>
  )
}
