"use client"

import { useSyncExternalStore } from "react"

// SSR renders the `fallback` value; the client switches after hydration.
export function useMediaQuery(query: string, fallback = false) {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query)
      m.addEventListener("change", cb)
      return () => m.removeEventListener("change", cb)
    },
    () => window.matchMedia(query).matches,
    () => fallback,
  )
}

export const useIsMobile = () => useMediaQuery("(max-width: 639px)")
export const useReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)")
