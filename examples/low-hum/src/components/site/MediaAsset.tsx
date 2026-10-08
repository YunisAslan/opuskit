'use client'
// <MediaAsset id="…" /> — every picture on the site goes through here: it resolves src, alt and size from
// src/config/assets.ts, runs the curtain (image clip reveal) and parallax drift, and flags temporary files in dev.
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'motion/react'
import { useReduced, useScrollTimeline } from './useReduced'
import { useEffect, useRef, useState } from 'react'
import { asset, type AssetKey } from '@/config/assets'

type Props = {
  id: AssetKey
  index?: number
  className?: string
  imgClassName?: string
  sizes?: string
  /** the frame's ratio, e.g. "4 / 5" — defaults to the file's own */
  aspect?: string
  reveal?: boolean
  drift?: boolean
  priority?: boolean
}

export function MediaAsset({ id, index, className = '', imgClassName = '', sizes = '100vw', aspect, reveal = true, drift = false, priority = false }: Props) {
  const a = asset(id, index)
  const frame = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(!reveal)
  const reduce = useReduced()
  const cssDrift = useScrollTimeline()

  useEffect(() => {
    if (!reveal || !frame.current) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect() } }, { threshold: 0.2 })
    io.observe(frame.current)
    return () => io.disconnect()
  }, [reveal])

  // Motion fallback for browsers without scroll-driven animations
  const { scrollYProgress } = useScroll({ target: frame, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-9%', '9%'])
  const useMotionDrift = drift && !cssDrift && !reduce

  const img = (
    <Image src={a.src} alt={a.alt} width={a.width} height={a.height} sizes={sizes} priority={priority}
      className={`h-full w-full object-cover ${imgClassName}`} />
  )

  return (
    <div ref={frame} className={`relative overflow-hidden rounded-(--radius-media) bg-(--color-surface) ${className}`} style={{ aspectRatio: aspect ?? `${a.width} / ${a.height}` }}>
      <div className={`h-full w-full ${reveal ? `clip-reveal ${inView ? 'is-in' : ''}` : ''}`}>
        <div className="clip-inner h-full w-full">
          {drift ? (
            useMotionDrift
              ? <motion.div className="h-full w-full scale-[1.18]" style={{ y }}>{img}</motion.div>
              : <div className={`h-full w-full ${reduce ? '' : 'drift'}`}>{img}</div>
          ) : img}
        </div>
      </div>
      {a.temporary && process.env.NODE_ENV === 'development' && (
        <span className="type-caption pointer-events-none absolute right-3 bottom-3 rounded-(--radius-button) bg-(--color-background) px-2 py-1 text-(--color-text)">Temporary</span>
      )}
    </div>
  )
}
