'use client'
// The quiet index: every page is a walk through named stops ([data-stop]); this shows them and marks where the visitor
// is. Desktop: a column of names at the right edge, clickable. Phones: the current stop's name, small, at the bottom.
// It steps aside while a stop that carries its own index (the walk on Venue & travel) is on screen. The phone label also
// steps aside once the footer is in view, and whenever a link, button or field is under it.
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { scrollToY } from '@/lib/motion'

const CONTROLS = 'a[href],button,input,select,textarea,[role="button"],[role="combobox"],[role="checkbox"],[role="radio"],[role="tab"]'

export function StopIndex() {
  const path = usePathname()
  const [stops, setStops] = useState<{ id: string; name: string; own: boolean }[]>([])
  const [current, setCurrent] = useState(0)
  // The current name shows for a moment when the visitor reaches a new stop, then folds back to its tick.
  const [flash, setFlash] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const label = useRef<HTMLParagraphElement>(null)
  const [blocked, setBlocked] = useState(false)

  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>('[data-stop]')]
    // The stops live in the DOM of whichever page is showing: read them after each navigation.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStops(els.map((el) => ({ id: el.id, name: el.dataset.stop!, own: el.hasAttribute('data-own-index') })))
    setCurrent(0)
    // A stop is current while it crosses the middle of the screen.
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) {
        setCurrent(els.indexOf(e.target as HTMLElement))
        setFlash(true)
        clearTimeout(timer.current)
        timer.current = setTimeout(() => setFlash(false), 2200)
      }
    }, { rootMargin: '-50% 0px -50% 0px' })
    els.forEach((el) => io.observe(el))
    return () => { io.disconnect(); clearTimeout(timer.current) }
  }, [path])

  // Phones: re-check what is under the label after every scroll, resize or change in page height (one check per frame).
  useEffect(() => {
    let raf = 0
    const check = () => {
      raf = 0
      const el = label.current
      const l = el?.getBoundingClientRect()
      if (!el || !l?.width) return
      const under = (r: DOMRect) => r.width > 0 && r.right > l.left - 8 && r.left < l.right + 8 && r.bottom > l.top - 8 && r.top < l.bottom + 8
      const footer = document.querySelector('footer')
      setBlocked((footer ? footer.getBoundingClientRect().top < innerHeight : false)
        || [...document.querySelectorAll(CONTROLS)].some((c) => !el.parentElement!.contains(c) && under(c.getBoundingClientRect())))
    }
    const queue = () => { raf ||= requestAnimationFrame(check) }
    queue()
    addEventListener('scroll', queue, { passive: true })
    addEventListener('resize', queue)
    const ro = new ResizeObserver(queue)
    ro.observe(document.body)
    return () => { cancelAnimationFrame(raf); removeEventListener('scroll', queue); removeEventListener('resize', queue); ro.disconnect() }
  }, [path, stops])

  if (stops.length < 2) return null
  const hidden = stops[current]?.own
  const go = (id: string) => {
    const el = document.getElementById(id)
    if (el) scrollToY(el.getBoundingClientRect().top + scrollY)
  }

  return (
    <nav aria-label="Stops on this page" className={`pointer-events-none fixed z-40 transition-opacity duration-300 max-md:bottom-3 max-md:left-4 md:right-3 md:top-1/2 md:-translate-y-1/2 ${hidden ? 'opacity-0' : 'opacity-100'}`}>
      <p ref={label} className={`type-utility bg-(--color-background)/80 px-2 py-1 text-(--color-text) transition-opacity duration-200 md:hidden ${blocked ? 'opacity-0' : ''}`} aria-live="polite">{stops[current]?.name}</p>
      <ol className="group/index hidden flex-col items-end md:flex">
        {stops.map((s, i) => (
          <li key={s.id}>
            <button type="button" onClick={() => go(s.id)} tabIndex={hidden ? -1 : 0} aria-current={i === current ? 'location' : undefined}
              className="group/stop type-utility pointer-events-auto flex min-h-8 items-center gap-3 text-(--color-muted) transition-colors duration-150 hover:text-(--color-text) focus-visible:text-(--color-text) focus-visible:underline aria-[current=location]:text-(--color-text)">
              {/* Names stay folded away except the current one; hovering or focusing the index opens them all. */}
              <span className={`bg-(--color-background)/80 px-1.5 opacity-0 transition-opacity duration-200 group-hover/index:opacity-100 group-focus-within/index:opacity-100 ${flash ? 'group-aria-[current=location]/stop:opacity-100' : ''}`}>{s.name}</span>
              <span aria-hidden className={`h-px w-6 origin-right transition-[transform,background-color] duration-300 ${i === current ? 'bg-(--color-accent)' : 'scale-x-50 bg-(--color-muted)'}`} />
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}
