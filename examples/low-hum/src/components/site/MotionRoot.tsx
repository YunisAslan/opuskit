'use client'
// Every Motion animation on the site follows the visitor's reduced-motion setting: transforms jump, fades stay.
import { MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'

export function MotionRoot({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
