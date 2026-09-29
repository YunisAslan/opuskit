'use client'
// OpusKit piece — a link with a hand-drawn squiggle that draws itself underneath on hover or focus; the current
// page keeps its squiggle. For navigation. Original OpusKit code (MIT).
import { motion, useReducedMotion } from 'motion/react'
import { useState, type ReactNode } from 'react'

const SQUIGGLE = 'M2 7 C 12 3, 22 10, 34 6 S 58 2, 70 6 S 92 11, 98 5'

export function ScribbleLink({ href, children, current = false, className }: { href: string; children: ReactNode; current?: boolean; className?: string }) {
  const [on, setOn] = useState(false)
  const reduce = useReducedMotion()
  const drawn = current || on
  return (
    <a href={href} aria-current={current ? 'page' : undefined} className={`relative inline-block pb-2 ${className ?? ''}`}
      onPointerEnter={() => setOn(true)} onPointerLeave={() => setOn(false)} onFocus={() => setOn(true)} onBlur={() => setOn(false)}>
      {children}
      <svg aria-hidden viewBox="0 0 100 12" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-2 w-full overflow-visible text-(--color-chapter-1,var(--color-accent))">
        <motion.path d={SQUIGGLE} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" vectorEffect="non-scaling-stroke"
          initial={false} animate={{ pathLength: drawn ? 1 : 0, opacity: drawn ? 1 : 0 }} transition={{ duration: reduce ? 0 : 0.45, ease: [0.65, 0, 0.35, 1] }} />
      </svg>
    </a>
  )
}
