import { useSyncExternalStore } from 'react'

/** Whether a media query matches; false while server-rendering and hydrating. */
export function useMedia(query: string) {
  return useSyncExternalStore(
    (onChange) => { const mq = matchMedia(query); mq.addEventListener('change', onChange); return () => mq.removeEventListener('change', onChange) },
    () => matchMedia(query).matches,
    () => false,
  )
}
