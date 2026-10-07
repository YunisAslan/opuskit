'use client'
// Motion system (recipe/motion.md): two easings, one timing scale, and the guards every effect checks first.
import { useEffect, useState } from 'react'

export const EASE_CUT = [0.65, 0, 0.35, 1] as const // clip reveals, page transition
export const EASE_LINE = [0.22, 1, 0.36, 1] as const // headline lines, text arrivals

export const DUR = { cut: 1.1, line: 0.7, text: 0.7, still: 0.2 } as const
export const STAGGER = 0.08 // 80 ms between lines
export const TEXT_AFTER_MEDIA = 0.55 // words arrive once the picture has nearly landed

/** Matches a media query on the client; `fallback` during SSR and the first paint. */
export function useMedia(query: string, fallback = false) {
  const [match, setMatch] = useState(fallback)
  useEffect(() => {
    const mq = matchMedia(query)
    const sync = () => setMatch(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [query])
  return match
}

/** prefers-reduced-motion, resolved after mount so the server's HTML and the first client render agree (motion's
 *  own useReducedMotion reads the query during render, which breaks hydration wherever the layout branches on it). */
export const useStill = () => useMedia('(prefers-reduced-motion: reduce)')
export const useFinePointer = () => useMedia('(hover: hover) and (pointer: fine)')
export const useDesktop = () => useMedia('(min-width: 768px)', true)
