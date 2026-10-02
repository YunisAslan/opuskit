// A sticker stuck over a section edge, drifting a little with scroll (CSS scroll-driven; still under reduced motion).
import type { ReactNode } from 'react'

export function Spot({ children, className }: { children: ReactNode; className: string }) {
  return <div aria-hidden className={`spot pointer-events-none absolute z-10 ${className}`}>{children}</div>
}
