'use client'
// prefers-reduced-motion, hydration-safe: the server and the first client render both say "false", then React
// re-renders with the real value — so motion props never mismatch the server HTML.
import { useSyncExternalStore } from 'react'

const query = '(prefers-reduced-motion: reduce)'
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(query)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}

export function useReduced() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false)
}

const noop = () => () => {}
/** CSS scroll-driven animations (animation-timeline: view()) — assumed present on the server */
export function useScrollTimeline() {
  return useSyncExternalStore(noop, () => CSS.supports('animation-timeline: view()'), () => true)
}
