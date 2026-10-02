'use client'
// OpusKit section — Sticker orbit hero: a two-voice headline with brand stickers and photos on an ellipse around it.
// Scrolling turns the ring (each sticker travels around the headline) while the ring drifts up and away.
// Mobile: only the first `mobileCount` stickers, smaller, and the scroll motion travels half the distance. There is
// no room beside the words on a phone, so the ring is squashed into two lanes, one above the words and one below,
// joined off-screen at the sides: every sticker stays clear of the text and the button while the ring turns.
// Every sticker can be peeled off and tossed: it springs back to its place on the ring.
// Reduced motion: the ring stays still, stickers appear without the pop. Tokens only.
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'

export type OrbitItem = { src?: string; node?: ReactNode; alt: string; size?: number; tilt?: number }

/** Phone lanes, in px of the ring box: above the words [0, top], below them [bottom, h]; `s` is the sticker width. */
type Lanes = { on: boolean; top: number; bottom: number; h: number; s: number }

function Orbiter({ item, i, n, turn, lanes, hideOnMobile, still }: { item: OrbitItem; i: number; n: number; turn: MotionValue<number>; lanes: MotionValue<Lanes>; hideOnMobile: boolean; still: boolean }) {
  // On phones the ring starts half a step round, so no sticker begins parked at a lane change.
  const angle = (deg: number, phone = false) => ((i / n) * 360 - 90 + (phone ? 180 / n : 0) + deg) * (Math.PI / 180)
  const size = item.size ?? 120
  // Desktop: an ellipse round the headline. Phone: x runs past both edges (the lane change happens off-screen),
  // y sits inside its lane with a small fixed wobble per sticker, so it never reaches the words.
  const left = useTransform([turn, lanes] as MotionValue[], ([d, l]) => {
    const a = angle(d as number, (l as Lanes).on)
    if (!(l as Lanes).on) return `${50 + Math.cos(a) * 44}%`
    // Even spacing along each lane: the top lane runs left to right, the bottom one back; both ends are off-screen.
    const t = (((a / Math.PI) % 2) + 2) % 2 // 0..2 round the ring; 0..1 is the bottom lane, 1..2 the top
    return `${t < 1 ? 114 - 128 * t : -14 + 128 * (t - 1)}%`
  })
  const top = useTransform([turn, lanes] as MotionValue[], ([d, l]) => {
    const L = l as Lanes, a = angle(d as number, L.on)
    if (!L.on) return `${50 + Math.sin(a) * 40}%`
    const [lo, hi] = Math.sin(a) < 0 ? [0, L.top] : [L.bottom, L.h]
    const pad = L.s * 0.62, free = Math.max(0, hi - lo - 2 * pad)
    return `${lo + pad + free * (((i * 37) % 10) / 9)}px`
  })
  return (
    <motion.div className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-grab touch-none select-none active:cursor-grabbing ${hideOnMobile ? 'max-md:hidden' : ''}`}
      style={{ left, top, width: `min(clamp(${Math.round(size * 0.55)}px, ${(size / 12).toFixed(2)}vw, ${size}px), var(--lane, 999px))`, rotate: item.tilt ?? 0 }}
      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={still ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 18, delay: 0.15 + i * 0.06 }}
      drag dragSnapToOrigin dragElastic={0.6} whileDrag={{ scale: 1.12, rotate: (item.tilt ?? 0) * -1.5, zIndex: 20 }} whileHover={still ? undefined : { scale: 1.06 }}>
      {item.node ?? <img src={item.src} alt={item.alt} draggable={false} className="block aspect-square w-full border-[5px] border-(--color-paper) object-cover" />}
    </motion.div>
  )
}

export function OrbitHeroSection({ eyebrow, loud, quiet, line, items, action, mobileCount = 8 }: {
  eyebrow?: string; loud: ReactNode; quiet: ReactNode; line?: string; items: OrbitItem[]; action?: ReactNode; mobileCount?: number
}) {
  const ref = useRef<HTMLElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const words = useRef<HTMLDivElement>(null)
  const lanes = useMotionValue<Lanes>({ on: false, top: 0, bottom: 0, h: 0, s: 0 })
  const reduce = useReducedMotion()
  const [half, setHalf] = useState(false) // mobile: the scroll motion travels half the distance
  useEffect(() => {
    const mq = matchMedia('(max-width: 767px)')
    const sync = () => setHalf(mq.matches)
    sync(); mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  // Measure the lanes left free by the words (phones only), again whenever the layout changes size.
  useLayoutEffect(() => {
    if (!half || !ring.current || !words.current) { lanes.set({ on: false, top: 0, bottom: 0, h: 0, s: 0 }); return }
    const measure = () => {
      const r = ring.current!.getBoundingClientRect(), w = words.current!.getBoundingClientRect(), gap = 12
      const top = w.top - r.top - gap, bottom = w.bottom - r.top + gap
      const s = Math.max(40, Math.min(top, r.height - bottom) / 1.24) // the biggest sticker that fits the smaller lane
      ring.current!.style.setProperty('--lane', `${Math.round(s)}px`)
      lanes.set({ on: true, top, bottom, h: r.height, s: Math.min(s, 86) })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(ring.current); ro.observe(words.current)
    return () => { ro.disconnect(); ring.current?.style.removeProperty('--lane') }
  }, [half, lanes])
  const k = reduce ? 0 : half ? 0.5 : 1
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const turn = useTransform(scrollYProgress, [0, 1], [0, 140 * k])
  // Phones keep the ring level with the words (a drifting ring would slide the lower lane over them).
  const lift = useTransform(scrollYProgress, (p) => `${half ? 0 : -35 * k * p}%`)
  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden px-5 md:px-6">
      <motion.div ref={ring} className="absolute inset-x-0 top-[4.5rem] bottom-4 md:inset-y-6" style={{ y: lift }}>
        {items.map((it, i) => <Orbiter key={i} item={it} i={i} n={half ? Math.min(mobileCount, items.length) : items.length} turn={turn} lanes={lanes} hideOnMobile={i >= mobileCount} still={!!reduce} />)}
      </motion.div>
      <div className="pointer-events-none relative z-10 mx-auto grid h-full max-w-[1100px] place-content-center text-center">
       <div ref={words}>
        {eyebrow && <p className="type-body mx-auto max-w-[30ch] text-balance">{eyebrow}</p>}
        <h1 className="type-display mt-5 flex flex-col items-center max-md:mt-3">
          <span>{loud}</span>
          <span className="font-(family-name:--font-heading) [font-stretch:var(--type-heading-stretch)] [font-weight:var(--type-heading-weight)]">{quiet}</span>
        </h1>
        {line && <p className="type-body mx-auto mt-6 max-w-[34ch] text-balance text-(--color-muted) max-md:mt-4">{line}</p>}
        {action && <div className="pointer-events-auto mt-8 flex justify-center max-md:mt-6">{action}</div>}
       </div>
      </div>
    </section>
  )
}
