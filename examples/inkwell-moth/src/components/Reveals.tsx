'use client'
// One observer for every reveal on the page (.rise fade & rise, .clip image clip, .lines headline lines).
// It watches section-level wrappers once each, and re-scans after every route change.
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function Reveals() {
  const path = usePathname()
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) }
    }, { threshold: 0.2 })
    document.querySelectorAll('.rise:not(.is-in), .clip:not(.is-in), .lines:not(.is-in)').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [path])
  return null
}
