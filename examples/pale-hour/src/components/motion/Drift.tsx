'use client'
// Parallax drift: the picture moves at a fraction of scroll speed inside its overflow-hidden frame. Scroll-linked,
// transform only, and only while in view. Reduced motion: a still picture.
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Drift({ children, amount = 8, className }: { children: ReactNode; /** % of the frame height, each way */ amount?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`])
  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.div style={reduce ? undefined : { y, scale: 1 + (amount * 2.2) / 100 }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  )
}
