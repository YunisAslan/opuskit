'use client'
// OpusKit section — Gallery, "Gallery wall", made this site's own: masonry columns (3 desktop, 2 tablet and phones
// from 360px, 1 below) that keep each photo's own shape; the last photo spans two columns to break the grid.
// The tiles land 50ms apart (hard cut). Every real photo opens large in the Lightbox (arrows, Esc, swipe) from a real
// <button> named by its caption. Temporary placeholders are plain tiles — the viewer never steps onto one.
import { useState } from 'react'
import { MediaAsset } from '@/components/MediaAsset'
import { Cut, Lines } from '@/components/motion'
import { Lightbox } from '@/components/pieces/Lightbox'
import { media, type MediaId } from '@/config/assets'

export type GalleryItem = { id: MediaId; caption: string }

export function GallerySection({ title, items, open }: { title: string; items: GalleryItem[]; open: string }) {
  const [shown, setShown] = useState<number | null>(null)
  const real = items.filter((it) => media(it.id).status === 'have')
  const photos = real.map((it) => { const a = media(it.id); return { src: a.src, width: a.width, height: a.height, alt: a.alt, caption: it.caption } })
  const [wide, ...restRev] = [...items].reverse()
  const columns = restRev.reverse()

  const tile = (it: GalleryItem, sizes: string, frame?: string) => {
    const a = media(it.id)
    const pic = frame
      ? <span className={`relative block overflow-hidden rounded-(--radius-media) ${frame}`}><MediaAsset id={it.id} fill sizes={sizes} /></span>
      : <MediaAsset id={it.id} sizes={sizes} className="rounded-(--radius-media)" />
    const ri = real.indexOf(it)
    return (
      <figure>
        {a.status === 'have'
          ? <button type="button" onClick={() => setShown(ri)} aria-label={`${open}: ${it.caption}`} className="press group block w-full cursor-pointer overflow-hidden rounded-(--radius-media) text-left">
              <span className="block transition-transform duration-200 [transition-timing-function:steps(2)] group-hover:scale-[1.02]">{pic}</span>
            </button>
          : pic}
        <figcaption className="type-caption mt-2 text-(--color-muted)">{it.caption}</figcaption>
      </figure>
    )
  }

  return (
    <section aria-labelledby="gallery-title" className="px-(--gutter) py-(--section-y)">
      <Lines id="gallery-title" lines={[title]} className="type-h2" />
      <Cut as="ul" className="mt-10 columns-1 gap-(--gutter) min-[360px]:columns-2 lg:columns-3 [&>li]:mb-8">
        {columns.map((it) => <li key={String(it.id)} className="break-inside-avoid">{tile(it, '(min-width: 1024px) 33vw, 50vw')}</li>)}
      </Cut>
      {wide && <div className="grid-site"><div className="col-span-full lg:col-span-8">{tile(wide, '(min-width: 1024px) 66vw, 100vw', media(wide.id).width > media(wide.id).height ? 'aspect-[3/2]' : 'aspect-[4/5]')}</div></div>}
      <Lightbox photos={photos} index={shown} onIndex={setShown} label={title} />
    </section>
  )
}
