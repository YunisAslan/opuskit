'use client'
import { motion, useScroll, useTransform } from 'motion/react'
import { useReduce } from '@/lib/useMedia'
import { useRef, type ReactNode } from 'react'

// Parallax drift: the media moves at ~0.25× scroll inside an overflow-hidden frame. Static under reduced motion.
export function Parallax({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReduce()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={reduce ? undefined : { y, scale: 1.18 }} className="size-full [&_img]:size-full [&_img]:object-cover [&>span]:size-full">{children}</motion.div>
    </div>
  )
}
