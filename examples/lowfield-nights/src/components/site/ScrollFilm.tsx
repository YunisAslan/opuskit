'use client'
// The whole-page scroll film: a fixed 100svh video behind every page, its playhead mapped to the page scroll (0 → 1).
// One Motion scroll progress (useScroll → useSpring) drives video.currentTime. On Home, each film window
// ([data-scene-at], see config/scenes.ts) pins its scene: the mapping bends so that moment is on screen while the
// window is. Phones and portrait screens get the 9:16 encode. Reduced motion: the poster stays, and the film plays
// only when asked.
import { useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { assets } from '@/config/assets'
import { useReducedMotionSafe } from '@/lib/motion'

type Knot = [progress: number, time: number]

function measureKnots(): Knot[] {
  const max = document.documentElement.scrollHeight - innerHeight
  const knots: Knot[] = [[0, 0]]
  if (max > 0) document.querySelectorAll<HTMLElement>('[data-scene-at]').forEach((el) => {
    const r = el.getBoundingClientRect()
    const p = (r.top + scrollY + r.height / 2 - innerHeight / 2) / max
    const t = Number(el.dataset.sceneAt)
    const [lp, lt] = knots[knots.length - 1]
    if (p > lp && p < 1 && t > lt && t < 1) knots.push([p, t])
  })
  knots.push([1, 1])
  return knots
}

const along = (knots: Knot[], p: number) => {
  for (let i = 1; i < knots.length; i++) {
    const [p0, t0] = knots[i - 1], [p1, t1] = knots[i]
    if (p <= p1) return t0 + ((p - p0) / (p1 - p0)) * (t1 - t0)
  }
  return 1
}

export function ScrollFilm() {
  const video = useRef<HTMLVideoElement>(null)
  const knots = useRef<Knot[]>([[0, 0], [1, 1]])
  const target = useRef(0)
  const reduce = useReducedMotionSafe()
  const path = usePathname()
  const [playing, setPlaying] = useState(false)
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.0001 })

  // Pick the encode for this screen once mounted (the poster <picture> covers the first paint).
  useEffect(() => {
    const v = video.current
    if (!v) return
    const portrait = matchMedia('(max-aspect-ratio: 1/1)').matches
    v.src = reduce ? assets.heroVideo.src : portrait ? assets.mobileVideoEncode.src : assets.scrubReadyEncode.src
    v.load()
  }, [reduce])

  // Re-measure the scene windows whenever the page or its height changes.
  useEffect(() => {
    const update = () => { knots.current = measureKnots() }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(document.body)
    return () => ro.disconnect()
  }, [path])

  useMotionValueEvent(smooth, 'change', (p) => { target.current = along(knots.current, Math.min(1, Math.max(0, p))) })

  // Seek on animation frames, never stacking a seek on one still in flight.
  useEffect(() => {
    if (reduce) return
    let raf = 0
    const tick = () => {
      const v = video.current
      if (v && v.duration && !v.seeking) {
        const t = target.current * (v.duration - 0.05)
        if (Math.abs(v.currentTime - t) > 0.02) v.currentTime = t
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduce])

  const toggle = () => {
    const v = video.current
    if (!v) return
    if (v.paused) { v.loop = true; void v.play(); setPlaying(true) } else { v.pause(); setPlaying(false) }
  }

  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-svh overflow-hidden bg-(--color-background)">
        <picture>
          <source media="(max-aspect-ratio: 1/1)" srcSet={assets.posterMobile.src} />
          <img src={assets.posterImage.src} alt="" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
        </picture>
        <video ref={video} muted playsInline preload="auto" className={`absolute inset-0 h-full w-full object-cover ${reduce && !playing ? 'opacity-0' : ''}`} />
      </div>
      {reduce && (
        <button type="button" onClick={toggle} className="type-utility fixed bottom-4 right-4 z-40 min-h-11 border border-(--color-muted) bg-(--color-background)/80 px-4 hover:bg-(--color-secondary) focus-visible:bg-(--color-secondary)">
          {playing ? 'Pause the film' : 'Play the film'}
        </button>
      )}
    </>
  )
}
