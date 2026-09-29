import type { Metadata } from 'next'
import { PageHeader } from '@/components/PageHeader'
import { DemoForm, Field } from '@/components/DemoForm'

export const metadata: Metadata = { title: 'Gift cards' }

export default function GiftCardsPage() {
  return (
    <>
      <PageHeader lines={['Give a', 'coffee']}>
        <p>A gift card sent by email. Good at both locations and for online orders. It never expires.</p>
      </PageHeader>
      <section aria-label="Buy a gift card" className="container-text max-w-3xl pb-32">
        <DemoForm submit="Buy gift card" done="Done. The gift card is on its way to their inbox.">
          <fieldset>
            <legend className="type-heading mb-4">Amount</legend>
            <div className="flex flex-wrap gap-4">
              {['15', '25', '50', '100'].map((a, i) => (
                <label key={a} className="flex min-h-12 min-w-20 cursor-pointer items-center justify-center rounded-button border border-muted bg-surface px-6 font-semibold tabular-nums has-[:checked]:border-primary has-[:checked]:bg-secondary">
                  <input type="radio" name="amount" value={a} defaultChecked={i === 1} className="sr-only" />
                  {a}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Their name" name="to" required />
            <Field label="Their email" name="toEmail" type="email" required />
            <Field label="Your name" name="from" required autoComplete="name" />
            <Field label="Your email" name="fromEmail" type="email" required autoComplete="email" />
          </div>
          <Field label="A short message (optional)" name="message" type="textarea" />
        </DemoForm>
      </section>
    </>
  )
}
