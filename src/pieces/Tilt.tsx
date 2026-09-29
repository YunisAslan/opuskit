'use client'
// OpusKit piece — adapted from Motion Primitives "Tilt" (MIT © 2024 ibelick, https://motion-primitives.com).
// A card that leans toward the cursor in 3D. Keep the angle small (≤ 8°) so it reads as craft, not a gimmick.
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import type { ReactNode } from 'react'

export function Tilt({ children, degrees = 8, className }: { children: ReactNode; degrees?: number; className?: string }) {
  const reduce = useReducedMotion()
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const rx = useTransform(y, [-0.5, 0.5], [degrees, -degrees])
  const ry = useTransform(x, [-0.5, 0.5], [-degrees, degrees])
  const transform = useMotionTemplate`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div className={className} style={{ transform, transformStyle: 'preserve-3d' }}
      onPointerMove={(e) => { if (e.pointerType !== 'mouse') return; const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left) / r.width - 0.5); y.set((e.clientY - r.top) / r.height - 0.5) }}
      onPointerLeave={() => { x.set(0); y.set(0) }}>
      {children}
    </motion.div>
  )
}
