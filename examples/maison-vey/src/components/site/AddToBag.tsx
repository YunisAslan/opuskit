'use client'
import { useCart } from './cart'
import { cn } from '@/lib/utils'

/** The one action: puts a scent (in a size) into the bag and confirms with a toast. */
export function AddToBag({ slug, size, qty = 1, label, className, variant = 'primary' }: { slug: string; size: string; qty?: number; label: string; className?: string; variant?: 'primary' | 'secondary' }) {
  const { add } = useCart()
  return (
    <button type="button" onClick={() => add(slug, size, qty)} className={cn(variant === 'primary' ? 'btn-primary' : 'btn-secondary', 'cursor-pointer', className)}>
      {label}
    </button>
  )
}
