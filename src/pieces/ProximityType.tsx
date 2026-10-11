'use client'
// OpusKit piece — letters that answer the pointer: in a word set large, the letters nearest the pointer grow heavier,
// the rest stay light, so the word swells and settles as the pointer passes. Needs a variable display face (a weight
// axis — most Google Fonts have one). Idea after Fancy Components "Variable Font Cursor Proximity" (MIT © 2024 Daniel
// Petho, https://fancycomponents.dev); written anew for OpusKit. Touch screens and reduced motion: the word stays at
// its resting weight.
// Original OpusKit code (MIT).
import { useEffect, useRef, type JSX } from 'react'

export function ProximityType({ children, as = 'p', from = 300, to = 900, radius = 180, className }: {
  /** One word or a short name. */ children: string
  as?: keyof JSX.IntrinsicElements
  /** Resting weight and the weight under the pointer. */ from?: number; to?: number
  /** How far from a letter the pointer starts to pull it, in px. */ radius?: number
  className?: string
}) {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return
    const letters = [...root.current!.querySelectorAll<HTMLElement>('[data-letter]')]
    let frame = 0, x = -1e4, y = -1e4
    const draw = () => {
      frame = 0
      for (const l of letters) {
        const r = l.getBoundingClientRect(), d = Math.hypot(x - (r.left + r.width / 2), y - (r.top + r.height / 2))
        const k = Math.max(0, 1 - d / radius)
        l.style.fontVariationSettings = `'wght' ${Math.round(from + (to - from) * k * k * (3 - 2 * k))}` // smoothstep: no hard edge at the radius
      }
    }
    const move = (e: PointerEvent) => { x = e.clientX; y = e.clientY; frame ||= requestAnimationFrame(draw) }
    const leave = () => { x = y = -1e4; frame ||= requestAnimationFrame(draw) }
    addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => { removeEventListener('pointermove', move); document.documentElement.removeEventListener('pointerleave', leave); cancelAnimationFrame(frame) }
  }, [from, to, radius])

  const Tag = as as 'p'
  return (
    <Tag ref={root as never} className={className} style={{ fontVariationSettings: `'wght' ${from}` }}>
      <span className="sr-only">{children}</span>
      {[...children].map((ch, i) => ch === ' ' ? ' ' : (
        <span key={i} aria-hidden data-letter className="inline-block transition-[font-variation-settings] duration-150 ease-out" style={{ fontVariationSettings: `'wght' ${from}` }}>{ch}</span>
      ))}
    </Tag>
  )
}
