'use client'
// OpusKit piece — tap a photo to open it large: a full-screen viewer over any photo layout (grid, desk, tilted grid…).
// Controlled: the layout sets `index` when a photo is clicked; null = closed. Arrow keys and swipe move between photos,
// Esc or the close button returns focus to where it was; the page behind does not scroll. Reduced motion: photos swap
// without the slide. Original OpusKit code (MIT).
// Fitted to Kelp Line: the viewer sits on the page ground (deepened), pictures come through next/image (getImageProps),
// controls and captions use the site's utility and caption roles, and a single photo shows no counter or arrows.
import { motion, useReducedMotion } from 'motion/react'
import { getImageProps } from 'next/image'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

export type LightboxPhoto = { src: string; alt: string; caption?: string; width: number; height: number }

export function Lightbox({ photos, index, onIndex, label = 'Photos', close = 'Close', prev = 'Previous', next = 'Next' }: {
  photos: LightboxPhoto[]; index: number | null; onIndex: (i: number | null) => void
  label?: string; close?: string; prev?: string; next?: string
}) {
  const reduce = useReducedMotion()
  const box = useRef<HTMLDivElement>(null)
  const open = index !== null && !!photos[index]
  const go = (by: number) => index !== null && onIndex((index + by + photos.length) % photos.length)

  useEffect(() => {
    if (!open) return
    const back = document.activeElement as HTMLElement | null
    const root = document.documentElement, prevOverflow = root.style.overflow
    root.style.overflow = 'hidden'
    box.current?.querySelector<HTMLElement>('button')?.focus()
    return () => { root.style.overflow = prevOverflow; back?.focus() }
  }, [open])

  if (!open) return null
  const p = photos[index]
  const { props: img } = getImageProps({ src: p.src, alt: p.alt, width: p.width, height: p.height, sizes: '100vw', quality: 75 })
  const btn = 'type-utility press inline-flex h-11 min-w-11 cursor-pointer items-center justify-center gap-2 rounded-(--radius-button) bg-(--color-surface) px-3 text-(--color-text) hover:bg-(--color-secondary) focus-visible:bg-(--color-secondary)'
  // portalled to <body>, so no section's stacking context can sit it under the menu
  return createPortal(
    <div ref={box} role="dialog" aria-modal="true" aria-label={label}
      className="anim-overlay fixed inset-0 z-[120] flex flex-col bg-(--color-background)/95 px-3 pb-[calc(12px+env(safe-area-inset-bottom,0px))] pt-[calc(12px+env(safe-area-inset-top,0px))] text-(--color-text) backdrop-blur-sm md:p-6"
      data-state="open"
      onKeyDown={(e) => {
        if (e.key === 'Escape') onIndex(null)
        if (e.key === 'ArrowLeft') go(-1)
        if (e.key === 'ArrowRight') go(1)
        if (e.key === 'Tab') { // keep focus inside the viewer
          const all = [...(box.current?.querySelectorAll<HTMLElement>('button') ?? [])]
          const i = all.indexOf(document.activeElement as HTMLElement)
          e.preventDefault(); all[(i + (e.shiftKey ? -1 : 1) + all.length) % all.length]?.focus()
        }
      }}
      onClick={(e) => e.target === e.currentTarget && onIndex(null)}>
      <div className="flex items-center justify-between gap-2">
        <span aria-live="polite" className="type-utility tabular-nums text-(--color-muted)">{photos.length > 1 ? `${index + 1} of ${photos.length}` : ''}</span>
        <button type="button" onClick={() => onIndex(null)} className={`${btn} px-4`}><X className="size-4" strokeWidth={1.5} aria-hidden />{close}</button>
      </div>
      <figure className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 py-4" onClick={(e) => e.target === e.currentTarget && onIndex(null)}>
        <motion.img key={p.src} {...(img as object)} draggable={false}
          className="min-h-0 max-w-full flex-1 cursor-grab touch-pan-y rounded-(--radius-media) object-contain active:cursor-grabbing"
          style={{ width: 'auto', height: 'auto' }}
          initial={reduce ? { opacity: 0 } : { opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reduce ? 0.15 : 0.25, ease: [0.23, 1, 0.32, 1] }}
          drag={photos.length > 1 && !reduce ? 'x' : false} dragConstraints={{ left: 0, right: 0 }} dragElastic={0.4}
          onDragEnd={(_, { offset, velocity }) => { if (offset.x < -80 || velocity.x < -500) go(1); else if (offset.x > 80 || velocity.x > 500) go(-1) }} />
        {p.caption && <figcaption className="type-caption max-w-[60ch] text-center text-(--color-muted)">{p.caption}</figcaption>}
      </figure>
      {photos.length > 1 && (
        <div className="flex justify-center gap-2">
          <button type="button" onClick={() => go(-1)} aria-label={prev} className={btn}>‹</button>
          <button type="button" onClick={() => go(1)} aria-label={next} className={btn}>›</button>
        </div>
      )}
    </div>,
    document.body,
  )
}
