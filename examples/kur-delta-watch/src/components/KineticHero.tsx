'use client'
import Link from 'next/link'
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { SplitFlap } from '@/components/pieces/SplitFlap'
import { Button } from '@/components/ui/button'

// Kinetic type hero: the total turns over like a departure board, huge on the yellow; the words under it drift apart
// as you scroll (one line left, one right). Phones: the words re-broken into three lines that rise in turn, no drift.
export function KineticHero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const left = useTransform(scrollYProgress, [0, 1], ['0vw', '-20vw'])
  const right = useTransform(scrollYProgress, [0, 1], ['0vw', '14vw'])
  const still = useMotionValue('0vw') // same server markup either way, so reduced motion doesn't break hydration
  const line = 'line type-display block whitespace-nowrap [font-size:inherit]'
  const drift = 'type-display block whitespace-nowrap [font-size:inherit]'

  return (
    <section ref={ref} className="relative flex flex-col justify-between md:min-h-[calc(100svh-4rem)] overflow-hidden px-5 pt-8 pb-6 md:px-10 md:pt-10">
      <h1 className="sr-only">2,140 tonnes of rubbish out of the river so far</h1>
      <div aria-hidden>
        <SplitFlap text="2,140" className="type-display leading-[1.02]! gap-[0.05em]! [font-size:min(20.5vw,29svh)] [&>span]:rounded-none" />
        {/* Desktop: two lines, drifting apart with the scroll */}
        <p data-lines className="mt-[0.3em] hidden [font-size:min(11vw,17svh)] md:block">
          <span className="line-mask"><span className="line"><motion.span style={{ x: reduce ? still : left }} className={drift}>Tonnes of rubbish</motion.span></span></span>
          <span className="line-mask"><span className="line"><motion.span style={{ x: reduce ? still : right }} className={drift}>out of the river</motion.span></span></span>
        </p>
        {/* Phones: re-broken by hand, rising line by line */}
        <p data-lines className="mt-5 [font-size:19.5vw] md:hidden">
          <span className="line-mask"><span className={line}>Tonnes of</span></span>
          <span className="line-mask"><span className={line}>rubbish out</span></span>
          <span className="line-mask"><span className={line}>of the river</span></span>
        </p>
      </div>
      <div className="mt-10 grid gap-6 border-t-2 border-(--color-border) pt-5 md:grid-cols-12 md:items-end md:gap-4">
        <p className="type-body max-w-[42ch] text-[1.125rem] md:col-span-6">
          Pulled by hand from the lower Kür since October 2019, and every sack weighed on the bank before it goes in the skip.
        </p>
        <p className="type-utility text-(--color-muted) md:col-span-3">Counted to 30 September 2026<br />Neftchala, Azerbaijan</p>
        <div className="md:col-span-3 md:justify-self-end">
          <Button asChild size="lg"><Link href="/donate">Take a sack out</Link></Button>
        </div>
      </div>
    </section>
  )
}
