'use client'
// One observer for the whole site: anything marked data-reveal fades up once when it first enters, then stays.
// The hidden start is CSS (.js [data-reveal]); the reveal is a Web Animation that holds its end state, so nothing in the
// server-rendered markup is changed (hydration stays exact). Reduced motion: a 200ms fade, no rise.
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function RevealObserver() {
  const pathname = usePathname()
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          io.unobserve(e.target)
          const el = e.target as HTMLElement
          const i = Number(el.style.getPropertyValue('--i') || 0)
          el.animate(
            reduce
              ? [{ opacity: 0 }, { opacity: 1 }]
              : [{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }],
            { duration: reduce ? 200 : 560, delay: reduce ? 0 : i * 60, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', fill: 'forwards' },
          )
        }
      },
      { rootMargin: '0px 0px -6% 0px' },
    )
    const raf = requestAnimationFrame(() => document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el)))
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [pathname])
  return null
}
