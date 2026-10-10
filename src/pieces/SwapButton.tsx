'use client'
// OpusKit piece — a playful button: on hover the arrow box hops from the left to the right of the label and the
// whole button tilts a little, like a sticker being peeled. In-site links pass the site's link component (next/link)
// as `link`. Original OpusKit code (MIT).
import { motion, useReducedMotion } from 'motion/react'
import { useState, type ElementType } from 'react'

const Arrow = () => <svg viewBox="0 0 16 16" className="size-4" aria-hidden><path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>

export function SwapButton({ link: L = 'a', href, label, className }: { link?: ElementType; href: string; label: string; className?: string }) {
  const [on, setOn] = useState(false)
  const reduce = useReducedMotion()
  const box = <motion.span layout={!reduce} className="grid size-11 place-items-center bg-(--color-chapter-2,var(--color-accent)) text-(--color-chapter-2-text,var(--color-text))"><Arrow /></motion.span>
  return (
    <L href={href} className={`type-utility inline-flex [font-family:var(--font-body)] ${className ?? ''}`}
      onPointerEnter={() => setOn(true)} onPointerLeave={() => setOn(false)} onFocus={() => setOn(true)} onBlur={() => setOn(false)}>
      <motion.span className="inline-flex items-stretch gap-1" animate={{ rotate: on && !reduce ? -3 : 0 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }}>
        {!on && box}
        <motion.span layout={!reduce} className="flex items-center bg-(--color-chapter-2,var(--color-accent)) px-4 font-semibold uppercase tracking-tight text-(--color-chapter-2-text,var(--color-text))">{label}</motion.span>
        {on && box}
      </motion.span>
    </L>
  )
}
