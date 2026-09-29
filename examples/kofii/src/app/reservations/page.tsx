import type { Metadata } from 'next'
import { PageHeader } from '@/components/PageHeader'
import { DemoForm, Field } from '@/components/DemoForm'
import { MediaAsset } from '@/components/MediaAsset'
import { site } from '@/config/site'

export const metadata: Metadata = { title: 'Reservations' }

const times = ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00']

export default function ReservationsPage() {
  return (
    <>
      <PageHeader lines={['Book a table']} mobile={['Book', 'a table']}>
        <p>Most tables are walk-in. Book ahead for weekend mornings, or if you are five or more.</p>
      </PageHeader>

      {/* Reservation */}
      <section id="book" aria-label="Reservation" className="container-text grid gap-16 pb-32 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <DemoForm submit="Request table" done="Thanks. We will confirm your table by text within the hour.">
            <div className="grid gap-6 sm:grid-cols-3">
              <Field label="Date" name="date" type="date" required />
              <Field label="Time" name="time" required defaultValue="9:00">
                {times.map((t) => <option key={t}>{t}</option>)}
              </Field>
              <Field label="Guests" name="guests" required defaultValue="2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <option key={n}>{n}</option>)}
              </Field>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Name" name="name" required autoComplete="name" />
              <Field label="Phone" name="phone" type="tel" required autoComplete="tel" />
            </div>
            <Field label="Anything we should know? (optional)" name="notes" type="textarea" />
          </DemoForm>
        </div>
        <aside className="grid content-start gap-8 lg:col-span-4 lg:col-start-9" data-reveal="stagger">
          <div>
            <h2 className="type-heading">Opening hours</h2>
            <dl className="mt-4 grid gap-2">
              {site.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-4 border-b border-border pb-2">
                  <dt>{h.days}</dt>
                  <dd className="tabular-nums">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2 className="type-heading">Groups</h2>
            <p className="mt-4">Tables hold up to eight. For more, see catering and private events. We keep a booked table for fifteen minutes.</p>
          </div>
          <div>
            <h2 className="type-heading">Rather call?</h2>
            <a href={site.phoneHref} className="mt-4 inline-flex min-h-11 items-center text-lg font-semibold underline">{site.phone}</a>
          </div>
        </aside>
      </section>

      {/* Location */}
      <section aria-labelledby="location-title" className="border-t border-border py-32">
        <div className="container-text grid items-center gap-12 md:grid-cols-2">
          <MediaAsset id="exterior" className="aspect-[4/5] md:aspect-[4/3]" sizes="(min-width: 768px) 50vw, 100vw" reveal="clip" />
          <div data-reveal="stagger">
            <h2 id="location-title" className="type-statement">Find us</h2>
            <address className="mt-8 text-lg not-italic">
              {site.address.map((l) => <span key={l} className="block">{l}</span>)}
            </address>
            <p className="mt-4 max-w-[44ch] text-muted">{site.transit}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={site.mapHref} className="btn" target="_blank" rel="noopener">Open in maps</a>
              <a href={site.phoneHref} className="btn btn-secondary">Call the shop</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
