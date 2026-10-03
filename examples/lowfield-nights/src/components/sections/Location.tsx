// OpusKit section — Location: address, hours, how to get there, one exterior photo, and a real map link.
export function LocationSection({ title, address, hours, notes, mapUrl, image, alt }: { title: string; address: string; hours: string[]; notes?: string; mapUrl: string; image: string; alt: string }) {
  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-12">
        <img src={image} alt={alt} loading="lazy" className="aspect-[4/3] w-full rounded-(--radius-media) object-cover md:col-span-7" />
        <div className="md:col-span-4 md:col-start-9">
          <h2 className="type-heading">{title}</h2>
          <address className="type-body mt-5 whitespace-pre-line not-italic">{address}</address>
          <ul className="type-body mt-5 space-y-1 text-(--color-muted)">{hours.map((h) => <li key={h}>{h}</li>)}</ul>
          {notes && <p className="type-body mt-5 text-(--color-muted)">{notes}</p>}
          <a href={mapUrl} target="_blank" rel="noreferrer" className="type-body mt-6 inline-block rounded-(--radius-button) border border-(--color-text) px-5 py-2.5">Open in maps</a>
        </div>
      </div>
    </section>
  )
}
