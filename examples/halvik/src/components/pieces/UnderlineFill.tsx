'use client'
// OpusKit piece — adapted from Fancy Components "Underline To Background" (MIT © 2024 Daniel Petho, https://fancycomponents.dev).
// A link whose underline grows into a full background block on hover or focus, flipping the text colour.
import { motion, useReducedMotion } from 'motion/react'
import type { ElementType, ReactNode } from 'react'

// `link`: a motion version of the framework's link (made once, at module level: motion.create(Link)) so in-site
// links navigate client-side and keep basePath.
export function UnderlineFill({ href, children, className, link }: { href: string; children: ReactNode; className?: string; link?: ElementType }) {
  const reduce = useReducedMotion()
  const A = link ?? motion.a
  return (
    <A href={href} className={`relative inline-block px-[0.1em] ${className ?? ''}`} initial="rest" whileHover="hover" whileFocus="hover">
      <motion.span aria-hidden className="absolute inset-x-0 bottom-0 -z-0 bg-(--color-text)" variants={{ rest: { height: '0.08em' }, hover: { height: reduce ? '0.08em' : '100%' } }} transition={{ duration: 0.25, ease: [0.65, 0, 0.35, 1] }} />
      <motion.span className="relative" variants={{ rest: { color: 'var(--color-text)' }, hover: { color: reduce ? 'var(--color-text)' : 'var(--color-background)' } }} transition={{ duration: 0.2 }}>{children}</motion.span>
    </A>
  )
}
