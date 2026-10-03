'use client'
// Marks its wrapper with data-in once it scrolls into view; the .rise and .clip classes in globals.css do the motion
// (and their reduced-motion versions). Observes one wrapper per section, once.
import { useEffect, useRef, useState, type ReactNode } from 'react'

export function InView({ className, children }: { className: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }, { rootMargin: '0px 0px -15% 0px' })
    io.observe(ref.current!)
    return () => io.disconnect()
  }, [])
  return <div ref={ref} className={className} data-in={seen || undefined}>{children}</div>
}
