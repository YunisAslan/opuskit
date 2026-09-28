'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { assets } from '@/config/assets'
import { scenes, type Scene } from '@/config/scenes'
import { loadScroll, prefersReducedMotion } from '@/lib/motion'
import MediaAsset from './MediaAsset'

const FALLBACK_DURATION = 15.43
const fmt = (s: number) => `00:${String(Math.floor(s)).padStart(2, '0')}`

function SceneText({ scene, index }: { scene: Scene; index: number }) {
  const Heading = index === 0 ? 'h1' : 'h2'
  return (
    <div data-scene={scene.id} className="scene absolute inset-x-0 bottom-0">
      <Heading className="type-display hero-title">
        {scene.lines.map(([text, width], i) => (
          <span key={i} className={`line ${width}`}>
            <span>{text}</span>
          </span>
        ))}
      </Heading>
      {(scene.body || scene.price) && (
        <p className="type-body mt-6 max-w-[34ch] text-text">
          {scene.body}
          {scene.price && <span className="mt-1 block text-muted">{scene.price}</span>}
        </p>
      )}
      {scene.link && (
        <Link href={scene.link.href} className="text-link mt-4 inline-flex min-h-11 items-center">
          {scene.link.label}
        </Link>
      )}
    </div>
  )
}

export default function Hero() {
  const root = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const fade = useRef<HTMLDivElement>(null)
  const code = useRef<HTMLSpanElement>(null)
  const count = useRef<HTMLSpanElement>(null)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) return setReduced(true)
    let dead = false
    let revert = () => {}
    loadScroll().then(({ gsap }) => {
      if (dead) return
      const v = video.current!
      const texts = gsap.utils.toArray<HTMLElement>('[data-scene]', root.current)
      const mm = gsap.matchMedia()
      revert = () => mm.revert()

      mm.add({ small: '(max-width: 639px)', large: '(min-width: 640px)' }, (ctx) => {
        const small = !!ctx.conditions?.small
        v.src = small ? assets.mobileVideoEncode.src : assets.scrubReadyEncode.src
        v.load()

        // One timeline drives both the playhead and every scene message.
        const playhead = { t: 0 }
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: stage.current, pin: true, start: 'top top', end: small ? '+=180%' : '+=300%', scrub: 0.5 },
        })
        tl.to(playhead, { t: 1, duration: 1 }, 0)

        const IN = 0.03, OUT = 0.025
        scenes.forEach((s, i) => {
          const el = texts[i]
          const lines = el.querySelectorAll('.line > span')
          if (i > 0) {
            gsap.set(el, { autoAlpha: 0 })
            tl.set(el, { autoAlpha: 1 }, s.start)
            const at = s.start + 0.005
            if (small) tl.fromTo(el, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: IN }, at)
            else if (s.reveal === 'lines') tl.fromTo(lines, { yPercent: 100 }, { yPercent: 0, duration: IN, stagger: 0.006, ease: 'power3.out' }, at)
            else if (s.reveal === 'wipe') tl.fromTo(el, { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: IN, ease: 'power2.inOut' }, at)
            else if (s.reveal === 'rise') tl.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: IN, ease: 'power2.out' }, at)
            else if (s.reveal === 'track') tl.fromTo(el, { opacity: 0, letterSpacing: '0.06em' }, { opacity: 1, letterSpacing: '0em', duration: IN, ease: 'power2.out' }, at)
            else tl.fromTo(el, { opacity: 0, scale: 1.05, transformOrigin: '0% 100%' }, { opacity: 1, scale: 1, duration: IN, ease: 'power2.out' }, at)
          }
          // Leave before the next scene's message arrives; the last one holds to the end.
          if (i < scenes.length - 1) tl.to(el, { autoAlpha: 0, y: -16, duration: OUT, ease: 'power1.in' }, s.end - OUT - 0.005)
        })
        // Ease the last frame into the page background.
        tl.fromTo(fade.current, { opacity: 0 }, { opacity: 1, duration: 0.04 }, 0.96)

        // Seek on the ticker so the decoder is never flooded; skip while a seek is in flight.
        let current = -1
        const tick = () => {
          const dur = v.duration || FALLBACK_DURATION
          const t = playhead.t * dur
          if (v.readyState >= 1 && !v.seeking && Math.abs(v.currentTime - t) > 0.015) v.currentTime = t
          const idx = scenes.findIndex((s) => playhead.t < s.end || s === scenes[scenes.length - 1])
          if (idx !== current) {
            current = idx
            if (count.current) count.current.textContent = `Scene ${idx + 1} of ${scenes.length}`
          }
          if (code.current) code.current.textContent = fmt(t)
        }
        gsap.ticker.add(tick)

        // iOS only paints seeks after the element has played once.
        const prime = () => v.play().then(() => v.pause()).catch(() => {})
        window.addEventListener('touchstart', prime, { once: true, passive: true })

        return () => {
          gsap.ticker.remove(tick)
          window.removeEventListener('touchstart', prime)
        }
      })
    })
    return () => {
      dead = true
      revert()
    }
  }, [])

  if (reduced) return <ReducedHero />

  return (
    <section ref={root} data-hero aria-label="Film" className="relative">
      <div ref={stage} className="relative h-svh overflow-hidden">
        <div className="absolute inset-0 lg:left-auto lg:right-[8%] lg:aspect-[9/16] lg:h-full">
          <MediaAsset id="posterImage" sizes="(min-width: 1024px) 40vw, 100vw" />
          <video ref={video} muted playsInline preload="metadata" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
          {/* scrim only behind the text, small screens where text sits on the film */}
          <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-background/85 via-background/40 to-transparent lg:hidden" />
        </div>
        <div className="relative mx-auto flex h-full max-w-[1200px] items-end px-6 pb-24 lg:pb-16">
          <div className="relative h-full w-full sm:w-10/12 lg:w-7/12">
            {scenes.map((s, i) => <SceneText key={s.id} scene={s} index={i} />)}
          </div>
        </div>
        <p className="type-utility absolute bottom-6 right-6 flex gap-4 text-muted lg:bottom-8 lg:right-[8%] lg:translate-x-full lg:flex-col lg:gap-1 lg:pl-4">
          <span ref={code} className="text-accent tabular-nums">00:00</span>
          <span ref={count}>Scene 1 of {scenes.length}</span>
        </p>
        <div ref={fade} className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0" />
      </div>
    </section>
  )
}

