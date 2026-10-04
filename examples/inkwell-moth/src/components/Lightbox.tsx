'use client'
// Every photo has a caption: the gallery's captions as a typed list. Each opens an accessible lightbox (Dialog +
// Carousel): arrow keys, Esc and swipe. It is also the plain, keyboard-friendly version of the playful galleries.
import { useState } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from './ui/carousel'
import { Dialog, DialogContent, DialogTitle } from './ui/dialog'

export type Photo = { src: string; alt: string; caption: string }

export function Lightbox({ photos, label, thumbs = false, className }: { photos: Photo[]; label: string; thumbs?: boolean; className?: string }) {
  const [at, setAt] = useState<number | null>(null)
  const [api, setApi] = useState<CarouselApi>()
  return (
    <>
      <ul className={className}>
        {photos.map((p, i) => (
          <li key={p.src}>
            <button type="button" onClick={() => setAt(i)} aria-label={`Open “${p.caption}” larger`}
              className="group flex min-h-11 w-full cursor-zoom-in flex-col items-start gap-2 text-left">
              {thumbs && <img src={p.src} alt="" loading="lazy" className="aspect-[4/5] w-full bg-(--color-surface) object-cover p-1.5 shadow-[0_8px_18px_rgb(0_0_0/0.14)] md:hidden" />}
              <span className="type-utility underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-150 group-hover:decoration-current">{p.caption}</span>
            </button>
          </li>
        ))}
      </ul>
      <Dialog open={at !== null} onOpenChange={(o) => !o && setAt(null)}>
        <DialogContent onKeyDown={(e) => {
          if (e.defaultPrevented) return
          if (e.key === 'ArrowLeft') api?.scrollPrev()
          if (e.key === 'ArrowRight') api?.scrollNext()
        }} className="w-[min(94vw,1100px)] max-w-none bg-(--color-surface) p-3 sm:max-w-none md:p-5">
          <DialogTitle className="sr-only">{label}</DialogTitle>
          <Carousel setApi={setApi} opts={{ startIndex: at ?? 0, loop: true }} className="pt-8">
            <CarouselContent>
              {photos.map((p) => (
                <CarouselItem key={p.src}>
                  <figure>
                    <img src={p.src} alt={p.alt} className="mx-auto max-h-[72svh] w-auto max-w-full object-contain" />
                    <figcaption className="type-utility mt-3 text-center text-(--color-muted)">{p.caption}</figcaption>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-1 top-[45%] size-11 rounded-none border-(--color-text) bg-(--color-surface) md:left-2" />
            <CarouselNext className="right-1 top-[45%] size-11 rounded-none border-(--color-text) bg-(--color-surface) md:right-2" />
          </Carousel>
        </DialogContent>
      </Dialog>
    </>
  )
}
