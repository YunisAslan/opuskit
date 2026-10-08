'use client'
// Clip reveal trigger. Watches one wrapper (never every node) and sets data-in once it enters the viewport; the CSS in
// globals.css does the rest: .rv blocks unmask upward, .rv-img frames open like a curtain, .rv-text lines follow 70ms
// apart (style={{ '--i': n }}). Reduced motion swaps all of it for a 200ms fade in the same CSS.
import { useEffect, useRef, type ComponentProps, type ElementType } from 'react'

type P<T extends ElementType> = { as?: T } & Omit<ComponentProps<T>, 'as'>

export function Reveal<T extends ElementType = 'div'>({ as, ...props }: P<T>) {
  const Tag = (as ?? 'div') as ElementType
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.setAttribute('data-in', ''); io.disconnect() }
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <Tag ref={ref} data-reveal="" {...props} />
}
