'use client'
// OpusKit piece — adapted from Motion Primitives "Text Effect" (MIT © 2024 ibelick, https://motion-primitives.com); the `cut`
// preset from Fancy Components "Vertical Cut Reveal" (MIT © 2024 Daniel Petho, https://fancycomponents.dev).
// Reveals a headline word by word (or letter by letter) once it enters the viewport: `slide`, `blur`, `fade`, or `cut` —
// each word slides up out of a hard mask, sharper than a fade. Colors and fonts come from the recipe tokens.
import { motion, useReducedMotion, type Variants } from 'motion/react'
import type { JSX } from 'react'

type Preset = 'blur' | 'slide' | 'fade' | 'cut'
const ITEM: Record<Preset, Variants> = {
  blur: { hidden: { opacity: 0, filter: 'blur(10px)', y: 8 }, visible: { opacity: 1, filter: 'blur(0px)', y: 0 } },
  slide: { hidden: { opacity: 0, y: '0.6em' }, visible: { opacity: 1, y: 0 } },
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  cut: { hidden: { y: '105%' }, visible: { y: 0 } },
}

export function TextEffect({ children, as = 'h2', per = 'word', preset = 'slide', delay = 0, className }: {
  children: string; as?: keyof JSX.IntrinsicElements; per?: 'word' | 'char'; preset?: Preset; delay?: number; className?: string
}) {
  const reduce = useReducedMotion()
  const Tag = motion[as as 'h2']
  const parts = per === 'word' ? children.split(/(\s+)/) : children.split('')
  const timing = reduce ? { duration: 0 } : preset === 'cut' ? { type: 'spring' as const, stiffness: 190, damping: 22 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
  return (
    <Tag className={className} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }}
      transition={reduce ? { duration: 0 } : { staggerChildren: per === 'word' ? (preset === 'cut' ? 0.07 : 0.06) : 0.025, delayChildren: delay }}> {/* same markup either way (hydration); reduced motion only drops the timing */}
      <span className="sr-only">{children}</span>
      {parts.map((p, i) => /^\s+$/.test(p) ? p /* plain spaces, so a wrapped line never starts indented */ : preset === 'cut' ? (
        <span key={i} aria-hidden className="inline-flex overflow-hidden pb-[0.08em] align-bottom">
          <motion.span className="inline-block whitespace-pre" variants={ITEM.cut} transition={timing}>{p}</motion.span>
        </span>
      ) : (
        <motion.span key={i} aria-hidden className="inline-block whitespace-pre" variants={ITEM[preset]} transition={timing}>{p}</motion.span>
      ))}
    </Tag>
  )
}
