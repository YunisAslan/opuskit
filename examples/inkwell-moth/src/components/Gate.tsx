'use client'
// The way in: the site opens under a sheet of tracing paper with the drawing showing faintly through it. Drag the sheet
// up or off (or press "Lift the sheet"); Skip and Esc open the site at once. Once per session. The page is in the DOM
// underneath from the start; the sheet is server-rendered so nothing flashes, and hidden by CSS if already lifted.
// Reduced motion: the copy offers a single "Enter" button, and the sheet goes without the wipe (texts swap in CSS, so the
// server-rendered sheet always matches).
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'

const KEY = 'im-sheet'

export function Gate() {
  const [open, setOpen] = useState(true)
  const reduce = useReducedMotion()
  const sheet = useRef<HTMLDivElement>(null)
  const skip = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0), y = useMotionValue(0)
  const rotate = useTransform(x, [-400, 400], [-7, 7])

  const done = useCallback(() => {
    try { sessionStorage.setItem(KEY, '1') } catch {}
    document.documentElement.dataset.sheet = 'lifted'
    setOpen(false)
  }, [])

  const lift = useCallback((dir: 'up' | 'left' | 'right' = 'up') => {
    if (reduce) return done()
    const off = dir === 'up' ? -window.innerHeight * 1.15 : (dir === 'left' ? -1 : 1) * window.innerWidth * 1.15
    animate(dir === 'up' ? y : x, off, { duration: 0.6, ease: [0.65, 0, 0.35, 1] }).then(done)
  }, [reduce, done, x, y])

  // Already lifted this session: never show it. Otherwise lock the page behind the sheet until it is lifted.
  useEffect(() => {
    if (!open || document.documentElement.dataset.sheet === 'lifted') return // CSS already hides a lifted sheet
    const behind = [...document.querySelectorAll<HTMLElement>('[data-chrome]'), ...[...(sheet.current?.parentElement?.children ?? [])].filter((el): el is HTMLElement => el !== sheet.current)]
    behind.forEach((el) => el.setAttribute('inert', ''))
    document.documentElement.style.overflow = 'hidden'
    skip.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') done() }
    window.addEventListener('keydown', onKey)
    return () => {
      behind.forEach((el) => el.removeAttribute('inert'))
      document.documentElement.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, done])

  if (!open) return null

  return (
    <motion.div ref={sheet} role="dialog" aria-modal="true" aria-labelledby="sheet-title"
      className="sheet fixed inset-0 z-[70] cursor-grab touch-none select-none active:cursor-grabbing"
      style={{ x, y, rotate }}
      drag dragElastic={0.5} dragMomentum={false}
      onDragEnd={(_, info) => {
        const { offset: o, velocity: v } = info
        if (o.y < -140 || v.y < -600) lift('up')
        else if (Math.abs(o.x) > 180 || Math.abs(v.x) > 700) lift(o.x < 0 ? 'left' : 'right')
        else { animate(x, 0, { type: 'spring', stiffness: 260, damping: 26 }); animate(y, 0, { type: 'spring', stiffness: 260, damping: 26 }) }
      }}>
      {/* the tracing paper itself: translucent, a little blurred, with a curled corner and a strip of tape */}
      <div className="absolute inset-0 bg-(--color-surface)/90 backdrop-blur-[4px]" />
      <div aria-hidden className="absolute left-1/2 top-3 h-7 w-32 -translate-x-1/2 -rotate-2 bg-(--color-secondary)/90" />
      <div aria-hidden className="absolute bottom-0 right-0 h-24 w-24 bg-[linear-gradient(135deg,transparent_50%,var(--color-secondary)_50%)] shadow-[-6px_-6px_14px_rgb(0_0_0/0.08)]" />

      <button ref={skip} type="button" onClick={done} onPointerDown={(e) => e.stopPropagation()}
        className="type-utility absolute right-4 top-4 z-10 min-h-11 cursor-pointer px-4 underline underline-offset-4 md:right-8 md:top-6">
        Skip
      </button>

      <div className="relative flex h-full flex-col items-center justify-end gap-6 px-6 pb-[12svh] text-center">
        <svg aria-hidden viewBox="0 0 80 120" className="h-24 w-16 overflow-visible">
          <path d="M40 112 C 30 86, 52 62, 38 34 M24 46 C 30 38, 36 30, 38 22 C 42 30, 48 38, 56 44" fill="none" stroke="var(--color-text)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h2 id="sheet-title" className="type-display max-w-[14ch] text-[clamp(2.4rem,7vw,4.5rem)]">
          <span className="motion-reduce:hidden">Lift the tracing paper</span><span className="hidden motion-reduce:inline">Under the tracing paper</span>
        </h2>
        <p className="type-body max-w-[36ch] text-(--color-muted)">
          <span className="motion-reduce:hidden">Drag the sheet up or off to the side. </span>The studio is just underneath.
        </p>
        <button type="button" onClick={() => lift('up')} onPointerDown={(e) => e.stopPropagation()}
          className="type-body min-h-14 cursor-pointer bg-(--color-primary) px-8 text-(--color-background) transition-colors hover:bg-(--color-text)">
          <span className="motion-reduce:hidden">Lift the sheet</span><span className="hidden motion-reduce:inline">Enter</span>
        </button>
      </div>
    </motion.div>
  )
}
