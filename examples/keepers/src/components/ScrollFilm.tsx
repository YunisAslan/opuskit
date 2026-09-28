'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { assets } from '@/config/assets'
import { scenes, HERO_END, FILM_DURATION, type Scene } from '@/config/scenes'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/motion'
import MediaAsset from './MediaAsset'

type Mode = 'film' | 'static'

// Whole-page scroll video. A fixed 100svh film sits behind the page; one
// ScrollTrigger timeline (document, top top → bottom bottom, scrub 0.5) drives
// both video.currentTime and every scene message, placed at its scene fraction.
export default function ScrollFilm() {
  const heroRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [mode, setMode] = useState<Mode>('film')
  const [ready, setReady] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setMode('static')
      return
    }
    const hero = heroRef.current!
    const video = videoRef.current!
    const mobile = window.matchMedia('(max-width: 767px)').matches
    video.src = mobile ? assets.mobileVideoEncode.src : assets.scrubReadyEncode.src
    video.poster = mobile ? assets.posterMobile.src : assets.posterImage.src
    video.load()
    const onReady = () => setReady(true)
    video.addEventListener('loadeddata', onReady, { once: true })

    // iOS only decodes frames for seeking after a user-initiated play.
    const unlock = () => video.play().then(() => video.pause()).catch(() => {})
    window.addEventListener('touchstart', unlock, { once: true, passive: true })

    // Size the hero so the Product Highlight starts entering the viewport exactly
    // on the film cut at HERO_END: scroll (h - vh) = HERO_END * (h + rest - vh).
    const sizeHero = () => {
      const vh = window.innerHeight
      const rest = document.documentElement.scrollHeight - hero.offsetHeight
      const h = (HERO_END * (rest - vh) + vh) / (1 - HERO_END)
      hero.style.height = `${Math.max(h, vh * 4)}px`
    }
    sizeHero()
    ScrollTrigger.addEventListener('refreshInit', sizeHero)

    const ctx = gsap.context(() => {
      const proxy = { t: 0 }
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.5, invalidateOnRefresh: true },
      })
      tl.to(proxy, {
        t: 1,
        duration: 1,
        onUpdate: () => {
          const d = Number.isFinite(video.duration) ? video.duration : FILM_DURATION
          if (video.readyState >= 1) video.currentTime = Math.min(proxy.t * d, d - 0.05)
        },
      }, 0)

      scenes.forEach((s, i) => {
        const el = hero.querySelector<HTMLElement>(`[data-scene="${s.id}"]`)
        if (!el) return
        const len = s.end - s.start
        const inAt = s.start + len * 0.1
        const inDur = len * 0.25
        const outAt = s.end - len * 0.25
        const outDur = len * 0.18
        const lines = el.querySelectorAll('.line > span')
        const title = el.querySelector('[data-title]')
        const fx = mobile ? 'rise' : s.fx

        if (i === 0) {
          tl.to(el, { autoAlpha: 0, y: -24, duration: len * 0.45, ease: 'power1.in' }, len * 0.4)
          return
        }
        gsap.set(el, { autoAlpha: 0 })
        tl.to(el, { autoAlpha: 1, duration: inDur * 0.4 }, inAt)
        tl.to(el, { autoAlpha: 0, duration: outDur }, outAt)
        switch (fx) {
          case 'lines':
            tl.fromTo(lines, { yPercent: 100 }, { yPercent: 0, duration: inDur, stagger: inDur * 0.2, ease: 'power3.out' }, inAt)
            tl.to(lines, { yPercent: -100, duration: outDur, ease: 'power2.in' }, outAt)
            break
          case 'wipe':
            tl.fromTo(el, { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: inDur, ease: 'power3.inOut' }, inAt)
            tl.to(el, { clipPath: 'inset(0% 0% 0% 100%)', duration: outDur, ease: 'power2.in' }, outAt)
            break
          case 'track':
            tl.fromTo(title, { letterSpacing: '0.12em' }, { letterSpacing: '0em', duration: inDur, ease: 'power3.out' }, inAt)
            tl.fromTo(el, { y: 12 }, { y: 0, duration: inDur, ease: 'power3.out' }, inAt)
            break
          case 'scale':
            tl.fromTo(el, { scale: 0.94 }, { scale: 1, duration: inDur, ease: 'power3.out' }, inAt)
            tl.to(el, { scale: 1.03, duration: outDur }, outAt)
            break
          default:
            tl.fromTo(el, { y: 24 }, { y: 0, duration: inDur, ease: 'power3.out' }, inAt)
            tl.to(el, { y: -24, duration: outDur, ease: 'power2.in' }, outAt)
        }
      })
    }, hero)

    ScrollTrigger.refresh()
    return () => {
      ctx.revert()
      ScrollTrigger.removeEventListener('refreshInit', sizeHero)
      window.removeEventListener('touchstart', unlock)
      video.removeEventListener('loadeddata', onReady)
      hero.style.height = ''
    }
  }, [])

  const playOnRequest = () => {
    const video = videoRef.current!
    if (!video.src) video.src = assets.heroVideo.src
    if (video.paused) {
      video.play()
      setPlaying(true)
    } else {
      video.pause()
      setPlaying(false)
    }
  }

  const film = mode === 'film'
  return (
    <>
      <div className="fixed inset-0 z-0 h-svh bg-text" aria-hidden="true">
        <MediaAsset id="posterImage" priority alt="" />
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          loop={!film}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${ready || playing ? 'opacity-100' : 'opacity-0'}`}
          onPlaying={() => setReady(true)}
        />
      </div>

      <section
        ref={heroRef}
        id="film-hero"
        data-mode={mode}
        aria-label="Keepers Citrus Coffee Soda, the film"
        className={`relative z-10 ${film ? 'h-[700svh]' : ''}`}
      >
        {film ? (
          <div className="sticky top-0 h-svh overflow-hidden">
            {scenes.map((s, i) => (i === 0 ? <Opening key={s.id} /> : s.title && <SceneMessage key={s.id} scene={s} />))}
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="relative h-svh">
              <Opening />
              <button type="button" onClick={playOnRequest} className="btn btn-secondary absolute right-4 top-24 sm:right-6">
                {playing ? 'Pause film' : 'Play film'}
              </button>
            </div>
            {scenes.map((s) => s.title && (
              <div key={s.id} className="relative flex min-h-[60svh] items-end">
                <SceneMessage scene={s} flow />
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  )
}

function Opening() {
  return (
    <div data-scene="open" className="absolute inset-x-0 bottom-0">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,color-mix(in_srgb,var(--color-text)_85%,transparent),color-mix(in_srgb,var(--color-text)_60%,transparent)_60%,transparent)]" />
      <div className="container-text relative grid grid-cols-12 gap-6 pb-12 pt-40 md:pb-16">
        <h1 data-lines className="is-in type-display col-span-12 text-background md:col-span-10">
          <span className="line"><span>Cold brew,</span></span>
          <span className="line"><span>orange, bubbles.</span></span>
          <span className="line"><span>One can.</span></span>
        </h1>
        <p className="type-body col-span-12 text-lg text-background md:col-span-5">
          Keepers is sparkling cold-brew coffee with orange and lemon peel. 330 ml, 45 mg caffeine, 35 kcal. Scroll to watch it poured.
        </p>
        <div className="col-span-12 flex flex-wrap items-center gap-6 md:col-span-6 md:col-start-7 md:justify-end md:self-end">
          <p className="type-utility text-lg text-background">12 cans, €32. Ships 3 November.</p>
          <Link href="/pricing" className="btn bg-background text-text hover:bg-surface">Pre-order</Link>
        </div>
      </div>
    </div>
  )
}

function SceneMessage({ scene: s, flow }: { scene: Scene; flow?: boolean }) {
  return (
    <div className={`${flow ? 'relative w-full' : 'absolute inset-x-0 bottom-0'} pb-8 md:pb-16`}>
      <div className="container-text grid grid-cols-12 gap-6">
        <article data-scene={s.id} className="col-span-12 bg-surface/85 p-6 md:col-span-6 md:p-8 lg:col-span-5">
          <h2 data-title className="type-heading">
            {s.title!.map((l) => (
              <span key={l} className="line"><span>{l}</span></span>
            ))}
          </h2>
          <p className="type-body mt-4">{s.body}</p>
          {(s.meta || s.link) && (
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
              {s.meta && <p className="type-utility text-lg">{s.meta}</p>}
              {s.link && <Link href={s.link.href} className="link-quiet type-utility inline-flex min-h-11 items-center text-lg">{s.link.label}</Link>}
            </div>
          )}
        </article>
      </div>
    </div>
  )
}
