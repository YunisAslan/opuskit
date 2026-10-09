'use client'
// prefers-reduced-motion, safe for server rendering: false on the server and during hydration, then the visitor's
// real setting (and it follows changes). Use it wherever the answer changes markup or styles.
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
