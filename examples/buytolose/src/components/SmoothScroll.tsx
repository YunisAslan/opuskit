"use client"
import { useEffect } from "react"
import { FINE_POINTER, matches, REDUCED } from "@/lib/motion"

/** Lenis on fine-pointer devices only, never under reduced motion. Synced to the GSAP ticker so ScrollTrigger stays in step.
 *  Loaded after hydration so pages without scroll sequences don't pay for GSAP up front. */
export function SmoothScroll() {
  useEffect(() => {
    if (!matches(FINE_POINTER) || matches(REDUCED)) return
    let cleanup = () => {}
    let cancelled = false
    Promise.all([import("lenis"), import("gsap"), import("gsap/ScrollTrigger")]).then(([{ default: Lenis }, { gsap }, { ScrollTrigger }]) => {
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)
      const lenis = new Lenis({ lerp: 0.1, anchors: true })
      lenis.on("scroll", ScrollTrigger.update)
      const tick = (time: number) => lenis.raf(time * 1000)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
      cleanup = () => {
        gsap.ticker.remove(tick)
        lenis.destroy()
      }
    })
    return () => {
      cancelled = true
      cleanup()
    }
  }, [])
  return null
}
