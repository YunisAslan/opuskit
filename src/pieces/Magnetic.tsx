'use client'
// OpusKit piece — adapted from Motion Primitives "Magnetic" (MIT © 2024 ibelick, https://motion-primitives.com).
// A button or link that leans toward the cursor when it comes near. Use on one or two primary actions only.
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import type { ReactNode } from 'react'

export function Magnetic({ children, strength = 0.35, className }: { children: ReactNode; strength?: number; className?: string }) {
  const reduce = useReducedMotion()
  const x = useSpring(useMotionValue(0), { stiffness: 150, damping: 12, mass: 0.2 })
  const y = useSpring(useMotionValue(0), { stiffness: 150, damping: 12, mass: 0.2 })
  if (reduce) return <span className={`inline-block ${className ?? ''}`}>{children}</span>
  return (
    <motion.span className={`inline-block ${className ?? ''}`} style={{ x, y }}
      onPointerMove={(e) => { if (e.pointerType !== 'mouse') return; const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * strength); y.set((e.clientY - r.top - r.height / 2) * strength) }}
      onPointerLeave={() => { x.set(0); y.set(0) }}>
      {children}
    </motion.span>
  )
}
