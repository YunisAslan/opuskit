'use client'
// OpusKit piece — pictures that lean with the scroll's speed: scroll fast and the whole set skews and stretches a
// little in the direction of travel, like paper in a draught; stop and it springs straight. Speed, not position, drives
// it — a slow reader never sees it. Transform only (no WebGL); reduced motion: still. Original OpusKit code (MIT).
import { motion, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from 'motion/react'
import type { ReactNode } from 'react'

export function SpeedBend({ children, strength = 1, className }: {
  /** The pictures: a grid, a row or a column of them. */ children: ReactNode
  /** How far it leans at full speed (0.5–1.5); 1 is about 6°. */ strength?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const speed = useSpring(useVelocity(scrollY), { damping: 40, stiffness: 300 })
  const skewY = useTransform(speed, [-3000, 0, 3000], [6 * strength, 0, -6 * strength])
  const scaleY = useTransform(speed, [-3000, 0, 3000], [1 + 0.06 * strength, 1, 1 + 0.06 * strength])
  return <motion.div className={className} style={reduce ? undefined : { skewY, scaleY, transformOrigin: 'center' }}>{children}</motion.div>
}
