'use client'
// One IntersectionObserver for the whole page: [data-reveal] (fade & rise), [data-clip] (image clip) and [data-lines]
// (line-by-line headline) get .is-in once, when 20% of them is in view. html.reveal-on is set before first paint by
// the inline script in layout.tsx, so without JavaScript everything simply shows.
// A clipped frame has no visible area (Chrome intersects the target's own clip-path), so its parent is watched instead.
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function Reveals() {
  const path = usePathname()
  useEffect(() => {
    const owners = new Map<Element, Element[]>()
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { owners.get(e.target)?.forEach((el) => el.classList.add('is-in')); io.unobserve(e.target) }
    }, { threshold: 0.2 })
    document.querySelectorAll('[data-reveal]:not(.is-in),[data-clip]:not(.is-in),[data-lines]:not(.is-in)').forEach((el) => {
      const watch = el.hasAttribute('data-clip') ? el.parentElement ?? el : el
      owners.set(watch, [...(owners.get(watch) ?? []), el])
      io.observe(watch)
    })
    return () => io.disconnect()
  }, [path])
  return null
}
