'use client'
// OpusKit piece — adapted from Cult UI "3D Carousel" (MIT © 2023 Jordan-Gilliam, https://www.cult-ui.com).
// Photos on the inside of a turning cylinder; drag to spin, click to open one large. Reduced motion: a plain swipe row.
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import { useState } from 'react'

export type RingPhoto = { src: string; alt: string }

export function RingCarousel({ photos, height = 420, className }: { photos: RingPhoto[]; height?: number; className?: string }) {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState<RingPhoto | null>(null)
  const rotation = useMotionValue(0)
  const transform = useTransform(rotation, (v) => `rotateY(${v}deg)`)
  const width = Math.max(1100, photos.length * 180)
  const face = width / photos.length
  const radius = width / (2 * Math.PI)
  if (reduce) return (
    <div className={`flex snap-x gap-4 overflow-x-auto ${className ?? ''}`}>
      {photos.map((p) => <img key={p.src} src={p.src} alt={p.alt} className="h-72 w-auto shrink-0 snap-center object-cover" />)}
    </div>
  )
  return (
    <div className={`relative overflow-hidden ${className ?? ''}`} style={{ height, perspective: 1000 }}>
      <motion.div className="relative mx-auto h-full touch-pan-y cursor-grab active:cursor-grabbing" style={{ width, transform, transformStyle: 'preserve-3d' }}
        onPan={(_, i) => rotation.set(rotation.get() + i.delta.x * 0.1)}
        onPanEnd={(_, i) => animate(rotation, rotation.get() + i.velocity.x * 0.02, { type: 'spring', stiffness: 100, damping: 30 })}>
        {photos.map((p, i) => (
          <button type="button" key={p.src} onClick={() => setOpen(p)} aria-label={`Open: ${p.alt}`}
            className="absolute inset-y-0 left-1/2 flex items-center p-2" style={{ width: face, marginLeft: -face / 2, transform: `rotateY(${(360 / photos.length) * i}deg) translateZ(${radius}px)` }}>
            <img src={p.src} alt="" className="pointer-events-none aspect-[3/4] w-full object-cover" draggable={false} />
          </button>
        ))}
      </motion.div>
      <AnimatePresence>
        {open && (
          <motion.button type="button" onClick={() => setOpen(null)} aria-label="Close photo" className="fixed inset-0 z-50 grid place-items-center bg-(--color-text)/80 p-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.img src={open.src} alt={open.alt} className="max-h-full max-w-full object-contain" initial={{ scale: 0.9 }} animate={{ scale: 1 }} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
