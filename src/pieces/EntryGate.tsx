'use client'
// OpusKit piece — a playful way in: the first page view of a visit opens under a sheet the visitor plays away. `drag`:
// pull the sheet up or off to the side (or press the button); `hold`: press and hold the button until it fills (1.2 s).
// Skip (focused first) and Esc open the site at once. The page sits in the DOM underneath from the start and is inert
// until the sheet goes. Reduced motion: one "Enter" button, no wipe. Original OpusKit code (MIT).
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react'

const KEY = 'opuskit-gate'
const EASE = [0.65, 0, 0.35, 1] as const

export function EntryGate({ title, hint, action, mode = 'drag', enter = 'Enter', skip = 'Skip', children, className }: {
  title: string; hint?: string; action: string; mode?: 'drag' | 'hold'; enter?: string; skip?: string
  /** Shown faintly on the sheet, e.g. the logo or a drawing (decorative). */
  children?: ReactNode; className?: string
}) {
  const reduce = useReducedMotion()
  // Rendered by default so the first paint is the sheet, not the page; hidden at once when already opened this visit.
  // ponytail: a full reload later in the same visit shows the sheet until hydration; an inline head script would fix that.
  const [open, setOpen] = useState(true)
  const sheet = useRef<HTMLDivElement>(null)
  const first = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0), y = useMotionValue(0), fill = useMotionValue(0)
  const rotate = useTransform(x, [-400, 400], [-6, 6])
  const width = useTransform(fill, (v) => `${v * 100}%`)

  const done = useCallback(() => {
    try { sessionStorage.setItem(KEY, '1') } catch { /* private mode: once per mount */ }
    setOpen(false)
  }, [])
  const lift = useCallback((dir: 'up' | 'left' | 'right' = 'up') => {
    if (reduce) return done()
    const off = dir === 'up' ? -innerHeight * 1.15 : (dir === 'left' ? -1 : 1) * innerWidth * 1.15
    animate(dir === 'up' ? y : x, off, { duration: 0.6, ease: EASE }).then(done)
  }, [reduce, done, x, y])

  useLayoutEffect(() => { try { if (sessionStorage.getItem(KEY)) setOpen(false) } catch { /* storage blocked */ } }, [])

  // While open: the page behind is inert and does not scroll; focus starts on Skip; Esc skips.
  useEffect(() => {
    if (!open) return
    let top: HTMLElement | null = sheet.current
    while (top && top.parentElement !== document.body) top = top.parentElement
    const behind = [...document.body.children].filter((el): el is HTMLElement => el instanceof HTMLElement && el !== top)
    behind.forEach((el) => el.setAttribute('inert', ''))
    const root = document.documentElement, prev = root.style.overflow
    root.style.overflow = 'hidden'
    first.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') done() }
    addEventListener('keydown', onKey)
    return () => { behind.forEach((el) => el.removeAttribute('inert')); root.style.overflow = prev; removeEventListener('keydown', onKey) }
  }, [open, done])

  // Hold: the button fills while pressed and opens the site when full; letting go early drains it.
  const hold = (on: boolean) => {
    if (reduce) return
    animate(fill, on ? 1 : 0, { duration: on ? 1.2 * (1 - fill.get()) : 0.3, ease: 'linear' }).then(() => { if (on && fill.get() >= 1) lift('up') })
  }

  if (!open) return null
  const drag = mode === 'drag' && !reduce
  const stop = (e: PointerEvent) => e.stopPropagation()
  return (
    <motion.div ref={sheet} role="dialog" aria-modal="true" aria-label={title}
      className={`fixed inset-0 z-[110] select-none bg-(--color-surface)/90 text-(--color-text) backdrop-blur-[4px] ${drag ? 'cursor-grab touch-none active:cursor-grabbing' : ''} ${className ?? ''}`}
      style={{ x, y, rotate }} drag={drag} dragElastic={0.5} dragMomentum={false}
      onDragEnd={(_, { offset: o, velocity: v }) => {
        if (o.y < -140 || v.y < -600) lift('up')
        else if (Math.abs(o.x) > 180 || Math.abs(v.x) > 700) lift(o.x < 0 ? 'left' : 'right')
        else { animate(x, 0, { type: 'spring', stiffness: 260, damping: 26 }); animate(y, 0, { type: 'spring', stiffness: 260, damping: 26 }) }
      }}>
      {children && <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center opacity-25">{children}</div>}
      <button ref={first} type="button" onClick={done} onPointerDown={stop}
        className="absolute right-4 top-4 min-h-11 cursor-pointer px-4 font-(family-name:--font-utility) text-sm underline underline-offset-4 md:right-8 md:top-6">
        {skip}
      </button>
      <div className="relative flex h-full flex-col items-center justify-end gap-6 px-6 pb-[12svh] text-center">
        <p className="max-w-[16ch] font-(family-name:--font-display) text-[clamp(2.4rem,7vw,4.5rem)] leading-none">{title}</p>
        {hint && !reduce && <p className="max-w-[36ch] font-(family-name:--font-body) text-(--color-muted)">{hint}</p>}
        <button type="button" onPointerDown={(e) => { stop(e); if (mode === 'hold') hold(true) }}
          onPointerUp={() => mode === 'hold' && hold(false)} onPointerLeave={() => mode === 'hold' && hold(false)}
          onClick={() => (reduce || mode === 'drag') && lift('up')}
          onKeyDown={(e) => { if (mode === 'hold' && !reduce && (e.key === 'Enter' || e.key === ' ') && !e.repeat) { e.preventDefault(); hold(true) } }}
          onKeyUp={(e) => { if (mode === 'hold' && (e.key === 'Enter' || e.key === ' ')) hold(false) }}
          className="relative min-h-14 cursor-pointer overflow-hidden rounded-(--radius-button,0px) bg-(--color-primary) px-8 font-(family-name:--font-body) text-(--color-background)">
          {mode === 'hold' && !reduce && <motion.span aria-hidden className="absolute inset-y-0 left-0 bg-(--color-accent)" style={{ width }} />}
          <span className="relative">{reduce ? enter : action}</span>
        </button>
      </div>
    </motion.div>
  )
}
