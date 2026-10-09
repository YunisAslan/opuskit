'use client'
import { MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'
import { CartProvider } from '@/lib/cart'

/** Cart state, and Motion told to honour the visitor's reduced-motion setting everywhere. */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user"><CartProvider>{children}</CartProvider></MotionConfig>
}
