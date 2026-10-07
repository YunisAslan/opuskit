import { cn } from '@/lib/utils'

/** The wordmark: Maison Vey set in Bodoni Moda. `size="signature"` is the footer's large logo. */
export function Logo({ size = 'bar', className }: { size?: 'bar' | 'signature'; className?: string }) {
  if (size === 'signature') return (
    <span className={cn('type-display block [font-size:clamp(3.5rem,8vw,7.5rem)]', className)}>
      Maison<br />Vey
    </span>
  )
  return <span className={cn('font-[family-name:var(--font-display)] text-[1.375rem] leading-none tracking-[-0.01em]', className)}>Maison Vey</span>
}
