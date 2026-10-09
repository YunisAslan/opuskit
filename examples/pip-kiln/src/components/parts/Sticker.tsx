import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** A pill sticker: Bagel on the surface, ink outline, a little tilt. */
export function Sticker({ children, className, tilt = -4 }: { children: ReactNode; className?: string; tilt?: number }) {
  return (
    <span style={{ rotate: `${tilt}deg` }} className={cn('t-action inline-block whitespace-nowrap rounded-(--radius-button) border border-(--color-text) bg-(--color-surface) px-4 py-2 text-(--color-text)', className)}>{children}</span>
  )
}
