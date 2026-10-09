'use client'
// Programme — the remembered moment: "Doors countdown". The page opens on a title card whose title is a running
// timecode — hours, minutes, seconds and frames at 24 per second — counting down to the next screening on the
// visitor's own clock, read from the programme in the copy deck. Under it, what that film is and one way to book it.
// Each digit sits in a fixed-width box, so the numbers change in place and nothing re-lays out.
// Phones: the same card, the frames kept, the size taken from the screen. Reduced motion: the frames are dropped and
// it changes once a minute (hours and minutes only) — still true, nothing flickers.
import { useReduced } from '@/lib/motion'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { bookHref } from '@/components/sections/Schedule'
import { countdownCopy } from '@/content/programme'
import { nextScreening, type Next } from '@/lib/tonight'

const pad = (n: number) => String(Math.max(0, Math.floor(n))).padStart(2, '0')

function code(ms: number, frames: boolean) {
  const t = Math.max(0, ms) / 1000
  const h = t / 3600, m = (t % 3600) / 60, s = t % 60, f = (t % 1) * 24
  return frames ? `${pad(h)}:${pad(m)}:${pad(s)}:${pad(f)}` : `${pad(h)}:${pad(m)}`
}

function Digits({ value }: { value: string }) {
  return (
    <>
      {value.split('').map((ch, i) => (
        <span key={i} className={ch === ':' ? 'inline-block w-[0.22em] text-center text-(--color-muted)' : 'inline-block w-[0.5em] text-center'}>{ch}</span>
      ))}
    </>
  )
}

export function DoorsCountdown() {
  const reduce = useReduced()
  const [next, setNext] = useState<Next | null>(null)
  const [value, setValue] = useState(reduce ? '00:00' : '00:00:00:00')
  const raf = useRef(0)

  useEffect(() => {
    let n = nextScreening()
    if (reduce) {
      const tick = () => { n = nextScreening(); setNext(n); setValue(code(n ? n.at.getTime() - Date.now() : 0, false)) }
      const first = setTimeout(tick, 0)
      const id = setInterval(tick, 60_000)
      return () => { clearTimeout(first); clearInterval(id) }
    }
    let lastFrame = -1
    let started = false
    const loop = () => {
      if (!started) { started = true; setNext(n) }
      const left = n ? n.at.getTime() - Date.now() : 0
      if (n && left <= 0) { n = nextScreening(); setNext(n) }
      const frame = Math.floor(Date.now() / (1000 / 24))
      if (frame !== lastFrame) { lastFrame = frame; setValue(code(left, true)) }
      raf.current = requestAnimationFrame(loop)
    }
    raf.current = requestAnimationFrame(loop)
    // nothing runs off-screen or in a hidden tab
    const vis = () => { cancelAnimationFrame(raf.current); if (!document.hidden) raf.current = requestAnimationFrame(loop) }
    document.addEventListener('visibilitychange', vis)
    return () => { cancelAnimationFrame(raf.current); document.removeEventListener('visibilitychange', vis) }
  }, [reduce])

  const when = next ? `${next.today ? 'Tonight' : next.day.label} at ${next.item.time}` : ''
  return (
    <div className="mx-auto flex max-w-(--container) flex-col items-center px-(--gutter) text-center">
      <p className="type-utility flex items-center gap-2 text-base text-(--color-muted)">
        <span aria-hidden className="size-1.5 bg-(--color-accent)" />
        {countdownCopy.label}
      </p>
      <p aria-hidden className="type-display mt-6 text-[clamp(4.25rem,15.5vw,13.5rem)] whitespace-nowrap tabular-nums motion-safe:animate-[fade-up_700ms_cubic-bezier(0.22,1,0.36,1)_150ms_both]">
        <Digits value={value} />
      </p>
      <div className="mt-8 min-h-[7.5rem] motion-safe:animate-[fade-up_700ms_cubic-bezier(0.22,1,0.36,1)_350ms_both]" aria-live="polite">
        {next && (
          <>
            <p className="type-heading">{next.item.title}</p>
            <p className="type-body mt-2 text-(--color-muted)">{when}. {next.item.detail}</p>
            <span className="sr-only">{countdownCopy.doors} {value.slice(0, 5).replace(':', ' hours ')} minutes.</span>
            <Link href={bookHref(next.day.label, next.item.time, next.item.title)} className="btn btn-solid mt-6">{countdownCopy.action}</Link>
          </>
        )}
      </div>
    </div>
  )
}
