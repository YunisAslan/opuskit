'use client'
// OpusKit piece — a brand cursor: a hand-drawn arrow (or your own SVG) replaces the system arrow on fine pointers.
// Links and buttons keep the system pointer so clickable things still read as clickable. Original OpusKit code (MIT).
import { useEffect } from 'react'

const drawn = (fill: string) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="28" height="32" viewBox="0 0 28 32"><path d="M3 2 C 9 12, 14 20, 17 28 L 19.5 19.5 L 27 17.5 C 19 12, 10 6, 3 2 Z" fill="${fill}" stroke="#111" stroke-width="2" stroke-linejoin="round"/></svg>`)}`

export function BrandCursor({ src, hotspot = [3, 2] }: { src?: string; hotspot?: [number, number] }) {
  useEffect(() => {
    if (!matchMedia('(pointer: fine)').matches) return
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--color-chapter-1').trim() || getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim() || '#0038FF'
    const url = src ?? drawn(accent)
    const el = document.createElement('style')
    el.textContent = `html{cursor:url("${url}") ${hotspot[0]} ${hotspot[1]}, auto}a,button,[role=button],label,summary{cursor:pointer}`
    document.head.appendChild(el)
    return () => el.remove()
  }, [src, hotspot])
  return null
}
