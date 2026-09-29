'use client'
// OpusKit piece — adapted from Magic UI "Number Ticker" (MIT © Magic UI, https://magicui.design).
// A number that counts up to its value when it scrolls into view. For real figures only — never decoration.
import { useInView, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useEffect, useRef } from 'react'

export function NumberTicker({ value, decimals = 0, locale = 'en-US', className }: { value: number; decimals?: number; locale?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { damping: 60, stiffness: 100 })
  const fmt = (n: number) => new Intl.NumberFormat(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(n)
  useEffect(() => { if (inView) mv.set(value) }, [inView, mv, value])
  useEffect(() => spring.on('change', (v) => { if (ref.current) ref.current.textContent = fmt(v) }), [spring]) // eslint-disable-line react-hooks/exhaustive-deps
  return <span ref={ref} className={`tabular-nums ${className ?? ''}`}>{fmt(reduce ? value : 0)}</span>
}
