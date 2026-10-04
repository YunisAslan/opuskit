'use client'
// OpusKit piece — adapted from Motion Primitives "Image Comparison" (MIT © 2024 ibelick, https://motion-primitives.com).
// Before / after: drag (or use arrow keys on) the divider to compare two photos of the same frame.
import { motion, useMotionValue, useTransform } from 'motion/react'
import { useRef, useState } from 'react'

export function ImageComparison({ before, after, beforeAlt, afterAlt, className }: { before: string; after: string; beforeAlt: string; afterAlt: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const pos = useMotionValue(50)
  const [val, setVal] = useState(50)
  const clip = useTransform(pos, (v) => `inset(0 ${100 - v}% 0 0)`)
  const left = useTransform(pos, (v) => `${v}%`)
  const set = (v: number) => { const c = Math.min(100, Math.max(0, v)); pos.set(c); setVal(Math.round(c)) }
  const fromPointer = (x: number) => { const r = ref.current!.getBoundingClientRect(); set(((x - r.left) / r.width) * 100) }
  return (
    <div ref={ref} className={`relative select-none overflow-hidden touch-pan-y ${className ?? ''}`}
      onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); fromPointer(e.clientX) }}
      onPointerMove={(e) => { if (e.buttons) fromPointer(e.clientX) }}>
      <img src={after} alt={afterAlt} className="absolute inset-0 size-full object-cover" draggable={false} />
      <motion.img src={before} alt={beforeAlt} className="absolute inset-0 size-full object-cover" style={{ clipPath: clip }} draggable={false} />
      <motion.div style={{ left }} className="absolute inset-y-0 w-px -translate-x-1/2 bg-(--color-background)">
        <button type="button" role="slider" aria-label="Compare photos" aria-valuemin={0} aria-valuemax={100} aria-valuenow={val}
          onKeyDown={(e) => { if (e.key === 'ArrowLeft') set(val - 5); if (e.key === 'ArrowRight') set(val + 5) }}
          className="absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize rounded-full border border-(--color-background) bg-(--color-text)/60 backdrop-blur focus-visible:outline-2 focus-visible:outline-(--color-accent)" />
      </motion.div>
    </div>
  )
}
