'use client'
import { cn } from '@/lib/utils'
import { product as copy } from '@/content/copy'

/** Quantity stepper: square, hairline, 44px targets. */
export function Qty({ value, onChange, label, className, size = 'md' }: { value: number; onChange: (n: number) => void; label: string; className?: string; size?: 'sm' | 'md' }) {
  const h = size === 'sm' ? 'h-11' : 'h-12'
  const btn = cn('grid w-11 cursor-pointer place-items-center text-(--color-muted) transition-colors duration-150 hover:text-(--color-text) focus-visible:bg-(--color-secondary) disabled:opacity-40', h)
  return (
    <div role="group" aria-label={label} className={cn('type-body inline-flex items-center border border-(--color-border)', className)}>
      <button type="button" aria-label={copy.fewer} disabled={value <= 1} onClick={() => onChange(value - 1)} className={btn}>−</button>
      <span aria-live="polite" className="w-8 text-center tabular-nums">{value}</span>
      <button type="button" aria-label={copy.more} disabled={value >= 9} onClick={() => onChange(value + 1)} className={btn}>+</button>
    </div>
  )
}
