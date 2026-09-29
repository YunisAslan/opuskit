'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { assets } from '@/config/assets'
import { scenes, FILM_DURATION, type Scene } from '@/config/scenes'
import { gsap, ScrollTrigger, useReducedMotionSafe } from '@/lib/motion'
import { Lines } from './Lines'

const messageScenes = scenes.filter((s) => s.title)
const INTRO_SCENE = scenes[scenes.length - 1]

// Whole-page scroll film: a fixed 100svh video behind Home, playhead = total page scroll.
// Video and scene messages run on ONE ScrollTrigger timeline (trigger: document, scrub 0.5).
export function ScrollFilm() {
  const reduce = useReducedMotionSafe()
  const videoRef = useRef<HTMLVideoElement>(null)
  const spacerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (reduce) return
    const video = videoRef.current!
    const spacer = spacerRef.current!
    const overlay = overlayRef.current!
    const mobile = window.matchMedia('(max-width: 767px)').matches

    // Size the film spacer so the crema scene begins exactly as the Intro section arrives.
    const layout = () => {
      const vh = window.innerHeight
      spacer.style.height = '0px'
      const spacerTop = spacer.offsetTop
      const rest = document.documentElement.scrollHeight - spacerTop // Intro + footer
      const f = INTRO_SCENE.start
      const introTop = (f * (rest - vh) + 0.6 * vh) / (1 - f)
      spacer.style.height = `${Math.max(0, introTop - spacerTop)}px`
    }
    layout()

    // Unlock seeking on iOS: a muted play/pause primes the decoder.
    video.play().then(() => video.pause()).catch(() => {})

    let last = -1
    const state = { t: 0 }
    const seek = () => {
      const d = Number.isFinite(video.duration) ? video.duration : FILM_DURATION
      const t = state.t * d
      if (Math.abs(t - last) < 1 / 60) return
      last = t
      video.currentTime = t
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.5 },
      })
      tl.to(state, { t: 1, duration: 1, onUpdate: seek }, 0)

      const IN = 0.025
      const OUT = 0.02
      for (const s of messageScenes) {
        const card = overlay.querySelector<HTMLElement>(`[data-scene="${s.id}"]`)!
        const title = card.querySelector<HTMLElement>('h2')!
        const lines = card.querySelectorAll<HTMLElement>('.line > span')
        const inAt = s.start + 0.004
        const outAt = s.end - OUT - 0.006
        const e = { ease: 'power3.out', duration: IN }
        gsap.set(card, { autoAlpha: 0 })

        if (mobile) {
          tl.fromTo(card, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, ...e }, inAt)
        } else {
          tl.to(card, { autoAlpha: 1, duration: 0.008 }, inAt)
          if (s.transition === 'lines') tl.fromTo(lines, { yPercent: 105 }, { yPercent: 0, stagger: 0.005, ...e }, inAt)
          if (s.transition === 'wipe') tl.fromTo(card, { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ...e }, inAt)
          if (s.transition === 'rise') tl.fromTo(card, { y: 24 }, { y: 0, ...e }, inAt)
          if (s.transition === 'tracking') tl.fromTo(title, { letterSpacing: '0.06em' }, { letterSpacing: '-0.03em', ...e }, inAt)
          if (s.transition === 'scale') tl.fromTo(card, { scale: 0.94 }, { scale: 1, ...e, transformOrigin: 'left bottom' }, inAt)
        }
        tl.to(card, { autoAlpha: 0, y: -16, duration: OUT, ease: 'power2.in' }, outAt)
      }
    })

    const onResize = () => {
      layout()
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', onResize)
    const fontsReady = document.fonts?.ready.then(onResize)
    void fontsReady
    return () => {
      window.removeEventListener('resize', onResize)
      ctx.revert()
      spacer.style.height = ''
    }
  }, [reduce])

  const togglePlay = () => {
    const v = videoRef.current!
    if (v.paused) {
      v.loop = true
      v.play()
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  return (
    <>
      {/* Fixed film layer */}
      <div className="fixed inset-0 -z-10 h-[100svh] overflow-hidden bg-surface" aria-hidden>
        <picture>
          <source media="(max-width: 767px) and (orientation: portrait)" srcSet={assets.posterMobile.src} />
          <img src={assets.posterImage.src} alt="" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
        </picture>
        <video ref={videoRef} className="absolute inset-0 h-full w-full object-cover" muted playsInline preload="auto" disablePictureInPicture>
          <source src={assets.mobileVideoEncode.src} type="video/mp4" media="(max-width: 767px) and (orientation: portrait)" />
          <source src={assets.scrubReadyEncode.src} type="video/mp4" />
        </video>
      </div>

      {/* Scene 1: hero */}
      <section className="relative flex h-[100svh] items-end" aria-label="Welcome to KOFİİ">
        {/* Soft celery scrim behind the text only — never a flat overlay across the film */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] md:hidden"
          style={{ background: 'linear-gradient(to top, color-mix(in oklab, var(--color-background) 94%, transparent) 0%, color-mix(in oklab, var(--color-background) 80%, transparent) 55%, transparent 100%)' }}
        />
        <div
          className="pointer-events-none absolute inset-0 hidden md:block"
          style={{ background: 'radial-gradient(85% 130% at 0% 100%, color-mix(in oklab, var(--color-background) 94%, transparent) 0%, color-mix(in oklab, var(--color-background) 80%, transparent) 55%, transparent 92%)' }}
        />
        <div className="container-text relative grid grid-cols-12 gap-6 pb-32 md:pb-24">
          <div className="col-span-12 md:col-span-7 lg:col-span-6">
            <Lines as="h1" lines={['Good', 'coffee,', 'made to', 'order']} mobile={['Good coffee,', 'made to', 'order']} className="type-display" />
            <p className="mt-6 max-w-[44ch] text-lg" data-reveal="rise">
              A small coffee shop in Old Town. Espresso, iced drinks, matcha and cake, each one made by hand while you wait.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4" data-reveal="rise">
              <Link href="/menu" className="btn">See the menu</Link>
              {reduce && (
                <button type="button" onClick={togglePlay} className="btn btn-secondary" aria-pressed={playing}>
                  {playing ? 'Pause the film' : 'Play the film'}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Scenes 2–6 */}
      {reduce ? (
        <div className="container-text grid gap-6 py-32">
          {messageScenes.map((s) => (
            <SceneCard key={s.id} scene={s} />
          ))}
        </div>
      ) : (
        <>
          <div ref={spacerRef} style={{ height: '500svh' }} aria-hidden />
          <div ref={overlayRef} className="pointer-events-none fixed inset-x-0 bottom-0 z-10">
            <div className="container-text grid grid-cols-12 pb-24 md:pb-16">
              {messageScenes.map((s) => (
                <div key={s.id} className="col-start-1 col-end-13 row-start-1 self-end md:col-end-8 lg:col-end-7">
                  <SceneCard scene={s} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}

function SceneCard({ scene }: { scene: Scene }) {
  return (
    <article data-scene={scene.id} className="max-w-[520px] rounded-card bg-surface/85 p-6 backdrop-blur-sm md:p-8">
      <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
        {scene.title!.map((l) => (
          <span className="line" key={l}>
            <span>{l}</span>
          </span>
        ))}
      </h2>
      <p className="mt-4 max-w-[40ch]">{scene.body}</p>
    </article>
  )
}
