'use client'
// One quiet line, read off the programme on the visitor's clock: what the lamp lights up next.
import { useEffect, useState } from 'react'
import { nextScreening, type Next } from '@/lib/tonight'

export function TonightLine({ className }: { className?: string }) {
  const [next, setNext] = useState<Next | null>(null)
  useEffect(() => {
    const tick = () => setNext(nextScreening())
    tick()
    const id = setInterval(tick, 60_000)
    return () => clearInterval(id)
  }, [])
  return (
    <p className={className} aria-live="off">
      <span aria-hidden className="mr-3 inline-block size-1.5 translate-y-[-2px] bg-(--color-accent)" />
      {next ? (
        <>{next.today ? 'Tonight' : next.day.label}, {next.item.time}: {next.item.title}</>
      ) : (
        <>Lights down nightly</>
      )}
    </p>
  )
}
