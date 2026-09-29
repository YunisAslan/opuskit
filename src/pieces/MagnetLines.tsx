'use client'
// OpusKit piece — adapted from Componentry "Magnet Lines" (MIT © Componentry, https://componentry.dev).
// A grid of short lines that all turn to point at the cursor, like iron filings. A quiet, graphic hero or footer field.
import { useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'

export function MagnetLines({ rows = 9, columns = 12, className }: { rows?: number; columns?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  useEffect(() => {
    const el = ref.current
    if (!el || reduce) return
    const lines = [...el.children] as HTMLElement[]
    let frame = 0
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        for (const l of lines) {
          const r = l.getBoundingClientRect()
          const a = Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2))
          l.style.transform = `rotate(${a + Math.PI / 2}rad)`
        }
      })
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => { window.removeEventListener('pointermove', move); cancelAnimationFrame(frame) }
  }, [reduce])
  return (
    <div ref={ref} aria-hidden className={`grid place-items-center ${className ?? ''}`} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}>
      {Array.from({ length: rows * columns }, (_, i) => <span key={i} className="block h-[3vmin] w-px bg-(--color-text) transition-transform duration-300 ease-out" />)}
    </div>
  )
}
