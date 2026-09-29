'use client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Lenis only for fine pointers without reduced motion; touch keeps native momentum.
export const wantsSmoothScroll = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches && !prefersReducedMotion()

// Client-only facts read without a setState-in-effect round trip (server snapshot = false).
import { useSyncExternalStore } from 'react'
const noop = () => () => {}
export const useClientValue = <T,>(read: () => T, server: T) => useSyncExternalStore(noop, read, () => server)

export const lenisRef: { current: Lenis | null } = { current: null }

// Hydration-safe reduced-motion flag: false during SSR and hydration, real value right after.
export const useReducedMotionSafe = () =>
  useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia('(prefers-reduced-motion: reduce)')
      m.addEventListener('change', cb)
      return () => m.removeEventListener('change', cb)
    },
    prefersReducedMotion,
    () => false,
  )
