'use client'
// OpusKit piece — adapted from Fancy Components "Vertical Cut Reveal" (MIT © 2024 Daniel Petho, https://fancycomponents.dev).
// Each word (or letter) slides up out of a hard mask, as if cut from the line — sharper than a fade.
import { motion, useReducedMotion } from 'motion/react'
import type { JSX } from 'react'

export function CutReveal({ children, as = 'h2', per = 'word', delay = 0, className }: { children: string; as?: keyof JSX.IntrinsicElements; per?: 'word' | 'char'; delay?: number; className?: string }) {
  const reduce = useReducedMotion()
  const Tag = motion[as as 'h2']
  const words = children.split(' ')
  let n = 0
  return (
    <Tag className={className} initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.6 }}>
      <span className="sr-only">{children}</span>
      {words.map((w, wi) => (
        <span key={wi} aria-hidden className="inline-flex overflow-hidden pb-[0.08em] align-bottom">
          {(per === 'word' ? [w] : [...w]).map((part, pi) => (
            <motion.span key={pi} className="inline-block" variants={{ hidden: { y: '105%' }, shown: { y: 0 } }}
              transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 190, damping: 22, delay: delay + (n++) * (per === 'word' ? 0.07 : 0.025) }}>{part}</motion.span>
          ))}
          {wi < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </Tag>
  )
}
