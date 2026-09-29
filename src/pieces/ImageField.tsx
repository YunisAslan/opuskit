'use client'
// OpusKit piece — based on Componentry "Infinite Image Field" (MIT © Componentry, https://componentry.dev).
// A field of photos visitors drag in any direction, forever: tiles wrap around so the edge never arrives.
import { animate, motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

export type FieldPhoto = { src: string; alt: string }
const wrap = (v: number, size: number) => ((v % size) + size) % size

function Tile({ photo, x, y, ox, oy, cols, rows, cell }: { photo: FieldPhoto; x: MotionValue<number>; y: MotionValue<number>; ox: number; oy: number; cols: number; rows: number; cell: number }) {
  const tx = useTransform(x, (v) => wrap(ox * cell + v, cols * cell) - cell)
  const ty = useTransform(y, (v) => wrap(oy * cell + v, rows * cell) - cell)
  return (
    <motion.div className="absolute left-0 top-0 p-2" style={{ x: tx, y: ty, width: cell, height: cell }}>
      <img src={photo.src} alt={photo.alt} className="size-full object-cover" draggable={false} />
    </motion.div>
  )
}

export function ImageField({ photos, cell = 260, className }: { photos: FieldPhoto[]; cell?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [size, setSize] = useState({ w: 1200, h: 700 })
  const x = useMotionValue(0), y = useMotionValue(0)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const ro = new ResizeObserver(() => setSize({ w: el.offsetWidth, h: el.offsetHeight }))
    ro.observe(el); return () => ro.disconnect()
  }, [])
  const cols = Math.ceil(size.w / cell) + 2, rows = Math.ceil(size.h / cell) + 2
  if (reduce) return (
    <div className={`grid grid-cols-2 gap-3 sm:grid-cols-3 ${className ?? ''}`}>{photos.map((p) => <img key={p.src} src={p.src} alt={p.alt} className="aspect-square w-full object-cover" />)}</div>
  )
  return (
    <motion.div ref={ref} className={`relative touch-none cursor-grab overflow-hidden active:cursor-grabbing ${className ?? ''}`}
      onPan={(_, i) => { x.set(x.get() + i.delta.x); y.set(y.get() + i.delta.y) }}
      onPanEnd={(_, i) => { const glide = { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }; animate(x, x.get() + i.velocity.x * 0.25, glide); animate(y, y.get() + i.velocity.y * 0.25, glide) }}>
      {Array.from({ length: cols * rows }, (_, k) => {
        const ox = k % cols, oy = Math.floor(k / cols)
        return <Tile key={k} photo={photos[(ox + oy * 3) % photos.length]} x={x} y={y} ox={ox} oy={oy} cols={cols} rows={rows} cell={cell} />
      })}
      <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 bg-(--color-background) px-3 py-1 text-sm text-(--color-text)">Drag to explore</span>
    </motion.div>
  )
}
