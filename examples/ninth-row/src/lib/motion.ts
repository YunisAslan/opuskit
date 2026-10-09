import { useSyncExternalStore } from 'react'

// The site's two curves (recipe/motion.md) and shared timings. Lenis is mounted once by <SmoothScroll/>; Motion's
// useScroll reads the native scroll position Lenis keeps, so nothing else needs syncing.
export const EASE_CUT = [0.65, 0, 0.35, 1] as const // section entrances, image clip reveal, page curtain
export const EASE_LINE = [0.22, 1, 0.36, 1] as const // line-by-line headline reveal
export const STAGGER = 0.08 // 80 ms between lines
export const REVEAL = 1.05 // seconds — clip reveals (900–1200 ms)
export const VIEWPORT = { once: true, amount: 0.2 } as const

/** A media query as state: the server's answer (false) while hydrating, then the visitor's — no mismatch. */
export function useMedia(query: string) {
  return useSyncExternalStore(
    (cb) => { const mq = matchMedia(query); mq.addEventListener('change', cb); return () => mq.removeEventListener('change', cb) },
    () => matchMedia(query).matches,
    () => false,
  )
}

/** The visitor's reduced-motion setting, hydration-safe. */
export const useReduced = () => useMedia('(prefers-reduced-motion: reduce)')
