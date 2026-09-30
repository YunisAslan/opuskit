'use client'
import { useSyncExternalStore } from 'react'

/** Live media-query match. False on the server and on first paint. */
export function useMedia(query: string) {
  return useSyncExternalStore(
    (cb) => { const mq = matchMedia(query); mq.addEventListener('change', cb); return () => mq.removeEventListener('change', cb) },
    () => matchMedia(query).matches,
    () => false,
  )
}

/** Reduced-motion preference that is false during hydration, so server and client markup match. */
export const useReduced = () => useMedia('(prefers-reduced-motion: reduce)')

/** True only after hydration. */
export const useHydrated = () => useSyncExternalStore(() => () => {}, () => true, () => false)
