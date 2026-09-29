'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, lenisRef, wantsSmoothScroll } from '@/lib/motion'

export function SmoothScroll() {
  const pathname = usePathname()

  useEffect(() => {
    if (!wantsSmoothScroll()) return
    const lenis = new Lenis({ lerp: 0.1, anchors: true })
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t: number) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // New route starts at the top.
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true })
  }, [pathname])

  return null
}
