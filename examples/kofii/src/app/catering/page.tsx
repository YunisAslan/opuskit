import type { Metadata } from 'next'
import { PageHeader } from '@/components/PageHeader'
import { PinnedStory } from '@/components/PinnedStory'
import { DemoForm, Field } from '@/components/DemoForm'
import { site } from '@/config/site'

export const metadata: Metadata = { title: 'Catering and private events' }

const chapters = [
  { title: 'Tell us the day', text: 'Send the date, the number of guests and where it is. We reply within one working day.', photo: 4 },
  { title: 'We plan the menu', text: 'Pick from the full menu or ask for something seasonal. Hot, iced, matcha and cake travel well.', photo: 3 },
  { title: 'We bring the bar', text: 'Two baristas, a grinder and an espresso machine. Set up an hour before, packed away after.', photo: 2 },
]

export default function CateringPage() {
  return (
    <>
      <PageHeader lines={['Catering and', 'private events']} mobile={['Catering', 'and private', 'events']}>
        <p>A coffee bar for office mornings, weddings and launches, from 20 to 200 guests. Or book the whole shop after hours for up to 28.</p>
      </PageHeader>
      <section aria-label="How it works">
        <PinnedStory chapters={chapters} />
      </section>
      <section aria-labelledby="inquire-title" className="container-text grid gap-12 py-32 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="inquire-title" className="type-statement">Ask about a date</h2>
          <p className="mt-6 text-lg">
            Or email <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <DemoForm submit="Send inquiry" done="Thanks. We will reply within one working day with dates and a quote.">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Name" name="name" required autoComplete="name" />
              <Field label="Email" name="email" type="email" required autoComplete="email" />
              <Field label="Date" name="date" type="date" required />
              <Field label="Guests" name="guests" type="number" min={1} required />
            </div>
            <Field label="Kind of event" name="kind" defaultValue="Office morning">
              {['Office morning', 'Wedding', 'Launch or party', 'Private hire of the shop', 'Something else'].map((o) => <option key={o}>{o}</option>)}
            </Field>
            <Field label="Tell us more" name="details" type="textarea" />
          </DemoForm>
        </div>
      </section>
    </>
  )
}
