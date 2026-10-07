'use client'
// The motion system (recipe/motion.md), in order of importance:
//   Clip reveal       — a block unmasks upward, 800ms, cubic-bezier(0.65, 0, 0.35, 1); its text follows 70ms apart.
//   Image clip reveal — the frame opens like a curtain while the picture settles from 1.15, 1100ms.
//   Line reveal       — each headline line rises out of its own mask, 700ms, 80ms apart, cubic-bezier(0.22, 1, 0.36, 1).
// Each runs once, when its section wrapper enters the viewport (threshold 0.2). The states live in CSS
// (src/styles/motion.css), so reduced motion swaps them for a 200ms fade or no movement at all.
import { useRef, type CSSProperties, type ElementType, type ReactNode } from 'react'
import { useInView, useScroll, useTransform, motion } from 'motion/react'
import { cn } from '@/lib/utils'

function useReveal<T extends Element>(amount = 0.2) {
  const ref = useRef<T>(null)
  const inView = useInView(ref, { once: true, amount })
  return { ref, inView }
}

/** A section-level wrapper: observes once and lets children (FadeRise, Lines) reveal with it. */
export function RevealGroup({ as: Tag = 'div', className, children, amount }: { as?: ElementType; className?: string; children: ReactNode; amount?: number }) {
  const { ref, inView } = useReveal<HTMLElement>(amount)
  return <Tag ref={ref} data-in={inView || undefined} className={cn('reveal-group', className)}>{children}</Tag>
}

/** Clip reveal: the block unmasks upward. */
export function ClipReveal({ className, children }: { className?: string; children: ReactNode }) {
  const { ref, inView } = useReveal<HTMLDivElement>()
  // The observer watches an unclipped wrapper: a fully clipped target never counts as intersecting.
  return <div ref={ref} data-in={inView || undefined} className={className}><div className="reveal-clip">{children}</div></div>
}

/** Image clip reveal: the frame opens, the picture inside settles from 1.15 to 1. */
export function ImageReveal({ className, children }: { className?: string; children: ReactNode }) {
  const { ref, inView } = useReveal<HTMLDivElement>(0.15)
  return (
    <div ref={ref} data-in={inView || undefined} className={className}>
      <div className="reveal-image"><div className="reveal-image__inner">{children}</div></div>
    </div>
  )
}

/** Text that follows its frame: opacity and a short rise, 70ms apart by index. Must sit inside a RevealGroup. */
export function FadeRise({ i = 0, as: Tag = 'div', className, children }: { i?: number; as?: ElementType; className?: string; children: ReactNode }) {
  return <Tag className={cn('reveal-rise', className)} style={{ '--i': i } as CSSProperties}>{children}</Tag>
}

type LineSet = string[] | { desktop: string[]; mobile: string[] }

/**
 * Line-by-line headline: lines are broken by hand (a separate set for phones), each masked and rising in turn.
 * Screen readers get the sentence once; the visual lines are aria-hidden.
 */
export function Lines({ as: Tag = 'h2', lines, className, lineClassName, standalone = true, still = false }: {
  as?: ElementType; lines: LineSet; className?: string; lineClassName?: string
  /** Observe itself (true) or follow a parent RevealGroup (false). */
  standalone?: boolean
  /** First-screen headings: hand-broken lines, no reveal — the first screen is complete before anything moves. */
  still?: boolean
}) {
  const { ref, inView } = useReveal<HTMLElement>(0.3)
  const sets = Array.isArray(lines) ? { desktop: lines, mobile: lines } : lines
  const text = sets.desktop.join(' ')
  const render = (set: string[], cls: string) => (
    <span aria-hidden className={cls}>
      {set.map((l, i) => (
        <span key={i} className={cn(still ? 'block' : 'reveal-line', lineClassName)}>
          <span style={{ '--i': i } as CSSProperties}>{l}</span>
        </span>
      ))}
    </span>
  )
  const same = sets.desktop.join('|') === sets.mobile.join('|')
  return (
    <Tag ref={standalone && !still ? ref : undefined} data-in={standalone && !still ? inView || undefined : undefined} className={cn(standalone && !still && 'reveal-group', className)}>
      <span className="sr-only">{text}</span>
      {same ? render(sets.desktop, 'block') : (<>{render(sets.mobile, 'block md:hidden')}{render(sets.desktop, 'hidden md:block')}</>)}
    </Tag>
  )
}

/** Media drifts slightly as the page scrolls past it (transform only). Still for reduced motion. */
export function Drift({ className, children, distance = 4 }: { className?: string; children: ReactNode; distance?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${distance}%`, `${distance}%`])
  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      {/* Same markup on server and client; reduced motion stops the drift in CSS (.drift) */}
      <motion.div style={{ y, scale: 1 + (distance * 2.2) / 100 }} className="drift size-full">{children}</motion.div>
    </div>
  )
}
