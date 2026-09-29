'use client'
// OpusKit piece — based on Animata "Trailing Image" (MIT © Animata, https://animata.design).
// Moving the cursor across the section leaves a short trail of photos that fade away. Fine pointers only.
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useRef, useState, type ReactNode } from 'react'

type Drop = { id: number; x: number; y: number; src: string }

export function ImageTrail({ photos, children, spacing = 90, className }: { photos: string[]; children?: ReactNode; spacing?: number; className?: string }) {
  const reduce = useReducedMotion()
  const [drops, setDrops] = useState<Drop[]>([])
  const last = useRef({ x: 0, y: 0, n: 0 })
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - r.left, y = e.clientY - r.top
    if (Math.hypot(x - last.current.x, y - last.current.y) < spacing) return
    const n = ++last.current.n
    last.current.x = x; last.current.y = y
    setDrops((d) => [...d.slice(-6), { id: n, x, y, src: photos[n % photos.length] }])
    setTimeout(() => setDrops((d) => d.filter((z) => z.id !== n)), 900)
  }
  return (
    <div className={`relative overflow-hidden ${className ?? ''}`} onPointerMove={onMove}>
      <AnimatePresence>
        {drops.map((d) => (
          <motion.img key={d.id} src={d.src} alt="" aria-hidden className="pointer-events-none absolute z-0 w-40 -translate-x-1/2 -translate-y-1/2 object-cover"
            style={{ left: d.x, top: d.y }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.35 }} />
        ))}
      </AnimatePresence>
      <div className="relative z-10">{children}</div>
    </div>
  )
}
