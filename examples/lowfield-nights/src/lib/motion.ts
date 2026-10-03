'use client'
// Lenis setup and the reduced-motion guard. Lenis runs only for a fine pointer with motion allowed; Motion's
// useScroll reads the native scroll position Lenis keeps, so nothing else needs syncing.
import Lenis from 'lenis'
import { useSyncExternalStore } from 'react'

let lenis: Lenis | null = null

export const prefersReducedMotion = () => typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

export function startSmoothScroll() {
  if (lenis || prefersReducedMotion() || !matchMedia('(pointer: fine)').matches) return () => {}
  lenis = new Lenis({ lerp: 0.1, autoRaf: true, anchors: true })
  return () => { lenis?.destroy(); lenis = null }
}

export function scrollToY(y: number) {
  if (lenis) lenis.scrollTo(y)
  else window.scrollTo({ top: y, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}

// prefers-reduced-motion that stays false through hydration (the server can't know it), then follows the setting —
// so components can branch on it without a server/client mismatch.
const query = '(prefers-reduced-motion: reduce)'
export function useReducedMotionSafe() {
  return useSyncExternalStore(
    (cb) => { const m = matchMedia(query); m.addEventListener('change', cb); return () => m.removeEventListener('change', cb) },
    () => matchMedia(query).matches,
    () => false,
  )
}
