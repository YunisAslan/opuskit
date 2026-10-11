'use client'
// OpusKit piece — a flashlight: the section lies almost dark, and the pointer lights a soft circle that shows the
// picture and words beneath; the light follows with a small lag. On touch screens it drifts slowly by itself and a tap
// moves it. Reduced motion: fully lit. Everything beneath stays in the page for screen readers and search.
// Original OpusKit code (MIT).
import { useEffect, useRef, type ReactNode } from 'react'

export function Spotlight({ children, radius = '22vmin', dark = 0.94, className }: {
  /** The lit scene: a picture and its words. */ children: ReactNode
  /** Size of the light. */ radius?: string
  /** How dark the unlit part is (0–1). */ dark?: number
  className?: string
}) {
  const root = useRef<HTMLDivElement>(null), shade = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { shade.current!.hidden = true; return }
    const el = root.current!, s = shade.current!, hover = matchMedia('(hover: hover)').matches
    const r = el.getBoundingClientRect()
    let x = r.width / 2, y = r.height / 2, tx = x, ty = y, frame = 0, t0 = performance.now(), touched = false
    const draw = (now: number) => {
      if (!hover && !touched) { const t = (now - t0) / 1000; tx = el.clientWidth * (0.5 + 0.3 * Math.sin(t * 0.35)); ty = el.clientHeight * (0.5 + 0.25 * Math.sin(t * 0.5)) }
      x += (tx - x) * 0.14; y += (ty - y) * 0.14
      s.style.setProperty('--x', `${x}px`); s.style.setProperty('--y', `${y}px`)
      frame = requestAnimationFrame(draw)
    }
    const move = (e: PointerEvent) => { const b = el.getBoundingClientRect(); tx = e.clientX - b.left; ty = e.clientY - b.top; if (e.pointerType !== 'mouse') touched = true }
    const io = new IntersectionObserver(([e]) => { cancelAnimationFrame(frame); if (e.isIntersecting) frame = requestAnimationFrame(draw) })
    io.observe(el)
    el.addEventListener(hover ? 'pointermove' : 'pointerdown', move)
    return () => { io.disconnect(); cancelAnimationFrame(frame); el.removeEventListener(hover ? 'pointermove' : 'pointerdown', move) }
  }, [])

  return (
    <div ref={root} className={`relative overflow-hidden ${className ?? ''}`}>
      {children}
      <div ref={shade} aria-hidden className="pointer-events-none absolute inset-0 bg-(--color-background)"
        style={{ opacity: dark, maskImage: `radial-gradient(circle ${radius} at var(--x, 50%) var(--y, 50%), transparent 0%, transparent 35%, #000 100%)`, WebkitMaskImage: `radial-gradient(circle ${radius} at var(--x, 50%) var(--y, 50%), transparent 0%, transparent 35%, #000 100%)` }} />
    </div>
  )
}
