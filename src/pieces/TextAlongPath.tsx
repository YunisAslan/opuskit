'use client'
// OpusKit piece — adapted from Fancy Components "Text Along Path" (MIT © 2024 Daniel Petho, https://fancycomponents.dev).
// A line of text that runs along a curve and travels along it as the visitor scrolls.
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useId, useRef } from 'react'

export function TextAlongPath({ text, path = 'M0,80 C200,0 400,160 600,80 S1000,0 1200,80', className }: { text: string; path?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const id = useId()
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const offset = useTransform(scrollYProgress, [0, 1], ['0%', '-60%'])
  return (
    <div ref={ref} className={className}>
    <svg viewBox="0 0 1200 160" className="w-full overflow-visible fill-(--color-text)" role="img" aria-label={text}>
      <path id={id} d={path} fill="none" />
      <text aria-hidden>
        <motion.textPath href={`#${id}`} startOffset={reduce ? '0%' : offset}>{`${text} ${text} ${text}`}</motion.textPath>
      </text>
    </svg>
    </div>
  )
}
