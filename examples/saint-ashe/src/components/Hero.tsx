'use client'
// Ambient video hero: the poster shows at once (a <picture>, phone and desktop crops), the muted loop plays over it.
// Pauses off-screen and when the tab is hidden; a visible pause button. Reduced motion or Save-Data: poster + play button.
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Pause, Play } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { assets } from '@/config/assets'

export function Hero({ children }: { children: ReactNode }) {
  const video = useRef<HTMLVideoElement>(null)
  const held = useRef(false) // the visitor (or their settings) asked for stillness
  const visible = useRef(true)
  const [playing, setPlaying] = useState(false)
  const sync = () => {
    const v = video.current
    if (!v) return
    if (visible.current && !document.hidden && !held.current) v.play().catch(() => {})
    else v.pause()
  }

  useEffect(() => {
    held.current = matchMedia('(prefers-reduced-motion: reduce)').matches ||
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true
    const io = new IntersectionObserver(([e]) => { visible.current = e.isIntersecting; sync() })
    io.observe(video.current!)
    document.addEventListener('visibilitychange', sync)
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', sync) }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps -- sync only reads refs

  const toggle = () => { held.current = playing; sync() }
  const label = playing ? 'Pause the film' : 'Play the film'

  return (
    <section className="relative h-svh min-h-[560px] overflow-hidden bg-(--color-background)">
      <picture>
        <source media="(max-width: 767px)" srcSet={assets.posterMobile.src} />
        <img src={assets.posterImage.src} alt="" fetchPriority="high" className="absolute inset-0 size-full object-cover" />
      </picture>
      <video ref={video} muted loop playsInline preload="metadata" aria-hidden
        onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)}
        className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${playing ? 'opacity-100' : 'opacity-0'}`}>
        <source media="(max-width: 767px)" src={assets.mobileVideoEncode.src} type="video/mp4" />
        <source src={assets.heroVideo.src} type="video/mp4" />
      </video>
      {/* a soft floor so the headline reads on any frame */}
      <div className="absolute inset-0 bg-gradient-to-t from-(--color-background)/80 via-transparent to-(--color-background)/40" />
      <div className="relative mx-auto flex h-full max-w-[1440px] items-end px-4 pb-12 md:px-10 md:pb-16">
        <div className="max-w-full md:w-7/12">{children}</div>
        <Tooltip>
          <TooltipTrigger asChild>
            <button type="button" onClick={toggle} aria-label={label}
              className="absolute right-4 bottom-12 flex size-11 items-center justify-center border border-(--color-text)/60 md:right-10 md:bottom-16">
              {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
            </button>
          </TooltipTrigger>
          <TooltipContent className="type-utility bg-(--color-text) text-(--color-background)">{label}</TooltipContent>
        </Tooltip>
      </div>
    </section>
  )
}
