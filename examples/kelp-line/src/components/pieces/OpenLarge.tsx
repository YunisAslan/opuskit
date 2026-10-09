'use client'
// Tap to open large (Home → Editorial Story): the story photo is a real <button> named by its caption; it opens the
// Lightbox with the caption travelling along. A small frosted chip in the corner says it can open — always visible,
// so phones know too.
import { Expand } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { Lightbox, type LightboxPhoto } from './Lightbox'

export function OpenLarge({ photos, index = 0, children }: { photos: LightboxPhoto[]; index?: number; children: ReactNode }) {
  const [open, setOpen] = useState<number | null>(null)
  const p = photos[index]
  return (
    <>
      <button type="button" onClick={() => setOpen(index)} aria-label={`Open large: ${p.caption ?? p.alt}`} className="group press relative block w-full cursor-zoom-in rounded-(--radius-media) text-left active:scale-[0.99]">
        {children}
        <span aria-hidden className="type-caption absolute bottom-3 right-3 flex items-center gap-2 rounded-(--radius-button) bg-(--frost) px-3 py-2 text-(--color-text) backdrop-blur-md transition-colors duration-150 group-hover:bg-(--color-background) group-focus-visible:bg-(--color-text) group-focus-visible:text-(--color-background)">
          <Expand className="size-3.5" strokeWidth={1.5} />Open large
        </span>
      </button>
      <Lightbox photos={photos} index={open} onIndex={setOpen} label="Story photo" />
    </>
  )
}
