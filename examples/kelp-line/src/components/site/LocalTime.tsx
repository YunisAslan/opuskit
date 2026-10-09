'use client'
// Live conditions in the chrome: the time on the coast, a quiet small number that holds its width while it changes.
import { useEffect, useState } from 'react'
import { site } from '@/content/site'

const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: site.timeZone })

export function LocalTime({ className }: { className?: string }) {
  const [now, setNow] = useState<string | null>(null)
  useEffect(() => {
    const tick = () => setNow(fmt.format(new Date()))
    tick()
    const id = window.setInterval(tick, 20_000)
    return () => window.clearInterval(id)
  }, [])
  return <time suppressHydrationWarning className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>{now ?? ' '}</time>
}
