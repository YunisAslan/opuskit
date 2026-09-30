'use client'
// OpusKit piece — adapted from Motion Primitives "Animated Background" (MIT © 2024 ibelick, https://motion-primitives.com).
// One highlight slides between items as the pointer (or focus) moves — nav links, filters, tabs, a list of names.
import { motion } from 'motion/react'
import { useId, useState, type ElementType } from 'react'

export function HoverHighlight({ link: L = 'a', items, className, itemClassName }: { link?: ElementType; items: { label: string; href: string }[]; className?: string; itemClassName?: string }) {
  const [active, setActive] = useState<string | null>(null)
  const id = useId()
  return (
    <ul className={`flex ${className ?? ''}`} onPointerLeave={() => setActive(null)}>
      {items.map((it) => (
        <li key={it.href} className="relative">
          {active === it.href && <motion.span layoutId={id} className="absolute inset-0 bg-(--color-surface)" transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }} />}
          <L href={it.href} className={`relative block px-3 py-2 ${itemClassName ?? ''}`} onPointerEnter={() => setActive(it.href)} onFocus={() => setActive(it.href)} onBlur={() => setActive(null)}>{it.label}</L>
        </li>
      ))}
    </ul>
  )
}
