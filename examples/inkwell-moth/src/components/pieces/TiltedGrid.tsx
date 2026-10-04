'use client'
// OpusKit piece — based on Componentry "Scroll Tilted Grid" (MIT © Componentry, https://componentry.dev).
// A dense photo grid laid back in perspective that stands up flat as the visitor scrolls into it.
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef, useSyncExternalStore } from 'react'

// Static-export fix: the server can't know the visitor's motion setting, so the grid renders flat until hydrated
// (it sits below the fold), then tilts unless reduced motion is on — the first client render always matches the HTML.
const noop = () => () => {}

export function TiltedGrid({ photos, columns = 5, className }: { photos: { src: string; alt: string }[]; columns?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const hydrated = useSyncExternalStore(noop, () => true, () => false)
  const reduce = useReducedMotion() || !hydrated
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const rotateX = useTransform(scrollYProgress, [0, 1], [45, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const lift = useTransform(scrollYProgress, [0, 1], [80, 0])
  return (
    <div ref={ref} className={`overflow-hidden [perspective:1200px] ${className ?? ''}`}>
      <motion.div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, ...(reduce ? {} : { rotateX, scale, transformOrigin: '50% 0%' }) }}>
        {photos.map((p, i) => (
          <motion.img key={p.src + i} src={p.src} alt={p.alt} className="aspect-[3/4] w-full object-cover" style={reduce || i % 2 === 0 ? undefined : { y: lift }} />
        ))}
      </motion.div>
    </div>
  )
}
