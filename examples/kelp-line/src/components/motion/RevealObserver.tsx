'use client'
// One observer for the whole site (recipe/motion.md: observe wrappers, not hundreds of nodes). Any element marked
// data-fade (soft fade), data-clip (image clip reveal), data-lines (line-by-line headline) or data-reveal gets data-in
// once, the first time it enters the viewport — so the sections themselves stay server components. Reveals play once.
// A clipped picture is watched through its parent: Chrome measures a target through its own clip-path, and a picture
// clipped shut would never count as visible.
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const SELECTOR = '[data-fade]:not([data-in]),[data-clip]:not([data-in]),[data-lines]:not([data-in]),[data-reveal]:not([data-in])'

export function RevealObserver() {
  const path = usePathname()
  useEffect(() => {
    const owners = new Map<Element, Element[]>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const tall = e.intersectionRect.height > window.innerHeight * 0.35
          if (e.isIntersecting && (e.intersectionRatio >= 0.2 || tall)) {
            for (const el of owners.get(e.target) ?? []) el.setAttribute('data-in', '')
            owners.delete(e.target)
            io.unobserve(e.target)
          }
        }
      },
      { threshold: [0, 0.2, 0.4], rootMargin: '0px 0px -6% 0px' },
    )
    const scan = () => document.querySelectorAll(SELECTOR).forEach((el) => {
      const watch = el.hasAttribute('data-clip') && el.parentElement ? el.parentElement : el
      const list = owners.get(watch) ?? []
      if (list.includes(el)) return
      list.push(el); owners.set(watch, list); io.observe(watch)
    })
    // start once the page has loaded and hydrated (marking server HTML earlier would make React's hydration differ);
    // pages that arrive later by client navigation bring new nodes, caught by the mutation observer
    const mo = new MutationObserver(scan)
    let idle = 0
    const start = () => { idle = window.setTimeout(() => { scan(); mo.observe(document.body, { childList: true, subtree: true }) }, 120) }
    if (document.readyState === 'complete') start()
    else window.addEventListener('load', start, { once: true })
    return () => { window.removeEventListener('load', start); window.clearTimeout(idle); io.disconnect(); mo.disconnect() }
  }, [path])
  return null
}
