// OpusKit section — Location: address, hours, how to get there, one exterior photo, and a real map link. `media`: side
// (photo beside the facts), full (a wide photo, the facts in a row under it) or over (the facts on a card over the photo).
type P = { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; media?: 'side' | 'full' | 'over'; title: string; address: string; hours: string[]; notes?: string; mapUrl: string; image: string; alt: string }
export function LocationSection({ tone, media = 'side', title, address, hours, notes, mapUrl, image, alt }: P) {
  const map = <a href={mapUrl} target="_blank" rel="noreferrer" className="type-body inline-block rounded-(--radius-button) border border-(--color-text) px-5 py-2.5">Open in maps</a>
  const facts = <>
    <address className="type-body whitespace-pre-line not-italic">{address}</address>
    <ul className="type-body space-y-1 text-(--color-muted)">{hours.map((h) => <li key={h}>{h}</li>)}</ul>
    {notes && <p className="type-body text-(--color-muted)">{notes}</p>}
  </>
  if (media === 'over') return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="relative isolate px-(--gutter) py-(--section-y)">
      <img src={image} alt={alt} loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div className="mx-auto flex max-w-(--container) justify-end">
        <div className="w-full max-w-md space-y-5 rounded-(--radius-card) bg-(--color-background) p-8 shadow-(--shadow-card)"><h2 className="type-heading">{title}</h2>{facts}{map}</div>
      </div>
    </section>
  )
  if (media === 'full') return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <h2 className="type-heading">{title}</h2>
        <img src={image} alt={alt} loading="lazy" className="mt-8 aspect-(--ratio-media) w-full rounded-(--radius-media) object-cover" />
        <div className="mt-8 grid gap-6 md:grid-cols-4 [&>*]:md:col-span-1">{facts}<div>{map}</div></div>
      </div>
    </section>
  )
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto grid max-w-(--container) gap-10 md:grid-cols-12">
        <img src={image} alt={alt} loading="lazy" className="aspect-[4/3] w-full rounded-(--radius-media) object-cover md:col-span-7" />
        <div className="space-y-5 md:col-span-4 md:col-start-9"><h2 className="type-heading">{title}</h2>{facts}<div className="pt-1">{map}</div></div>
      </div>
    </section>
  )
}
