'use client'
// Renders any picture or film from the asset layer by key: <MediaAsset id="gallery1" />. It fills its box (give the
// box a ratio or a height), keeps media corners on the token, lazy-loads unless `priority`, and for a film shows its
// poster first — the film fades in over it only once it has data, so a missing file simply leaves the still.
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { assets, getImage, isVideoKey, type AssetKey } from '@/config/assets'
import { useStill } from '@/lib/motion'

const DEV = process.env.NODE_ENV === 'development'

export function MediaAsset({ id, className = '', sizes = '100vw', priority = false, alt, imgClassName = '', play = false }: {
  id: AssetKey; className?: string; sizes?: string; priority?: boolean; alt?: string; imgClassName?: string
  /** For a film: true once its file exists (the page checks on the server, src/config/media-files.ts). */
  play?: boolean
}) {
  const a = assets[id]
  const still = isVideoKey(id) ? getImage(assets[id].poster) : getImage(id)
  return (
    <div className={`relative overflow-hidden rounded-(--radius-media) bg-(--color-surface) ${className}`}>
      <Image src={still.src} alt={alt ?? a.alt} fill sizes={sizes} {...(priority ? { loading: 'eager' as const, fetchPriority: 'high' as const } : {})} className={`object-cover ${imgClassName}`} />
      {isVideoKey(id) && play && <LoopFilm src={assets[id].src} className={imgClassName} />}
      {DEV && a.status === 'temporary' && (
        <span className="type-utility pointer-events-none absolute right-2 top-2 z-10 bg-(--color-background) px-2 py-1 text-(--color-text)">Temporary</span>
      )}
    </div>
  )
}

/** A muted loop that plays only while on screen; never under reduced motion (the poster stays). */
function LoopFilm({ src, className }: { src: string; className: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)
  const still = useStill()
  useEffect(() => {
    const v = ref.current
    if (!v || still) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause() }, { threshold: 0.1 })
    io.observe(v)
    return () => io.disconnect()
  }, [still])
  if (still) return null
  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
      onLoadedData={() => setReady(true)}
      onError={() => setReady(false)}
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'} ${className}`}
    />
  )
}
