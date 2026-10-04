'use client'
import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { assets } from '@/config/assets'

const PHONE = '(max-aspect-ratio: 1/1)'

// The quiet half of Home: the river film, full width, one short line. The poster shows at once; the film only loads
// as the band nears the screen (preload="none"), picks the phone or desktop encode, plays muted on a loop while in view
// and pauses when it leaves, when the tab is hidden, or when the visitor presses pause. Reduced motion and Save-Data
// keep the poster until the visitor presses play.
export function FilmBand({ line }: { line: string }) {
  const band = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [wanted, setWanted] = useState<boolean | null>(null) // null = follow the defaults

  useEffect(() => {
    const v = video.current!
    const quiet = matchMedia('(prefers-reduced-motion: reduce)').matches || (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    const want = wanted ?? !quiet
    let visible = false
    const sync = () => {
      if (want && visible && !document.hidden) {
        if (!v.src) { v.src = matchMedia(PHONE).matches ? assets.mobileVideoEncode.src : assets.heroVideo.src }
        v.play().catch(() => {})
      } else v.pause()
    }
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync() }, { rootMargin: '25% 0px' })
    io.observe(band.current!)
    document.addEventListener('visibilitychange', sync)
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', sync); v.pause() }
  }, [wanted])

  return (
    <section ref={band} aria-labelledby="film-line" className="relative h-svh min-h-[34rem] overflow-hidden border-b-2 border-(--color-border) bg-(--color-text)">
      <picture>
        <source media={PHONE} srcSet={assets.posterMobile.src} />
        <img src={assets.posterImage.src} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />
      </picture>
      <video
        ref={video}
        muted loop playsInline preload="none" aria-hidden
        onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)}
        className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${playing ? 'opacity-100' : 'opacity-0'}`}
      />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-10">
        <h2 id="film-line" className="type-utility max-w-[28ch] border-2 border-(--color-border) bg-(--color-background) px-3 py-2">{line}</h2>
        <button
          type="button"
          onClick={() => setWanted(!playing)}
          aria-label={playing ? 'Pause the film' : 'Play the film'}
          className="grid size-12 shrink-0 cursor-pointer place-items-center border-2 border-(--color-border) bg-(--color-background) transition-colors hover:bg-(--color-surface) focus-visible:bg-(--color-surface)"
        >
          {playing ? <Pause className="size-5" strokeWidth={2.5} /> : <Play className="size-5" strokeWidth={2.5} />}
        </button>
      </div>
    </section>
  )
}
