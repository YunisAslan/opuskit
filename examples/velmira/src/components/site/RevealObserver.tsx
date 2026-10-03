'use client'
// Fade & rise, line-by-line and image clip reveals: every [data-reveal] block gets data-in once it is 20% in view;
// globals.css does the rest (with its reduced-motion versions). One observer per page, on block wrappers only.
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function RevealObserver() {
  const pathname = usePathname()
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { (e.target as HTMLElement).dataset.in = ''; io.unobserve(e.target) }
    }, { threshold: 0.2 })
    document.querySelectorAll('[data-reveal]:not([data-in])').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])
  return null
}
