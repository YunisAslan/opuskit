// The wordmark: the name set in Prata until the owner's own logo exists (assets/manifest.json → logo).
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return <span className={cn('font-(family-name:--font-display) whitespace-nowrap leading-none tracking-[-0.02em]', className)}>Pale Hour</span>
}
