// OpusKit section — Location: address, hours, how to get there, one exterior photo, and a real map link.
// Fennwood: the photo comes in as a node (through the asset layer); tap-to-call beside tap-to-map.
import type { ReactNode } from 'react'

export function LocationSection({ id, title, address, hours, notes, mapUrl, phone, media }: { id?: string; title: ReactNode; address: string; hours: string[]; notes?: string; mapUrl: string; phone?: string; media: ReactNode }) {
  return (
    <section id={id} className="px-5 py-(--section-pad) md:px-6">
      <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-12">
        <div className="md:col-span-7">{media}</div>
        <div className="md:col-span-5 md:col-start-8">
          {title}
          <address className="type-body mt-6 whitespace-pre-line not-italic">{address}</address>
          <ul className="type-body mt-5 space-y-1 text-(--color-muted)">{hours.map((h) => <li key={h}>{h}</li>)}</ul>
          {notes && <p className="type-body mt-5 text-(--color-muted)">{notes}</p>}
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={mapUrl} target="_blank" rel="noreferrer" className="type-body inline-flex h-11 items-center rounded-(--radius-button) border border-(--color-text) px-5 transition-colors duration-150 hover:bg-(--color-secondary) focus-visible:bg-(--color-secondary)">Open in maps</a>
            {phone && <a href={`tel:${phone.replace(/\s/g, '')}`} className="type-body inline-flex h-11 items-center rounded-(--radius-button) px-5 transition-colors duration-150 hover:bg-(--color-secondary) focus-visible:bg-(--color-secondary)">Call {phone}</a>}
          </div>
        </div>
      </div>
    </section>
  )
}
