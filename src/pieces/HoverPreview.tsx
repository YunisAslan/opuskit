'use client'
// OpusKit piece — a list with a floating preview: items are a clean typographic list, and hovering a row brings its
// photo beside the pointer, following with a light lag; the next row swaps the photo. Touch screens show a small
// thumbnail at the start of each row instead; reduced motion keeps the preview still beside the list.
// Original OpusKit code (MIT).
import { Children, useEffect, useRef, useState, type ReactNode } from 'react'

export function HoverPreview({ photos, children, className }: {
  /** One photo per row, in the same order. */ photos: { src: string; alt: string }[]
  /** The rows: each a link or a line (name, year, price). */ children: ReactNode
  className?: string
}) {
  const root = useRef<HTMLDivElement>(null), card = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(null)
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0 })

  useEffect(() => {
    const el = root.current!, c = card.current!, p = pos.current
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    const draw = () => {
      p.x += (p.tx - p.x) * 0.15; p.y += (p.ty - p.y) * 0.15
      c.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`
      frame = Math.abs(p.tx - p.x) + Math.abs(p.ty - p.y) > 0.5 ? requestAnimationFrame(draw) : 0
    }
    const move = (e: PointerEvent) => {
      const b = el.getBoundingClientRect()
      if (still) { p.tx = p.x = b.width - c.offsetWidth / 2; p.ty = p.y = Math.min(b.height - c.offsetHeight / 2, Math.max(c.offsetHeight / 2, e.clientY - b.top)) }
      else { p.tx = e.clientX - b.left + c.offsetWidth / 2 + 40; p.ty = e.clientY - b.top } // beside the pointer, never under it
      if (active === null) { p.x = p.tx; p.y = p.ty } // appears where the pointer is, no fly-in
      frame ||= requestAnimationFrame(draw)
    }
    el.addEventListener('pointermove', move)
    return () => { el.removeEventListener('pointermove', move); cancelAnimationFrame(frame) }
  }, [active])

  return (
    <div ref={root} onPointerLeave={() => setActive(null)} className={`relative ${className ?? ''}`}>
      <ul>{Children.toArray(children).map((row, i) => (
        <li key={i} onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(i)} className="flex items-center gap-4">
          {photos[i] && <img src={photos[i].src} alt="" loading="lazy" className="size-12 shrink-0 object-cover [@media(hover:hover)]:hidden" />}
          <div className="min-w-0 flex-1">{row}</div>
        </li>
      ))}</ul>
      <div ref={card} aria-hidden className="pointer-events-none absolute left-0 top-0 z-10 hidden aspect-[4/5] w-56 overflow-hidden transition-opacity duration-200 [@media(hover:hover)]:block" style={{ opacity: active === null ? 0 : 1 }}>
        {photos.map((p, i) => <img key={p.src + i} src={p.src} alt="" className="absolute inset-0 size-full object-cover transition-opacity duration-200" style={{ opacity: i === active ? 1 : 0 }} />)}
      </div>
    </div>
  )
}
