'use client'
import { useEffect, useRef, useState } from 'react'

export type RevealState = 'static' | 'hidden' | 'shown' | 'done'

/**
 * Once-only viewport entrance. Whatever is already on screen when the page arrives stays put (the first screen is
 * complete before anything animates); everything below waits hidden and plays once when it scrolls in.
 */
export function useReveal<T extends HTMLElement>(margin = '0px 0px -12% 0px') {
  const ref = useRef<T>(null)
  const [state, setState] = useState<RevealState>('static')
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    if (r.top < window.innerHeight * 0.9 && r.bottom > 0) return
    setState('hidden')
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setState('shown'); io.disconnect()
        // once played, drop the entrance transitions so hover and press answer without the stagger's delays
        done = setTimeout(() => setState('done'), 1400)
      }
    }, { rootMargin: margin, threshold: 0 })
    let done: ReturnType<typeof setTimeout> | undefined
    io.observe(el)
    return () => { io.disconnect(); clearTimeout(done) }
  }, [margin])
  return [ref, state] as const
}
