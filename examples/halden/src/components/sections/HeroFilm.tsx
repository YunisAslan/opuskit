'use client'
// Home · First screen — Scroll-controlled film. A tall block holds a sticky stage under the bar; one Motion scroll
// progress (useScroll → useSpring) drives both the film's playhead and every scene's message, so picture and words
// stay one system (src/config/scenes.ts). Scroll down plays forward, up plays back, fast is fast; nothing autoplays.
//
// Until the owner's film exists the poster still stands in, and the recipe's fallback runs instead: the still pushes
// in slowly with the scroll. When `bash scripts/prepare-video.sh` writes scrubReadyEncode.mp4 / mobileVideoEncode.mp4
// into public/media, the film is found and fades in over the still — no code change.
//
// Phones: a shorter block, the 9:16 encode and poster, simpler arrivals (opacity and a short rise).
// Reduced motion: no pin and no scrub — the poster, the title card, the three scenes as a quiet row beneath, and the
// film only if the visitor asks for it.
import Link from 'next/link'
import { getImageProps } from 'next/image'
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { getImage, getVideo } from '@/config/assets'
import { RELEASE, scenes, SCENE_FADE, type Scene } from '@/config/scenes'
import { hero } from '@/content/site'
import { useDesktop, useStill } from '@/lib/motion'

/** Smoothstep: slow in, slow out — the dark arrives the way the light went. */
const soft = (t: number) => t * t * (3 - 2 * t)

// Legibility over the fog: a soft gradient only behind the words — never a flat dark layer over the whole film. Phones
// get it from the bottom edge (the words span the width there); larger screens from the bottom-left corner.
const scrim = 'pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,color-mix(in_oklab,var(--color-background)_85%,transparent)_0%,color-mix(in_oklab,var(--color-background)_60%,transparent)_38%,transparent_70%)] md:bg-[radial-gradient(120%_90%_at_0%_100%,color-mix(in_oklab,var(--color-background)_90%,transparent)_0%,color-mix(in_oklab,var(--color-background)_62%,transparent)_40%,transparent_70%)]'

function Poster({ className = '', style }: { className?: string; style?: React.ComponentProps<typeof motion.div>['style'] }) {
  const d = getImage(getVideo('scrubReadyEncode').poster)
  const m = getImage(getVideo('mobileVideoEncode').poster)
  const common = { alt: '', loading: 'eager' as const, fetchPriority: 'high' as const, sizes: '100vw' }
  const { props: { srcSet: desktop } } = getImageProps({ ...common, src: d.src, width: d.width, height: d.height })
  const { props: mobile } = getImageProps({ ...common, src: m.src, width: m.width, height: m.height })
  return (
    <motion.div className={`absolute inset-0 ${className}`} style={style}>
      <picture>
        <source media="(min-width: 768px)" srcSet={desktop} />
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img {...mobile} className="h-full w-full object-cover" />
      </picture>
    </motion.div>
  )
}

/** Which encodes exist on disk (src/config/media-files.ts, checked on the server). */
export type Films = { desktop?: string; mobile?: string }
/** The encode for this screen: the 16:9 scroll encode on tablets and up, the 9:16 one on phones — or whichever exists. */
const filmFor = (films: Films, desktop: boolean) => (desktop ? films.desktop ?? films.mobile : films.mobile ?? films.desktop)

export function HeroFilm({ films }: { films: Films }) {
  const still = useStill()
  if (still) return <HeroStill films={films} />
  return <HeroScroll films={films} />
}

