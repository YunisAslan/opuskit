'use client'
// OpusKit piece — adapted from Motion Primitives "Spinning Text" (MIT © 2024 ibelick, https://motion-primitives.com).
// A slowly turning ring of text — a stamp or badge beside a hero, CTA or scroll hint.
import { motion, useReducedMotion } from 'motion/react'
import type { CSSProperties } from 'react'

export function SpinningText({ children, radius = 5, duration = 18, className }: { children: string; radius?: number; duration?: number; className?: string }) {
  const reduce = useReducedMotion()
  const letters = [...children]
  return (
    <motion.div className={`relative size-[calc(var(--r)*2ch+2ch)] ${className ?? ''}`} style={{ '--r': radius } as CSSProperties}
      animate={reduce ? undefined : { rotate: 360 }} transition={{ duration, repeat: Infinity, ease: 'linear' }}>
      <span className="sr-only">{children}</span>
      {letters.map((l, i) => (
        <span key={i} aria-hidden className="absolute left-1/2 top-1/2 inline-block"
          style={{ transform: `translate(-50%, -50%) rotate(${(360 / letters.length) * i}deg) translateY(calc(var(--r) * -1ch))` }}>{l}</span>
      ))}
    </motion.div>
  )
}