// Reduced motion: poster, headline and chapters as a plain list. Film plays only on request.
function ReducedHero() {
  const [playing, setPlaying] = useState(false)
  const [first, ...rest] = scenes
  return (
    <section data-hero aria-label="Film">
      <div className="relative h-svh overflow-hidden">
        <div className="absolute inset-0 lg:left-auto lg:right-[8%] lg:aspect-[9/16] lg:h-full">
          {playing ? (
            <video src={assets.heroVideo.src} poster={assets.posterImage.src} controls autoPlay muted playsInline className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <MediaAsset id="posterImage" sizes="(min-width: 1024px) 40vw, 100vw" />
          )}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-background/85 to-transparent lg:hidden" />
        </div>
        <div className="relative mx-auto flex h-full max-w-[1200px] items-end px-6 pb-24 lg:pb-16">
          <div className="relative w-full sm:w-10/12 lg:w-7/12">
            <h1 className="type-display hero-title">
              {first.lines.map(([text, width], i) => <span key={i} className={`block ${width}`}>{text}</span>)}
            </h1>
            <p className="type-body mt-6 max-w-[34ch]">{first.body}</p>
            <div className="mt-4 flex gap-8">
              {first.link && <Link href={first.link.href} className="text-link inline-flex min-h-11 items-center">{first.link.label}</Link>}
              {!playing && (
                <button type="button" onClick={() => setPlaying(true)} className="text-link inline-flex min-h-11 items-center text-accent">
                  Play the film
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <ol className="mx-auto flex max-w-[1200px] flex-col gap-24 px-6 py-32">
        {rest.map((s) => (
          <li key={s.id} className="max-w-[40rem]">
            <p className="type-utility mb-2 text-muted">{s.shot}</p>
            <h2 className="type-heading">{s.lines.map(([t]) => t).join(' ')}</h2>
            {s.body && <p className="type-body mt-4">{s.body} {s.price}</p>}
            {s.link && <Link href={s.link.href} className="text-link mt-2 inline-flex min-h-11 items-center">{s.link.label}</Link>}
          </li>
        ))}
      </ol>
    </section>
  )
}
