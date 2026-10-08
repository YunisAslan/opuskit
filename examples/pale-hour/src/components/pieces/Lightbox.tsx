'use client'
// OpusKit piece — tap a photo to open it large: a full-screen viewer over any photo layout.
// Controlled: the layout sets `index` when a photo is clicked; null = closed. Arrow keys and swipe move between photos.
// Pale Hour: built on the site's shadcn Dialog (Radix), which traps focus, closes on Esc, locks the page and returns
// focus to the photo that opened it. The museum label travels with the photo. Reduced motion: photos swap without the
// slide. Original OpusKit code (MIT).
import { motion, useReducedMotion } from 'motion/react'
import { getImageProps } from 'next/image'
import { useRef } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'

export type LightboxPhoto = { src: string; alt: string; caption?: React.ReactNode; width?: number; height?: number }

// Full-screen sources from next/image's own address logic, so they follow next.config (optimiser or static export)
const full = (p: LightboxPhoto) => {
  const { props } = getImageProps({ src: p.src, alt: p.alt, width: p.width ?? 1920, height: p.height ?? 1280, sizes: '100vw' })
  return { src: props.src, srcSet: props.srcSet, sizes: props.sizes }
}

export function Lightbox({ photos, index, onIndex, label = 'Photos', close = 'Close', prev = 'Previous', next = 'Next' }: {
  photos: LightboxPhoto[]; index: number | null; onIndex: (i: number | null) => void
  label?: string; close?: string; prev?: string; next?: string
}) {
  const reduce = useReducedMotion()
  const open = index !== null && !!photos[index]
  // the photo that opened the viewer gets focus back on close (no Radix Trigger here: the layout owns the buttons)
  const opener = useRef<HTMLElement | null>(null)
  const go = (by: number) => index !== null && onIndex((index + by + photos.length) % photos.length)
  const p = open ? photos[index] : null
  const btn = 'type-utility grid min-h-11 min-w-11 cursor-pointer place-items-center px-4 text-(--inv-text) transition-colors duration-150 hover:bg-(--inv-text)/10 focus-visible:bg-(--inv-text)/15'

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onIndex(null)}>
      <DialogContent
        aria-describedby={p?.caption ? 'lightbox-caption' : undefined}
        className="flex flex-col p-3 text-(--inv-text) md:p-6"
        onOpenAutoFocus={() => { opener.current = document.activeElement as HTMLElement | null }}
        onCloseAutoFocus={(e) => { if (opener.current?.isConnected) { e.preventDefault(); opener.current.focus() } }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
          if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
        }}
      >
        <DialogTitle className="sr-only">{label}</DialogTitle>
        {p && (
          <>
            <div className="flex items-center justify-between gap-2">
              <span aria-live="polite" className="type-utility tabular-nums opacity-80">{index! + 1} of {photos.length}</span>
              <DialogClose className={btn}>{close}</DialogClose>
            </div>
            <figure className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 py-3" onClick={(e) => e.target === e.currentTarget && onIndex(null)}>
              <motion.img key={p.src} {...full(p)} alt={p.alt} draggable={false}
                width={p.width} height={p.height}
                className="h-auto min-h-0 max-h-full w-auto max-w-full flex-1 cursor-grab touch-pan-y object-contain active:cursor-grabbing"
                initial={reduce ? false : { opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
                drag={photos.length > 1 && !reduce ? 'x' : false} dragConstraints={{ left: 0, right: 0 }} dragElastic={0.4}
                onDragEnd={(_, { offset, velocity }) => { if (offset.x < -80 || velocity.x < -500) go(1); else if (offset.x > 80 || velocity.x > 500) go(-1) }} />
              {p.caption && <DialogDescription asChild><figcaption id="lightbox-caption" className="type-caption max-w-[60ch] text-center opacity-90">{p.caption}</figcaption></DialogDescription>}
            </figure>
            {photos.length > 1 && (
              <div className="flex justify-center gap-2">
                <button type="button" onClick={() => go(-1)} className={btn}>{prev}</button>
                <button type="button" onClick={() => go(1)} className={btn}>{next}</button>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
