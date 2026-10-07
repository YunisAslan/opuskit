'use client'
// Photos — Names that reveal photos. A full-width list of titles in the display face, kind and place in the utility
// face. On a fine pointer, hovering a name shows its photo in a 4:5 frame that follows the cursor with a light lag
// (spring) and crossfades between rows; keyboard focus shows it in a fixed slot beside the row. Touch has no hover:
// each row starts with a small thumbnail instead. Reduced motion: the fixed slot, no follow.
import Link from 'next/link'
import { createPortal } from 'react-dom'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'
import { MediaAsset } from '@/components/MediaAsset'
import { Lines } from '@/components/motion'
import type { AssetKey } from '@/config/assets'

export type NamedItem = { title: string; kind: string; where: string; image: AssetKey; href: string }

const frameW = () => Math.round(Math.min(320, Math.max(220, innerWidth * 0.2)))

export function NamesReveal({ id, title, items }: { id?: string; title: string; items: NamedItem[] }) {
  const reduce = useReducedMotion()
  const [fine, setFine] = useState(false)
  const [active, setActive] = useState<number | null>(null)
  const [w, setW] = useState(280)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 160, damping: 22, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 160, damping: 22, mass: 0.6 })

  useEffect(() => {
    const mq = matchMedia('(pointer: fine)')
    const on = () => { setFine(mq.matches); setW(frameW()) }
    on()
    mq.addEventListener('change', on)
    addEventListener('resize', on)
    return () => { mq.removeEventListener('change', on); removeEventListener('resize', on) }
  }, [])

  const place = (px: number, py: number, jump: boolean) => {
    const h = w * 1.25
    let nx = px + 40
    if (nx + w > innerWidth - 24) nx = px - w - 40
    const ny = Math.min(Math.max(py - h / 2, 24), innerHeight - h - 24)
    if (jump) { x.jump(nx); y.jump(ny); sx.jump(nx); sy.jump(ny) } else { x.set(nx); y.set(ny) }
  }
  // The fixed slot: beside the row, a little past the middle of the list.
  const slot = (el: HTMLElement) => {
    const r = el.getBoundingClientRect()
    place(r.left + r.width * 0.5, r.top + r.height / 2, true)
  }

  return (
    <section id={id} className="section-y px-(--gutter)">
      <div className="mx-auto max-w-(--container)">
        <Lines lines={[title]} className="type-heading" />
        <ul className="mt-12 border-t border-(--color-border)" onPointerLeave={() => setActive(null)}>
          {items.map((p, i) => (
            <li key={p.href} className="border-b border-(--color-border)">
              <Link
                href={p.href}
                onPointerEnter={(e) => { if (e.pointerType !== 'mouse') return; if (reduce) slot(e.currentTarget); else place(e.clientX, e.clientY, active === null); setActive(i) }}
                onPointerMove={(e) => { if (e.pointerType === 'mouse' && !reduce) place(e.clientX, e.clientY, false) }}
                onFocus={(e) => { slot(e.currentTarget); setActive(i) }}
                onBlur={() => setActive(null)}
                className="group grid grid-cols-[4rem_1fr] items-center gap-x-5 gap-y-1 py-5 focus-visible:outline-none md:grid-cols-[5rem_1fr_auto] md:gap-x-10 md:py-7 pointer-fine:grid-cols-1 pointer-fine:md:grid-cols-[1fr_auto]"
              >
                <span className="relative row-span-2 block aspect-4/5 overflow-hidden rounded-media md:row-span-1 pointer-fine:hidden">
                  <MediaAsset id={p.image} fill sizes="80px" alt="" />
                </span>
                <h3 className={`type-display leading-none transition-[color,transform] duration-200 ease-out [font-size:clamp(2.25rem,5vw,4.75rem)] group-focus-visible:underline group-focus-visible:decoration-1 group-focus-visible:underline-offset-8 motion-safe:group-hover:translate-x-2 ${active !== null && active !== i ? 'text-(--color-muted)' : ''}`}>
                  {p.title}
                </h3>
                <p className="type-utility text-(--color-muted) md:text-right">
                  <span className="md:block">{p.kind}</span>
                  <span className="max-md:before:content-[',_'] md:block">{p.where}</span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {fine && createPortal(
        <motion.div
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-30 overflow-hidden rounded-media"
          style={{ x: sx, y: sy, width: w, aspectRatio: '4 / 5' }}
          initial={false}
          animate={{ opacity: active === null ? 0 : 1, scale: active === null || reduce ? (reduce ? 1 : 0.94) : 1 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {items.map((p, i) => (
            <div key={p.href} className="absolute inset-0 transition-opacity duration-250 ease-out" style={{ opacity: i === active ? 1 : 0 }}>
              <MediaAsset id={p.image} fill sizes="320px" alt="" />
            </div>
          ))}
        </motion.div>,
        document.body,
      )}
    </section>
  )
}
