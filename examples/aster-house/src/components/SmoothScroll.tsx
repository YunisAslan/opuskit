'use client'
// Lenis on desktop pointer devices only (native momentum is better on touch); off entirely with reduced motion.
import Lenis from 'lenis'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

export function SmoothScroll() {
  const lenis = useRef<Lenis | null>(null)
  const path = usePathname()
  useEffect(() => {
    if (!matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return
    const l = new Lenis({ lerp: 0.1, autoRaf: true, anchors: true })
    lenis.current = l
    return () => { l.destroy(); lenis.current = null }
  }, [])
  // A new page starts at its top (or at its #anchor) without Lenis easing back to the old position.
  useEffect(() => {
    const l = lenis.current
    if (!l) return
    const target = location.hash ? document.querySelector<HTMLElement>(location.hash) : null
    l.scrollTo(target ?? 0, { immediate: true, force: true })
  }, [path])
  return null
}
