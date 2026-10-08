'use client'
// OpusKit piece — based on Animata "Trailing Image" (MIT © Animata, https://animata.design).
// Moving the cursor across the section leaves a short trail of photos that fade away. Fine pointers only.
// Pale Hour: the drops are the exhibition prints at their own 3:4 shape, never cropped, sized from the site's columns;
// they are preloaded once a mouse arrives, so the first one never arrives blank. Reduced motion or touch: no trail.
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState, type ReactNode } from 'react'

type Drop = { id: number; x: number; y: number; src: string }

export function ImageTrail({ photos, children, spacing = 110, className }: { photos: string[]; children?: ReactNode; spacing?: number; className?: string }) {
  const reduce = useReducedMotion()
  const [drops, setDrops] = useState<Drop[]>([])
  const last = useRef({ x: 0, y: 0, n: 0 })
  const timers = useRef<number[]>([])

  // Preload the photos when a mouse first enters the section, not on page load: in a static export they are the
  // full-size files, and touch visitors never see the trail at all.
  const warmed = useRef(false)
  const warm = (e: React.PointerEvent) => {
    if (warmed.current || reduce || e.pointerType !== 'mouse') return
    warmed.current = true
    photos.forEach((src) => { const img = new Image(); img.src = src })
  }
  useEffect(() => {
    const t = timers.current
    return () => t.forEach(clearTimeout)
  }, [])

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - r.left, y = e.clientY - r.top
    if (Math.hypot(x - last.current.x, y - last.current.y) < spacing) return
    const n = ++last.current.n
    last.current.x = x; last.current.y = y
    setDrops((d) => [...d.slice(-5), { id: n, x, y, src: photos[n % photos.length] }])
    timers.current.push(window.setTimeout(() => setDrops((d) => d.filter((z) => z.id !== n)), 1000))
  }
  return (
    <div className={`relative overflow-hidden ${className ?? ''}`} onPointerEnter={warm} onPointerMove={(e) => { warm(e); onMove(e) }}>
      <AnimatePresence>
        {drops.map((d) => (
          <motion.img key={d.id} src={d.src} alt="" aria-hidden draggable={false}
            className="pointer-events-none absolute z-0 aspect-(--ratio-card) w-[clamp(120px,11vw,180px)] -translate-x-1/2 -translate-y-1/2"
            style={{ left: d.x, top: d.y }} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }} />
        ))}
      </AnimatePresence>
      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}
