'use client'
// The site's two easings and its shared reveals (recipe/motion.md).
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { CutReveal } from '@/components/pieces/CutReveal'

export const EASE = [0.22, 1, 0.36, 1] as const

function useNarrow() {
  const [narrow, set] = useState(false)
  useEffect(() => {
    const m = matchMedia('(max-width: 639px)')
    const on = () => set(m.matches)
    on(); m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [])
  return narrow
}

/** Fade & rise: opacity 0→1, 16px→0, once at 20% in view. Reduced motion: opacity only, 200 ms. */
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }} transition={reduce ? { duration: 0.2 } : { duration: 0.6, ease: EASE, delay }}>
      {children}
    </motion.div>
  )
}

/** Signature moment — Photos revealed like a curtain: inset(100% 0 0 0) → inset(0) over 1 s (700 ms on phones),
 *  the photo inside settling from 1.15 → 1. Reduced motion: the photo simply appears. */
export function Curtain({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  const narrow = useNarrow()
  let duration = narrow ? 0.7 : 1
  // Same markup with or without reduced motion (no hydration mismatch); reduced motion only zeroes the duration.
  if (reduce) duration = 0
  // The observer watches the unclipped wrapper: a clip-path of inset(100%) reads as "not intersecting" to IntersectionObserver.
  return (
    <motion.div className={className} initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.25 }}>
      <motion.div className="size-full overflow-hidden" variants={{ hidden: { clipPath: 'inset(100% 0% 0% 0%)' }, shown: { clipPath: 'inset(0% 0% 0% 0%)' } }}
        transition={{ duration, ease: EASE }}>
        <motion.div className="size-full" variants={{ hidden: { scale: 1.15 }, shown: { scale: 1 } }} transition={{ duration: duration && duration + 0.2, ease: EASE }}>{children}</motion.div>
      </motion.div>
    </motion.div>
  )
}

/** Signature moment — Chapters that open with a giant word. One word at 18–26vw (28–32vw on phones), cropped by the
 *  band, drifting 8% sideways over the band's scroll range. Phones and reduced motion: it stands still.
 *  as="h1": the word is the page's heading. Otherwise the band is aria-hidden and the section keeps its own h2. */
export function ChapterWord({ word, as }: { word: string; as?: 'h1' }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const narrow = useNarrow()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const still = reduce || narrow
  const x = useTransform(scrollYProgress, [0, 1], ['0%', still ? '0%' : '-8%'])
  const cls = 'type-display block whitespace-nowrap pl-6 leading-[0.8]! tracking-[-0.06em]! [font-size:32vw] sm:[font-size:26vw]'
  return (
    <div ref={ref} aria-hidden={as ? undefined : true} className="overflow-hidden border-b border-(--color-border) pb-[3vw] pt-8 md:pt-12">
      <motion.div style={{ x }}>
        {as ? <CutReveal as="h1" className={cls}>{word}</CutReveal> : <span className={cls}>{word}</span>}
      </motion.div>
    </div>
  )
}
