'use client'
// OpusKit section — Gallery wall: masonry columns (3 desktop, 2 tablet and phone, 1 under 360px) that keep each photo's
// own shape; a wide photo breaks the grid across all columns. Photos rise in with a short stagger. A tap opens an
// accessible lightbox (Dialog + Carousel): arrow keys, Esc, swipe.
import { useState, type ReactNode } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'

export type GalleryPhoto = { id: string; src: string; alt: string; caption?: string; width?: number; height?: number; wide?: boolean }

export function GallerySection({ title, intro, photos }: { title?: ReactNode; intro?: ReactNode; photos: GalleryPhoto[] }) {
  const [open, setOpen] = useState<number | null>(null)
  const [api, setApi] = useState<CarouselApi>()

  // Runs of masonry photos, broken by the wide ones.
  const groups: { wide: boolean; items: { p: GalleryPhoto; i: number }[] }[] = []
  photos.forEach((p, i) => {
    const last = groups[groups.length - 1]
    if (!p.wide && last && !last.wide) last.items.push({ p, i })
    else groups.push({ wide: !!p.wide, items: [{ p, i }] })
  })

  const tile = ({ p, i }: { p: GalleryPhoto; i: number }, k: number) => (
    <figure key={p.id} id={p.id} data-reveal className="mb-4 break-inside-avoid md:mb-6">
      <button type="button" data-rise style={{ '--i': k % 3 } as React.CSSProperties} onClick={() => setOpen(i)} aria-label={`Open photo: ${p.alt}`}
        className="group block w-full overflow-hidden rounded-(--radius-media) bg-(--color-surface)">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.src} alt={p.alt} width={p.width} height={p.height} loading="lazy" decoding="async"
          className="h-auto w-full transition-opacity duration-150 ease-out group-hover:opacity-85 group-focus-visible:opacity-85" />
      </button>
      {p.caption && <figcaption className="type-utility mt-3 text-(--color-muted)">{p.caption}</figcaption>}
    </figure>
  )

  return (
    <section className="pb-32 pt-40 md:pb-40 md:pt-48">
      <div className="shell">
        {title}
        {intro}
        <div className="mt-16 md:mt-24">
          {groups.map((g, gi) => g.wide
            ? <div key={gi}>{g.items.map(tile)}</div>
            : <div key={gi} className="gap-4 columns-1 min-[360px]:columns-2 md:gap-6 lg:columns-3">{g.items.map(tile)}</div>)}
        </div>
      </div>

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-[calc(100%-2rem)] border-0 bg-transparent p-0 shadow-none sm:max-w-[min(92vw,1200px)]"
          onKeyDown={(e) => { if (e.key === 'ArrowLeft') api?.scrollPrev(); if (e.key === 'ArrowRight') api?.scrollNext() }}>
          <DialogTitle className="sr-only">Photos of Velmira</DialogTitle>
          <DialogDescription className="sr-only">Use the arrow keys or swipe to move between photos; Escape closes.</DialogDescription>
          {open !== null && (
            <Carousel setApi={setApi} opts={{ startIndex: open, loop: true }} className="w-full">
              <CarouselContent>
                {photos.map((p) => (
                  <CarouselItem key={p.id}>
                    <figure className="flex h-[78svh] flex-col items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.src} alt={p.alt} className="max-h-full min-h-0 w-auto max-w-full rounded-(--radius-media) object-contain" />
                      <figcaption className="type-utility mt-4 text-(--color-muted)">{p.caption ?? p.alt}</figcaption>
                    </figure>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious variant="glass" className="left-2 md:-left-16" />
              <CarouselNext variant="glass" className="right-2 md:-right-16" />
            </Carousel>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
