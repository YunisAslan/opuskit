'use client'
// OpusKit piece — based on Componentry "Sticky Scroll Cards" (MIT © Componentry, https://componentry.dev).
// Cards stack on top of each other while scrolling; each one settles and shrinks slightly as the next arrives.
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef, type ReactNode } from 'react'

function Card({ children, i, total, progress }: { children: ReactNode; i: number; total: number; progress: MotionValue<number> }) {
  const scale = useTransform(progress, [i / total, 1], [1, 1 - (total - i) * 0.04])
  return (
    <div className="sticky flex h-[85svh] items-start justify-center" style={{ top: `calc(8svh + ${i * 1.5}rem)` }}>
      <motion.div className="h-[70svh] w-full origin-top overflow-hidden bg-(--color-surface)" style={{ scale }}>{children}</motion.div>
    </div>
  )
}

export function StickyCards({ cards, className }: { cards: ReactNode[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  if (reduce) return <div className={`grid gap-6 ${className ?? ''}`}>{cards.map((c, i) => <div key={i} className="bg-(--color-surface)">{c}</div>)}</div>
  return <div ref={ref} className={className}>{cards.map((c, i) => <Card key={i} i={i} total={cards.length} progress={scrollYProgress}>{c}</Card>)}</div>
}
