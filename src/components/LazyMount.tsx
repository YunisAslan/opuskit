'use client'
// Renders children only once they come near the viewport — the showcase has ~200 live previews.
import { useEffect, useRef, useState, type ReactNode } from 'react'

export function LazyMount({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || on) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect() } }, { rootMargin: '400px' })
    io.observe(el)
    return () => io.disconnect()
  }, [on])
  return <div ref={ref} className={className}>{on ? children : null}</div>
}
