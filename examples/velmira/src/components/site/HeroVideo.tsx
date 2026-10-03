'use client'
// Ambient video hero: the poster frame is a real <img> (shows instantly, LCP), the muted loop fades in over it once
// it plays. Pauses off-screen and in a hidden tab; a visible pause/play control. Reduced motion or Save-Data: the
// poster stays and the control offers play.
import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { assets } from '@/config/assets'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const film = assets.heroVideo
const portrait = '(max-width: 767px) and (orientation: portrait)'

export function HeroVideo() {
  const video = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [shown, setShown] = useState(false)
  const wanted = useRef(true) // false once the visitor pauses, or by default under reduced motion / Save-Data

  useEffect(() => {
    const v = video.current
    if (!v) return
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || saveData) wanted.current = false
    let visible = true
    const sync = () => {
      if (wanted.current && visible && !document.hidden) v.play().catch(() => {})
      else v.pause()
    }
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync() })
    io.observe(v)
    document.addEventListener('visibilitychange', sync)
    sync()
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', sync) }
  }, [])

  const toggle = () => {
    const v = video.current
    if (!v) return
    wanted.current = v.paused
    if (v.paused) v.play().catch(() => {})
    else v.pause()
  }

  return (
    <>
      <picture>
        <source media={portrait} srcSet={film.mobilePoster} />
        <img src={film.poster} alt="" width={film.width} height={film.height} fetchPriority="high" className="absolute inset-0 size-full object-cover" />
      </picture>
      <video ref={video} muted loop playsInline preload="metadata" aria-label={film.alt}
        onPlaying={() => { setPlaying(true); setShown(true) }} onPause={() => setPlaying(false)}
        className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ease-out ${shown ? 'opacity-100' : 'opacity-0'}`}>
        <source media={portrait} src={film.mobileSrc} type="video/mp4" />
        <source src={film.src} type="video/mp4" />
      </video>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="glass" size="icon" onClick={toggle} aria-label={playing ? 'Pause the film' : 'Play the film'}
            className="absolute bottom-6 right-5 z-10 rounded-full md:bottom-10 md:right-10">
            {playing ? <Pause /> : <Play />}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">{playing ? 'Pause the film' : 'Play the film'}</TooltipContent>
      </Tooltip>
    </>
  )
}
