'use client'
// The motion system (recipe/motion.md): fade & rise, image clip reveal, line-by-line headlines. One easing pair site-wide.
// Each has its reduced-motion version: opacity only, a short fade, or lines shown at once.
import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

export const EASE_OUT = [0.22, 1, 0.36, 1] as const
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const

/** Fade & rise: a section wrapper arrives once, 16px up, 600ms. Reduced motion: opacity only, 200ms. */
export function Reveal({ children, className, delay = 0, as = 'div' }: { children: ReactNode; className?: string; delay?: number; as?: 'div' | 'li' }) {
  const reduce = useReducedMotion()
  const Tag = as === 'li' ? motion.li : motion.div
  return (
    <Tag className={className} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }} transition={reduce ? { y: { duration: 0 }, opacity: { duration: 0.2 } } : { duration: 0.6, ease: EASE_OUT, delay }}>
      {children}
    </Tag>
  )
}

/** Image clip reveal: the frame opens upward like a curtain while the photo settles from 1.15 to 1.
 *  `drift` adds the parallax drift (CSS scroll-driven, off under reduced motion). Reduced motion: a 200ms fade. */
export function ClipImage({ src, alt, width, height, className = '', imgClassName = '', drift = false, ratio }: {
  src: string; alt: string; width?: number; height?: number; className?: string; imgClassName?: string; drift?: boolean; ratio?: number
}) {
  const reduce = useReducedMotion()
  // The observed wrapper is never clipped itself (an IntersectionObserver ignores what clip-path hides); the curtain
  // and the zoom below follow it through variants.
  return (
    <motion.div className={className} style={ratio ? { aspectRatio: ratio } : undefined} initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.25 }}>
      <motion.div className="h-full w-full overflow-hidden rounded-(--radius-media)"
        variants={{ hidden: { clipPath: 'inset(100% 0 0 0)' }, shown: reduce ? { clipPath: 'inset(0% 0 0 0)', opacity: [0, 1] } : { clipPath: 'inset(0% 0 0 0)' } }}
        transition={reduce ? { clipPath: { duration: 0 }, opacity: { duration: 0.2 } } : { duration: 1.05, ease: EASE_IN_OUT }}>
        <motion.div className="h-full w-full" variants={{ hidden: { scale: 1.15 }, shown: { scale: 1 } }} transition={{ duration: reduce ? 0 : 1.1, ease: EASE_IN_OUT }}>
          <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" className={`h-full w-full object-cover ${drift ? 'drift' : ''} ${imgClassName}`} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/** Line-by-line headline: each hand-set line is masked and slides up, 80ms apart. `mobile` re-breaks it by hand
 *  under 768px. Screen readers get the sentence once. Reduced motion: lines are simply there. */
export function Lines({ lines, mobile, as: Tag = 'p', className }: { lines: string[]; mobile?: string[]; as?: 'p' | 'h1' | 'h2'; className?: string }) {
  const reduce = useReducedMotion()
  const set = (ls: string[], cls: string) => (
    <motion.span aria-hidden className={cls} initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: reduce ? 0 : 0.08 }}>
      {ls.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span className="block" variants={{ hidden: { y: '105%' }, shown: { y: 0 } }}
            transition={reduce ? { duration: 0 } : { duration: 0.7, ease: EASE_OUT }}>{l}</motion.span>
        </span>
      ))}
    </motion.span>
  )
  return (
    <Tag className={className}>
      <span className="sr-only">{lines.join(' ')}</span>
      {set(lines, mobile ? 'hidden md:block' : 'block')}
      {mobile && set(mobile, 'block md:hidden')}
    </Tag>
  )
}
