'use client'
// The big idea, "one thing guides the scroll": Fennwood's mark leaves the hero and travels down the page with the
// visitor, coming to rest at each chapter's MotifStop (beside its title) and finally in the footer, beside the name.
// One fixed layer; its position is read from the stops on every resize and driven by scroll. Desktop with motion only —
// on smaller screens the stops show the mark as a still image, and with reduced motion it stays in the hero (see MotifStop).
import { motion, useMotionValue, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef } from 'react'
import { Mark, MARK_H, MARK_W } from '@/components/Mark'

type Frame = { s: number; x: number; y: number; scale: number; rotate: number; light: number }
const KEYS = ['x', 'y', 'scale', 'rotate', 'light'] as const
const REST = 0.38 // a stop is reached when it sits at 38% of the viewport height

const smooth = (t: number) => t * t * (3 - 2 * t)

export function frameAt(frames: Frame[], s: number): Frame {
  if (s <= frames[0].s) return frames[0]
  for (let i = 1; i < frames.length; i++) {
    const a = frames[i - 1], b = frames[i]
    if (s <= b.s) {
      const t = smooth((s - a.s) / (b.s - a.s))
      const f = { ...a, s }
      for (const k of KEYS) f[k] = a[k] + (b[k] - a[k]) * t
      return f
    }
  }
  return frames[frames.length - 1]
}

type Stop = Frame & { pinned: boolean }
const EDGE = 90 // px of scroll the mark spends sliding between a title's row and the margin

function measure(): Frame[] {
  const H = window.innerHeight, W = document.documentElement.clientWidth, now = window.scrollY
  const max = document.documentElement.scrollHeight - H
  const stops: Stop[] = []
  for (const el of document.querySelectorAll<HTMLElement>('[data-motif-stop]')) {
    const r = el.getBoundingClientRect()
    if (!r.width) continue
    const pinned = 'pinned' in el.dataset
    let s: number, y: number
    if (pinned) {
      // In the sticky hero: its place on the first screen, whatever the current scroll.
      s = 0
      y = r.top - (el.closest('section')?.getBoundingClientRect().top ?? 0)
    } else {
      s = Math.min(Math.max(r.top + now - H * REST, 0), max)
      y = r.top + now - s
    }
    stops.push({ s, pinned, x: r.left + r.width / 2 - MARK_W / 2, y: y + r.height / 2 - MARK_H / 2, scale: r.width / MARK_W,
      rotate: Number(el.dataset.pose) || 0, light: el.dataset.motifStop === 'light' ? 1 : 0 })
  }
  stops.sort((a, b) => a.s - b.s)
  const kept: Stop[] = []
  for (const st of stops) {
    if (kept.length && st.s - kept[kept.length - 1].s < 2) kept[kept.length - 1] = st // same scroll (page end): the later stop wins
    else kept.push(st)
  }

  // Between chapters the mark travels small in the page margin (left of the 1200px column), never over text, photos or
  // titles. It leaves a stop sideways along the title's own row (moving up with it as the page scrolls), runs down the
  // margin, and comes in the same way beside the next title.
  const margin = Math.max((W - 1200) / 2, 24)
  const rail = { x: margin / 2 - MARK_W / 2, scale: Math.min(Math.max((margin * 0.6) / MARK_W, 0.25), 0.6) }
  const frames: Frame[] = []
  kept.forEach((st, i) => {
    const prev = kept[i - 1]
    if (prev) {
      const gap = st.s - prev.s, e = Math.min(EDGE, gap / 4)
      frames.push({ ...rail, s: prev.s + e, y: prev.y - (prev.pinned ? 0 : e), rotate: prev.rotate, light: prev.light })
      if (gap > H * 0.5)
        frames.push({ ...rail, s: (prev.s + st.s) / 2, y: H * 0.5 - MARK_H / 2, rotate: (prev.rotate + st.rotate) / 2, light: (prev.light + st.light) / 2 })
      frames.push({ ...rail, s: st.s - e, y: st.y + e, rotate: st.rotate, light: st.light })
    }
    frames.push(st)
  })
  return frames
}

export function TravellingMotif() {
  const pathname = usePathname()
  const { scrollY } = useScroll()
  const frames = useRef<Frame[]>([])
  const x = useMotionValue(0), y = useMotionValue(0), scale = useMotionValue(1), rotate = useMotionValue(0)
  const light = useMotionValue(1), opacity = useMotionValue(0)
  const spring = { stiffness: 220, damping: 30, mass: 0.6 }
  const sx = useSpring(x, spring), sy = useSpring(y, spring), sScale = useSpring(scale, spring), sRotate = useSpring(rotate, spring)

  const apply = useCallback((s: number) => {
    if (!frames.current.length) return opacity.set(0)
    const f = frameAt(frames.current, s)
    x.set(f.x); y.set(f.y); scale.set(f.scale); rotate.set(f.rotate); light.set(f.light); opacity.set(1)
  }, [x, y, scale, rotate, light, opacity])

  useMotionValueEvent(scrollY, 'change', apply)

  useEffect(() => {
    const run = () => { frames.current = measure(); apply(window.scrollY) }
    run()
    const ro = new ResizeObserver(run)
    ro.observe(document.body)
    document.fonts?.ready.then(run)
    return () => ro.disconnect()
  }, [pathname, apply])

  return (
    <motion.div aria-hidden className="pointer-events-none fixed top-0 left-0 z-40 hidden lg:motion-safe:block"
      style={{ x: sx, y: sy, scale: sScale, rotate: sRotate, opacity, width: MARK_W, height: MARK_H }}>
      <Mark className="absolute inset-0 h-full w-full text-(--color-accent)" />
      <motion.span className="absolute inset-0" style={{ opacity: light }}><Mark className="h-full w-full text-(--color-background)" /></motion.span>
    </motion.div>
  )
}
