'use client'
// OpusKit piece — adapted from Motion Primitives "Text Roll" (MIT © 2024 ibelick, https://motion-primitives.com).
// On hover each letter rolls over to a copy of itself, one after another. For nav links and text buttons.
import { motion, useReducedMotion } from 'motion/react'

export function TextRoll({ children, className }: { children: string; className?: string }) {
  const reduce = useReducedMotion()
  const letters = children.split('')
  return (
    <motion.span className={`relative inline-flex overflow-hidden ${className ?? ''}`} initial="rest" whileHover={reduce ? undefined : 'hover'} whileFocus={reduce ? undefined : 'hover'} aria-label={children}>
      {letters.map((l, i) => (
        <span key={i} aria-hidden className="relative inline-block">
          <motion.span className="inline-block" variants={{ rest: { y: 0 }, hover: { y: '-100%' } }} transition={{ duration: 0.3, delay: i * 0.02, ease: [0.65, 0, 0.35, 1] }}>{l === ' ' ? ' ' : l}</motion.span>
          <motion.span className="absolute left-0 top-full inline-block" variants={{ rest: { y: 0 }, hover: { y: '-100%' } }} transition={{ duration: 0.3, delay: i * 0.02, ease: [0.65, 0, 0.35, 1] }}>{l === ' ' ? ' ' : l}</motion.span>
        </span>
      ))}
    </motion.span>
  )
}
