'use client'
// OpusKit piece — adapted from Fancy Components "Media Between Text" (MIT © 2024 Daniel Petho, https://fancycomponents.dev).
// A headline split in two; when it scrolls into view the words part and a photo (or clip) opens between them.
import { motion, useInView, useReducedMotion } from 'motion/react'
import { useRef } from 'react'

export function MediaBetweenText({ before, after, src, alt, video = false, width = '18vw', className }: {
  before: string; after: string; src: string; alt: string; video?: boolean; width?: string; className?: string
}) {
  const ref = useRef<HTMLHeadingElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.7 })
  const reduce = useReducedMotion()
  const open = reduce || inView
  return (
    <h2 ref={ref} className={`flex flex-wrap items-center justify-center gap-x-[0.2em] ${className ?? ''}`}>
      <span>{before}</span>
      <motion.span className="inline-block overflow-hidden align-middle" initial={false} animate={{ width: open ? width : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }} style={{ height: '0.85em' }}>
        {video ? <video src={src} autoPlay muted loop playsInline className="size-full object-cover" aria-label={alt} />
          : <img src={src} alt={alt} className="size-full object-cover" />}
      </motion.span>
      <span>{after}</span>
    </h2>
  )
}
