import type { Metadata } from 'next'
import { PageHeader } from '@/components/PageHeader'
import { locations, site } from '@/config/site'

export const metadata: Metadata = { title: 'Locations' }

export default function LocationsPage() {
  return (
    <>
      <PageHeader lines={['Where to', 'find us']}>
        <p>One room to sit in, one kiosk for the walk to work.</p>
      </PageHeader>
      <section aria-label="Locations" className="container-text grid gap-6 pb-32 md:grid-cols-2" data-reveal="stagger">
        {locations.map((l) => (
          <article key={l.name} className="grid content-start gap-4 rounded-card bg-surface p-8 md:p-12">
            <h2 className="type-statement">{l.name}</h2>
            <address className="text-lg not-italic">
              {l.address.map((a) => <span key={a} className="block">{a}</span>)}
            </address>
            <p>{l.note}</p>
            <p className="text-muted">{l.hours}</p>
            <div className="mt-4">
              <a href={l.mapHref} target="_blank" rel="noopener" className="btn">Open in maps</a>
            </div>
          </article>
        ))}
      </section>
      <section aria-labelledby="hours-title" className="container-text pb-32">
        <h2 id="hours-title" className="type-heading">Old Town opening hours</h2>
        <dl className="mt-6 grid max-w-md gap-2">
          {site.hours.map((h) => (
            <div key={h.days} className="flex justify-between gap-4 border-b border-border pb-2">
              <dt>{h.days}</dt>
              <dd className="tabular-nums">{h.time}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  )
}
