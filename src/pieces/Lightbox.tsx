'use client'
// OpusKit piece — tap a photo to open it large: a full-screen viewer over any photo layout (grid, desk, tilted grid…).
// Controlled: the layout sets `index` when a photo is clicked; null = closed. Arrow keys and swipe move between photos,
// Esc or the close button returns focus to where it was; the page behind does not scroll. Reduced motion: photos swap
// without the slide. Original OpusKit code (MIT).
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'

export type LightboxPhoto = { src: string; alt: string; caption?: string }

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
  const btn = 'grid size-11 cursor-pointer place-items-center rounded-(--radius-button,0px) bg-(--color-surface) text-(--color-text) font-(family-name:--font-utility) text-sm'
  return (
    <div ref={box} role="dialog" aria-modal="true" aria-label={label}
      className="fixed inset-0 z-[120] flex flex-col bg-(--color-text)/90 p-3 text-(--color-background) md:p-6"
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
      <div className="flex justify-between gap-2">
        <span aria-live="polite" className="self-center font-(family-name:--font-utility) text-sm">{index + 1} / {photos.length}</span>
        <button type="button" onClick={() => onIndex(null)} className={`${btn} w-auto px-4`}>{close}</button>
      </div>
      <figure className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 py-3" onClick={(e) => e.target === e.currentTarget && onIndex(null)}>
        <motion.img key={p.src} src={p.src} alt={p.alt} draggable={false}
          className="min-h-0 max-w-full flex-1 cursor-grab touch-pan-y object-contain active:cursor-grabbing"
          initial={reduce ? false : { opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25, ease: 'easeOut' }}
          drag={photos.length > 1 ? 'x' : false} dragConstraints={{ left: 0, right: 0 }} dragElastic={0.4}
          onDragEnd={(_, { offset, velocity }) => { if (offset.x < -80 || velocity.x < -500) go(1); else if (offset.x > 80 || velocity.x > 500) go(-1) }} />
        {p.caption && <figcaption className="max-w-[60ch] text-center font-(family-name:--font-utility) text-sm">{p.caption}</figcaption>}
      </figure>
      {photos.length > 1 && (
        <div className="flex justify-center gap-2">
          <button type="button" onClick={() => go(-1)} aria-label={prev} className={btn}>‹</button>
          <button type="button" onClick={() => go(1)} aria-label={next} className={btn}>›</button>
        </div>
      )}
    </div>
  )
}
