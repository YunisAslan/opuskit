'use client'
// Shows a full-width layout (rendered at `width` px) shrunk to fit its box — real sections as thumbnails and page canvases.
// Fixed mode: the box's size comes from className (e.g. an aspect ratio). Auto mode: the box takes the scaled content
// height, clipped at `maxHeight` (px) when given.
import { useEffect, useRef, useState, type ReactNode } from 'react'

export function ScaledFrame({ width = 1280, auto = false, maxHeight, children, className }: { width?: number; auto?: boolean; maxHeight?: number; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.3)
  const [h, setH] = useState(0)
  useEffect(() => {
    const el = ref.current, content = inner.current
    if (!el || !content) return
    const ro = new ResizeObserver(() => { setScale(el.offsetWidth / width); setH(content.offsetHeight) })
    ro.observe(el); ro.observe(content)
    return () => ro.disconnect()
  }, [width])
  const height = auto ? Math.min(h * scale, maxHeight ?? Infinity) : undefined
  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ''}`} style={auto ? { height } : undefined} aria-hidden inert>
      <div ref={inner} className="absolute left-0 top-0 origin-top-left" style={{ width, transform: `scale(${scale})` }}>{children}</div>
    </div>
  )
}
