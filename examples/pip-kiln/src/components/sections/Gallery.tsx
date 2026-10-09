'use client'
// OpusKit section — Gallery: the place and what it makes, with sparse captions. Pip & Kiln: the owner's kit piece
// "Prints on a desk" — the photos scattered like prints you can pick up and move — with a switch to a tidy even grid
// (3:2 tiles, captions below, 4 / 3 / 2 columns). Phones and keyboards get the grid: on phones it is the only view,
// and on desktop it surfaces as soon as focus enters it. Any tile opens the photos large in a dialog.
import { useState } from 'react'
import { DragPhotos, type DeskPhoto } from '@/components/pieces/DragPhotos'
import { MediaAsset } from '@/components/media/MediaAsset'
import { SectionHead } from '@/components/parts/SectionHead'
import { Sticker } from '@/components/parts/Sticker'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { media } from '@/config/assets'

// Where each print lands on the desk (left, top, width, tilt) — 8 prints, tilts within ±6°.
const DESK: Omit<DeskPhoto, 'src' | 'alt' | 'width' | 'height'>[] = [
  { x: '3%', y: '8%', w: '27%', rotate: -5 }, { x: '27%', y: '3%', w: '24%', rotate: 3 }, { x: '50%', y: '10%', w: '26%', rotate: -2 },
  { x: '73%', y: '4%', w: '24%', rotate: 5 }, { x: '6%', y: '50%', w: '25%', rotate: 4 }, { x: '30%', y: '46%', w: '27%', rotate: -4 },
  { x: '55%', y: '53%', w: '23%', rotate: 6 }, { x: '74%', y: '45%', w: '24%', rotate: -3 },
]

export type Photo = { index: number; alt?: string; caption: string }

export function GallerySection({ title, lines, hint, view, viewLabel, photos }: { title: string; lines: string[]; hint: string; view: { desk: string; grid: string }; viewLabel: string; photos: Photo[] }) {
  const [mode, setMode] = useState<'desk' | 'grid'>('desk')
  const [open, setOpen] = useState<number | null>(null)
  const desk: DeskPhoto[] = photos.map((p, i) => { const m = media('gallery', { index: p.index, alt: p.alt }); return { ...DESK[i % DESK.length], src: m.src, alt: m.alt, width: m.width, height: m.height } })

  const grid = (
    <ul className="focus-cards grid grid-cols-2 gap-x-(--gutter) gap-y-8 md:grid-cols-3 xl:grid-cols-4">
      {photos.map((p, i) => (
        <li key={p.index}>
          <button type="button" onClick={() => setOpen(i)} className="press focus-title group block w-full text-left">
            <MediaAsset id="gallery" index={p.index} alt={p.alt} sizes="(min-width: 1280px) 24vw, (min-width: 768px) 32vw, 48vw" className="rounded-(--radius-media)" imgClassName="transition-transform duration-500 ease-(--ease-out) group-hover:scale-[1.03]" />
            <span className="title type-caption mt-2 block">{p.caption}</span>
          </button>
        </li>
      ))}
    </ul>
  )

  return (
    <section className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <SectionHead text={title} lines={lines}
          aside={<ToggleGroup type="single" value={mode} onValueChange={(v) => v && setMode(v as 'desk' | 'grid')} aria-label={viewLabel} className="hidden md:flex">
            <ToggleGroupItem value="desk">{view.desk}</ToggleGroupItem><ToggleGroupItem value="grid">{view.grid}</ToggleGroupItem>
          </ToggleGroup>} />

        <div className="mt-12 md:hidden">{grid}</div>
        <div className="mt-16 hidden md:block">
          {mode === 'desk' ? (
            <>
              <div className="relative">
                <DragPhotos photos={desk} className="h-[min(80svh,52rem)] rounded-(--radius-card) bg-(--color-secondary)" />
                <div className="pointer-events-none absolute -top-5 right-[8%] z-[60]"><Sticker tilt={5}>{hint}</Sticker></div>
              </div>
              {/* the same photos as a plain grid for keyboards: it appears as soon as focus enters it */}
              <div className="sr-only focus-within:not-sr-only focus-within:mt-12 focus-within:block">{grid}</div>
            </>
          ) : grid}
        </div>
      </div>

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="w-[min(100%-2*var(--gutter),72rem,calc((100svh-180px)*1.5))]">
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <DialogDescription className="sr-only">{hint}</DialogDescription>
          {open !== null && (
            <Carousel opts={{ startIndex: open, loop: true }} aria-label={title}>
              <CarouselContent>
                {photos.map((p) => (
                  <CarouselItem key={p.index}>
                    <figure>
                      <MediaAsset id="gallery" index={p.index} alt={p.alt} sizes="90vw" className="rounded-(--radius-media)" />
                      <figcaption className="type-caption mt-3 pr-32">{p.caption}</figcaption>
                    </figure>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute bottom-0 right-0 flex gap-2"><CarouselPrevious /><CarouselNext /></div>
            </Carousel>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
