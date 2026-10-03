// OpusKit section — Location: address, hours, how to get there, one exterior photo, and a real map link.
export function LocationSection({ title, address, hours, notes, mapUrl, image, alt, phone }: { phone?: string; title: string; address: string; hours: string[]; notes?: string; mapUrl: string; image: string; alt: string }) {
  return (
    <section id="visit" data-reveal className="scroll-mt-24 px-4 py-32 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-12">
        <img src={image} alt={alt} loading="lazy" className="aspect-[4/3] w-full rounded-(--radius-media) object-cover md:col-span-7" />
        <div className="md:col-span-4 md:col-start-9">
          <h2 className="type-heading">{title}</h2>
          <address className="type-body mt-5 whitespace-pre-line not-italic">{address}</address>
          <ul className="type-body mt-5 space-y-1 text-(--color-muted)">{hours.map((h) => <li key={h}>{h}</li>)}</ul>
          {notes && <p className="type-body mt-5 text-(--color-muted)">{notes}</p>}
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={mapUrl} target="_blank" rel="noreferrer" className="type-body inline-flex min-h-11 items-center rounded-(--radius-button) border border-(--color-text) px-5 transition-colors hover:bg-(--color-surface)">Open in maps</a>
            {phone && <a href={`tel:${phone.replace(/\s/g, '')}`} className="type-body inline-flex min-h-11 items-center rounded-(--radius-button) border border-(--color-border) px-5 transition-colors hover:bg-(--color-surface)">Call {phone}</a>}
          </div>
        </div>
      </div>
    </section>
  )
}
