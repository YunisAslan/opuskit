'use client'
import { useState } from 'react'
import { useClientValue, useReducedMotionSafe } from '@/lib/motion'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { menu } from '@/config/site'
import { MediaAsset } from './MediaAsset'

const previewPhotos = [...new Set(menu.flatMap((s) => s.items.map((i) => i.photo)).filter((p) => p !== undefined))] as number[]

export function MenuList() {
  const reduce = useReducedMotionSafe()
  const fine = useClientValue(() => window.matchMedia('(pointer: fine)').matches, false)
  const [active, setActive] = useState<number | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 30, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 260, damping: 30, mass: 0.6 })

  return (
    <div
      className="container-text grid gap-16 pb-32 md:grid-cols-2 md:gap-x-24"
      onPointerMove={(e) => {
        x.set(e.clientX + 24)
        y.set(e.clientY - 140)
      }}
      onPointerLeave={() => setActive(null)}
    >
      {menu.map((section) => (
        <section key={section.title} aria-labelledby={`menu-${section.title}`} data-reveal="rise">
          <h2 id={`menu-${section.title}`} className="type-heading border-b border-border pb-4">
            {section.title}
          </h2>
          <ul>
            {section.items.map((item) => (
              <li
                key={item.name}
                className="grid grid-cols-[1fr_auto] gap-x-6 border-b border-border py-4"
                onPointerEnter={() => setActive(item.photo ?? null)}
              >
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-right font-semibold tabular-nums">{item.price}</p>
                <p className="col-span-2 mt-1 max-w-[48ch] text-muted">{item.description}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {fine && (
        <motion.div
          aria-hidden
          className={`pointer-events-none fixed z-30 h-[280px] w-[210px] ${reduce ? 'bottom-6 right-6' : 'left-0 top-0'}`}
          style={reduce ? undefined : { x: sx, y: sy }}
        >
          {previewPhotos.map((p) => (
            <div key={p} className="absolute inset-0 transition-opacity duration-[250ms] ease-out" style={{ opacity: active === p ? 1 : 0 }}>
              <MediaAsset photo={p} alt="" className="h-full w-full" sizes="210px" fit="contain" />
            </div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
