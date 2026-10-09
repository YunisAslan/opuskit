// OpusKit section — Location, "side", fitted to Kelp Line: the way in as visitors arrive beside the address, hours and
// how to get there, with a real map link. The photo keeps the shot list's 3:4; its caption sits under it. Phones:
// stacked, with tap-to-map and tap-to-call as full-width buttons.
import { MapPin, Phone } from 'lucide-react'
import { MediaAsset } from '@/components/media/MediaAsset'
import { buttonVariants } from '@/components/ui/button'

type P = { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; title: string; address: string; hours: string[]; notes?: string; mapUrl: string; phone?: string; alt: string; caption?: string }

export function LocationSection({ tone, title, address, hours, notes, mapUrl, phone, alt, caption }: P) {
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="section-pad">
      <div className="frame grid gap-10 md:grid-cols-12 md:items-end md:gap-x-(--gutter)">
        <figure className="md:col-span-5">
          <MediaAsset id="location" alt={alt} ratio="var(--ratio-card)" mobileRatio="4 / 5" reveal="clip" sizes="(min-width: 768px) 40vw, 100vw" />
          {caption && <figcaption className="type-caption mt-3 text-(--color-muted)">{caption}</figcaption>}
        </figure>
        <div data-fade className="space-y-8 md:col-span-5 md:col-start-8 md:pb-10">
          <h2 className="type-heading">{title}</h2>
          <address className="type-lead whitespace-pre-line not-italic">{address}</address>
          <div>
            <h3 className="type-utility text-(--color-muted)">When we are there</h3>
            <ul className="type-body mt-2 space-y-1 tabular-nums">{hours.map((h) => <li key={h}>{h}</li>)}</ul>
          </div>
          {notes && <div><h3 className="type-utility text-(--color-muted)">Getting here</h3><p className="type-body mt-2 max-w-[44ch]">{notes}</p></div>}
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={mapUrl} target="_blank" rel="noreferrer" className={buttonVariants({ variant: 'outline' })}><MapPin aria-hidden strokeWidth={1.5} />Open in maps</a>
            {phone && <a href={`tel:${phone.replace(/\s/g, '')}`} className={`${buttonVariants({ variant: 'outline' })} md:hidden`}><Phone aria-hidden strokeWidth={1.5} />Call {phone}</a>}
          </div>
        </div>
      </div>
    </section>
  )
}
