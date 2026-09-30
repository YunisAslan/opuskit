'use client'
// OpusKit piece — adapted from Magic UI "Scroll Based Velocity" (MIT © Magic UI, https://magicui.design).
// A band of big type that drifts sideways and speeds up (or reverses) with the visitor's scroll.
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from 'motion/react'
import { useRef } from 'react'

const wrap = (min: number, max: number, v: number) => ((((v - min) % (max - min)) + (max - min)) % (max - min)) + min

export function VelocityBand({ text, speed = 3, className }: { text: string; speed?: number; className?: string }) {
  const reduce = useReducedMotion()
  const base = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const factor = useTransform(velocity, [0, 1000], [0, 5], { clamp: false })
  const x = useTransform(base, (v) => `${wrap(-50, -25, v)}%`)
  const dir = useRef(1)
  useAnimationFrame((_, delta) => {
    if (reduce) return
    const f = factor.get()
    if (f < 0) dir.current = -1; else if (f > 0) dir.current = 1
    base.set(base.get() + dir.current * speed * (delta / 1000) * (1 + Math.abs(f)))
  })
  return (
    <div role="img" className={`overflow-hidden whitespace-nowrap ${className ?? ''}`} aria-label={text}>
      <motion.div aria-hidden className="flex w-max" style={reduce ? undefined : { x }}>
        {[0, 1, 2, 3].map((k) => <span key={k} className="pr-[0.5em]">{text}</span>)}
      </motion.div>
    </div>
  )
}
