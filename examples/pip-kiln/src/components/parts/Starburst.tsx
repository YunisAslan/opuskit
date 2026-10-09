import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

// A 16-point starburst sticker; the words sit on a solid fill, never over a photo.
const points = Array.from({ length: 32 }, (_, i) => {
  const a = (i / 32) * Math.PI * 2 - Math.PI / 2, r = i % 2 ? 41 : 50
  return `${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`
}).join(' ')

export function Starburst({ children, className, fill = 'fill-(--color-accent)', ink = 'text-(--color-background)' }: { children: ReactNode; className?: string; fill?: string; ink?: string }) {
  return (
    <span className={cn('relative grid aspect-square place-items-center', ink, className)}>
      <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 size-full overflow-visible"><polygon points={points} className={fill} /></svg>
      <span className="relative text-center">{children}</span>
    </span>
  )
}
