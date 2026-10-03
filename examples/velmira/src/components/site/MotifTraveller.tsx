'use client'
// Signature moment "One shape travels down the page": one fixed coral disc that leaves the hero and lands beside each
// chapter title (every .motif-mark), changing size at each, and comes to rest beside the brand name in the footer.
// Desktop with motion only — phones see the still marks, reduced motion sees the hero's mark alone (see globals.css).
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useMedia } from '@/hooks/use-media'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'

type Key = { s: number; x: number; y: number; size: number }
const BASE = 96 // drawn size in px; scaled down to each mark's size
const smooth = (t: number) => t * t * (3 - 2 * t)

/** Where the disc is at scroll position s: between two keys it eases from one to the next. */
export function place(keys: Key[], s: number): Omit<Key, 's'> {
  if (!keys.length) return { x: -BASE, y: -BASE, size: 0 }
  // Before the first mark reaches its resting height the disc simply sits on it, scrolling with the page.
  if (s <= keys[0].s) return { ...keys[0], y: keys[0].y + keys[0].s - s }
  for (let i = 1; i < keys.length; i++) {
    const a = keys[i - 1], b = keys[i]
    if (s <= b.s) {
      const t = smooth((s - a.s) / (b.s - a.s || 1))
      return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, size: a.size + (b.size - a.size) * t }
    }
  }
  return keys[keys.length - 1]
}

/** Reads every mark on the page into keyframes: the disc meets a mark when the mark reaches `rest` of the viewport
 *  (or, for marks near the very top or bottom, where the mark is at the first or last scroll position). */
function measure(): { keys: Key[]; hide: [number, number][] } {
  const vh = innerHeight, max = document.documentElement.scrollHeight - vh, rest = vh * 0.38
  const marks = [...document.querySelectorAll<HTMLElement>('.motif-mark')]
  const raw = marks.map((el) => {
    const r = el.getBoundingClientRect()
    const top = r.top + scrollY + r.height / 2
    const s = Math.min(Math.max(top - rest, 0), max)
    return { s, x: r.left + r.width / 2, y: top - s, size: r.width }
  }).filter((k) => k.size > 0).sort((a, b) => a.s - b.s)
  // Parts that slide sideways under the margin (the pinned strip): the disc steps aside while they pass.
  const hide = [...document.querySelectorAll<HTMLElement>('[data-motif-hide]')].map((el) => {
    const r = el.getBoundingClientRect(), top = r.top + scrollY
    return [top - rest - vh * 0.1, top + r.height - rest] as [number, number]
  })
  const keys: Key[] = []
  for (const k of raw) {
    const prev = keys[keys.length - 1]
    if (prev && k.s - prev.s < 1) { if (k.s >= max - 1) keys[keys.length - 1] = k; continue }
    // Between two chapters the disc sinks a little and shrinks, then rises to meet the next title: it floats.
    if (prev) keys.push({ s: (prev.s + k.s) / 2, x: (prev.x + k.x) / 2, y: Math.min(Math.max(prev.y, k.y) + vh * 0.14, vh * 0.8), size: Math.min(prev.size, k.size) * 0.7 })
    keys.push(k)
  }
  return { keys, hide }
}

export function MotifTraveller() {
  const pathname = usePathname()
  const on = useMedia('(min-width: 64rem) and (prefers-reduced-motion: no-preference)')
  const keys = useRef<Key[]>([])
  const hide = useRef<[number, number][]>([])
  const version = useMotionValue(0)
  const { scrollY } = useScroll()

  const at = () => place(keys.current, scrollY.get())
  const tx = useTransform(() => { version.get(); return at().x - BASE / 2 })
  const ty = useTransform(() => { version.get(); return at().y - BASE / 2 })
  const ts = useTransform(() => { version.get(); return at().size / BASE })
  const shown = useSpring(useTransform((): number => { version.get(); const s = scrollY.get(); return hide.current.some(([a, b]) => s > a && s < b) ? 0 : 1 }), { stiffness: 200, damping: 30 })
  const spring = { stiffness: 160, damping: 30, mass: 0.6 }
  const x = useSpring(tx, spring), y = useSpring(ty, spring), scale = useSpring(ts, spring)

  useEffect(() => {
    const root = document.documentElement
    if (!on) return
    // Re-measured layout (load, resize, new page): put the disc straight where it belongs, no fly-in.
    const update = () => { ({ keys: keys.current, hide: hide.current } = measure()); version.set(version.get() + 1); x.jump(tx.get()); y.jump(ty.get()); scale.jump(ts.get()) }
    update()
    root.dataset.motif = 'on'
    const ro = new ResizeObserver(update)
    ro.observe(document.body)
    addEventListener('resize', update)
    document.fonts.ready.then(update)
    return () => { ro.disconnect(); removeEventListener('resize', update); delete root.dataset.motif }
  }, [on, pathname, version, x, y, scale, tx, ty, ts])

  if (!on) return null
  return (
    <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-40 rounded-full bg-(--color-accent) will-change-transform"
      style={{ width: BASE, height: BASE, x, y, scale, opacity: shown }} />
  )
}
