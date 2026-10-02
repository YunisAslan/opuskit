'use client'
// OpusKit section — Gallery: a mixed-size grid that keeps each photo's own shape; sparse captions. Each photo opens
// like a curtain as it arrives; tapping one opens the whole set as a swipeable carousel in a dialog.
import { useState } from 'react'
import { ClipImage } from '@/components/motion'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

export type GalleryPhoto = { src: string; alt: string; caption?: string; width?: number; height?: number }

const nav = 'static inset-auto my-0 size-12 translate-none rotate-0 rounded-(--radius-button) bg-(--color-text) text-(--color-background) hover:bg-(--color-muted) disabled:opacity-30'

export function GallerySection({ title, eyebrow, photos }: { title?: string; eyebrow?: string; photos: GalleryPhoto[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="section-y px-5 md:px-6">
      <div className="mx-auto max-w-[1200px]">
        {eyebrow && <p className="type-body max-w-[40ch]">{eyebrow}</p>}
        {title && <h2 className="type-heading mt-3 mb-10">{title}</h2>}
        <ul className="columns-2 gap-4 md:columns-3 md:gap-6 [&>li]:mb-4 md:[&>li]:mb-6">
          {photos.map((p, i) => (
            <li key={p.src} className="break-inside-avoid">
              <figure>
                <button type="button" onClick={() => setOpen(i)} aria-label={`Open ${p.caption ?? p.alt} larger`} className="group block w-full cursor-zoom-in">
                  <ClipImage src={p.src} alt={p.alt} width={p.width} height={p.height} ratio={p.width && p.height ? p.width / p.height : undefined}
                    imgClassName="transition-transform duration-500 group-hover:scale-[1.03] group-focus-visible:scale-[1.03] motion-reduce:transition-none" />
                </button>
                {p.caption && <figcaption className="type-utility mt-2 text-(--color-muted)">{p.caption}</figcaption>}
              </figure>
            </li>
          ))}
        </ul>
      </div>
      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-[calc(100%-1.5rem)] gap-4 border border-(--color-text) bg-(--color-background) p-4 sm:max-w-[min(1100px,calc(100%-4rem))] md:p-6">
          <DialogTitle className="type-heading pr-12 [font-size:1.25rem]">{title ?? 'Gallery'}</DialogTitle>
          <DialogDescription className="sr-only">Swipe or use the arrows to look through the studio photos.</DialogDescription>
          {open !== null && (
            <Carousel opts={{ startIndex: open, loop: true }}>
              <CarouselContent>
                {photos.map((p) => (
                  <CarouselItem key={p.src}>
                    <figure>
                      <img src={p.src} alt={p.alt} className="mx-auto max-h-[68svh] w-auto object-contain" />
                      {p.caption && <figcaption className="type-utility mt-3 text-center text-(--color-muted)">{p.caption}</figcaption>}
                    </figure>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-4 flex justify-center gap-3">
                <CarouselPrevious className={nav} />
                <CarouselNext className={nav} />
              </div>
            </Carousel>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
