'use client'
// OpusKit piece — a link whose underline draws itself on hover or focus; the current page keeps it. Two strokes:
// `scribble` — a hand-drawn squiggle (navigation), `wave` — an even wave (footer and inline links). Original OpusKit code (MIT).
// The line hangs just under the text and takes no room, so a link lines up with whatever sits beside it.
import { motion, useReducedMotion } from 'motion/react'
import { useState, type ElementType, type ReactNode } from 'react'

const STROKES = {
  scribble: { d: 'M2 7 C 12 3, 22 10, 34 6 S 58 2, 70 6 S 92 11, 98 5', box: '0 0 100 12', width: 2.2, h: 'h-2', ink: 'text-(--color-chapter-1,var(--color-accent))', time: 0.45 },
  wave: { d: 'M0 5 Q 5 0 10 5 T 20 5 T 30 5 T 40 5 T 50 5 T 60 5 T 70 5 T 80 5 T 90 5 T 100 5', box: '0 0 100 10', width: 1.6, h: 'h-1.5', ink: 'text-(--color-chapter-2,var(--color-accent))', time: 0.35 },
}

export function DrawnLink({ link: L = 'a', href, children, stroke = 'scribble', current = false, className }: { link?: ElementType; href: string; children: ReactNode; stroke?: keyof typeof STROKES; current?: boolean; className?: string }) {
  const [on, setOn] = useState(false)
  const reduce = useReducedMotion()
  const s = STROKES[stroke], drawn = current || on
  return (
    <L href={href} aria-current={current ? 'page' : undefined} className={`relative inline-block ${className ?? ''}`}
      onPointerEnter={() => setOn(true)} onPointerLeave={() => setOn(false)} onFocus={() => setOn(true)} onBlur={() => setOn(false)}>
      {children}
      <svg aria-hidden viewBox={s.box} preserveAspectRatio="none" className={`absolute inset-x-0 top-[calc(50%+0.6em)] ${s.h} w-full overflow-visible ${s.ink}`}>
        <motion.path d={s.d} fill="none" stroke="currentColor" strokeWidth={s.width} strokeLinecap="round" vectorEffect="non-scaling-stroke"
          initial={false} animate={{ pathLength: drawn ? 1 : 0, opacity: drawn ? 1 : 0 }} transition={{ duration: reduce ? 0 : s.time, ease: [0.65, 0, 0.35, 1] }} />
      </svg>
    </L>
  )
}
