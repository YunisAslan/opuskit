'use client'
// OpusKit piece — adapted from Motion Primitives "Text Scramble" (MIT © 2024 ibelick, https://motion-primitives.com).
// Letters resolve out of random characters — on first view, and again on hover. Best on short labels and nav links.
import { useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

export function TextScramble({ children, duration = 0.8, className, replayOnHover = true }: {
  children: string; duration?: number; className?: string; replayOnHover?: boolean
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  const [text, setText] = useState(children)
  const timer = useRef<ReturnType<typeof setInterval>>(undefined)

  const run = () => {
    if (reduce) return
    clearInterval(timer.current)
    const steps = Math.max(8, Math.round(duration / 0.04))
    let step = 0
    timer.current = setInterval(() => {
      const shown = (step / steps) * children.length
      setText(children.split('').map((c, i) => (c === ' ' || i < shown ? c : CHARS[Math.floor(Math.random() * CHARS.length)])).join(''))
      if (++step > steps) { clearInterval(timer.current); setText(children) }
    }, 40)
  }
  useEffect(() => { if (inView) run() }, [inView]) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => () => clearInterval(timer.current), [])

  return (
    <span ref={ref} className={className} onMouseEnter={replayOnHover ? run : undefined} aria-label={children}>
      <span aria-hidden className="tabular-nums">{text}</span>
    </span>
  )
}
