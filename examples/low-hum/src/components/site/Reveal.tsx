'use client'
// Spring settle — things arrive as if placed by hand: rise 20px on a soft spring, once. Reduced motion: a 200ms fade.
import { motion } from 'motion/react'
import { useReduced } from './useReduced'
import type { ReactNode } from 'react'

export const settle = { type: 'spring' as const, stiffness: 120, damping: 20 }

export function Reveal({ children, className, delay = 0, as = 'div' }: { children: ReactNode; className?: string; delay?: number; as?: 'div' | 'li' | 'section' }) {
  const reduce = useReduced()
  const M = motion[as]
  return (
    <M className={className} initial={{ opacity: 0, y: reduce ? 0 : 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }} transition={reduce ? { duration: 0.2 } : { ...settle, delay }}>
      {children}
    </M>
  )
}
