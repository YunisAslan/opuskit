import { MediaAsset } from '@/components/MediaAsset'
import { ImageReveal, Lines, Reveal } from '@/components/motion'
import type { AssetKey } from '@/config/assets'
// Location — side: the way in, large, beside the facts (address, hours, how to get there, a real map link), and one
// view inside under them. Phones: stacked, the address taps to the map.
type P = { id?: string; title: string; address: string; hours: string[]; notes?: string; mapUrl: string; image: AssetKey; image2?: AssetKey }
export function LocationSection({ id, title, address, hours, notes, mapUrl, image, image2 }: P) {
  return (
    <section id={id} className="section-y px-(--gutter)">
      <div className="mx-auto grid max-w-(--container) gap-x-8 gap-y-12 md:grid-cols-12">
        <ImageReveal className="aspect-3/2 md:col-span-7"><MediaAsset id={image} fill sizes="(min-width: 768px) 55vw, 100vw" /></ImageReveal>
        <div className="md:col-span-4 md:col-start-9">
          <Lines lines={[title]} className="type-heading" />
          <Reveal delay={0.1} className="mt-8" inner="space-y-6">
            <a href={mapUrl} target="_blank" rel="noreferrer" className="type-body link-line block whitespace-pre-line not-italic">{address}</a>
            <ul className="type-body space-y-1 text-(--color-muted)">{hours.map((h) => <li key={h}>{h}</li>)}</ul>
            {notes && <p className="type-body max-w-[40ch] text-(--color-muted)">{notes}</p>}
            <a href={mapUrl} target="_blank" rel="noreferrer" className="type-utility inline-flex h-11 items-center rounded-button border border-(--color-text) px-6 transition-colors duration-150 hover:bg-(--color-secondary) focus-visible:bg-(--color-secondary)">Open in maps</a>
          </Reveal>
          {image2 && <ImageReveal className="mt-14 aspect-3/2" delay={0.15}><MediaAsset id={image2} fill sizes="(min-width: 768px) 28vw, 100vw" /></ImageReveal>}
        </div>
      </div>
    </section>
  )
}
