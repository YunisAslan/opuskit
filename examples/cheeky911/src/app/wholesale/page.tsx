import type { Metadata } from 'next'
import TextPage from '@/components/TextPage'
import { Field, FormShell } from '@/components/Form'

export const metadata: Metadata = { title: 'Wholesale' }

export default function Wholesale() {
  return (
    <TextPage title="Wholesale" intro="We supply the driving wardrobe and the collection films to a small number of independent dealers and outfitters.">
      <h2>Terms</h2>
      <ul>
        <li>Opening order from €6,000, then from €2,500.</li>
        <li>Net 30 days after a first paid order.</li>
        <li>One stockist per city, so a collection stays special.</li>
        <li>Films and photographs licensed for your own showroom and channels.</li>
      </ul>
      <h2>Apply</h2>
      <p>Tell us about the shop and the people who come in. We reply within a week, and visit before we say yes.</p>
      <div className="mt-8">
        <FormShell submit="Send application" done="Thank you. We will be in touch within a week.">
          <Field label="Your name" name="name" autoComplete="name" />
          <Field label="Business" name="business" autoComplete="organization" />
          <Field label="Email" name="email" type="email" autoComplete="email" />
          <Field label="City" name="city" autoComplete="address-level2" />
          <Field label="About the shop" name="about" textarea />
        </FormShell>
      </div>
    </TextPage>
  )
}
