'use client'
// Location — media "over", made Halden's own: the way in fills the screen (a 100svh media section) and the facts sit
// on a solid block over it, bottom-right — never type straight on the picture. The block carries the one view inside,
// the address, the hours, how to get here, and tap-to-map / tap-to-call. Phones: the photo, then the block beneath.
import { ImageReveal, Lines, Reveal } from '@/components/motion/Reveal'
import { MediaAsset } from '@/components/MediaAsset'
import type { ImageKey } from '@/config/assets'

type P = {
  tone?: 'ground' | 'surface' | 'inverse' | 'chapter'
  title: string; address: string; hours: readonly string[]; notes?: string; mapUrl: string; phone: string
  image: ImageKey; inside?: ImageKey; alt: string; insideAlt?: string; labels: { map: string; call: string }; id?: string
}

export function LocationSection({ tone, title, address, hours, notes, mapUrl, phone, image, inside, alt, insideAlt, labels, id }: P) {
  return (
    <section id={id} data-tone={tone === 'ground' ? undefined : tone} className="relative md:flex md:min-h-svh md:items-end md:py-24">
      <ImageReveal className="aspect-[4/5] w-full md:absolute md:inset-0 md:aspect-auto md:h-full">
        <MediaAsset id={image} alt={alt} sizes="100vw" className="h-full w-full" />
      </ImageReveal>
      <div className="relative w-full px-(--gutter)">
        <div className="mx-auto flex max-w-(--container) md:justify-end">
          <Reveal className="w-full bg-(--color-background) py-12 md:max-w-[440px] md:p-10">
            <Lines lines={[title]} className="type-heading" />
            {inside && (
              <ImageReveal delay={0.2} className="mt-8 aspect-[3/2] w-full">
                <MediaAsset id={inside} alt={insideAlt} sizes="440px" className="h-full w-full" />
              </ImageReveal>
            )}
            <address className="type-body mt-8 whitespace-pre-line not-italic">{address}</address>
            <ul className="type-body mt-4 text-(--color-muted)">{hours.map((h) => <li key={h}>{h}</li>)}</ul>
            {notes && <p className="type-body mt-4 text-(--color-muted)">{notes}</p>}
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={mapUrl} target="_blank" rel="noreferrer" className="btn btn-line">{labels.map}</a>
              <a href={`tel:${phone.replace(/\s/g, '')}`} className="btn btn-line">{labels.call} {phone}</a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
