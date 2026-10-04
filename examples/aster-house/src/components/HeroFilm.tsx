'use client'
// Hero — scroll-controlled video. A tall block with a sticky 100svh stage; scroll moves the film's playhead (forwards and
// back) and the same smoothed progress places the name and each scene's caption (src/config/scenes.ts).
// Phones: the 9:16 encode over a shorter block. Reduced motion: the poster and the name; the film plays only on request.
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { assets } from '@/config/assets'
import { scenes, type Scene } from '@/config/scenes'
import { Motif } from '@/components/Motif'
import { site } from '@/data/site'

function Caption({ scene, p }: { scene: Scene; p: MotionValue<number> }) {
  const { from: a, to: b } = scene
  const range = [a, a + 0.04, b - 0.04, b]
  const opacity = useTransform(p, range, [0, 1, 1, 0])
  const y = useTransform(p, range, ['105%', '0%', '0%', '-105%'])
  const clip = useTransform(p, range, ['inset(0% 100% 0% 0%)', 'inset(0% 0% 0% 0%)', 'inset(0% 0% 0% 0%)', 'inset(0% 0% 0% 100%)'])
  const scale = useTransform(p, range, [0.94, 1, 1, 1.03])
  const ty = useTransform(p, range, [20, 0, 0, -12])
  const style = scene.reveal === 'wipe' ? { clipPath: clip } : scene.reveal === 'track' ? { opacity, scale, y: ty, transformOrigin: 'left bottom' } : { opacity }
  return (
    <motion.div style={style} className="col-start-1 row-start-1 self-end" aria-hidden>
      <p className="type-utility mb-3 [font-size:0.875rem] opacity-90">{scene.label}</p>
      <p className="type-display overflow-hidden pb-[0.08em] [font-size:clamp(2.1rem,4.6vw,4.25rem)]">
        {scene.reveal === 'mask' ? <motion.span className="block" style={{ y }}>{scene.line}</motion.span> : scene.line}
      </p>
    </motion.div>
  )
}

function Title({ p }: { p?: MotionValue<number> }) {
  const fallback = useSpring(0)
  const opacity = useTransform(p ?? fallback, [0, 0.12, 0.17], [1, 1, 0])
  const y = useTransform(p ?? fallback, [0, 0.17], [0, -32])
  return (
    <motion.div style={{ opacity, y }} className="col-start-1 row-start-1 self-end">
      <h1 className="type-display leading-[0.9] [font-size:clamp(3.5rem,9.5vw,8.75rem)]">{site.name}</h1>
      <p className="type-heading mt-5 max-w-[28ch] text-balance [font-size:clamp(1.15rem,1.9vw,1.6rem)] [font-weight:400]">{site.line}</p>
    </motion.div>
  )
}

const Poster = () => (
  <picture>
    <source media="(max-width: 767px)" srcSet={assets.posterMobile.src} />
    <img src={assets.posterImage.src} alt={assets.posterImage.alt} fetchPriority="high" className="absolute inset-0 size-full object-cover" />
  </picture>
)

const Scrim = () => <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_75%_at_0%_100%,color-mix(in_oklab,var(--color-text)_62%,transparent),transparent_70%)]" />

function Overlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-x-0 bottom-0 px-5 pb-10 text-(--color-surface) md:px-10 md:pb-14">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid max-w-[min(100%,52rem)]">{children}</div>
        <Motif hold len={240} rot={-5} rotEnd={4} className="mt-8 md:mt-10" />
      </div>
    </div>
  )
}

function StillHero() {
  const [playing, setPlaying] = useState(false)
  return (
    <section className="relative -mt-16 h-svh overflow-hidden bg-(--color-text)" data-stage>
      {playing ? <video src={assets.heroVideo.src} poster={assets.posterImage.src} controls autoPlay muted playsInline className="absolute inset-0 size-full object-cover" aria-label={assets.heroVideo.alt} /> : <Poster />}
      {!playing && <Scrim />}
      {!playing && (
        <Overlay>
          <div className="col-start-1 row-start-1">
            <Title />
            <button onClick={() => setPlaying(true)} className="type-utility mt-6 inline-flex h-11 items-center rounded-(--radius-button) border border-current px-5 hover:bg-(--color-surface) hover:text-(--color-text)">Play the walk-through</button>
          </div>
        </Overlay>
      )}
    </section>
  )
}

// Read after hydration (the server can't know), so the first render always matches the static HTML.
const rm = '(prefers-reduced-motion: reduce)'
const subscribe = (cb: () => void) => { const m = matchMedia(rm); m.addEventListener('change', cb); return () => m.removeEventListener('change', cb) }

export function HeroFilm() {
  const reduce = useSyncExternalStore(subscribe, () => matchMedia(rm).matches, () => false)
  return reduce ? <StillHero /> : <ScrollHero />
}

function ScrollHero() {
  const block = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const pending = useRef<number | null>(null)
  const [ready, setReady] = useState(false)
  const { scrollYProgress } = useScroll({ target: block, offset: ['start start', 'end end'] })
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.0005 })
  const veil = useTransform(p, [0.94, 1], [0, 1])

  useEffect(() => {
    const v = video.current!
    v.src = matchMedia('(max-width: 767px)').matches ? assets.mobileVideoEncode.src : assets.scrubReadyEncode.src
    const prime = () => { v.play().then(() => v.pause()).catch(() => {}); seek(p.get()) } // iOS paints sought frames only after one play
    v.addEventListener('loadedmetadata', prime, { once: true })
    v.load()
    return () => v.removeEventListener('loadedmetadata', prime)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function seek(t: number) {
    const v = video.current
    if (!v || !v.duration) return
    const time = Math.min(v.duration - 0.04, Math.max(0, t * v.duration))
    if (v.seeking) pending.current = time
    else v.currentTime = time
  }
  useMotionValueEvent(p, 'change', seek)
  const onSeeked = () => {
    if (pending.current == null) return
    const v = video.current!
    v.currentTime = pending.current
    pending.current = null
  }

  return (
    <section ref={block} data-pin className="relative -mt-16 h-[180svh] md:h-[320vh]" aria-label="A walk through the show house">
      <div data-stage className="sticky top-0 h-svh overflow-hidden bg-(--color-text)">
        <Poster />
        <video ref={video} muted playsInline preload="auto" aria-hidden onSeeked={onSeeked} onLoadedData={() => setReady(true)}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${ready ? 'opacity-100' : 'opacity-0'}`} />
        <Scrim />
        <Overlay>
          <Title p={p} />
          {scenes.filter((s) => s.label).map((s) => <Caption key={s.id} scene={s} p={p} />)}
        </Overlay>
        <motion.div aria-hidden style={{ opacity: veil }} className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent from-30% to-(--color-background)" />
      </div>
    </section>
  )
}
