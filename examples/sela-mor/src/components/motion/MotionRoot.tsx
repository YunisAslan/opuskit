'use client'
// Motion follows the visitor's reduced-motion setting everywhere: transforms jump to their end, opacity still fades.
// (Decided by Motion at animation time, so server and client render the same markup.)
import { MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'

export function MotionRoot({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
