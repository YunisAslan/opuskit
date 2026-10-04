'use client'
// The two galleries. Home: prints on the desk (DragPhotos) — pick one up and move it; on phones, where dragging would
// fight scrolling, the same prints as a two-column grid. Books: the tilted grid of spreads (TiltedGrid), 4 columns on
// desktop and 2 on phones. Both keep a typed caption list that opens the lightbox.
import { DragPhotos, type DeskPhoto } from './pieces/DragPhotos'
import { TiltedGrid } from './pieces/TiltedGrid'
import { Lightbox, type Photo } from './Lightbox'

export function DeskGallery({ photos, places }: { photos: Photo[]; places: Omit<DeskPhoto, 'src' | 'alt'>[] }) {
  return (
    <>
      <DragPhotos className="hidden h-[82svh] max-h-[820px] min-h-[560px] md:block" photos={photos.map((p, i) => ({ src: p.src, alt: p.alt, ...places[i] }))} />
      <div className="mt-6 md:ml-auto md:mt-0 md:w-[40%] md:-rotate-1 md:border md:border-(--color-text)/20 md:bg-(--color-surface) md:p-6">
        <p className="type-utility mb-4 hidden text-(--color-muted) md:block">On the desk, left to right</p>
        <Lightbox photos={photos} label="Sketches on the desk" thumbs className="grid grid-cols-2 gap-x-4 gap-y-8 md:block md:space-y-2" />
      </div>
    </>
  )
}

export function SpreadGallery({ photos }: { photos: Photo[] }) {
  return (
    <>
      <TiltedGrid photos={photos} columns={4} className="hidden md:block" />
      <TiltedGrid photos={photos} columns={2} className="md:hidden" />
      <Lightbox photos={photos} label="Pages from other books and sketchbooks" className="mt-12 grid grid-cols-1 gap-x-8 gap-y-1 sm:grid-cols-2 md:ml-[30%] md:grid-cols-2" />
    </>
  )
}
