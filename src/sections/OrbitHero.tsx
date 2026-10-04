'use client'
// OpusKit section — Sticker orbit hero: a two-voice headline with brand stickers and photos on an ellipse around it.
// Scrolling turns the ring (each sticker travels around the headline) while the ring drifts up and away.
// Reduced motion: the ring stays still. Tokens only; the loud and quiet halves use the display and heading families.
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'

export type OrbitItem = { src: string; alt: string; size?: number; tilt?: number }

function Orbiter({ item, i, n, turn }: { item: OrbitItem; i: number; n: number; turn: MotionValue<number> }) {
  const angle = (deg: number) => ((i / n) * 360 + deg) * (Math.PI / 180)
  const left = useTransform(turn, (d) => `${50 + Math.cos(angle(d)) * 46}%`)
  const top = useTransform(turn, (d) => `${50 + Math.sin(angle(d)) * 43}%`)
  return (
    <motion.img src={item.src} alt={item.alt} draggable={false} className="absolute -translate-x-1/2 -translate-y-1/2 select-none object-contain"
      style={{ left, top, width: item.size ?? 120, rotate: item.tilt ?? 0 }}
      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.2 + i * 0.05 }} />
  )
}

export function OrbitHeroSection({ eyebrow, loud, quiet, line, items }: { eyebrow?: string; loud: string; quiet: string; line?: string; items: OrbitItem[] }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const turn = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140])
  const lift = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-35%'])
  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden px-(--gutter)">
      <motion.div aria-hidden={false} className="absolute inset-0" style={{ y: lift }}>
        {items.map((it, i) => <Orbiter key={it.src + i} item={it} i={i} n={items.length} turn={turn} />)}
      </motion.div>
      <div className="relative z-10 mx-auto grid h-full max-w-[1100px] place-content-center text-center">
        {eyebrow && <p className="type-utility">{eyebrow}</p>}
        <h1 className="type-display mt-3 flex flex-wrap items-baseline justify-center gap-x-[0.25em]">
          <span>{loud}</span>
          <span className="font-(family-name:--font-heading) [font-stretch:var(--type-heading-stretch)] [font-weight:var(--type-heading-weight)]">{quiet}</span>
        </h1>
        {line && <p className="type-utility mx-auto mt-6 max-w-[34ch]">{line}</p>}
      </div>
    </section>
  )
}
