// Until the owner's own logo exists: the name set as a wordmark in the display face (assets/manifest.json → logo).
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return <span className={cn('type-display whitespace-nowrap [font-size:1.0625rem] leading-none tracking-[-0.03em]', className)}>Raster School</span>
}
