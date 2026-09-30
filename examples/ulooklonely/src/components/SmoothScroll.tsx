'use client'
// Lenis smooth scroll on fine-pointer desktops only, synced to the GSAP ticker. Off for touch and reduced motion.
import Lenis from 'lenis'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/motion'

export function SmoothScroll() {
  const path = usePathname()

  useEffect(() => {
    if (!matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return
    const lenis = new Lenis({ lerp: 0.1, anchors: true })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (t: number) => lenis.raf(t * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => { gsap.ticker.remove(raf); lenis.destroy() }
  }, [])

  // New page: start at the top and let every ScrollTrigger re-measure.
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [path])

  return null
}
