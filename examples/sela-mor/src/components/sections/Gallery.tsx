'use client'
// OpusKit section — Gallery wall: masonry columns (3 desktop, 2 down to 360 px, then 1) that keep each photo's own
// shape; sparse captions; items arrive with a 50 ms stagger. Every photo is a real button that opens it large
// (Lightbox: arrows, Esc, swipe), its caption travelling with it.
import { useState } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import { Lightbox } from '@/components/pieces/Lightbox'

export type GalleryPhoto = { src: string; alt: string; caption?: string; width: number; height: number }

export function GallerySection({ title, photos }: { title?: string; photos: GalleryPhoto[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="px-5 py-12 md:px-8">
      <div className="mx-auto max-w-[1440px]">
        {title && <h2 className="type-body mb-10 text-(--color-muted)">{title}</h2>}
        <ul className="columns-1 gap-4 min-[360px]:columns-2 md:columns-3 md:gap-8 [&>li]:mb-4 md:[&>li]:mb-8">
          {photos.map((p, i) => (
            <Reveal as="li" key={p.src} delay={(i % 3) * 0.05} className="break-inside-avoid">
              <figure>
                <button type="button" onClick={() => setOpen(i)} aria-label={`Open large: ${p.caption ?? p.alt}`} className="group block w-full cursor-zoom-in overflow-hidden rounded-media">
                  <img src={p.src} alt={p.alt} loading="lazy" width={p.width} height={p.height} className="h-auto w-full transition-transform duration-500 ease-(--ease-out-soft) group-hover:scale-[1.03]" />
                </button>
                {p.caption && <figcaption className="type-body mt-2 text-(--color-muted)">{p.caption}</figcaption>}
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
      <Lightbox photos={photos} index={open} onIndex={setOpen} />
    </section>
  )
}
