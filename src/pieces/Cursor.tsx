'use client'
// OpusKit piece — adapted from Motion Primitives "Cursor" (MIT © 2024 ibelick, https://motion-primitives.com).
// A custom cursor inside one area (a gallery, a hero) — e.g. a round "View" label over project photos.
// Only on fine pointers; the system cursor stays everywhere else.
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useState, type ReactNode } from 'react'

export function CursorArea({ children, label = 'View', className }: { children: ReactNode; label?: string; className?: string }) {
  const reduce = useReducedMotion()
  const [on, setOn] = useState(false)
  const x = useSpring(useMotionValue(0), { stiffness: 500, damping: 40 })
  const y = useSpring(useMotionValue(0), { stiffness: 500, damping: 40 })
  return (
    <div className={`relative ${on ? 'cursor-none' : ''} ${className ?? ''}`}
      onPointerEnter={(e) => !reduce && e.pointerType === 'mouse' && setOn(true)} onPointerLeave={() => setOn(false)}
      onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); x.set(e.clientX - r.left); y.set(e.clientY - r.top) }}>
      {children}
      <AnimatePresence>
        {on && (
          <motion.span aria-hidden className="pointer-events-none absolute left-0 top-0 z-20 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-(--color-accent) text-sm text-(--color-background)"
            style={{ x, y }} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}>{label}</motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}
