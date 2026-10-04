'use client'
// Lenis smooth scroll (lerp 0.1) on fine-pointer devices only; touch keeps native momentum, and reduced motion turns
// it off. Lenis keeps the native scroll position, so Motion's useScroll and anchor links keep working.
import Lenis from 'lenis'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

export function SmoothScroll() {
  const lenis = useRef<Lenis | null>(null)
  const path = usePathname()
  useEffect(() => {
    if (!matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const l = new Lenis({ lerp: 0.1, autoRaf: true })
    lenis.current = l
    return () => { l.destroy(); lenis.current = null }
  }, [])
  useEffect(() => { // a new page starts at its top, or at its #anchor
    const target = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null
    lenis.current?.scrollTo(target ?? 0, { immediate: true, force: true })
  }, [path])
  return null
}
