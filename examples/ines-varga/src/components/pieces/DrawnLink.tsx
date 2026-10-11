'use client'
// OpusKit piece — a link whose underline draws itself on hover or focus; the current page keeps it. Two strokes:
// `scribble` — a hand-drawn squiggle (navigation), `wave` — an even wave (footer and inline links). Original OpusKit code (MIT).
// The line hangs just under the text and takes no room, so a link lines up with whatever sits beside it.
import { motion, useReducedMotion } from 'motion/react'
import Link from 'next/link'
import { useState, type ComponentPropsWithRef, type ElementType, type ReactNode } from 'react'

const STROKES = {
  scribble: { d: 'M2 7 C 12 3, 22 10, 34 6 S 58 2, 70 6 S 92 11, 98 5', box: '0 0 100 12', width: 2.2, h: 'h-2', ink: 'text-(--color-chapter-1,var(--color-accent))', time: 0.45 },
  wave: { d: 'M0 5 Q 5 0 10 5 T 20 5 T 30 5 T 40 5 T 50 5 T 60 5 T 70 5 T 80 5 T 90 5 T 100 5', box: '0 0 100 10', width: 1.6, h: 'h-1.5', ink: 'text-(--color-chapter-2,var(--color-accent))', time: 0.35 },
}

type Own = { link?: ElementType; href: string; children: ReactNode; stroke?: keyof typeof STROKES; current?: boolean; className?: string }

// Everything else it is given (onClick, ref, aria-*, data-*, target…) goes on to the link, so wrappers such as Radix's
// SheetClose asChild can close the menu; its own pointer and focus handlers run alongside any it is given.
export function DrawnLink({ link, href, children, stroke = 'scribble', current = false, className, onPointerEnter, onPointerLeave, onFocus, onBlur, ...rest }:
  Own & Omit<ComponentPropsWithRef<'a'>, keyof Own>) {
  const L = link ?? (href.startsWith('/') ? Link : 'a') // in-site links navigate client-side without being passed in
  const [on, setOn] = useState(false)
  const reduce = useReducedMotion()
  const s = STROKES[stroke], drawn = current || on
  return (
    <L {...rest} href={href} data-drawn="" aria-current={current ? 'page' : rest['aria-current']} className={`relative inline-block ${className ?? ''}`}
      onPointerEnter={(e: React.PointerEvent<HTMLAnchorElement>) => { onPointerEnter?.(e); if (e.pointerType === 'mouse') setOn(true) }}
      onPointerLeave={(e: React.PointerEvent<HTMLAnchorElement>) => { onPointerLeave?.(e); setOn(false) }}
      onFocus={(e: React.FocusEvent<HTMLAnchorElement>) => { onFocus?.(e); setOn(true) }}
      onBlur={(e: React.FocusEvent<HTMLAnchorElement>) => { onBlur?.(e); setOn(false) }}>
      {children}
      {/* Fitted to this site: the line is revealed left to right by a clip (a stretched path's pathLength draws only part of
          it at display sizes), it scales with the type, and hover only counts for a mouse. Reduced motion: a short fade. */}
      <motion.svg aria-hidden viewBox={s.box} preserveAspectRatio="none" className={`pointer-events-none absolute inset-x-0 top-[calc(50%+0.45em)] h-[max(0.5rem,0.14em)] w-full overflow-visible ${s.ink}`}
        initial={false} animate={reduce ? { opacity: drawn ? 1 : 0 } : { clipPath: drawn ? 'inset(-50% -2% -50% 0%)' : 'inset(-50% 102% -50% 0%)', opacity: drawn ? 1 : 0 }}
        transition={reduce ? { duration: 0.15 } : { duration: s.time, ease: [0.65, 0, 0.35, 1], opacity: { duration: drawn ? 0.05 : s.time } }}>
        <path d={s.d} fill="none" stroke="currentColor" strokeWidth={s.width} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </motion.svg>
    </L>
  )
}
