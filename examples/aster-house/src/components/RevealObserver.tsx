'use client'
// One IntersectionObserver for every [data-reveal] element (fade & rise, image clip, line-by-line headline).
// What is already on screen when the page loads is shown as it is, so the first screen never waits for an animation.
// A clipped image counts as invisible to the observer (and to lazy loading), so its frame is watched instead…
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function RevealObserver() {
  const path = usePathname()
  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)')]
    const watched = new Map<Element, HTMLElement>()
    els.forEach((el) => {
      const box = el.dataset.reveal === 'clip' && el.parentElement ? el.parentElement : el
      const r = box.getBoundingClientRect()
      if (r.top < innerHeight && r.bottom > 0) el.classList.add('is-in')
      else watched.set(box, el)
    })
    document.documentElement.setAttribute('data-reveal-ready', '')
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return
      watched.get(e.target)?.classList.add('is-in')
      io.unobserve(e.target)
    }), { threshold: 0.2 })
    // …and its lazy loading is started by hand, a screen ahead, so the curtain never opens on an empty frame.
    const near = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return
      const img = watched.get(e.target)
      if (img instanceof HTMLImageElement) img.loading = 'eager'
      near.unobserve(e.target)
    }), { rootMargin: '100% 0px' })
    watched.forEach((el, box) => { io.observe(box); if (el !== box) near.observe(box) })
    return () => { io.disconnect(); near.disconnect() }
  }, [path])
  return null
}
