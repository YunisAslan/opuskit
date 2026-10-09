// Until the owner's own logo exists: the name set as a wordmark in the display face (assets/manifest.json → logo).
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return <span className={cn('font-(family-name:--font-display) text-[1.3rem] leading-none tracking-[-0.015em] whitespace-nowrap', className)}>Kelp Line</span>
}
