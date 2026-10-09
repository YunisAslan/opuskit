'use client'
import { useEffect, useRef, type ReactNode } from 'react'

/**
 * Parallax drift for one picture band: the picture travels ~8% of its frame (half on phones), scaled 1.1 inside an
 * overflow-clipped frame. CSS scroll-driven animation where supported; a light scroll listener elsewhere. Reduced
 * motion: the picture stands still.
 */
export function Drift({ children, className }: { children: ReactNode; className?: string }) {
  const layer = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = layer.current
    if (!el || CSS.supports('animation-timeline: view()') || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const travel = matchMedia('(max-width: 767px)').matches ? 2 : 4
    let raf = 0
    const tick = () => {
      raf = 0
      const r = el.parentElement!.getBoundingClientRect()
      const p = Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight + r.height)))
      el.style.transform = `translateY(${(p * 2 - 1) * travel}%) scale(1.1)`
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(tick) }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { addEventListener('scroll', on, { passive: true }); el.style.willChange = 'transform'; tick() }
      else { removeEventListener('scroll', on); el.style.willChange = '' }
    })
    io.observe(el.parentElement!)
    return () => { io.disconnect(); removeEventListener('scroll', on); cancelAnimationFrame(raf) }
  }, [])
  return (
    <div className={`drift ${className ?? ''}`}>
      <div ref={layer} className="drift-layer size-full">{children}</div>
    </div>
  )
}
