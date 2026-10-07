'use client'
// The motion system (recipe/motion.md): clip reveal, image clip reveal, line-by-line headline reveal, parallax drift.
// Every effect starts from the same first render on server and client, and swaps to its reduced-motion
// alternative through the transition only (no hydration mismatch).
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'motion/react'
import { useRef, type ReactNode } from 'react'

export const EASE_PAGE = [0.65, 0, 0.35, 1] as const
export const EASE_LINE = [0.22, 1, 0.36, 1] as const
const once = { once: true, amount: 0.2 } as const

// An observer never sees an element that is clipped away, so each effect watches a plain outer block and its
// inner layers animate through variants.
const unmask: Variants = { hidden: { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 }, shown: { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 } }
const settle: Variants = { hidden: { scale: 1.15 }, shown: { scale: 1 } }
const clipTiming = (reduce: boolean | null, duration: number, delay: number) => reduce
  ? { clipPath: { duration: 0 }, opacity: { duration: 0.2 } }
  : { clipPath: { duration, ease: EASE_PAGE, delay }, opacity: { duration: 0.01, delay } }

/** Clip reveal — a block unmasks upward like a turned page. Reduced: opacity only, 200ms. */
/** `inner` styles the moving layer (use it for space-y / flex on the children). */
export function Reveal({ children, className, inner = '', delay = 0 }: { children: ReactNode; className?: string; inner?: string; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div className={className} initial="hidden" whileInView="shown" viewport={once}>
      <motion.div className={`h-full ${inner}`} variants={unmask} transition={clipTiming(reduce, 0.8, delay)}>{children}</motion.div>
    </motion.div>
  )
}

/** Image clip reveal — the picture opens like a curtain, settling from 1.15. Reduced: a 200ms fade. */
export function ImageReveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div className={`relative ${className}`} initial="hidden" whileInView="shown" viewport={once}>
      <motion.div className="absolute inset-0 overflow-hidden rounded-media" variants={unmask} transition={clipTiming(reduce, 1.05, delay)}>
        <motion.div className="absolute inset-0" variants={settle} transition={reduce ? { duration: 0 } : { duration: 1.2, ease: EASE_PAGE, delay }}>
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/** Line-by-line headline reveal — each line rises out of its own mask, 80ms apart. `mobile` re-breaks the lines
 *  under 768px. Reduced: lines shown at once. */
export function Lines({ lines, mobile, as: Tag = 'h2', className = '', delay = 0 }: {
  lines: string[]; mobile?: string[]; as?: 'h1' | 'h2' | 'h3' | 'p'; className?: string; delay?: number
}) {
  const reduce = useReducedMotion()
  // The observer watches the whole block (a line hidden under its own mask never counts as "in view").
  const set = (ls: string[], cls: string) => (
    <motion.span aria-hidden className={`block ${cls}`} initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.4 }}>
      {ls.map((l, i) => (
        <span key={i} className="-mx-[0.08em] -my-[0.1em] block overflow-hidden px-[0.08em] py-[0.1em]">
          <motion.span
            className="block"
            variants={{ hidden: { y: '110%' }, shown: { y: '0%' } }}
            transition={reduce ? { duration: 0 } : { duration: 0.7, ease: EASE_LINE, delay: delay + i * 0.08 }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
  return (
    <Tag className={className}>
      <span className="sr-only">{lines.join(' ')}</span>
      {mobile ? <>{set(mobile, 'md:hidden')}{set(lines, 'max-md:hidden')}</> : set(lines, '')}
    </Tag>
  )
}

/** Parallax drift — the picture moves slower than the page inside its frame. Reduced: static. */
export function Parallax({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, (p) => (reduce ? '0%' : `${(p - 0.5) * 16}%`))
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div className="absolute inset-0 will-change-transform" style={{ y, scale: 1.2 }}>{children}</motion.div>
    </div>
  )
}
