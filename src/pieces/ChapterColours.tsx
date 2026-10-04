'use client'
// OpusKit piece — each item brings its own colours: as an item reaches the middle of the screen, the whole section
// takes that item's ground and ink (set on the item as data-ground / data-ink, any CSS colour or token, AA together).
// Above the first item the section keeps the page's own colours. 500 ms colour transition; reduced motion: instant.
// Original OpusKit code (MIT).
import { useEffect, useRef, useState, type ReactNode } from 'react'

export function ChapterColours({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [at, setAt] = useState<{ ground: string; ink: string } | null>(null)
  useEffect(() => {
    const items = [...(ref.current?.querySelectorAll<HTMLElement>('[data-ground]') ?? [])]
    const io = new IntersectionObserver((es) => {
      for (const e of es) {
        const el = e.target as HTMLElement
        if (e.isIntersecting) setAt({ ground: el.dataset.ground!, ink: el.dataset.ink ?? 'var(--color-text)' })
        else if (el === items[0] && e.boundingClientRect.top > 0) setAt(null)
      }
    }, { rootMargin: '-45% 0px -45% 0px' })
    items.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} style={at ? { backgroundColor: at.ground, color: at.ink } : undefined}
      className={`transition-colors duration-500 ease-out motion-reduce:transition-none ${className ?? ''}`}>
      {children}
    </div>
  )
}
