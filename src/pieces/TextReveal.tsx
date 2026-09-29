'use client'
// OpusKit piece — adapted from Magic UI "Text Reveal" (MIT © Magic UI, https://magicui.design).
// A statement paragraph whose words light up one by one as the visitor scrolls through it.
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">{children}</motion.span>
}

export function TextReveal({ children, className }: { children: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.4'] })
  const words = children.split(' ')
  if (reduce) return <p className={className}>{children}</p>
  return (
    <div ref={ref}>
      <p className={`flex flex-wrap ${className ?? ''}`} aria-label={children}>
        {words.map((w, i) => <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w}</Word>)}
      </p>
    </div>
  )
}
