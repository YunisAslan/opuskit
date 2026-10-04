'use client'
// OpusKit piece — based on Componentry "Split Flap Display" (MIT © Componentry, https://componentry.dev).
// Departure-board letters that flick through characters until they land. Dates, times, gate numbers, short words.
import { useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

const FLAPS = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-–:./'

export function SplitFlap({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.8 })
  const reduce = useReducedMotion()
  const target = text.toUpperCase()
  // Starts on the real text (same on server and client, readable before JS), then turns over once in view.
  const [shown, setShown] = useState(target)
  useEffect(() => {
    if (!inView || reduce) { setShown(target); return }
    let tick = 0
    const t = setInterval(() => {
      tick++
      setShown(target.split('').map((c, i) => (c === ' ' || tick > 6 + i * 2 ? c : FLAPS[(tick * 7 + i * 3) % FLAPS.length])).join(''))
      if (tick > 6 + target.length * 2) clearInterval(t)
    }, 55)
    return () => clearInterval(t)
  }, [inView, reduce, target])
  return (
    <span ref={ref} className={`inline-flex gap-[0.08em] ${className ?? ''}`} aria-label={text}>
      {shown.split('').map((c, i) => (
        <span key={i} aria-hidden className="relative inline-grid w-[0.78em] place-items-center overflow-hidden rounded-[0.08em] bg-(--color-text) py-[0.08em] text-(--color-background) tabular-nums">
          {c === ' ' ? ' ' : c}
          <span className="absolute inset-x-0 top-1/2 h-px bg-(--color-background)/40" />
        </span>
      ))}
    </span>
  )
}
