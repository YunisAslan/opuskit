'use client'
// The big idea, "one thing guides the scroll": a thin line of light, like sun moving across a floor. It starts under
// the name in the film, stays there for the walk, then leaves and visits every chapter title ([data-motif] anchors),
// resting beside each one; between chapters it stands upright in the left margin, and it lands in the footer beside
// the brand name. Desktop with motion only — phones and reduced motion show each anchor as a still line instead (CSS).
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

type Kf = { s: number; y: number; x: number; rot: number; len: number }
const BASE = 100 // px; the line is scaled to each pose's length

function keyframes(): Kf[] {
  const vh = innerHeight, sy = scrollY
  const maxS = Math.max(0, document.documentElement.scrollHeight - vh)
  const rest = vh * 0.38, R = vh * 0.28 // where a title sits when the line rests on it, and for how long it rests
  const groups: Kf[][] = []
  for (const el of document.querySelectorAll<HTMLElement>('[data-motif]')) {
    if (!el.getClientRects().length) continue
    const r = el.getBoundingClientRect()
    const rot = Number(el.dataset.rot), rotEnd = Number(el.dataset.rotEnd), len = el.offsetWidth, x = r.left
    const pin = el.dataset.hold !== undefined && el.closest<HTMLElement>('[data-pin]')
    const stage = el.closest<HTMLElement>('[data-stage]')
    if (pin && stage) {
      const top = pin.getBoundingClientRect().top + sy, off = r.top + r.height / 2 - stage.getBoundingClientRect().top
      const hold = pin.offsetHeight - vh
      groups.push([{ s: top, y: top + off, x, rot, len }, { s: top + hold, y: top + hold + off, x, rot: rotEnd, len }])
    } else {
      const y = r.top + r.height / 2 + sy
      groups.push([{ s: y - rest - R / 2, y, x, rot, len }, { s: y - rest + R / 2, y, x, rot: rotEnd, len }])
    }
  }
  const all: Kf[] = []
  groups.forEach((g, i) => {
    const prev = all[all.length - 1]
    if (prev && i > 0 && g[0].s - prev.s > 200) // between chapters: upright in the margin
      all.push({ s: (prev.s + g[0].s) / 2, y: (prev.y + g[0].y) / 2, x: 20, rot: 90, len: 44 })
    all.push(...g)
  })
  all.forEach((k) => { k.s = Math.min(maxS, Math.max(0, k.s)) })
  // Keep s strictly increasing; on a tie the later pose wins (so the footer, clamped to the page end, always lands).
  const out: Kf[] = []
  for (let i = all.length - 1; i >= 0; i--) if (!out.length || all[i].s < out[0].s - 0.5) out.unshift(all[i])
  return out
}

const smooth = (t: number) => t * t * (3 - 2 * t)
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export function pose(kfs: Kf[], s: number) {
  if (s <= kfs[0].s) return kfs[0]
  const last = kfs[kfs.length - 1]
  if (s >= last.s) return last
  let i = 0
  while (kfs[i + 1].s <= s) i++
  const a = kfs[i], b = kfs[i + 1], t = (s - a.s) / (b.s - a.s), e = smooth(t)
  return { s, y: lerp(a.y, b.y, t), x: lerp(a.x, b.x, e), rot: lerp(a.rot, b.rot, e), len: lerp(a.len, b.len, e) }
}

export function MotifTraveller() {
  const ref = useRef<HTMLDivElement>(null)
  const path = usePathname()
  useEffect(() => {
    const mq = matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)')
    const el = ref.current!
    let kfs: Kf[] = [], raf = 0
    const draw = () => {
      if (!kfs.length) { el.style.opacity = '0'; return }
      const p = pose(kfs, scrollY)
      el.style.opacity = '1'
      el.style.transform = `translate3d(${p.x}px, ${p.y - scrollY - 1}px, 0) rotate(${p.rot}deg) scaleX(${p.len / BASE})`
    }
    const measure = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => { kfs = mq.matches ? keyframes() : []; draw() }) }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)
    addEventListener('scroll', draw, { passive: true })
    addEventListener('resize', measure)
    mq.addEventListener('change', measure)
    return () => { cancelAnimationFrame(raf); ro.disconnect(); removeEventListener('scroll', draw); removeEventListener('resize', measure); mq.removeEventListener('change', measure) }
  }, [path])
  return (
    <div aria-hidden className="motif-traveller pointer-events-none fixed left-0 top-0 z-30">
      <div ref={ref} className="motif-line h-[3px] origin-left opacity-0 transition-opacity duration-300" style={{ width: BASE }} />
    </div>
  )
}
