'use client'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useState } from 'react'
import type { AssetKey } from '@/config/assets'
import MediaAsset from './MediaAsset'

export type IndexRow = { name: string; origin: string; amount: string; image: AssetKey }

// Hover media preview: on fine pointers the row's image follows the cursor
// (spring ≈ 0.15 lerp) and crossfades between rows. Reduced motion: fixed slot.
// Touch: the list stays compact, images not shown (they appear on the cards above).
export default function HoverIndex({ rows }: { rows: IndexRow[] }) {
  const reduced = useReducedMotion()
  const [active, setActive] = useState<number | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 300, damping: 40 })
  const sy = useSpring(y, { stiffness: 300, damping: 40 })

  return (
    <div
      className="relative"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set(e.clientX - r.left)
        y.set(e.clientY - r.top)
      }}
      onPointerLeave={() => setActive(null)}
    >
      <ul className="border-t-2 border-border">
        {rows.map((r, i) => (
          <li
            key={r.name}
            onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(i)}
            className="grid grid-cols-12 items-baseline gap-6 border-b border-border py-6"
          >
            <span className="type-heading col-span-12 md:col-span-6">{r.name}</span>
            <span className="type-body col-span-8 md:col-span-4">{r.origin}</span>
            <span className="type-utility col-span-4 text-right md:col-span-2">{r.amount}</span>
          </li>
        ))}
      </ul>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute z-10 hidden aspect-[4/3] w-72 overflow-hidden bg-text [@media(pointer:fine)]:block"
        style={reduced ? { right: 0, top: 0 } : { left: sx, top: sy, translateX: '-50%', translateY: '-110%' }}
        animate={{ opacity: active === null ? 0 : 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {rows.map((r, i) => (
          <motion.div key={r.name} className="absolute inset-0" animate={{ opacity: active === i ? 1 : 0 }} transition={{ duration: 0.25 }}>
            <MediaAsset id={r.image} sizes="288px" alt="" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
