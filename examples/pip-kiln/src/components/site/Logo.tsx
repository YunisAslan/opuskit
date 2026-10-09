import { cn } from '@/lib/utils'

/** Temporary logo: the name set as a wordmark in the display face (replace with the owner's own). */
export function Logo({ className, stacked = false }: { className?: string; stacked?: boolean }) {
  return stacked ? (
    <span className={cn('type-display block leading-[0.82]', className)}>
      <span className="block">Pip &amp;</span><span className="block">Kiln</span>
    </span>
  ) : (
    <span className={cn('type-display whitespace-nowrap leading-none', className)}>Pip &amp; Kiln</span>
  )
}
