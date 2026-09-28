import type { Metadata } from 'next'
import Link from 'next/link'
import TextPage from '@/components/TextPage'
import { Field, FormShell } from '@/components/Form'

export const metadata: Metadata = { title: 'Gift cards' }

const amounts = ['€250', '€500', '€1,000', '€2,500']

export default function GiftCards() {
  return (
    <TextPage title="Gift cards" intro="For a day at the garage, a jacket, or a deposit on a car. Sent by email, valid for three years.">
      <FormShell submit="Continue to payment" done="Thank you. The card is on its way to their inbox.">
        <fieldset>
          <legend className="type-utility mb-4 text-muted">Amount</legend>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {amounts.map((a, i) => (
              <label key={a} className="flex min-h-11 cursor-pointer items-center justify-center border border-muted has-[:checked]:border-accent has-[:checked]:text-accent">
                <input type="radio" name="amount" value={a} defaultChecked={i === 1} className="sr-only" />
                {a}
              </label>
            ))}
          </div>
        </fieldset>
        <Field label="Their name" name="to" autoComplete="off" />
        <Field label="Their email" name="email" type="email" autoComplete="off" />
        <Field label="A note" name="note" required={false} textarea />
      </FormShell>
      <p className="type-utility mt-12 text-muted">Questions about a card you received? See the <Link href="/faq">FAQ</Link>.</p>
    </TextPage>
  )
}
