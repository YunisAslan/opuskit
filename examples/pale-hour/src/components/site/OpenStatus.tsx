'use client'
// "Open today until 18:00" in venue time, live. Renders a quiet hours line until the client knows the hour.
import { status, statusLine } from '@/lib/hours'
import { useNow } from '@/lib/useVenueStatus'
import { cn } from '@/lib/utils'

export function OpenStatus({ className, mark = false }: { className?: string; mark?: boolean }) {
  const now = useNow()
  const s = now ? status(now) : null
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      {mark && <span aria-hidden className={cn('size-1.5 shrink-0', s?.kind === 'open' ? 'bg-(--color-accent)' : 'border border-current')} />}
      <span suppressHydrationWarning>{s ? statusLine(s) : 'Open Wednesday to Sunday'}</span>
    </span>
  )
}
