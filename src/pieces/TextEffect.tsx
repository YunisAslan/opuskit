'use client'
// OpusKit piece — adapted from Motion Primitives "Text Effect" (MIT © 2024 ibelick, https://motion-primitives.com).
// Reveals a headline word by word (or letter by letter) once it enters the viewport. Colors and fonts come from the recipe tokens.
import { motion, useReducedMotion, type Variants } from 'motion/react'
import type { JSX } from 'react'

type Preset = 'blur' | 'slide' | 'fade'
const ITEM: Record<Preset, Variants> = {
  blur: { hidden: { opacity: 0, filter: 'blur(10px)', y: 8 }, visible: { opacity: 1, filter: 'blur(0px)', y: 0 } },
  slide: { hidden: { opacity: 0, y: '0.6em' }, visible: { opacity: 1, y: 0 } },
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
}

export function TextEffect({ children, as = 'h2', per = 'word', preset = 'slide', delay = 0, className }: {
  children: string; as?: keyof JSX.IntrinsicElements; per?: 'word' | 'char'; preset?: Preset; delay?: number; className?: string
}) {
  const reduce = useReducedMotion()
  const Tag = motion[as as 'h2']
  const parts = per === 'word' ? children.split(/(\s+)/) : children.split('')
  return (
    <Tag className={className} initial={reduce ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.6 }}
      transition={{ staggerChildren: per === 'word' ? 0.06 : 0.025, delayChildren: delay }}>
      <span className="sr-only">{children}</span>
      {parts.map((p, i) => (
        <motion.span key={i} aria-hidden className="inline-block whitespace-pre" variants={ITEM[preset]} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>{p}</motion.span>
      ))}
    </Tag>
  )
}
