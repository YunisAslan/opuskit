'use client'
// Fade & rise: watches section wrappers (not every node) and marks each with data-in once it enters the viewport.
// The CSS in globals.css does the rest. Re-scans on every route change.
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function RevealObserver() {
  const path = usePathname()
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.setAttribute('data-in', ''); io.unobserve(e.target) }
    }, { rootMargin: '0px 0px -15% 0px' })
    document.querySelectorAll('section:not([data-in]), [data-reveal-group]:not([data-in])').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [path])
  return null
}
