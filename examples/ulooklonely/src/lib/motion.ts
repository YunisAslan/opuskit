'use client'
// GSAP + ScrollTrigger setup shared by the pinned sequences, plus the recipe's easings.
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.config({ ignoreMobileResize: true })

export { gsap, ScrollTrigger }

export const EASE_SOFT = [0.22, 1, 0.36, 1] as const // fade & rise, line reveal
export const EASE_CURTAIN = [0.65, 0, 0.35, 1] as const // clip reveal, page transition

export const MOTION_OK = '(prefers-reduced-motion: no-preference)'
export const REDUCED = '(prefers-reduced-motion: reduce)'
