'use client'
import { useSyncExternalStore } from 'react'
import { labStatus } from '@/lib/lab-hours'

// A live status line: Baku time and whether the lab in Mardakan is open. Re-checked every 30 s.
// The server (and the static HTML) shows a neutral line, so nothing jumps on load.
const every30s = (cb: () => void) => { const id = setInterval(cb, 30_000); return () => clearInterval(id) }
const minute = () => Math.floor(Date.now() / 60_000)

export function LiveStatus({ className = '' }: { className?: string }) {
  const m = useSyncExternalStore(every30s, minute, () => null)
  const s = m === null ? null : labStatus(new Date(m * 60_000))
  return (
    <span className={`type-utility inline-flex items-center gap-2 text-(--color-muted) ${className}`}>
      <span aria-hidden className={`size-1.5 shrink-0 rounded-full ${s?.open ? 'bg-(--color-accent)' : 'bg-(--color-muted)'}`} />
      <span>{s ? <>Mardakan <time className="tabular-nums">{s.time}</time>, {s.text}</> : 'The lab in Mardakan, open Monday to Saturday'}</span>
    </span>
  )
}
