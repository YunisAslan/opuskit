'use client'
// OpusKit piece — adapted from Fancy Components "Underline To Background" (MIT © 2024 Daniel Petho, https://fancycomponents.dev).
// A link whose underline grows into a full background block on hover or focus, flipping the text colour.
// In-site links pass the site's own link component (next/link) as `link`, so they keep client navigation and basePath.
import { motion, useReducedMotion } from 'motion/react'
import { useState, type ElementType, type ReactNode } from 'react'

export function UnderlineFill({ link: L = 'a', href, children, className }: { link?: ElementType; href: string; children: ReactNode; className?: string }) {
  const [on, setOn] = useState(false)
  const reduce = useReducedMotion()
  const fill = on && !reduce
  return (
    <L href={href} className={`relative inline-block px-[0.1em] ${className ?? ''}`}
      onPointerEnter={() => setOn(true)} onPointerLeave={() => setOn(false)} onFocus={() => setOn(true)} onBlur={() => setOn(false)}>
      <motion.span aria-hidden className="absolute inset-x-0 bottom-0 -z-0 bg-(--color-text)" initial={false} animate={{ height: fill ? '100%' : '0.08em' }} transition={{ duration: 0.25, ease: [0.65, 0, 0.35, 1] }} />
      <motion.span className="relative" initial={false} animate={{ color: fill ? 'var(--color-background)' : 'var(--color-text)' }} transition={{ duration: 0.2 }}>{children}</motion.span>
    </L>
  )
}
