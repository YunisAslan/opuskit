'use client'
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef, type ReactNode } from 'react'

// Signature: a chapter opens on one word set huge — wider than the screen, cropped at the edges — that slides 8%
// sideways across the band's scroll range. The heading for screen readers is the plain `label`; the giant word is an
// aria-hidden duplicate. Phones: bigger relative size, no drift. Reduced motion: the word stands still.
export function GiantWord({ word, label, as: H = 'h2', id, children }: { word: string; label: string; as?: 'h1' | 'h2'; id?: string; children?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])
  const still = useMotionValue('0%') // same server markup either way, so reduced motion doesn't break hydration
  return (
    <div ref={ref} id={id} className="overflow-hidden border-b-2 border-(--color-border)">
      <H className="sr-only">{label}</H>
      <div data-lines aria-hidden className="pt-6 md:pt-8">
        <span className="line-mask">
          <span className="line"><motion.span
            style={{ x: reduce ? still : x }}
            className="type-display -ml-[0.04em] block whitespace-nowrap leading-[0.8]! tracking-[-0.01em] [font-size:var(--giant,32vw)] max-md:transform-none! md:[font-size:var(--giant-md,30vw)]"
          >
            {word}
          </motion.span></span>
        </span>
      </div>
      {children}
    </div>
  )
}
