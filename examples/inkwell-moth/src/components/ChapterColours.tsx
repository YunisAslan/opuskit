'use client'
// Signature — "Each item brings its own colours": as a book reaches the middle of the screen, the whole section takes
// its ground and ink (tokens --color-{chapter}-ground / -ink, all AA). Scrolling back above the first book returns the
// page's own paper. 500ms colour transition; reduced motion: the colours switch instantly.
import { useEffect, useRef, useState, type ReactNode } from 'react'

export function ChapterColours({ children, id, label }: { children: ReactNode; id: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [chapter, setChapter] = useState<string | null>(null)
  useEffect(() => {
    const items = [...(ref.current?.querySelectorAll<HTMLElement>('[data-chapter]') ?? [])]
    const io = new IntersectionObserver((es) => {
      for (const e of es) {
        if (e.isIntersecting) setChapter((e.target as HTMLElement).dataset.chapter ?? null)
        else if (e.target === items[0] && e.boundingClientRect.top > 0) setChapter(null)
      }
    }, { rootMargin: '-45% 0px -45% 0px' })
    items.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  const style = chapter ? { backgroundColor: `var(--color-${chapter}-ground)`, color: `var(--color-${chapter}-ink)` } : undefined
  return (
    <div ref={ref} id={id} data-spy={label} style={style} className="transition-colors duration-500 ease-out motion-reduce:transition-none">
      {children}
    </div>
  )
}
