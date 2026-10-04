'use client'
// OpusKit piece — adapted from Fancy Components "Drag Elements" (MIT © 2024 Daniel Petho, https://fancycomponents.dev).
// Photos scattered like prints on a desk; visitors pick one up and drag it around, the last one lands on top.
import { motion } from 'motion/react'
import { useRef, useState } from 'react'

export type DeskPhoto = { src: string; alt: string; x: string; y: string; w: string; rotate: number }

export function DragPhotos({ photos, className }: { photos: DeskPhoto[]; className?: string }) {
  const area = useRef<HTMLDivElement>(null)
  const [order, setOrder] = useState(photos.map((_, i) => i))
  const front = (i: number) => setOrder((o) => [...o.filter((x) => x !== i), i])
  return (
    <div ref={area} className={`relative overflow-hidden ${className ?? ''}`}>
      {photos.map((p, i) => (
        <motion.img key={p.src + i} src={p.src} alt={p.alt} draggable={false} drag dragConstraints={area} dragElastic={0.2}
          onPointerDown={() => front(i)} whileDrag={{ scale: 1.04, rotate: 0 }}
          className="absolute cursor-grab touch-none bg-(--color-surface) object-cover p-[0.6%] shadow-[0_10px_30px_rgb(0_0_0/0.18)] active:cursor-grabbing"
          style={{ left: p.x, top: p.y, width: p.w, rotate: p.rotate, zIndex: order.indexOf(i) }} />
      ))}
    </div>
  )
}
