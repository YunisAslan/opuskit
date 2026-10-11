'use client'
// OpusKit piece — a photo that dissolves in pixels: on hover or focus, square blocks in the page's ground colour fill
// it in a scattered order, the second photo is swapped in under them, and they clear again (about half a second in
// all). Leaving plays it back. Reduced motion: a plain crossfade. Original OpusKit code (MIT).
import { useEffect, useRef, useState } from 'react'

type Photo = { src: string; alt: string }
// A fixed scatter (the same on server and client), so the blocks never mismatch on hydration.
const order = (i: number) => ((i * 7919 + 104729) % 997) / 997

export function PixelSwap({ front, back, grid = 12, className }: {
  /** Shown at rest. */ front: Photo
  /** Shown on hover or focus. */ back: Photo
  /** Blocks per side. */ grid?: number
  className?: string
}) {
  const [want, setWant] = useState(false) // hovered or focused
  const [shown, setShown] = useState(false) // which photo is under the blocks
  const [cover, setCover] = useState(false)
  const reduce = useRef(false)
  useEffect(() => { reduce.current = matchMedia('(prefers-reduced-motion: reduce)').matches }, [])

  useEffect(() => {
    if (want === shown) return
    if (reduce.current) { setShown(want); return }
    setCover(true)
    const swap = setTimeout(() => { setShown(want); setCover(false) }, 260)
    return () => clearTimeout(swap)
  }, [want, shown])

  const on = () => setWant(true), off = () => setWant(false)
  return (
    <div tabIndex={0} onPointerEnter={on} onPointerLeave={off} onFocus={on} onBlur={off}
      className={`relative overflow-hidden outline-offset-4 focus-visible:outline-2 focus-visible:outline-(--color-accent) ${className ?? ''}`}>
      <img src={front.src} alt={front.alt} className="size-full object-cover transition-opacity duration-300 motion-safe:duration-0" style={{ opacity: shown ? 0 : 1 }} />
      <img src={back.src} alt={back.alt} loading="lazy" className="absolute inset-0 size-full object-cover transition-opacity duration-300 motion-safe:duration-0" style={{ opacity: shown ? 1 : 0 }} />
      <div aria-hidden className="pointer-events-none absolute inset-0 grid motion-reduce:hidden" style={{ gridTemplateColumns: `repeat(${grid}, 1fr)`, gridTemplateRows: `repeat(${grid}, 1fr)` }}>
        {Array.from({ length: grid * grid }, (_, i) => (
          <span key={i} className="bg-(--color-background)" style={{ opacity: cover ? 1 : 0, transition: `opacity 0ms linear ${Math.round(order(i) * 240)}ms` }} />
        ))}
      </div>
    </div>
  )
}
