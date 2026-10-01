'use client'
// Line-by-line headline reveal: each line is masked and rises from 100% to 0, 80 ms apart, once on entry.
// Lines are split by hand in the markup. Reduced motion: shown immediately.
import { motion, useReducedMotion } from 'motion/react'

export function Lines({ lines, className }: { lines: { text: string; className?: string }[]; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.h2 className={className} initial={reduce ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.5 }} transition={{ staggerChildren: 0.08 }}>
      {lines.map((l) => (
        <span key={l.text} className="block overflow-hidden pb-[0.1em]">
          <motion.span className={`block ${l.className ?? ''}`} variants={{ hidden: { y: '105%' }, visible: { y: 0 } }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>{l.text}</motion.span>
        </span>
      ))}
    </motion.h2>
  )
}
