'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cohorts, site } from '@/content/site'
import { shortDate, statusAt, statusText, type Status } from '@/lib/status'

// A live status line: what is true about Night Shift right now (a session on air, or the next cohort, its countdown
// and the seats left), from the cohort dates in Oslo time, recomputed every 30 s. The server renders `fallback`
// (computed at build) so nothing jumps; the dot is accent while enrolment is open or a session is live.
export function useStatus() {
  const [s, set] = useState<Status | null>(null)
  useEffect(() => {
    const tick = () => set(statusAt(new Date(), cohorts, site.seatsPerCohort))
    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [])
  return s
}

export function StatusLine({ fallback, menu = true, className = '' }: { fallback: [string, string]; menu?: boolean; className?: string }) {
  const s = useStatus()
  const open = !s || s.kind === 'live' || (s.kind === 'next' && s.seatsLeft > 0)
  const [long, short] = s ? [statusText(s), statusText(s, true)] : fallback
  const line = (
    <>
      <span aria-hidden className={`size-1.5 shrink-0 rounded-full ${open ? 'bg-(--color-accent)' : 'bg-(--color-muted)'} ${s?.kind === 'live' ? 'live-dot' : ''}`} />
      <span className="tabular-nums"><span className="max-sm:hidden">{long}</span><span className="sm:hidden">{short}</span></span>
    </>
  )
  if (!menu) return <p role="status" className={`type-utility flex items-center gap-2.5 ${className}`}>{line}</p>
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className={`type-utility flex min-h-11 items-center gap-2.5 rounded-(--radius-button) text-left outline-none transition-colors duration-150 hover:text-(--color-muted) focus-visible:underline focus-visible:underline-offset-4 ${className}`}>
        {line}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="w-80 p-2">
        <DropdownMenuLabel className="type-utility text-(--color-muted)">Upcoming cohorts, Tue and Thu {site.session.start}–{site.session.end} Oslo</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {cohorts.map((c) => (
          <DropdownMenuItem key={c.n} asChild>
            <Link href="/enrol" className="grid grid-cols-[auto_1fr_auto] items-baseline gap-3 tabular-nums">
              <span className="type-utility">Cohort {c.n}</span>
              <span className="text-(--color-muted)">{shortDate(c.start)} to {shortDate(c.end)}</span>
              <span className="type-utility">{c.seatsLeft} left</span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
