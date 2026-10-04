// OpusKit section — Location: address, hours, how to get there, one exterior photo, and a real map link.
export function LocationSection({ id, title, address, hours, notes, mapUrl, phone, image, alt }: { id?: string; title: string; address: string; hours: string[]; notes?: string; mapUrl: string; phone?: string; image: string; alt: string }) {
  return (
    <section id={id} className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-12">
        <img src={image} alt={alt} loading="lazy" className="aspect-[4/3] w-full rounded-(--radius-media) border-2 border-(--color-border) object-cover md:col-span-7" />
        <div className="md:col-span-4 md:col-start-9">
          <h2 className="type-heading">{title}</h2>
          <address className="type-body mt-5 whitespace-pre-line not-italic">{address}</address>
          <ul className="type-body mt-5 space-y-1 text-(--color-muted)">{hours.map((h) => <li key={h}>{h}</li>)}</ul>
          {notes && <p className="type-body mt-5 text-(--color-muted)">{notes}</p>}
          {phone && <a href={`tel:${phone.replace(/\s/g, '')}`} className="type-body mt-5 block underline underline-offset-4">{phone}</a>}
          <a href={mapUrl} target="_blank" rel="noreferrer" className="type-utility mt-6 inline-flex min-h-12 items-center rounded-(--radius-button) bg-(--color-surface) px-6 uppercase [font-size:1.05rem] border-2 border-(--color-border) shadow-(--shadow-card) transition-[transform,box-shadow] duration-150 active:translate-x-1 active:translate-y-1 active:shadow-none motion-reduce:active:translate-0">Open in maps</a>
        </div>
      </div>
    </section>
  )
}
