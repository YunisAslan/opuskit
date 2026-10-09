'use client'
// Home — the first screen: Scroll-controlled video. A sticky 100svh stage inside a 300vh block (180svh on phones, with
// the 9:16 encode). One Motion scroll progress, smoothed by one spring, drives everything: the playhead, the running
// timecode with its plain words (Forward / Back / Paused), and each scene's message — placed at its scene's fraction
// from src/config/scenes.ts. The poster is a plain <img> painted before any script; the film is fetched whole after
// it (so every seek is instant) and fades in over it. Reduced motion: no pin and no scrub — the poster, the first
// message, the remaining scenes as a short list, and the film only if the visitor asks for it.
import { useMedia, useReduced } from '@/lib/motion'
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react'
import { getImageProps } from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { asset } from '@/config/assets'
import { film, scenes, type Scene } from '@/config/scenes'
import { nav } from '@/content/site'
import { cn } from '@/lib/utils'

const FRAMES = Math.round(film.duration * film.fps)

function timecode(frame: number) {
  const f = Math.max(0, Math.min(FRAMES - 1, frame))
  const s = Math.floor(f / film.fps)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `00:00:${pad(s)}:${pad(f % film.fps)}`
}

function Poster({ className }: { className?: string }) {
  const d = asset('posterImage'), m = asset('posterMobile')
  const common = { alt: d.alt, sizes: '100vw', priority: true }
  const { props: { srcSet: mobile } } = getImageProps({ ...common, src: m.src, width: m.width, height: m.height })
  const { props: desktop } = getImageProps({ ...common, src: d.src, width: d.width, height: d.height })
  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={mobile} />
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img {...desktop} className={cn('absolute inset-0 h-full w-full object-cover', className)} />
    </picture>
  )
}

const useIsPhone = () => useMedia('(max-width: 767px)')

export function ScrollFilm() {
  const reduce = useReduced()
  if (reduce) return <StillFilm />
  return <ScrubFilm />
}

