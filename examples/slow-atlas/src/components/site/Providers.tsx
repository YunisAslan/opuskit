'use client'
import { MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'

// reducedMotion="user": under prefers-reduced-motion Motion skips transform animations (opacity still fades).
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
