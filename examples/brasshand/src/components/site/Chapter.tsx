'use client'
// Signature moment "Chapters that open with a giant word": one word, the chapter's subject, set wider than the screen
// and cropped at its edges; it slides 8% sideways over the band's scroll range. Mobile: same crop, no drift.
// Reduced motion: the word stands still. As the page's h1 it is a real heading; otherwise it is decoration
// (aria-hidden) and the section that follows carries the heading.
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { CutReveal } from '@/components/pieces/CutReveal'

// Bayon sets about 0.41em per capital, so this size runs the word to ~112% of the screen width: cropped on the right,
// and on the left by the negative margin and the drift. Short words cap at 40vw (an 8:1 scale step stays readable).
const sizeFor = (word: string) => Math.min(40, 112 / (word.length * 0.41))

export function Chapter({ word, h1 = false }: { word: string; h1?: boolean }) {
  const size = sizeFor(word)
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])
  return (
    <div ref={ref} aria-hidden={h1 ? undefined : true} className="overflow-hidden pt-(--spacing-chapter)"
      style={{ '--chapter-size': `${size.toFixed(1)}vw` } as React.CSSProperties}>
      <motion.div style={{ x }} className="max-md:transform-none! motion-reduce:transform-none!">
        <CutReveal as={h1 ? 'h1' : 'p'} className="type-display -ml-[0.06em] whitespace-nowrap leading-[0.8]! [font-size:var(--chapter-size)]!">
          {word}
        </CutReveal>
      </motion.div>
    </div>
  )
}
