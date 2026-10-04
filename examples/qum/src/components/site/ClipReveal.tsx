'use client'
import { useEffect, useRef, type ReactNode } from 'react'

// Image clip reveal: every photo inside opens like a curtain (clip-path inset 100% → 0, the photo settling from 1.15
// to 1) the first time it enters the viewport. Reduced motion: a 200 ms fade (see globals.css).
export function ClipReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const imgs = ref.current!.querySelectorAll('img')
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return
      ;(e.target as HTMLElement).dataset.shown = ''
      io.unobserve(e.target)
    }), { rootMargin: '0px 0px -10% 0px' })
    imgs.forEach((img) => { img.parentElement!.classList.add('clip-frame'); img.classList.add('clip-img'); io.observe(img.parentElement!) })
    return () => io.disconnect()
  }, [])
  return <div ref={ref}>{children}</div>
}
