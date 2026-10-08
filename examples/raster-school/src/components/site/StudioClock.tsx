'use client'
// The studio's own time and whether class is on: "Basel 19:42, in class until 21:30" or "Basel 11:05, next class
// Tue 18:30". Read from the course's real evenings (content/site.ts). Tabular figures; the width is held while it loads.
import { useEffect, useState } from 'react'
import { site } from '@/content/site'
import { cn } from '@/lib/utils'

const CLASS_DAYS = [2, 4] // Tuesday, Thursday
const START = 18 * 60 + 30
const END = 21 * 60 + 30
const NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function read(now: Date) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', { timeZone: site.timeZone, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
      .formatToParts(now)
      .map((p) => [p.type, p.value]),
  )
  const day = NAMES.indexOf(parts.weekday)
  const mins = Number(parts.hour) * 60 + Number(parts.minute)
  const clock = `${parts.hour}:${parts.minute}`
  if (CLASS_DAYS.includes(day) && mins >= START && mins < END) return { clock, status: 'in class until 21:30', live: true }
  let d = day
  for (let i = 0; i < 7; i++) {
    const isToday = i === 0
    if (CLASS_DAYS.includes(d) && (!isToday || mins < START)) return { clock, status: `next class ${isToday ? 'today' : NAMES[d]} 18:30`, live: false }
    d = (d + 1) % 7
  }
  return { clock, status: '', live: false }
}

export function StudioClock({ className }: { className?: string }) {
  const [state, setState] = useState<ReturnType<typeof read> | null>(null)
  useEffect(() => {
    const tick = () => setState(read(new Date()))
    tick()
    const id = setInterval(tick, 20_000)
    return () => clearInterval(id)
  }, [])
  return (
    <p className={cn('type-utility min-h-[1.3em]', className)}>
      {state ? (
        <>
          {site.city} {state.clock}, <span className={state.live ? 'text-(--color-accent)' : undefined}>{state.status}</span>
        </>
      ) : (
        <span className="invisible">{site.city} 00:00, next class Tue 18:30</span>
      )}
    </p>
  )
}
