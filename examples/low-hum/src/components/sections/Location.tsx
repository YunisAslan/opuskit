// OpusKit section — Location, "side" design fitted to Low Hum: the way in (a 4:5 photo that drifts slowly in its
// frame) beside the address, hours, how to get here, and two big tap targets: open the map, call us.
import type { ReactNode } from 'react'
import { MediaAsset } from '@/components/site/MediaAsset'
import { Reveal } from '@/components/site/Reveal'

export function LocationSection({ heading, address, hours, notes, mapUrl, mapLabel, phone, callLabel }: {
  media?: 'side'; heading: ReactNode; address: string; hours: string[]; notes?: string; mapUrl: string; mapLabel: string; phone: string; callLabel: string
}) {
  return (
    <section id="find-us" className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto grid max-w-(--container) items-center gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-6 lg:col-span-5">
          <MediaAsset id="location" drift aspect="4 / 5" sizes="(min-width:768px) 500px, 100vw" />
        </div>
        <Reveal className="md:col-span-6 md:col-start-7 lg:col-span-6 lg:col-start-7">
          {heading}
          <address className="type-heading mt-10 whitespace-pre-line not-italic [font-size:clamp(1.4rem,2.2vw,1.9rem)]">{address}</address>
          <ul className="type-body mt-6 space-y-1 text-(--color-muted)">{hours.map((h) => <li key={h}>{h}</li>)}</ul>
          {notes && <p className="type-body mt-6 max-w-[46ch]">{notes}</p>}
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={mapUrl} target="_blank" rel="noreferrer" className="type-utility inline-flex h-13 items-center rounded-(--radius-button) bg-(--color-primary) px-7 text-(--color-background) transition-colors duration-150 outline-none [font-size:0.9375rem] hover:bg-(--color-muted) focus-fill">{mapLabel}</a>
            <a href={`tel:${phone.replace(/\s/g, '')}`} className="type-utility inline-flex h-13 items-center rounded-(--radius-button) border border-(--color-text) px-7 text-(--color-text) transition-colors duration-150 outline-none [font-size:0.9375rem] hover:bg-(--color-text) hover:text-(--color-background) focus-fill">{callLabel}</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
