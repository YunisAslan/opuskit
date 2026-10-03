'use client'
// A live status line: what is true right now, in Baku time, recomputed every 30 s. The server renders the neutral
// fallback; the dot is sand while the doors are open, muted otherwise, and never pulses.
import { useEffect, useState } from 'react'
import { FALLBACK_STATUS, statusAt } from '@/lib/event'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export function StatusLine({ className = '' }: { className?: string }) {
  const [status, setStatus] = useState({ text: FALLBACK_STATUS, open: false })
  useEffect(() => {
    const tick = () => setStatus(statusAt(Date.now()))
    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [])
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <p className={`type-utility inline-flex items-center gap-2 whitespace-nowrap text-(--color-muted) ${className}`} tabIndex={0} aria-live="polite">
          <span aria-hidden className={`size-1.5 shrink-0 ${status.open ? 'bg-(--color-accent)' : 'bg-(--color-muted)'}`} />
          {status.text}
        </p>
      </TooltipTrigger>
      <TooltipContent>Baku time (UTC+4). Doors 19:00 on 12, 13 and 14 June 2027.</TooltipContent>
    </Tooltip>
  )
}
