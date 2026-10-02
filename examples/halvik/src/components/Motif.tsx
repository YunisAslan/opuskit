'use client'
// The big idea, "One thing guides the scroll": the Halvik keycap mark leaves the first screen and travels down the
// page with the visitor. Each chapter title has a <MotifSlot/> beside it — the place the mark lands, in that chapter's
// pose (size, rotation). Between chapters it waits small in the right margin, never over text. In the footer it comes
// to rest beside the brand name, lilac on black.
//   Desktop (≥1024px): one fixed layer (aria-hidden, pointer-events none) driven by the page scroll (Motion useScroll);
//     keyframes are read from the slots' positions, again on resize and whenever the page height changes.
//   Mobile: no layer — every slot shows the mark still, at its chapter start.
//   Reduced motion: no layer — only the slot marked `first` shows (CSS in globals.css).
import { motion, useMotionValue, useScroll } from 'motion/react'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { Mark } from '@/components/Logo'

export function MotifSlot({ className = 'size-[0.75em]', rotate = 0, first = false, inverse = false }: { className?: string; rotate?: number; first?: boolean; inverse?: boolean }) {
  return (
    <span aria-hidden data-motif-slot="" data-rotate={rotate} data-inverse={inverse ? '' : undefined} data-first={first ? '' : undefined}
      className={`motif-slot ${className}`} style={{ rotate: `${rotate}deg` }}>
      <Mark className="block size-full" />
    </span>
  )
}

type Pose = { x: number; y: number; size: number; rot: number; inv: number }
type Point = Pose & { s: number; ease: boolean }

const BASE = 64 // the layer's mark is drawn at 64px and scaled to each pose
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

function build(): Point[] {
  const vh = innerHeight, vw = document.documentElement.clientWidth
  const max = Math.max(0, document.documentElement.scrollHeight - vh)
  const rest = vh * 0.4 // a chapter's mark lands when its title is 40% down the screen
  const park = (s: number, inv: number): Point => ({ s, x: vw - 20, y: vh * 0.5, size: 14, rot: 0, inv, ease: true })
  const slots = [...document.querySelectorAll<HTMLElement>('[data-motif-slot]')].map((el) => {
    const r = el.getBoundingClientRect()
    const cy = r.top + scrollY + r.height / 2
    const s = Math.min(max, Math.max(0, cy - rest))
    return { s, x: r.left + r.width / 2, y: cy - s, size: el.offsetWidth, rot: Number(el.dataset.rotate ?? 0), inv: el.dataset.inverse !== undefined ? 1 : 0 }
  }).sort((a, b) => a.s - b.s)
  const ks = slots.filter((k, i) => i === slots.length - 1 || slots[i + 1].s - k.s > 1) // two chapters landing at once: keep the later

  const pts: Point[] = []
  ks.forEach((k, i) => {
    const prev = ks[i - 1], next = ks[i + 1]
    const hold = Math.min(vh * 0.12, prev ? (k.s - prev.s) / 4 : Infinity, next ? (next.s - k.s) / 4 : Infinity)
    if (prev) {
      const gap = k.s - prev.s - 2 * hold
      const travel = Math.min(vh * 0.35, gap / 2)
      const a = prev.s + hold + travel, b = k.s - hold - travel
      pts.push(park(a, 0))
      if (b - a > 1) pts.push(park(b, k.inv))
    }
    // glued to its slot while the slot scrolls past: the screen position follows the page 1:1 (linear)
    pts.push({ ...k, s: k.s - hold, y: k.y + hold, ease: true }, { ...k, s: k.s + hold, y: k.y - hold, ease: false })
  })
  return pts
}

function at(pts: Point[], s: number): Pose {
  if (s <= pts[0].s) return { ...pts[0], y: pts[0].y + (pts[0].s - s) }
  const last = pts[pts.length - 1]
  if (s >= last.s) return { ...last, y: last.y - (s - last.s) }
  let i = 1
  while (pts[i].s < s) i++
  const a = pts[i - 1], b = pts[i]
  const t0 = (s - a.s) / (b.s - a.s)
  const t = b.ease ? easeInOut(t0) : t0
  const mix = (p: number, q: number) => p + (q - p) * t
  return { x: mix(a.x, b.x), y: mix(a.y, b.y), size: mix(a.size, b.size), rot: mix(a.rot, b.rot), inv: mix(a.inv, b.inv) }
}

export function MotifLayer() {
  const path = usePathname()
  const { scrollY } = useScroll()
  const x = useMotionValue(0), y = useMotionValue(0), scale = useMotionValue(1), rotate = useMotionValue(0)
  const ink = useMotionValue(0), inv = useMotionValue(0)
  const pts = useRef<Point[]>([])

  useEffect(() => {
    const wide = matchMedia('(min-width: 1024px)'), still = matchMedia('(prefers-reduced-motion: reduce)')
    const html = document.documentElement
    let raf = 0
    const apply = (s: number) => {
      if (!pts.current.length) return
      const p = at(pts.current, s)
      x.set(p.x - BASE / 2); y.set(p.y - BASE / 2); scale.set(p.size / BASE); rotate.set(p.rot)
      ink.set(1 - p.inv); inv.set(p.inv)
    }
    const measure = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const live = wide.matches && !still.matches
        html.toggleAttribute('data-motif-live', live && document.querySelector('[data-motif-slot]') !== null)
        pts.current = live ? build() : []
        if (live) apply(scrollY.get()); else { ink.set(0); inv.set(0) }
      })
    }
    measure()
    const unsub = scrollY.on('change', apply)
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)
    wide.addEventListener('change', measure); still.addEventListener('change', measure)
    addEventListener('resize', measure)
    return () => {
      unsub(); ro.disconnect(); cancelAnimationFrame(raf)
      wide.removeEventListener('change', measure); still.removeEventListener('change', measure)
      removeEventListener('resize', measure)
      html.removeAttribute('data-motif-live')
    }
  }, [path, scrollY, x, y, scale, rotate, ink, inv])

  return (
    <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-30 hidden size-16 will-change-transform lg:block" style={{ x, y, scale, rotate }}>
      <motion.span className="absolute inset-0 text-(--color-text)" style={{ opacity: ink }}><Mark className="size-full" /></motion.span>
      <motion.span className="absolute inset-0 text-(--color-background)" style={{ opacity: inv }}><Mark className="size-full" /></motion.span>
    </motion.div>
  )
}
