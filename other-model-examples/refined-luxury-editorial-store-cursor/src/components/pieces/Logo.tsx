import { cn } from '@/lib/utils'

// The house mark: a thin hour — a circle and a single hand — beside the wordmark.
export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn('shrink-0 overflow-visible', className)} fill="none">
      <circle cx="12" cy="12" r="10.6" stroke="currentColor" strokeWidth="1" />
      <path d="M12 12 V23.2" stroke="currentColor" strokeWidth="1" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  )
}

export function Logo({
  className,
  size = 'md',
  showName = true,
}: {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showName?: boolean
}) {
  const word =
    size === 'lg' ? '[font-size:clamp(2.4rem,5vw,4.25rem)]'
    : size === 'sm' ? '[font-size:1rem]'
    : '[font-size:1.15rem]'
  const mark = size === 'lg' ? 'size-9' : size === 'sm' ? 'size-[1.05rem]' : 'size-[1.3rem]'
  return (
    <span className={cn('inline-flex items-center gap-[0.55em] text-(--color-text)', className)}>
      <Mark className={mark} />
      {showName && <span className={cn('type-display leading-none tracking-[-0.01em]', word)}>Maison Vey</span>}
    </span>
  )
}