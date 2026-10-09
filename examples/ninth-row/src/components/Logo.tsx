// The wordmark — until the owner's own logo exists, the name set in the display face (no invented symbol).
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return <span className={cn('font-(family-name:--font-display) font-bold leading-none tracking-[-0.01em] whitespace-nowrap', className)}>Ninth Row</span>
}
