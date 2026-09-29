'use client'
// OpusKit piece — a text link whose underline draws in as a wave on hover or focus. Footer and inline links.
// Original OpusKit code (MIT).
import { motion, useReducedMotion } from 'motion/react'
import { useState, type ReactNode } from 'react'

const WAVE = 'M0 5 Q 5 0 10 5 T 20 5 T 30 5 T 40 5 T 50 5 T 60 5 T 70 5 T 80 5 T 90 5 T 100 5'

export function WavyLink({ href, children, current = false, className }: { href: string; children: ReactNode; current?: boolean; className?: string }) {
  const [on, setOn] = useState(false)
  const reduce = useReducedMotion()
  return (
    <a href={href} aria-current={current ? 'page' : undefined} className={`relative inline-block pb-1.5 ${className ?? ''}`}
      onPointerEnter={() => setOn(true)} onPointerLeave={() => setOn(false)} onFocus={() => setOn(true)} onBlur={() => setOn(false)}>
      {children}
      <svg aria-hidden viewBox="0 0 100 10" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-1.5 w-full text-(--color-chapter-2,var(--color-accent))">
        <motion.path d={WAVE} fill="none" stroke="currentColor" strokeWidth={1.6} vectorEffect="non-scaling-stroke" initial={false}
          animate={{ pathLength: on || current ? 1 : 0 }} transition={{ duration: reduce ? 0 : 0.35 }} />
      </svg>
    </a>
  )
}
