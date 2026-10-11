'use client'
// OpusKit piece — a word made of points: the brand's name drawn as a field of small dots (sampled from the word set in
// the display face), which scatter from the pointer as it passes and drift back into the letters. Canvas 2D, no
// library; draws only while in view and while something moves. The word itself stays in the page as text for
// screen readers and search. Reduced motion and touch: the dots stand still. Original OpusKit code (MIT).
import { useEffect, useRef } from 'react'

export function DotWord({ word, gap = 6, radius = 90, className }: {
  /** One short word or the brand name. */ word: string
  /** Space between dots, in px (5–9). */ gap?: number
  /** How far from the pointer dots are pushed, in px. */ radius?: number
  className?: string
}) {
  const root = useRef<HTMLDivElement>(null), canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = root.current!, c = canvas.current!, ctx = c.getContext('2d')!
    const still = !matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches
    let dots: { x: number; y: number; hx: number; hy: number; vx: number; vy: number }[] = []
    let w = 0, h = 0, frame = 0, seen = true, px = -1e4, py = -1e4
    const dpr = Math.min(2, devicePixelRatio)
    const css = getComputedStyle(el), ink = css.color, font = css.getPropertyValue('--font-display') || css.fontFamily

    const build = () => {
      w = el.clientWidth; h = el.clientHeight; c.width = w * dpr; c.height = h * dpr
      // Set the word to fit the box, read its pixels, keep one dot per gap.
      const off = document.createElement('canvas'); off.width = w; off.height = h
      const o = off.getContext('2d')!
      let size = h * 0.8; o.font = `700 ${size}px ${font}`
      size *= Math.min(1, (w * 0.92) / o.measureText(word).width); o.font = `700 ${size}px ${font}`
      o.textAlign = 'center'; o.textBaseline = 'middle'; o.fillText(word, w / 2, h / 2)
      const data = o.getImageData(0, 0, w, h).data
      dots = []
      for (let y = 0; y < h; y += gap) for (let x = 0; x < w; x += gap) if (data[(y * w + x) * 4 + 3] > 128) dots.push({ x, y, hx: x, hy: y, vx: 0, vy: 0 })
      draw()
    }
    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h); ctx.fillStyle = ink
      let moving = false
      for (const d of dots) {
        const dx = d.x - px, dy = d.y - py, dist = Math.hypot(dx, dy)
        if (dist < radius) { const f = (1 - dist / radius) * 6; d.vx += (dx / (dist || 1)) * f; d.vy += (dy / (dist || 1)) * f }
        d.vx = (d.vx + (d.hx - d.x) * 0.06) * 0.82; d.vy = (d.vy + (d.hy - d.y) * 0.06) * 0.82 // a spring home, damped
        d.x += d.vx; d.y += d.vy
        if (Math.abs(d.vx) + Math.abs(d.vy) > 0.05) moving = true
        ctx.beginPath(); ctx.arc(d.x, d.y, gap * 0.28, 0, Math.PI * 2); ctx.fill()
      }
      frame = moving && seen ? requestAnimationFrame(draw) : 0
    }
    const move = (e: PointerEvent) => { const r = c.getBoundingClientRect(); px = e.clientX - r.left; py = e.clientY - r.top; frame ||= requestAnimationFrame(draw) }
    const leave = () => { px = py = -1e4; frame ||= requestAnimationFrame(draw) }
    const io = new IntersectionObserver(([e]) => { seen = e.isIntersecting })
    const ro = new ResizeObserver(() => build())
    io.observe(el); ro.observe(el)
    document.fonts?.ready.then(build) // the display face, not a fallback, gives the dots their shape
    if (!still) { el.addEventListener('pointermove', move); el.addEventListener('pointerleave', leave) }
    return () => { io.disconnect(); ro.disconnect(); cancelAnimationFrame(frame); el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave) }
  }, [word, gap, radius])

  return (
    <div ref={root} className={`relative ${className ?? ''}`}>
      <span className="sr-only">{word}</span>
      <canvas ref={canvas} aria-hidden className="absolute inset-0 size-full" />
    </div>
  )
}
