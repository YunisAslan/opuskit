'use client'
import { useEffect, useRef, useState } from 'react'
import { assets } from '@/config/assets'
import { prefersReducedMotion } from '@/lib/motion'
import MediaAsset from './MediaAsset'

const SPEED = 40 // px per second, same on every screen
const count = assets.yourPhotos.gallery.length

// Endless rows: duplicated tracks drifting in opposite directions. Slows on hover,
// pauses off-screen, static grid under reduced motion.
export default function PhotoRows({ rows = 2, offset = 0, label }: { rows?: 2 | 3; offset?: number; label: string }) {
  const root = useRef<HTMLDivElement>(null)
  // Images mount only when the rows come near, so they never compete with the hero on first load.
  const [near, setNear] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: '100% 0px' })
    io.observe(root.current!)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!near || prefersReducedMotion()) return
    const el = root.current!
    const tracks = [...el.querySelectorAll<HTMLElement>('[data-track]')]
    const anims = tracks.map((t, i) => {
      const half = t.scrollWidth / 2
      const frames = [{ transform: 'translateX(0)' }, { transform: `translateX(-${half}px)` }]
      return t.animate(i % 2 ? frames.reverse() : frames, { duration: (half / SPEED) * 1000, iterations: Infinity })
    })
    const io = new IntersectionObserver(([e]) => anims.forEach((a) => (e.isIntersecting ? a.play() : a.pause())))
    io.observe(el)
    const slow = () => anims.forEach((a) => a.updatePlaybackRate(0.25))
    const fast = () => anims.forEach((a) => a.updatePlaybackRate(1))
    el.addEventListener('pointerenter', slow)
    el.addEventListener('pointerleave', fast)
    return () => {
      io.disconnect()
      anims.forEach((a) => a.cancel())
      el.removeEventListener('pointerenter', slow)
      el.removeEventListener('pointerleave', fast)
    }
  }, [near])

  // Keep the owner's order; each row starts further along the set.
  const row = (r: number) => Array.from({ length: count }, (_, i) => (i + offset + r * 3) % count)

  return (
    <div ref={root} role="region" aria-label={label} className="rows overflow-hidden py-6">
      <div className="flex flex-col gap-4 md:gap-6 [transform:perspective(1400px)_rotateX(6deg)]">
        {Array.from({ length: rows }, (_, r) => (
          <div key={r} data-track className={`flex w-max gap-4 md:gap-6 ${r === 2 ? 'max-md:hidden' : ''}`}>
            {[...row(r), ...row(r)].map((idx, k) => {
              const [w, h] = assets.yourPhotos.dims[idx]
              return (
                <div key={k} aria-hidden={k >= count || undefined} className="relative h-48 shrink-0 overflow-hidden bg-surface md:h-72" style={{ aspectRatio: `${w} / ${h}` }}>
                  {near && <MediaAsset id="yourPhotos" index={idx} alt={k >= count ? '' : undefined} sizes="(min-width: 768px) 30vw, 40vw" />}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
