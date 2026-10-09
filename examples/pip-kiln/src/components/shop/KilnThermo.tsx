'use client'
// Shop's remembered moment, "Cooling down": a kiln thermometer rides in the sticky filter bar. As you scroll the
// shop, it counts down from 1,240°C (the firing) to 21°C, the raspberry column sinks, and a sticker pops:
// "Cool enough to post". Same on phones, smaller. Reduced motion: it simply reads 21°C with the sticker shown.
import { useEffect, useState, type RefObject } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { shop } from '@/content/shop'
import { useReduced } from '@/lib/use-media'

const HOT = 1240, COOL = 21
const num = new Intl.NumberFormat('en-GB')

export function KilnThermo({ target }: { target: RefObject<HTMLElement | null> }) {
  const reduce = useReduced()
  const { scrollYProgress } = useScroll({ target, offset: ['start start', 'end end'] })
  const p = useTransform(scrollYProgress, [0, 0.85], [0, 1], { clamp: true })
  const fill = useTransform(p, [0, 1], [1, 0.08])
  const [t, setT] = useState(HOT)
  useMotionValueEvent(p, 'change', (v) => setT(Math.round(HOT - v * (HOT - COOL))))
  useEffect(() => { if (reduce) setT(COOL) }, [reduce]) // eslint-disable-line react-hooks/set-state-in-effect
  const cool = reduce || t <= COOL + 5
  return (
    <div className="flex items-center gap-3" role="img" aria-label={`${shop.grid.thermo.label}: ${num.format(t)}°C`}>
      <span aria-hidden className="relative h-10 w-3.5 overflow-hidden rounded-full border border-(--color-text) bg-(--color-surface)">
        <motion.span style={{ scaleY: reduce ? 0.08 : fill }} className="absolute inset-0 origin-bottom bg-(--color-accent)" />
      </span>
      <span aria-hidden className="flex flex-col leading-none">
        <span className="type-caption hidden sm:block">{shop.grid.thermo.label}</span>
        <span className="t-card inline-block min-w-[5.2ch] tabular-nums [font-size:1.15rem]">{num.format(reduce ? COOL : t)}°C</span>
      </span>
      <AnimatePresence>
        {cool && (
          <motion.span key="cool" initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, rotate: -12 }} animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, rotate: -4 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }} transition={reduce ? { duration: 0.2 } : { type: 'spring', duration: 0.5, bounce: 0.45 }}
            className="t-action hidden whitespace-nowrap rounded-(--radius-button) bg-(--color-text) px-3 py-1.5 text-(--color-background) sm:inline-block">{shop.grid.thermo.done}</motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}
