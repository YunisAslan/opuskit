'use client'
// The recipe's reveal patterns. Each has its reduced-motion version built in.
import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

const soft = [0.22, 1, 0.36, 1] as const
const curtain = [0.65, 0, 0.35, 1] as const

/** Fade & rise: opacity 0→1, 16px→0, 600ms. Reduced: opacity only, 200ms. Stagger siblings with `delay` (60ms steps). */
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }} transition={reduce ? { opacity: { duration: 0.2 }, y: { duration: 0 } } : { duration: 0.6, ease: soft, delay }}>
      {children}
    </motion.div>
  )
}

/** Image clip reveal: the frame opens upward like a curtain while the photo settles from 1.15 to 1. Reduced: 200ms fade.
 *  (The observed element is the unclipped outer box — a clipped element never counts as "in view".) */
export function ClipReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  const t = { duration: 1.05, ease: curtain, delay }
  return (
    <motion.div className={`relative ${className ?? ''}`} initial="closed" whileInView="open" viewport={{ once: true, amount: 0.25 }}>
      <motion.div className="absolute inset-0 overflow-hidden rounded-[inherit]" variants={{ closed: { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 }, open: { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1,
          transition: reduce ? { clipPath: { duration: 0 }, opacity: { duration: 0.2 } } : { clipPath: t, opacity: { duration: 0.3, delay } } } }}>
        <motion.div className="absolute inset-0" variants={{ closed: { scale: 1.15 }, open: { scale: 1, transition: reduce ? { duration: 0 } : t } }}>{children}</motion.div>
      </motion.div>
    </motion.div>
  )
}

/** Line-by-line reveal: lines set by hand, each masked and rising from 100%, 80ms apart. Reduced: shown at once. */
export function Lines({ lines, className }: { lines: string[]; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.p className={className} initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.4 }}>
      <span className="sr-only">{lines.join(' ')}</span>
      {lines.map((l, i) => (
        <span key={i} aria-hidden className="block overflow-hidden pb-[0.08em]">
          <motion.span className="block" variants={{ hidden: { y: '100%' }, shown: { y: 0, transition: reduce ? { duration: 0 } : { duration: 0.7, ease: soft, delay: i * 0.08 } } }}>{l}</motion.span>
        </span>
      ))}
    </motion.p>
  )
}
