'use client'
// OpusKit piece — adapted from Fancy Components "Underline To Background" (MIT © 2024 Daniel Petho, https://fancycomponents.dev).
// A link whose underline grows into a full background block on hover or focus, flipping the text colour.
import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import Link from 'next/link'

// Rendered through next/link (same element, same behaviour) so in-site links respect basePath and navigate client-side.
const MotionLink = motion.create(Link)

export function UnderlineFill({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <MotionLink href={href} className={`relative inline-block px-[0.1em] ${className ?? ''}`} initial="rest" whileHover="hover" whileFocus="hover">
      <motion.span aria-hidden className="absolute inset-x-0 bottom-0 -z-0 bg-(--color-text)" variants={{ rest: { height: '0.08em' }, hover: { height: reduce ? '0.08em' : '100%' } }} transition={{ duration: 0.25, ease: [0.65, 0, 0.35, 1] }} />
      <motion.span className="relative" variants={{ rest: { color: 'var(--color-text)' }, hover: { color: reduce ? 'var(--color-text)' : 'var(--color-background)' } }} transition={{ duration: 0.2 }}>{children}</motion.span>
    </MotionLink>
  )
}
