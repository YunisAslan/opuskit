'use client'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

// One observer for the whole page: marks [data-reveal] wrappers with data-in once they are 20% in view.
// globals.css holds the motion itself (hard cut, line reveal, curtain) and every reduced-motion fallback.
export function Reveals() {
  const path = usePathname()
  useEffect(() => {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.setAttribute('data-in', ''); io.unobserve(e.target) }
    }), { threshold: 0.2 })
    document.querySelectorAll('[data-reveal]:not([data-in])').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [path])
  return null
}
