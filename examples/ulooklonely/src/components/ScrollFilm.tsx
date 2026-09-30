'use client'
// Home hero — scroll-controlled film. A pinned 100svh stage; one ScrollTrigger timeline maps scroll to the
// video's playhead (0 → duration, scrub 0.5) and places each scene's message at its fraction of that timeline.
// Desktop pins for 300vh with varied reveals; phones pin for 180vh with opacity + short travel.
// Reduced motion: no pin, no scrub — the poster with the opening message and a play button.
import { Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { ScribbleLink } from '@/components/pieces/ScribbleLink'
import { assets } from '@/config/assets'
import { FILM_DURATION, scenes } from '@/config/scenes'
import { gsap, MOTION_OK } from '@/lib/motion'

const IN = 0.022 // arrival length, as a fraction of the film
const OUT = 0.02 // exit length
const GAP = 0.004 // silence between one message leaving and the next arriving

export function ScrollFilm() {
  const root = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const v = video.current!
    // Poster first (LCP), then fetch the whole film so seeking is instant.
    const warm = () => { v.preload = 'auto'; v.load() }
    if (document.readyState === 'complete') warm(); else addEventListener('load', warm, { once: true })
    // iOS only paints seeked frames after one play() — do it silently on first touch.
    const unlock = () => v.play().then(() => { if (!v.dataset.user) v.pause() }).catch(() => {})
    addEventListener('touchstart', unlock, { once: true, passive: true })
    return () => { removeEventListener('load', warm); removeEventListener('touchstart', unlock) }
  }, [])

  useEffect(() => {
    const el = root.current!
    const v = video.current!
    const mm = gsap.matchMedia()
    mm.add({ desktop: `(min-width: 768px) and ${MOTION_OK}`, phone: `(max-width: 767px) and ${MOTION_OK}` }, (c) => {
      const desktop = !!c.conditions?.desktop
      const msgs = gsap.utils.toArray<HTMLElement>('[data-scene]', el)
      const lines = (m: HTMLElement) => m.querySelectorAll<HTMLElement>('[data-line]')
      const fade = el.querySelector('[data-fade]')
      const scrim = el.querySelector('[data-scrim]')
      const last = msgs.length - 1
      gsap.set(msgs.slice(1), { autoAlpha: 0 })

      const film = { t: 0 }
      // The video stays invisible until the film moves: frame one is the poster, and it keeps the poster as LCP.
      const seek = () => { if (v.readyState >= 1) v.currentTime = film.t * (v.duration || FILM_DURATION); if (film.t > 0.002) v.style.opacity = '1' }
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' }, scrollTrigger: { trigger: el, start: 'top top', end: desktop ? '+=300%' : '+=180%', pin: true, scrub: 0.5 } })
      tl.to(film, { t: 1, duration: 1, ease: 'none', onUpdate: seek }, 0)

      scenes.forEach((s, i) => {
        const m = msgs[i]
        const at = s.start + GAP
        const leave = s.end - OUT - GAP
        if (!desktop) {
          if (i > 0) tl.fromTo(m, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: IN }, at)
          if (i < last) tl.to(m, { autoAlpha: 0, y: -16, duration: OUT, ease: 'power2.in' }, leave)
          return
        }
        // Desktop: a different entrance per scene — masked lines, a clip wipe, a scale settle, a short rise.
        if (i > 0) tl.set(m, { autoAlpha: 1 }, at)
        switch (s.id) {
          case 'snow':
            tl.to(lines(m), { yPercent: -105, duration: OUT, stagger: 0.004, ease: "power2.in" }, leave).set(m, { autoAlpha: 0 }, leave + OUT + 0.006)
            break
          case 'street':
            tl.fromTo(lines(m), { yPercent: 105 }, { yPercent: 0, duration: IN, stagger: 0.005 }, at)
              .to(m, { autoAlpha: 0, y: -16, duration: OUT, ease: 'power2.in' }, leave)
            break
          case 'heat':
            tl.fromTo(m, { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: IN, ease: 'power2.inOut' }, at)
              .to(m, { clipPath: 'inset(0% 0% 0% 100%)', duration: OUT, ease: 'power2.inOut' }, leave)
            break
          case 'light':
            tl.fromTo(m, { scale: 1.06, opacity: 0 }, { scale: 1, opacity: 1, duration: IN }, at)
              .to(m, { autoAlpha: 0, y: -16, duration: OUT, ease: 'power2.in' }, leave)
            break
          default:
            tl.fromTo(lines(m), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: IN, stagger: 0.005 }, at)
        }
      })
      // Release: the last frames ease into the page ground and the type turns to ink, so the page carries on.
      tl.to(fade, { opacity: 1, duration: 0.08, ease: 'none' }, 0.92).to(scrim, { opacity: 0, duration: 0.08, ease: 'none' }, 0.92)
        .to(msgs[last], { color: 'var(--color-text)', duration: 0.08, ease: 'none' }, 0.92)
    })
    return () => mm.revert()
  }, [])

  const toggle = () => {
    const v = video.current!
    if (v.paused) { v.dataset.user = '1'; v.loop = true; v.style.opacity = '1'; v.play(); setPlaying(true) } else { v.pause(); setPlaying(false) }
  }

  // The wrapper belongs to React; GSAP moves the section into a pin-spacer inside it. React then only ever
  // removes the wrapper, never the moved node (otherwise unmount throws "removeChild … not a child").
  return (
    <div>
    <section ref={root} aria-label="ulooklonely, a film" className="relative h-svh overflow-hidden bg-(--color-text) text-(--color-surface)">
      <picture>
        <source media="(max-aspect-ratio: 1/1)" srcSet={assets.posterMobile.src} />
        <img src={assets.posterImage.src} alt={assets.posterImage.alt} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
      </picture>
      <video ref={video} muted playsInline preload="metadata" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-0">
        <source media="(max-aspect-ratio: 1/1)" src={assets.mobileVideoEncode.src} type="video/mp4" />
        <source src={assets.scrubReadyEncode.src} type="video/mp4" />
      </video>

      <div data-scrim aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_80%_at_0%_100%,color-mix(in_srgb,var(--color-text)_82%,transparent)_0%,color-mix(in_srgb,var(--color-text)_40%,transparent)_38%,transparent_70%)]" />
      <div data-fade aria-hidden className="pointer-events-none absolute inset-0 bg-(--color-background) opacity-0" />

      <div className="absolute inset-x-0 bottom-28 px-6 md:bottom-32 md:px-10">
        <div className="relative mx-auto grid max-w-[1200px] grid-cols-12 gap-6">
          <div className="relative col-span-12 min-h-[11rem] sm:col-span-10 md:col-span-7 lg:col-span-6">
            {scenes.map((s, i) => {
              const Tag = i === 0 ? 'h1' : 'p'
              const first = i === 0
              const lastScene = i === scenes.length - 1
              return (
                <div key={s.id} data-scene className="absolute bottom-0 left-0 w-full will-change-transform" style={first ? undefined : { visibility: 'hidden' }}>
                  <Tag className={`type-display ${first ? "[font-size:clamp(2.75rem,7vw,6rem)]" : "[font-size:clamp(2.25rem,4.6vw,4.5rem)]"}`} aria-label={s.lines.join(' ')}>
                    {s.lines.map((l) => <span key={l} aria-hidden className="block overflow-hidden pb-[0.06em]"><span data-line className="block">{l}</span></span>)}
                  </Tag>
                  {first && <p className="type-body mt-6 max-w-[40ch]">Its presentation of loneliness. Short films and edits about being alone somewhere crowded.</p>}
                  {(lastScene || first) && (
                    <p className={`type-heading mt-6 ${first ? 'hidden motion-reduce:block' : ''}`}><ScribbleLink href="/work">See the work</ScribbleLink></p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <button type="button" onClick={toggle} className="type-utility absolute top-4 right-4 z-10 hidden motion-reduce:inline-flex min-h-11 items-center gap-2 border-2 border-(--color-text) bg-(--color-surface) px-4 text-(--color-text) shadow-(--shadow-card) hover:bg-(--color-secondary) md:top-6 md:right-6">
        {playing ? <Pause className="size-4" aria-hidden /> : <Play className="size-4" aria-hidden />} {playing ? 'Pause film' : 'Play film'}
      </button>
    </section>
    </div>
  )
}
