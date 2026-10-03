'use client'
// OpusKit section — Gallery, set as the recipe's "Even grid": one ratio for every tile (3:2, places), caption below,
// 3 columns on desktop and 2 on phones. Hover: the photo scales to 1.03 while the others dim slightly (focus cards).
// Each tile opens the set in a Dialog with a Carousel. Photos come in through the asset layer (MediaAsset).
import { useState, type ReactNode } from 'react'
import { ClipReveal } from '@/components/Reveal'
import { MediaAsset } from '@/components/MediaAsset'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import type { AssetKey } from '@/config/assets'

export type GalleryPhoto = { id: AssetKey; caption?: string }

export function GallerySection({ id, title, photos }: { id?: string; title?: ReactNode; photos: GalleryPhoto[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id={id} className="px-5 py-(--section-pad) md:px-6">
      <div className="mx-auto max-w-[1200px]">
        {title && <div className="mb-12">{title}</div>}
        <ul className="group/grid grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-6 md:gap-y-10">
          {photos.map((p, i) => (
            <li key={p.id} className="transition-opacity duration-300 ease-out group-has-[button:hover]/grid:opacity-60 has-[button:hover]:opacity-100! motion-reduce:transition-none">
              <figure>
                <button type="button" onClick={() => setOpen(i)} aria-label={`Open photo: ${p.caption ?? ''}`} className="group/tile block w-full rounded-(--radius-media)">
                  <ClipReveal delay={(i % 3) * 0.08} className="aspect-[3/2] rounded-(--radius-media)">
                    <MediaAsset id={p.id} sizes="(min-width: 768px) 384px, 50vw" className="transition-transform duration-500 ease-out group-hover/tile:scale-[1.03] group-focus-visible/tile:scale-[1.03] motion-reduce:transition-none" />
                  </ClipReveal>
                </button>
                {p.caption && <figcaption className="type-utility mt-3 text-(--color-muted)">{p.caption}</figcaption>}
              </figure>
            </li>
          ))}
        </ul>
      </div>
      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-[calc(100%-2rem)] gap-4 border-0 bg-(--color-text) p-4 text-(--color-background) sm:max-w-5xl sm:p-6 [&_[data-slot=dialog-close]]:text-(--color-background) [&_[data-slot=dialog-close]]:hover:bg-(--color-background)/10">
          <DialogTitle className="sr-only">Photos from Fennwood</DialogTitle>
          <DialogDescription className="sr-only">Use the arrows or swipe to see the others.</DialogDescription>
          {open !== null && (
            <Carousel opts={{ startIndex: open, loop: true }} className="mt-8">
              <CarouselContent>
                {photos.map((p) => (
                  <CarouselItem key={p.id}>
                    <figure>
                      <div className="relative aspect-[3/2] overflow-hidden rounded-(--radius-media)"><MediaAsset id={p.id} sizes="(min-width: 1024px) 1000px, 92vw" /></div>
                      {p.caption && <figcaption className="type-utility mt-3 opacity-80">{p.caption}</figcaption>}
                    </figure>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-4 flex justify-end gap-2">
                <CarouselPrevious className="static size-11 translate-y-0 border-(--color-background)/40 bg-transparent text-(--color-background) hover:bg-(--color-background)/10" />
                <CarouselNext className="static size-11 translate-y-0 border-(--color-background)/40 bg-transparent text-(--color-background) hover:bg-(--color-background)/10" />
              </div>
            </Carousel>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
