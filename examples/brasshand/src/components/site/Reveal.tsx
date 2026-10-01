'use client'
// Fade & rise reveal (recipe/motion.md): opacity 0→1, 16px rise, once, at 20% in view. Reduced motion: opacity only, 200ms
// (the rise is cancelled in CSS so server and client render the same markup).
import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

export const EASE = [0.22, 1, 0.36, 1] as const

export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div className={`motion-reduce:transform-none! ${className ?? ''}`} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }} transition={reduce ? { duration: 0.2 } : { duration: 0.6, ease: EASE }}>
      {children}
    </motion.div>
  )
}
