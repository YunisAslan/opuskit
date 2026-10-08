'use client'
// OpusKit piece — adapted from Fancy Components "Drag Elements" (MIT © 2024 Daniel Petho, https://fancycomponents.dev).
// Photos scattered like prints on a desk; visitors pick one up and drag it around, the last one lands on top.
// Fitted to Low Hum: cream instant-print frames with a deeper bottom edge, responsive srcset, prints settle onto the
// desk one by one (spring) as it scrolls in. Reduced motion: they are simply there, still draggable.
import { motion } from 'motion/react'
import { useReduced } from '@/components/site/useReduced'
import { useRef, useState } from 'react'

export type DeskPhoto = { src: string; srcSet?: string; sizes?: string; alt: string; x: string; y: string; w: string; rotate: number }

export function DragPhotos({ photos, className }: { photos: DeskPhoto[]; className?: string }) {
  const area = useRef<HTMLDivElement>(null)
  const reduce = useReduced()
  const [order, setOrder] = useState(photos.map((_, i) => i))
  const front = (i: number) => setOrder((o) => [...o.filter((x) => x !== i), i])
  return (
    <div ref={area} className={`relative overflow-hidden ${className ?? ''}`}>
      {photos.map((p, i) => (
        <motion.div key={p.src + i} drag dragConstraints={area} dragElastic={0.2}
          onPointerDown={() => front(i)} whileDrag={{ scale: 1.04, rotate: 0 }}
          initial={reduce ? false : { opacity: 0, y: -30, rotate: p.rotate * 2 }}
          whileInView={{ opacity: 1, y: 0, rotate: p.rotate }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: 'spring', stiffness: 120, damping: 20, delay: reduce ? 0 : i * 0.06 }}
          className="absolute cursor-grab touch-none rounded-(--radius-button) bg-(--color-text) shadow-[0_14px_34px_color-mix(in_oklab,var(--color-background)_55%,transparent)] active:cursor-grabbing"
          style={{ left: p.x, top: p.y, width: p.w, rotate: p.rotate, zIndex: order.indexOf(i) }}>
          {/* the frame: padding here is a share of the print's own width — a deeper bottom edge, like an instant print */}
          <div className="p-[5%] pb-[16%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.src} srcSet={p.srcSet} sizes={p.sizes} alt={p.alt} draggable={false} loading="lazy"
              className="pointer-events-none aspect-[3/2] w-full rounded-[4px] object-cover select-none" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
