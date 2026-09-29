"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import Lenis from "lenis"
import { gsap, ScrollTrigger, isFinePointer, prefersReducedMotion } from "@/lib/motion"

// Lenis on desktop pointer devices only, driven by the GSAP ticker so ScrollTrigger scrubs stay in step.
// Off for touch (native momentum) and for reduced motion.
export function SmoothScroll() {
  const pathname = usePathname()

  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return
    const lenis = new Lenis({ lerp: 0.1, anchors: true })
    lenis.on("scroll", ScrollTrigger.update)
    const tick = (t: number) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
