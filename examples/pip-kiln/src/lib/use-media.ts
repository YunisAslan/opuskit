'use client'
import { useSyncExternalStore } from 'react'

/** True while the query matches; false on the server and before hydration. */
export function useMedia(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query)
      m.addEventListener('change', cb)
      return () => m.removeEventListener('change', cb)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

export const usePhone = () => useMedia('(max-width: 639px)')
export const useReduced = () => useMedia('(prefers-reduced-motion: reduce)')
