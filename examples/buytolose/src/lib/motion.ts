"use client"
import { useSyncExternalStore } from "react"

export const EASE_OUT = [0.22, 1, 0.36, 1] as const
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const

export const REDUCED = "(prefers-reduced-motion: reduce)"
export const FINE_POINTER = "(pointer: fine)"
export const MOBILE = "(max-width: 639px)"

export const matches = (q: string) => typeof window !== "undefined" && window.matchMedia(q).matches

const subscribers = new Map<string, (cb: () => void) => () => void>()
const subscribe = (q: string) => {
  if (!subscribers.has(q)) {
    subscribers.set(q, (cb) => {
      const m = window.matchMedia(q)
      m.addEventListener("change", cb)
      return () => m.removeEventListener("change", cb)
    })
  }
  return subscribers.get(q)!
}

// Server render assumes full motion + coarse pointer; client corrects after hydration.
export function useMedia(q: string) {
  return useSyncExternalStore(subscribe(q), () => matches(q), () => false)
}

export const useReducedMotion = () => useMedia(REDUCED)
export const useFinePointer = () => useMedia(FINE_POINTER)
