'use client'
// One observer for the whole page: marks [data-reveal], [data-clip] and [data-lines] as in view (.is-in) once.
// html.reveal-on is set by a tiny script before paint (layout.tsx), so nothing hides without JavaScript.
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function Reveals() {
  const pathname = usePathname()
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) }
    }, { rootMargin: '0px 0px -15% 0px' })
    document.querySelectorAll('[data-reveal]:not(.is-in), [data-clip]:not(.is-in), [data-lines]:not(.is-in)').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])
  return null
}
