// The page masthead: the page's h1 in the display face, broken by hand, with one plain line under it.
// Shared by Shop, Cart, Checkout, Privacy and the 404 so every page opens on the same line.
import type { ReactNode } from 'react'
import { Lines } from '@/components/motion/Reveal'
import { cn } from '@/lib/utils'

export function Masthead({ title, intro, children, className }: { title: { desktop: string[]; mobile: string[] }; intro?: string; children?: ReactNode; className?: string }) {
  return (
    <div className={cn('pb-16 pt-24 md:pb-24 md:pt-32', className)}>
      <Lines as="h1" still lines={title} className="type-display md:w-[calc((100%+var(--grid-gap))*8/12)]" />
      {intro && <p className="type-body mt-8 max-w-[52ch] text-(--color-muted)">{intro}</p>}
      {children}
    </div>
  )
}
