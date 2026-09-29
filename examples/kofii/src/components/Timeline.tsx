'use client'
import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { milestones } from '@/config/site'
import { useReducedMotionSafe } from '@/lib/motion'

// Signature moment: a line that draws through the story. The bar's scaleY follows section scroll;
// each milestone's dot lights up as the bar passes it. Reduced motion: the full line is shown.
export function Timeline() {
  const ref = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotionSafe()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const [lit, setLit] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const ol = ref.current
    if (!ol) return
    const h = ol.offsetHeight
    const dots = Array.from(ol.querySelectorAll<HTMLElement>('[data-dot]'))
    setLit(dots.filter((d) => d.offsetTop / h <= p + 0.001).length)
  })

  return (
    <ol ref={ref} className="relative grid gap-16 pl-12 md:gap-24 md:pl-16">
      <span aria-hidden className="absolute bottom-0 left-[7px] top-2 w-0.5 rounded-full bg-border" />
      <motion.span
        aria-hidden
        className="absolute bottom-0 left-[7px] top-2 w-0.5 origin-top rounded-full bg-accent"
        style={{ scaleY: reduce ? 1 : scrollYProgress }}
      />
      {milestones.map((m, i) => {
        const on = reduce || i < lit
        return (
          <li key={m.year} className="relative" data-reveal="rise">
            <span
              data-dot
              aria-hidden
              className={`absolute -left-12 top-1 h-4 w-4 rounded-full border-2 transition-colors duration-300 md:-left-16 ${on ? 'border-accent bg-accent' : 'border-border bg-background'}`}
            />
            <h3 className="type-heading">{m.year}</h3>
            <p className="mt-4 max-w-[52ch] text-lg">{m.text}</p>
          </li>
        )
      })}
    </ol>
  )
}
