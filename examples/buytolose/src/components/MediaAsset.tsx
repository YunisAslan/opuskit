"use client"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { assets, type AssetKey } from "@/config/assets"
import { useReducedMotion } from "@/lib/motion"

type Props = {
  id: AssetKey
  className?: string
  sizes?: string
  priority?: boolean
  /** Fill the positioned parent (object-cover). Otherwise renders at intrinsic aspect ratio. */
  fill?: boolean
  /** Video only: start playing on mount (used after an explicit "Play film" press). */
  autoPlay?: boolean
}

function TempBadge({ id }: { id: AssetKey }) {
  if (process.env.NODE_ENV !== "development" || assets[id].status !== "temporary") return null
  return (
    <span className="pointer-events-none absolute top-2 left-2 z-10 rounded-full bg-surface px-2 py-1 font-utility text-utility">
      Temporary
    </span>
  )
}

export function MediaAsset({ id, className = "", sizes = "100vw", priority, fill, autoPlay }: Props) {
  const a = assets[id]
  if (a.kind === "video") return <LoopVideo id={id} className={className} autoPlay={autoPlay} />
  return (
    <>
      <TempBadge id={id} />
      <Image
        src={a.src}
        alt={a.alt}
        sizes={sizes}
        priority={priority}
        {...(fill ? { fill: true } : { width: a.width, height: a.height })}
        className={`${fill ? "object-cover" : "h-auto w-full"} ${className}`}
      />
    </>
  )
}

/** Muted ambient loop. Pauses off-screen; under reduced motion shows the poster until the visitor presses play. */
function LoopVideo({ id, className, autoPlay }: { id: AssetKey; className: string; autoPlay?: boolean }) {
  const a = assets[id]
  const ref = useRef<HTMLVideoElement>(null)
  const reduced = useReducedMotion()
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (autoPlay) v.play().catch(() => {})
    if (reduced) return
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()))
    io.observe(v)
    return () => io.disconnect()
  }, [reduced, autoPlay])

  const toggle = () => {
    const v = ref.current
    if (!v) return
    if (v.paused) v.play().catch(() => {})
    else v.pause()
  }

  return (
    <>
      <TempBadge id={id} />
      <video
        ref={ref}
        src={a.src}
        poster={"poster" in a ? a.poster : undefined}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
      />
      <button
        type="button"
        onClick={toggle}
        className="absolute right-4 bottom-4 z-10 min-h-11 rounded-full bg-surface px-4 font-utility text-utility transition-colors duration-150 ease-out hover:bg-secondary"
      >
        {playing ? "Pause film" : "Play film"}
      </button>
    </>
  )
}
