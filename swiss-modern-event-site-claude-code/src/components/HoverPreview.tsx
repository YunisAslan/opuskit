"use client"

import { useState } from "react"
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react"
import { MediaAsset } from "@/components/MediaAsset"
import type { ImageKey } from "@/config/assets"
import { useMediaQuery, useReducedMotion } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"

type Item = { title: string; detail: string; image: ImageKey }

// Hover media preview: on fine pointers the photo of the hovered row follows the cursor (spring, ~0.15 lerp);
// with reduced motion it sits in a fixed slot; on touch every row shows its own photo inline.
export function HoverPreview({ items }: { items: Item[] }) {
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)")
  const reduced = useReducedMotion()
  const [active, setActive] = useState<number | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 32, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 260, damping: 32, mass: 0.6 })
  const follow = fine && !reduced

  const list = (
    <ul
      className="border-t border-text"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set(e.clientX - r.left + 24)
        y.set(e.clientY - r.top - 120)
      }}
      onPointerLeave={() => setActive(null)}
    >
      {items.map((it, i) => (
        <li
          key={it.title}
          onPointerEnter={() => setActive(i)}
          className={cn(
            "grid grid-cols-4 gap-4 border-b border-border py-6 transition-colors duration-150 sm:grid-cols-6",
            fine && active !== null && active !== i && "text-muted",
          )}
        >
          <h2 className="type-heading col-span-4 sm:col-span-3">{it.title}</h2>
          <p className="col-span-4 max-w-[30rem] text-muted sm:col-span-3">{it.detail}</p>
          {!fine && (
            <div className="relative col-span-4 aspect-4/3 overflow-hidden sm:col-span-6">
              <MediaAsset id={it.image} sizes="100vw" />
            </div>
          )}
        </li>
      ))}
    </ul>
  )

  if (!fine) return list

  if (!follow) {
    return (
      <div className="grid-page gap-y-8">
        <div className="col-span-4 sm:col-span-6 lg:col-span-7">{list}</div>
        <div className="relative col-span-4 aspect-4/3 overflow-hidden bg-surface sm:col-span-6 lg:col-span-5">
          {items.map((it, i) => (
            <div key={it.title} className={cn("absolute inset-0 transition-opacity duration-200", (active ?? 0) === i ? "opacity-100" : "opacity-0")}>
              <MediaAsset id={it.image} sizes="40vw" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {list}
      <motion.div aria-hidden style={{ x: sx, y: sy }} className="pointer-events-none absolute top-0 left-0 z-10 hidden w-[22rem] lg:block">
        <AnimatePresence>
          {active !== null && (
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute inset-x-0 top-0 aspect-4/3 overflow-hidden"
            >
              <MediaAsset id={items[active].image} sizes="22rem" decorative />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