function HeroScroll({ films }: { films: Films }) {
  const block = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const desktop = useDesktop()
  const src = filmFor(films, desktop)
  // The film shows once the file for this screen has data; a missing file simply leaves the still.
  const [readySrc, setReadySrc] = useState<string | null>(null)
  const ready = readySrc === src
  const duration = useRef(0)
  const pending = useRef<number | null>(null)

  const { scrollYProgress } = useScroll({ target: block, offset: ['start 64px', 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.0005 })

  // Playhead follows the scroll. One seek at a time; the newest target waits for the current seek to land.
  const seek = (t: number) => {
    const v = video.current
    if (!v || !duration.current) return
    if (v.seeking) { pending.current = t; return }
    v.currentTime = Math.min(duration.current - 0.04, Math.max(0, t * duration.current))
  }
  useMotionValueEvent(progress, 'change', seek)

  const onMeta = (v: HTMLVideoElement) => {
    duration.current = v.duration
    // iOS only seeks a film that has played once: start and stop it straight away (muted, inline).
    v.play().then(() => { v.pause(); seek(progress.get()) }).catch(() => seek(progress.get()))
  }
  // The film is in the server HTML, so it can finish loading before React attaches its handlers: catch up on mount.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const v = video.current
      if (!v || !src) return
      if (v.readyState >= 1 && !duration.current) onMeta(v)
      if (v.readyState >= 2) setReadySrc(src)
    })
    return () => cancelAnimationFrame(frame)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src])

  // The still pushes in while there is no film (the recipe's fallback); under the film it is hidden anyway.
  const push = useTransform(progress, [0, 1], [1, 1.12])
  // The end of the film eases into the page ground (src/config/scenes.ts → RELEASE): the white fog never cuts to
  // charcoal — the dark rises from the bottom edge, then the whole frame settles into it, so the next section
  // follows on the same ground.
  const rise = useTransform(progress, [...RELEASE.rise], [0, 1], { ease: soft })
  const settle = useTransform(progress, [...RELEASE.settle], [0, 1], { ease: soft })

  return (
    <section ref={block} data-hero aria-label="Halden, the opening film" className="relative h-[220svh] md:h-[300svh]">
      <div className="sticky top-(--nav-h) h-[calc(100svh-var(--nav-h))] overflow-hidden bg-(--color-background)">
        <Poster style={{ scale: push }} />
        {src && <video
          key={src}
          ref={video}
          src={src}
          muted
          playsInline
          preload="auto"
          aria-hidden
          tabIndex={-1}
          onLoadedMetadata={(e) => onMeta(e.currentTarget)}
          onLoadedData={() => setReadySrc(src)}
          onSeeked={() => { if (pending.current !== null) { const t = pending.current; pending.current = null; seek(t) } }}
          onError={() => { duration.current = 0; setReadySrc(null) }}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}
        />}
        <div className={scrim} />
        {/* Under the words: the last message holds while the fog goes dark around it. */}
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 bg-linear-to-t from-(--color-background) from-15% via-(--color-background)/70 via-55% to-transparent" style={{ opacity: rise }} />
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 bg-(--color-background)" style={{ opacity: settle }} />
        <div className="absolute inset-x-0 bottom-0 px-(--gutter) pb-12 md:pb-24">
          <div className="relative mx-auto grid max-w-(--container) md:grid-cols-12 md:gap-6">
            {scenes.map((s, i) => <SceneText key={s.id} scene={s} index={i} progress={progress} desktop={desktop} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

/** One scene's message: arrives as its scene begins, holds, and leaves before the next one arrives. */
function SceneText({ scene, index, progress, desktop }: { scene: Scene; index: number; progress: MotionValue<number>; desktop: boolean }) {
  const first = index === 0
  const last = index === scenes.length - 1
  const a0 = scene.start, a1 = scene.start + SCENE_FADE
  const l0 = scene.end - SCENE_FADE, l1 = scene.end
  // The first scene is already there when the page opens; the last one stays until the film releases.
  const opacity = useTransform(progress, first ? [l0, l1] : last ? [a0, a1] : [a0, a1, l0, l1], first ? [1, 0] : last ? [0, 1] : [0, 1, 1, 0])
  const leaveY = useTransform(progress, [l0, l1], [0, -24])
  const riseY = useTransform(progress, [a0, a1], [16, 0])
  const wipe = useTransform(progress, [a0, a1 + 0.02], ['inset(-10% 100% -10% 0%)', 'inset(-10% 0% -10% 0%)'])
  const scale = useTransform(progress, [a0, a1 + 0.02], [1.06, 1])
  const line1 = useTransform(progress, [a0, a1], ['105%', '0%'])
  const line2 = useTransform(progress, [a0 + 0.012, a1 + 0.012], ['105%', '0%'])
  const visibility = useTransform(progress, (p) => (p < (first ? -1 : a0) || p > (last ? 2 : l1) ? 'hidden' : 'visible'))

  const Title = first ? motion.h1 : motion.p
  const mode = desktop ? scene.motion : first ? 'title' : 'rise'
  const lines = !desktop && scene.mobileLines ? scene.mobileLines : scene.lines

  // Always set both, never leave them out: the first render is the desktop one, and a motion value dropped from
  // `style` keeps its last value on the element (a phone would otherwise inherit a fully clipped wipe).
  const titleStyle = {
    clipPath: mode === 'wipe' ? wipe : 'none',
    scale: mode === 'scale' ? scale : 1,
    transformOrigin: '0% 100%',
  }

  return (
    <motion.div
      className="col-start-1 row-start-1 self-end md:col-[1/span_6]"
      style={{ opacity, visibility, y: first ? leaveY : mode === 'rise' ? riseY : last ? 0 : leaveY }}
    >
      <Title aria-label={scene.title} className="type-display" style={titleStyle}>
        {lines.map((l, i) => (
          <span key={l} aria-hidden className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
            {mode === 'lines'
              ? <motion.span className="block" style={{ y: i === 0 ? line1 : line2 }}>{l}</motion.span>
              : <span className="block">{l}</span>}
          </span>
        ))}
      </Title>
      <p className="type-body mt-6 max-w-[34ch] text-(--color-text) md:mt-8 md:text-[1.125rem]">{scene.line}</p>
      {first && (
        <div className="mt-8 flex items-center gap-6 md:mt-10">
          <Link href={hero.action.href} className="btn btn-solid">{hero.action.label}</Link>
          <span className="type-utility hidden text-(--color-muted) md:inline">Scroll to begin</span>
        </div>
      )}
    </motion.div>
  )
}

/** Reduced motion: no pin, no scrub. The still and the title card; the scenes as a quiet row; the film on request. */
function HeroStill({ films }: { films: Films }) {
  const desktop = useDesktop()
  const src = filmFor(films, desktop)
  const [play, setPlay] = useState(false)
  const [title, ...rest] = scenes
  return (
    <section data-hero aria-label="Halden, the opening film">
      <div className="relative h-[calc(100svh-var(--nav-h))] overflow-hidden">
        <Poster />
        {play && <video src={src} autoPlay muted playsInline controls className="absolute inset-0 h-full w-full object-cover" />}
        {!play && <div className={scrim} />}
        {!play && (
          <div className="absolute inset-x-0 bottom-0 px-(--gutter) pb-12 md:pb-24">
            <div className="mx-auto max-w-(--container)">
              <h1 className="type-display">{title.title}</h1>
              <p className="type-body mt-6 max-w-[34ch] md:mt-8 md:text-[1.125rem]">{title.line}</p>
              <div className="mt-8 flex flex-wrap items-center gap-4 md:mt-10">
                <Link href={hero.action.href} className="btn btn-solid">{hero.action.label}</Link>
                {src && <button type="button" onClick={() => setPlay(true)} className="btn btn-line">Play the film</button>}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="px-(--gutter) py-(--section-y)">
      <ul className="mx-auto grid max-w-(--container) gap-10 md:grid-cols-2 md:gap-6">
        {rest.map((s) => (
          <li key={s.id} className="border-t border-(--color-border) pt-6">
            <p className="type-heading">{s.title}</p>
            <p className="type-body mt-4 text-(--color-muted)">{s.line}</p>
          </li>
        ))}
      </ul>
      </div>
    </section>
  )
}
