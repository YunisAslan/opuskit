'use client'
import Lenis from 'lenis'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

// Lenis on desktop pointers only; off for touch and for reduced motion. Paused while a sheet or menu locks the page.
// Also runs the reveal observer: chapters ([data-reveal]) get .is-in once as they come into view.
export function SmoothScroll() {
  const lenis = useRef<Lenis | null>(null)
  const path = usePathname()

  useEffect(() => {
    if (!matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const l = new Lenis({ autoRaf: true, lerp: 0.1, anchors: true, virtualScroll: () => !document.body.hasAttribute('data-scroll-locked') })
    lenis.current = l
    return () => { l.destroy(); lenis.current = null }
  }, [])

  useEffect(() => {
    lenis.current?.scrollTo(0, { immediate: true, force: true })
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) }
    }, { rootMargin: '0px 0px -12% 0px' })
    document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [path])

  return null
}
