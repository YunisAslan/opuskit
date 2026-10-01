'use client'
// "A live status line": what is true right now — how long until this quarter's books close, counted to 23:59 on the
// last day of the quarter in the visitor's own time zone. Re-rendered every 30 s. The static HTML carries a neutral
// line of the same length, so nothing jumps when the real one arrives. The dot never pulses.
import { useEffect, useState } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export function quarterStatus(now: Date) {
  const q = Math.floor(now.getMonth() / 3)
  const end = new Date(now.getFullYear(), q * 3 + 3, 1) // midnight after the quarter's last day, local time
  const mins = Math.max(0, Math.floor((end.getTime() - now.getTime()) / 60000))
  const pad = (n: number) => String(n).padStart(2, '0')
  const last = new Date(end.getTime() - 1)
  return {
    text: `Q${q + 1} books close in ${Math.floor(mins / 1440)}d ${pad(Math.floor(mins / 60) % 24)}h ${pad(mins % 60)}m`,
    when: new Intl.DateTimeFormat(undefined, { day: 'numeric', month: 'long' }).format(last),
  }
}

export function StatusLine({ className = '', dot = 'bg-(--color-accent)' }: { className?: string; dot?: string }) {
  const [s, setS] = useState<ReturnType<typeof quarterStatus> | null>(null)
  useEffect(() => {
    const tick = () => setS(quarterStatus(new Date()))
    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [])
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <p className={`type-utility inline-flex items-center gap-2 whitespace-nowrap tabular-nums ${className}`} tabIndex={0}>
          <span aria-hidden className={`size-1.5 shrink-0 rounded-full ${s ? dot : 'bg-(--color-muted)'}`} />
          <span>{s ? s.text : 'Quarterly books, counted live'}</span>
        </p>
      </TooltipTrigger>
      <TooltipContent side="bottom">{s ? `Counted to the end of ${s.when}, in your time zone.` : 'Counting in your time zone.'}</TooltipContent>
    </Tooltip>
  )
}