function ScrubFilm() {
  const block = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const code = useRef<HTMLSpanElement>(null)
  const [ready, setReady] = useState(false)
  const [state, setState] = useState<'Forward' | 'Back' | 'Paused'>('Paused')
  const [scene, setScene] = useState(scenes[0].name)
  const phone = useIsPhone()

  const { scrollYProgress } = useScroll({ target: block, offset: ['start start', 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.0002 })

  // Load the film for this screen as one blob after the poster has painted — seeking a blob never waits on the network.
  useEffect(() => {
    const src = asset(phone ? 'mobileVideoEncode' : 'scrubReadyEncode').src
    const v = video.current
    if (!v) return
    let url: string | undefined
    let cancelled = false
    setReady(false)
    const start = () => fetch(src).then((r) => r.blob()).then((b) => {
      if (cancelled) return
      url = URL.createObjectURL(b)
      v.src = url
      v.load()
    }).catch(() => { if (!cancelled) { v.src = src; v.load() } })
    const idle = typeof window.requestIdleCallback === 'function' ? window.requestIdleCallback(start, { timeout: 1200 }) : setTimeout(start, 300)
    return () => {
      cancelled = true
      if (typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(idle as number)
      else clearTimeout(idle as number)
      if (url) URL.revokeObjectURL(url)
    }
  }, [phone])

  // Seek: one seek at a time; the latest wanted time waits for the previous seek to land.
  const wanted = useRef(0)
  const seeking = useRef(false)
  const seek = () => {
    const v = video.current
    if (!v || !v.duration || seeking.current) return
    const t = Math.min(v.duration - 0.04, Math.max(0, wanted.current * v.duration))
    if (Math.abs(v.currentTime - t) < 1 / 48) return
    seeking.current = true
    v.currentTime = t
  }
  const last = useRef(0)
  const still = useRef<number | undefined>(undefined)
  useMotionValueEvent(progress, 'change', (p) => {
    wanted.current = p
    seek()
    if (code.current) code.current.textContent = timecode(Math.round(p * (FRAMES - 1)))
    const dir = p > last.current + 0.0005 ? 'Forward' : p < last.current - 0.0005 ? 'Back' : null
    last.current = p
    if (dir) setState(dir)
    clearTimeout(still.current)
    still.current = window.setTimeout(() => setState('Paused'), 180)
    const now = [...scenes].reverse().find((s) => p >= s.from - 0.02) ?? scenes[0]
    setScene(now.name)
  })
  useEffect(() => () => clearTimeout(still.current), [])

  // the last frames ease into the page ground — no hard cut into the next section
  const release = useTransform(progress, [0.9, 1], [0, 1])

  return (
    <section ref={block} aria-label="Ninth Row" className="relative h-[180svh] md:h-[300vh]">
      <div className="sticky top-0 h-svh overflow-hidden bg-(--color-background)">
        <Poster />
        <video
          ref={video}
          muted
          playsInline
          preload="none"
          aria-hidden
          tabIndex={-1}
          disablePictureInPicture
          onLoadedData={() => { setReady(true); seeking.current = false; seek() }}
          onSeeked={() => { seeking.current = false; seek() }}
          className={cn('absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-(--ease-out)', ready ? 'opacity-100' : 'opacity-0')}
        />
        <motion.div aria-hidden style={{ opacity: release }} className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-linear-to-t from-(--color-background) via-(--color-background)/70 to-transparent" />

        {scenes.map((s, i) => <SceneCard key={s.id} scene={s} index={i} progress={progress} phone={phone} />)}

        {/* the running timecode: plain words, no icons */}
        <div className="type-utility pointer-events-none absolute inset-x-0 bottom-[max(20px,env(safe-area-inset-bottom,0px))] z-10 mx-auto flex max-w-[calc(var(--container)+2*var(--gutter))] items-center justify-end gap-4 px-(--gutter) text-(--color-text) md:bottom-8">
          <span className="hidden text-(--color-muted) sm:inline">{scene}</span>
          <span ref={code} className="tabular-nums" aria-hidden>{timecode(0)}</span>
          <span className="inline-block min-w-[7ch] text-right text-(--color-muted)" aria-hidden>{state === 'Paused' ? 'Scroll' : state}</span>
        </div>
      </div>
    </section>
  )
}

/** One scene's message: it arrives as its scene begins, holds, and leaves before the next one arrives. */
function SceneCard({ scene: s, index, progress, phone }: { scene: Scene; index: number; progress: MotionValue<number>; phone: boolean }) {
  const first = index === 0
  const lastScene = index === scenes.length - 1
  const fade = 0.035
  // in: [from, from+fade]; out: [to-fade, to]. The first is already on screen at 0; the last holds to the end.
  const inA = first ? -1 : s.from, inB = first ? -0.5 : s.from + fade
  const outA = lastScene ? 2 : s.to - fade, outB = lastScene ? 3 : s.to
  const t = useTransform(progress, [inA, inB, outA, outB], [0, 1, 1, 2]) // 0 waiting, 1 on screen, 2 gone
  const opacity = useTransform(t, [0, 1, 2], [0, 1, 0])
  const kind = phone ? 'rise' : s.reveal
  const y = useTransform(t, [0, 1, 2], kind === 'rise' ? [24, 0, -24] : phone ? [16, 0, -16] : [0, 0, 0])
  const lineY = useTransform(t, [0, 1, 2], ['110%', '0%', '-110%'])
  const clip = useTransform(t, [0, 1, 2], ['inset(0% 100% 0% 0%)', 'inset(0% 0% 0% 0%)', 'inset(0% 0% 0% 100%)'])
  const scale = useTransform(t, [0, 1, 2], [1.05, 1, 0.98])
  const visibility = useTransform(t, (v) => (v <= 0.001 || v >= 1.999 ? 'hidden' : 'visible'))

  const lines = (phone && s.titleMobile) || s.title
  const Title = first ? 'h1' : 'h2'
  const place = {
    'bottom-left': 'bottom-24 left-0 md:bottom-28',
    'top-left': 'top-28 left-0 md:top-36',
    'bottom-right': 'bottom-24 right-0 md:bottom-28 md:text-right',
    center: 'top-1/2 left-0 right-0 -translate-y-1/2 text-center',
  }[s.place]

  return (
    <motion.div style={{ opacity: kind === 'lines' ? 1 : opacity, visibility }} className="pointer-events-none absolute inset-0 z-10">
      <div className="relative mx-auto h-full max-w-[calc(var(--container)+2*var(--gutter))] px-(--gutter)">
       <div className="relative h-full">
        <motion.div
          style={kind === 'wipe' ? { clipPath: clip, y } : kind === 'track' ? { scale, y } : { y }}
          className={cn('absolute max-w-[min(100%,46rem)]', place, kind === 'track' && 'origin-bottom-left')}
        >
          {/* legibility: a soft scrim only behind the words */}
          <div aria-hidden className="absolute -inset-x-16 -inset-y-12 -z-10 bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-background)_62%,transparent),transparent)]" />
          <Title className="type-display text-[clamp(3.75rem,8.6vw,8.75rem)] text-(--color-text)">
            {lines.map((l, i) => (
              <span key={i} className="line-mask">
                {kind === 'lines' ? <motion.span className="block" style={{ y: lineY, opacity }} transition={{ delay: i * 0.08 }}>{l}</motion.span> : <span className="block">{l}</span>}
                {i < lines.length - 1 && ' '}
              </span>
            ))}
          </Title>
          {s.line && <motion.p style={kind === 'lines' ? { opacity } : undefined} className="type-body mt-6 max-w-[40ch] text-(--color-text) md:text-lg">{s.line}</motion.p>}
          {s.action && (
            <motion.div style={kind === 'lines' ? { opacity } : undefined} className="pointer-events-auto mt-8">
              <Link href={nav.action.href} className="btn btn-solid">{nav.action.label}</Link>
            </motion.div>
          )}
        </motion.div>
       </div>
      </div>
    </motion.div>
  )
}

/** Reduced motion: the film stands still on its poster; the story is still told, and the film plays only on request. */
function StillFilm() {
  const v = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const first = scenes[0]
  return (
    <section aria-label="Ninth Row" className="relative">
      <div className="relative h-svh min-h-[560px] overflow-hidden">
        <Poster />
        <video ref={v} muted playsInline preload="none" src={asset('heroVideo').src} onEnded={() => setPlaying(false)} className={cn('absolute inset-0 h-full w-full object-cover', playing ? 'opacity-100' : 'opacity-0')} aria-hidden />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-(--color-background) to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-(--container) px-(--gutter) pb-16">
          <h1 className="type-display text-[clamp(3.75rem,8.6vw,8.75rem)]">{first.title.map((l, i) => <span key={i} className="block">{l}</span>)}</h1>
          <p className="type-body mt-6 max-w-[40ch]">{first.line}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={nav.action.href} className="btn btn-solid">{nav.action.label}</Link>
            <button type="button" className="btn btn-line" onClick={() => { const el = v.current; if (!el) return; if (playing) { el.pause(); setPlaying(false) } else { el.play(); setPlaying(true) } }}>{playing ? 'Pause the film' : 'Play the film'}</button>
          </div>
        </div>
      </div>
      <ul className="mx-auto grid max-w-(--container) gap-8 px-(--gutter) pt-16 md:grid-cols-3">
        {scenes.slice(1).map((s) => <li key={s.id}><h2 className="type-heading">{s.title.join(' ')}</h2>{s.line && <p className="type-body mt-2 text-(--color-muted)">{s.line}</p>}</li>)}
      </ul>
    </section>
  )
}
