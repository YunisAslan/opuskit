'use client'
// OpusKit piece — tap a photo to open it large: a full-screen viewer over any photo layout (grid, desk, tilted grid…).
// Controlled: the layout sets `index` when a photo is clicked; null = closed. Arrow keys and swipe move between photos,
// Esc or the close button returns focus to where it was; the page behind does not scroll. Reduced motion: photos swap
// without the slide. Original OpusKit code (MIT).
// Fitted to this site: pictures through next/image (getImageProps), the site's buttons (outlined, hand-drawn arrows),
// captions in the body face, the dialog fading from the centre in --duration-dialog.
import { motion, useReducedMotion } from 'motion/react'
import { getImageProps } from 'next/image'
import { useEffect, useRef } from 'react'

export type LightboxPhoto = { src: string; width: number; height: number; alt: string; caption?: string }

export function Lightbox({ photos, index, onIndex, label = 'Photos', close = 'Close', prev = 'Previous photo', next = 'Next photo' }: {
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
  const { props: img } = getImageProps({ src: p.src, width: p.width, height: p.height, alt: p.alt, sizes: '100vw', quality: 75 })
  const btn = 'press grid size-11 place-items-center rounded-(--radius-button) border border-(--color-background) text-(--color-background) transition-colors duration-150 hover:bg-(--color-background) hover:text-(--color-text)'
  const arrow = (d: string) => <svg viewBox="0 0 24 24" aria-hidden className="size-5"><path d={d} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
  return (
    <motion.div ref={box} role="dialog" aria-modal="true" aria-label={label} data-lenis-prevent
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
      className="fixed inset-0 z-[120] flex flex-col bg-(--color-text)/95 p-3 pb-[max(12px,env(safe-area-inset-bottom))] text-(--color-background) md:p-6"
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
        <span aria-live="polite" className="type-utility self-center tabular-nums">{index + 1} of {photos.length}</span>
        <button type="button" onClick={() => onIndex(null)} className={`${btn} type-utility w-auto px-5`}>{close}</button>
      </div>
      <figure className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 py-3" onClick={(e) => e.target === e.currentTarget && onIndex(null)}>
        <motion.img key={p.src} src={img.src} srcSet={img.srcSet} sizes={img.sizes} width={img.width} height={img.height} alt={p.alt} draggable={false}
          className="min-h-0 w-auto max-w-full flex-1 cursor-grab touch-pan-y rounded-(--radius-media) object-contain active:cursor-grabbing"
          initial={reduce ? { opacity: 0 } : { opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reduce ? 0.2 : 0.25, ease: [0.23, 1, 0.32, 1] }}
          drag={photos.length > 1 ? 'x' : false} dragConstraints={{ left: 0, right: 0 }} dragElastic={0.4}
          onDragEnd={(_, { offset, velocity }) => { if (offset.x < -80 || velocity.x < -500) go(1); else if (offset.x > 80 || velocity.x > 500) go(-1) }} />
        {p.caption && <figcaption className="type-caption max-w-[60ch] text-center !text-[0.9375rem]">{p.caption}</figcaption>}
      </figure>
      {photos.length > 1 && (
        <div className="flex justify-center gap-3">
          <button type="button" onClick={() => go(-1)} aria-label={prev} className={btn}>{arrow('M15 5 C 12 8, 10 10, 8 12 C 10 14, 12 16, 15 19')}</button>
          <button type="button" onClick={() => go(1)} aria-label={next} className={btn}>{arrow('M9 5 C 12 8, 14 10, 16 12 C 14 14, 12 16, 9 19')}</button>
        </div>
      )}
    </motion.div>
  )
}
