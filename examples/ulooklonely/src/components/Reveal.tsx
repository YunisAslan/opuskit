'use client'
// The three entrance patterns from the motion system, each with its reduced-motion alternative.
import { motion, useInView, type Variants } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { EASE_CURTAIN, EASE_SOFT } from '@/lib/motion'
import { useReduced } from '@/lib/use-media'

const VIEWPORT = { once: true, amount: 0.2 } as const

/** Fade & rise: opacity 0→1, y 16→0, direct children staggered 60ms. Reduced: opacity only, 200ms. */
export function Reveal({ children, className, as = 'div', stagger = false }: { children: ReactNode; className?: string; as?: 'div' | 'section' | 'ul' | 'figure'; stagger?: boolean }) {
  const reduce = useReduced()
  const Tag = motion[as]
  const item: Variants = reduce
    ? { hidden: { opacity: 0, y: 0 }, shown: { opacity: 1, y: 0, transition: { duration: 0.2, y: { duration: 0 } } } }
    : { hidden: { opacity: 0, y: 16 }, shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_SOFT } } }
  if (!stagger) return <Tag className={className} variants={item} initial="hidden" whileInView="shown" viewport={VIEWPORT}>{children}</Tag>
  return (
    <Tag className={className} initial="hidden" whileInView="shown" viewport={VIEWPORT} variants={{ shown: { transition: { staggerChildren: reduce ? 0 : 0.06 } } }}>
      {children}
    </Tag>
  )
}

/** A child of <Reveal stagger>. */
export function RevealItem({ children, className, as = 'div' }: { children: ReactNode; className?: string; as?: 'div' | 'li' | 'p' }) {
  const reduce = useReduced()
  const Tag = motion[as]
  const item: Variants = reduce
    ? { hidden: { opacity: 0, y: 0 }, shown: { opacity: 1, y: 0, transition: { duration: 0.2, y: { duration: 0 } } } }
    : { hidden: { opacity: 0, y: 16 }, shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_SOFT } } }
  return <Tag className={className} variants={item}>{children}</Tag>
}

/** Image clip reveal: the frame opens from the bottom like a curtain, the image settles 1.15→1. Reduced: 200ms fade.
 *  The observer sits on an unclipped wrapper — Chrome counts a fully clipped element as never in view. */
export function ClipReveal({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReduced()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, VIEWPORT)
  const t = { duration: reduce ? 0.2 : 1.05, ease: EASE_CURTAIN }
  return (
    <div ref={ref} className={className}>
      <motion.div className="h-full w-full overflow-hidden" initial={false}
        animate={reduce ? { opacity: inView ? 1 : 0, clipPath: 'inset(0% 0% 0% 0%)' } : { opacity: 1, clipPath: inView ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)' }}
        style={{ clipPath: 'inset(100% 0% 0% 0%)' }} transition={reduce ? { opacity: { duration: 0.2 }, clipPath: { duration: 0 } } : t}>
        <motion.div className="h-full w-full" initial={false} animate={{ scale: reduce || inView ? 1 : 1.15 }} style={{ scale: 1.15 }} transition={reduce ? { duration: 0 } : t}>
          {children}
        </motion.div>
      </motion.div>
    </div>
  )
}

/** Line-by-line headline: each line masked and lifted from 100%, 80ms apart. Lines are set by hand per
 *  breakpoint (`lines` from md up, `mobile` below). Reduced: lines shown at once. */
export function LineReveal({ lines, mobile, as: Tag = 'h2', className, immediate = false }: { lines: string[]; mobile?: string[]; as?: 'h1' | 'h2' | 'h3' | 'p'; className?: string; immediate?: boolean }) {
  const reduce = useReduced()
  // Above the fold: CSS keyframes, so the headline rises on first paint instead of waiting for hydration.
  const set = immediate ? (ls: string[], cls: string) => (
    <span aria-hidden className={`${cls} flex-col`}>
      {ls.map((l, i) => <span key={l} className="block overflow-hidden pb-[0.08em]"><span className="line-rise block" style={{ animationDelay: `${i * 80}ms` }}>{l}</span></span>)}
    </span>
  ) : (ls: string[], cls: string) => (
    <motion.span aria-hidden className={`${cls} flex-col`} initial="hidden" whileInView="shown" viewport={VIEWPORT} variants={{ shown: { transition: { staggerChildren: reduce ? 0 : 0.08 } } }}>
      {ls.map((l) => (
        <span key={l} className="block overflow-hidden pb-[0.08em]">
          <motion.span className="block" variants={reduce ? { hidden: { y: '0%' }, shown: { y: '0%', transition: { duration: 0 } } } : { hidden: { y: '100%' }, shown: { y: '0%', transition: { duration: 0.7, ease: EASE_SOFT } } }}>{l}</motion.span>
        </span>
      ))}
    </motion.span>
  )
  return (
    <Tag className={className} aria-label={lines.join(' ')}>
      {mobile ? <>{set(mobile, 'flex md:hidden')}{set(lines, 'hidden md:flex')}</> : set(lines, 'flex')}
    </Tag>
  )
}
