'use client'
// A live status line: what is true at the studio right now, in studio time, refreshed every 30 s.
// The server (and the first paint) shows a neutral line, so nothing jumps.
import { useSyncExternalStore } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { HOURS_LINES, STATUS_FALLBACK, statusAt, studioNow } from '@/lib/hours'

const subscribe = (cb: () => void) => { const id = setInterval(cb, 30_000); return () => clearInterval(id) }
const snapshot = () => { const n = studioNow(); const s = statusAt(n.day, n.minutes); return `${s.open ? 1 : 0}${s.text}` }

export function StatusLine({ className = '' }: { className?: string }) {
  const s = useSyncExternalStore(subscribe, snapshot, () => '')
  const open = s.startsWith('1')
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button type="button" className={`type-utility inline-flex items-center gap-2 text-left text-(--color-muted) ${className}`}>
          <span aria-hidden className={`size-1.5 shrink-0 rounded-full ${open ? 'bg-(--color-accent)' : 'bg-(--color-muted)'}`} />
          <span aria-live="polite">{s ? s.slice(1) : STATUS_FALLBACK}</span>
        </button>
      </TooltipTrigger>
      <TooltipContent className="type-utility flex-col items-start">{HOURS_LINES.map((h) => <span key={h}>{h}</span>)}</TooltipContent>
    </Tooltip>
  )
}
