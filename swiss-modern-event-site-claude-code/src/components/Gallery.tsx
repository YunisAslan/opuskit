"use client"

import { useState } from "react"
import { assets, type ImageAsset, type ImageKey } from "@/config/assets"
import { MediaAsset } from "@/components/MediaAsset"
import { ClipReveal } from "@/components/Reveal"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

type Photo = { id: ImageKey; caption: string }

// Even grid (4 / 3 / 2 columns), one 4:5 ratio, caption under each tile. Focus cards: the hovered
// tile scales to 1.03 while the others dim. Each tile opens the set in a dialog carousel.
export function Gallery({ photos }: { photos: Photo[] }) {
  const [hover, setHover] = useState<number | null>(null)
  const [open, setOpen] = useState<number | null>(null)

  return (
    <>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4" onPointerLeave={() => setHover(null)}>
        {photos.map((p, i) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              onPointerEnter={(e) => e.pointerType === "mouse" && setHover(i)}
              aria-label={`Open photo: ${p.caption}`}
              className={cn(
                "group block w-full text-left transition-opacity duration-300 ease-out",
                hover !== null && hover !== i && "opacity-60",
              )}
            >
              <ClipReveal className="aspect-4/5">
                <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:group-hover:scale-100">
                  <MediaAsset id={p.id} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw" />
                </div>
              </ClipReveal>
              <span className="type-utility mt-3 block text-muted group-hover:text-text group-focus-visible:text-text group-focus-visible:underline">
                {p.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-[min(64rem,calc(100vw-2rem))] border border-text bg-background p-4 sm:max-w-[min(64rem,calc(100vw-4rem))] sm:p-6">
          <DialogTitle className="sr-only">Gallery</DialogTitle>
          <DialogDescription className="sr-only">Use the arrow buttons or keys to move between photos.</DialogDescription>
          {open !== null && (
            <Carousel opts={{ startIndex: open, loop: true }} className="w-full">
              <CarouselContent>
                {photos.map((p) => (
                  <CarouselItem key={p.id}>
                    <figure>
                      <div className="relative aspect-4/3 overflow-hidden bg-surface">
                        <MediaAsset id={p.id} sizes="(min-width: 1024px) 64rem, 100vw" className="object-contain" />
                      </div>
                      <figcaption className="mt-4 flex flex-wrap justify-between gap-x-6 gap-y-1">
                        <span className="font-bold">{p.caption}</span>
                        <span className="type-utility text-muted">Photo: {(assets[p.id] as ImageAsset).credit}, Unsplash</span>
                      </figcaption>
                    </figure>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-6 flex gap-2">
                <CarouselPrevious className="static size-11 translate-y-0 border-text" />
                <CarouselNext className="static size-11 translate-y-0 border-text" />
              </div>
            </Carousel>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
