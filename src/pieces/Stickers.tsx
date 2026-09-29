'use client'
// OpusKit piece — brand stickers stuck onto a section: each sits at its own angle, drifts with scroll at its own depth,
// and can be picked up and thrown (it slides to a stop). Put it inside a `relative` section. Original OpusKit code (MIT).
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'

export type Sticker = { src: string; alt: string; x: string; y: string; w: string; rotate: number; depth?: number }

function One({ s, progress, reduce }: { s: Sticker; progress: MotionValue<number>; reduce: boolean }) {
  const y = useTransform(progress, [0, 1], [0, reduce ? 0 : -(s.depth ?? 1) * 120])
  return (
    <motion.div className="absolute" style={{ left: s.x, top: s.y, width: s.w, y }}>
      <motion.img src={s.src} alt={s.alt} draggable={false} drag={!reduce} dragMomentum dragTransition={{ power: 0.25, timeConstant: 220 }}
        whileDrag={{ scale: 1.08, rotate: s.rotate + 4 }} whileHover={reduce ? undefined : { scale: 1.04 }} style={{ rotate: s.rotate }}
        className="pointer-events-auto w-full cursor-grab touch-none select-none active:cursor-grabbing" />
    </motion.div>
  )
}

export function Stickers({ stickers, className }: { stickers: Sticker[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = !!useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  return <div ref={ref} className={`pointer-events-none absolute inset-0 z-20 ${className ?? ''}`}>{stickers.map((s) => <One key={s.src + s.x} s={s} progress={scrollYProgress} reduce={reduce} />)}</div>
}
