'use client'
// The recipe's motion system, in three wrappers. Everything eases in once as it enters the viewport;
// nothing loops. Reduced motion drops to a plain 200ms fade (and shows lines immediately).
import { motion, useReducedMotion } from 'motion/react'
import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/utils'

const CLIP_EASE = [0.65, 0, 0.35, 1] as const
const LINE_EASE = [0.22, 1, 0.36, 1] as const

/** Clip reveal — a block unmasks upward as it enters, the frame first, then the words. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduce ? 0.2 : 0.8, ease: CLIP_EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

/** Image clip reveal — the frame opens like a curtain and the inner picture settles from 1.15. */
export function RevealImage({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={cn('overflow-hidden', className)}
      initial={reduce ? { opacity: 0 } : { clipPath: 'inset(100% 0 0 0)' }}
      whileInView={reduce ? { opacity: 1 } : { clipPath: 'inset(0% 0 0 0)' }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: reduce ? 0.2 : 1.05, ease: CLIP_EASE, delay }}
    >
      <motion.div
        className="h-full w-full"
        initial={reduce ? false : { scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: reduce ? 0 : 1.1, ease: CLIP_EASE, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

/** Line-by-line headline reveal — each hand-broken line rises from behind its own mask, 80ms apart. */
export function RevealLines({
  lines,
  className,
  lineClassName,
  as: Tag = 'span',
  delay = 0,
}: {
  lines: ReactNode[]
  className?: string
  lineClassName?: string
  as?: ElementType
  delay?: number
}) {
  const reduce = useReducedMotion()
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className={cn('block overflow-hidden pb-[0.14em] -mb-[0.14em]', lineClassName)}>
          {reduce ? (
            <span className="block">{line}</span>
          ) : (
            <motion.span
              className="block"
              initial={{ y: '115%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: LINE_EASE, delay: delay + i * 0.08 }}
            >
              {line}
            </motion.span>
          )}
        </span>
      ))}
    </Tag>
  )
}