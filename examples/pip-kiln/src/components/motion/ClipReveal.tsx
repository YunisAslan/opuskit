'use client'
import type { ReactNode } from 'react'
import { useReveal } from './use-reveal'

/** Image clip reveal: the frame opens upward like a curtain while the picture settles from 1.15 to 1. */
export function ClipReveal({ children, className }: { children: ReactNode; className?: string }) {
  const [ref, state] = useReveal<HTMLDivElement>('0px 0px -8% 0px')
  return (
    <div ref={ref} data-clip={state} className={className}>
      <div className="clip-inner size-full">{children}</div>
    </div>
  )
}
