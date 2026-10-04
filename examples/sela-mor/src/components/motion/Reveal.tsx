'use client'
// Fade & rise: a calm entrance, once, as the block enters the viewport (20% visible).
// Reduced motion: MotionRoot drops the travel, so it is opacity only.
import { motion } from 'motion/react'
import type { ReactNode } from 'react'

export const EASE = [0.22, 1, 0.36, 1] as const

export function Reveal({ children, delay = 0, className, as = 'div' }: { children: ReactNode; delay?: number; className?: string; as?: 'div' | 'li' | 'section' }) {
  const M = motion[as]
  return (
    <M className={className} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: EASE, delay }}>
      {children}
    </M>
  )
}
