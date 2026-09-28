'use client'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

// Signature moment: within ~120px the button moves 30% of the pointer offset,
// its label 15%, springing back on leave. Touch: press-scale 0.97 (from .btn).
// Reduced motion: static button with the normal hover state.
export default function MagneticButton({ href, children }: { href: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduced = useReducedMotion()
  const [fine, setFine] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const spring = { stiffness: 220, damping: 18, mass: 0.6 }
  const bx = useSpring(x, spring)
  const by = useSpring(y, spring)
  const lx = useSpring(useMotionValue(0), spring)
  const ly = useSpring(useMotionValue(0), spring)

  useEffect(() => setFine(window.matchMedia('(hover: hover) and (pointer: fine)').matches), [])
  const active = fine && !reduced

  useEffect(() => {
    if (!active) return
    const onMove = (e: PointerEvent) => {
      const r = ref.current!.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      const near = Math.abs(dx) < r.width / 2 + 120 && Math.abs(dy) < r.height / 2 + 120
      x.set(near ? dx * 0.3 : 0)
      y.set(near ? dy * 0.3 : 0)
      lx.set(near ? dx * 0.15 : 0)
      ly.set(near ? dy * 0.15 : 0)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [active, x, y, lx, ly])

  return (
    <motion.a
      ref={ref}
      href={href}
      style={active ? { x: bx, y: by } : undefined}
      className="btn btn-primary min-h-24 px-12 text-2xl md:min-h-32 md:px-16 md:text-3xl"
    >
      <motion.span style={active ? { x: lx, y: ly } : undefined} className="block">
        {children}
      </motion.span>
    </motion.a>
  )
}
