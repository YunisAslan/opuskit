'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion, isFinePointer } from '@/lib/motion'

// Site-wide motion: Lenis smooth scroll (fine pointers only, off for reduced motion)
// and one IntersectionObserver for [data-reveal], [data-clip] and [data-lines].
export default function MotionRuntime() {
  const pathname = usePathname()

  useEffect(() => {
    if (prefersReducedMotion() || !isFinePointer()) return
    const lenis = new Lenis({ lerp: 0.1, anchors: true })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]:not(.is-in), [data-clip]:not(.is-in), [data-lines]:not(.is-in)')
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          e.target.classList.add('is-in')
          io.unobserve(e.target)
        }
      },
      { threshold: 0, rootMargin: '0px 0px -20% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])

  return null
}
