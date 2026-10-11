'use client'
// OpusKit piece — adapted from Fancy Components "Drag Elements" (MIT © 2024 Daniel Petho, https://fancycomponents.dev).
// Photos scattered like prints on a desk; visitors pick one up and drag it around, the last one lands on top.
// Fitted to this site: every print goes through next/image (getImageProps), wears a paper border and a hairline
// instead of a soft shadow, and is picked up with a 2px lift (this look's press). Reduced motion: no tilt on drag.
import { motion, useReducedMotion } from 'motion/react'
import { getImageProps } from 'next/image'
import { useRef, useState } from 'react'

export type DeskPhoto = { src: string; width: number; height: number; alt: string; x: string; y: string; w: string; rotate: number }

export function DragPhotos({ photos, className, sizes = '25vw' }: { photos: DeskPhoto[]; className?: string; sizes?: string }) {
  const area = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [order, setOrder] = useState(photos.map((_, i) => i))
  const front = (i: number) => setOrder((o) => [...o.filter((x) => x !== i), i])
  return (
    <div ref={area} className={`relative overflow-hidden ${className ?? ''}`}>
      {photos.map((p, i) => {
        const { props } = getImageProps({ src: p.src, width: p.width, height: p.height, alt: p.alt, sizes, quality: 75 })
        const img = { src: props.src, srcSet: props.srcSet, sizes: props.sizes, width: props.width, height: props.height, alt: props.alt }
        return (
          <motion.img key={p.src + i} {...img} loading="lazy" draggable={false} drag dragConstraints={area} dragElastic={0.2}
            dragTransition={{ power: 0.15, timeConstant: 200 }}
            onPointerDown={() => front(i)} whileDrag={reduce ? { scale: 1.02 } : { scale: 1.04, rotate: 0 }}
            className="absolute h-auto cursor-grab touch-none select-none border border-(--color-border) bg-(--color-surface) object-cover p-[0.7%] active:cursor-grabbing"
            style={{ left: p.x, top: p.y, width: p.w, rotate: p.rotate, zIndex: order.indexOf(i) }} />
        )
      })}
    </div>
  )
}
