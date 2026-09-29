'use client'
// OpusKit piece — adapted from Fancy Components "Parallax Floating" (MIT © 2024 Daniel Petho, https://fancycomponents.dev).
// Photos scattered around a headline drift against the cursor at different depths, like objects in a vitrine.
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from 'motion/react'
import type { ReactNode } from 'react'

export type FloatingPhoto = { src: string; alt: string; x: string; y: string; w: string; depth: number }

function Floater({ p, mx, my }: { p: FloatingPhoto; mx: MotionValue<number>; my: MotionValue<number> }) {
  const x = useTransform(mx, (v) => v * p.depth * -30)
  const y = useTransform(my, (v) => v * p.depth * -30)
  return <motion.img src={p.src} alt={p.alt} className="absolute object-cover" style={{ left: p.x, top: p.y, width: p.w, x, y }} />
}

export function ParallaxFloating({ photos, children, className }: { photos: FloatingPhoto[]; children?: ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 })
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 })
  return (
    <div className={`relative overflow-hidden ${className ?? ''}`}
      onPointerMove={(e) => { if (reduce || e.pointerType !== 'mouse') return; const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5) }}
      onPointerLeave={() => { mx.set(0); my.set(0) }}>
      {photos.map((p) => <Floater key={p.src + p.x} p={p} mx={mx} my={my} />)}
      <div className="relative z-10 grid size-full place-items-center">{children}</div>
    </div>
  )
}
