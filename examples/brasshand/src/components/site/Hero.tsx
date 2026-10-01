'use client'
// Kinetic type hero: the headline is the image. Each hand-set line slides up out of its mask on arrival (CutReveal,
// staggered per line), then drifts sideways with scroll, alternate lines in opposite directions (±20vw).
// Bayon has no weight or width axis, so the drift carries the motion on its own.
// Mobile: its own four-line break, vertical line reveals only, no drift. Reduced motion: lines appear, type stands still.
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { CutReveal } from '@/components/pieces/CutReveal'
import { MagneticLink } from '@/components/site/links'

const DESKTOP = ['We name', 'things Baku', 'remembers']
const MOBILE = ['We name', 'things', 'Baku', 'remembers']

function Line({ text, i, x }: { text: string; i: number; x?: MotionValue<string> }) {
  return (
    <motion.span className="block whitespace-nowrap motion-reduce:transform-none!" style={x ? { x } : undefined}>
      <CutReveal as="span" delay={0.08 * i} className="block">{text}</CutReveal>
    </motion.span>
  )
}

export function Hero({ line }: { line: string }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const right = useTransform(scrollYProgress, [0, 1], ['0vw', '20vw'])
  const left = useTransform(scrollYProgress, [0, 1], ['0vw', '-20vw'])
  return (
    <section ref={ref} className="flex min-h-svh flex-col justify-end overflow-hidden px-5 pb-12 pt-28 md:px-8 md:pb-16">
      <h1 aria-label={DESKTOP.join(' ')} className="type-display mx-auto w-full max-w-[1440px] [font-size:clamp(4rem,22vw,8rem)] md:[font-size:clamp(4rem,13vw,12rem)]">
        <span aria-hidden className="hidden md:block">{DESKTOP.map((t, i) => <Line key={t} text={t} i={i} x={i % 2 ? left : right} />)}</span>
        <span aria-hidden className="md:hidden">{MOBILE.map((t, i) => <Line key={t} text={t} i={i} />)}</span>
      </h1>
      <div className="mx-auto mt-10 grid w-full max-w-[1440px] items-end gap-8 md:mt-12 md:grid-cols-12">
        <p className="type-body max-w-[44ch] md:col-span-5">{line}</p>
        <div className="md:col-span-4 md:col-start-9 md:justify-self-end">
          <MagneticLink href="/contact" className="type-body inline-flex min-h-12 items-center rounded-(--radius-button) bg-(--color-primary) px-7 text-(--color-background) transition-colors duration-150 hover:bg-(--color-muted)">
            Start a project
          </MagneticLink>
        </div>
      </div>
    </section>
  )
}
