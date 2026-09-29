'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// One observer for every [data-reveal] element on the page. Adds .is-in once; CSS does the rest.
export function RevealObserver() {
  const pathname = usePathname()
  useEffect(() => {
    // A clip-revealed element has zero visible area until it opens, so we watch its parent instead.
    const watched = new Map<Element, HTMLElement>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          watched.get(e.target)?.classList.add('is-in')
          watched.delete(e.target)
          io.unobserve(e.target)
        }
      },
      { threshold: 0.2 },
    )
    const scan = () =>
      document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)').forEach((el) => {
        if (el.dataset.reveal === 'stagger') Array.from(el.children).forEach((c, i) => (c as HTMLElement).style.setProperty('--i', String(i)))
        if (el.dataset.reveal === 'lines') el.querySelectorAll<HTMLElement>('.line').forEach((l, i) => l.style.setProperty('--i', String(i)))
        const target = el.dataset.reveal === 'clip' ? el.parentElement! : el
        watched.set(target, el)
        io.observe(target)
      })
    scan()
    // Catch elements that mount later (client components, route transitions).
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [pathname])
  return null
}
