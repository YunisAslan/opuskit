'use client'
// Line-by-line headline reveal: lines are set by hand (one string each), masked, and rise from 100% to 0 with an
// 80 ms stagger when the headline enters. Reduced motion: MotionRoot makes the rise instant, so the lines are simply there.
import { motion } from 'motion/react'
import { EASE } from './Reveal'

export function Lines({ lines, as: Tag = 'h2', className }: { lines: string[]; as?: 'h1' | 'h2' | 'p'; className?: string }) {
  return (
    <Tag className={className} aria-label={lines.join(' ')}>
      {lines.map((l, i) => (
        <span key={i} aria-hidden className="block overflow-hidden pb-[0.06em]">
          <motion.span className="block" initial={{ y: '100%' }} whileInView={{ y: 0 }} viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}>{l}</motion.span>
        </span>
      ))}
    </Tag>
  )
}
