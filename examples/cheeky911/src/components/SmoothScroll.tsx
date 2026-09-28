'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import type Lenis from 'lenis'
import { loadScroll, finePointer, prefersReducedMotion } from '@/lib/motion'

let lenis: Lenis | null = null

// Lenis on desktop pointer devices only, never with reduced motion. Also owns the
// per-route reveal observer so server components only need a data-reveal attribute.
export default function SmoothScroll() {
  const pathname = usePathname()

  useEffect(() => {
    if (!finePointer() || prefersReducedMotion()) return
    let dead = false
    let stop = () => {}
    Promise.all([import('lenis'), loadScroll()]).then(([{ default: L }, { gsap, ScrollTrigger }]) => {
      if (dead) return
      lenis = new L({ lerp: 0.1, anchors: true })
      lenis.on('scroll', ScrollTrigger.update)
      const tick = (t: number) => lenis?.raf(t * 1000)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
      stop = () => {
        gsap.ticker.remove(tick)
        lenis?.destroy()
        lenis = null
      }
    })
    return () => {
      dead = true
      stop()
    }
  }, [])

  useEffect(() => {
    // Respect /page#id links; otherwise start the new page at the top.
    const target = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)))
    lenis?.scrollTo(target || 0, { offset: target ? -96 : 0, immediate: true })
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return
        e.target.classList.add('is-in')
        io.unobserve(e.target)
      }),
      { threshold: 0.2 },
    )
    document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => io.observe(el))
    loadScroll().then(({ ScrollTrigger }) => ScrollTrigger.refresh())
    return () => io.disconnect()
  }, [pathname])

  return null
}
