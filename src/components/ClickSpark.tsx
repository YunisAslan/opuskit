'use client'
// OpusKit's own click: a few short pencil-orange strokes burst from where the pointer lands and fade. One fixed canvas
// over the page that never takes a click; drawn only while a burst lives; nothing at all under reduced motion.
import { useEffect, useRef } from 'react'

const RAYS = 8, LENGTH = 12, RADIUS = 18, LIFE = 420 // ms

export function ClickSpark() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current!, ctx = canvas.getContext('2d')!
    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    const bursts: { x: number; y: number; t: number }[] = []
    let frame = 0
    const size = () => {
      const r = devicePixelRatio || 1
      canvas.width = innerWidth * r; canvas.height = innerHeight * r
      ctx.setTransform(r, 0, 0, r, 0, 0)
    }
    const draw = (now: number) => {
      ctx.clearRect(0, 0, innerWidth, innerHeight)
      ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-pencil').trim() || '#E0480F'
      ctx.lineWidth = 2; ctx.lineCap = 'round'
      for (let i = bursts.length - 1; i >= 0; i--) {
        const p = (now - bursts[i].t) / LIFE
        if (p >= 1) { bursts.splice(i, 1); continue }
        const e = 1 - (1 - p) ** 3 // ease out
        const from = RADIUS * e, to = from + LENGTH * (1 - e)
        for (let k = 0; k < RAYS; k++) {
          const a = (k / RAYS) * Math.PI * 2, cx = Math.cos(a), cy = Math.sin(a)
          ctx.beginPath(); ctx.moveTo(bursts[i].x + cx * from, bursts[i].y + cy * from); ctx.lineTo(bursts[i].x + cx * to, bursts[i].y + cy * to); ctx.stroke()
        }
      }
      frame = bursts.length ? requestAnimationFrame(draw) : 0
    }
    const down = (e: PointerEvent) => {
      if (motion.matches || e.button !== 0) return
      bursts.push({ x: e.clientX, y: e.clientY, t: performance.now() })
      if (!frame) frame = requestAnimationFrame(draw)
    }
    size()
    addEventListener('resize', size)
    addEventListener('pointerdown', down)
    return () => { removeEventListener('resize', size); removeEventListener('pointerdown', down); cancelAnimationFrame(frame) }
  }, [])
  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-[100] h-full w-full" />
}
