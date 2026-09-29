"use client"

import { useEffect, useRef, useState } from "react"
import { MediaAsset } from "@/components/MediaAsset"
import type { ImageKey } from "@/config/assets"
import { useMediaQuery, useReducedMotion } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"

// Image trail behind the cursor. A fixed pool of nodes (one per photo) is recycled: every ~80px of
// pointer travel the next node jumps to the pointer, scales 0.8 → 1 and fades out over 900ms.
// Touch: a slow crossfade of the same photos. Reduced motion: a static collage of three.
export function ImageTrail({ images, children }: { images: readonly ImageKey[]; children: React.ReactNode }) {
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)")
  const reduced = useReducedMotion()
  const mode = reduced ? "still" : fine ? "trail" : "fade"

  return (
    <div className="relative grid-page content-end gap-y-10 pt-24 pb-16 lg:min-h-[calc(100svh-4rem)] lg:pt-0">
      {mode === "trail" && <Trail images={images} />}
      <div className="relative z-10 col-span-4 sm:col-span-6 lg:col-span-7">{children}</div>
      {mode === "fade" && <Crossfade images={images} />}
      {mode === "still" && (
        <div className="col-span-4 grid grid-cols-3 gap-4 sm:col-span-6 lg:col-span-5">
          {images.slice(0, 3).map((k) => (
            <div key={k} className="relative aspect-4/5 overflow-hidden">
              <MediaAsset id={k} sizes="(min-width: 1024px) 14vw, 30vw" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Trail({ images }: { images: readonly ImageKey[] }) {
  const area = useRef<HTMLDivElement>(null)
  const nodes = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const zone = area.current!.parentElement!
    let last: { x: number; y: number } | null = null
    let next = 0
    let z = 1
    const onMove = (e: PointerEvent) => {
      const r = zone.getBoundingClientRect()
      const p = { x: e.clientX - r.left, y: e.clientY - r.top }
      if (last && Math.hypot(p.x - last.x, p.y - last.y) < 80) return
      last = p
      const el = nodes.current[next]
      next = (next + 1) % nodes.current.length
      if (!el) return
      el.style.zIndex = String(z++)
      el.getAnimations().forEach((a) => a.cancel())
      const at = `translate(${p.x - el.offsetWidth / 2}px, ${p.y - el.offsetHeight / 2}px)`
      el.animate(
        [
          { transform: `${at} scale(0.8)`, opacity: 1 },
          { transform: `${at} scale(1)`, opacity: 1, offset: 0.35 },
          { transform: `${at} scale(1)`, opacity: 0 },
        ],
        { duration: 900, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" },
      )
    }
    zone.addEventListener("pointermove", onMove)
    return () => zone.removeEventListener("pointermove", onMove)
  }, [])

  return (
    <div ref={area} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {images.map((k, i) => (
        <div
          key={k}
          ref={(n) => { nodes.current[i] = n }}
          className="absolute top-0 left-0 aspect-4/5 w-44 overflow-hidden opacity-0 lg:w-56"
        >
          <MediaAsset id={k} sizes="224px" decorative />
        </div>
      ))}
    </div>
  )
}

function Crossfade({ images }: { images: readonly ImageKey[] }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % images.length), 3200)
    return () => clearInterval(t)
  }, [images.length])
  return (
    <div aria-hidden className="relative col-span-4 aspect-4/5 overflow-hidden sm:col-span-3">
      {images.map((k, n) => (
        <div key={k} className={cn("absolute inset-0 transition-opacity duration-[1200ms] ease-in-out", n === i ? "opacity-100" : "opacity-0")}>
          <MediaAsset id={k} sizes="(min-width: 640px) 50vw, 100vw" decorative priority={n === 0} />
        </div>
      ))}
    </div>
  )
}
