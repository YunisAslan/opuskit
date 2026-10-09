'use client'
// OpusKit piece — adapted from Fancy Components "Drag Elements" (MIT © 2024 Daniel Petho, https://fancycomponents.dev).
// Photos scattered like prints on a desk; visitors pick one up and drag it around, the last one lands on top.
// Pip & Kiln: every print goes through next/image (getImageProps → srcSet), keeps a white-ish print border on the
// surface colour, and settles with a spring that does not bounce; reduced motion drops the lift and the elastic pull.
import { motion } from 'motion/react'
import { getImageProps } from 'next/image'
import { useRef, useState } from 'react'
import { useReduced } from '@/lib/use-media'

export type DeskPhoto = { src: string; alt: string; x: string; y: string; w: string; rotate: number; width: number; height: number }

export function DragPhotos({ photos, className }: { photos: DeskPhoto[]; className?: string }) {
  const area = useRef<HTMLDivElement>(null)
  const reduce = useReduced()
  const [order, setOrder] = useState(photos.map((_, i) => i))
  const front = (i: number) => setOrder((o) => [...o.filter((x) => x !== i), i])
  return (
    <div ref={area} className={`relative overflow-hidden ${className ?? ''}`}>
      {photos.map((p, i) => {
        const { props } = getImageProps({ src: p.src, alt: p.alt, width: p.width, height: p.height, sizes: '(min-width: 1024px) 26vw, 40vw' })
        const img = { src: props.src, srcSet: props.srcSet, sizes: props.sizes, alt: props.alt, width: props.width, height: props.height, decoding: props.decoding, loading: props.loading }
        return (
          <motion.img key={p.src + i} {...img} draggable={false} drag dragConstraints={area} dragElastic={reduce ? 0 : 0.2}
            dragTransition={{ bounceStiffness: 400, bounceDamping: 40 }}
            onPointerDown={() => front(i)} whileDrag={reduce ? undefined : { scale: 1.04, rotate: 0 }}
            className="absolute h-auto cursor-grab touch-none select-none rounded-[6px] bg-(--color-surface) object-cover p-[0.6%] shadow-[0_10px_30px_color-mix(in_oklab,var(--color-text)_22%,transparent)] active:cursor-grabbing"
            style={{ left: p.x, top: p.y, width: p.w, rotate: p.rotate, zIndex: order.indexOf(i), aspectRatio: `${p.width} / ${p.height}` }} />
        )
      })}
    </div>
  )
}
