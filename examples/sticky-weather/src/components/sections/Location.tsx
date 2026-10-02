// OpusKit section — Location: address, hours, how to get there, one photo of the place, and real map and phone links.
import { ClipImage } from '@/components/motion'

export function LocationSection({ title, address, hours, notes, mapUrl, phone, image, alt, width, height }: {
  title: string; address: string; hours: string[]; notes?: string; mapUrl: string; phone?: { label: string; href: string }; image: string; alt: string; width?: number; height?: number
}) {
  return (
    <section className="section-y px-5 md:px-6">
      <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-12">
        <ClipImage src={image} alt={alt} width={width} height={height} drift className="aspect-[4/3] w-full md:col-span-7" />
        <div className="md:col-span-4 md:col-start-9">
          <h2 className="type-heading">{title}</h2>
          <address className="type-body mt-5 whitespace-pre-line not-italic">{address}</address>
          <ul className="type-body mt-5 space-y-1 text-(--color-muted)">{hours.map((h) => <li key={h}>{h}</li>)}</ul>
          {notes && <p className="type-body mt-5 text-(--color-muted)">{notes}</p>}
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={mapUrl} target="_blank" rel="noreferrer" className="type-body inline-flex min-h-12 items-center rounded-(--radius-button) border border-(--color-text) px-5 transition-colors hover:bg-(--color-text) hover:text-(--color-background) focus-visible:bg-(--color-text) focus-visible:text-(--color-background)">Open in maps</a>
            {phone && <a href={phone.href} className="type-body inline-flex min-h-12 items-center rounded-(--radius-button) border border-(--color-text) px-5 transition-colors hover:bg-(--color-text) hover:text-(--color-background) focus-visible:bg-(--color-text) focus-visible:text-(--color-background)">Call {phone.label}</a>}
          </div>
        </div>
      </div>
    </section>
  )
}
