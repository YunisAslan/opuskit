'use client'
// The site's entrances — every section enters like a cut in a film: the picture first, the words second.
//   <Cut>    media unmasks (from a thin line, or rising like a curtain) while the picture inside settles 1.15 → 1.
//   <Lines>  a headline, one masked line at a time (80 ms apart). `onLoad` plays it in CSS at first paint, for the
//            words that open a page, so they never wait for JavaScript.
//   <After>  words that follow their picture: a short fade and 16 px rise once the media has landed.
// All play once. Reduced motion: a 200 ms fade, no travel; lines simply appear.
import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { EASE_CUT, EASE_LINE, REVEAL, STAGGER, VIEWPORT, useReduced } from '@/lib/motion'
import { cn } from '@/lib/utils'

export function Cut({ children, className, from = 'line', delay = 0 }: { children: ReactNode; className?: string; from?: 'line' | 'below'; delay?: number }) {
  const reduce = useReduced()
  if (reduce) return (
    <motion.div className={className} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={VIEWPORT} transition={{ duration: 0.2 }}>{children}</motion.div>
  )
  const closed = from === 'line' ? 'inset(49.5% 0% 49.5% 0%)' : 'inset(100% 0% 0% 0%)'
  // The observed box is the unclipped outer one: IntersectionObserver counts an element's own clip-path, so a picture
  // closed to a line would never reach the threshold. It hands its state down through variants.
  return (
    <motion.div className={cn('relative', className)} initial="closed" whileInView="open" viewport={VIEWPORT}>
      <motion.div className="absolute inset-0 overflow-hidden" variants={{ closed: { clipPath: closed }, open: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: REVEAL, ease: EASE_CUT, delay } } }}>
        <motion.div className="drift h-full w-full" variants={{ closed: { scale: 1.15 }, open: { scale: 1, transition: { duration: REVEAL + 0.15, ease: EASE_CUT, delay } } }}>
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export function Lines({ lines, className, as: Tag = 'h2', delay = 0, onLoad = false, lineClassName }: { lines: ReactNode[]; className?: string; as?: 'h1' | 'h2' | 'h3' | 'p'; delay?: number; onLoad?: boolean; lineClassName?: string }) {
  const reduce = useReduced()
  return (
    <Tag className={className}>
      {lines.map((l, i) => (
        <span key={i} className="line-mask">
          {onLoad ? (
            <span className={cn('block motion-safe:animate-[line-in_700ms_cubic-bezier(0.22,1,0.36,1)_both]', lineClassName)} style={{ animationDelay: `${delay + 0.15 + i * STAGGER}s` }}>{l}</span>
          ) : reduce ? (
            <span className={cn('block', lineClassName)}>{l}</span>
          ) : (
            <motion.span className={cn('block', lineClassName)} initial={{ y: '110%' }} whileInView={{ y: '0%' }} viewport={VIEWPORT} transition={{ duration: 0.7, ease: EASE_LINE, delay: delay + i * STAGGER }}>{l}</motion.span>
          )}
          {i < lines.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  )
}

export function After({ children, className, delay = 0.5, as = 'div' }: { children: ReactNode; className?: string; delay?: number; as?: 'div' | 'p' | 'li' }) {
  const reduce = useReduced()
  const M = as === 'p' ? motion.p : as === 'li' ? motion.li : motion.div
  return (
    <M className={className} initial={{ opacity: 0, y: reduce ? 0 : 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT} transition={{ duration: reduce ? 0.2 : 0.7, ease: EASE_LINE, delay: reduce ? 0 : delay }}>
      {children}
    </M>
  )
}
