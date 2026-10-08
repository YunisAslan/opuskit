'use client'
// OpusKit section — Gallery, fitted to Low Hum. Two layers of the same eight photos:
//   the desk  — "Prints on a desk": instant prints dropped around the headline; pick one up and move it.
//   the grid  — "Even grid": one ratio (3:2, places), captions under each tile, 4 / 3 / 2 columns. Hover: the tile
//               scales 1.03 and the others dim. It is the keyboard way in: each tile opens a larger view (Dialog)
//               you can step through (Carousel).
import { getImageProps } from 'next/image'
import { useState, type ReactNode } from 'react'
import { DragPhotos, type DeskPhoto } from '@/components/pieces/DragPhotos'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { MediaAsset } from '@/components/site/MediaAsset'
import { Reveal } from '@/components/site/Reveal'
import { asset, galleryCount } from '@/config/assets'

const DESK = [
  { x: '1%', y: '3%', rotate: -5 }, { x: '26%', y: '0%', rotate: 3 }, { x: '51%', y: '5%', rotate: -2 }, { x: '75%', y: '1%', rotate: 5 },
  { x: '0%', y: '59%', rotate: 4 }, { x: '25%', y: '63%', rotate: -3 }, { x: '50%', y: '60%', rotate: 2 }, { x: '75%', y: '58%', rotate: -6 },
]
const DESK_MOBILE = [
  { x: '1%', y: '1%', rotate: -4 }, { x: '50%', y: '2%', rotate: 4 }, { x: '3%', y: '18%', rotate: 3 }, { x: '51%', y: '19%', rotate: -5 },
  { x: '1%', y: '61%', rotate: 5 }, { x: '50%', y: '60%', rotate: -3 }, { x: '3%', y: '79%', rotate: -2 }, { x: '51%', y: '78%', rotate: 4 },
]

export function GallerySection({ heading, intro, hint, gridTitle, open, close }: { heading: ReactNode; intro: string; hint: string; gridTitle: string; open: string; close: string }) {
  const [shown, setShown] = useState<number | null>(null)
  const photos = Array.from({ length: galleryCount }, (_, i) => asset('gallery', i))
  const desk = (layout: typeof DESK, w: string, sizes: string): DeskPhoto[] => photos.map((p, i) => {
    const { props } = getImageProps({ src: p.src, alt: p.alt, width: p.width, height: p.height, sizes })
    return { src: props.src, srcSet: props.srcSet, sizes, alt: p.alt, w, ...layout[i] }
  })

  const centre = (
    <div className="pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-1/2 px-4 text-center">
      {heading}
      <p className="type-caption mt-4 text-(--color-muted)">{hint}</p>
    </div>
  )

  return (
    <section className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        {/* the desk — a pointer toy; the grid below carries the same photos for everyone */}
        <div className="relative">
          <div className="hidden md:block">
            {centre}
            <div aria-hidden><DragPhotos photos={desk(DESK, '24%', '300px')} className="h-[clamp(600px,54vw,700px)]" /></div>
          </div>
          <div className="md:hidden">
            <div className="pointer-events-none absolute inset-x-0 top-[41%] z-0 text-center">{heading}<p className="type-caption mt-3 text-(--color-muted)">{hint}</p></div>
            <div aria-hidden><DragPhotos photos={desk(DESK_MOBILE, '47%', '180px')} className="h-[700px]" /></div>
          </div>
        </div>

        <p className="type-body mx-auto mt-14 max-w-[48ch] text-center text-(--color-muted) [font-size:clamp(1.0625rem,1.3vw,1.1875rem)]">{intro}</p>

        <h3 className="type-heading mt-20 text-center">{gridTitle}</h3>
        <ul className="group/grid mt-10 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
          {photos.map((p, i) => (
            <Reveal as="li" key={p.src} delay={(i % 4) * 0.06} className="transition-opacity duration-200 ease-out group-has-[button:hover]/grid:opacity-60 has-[button:hover]:!opacity-100 group-has-[button:focus-visible]/grid:opacity-60 has-[button:focus-visible]:!opacity-100">
              <figure>
                <button type="button" onClick={() => setShown(i)} aria-label={`${open}: ${p.caption}`}
                  className="group/tile relative block w-full cursor-zoom-in overflow-hidden rounded-(--radius-media) outline-none after:pointer-events-none after:absolute after:inset-0 after:rounded-(--radius-media) after:border-[3px] after:border-(--color-accent) after:opacity-0 after:transition-opacity after:duration-150 focus-visible:after:opacity-100">
                  <MediaAsset id="gallery" index={i} aspect="3 / 2" sizes="(min-width:1024px) 290px, (min-width:768px) 33vw, 50vw"
                    imgClassName="transition-transform duration-300 ease-out group-hover/tile:scale-[1.03] group-focus-visible/tile:scale-[1.03] motion-reduce:!scale-100" />
                </button>
                <figcaption className="type-caption mt-3 text-(--color-muted)">{p.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>

      <Dialog open={shown !== null} onOpenChange={(o) => !o && setShown(null)}>
        <DialogContent closeLabel={close} className="mt-6">
          <DialogTitle className="sr-only">{gridTitle}</DialogTitle>
          <DialogDescription className="sr-only">Use the arrow keys or the buttons to step through the photos.</DialogDescription>
          {shown !== null && (
            <Carousel opts={{ startIndex: shown, loop: true }}>
              <CarouselContent>
                {photos.map((p, i) => (
                  <CarouselItem key={p.src}>
                    <figure>
                      <MediaAsset id="gallery" index={i} reveal={false} aspect="3 / 2" sizes="(min-width:1024px) 1000px, 92vw" />
                      <figcaption className="type-caption mt-3 text-(--color-muted)">{p.caption}</figcaption>
                    </figure>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-2 flex justify-end gap-2">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </Carousel>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
