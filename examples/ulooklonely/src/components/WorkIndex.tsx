'use client'
// Compact index of every film. Fine pointers: the still follows the cursor and crossfades between rows.
// Reduced motion: the still sits in a fixed slot beside the list. Touch: no preview, just the list.
import Link from 'next/link'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'
import { useState } from 'react'
import { useMedia, useReduced } from '@/lib/use-media'
import type { AssetKey } from '@/config/assets'
import { MediaAsset } from '@/components/MediaAsset'

export type IndexRow = { title: string; discipline: string; year: string; image: AssetKey; href: string }

export function WorkIndex({ rows }: { rows: IndexRow[] }) {
  const reduce = useReduced()
  const fine = useMedia('(pointer: fine)')
  const [active, setActive] = useState<number | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 26, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 180, damping: 26, mass: 0.6 })

  const still = (
    <AnimatePresence mode="popLayout">
      {active !== null && <motion.div key={rows[active].image} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25, ease: 'easeOut' }}
        className="border-2 border-(--color-text) bg-(--color-surface)">
        <MediaAsset id={rows[active].image} thumb className="aspect-[3/2] w-full object-cover" />
      </motion.div>}
    </AnimatePresence>
  )

  return (
    <div className="relative mt-32 md:mt-40" onPointerMove={(e) => { x.set(e.clientX); y.set(e.clientY) }}>
      <h3 className="type-heading">Every film</h3>
      <div className="mt-8 grid gap-6 md:grid-cols-12">
        <ul className={`border-t-2 border-(--color-text) ${reduce && fine ? 'md:col-span-7' : 'md:col-span-12'}`} onPointerLeave={() => setActive(null)}>
          {rows.map((r, i) => (
            <li key={r.href + r.title} className="border-b-2 border-(--color-text)">
              <Link href={r.href} onPointerEnter={() => fine && setActive(i)} onFocus={() => setActive(i)} onBlur={() => setActive(null)}
                className="group grid min-h-16 grid-cols-12 items-baseline gap-4 py-5 transition-colors duration-150 hover:bg-(--color-secondary) focus-visible:bg-(--color-secondary) md:px-3">
                <span className="type-heading col-span-12 [font-size:clamp(1.25rem,2.2vw,1.875rem)] md:col-span-7">{r.title}</span>
                <span className="type-utility col-span-8 text-(--color-muted) md:col-span-3">{r.discipline}</span>
                <span className="type-utility col-span-4 text-right text-(--color-muted) md:col-span-2">{r.year}</span>
              </Link>
            </li>
          ))}
        </ul>
        {reduce && fine && <div className="hidden md:col-span-5 md:block"><div className="sticky top-24">{still}</div></div>}
      </div>
      {!reduce && fine && (
        <motion.div aria-hidden className="pointer-events-none fixed top-0 left-0 z-30 w-[22rem]" style={{ x: sx, y: sy, translateX: '-50%', translateY: '-110%' }}>
          {still}
        </motion.div>
      )}
    </div>
  )
}
