import type { ReactNode } from 'react'
// OpusKit section — Location: address, hours, how to get there, one exterior photo, and a real map link.
export function LocationSection({ id, title, address, hours, notes, mapUrl, image, alt, phone }: { id?: string; title: ReactNode; address: string; hours: string[]; notes?: string; mapUrl: string; image: string; alt: string; phone?: { label: string; href: string } }) {
  return (
    <section id={id} className="scroll-mt-16 px-5 py-30 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-12 md:items-end">
        <div className="overflow-hidden rounded-(--radius-media) md:col-span-7">
          <img data-reveal="clip" src={image} alt={alt} loading="lazy" className="aspect-[4/5] w-full object-cover md:aspect-[4/3]" />
        </div>
        <div data-reveal="rise" className="md:col-span-4 md:col-start-9">
          <h2 className="type-display flex items-center gap-5 [font-size:clamp(2.2rem,4vw,3.6rem)]">{title}</h2>
          <address className="type-body mt-6 whitespace-pre-line not-italic">{address}</address>
          <ul className="type-body mt-5 space-y-1 text-(--color-muted)">{hours.map((h) => <li key={h}>{h}</li>)}</ul>
          {notes && <p className="type-body mt-5 text-(--color-muted)">{notes}</p>}
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={mapUrl} target="_blank" rel="noreferrer" className="type-utility inline-flex h-11 items-center rounded-(--radius-button) border border-(--color-text) px-5 transition-colors duration-150 hover:bg-(--color-text) hover:text-(--color-background) focus-visible:bg-(--color-text) focus-visible:text-(--color-background)">Open in maps</a>
            {phone && <a href={phone.href} className="type-utility inline-flex h-11 items-center rounded-(--radius-button) border border-(--color-border) px-5 transition-colors duration-150 hover:border-(--color-text)">Call {phone.label}</a>}
          </div>
        </div>
      </div>
    </section>
  )
}
