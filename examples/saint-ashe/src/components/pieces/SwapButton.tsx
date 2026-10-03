'use client'
// OpusKit piece — a playful button: on hover the arrow box hops from the left to the right of the label and the
// whole button tilts a little, like a sticker being peeled. Original OpusKit code (MIT).
import { motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import Link from 'next/link'

// In-site links go through next/link (client navigation, basePath); mail and outside links stay a plain <a>.
const MotionLink = motion.create(Link)

const Arrow = () => <svg viewBox="0 0 16 16" className="size-4" aria-hidden><path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>

export function SwapButton({ href, label, className }: { href: string; label: string; className?: string }) {
  const [on, setOn] = useState(false)
  const reduce = useReducedMotion()
  const A = href.startsWith('/') ? MotionLink : motion.a
  const box = <motion.span layout={!reduce} className="grid size-11 place-items-center bg-(--color-chapter-2,var(--color-accent)) text-(--color-text)"><Arrow /></motion.span>
  return (
    <A href={href} className={`type-utility inline-flex items-stretch gap-1 [font-family:var(--font-body)] ${className ?? ''}`}
      onPointerEnter={() => setOn(true)} onPointerLeave={() => setOn(false)} onFocus={() => setOn(true)} onBlur={() => setOn(false)}
      animate={{ rotate: on && !reduce ? -3 : 0 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }}>
      {!on && box}
      <motion.span layout={!reduce} className="flex items-center bg-(--color-chapter-2,var(--color-accent)) px-4 font-semibold uppercase tracking-tight text-(--color-text)">{label}</motion.span>
      {on && box}
    </A>
  )
}
