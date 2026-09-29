'use client'
// OpusKit piece — two-voice headline: one whole word (or phrase) in the loud display face, the rest in the quiet
// heading face at the same size; letters rise out of a line mask when it comes into view. Original OpusKit code (MIT).
import { motion, useReducedMotion } from 'motion/react'
import type { JSX } from 'react'

function Letters({ text, from }: { text: string; from: number }) {
  return <>{[...text].map((ch, i) => (
    <span key={i} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
      <motion.span className="inline-block" variants={{ hidden: { y: '110%' }, shown: { y: 0 } }} transition={{ type: 'spring', stiffness: 200, damping: 24, delay: (from + i) * 0.025 }}>{ch === ' ' ? ' ' : ch}</motion.span>
    </span>
  ))}</>
}

export function DuoHeadline({ loud, quiet, as = 'h2', className }: { loud: string; quiet: string; as?: keyof JSX.IntrinsicElements; className?: string }) {
  const reduce = useReducedMotion()
  const Tag = motion[as as 'h2']
  return (
    <Tag className={`type-display flex flex-wrap items-baseline justify-center gap-x-[0.25em] ${className ?? ''}`} initial={reduce ? false : 'hidden'} whileInView="shown" viewport={{ once: true, amount: 0.6 }} aria-label={`${loud} ${quiet}`}>
      <span aria-hidden><Letters text={loud} from={0} /></span>
      <span aria-hidden className="font-(family-name:--font-heading) [font-stretch:var(--type-heading-stretch)] [font-weight:var(--type-heading-weight)]"><Letters text={quiet} from={loud.length} /></span>
    </Tag>
  )
}
