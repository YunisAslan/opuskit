'use client'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

// One observer for the whole site: fade & rise ([data-reveal]), line reveals ([data-lines]) and the curtain
// ([data-curtain]) get .is-in once, when 20% of them (or a quarter of the screen) is in view. Re-scans on every route.
export function Reveals() {
  const path = usePathname()
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.intersectionRatio >= 0.2 || e.intersectionRect.height > innerHeight * 0.25) {
          e.target.classList.add('is-in')
          io.unobserve(e.target)
        }
      }
    }, { threshold: [0, 0.1, 0.2] })
    document.querySelectorAll('[data-reveal]:not(.is-in),[data-lines]:not(.is-in),[data-curtain]:not(.is-in)').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [path])
  return null
}
