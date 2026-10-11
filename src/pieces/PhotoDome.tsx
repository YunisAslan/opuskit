'use client'
// OpusKit piece — a photo dome: the visitor looks into the inside of a sphere of photos and drags to turn it, with a
// little inertia; it drifts slowly on its own until touched. Clicking a photo opens it large (Esc or a click closes).
// Plain CSS 3D (perspective, preserve-3d), no WebGL. Reduced motion: a still grid of the same photos.
// Original OpusKit code (MIT).
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'

export type DomePhoto = { src: string; alt: string }

export function PhotoDome({ photos, radius = 700, tile = [260, 190], rows = 5, className }: {
  /** 8+ photos; they repeat round the dome. */ photos: DomePhoto[]
  /** Sphere radius in px. */ radius?: number
  /** Tile width and height in px. */ tile?: [number, number]
  /** Rings of photos (odd: one runs at eye level). */ rows?: number
  className?: string
}) {
  const stage = useRef<HTMLDivElement>(null), sphere = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<number | null>(null)
  const reduce = useSyncExternalStore((f) => { const m = matchMedia('(prefers-reduced-motion: reduce)'); m.addEventListener('change', f); return () => m.removeEventListener('change', f) }, () => matchMedia('(prefers-reduced-motion: reduce)').matches, () => false)

  const [w, h] = tile, gap = 16
  const cols = Math.max(8, Math.floor((2 * Math.PI * radius) / (w + gap)))
  const step = ((h + gap) / radius) * (180 / Math.PI)
  const tiles = Array.from({ length: rows * cols }, (_, i) => {
    const r = Math.floor(i / cols), c = i % cols
    return { lat: (r - (rows - 1) / 2) * step, lon: (c * 360) / cols + (r % 2) * (180 / cols), photo: (r * 3 + c) % photos.length }
  })

  // Each photo is reached once by Tab (its first tile); the repeats are only pictures.
  const firstOf = photos.map((_, k) => tiles.findIndex((x) => x.photo === k))

  useEffect(() => {
    if (reduce) return
    const el = stage.current!, s = sphere.current!
    let ry = 0, rx = 0, vy = 0.03, vx = 0, drag: { x: number; y: number; t: number } | null = null, frame = 0, seen = true
    const draw = () => {
      if (!drag) { ry += vy; rx += vx; vy = vy * 0.95 + 0.03 * 0.05; vx *= 0.92 } // inertia, easing back to the drift
      rx = Math.max(-22, Math.min(22, rx))
      s.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`
      frame = seen ? requestAnimationFrame(draw) : 0
    }
    const down = (e: PointerEvent) => { drag = { x: e.clientX, y: e.clientY, t: performance.now() }; el.setPointerCapture(e.pointerId) }
    const move = (e: PointerEvent) => {
      if (!drag) return
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y, dt = Math.max(1, performance.now() - drag.t)
      ry += dx * 0.12; rx -= dy * 0.12; vy = (dx * 0.12 * 16) / dt; vx = (-dy * 0.12 * 16) / dt
      drag = { x: e.clientX, y: e.clientY, t: performance.now() }
    }
    const up = () => { drag = null }
    // Off screen, it stops drawing.
    const io = new IntersectionObserver(([e]) => { seen = e.isIntersecting; if (seen && !frame) frame = requestAnimationFrame(draw) })
    io.observe(el)
    el.addEventListener('pointerdown', down); el.addEventListener('pointermove', move); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up)
    return () => { io.disconnect(); cancelAnimationFrame(frame); el.removeEventListener('pointerdown', down); el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up) }
  }, [reduce])

  useEffect(() => {
    if (open === null) return
    const key = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    addEventListener('keydown', key); return () => removeEventListener('keydown', key)
  }, [open])

  if (reduce) return (
    <div className={`grid grid-cols-2 gap-(--gutter,16px) md:grid-cols-4 ${className ?? ''}`}>
      {photos.map((p) => <img key={p.src} src={p.src} alt={p.alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />)}
    </div>
  )

  return (
    <div ref={stage} className={`relative h-[80svh] w-full cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing ${className ?? ''}`} style={{ perspective: radius * 1.15 }}>
      <div ref={sphere} className="absolute left-1/2 top-1/2" style={{ transformStyle: 'preserve-3d' }}>
        {tiles.map((t, i) => {
          const p = photos[t.photo], first = firstOf[t.photo] === i
          return (
            <button key={i} type="button" tabIndex={first ? 0 : -1} aria-hidden={!first} aria-label={first ? `Open: ${p.alt}` : undefined} onClick={() => setOpen(t.photo)}
              className="absolute overflow-hidden rounded-(--radius-sm,0px) [backface-visibility:hidden] focus-visible:outline-2 focus-visible:outline-(--color-accent)"
              style={{ width: w, height: h, left: -w / 2, top: -h / 2, transform: `rotateY(${t.lon}deg) rotateX(${t.lat}deg) translateZ(${-radius}px)` }}>
              <img src={p.src} alt="" draggable={false} loading="lazy" className="size-full object-cover" />
            </button>
          )
        })}
      </div>
      {open !== null && (
        <button type="button" aria-label="Close" onClick={() => setOpen(null)} autoFocus
          className="fixed inset-0 z-50 grid cursor-zoom-out place-items-center bg-(--color-background)/90 p-(--gutter,24px) backdrop-blur-sm">
          <img src={photos[open].src} alt={photos[open].alt} className="max-h-full max-w-full object-contain" />
        </button>
      )}
    </div>
  )
}
