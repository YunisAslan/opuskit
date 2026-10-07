'use client'
// OpusKit section — Collection: the season's title, then its key pieces. Fitted to Maison Vey as the "Sideways strip":
// desktop pins the section and turns the vertical scroll into a row of large 4:5 photographs moving sideways, with a
// small counter in the utility face. Phones (and reduced motion) get the portrait cover with the title over its lower
// third, then a native swipe row with scroll-snap — no pinning.
import Link from 'next/link'
import { useEffect, useRef, useState, type ElementType } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react'
import type { AssetKey } from '@/config/assets'
import { MediaAsset } from '@/components/media/MediaAsset'
import { ImageReveal, Lines, RevealGroup, FadeRise } from '@/components/motion/Reveal'
import { useMediaQuery } from '@/hooks/use-media-query'

export type Piece = { name: string; price: string; image: AssetKey; alt: string; href: string; place?: string; hour?: string }

const pad = (n: number) => String(n).padStart(2, '0')

function Caption({ p, L }: { p: Piece; L: ElementType }) {
  return (
    <L href={p.href} className="group mt-4 block">
      <span className="flex items-baseline justify-between gap-4">
        <span className="type-body link-quiet group-hover:decoration-current">{p.name}</span>
        <span className="type-body tabular-nums">{p.price}</span>
      </span>
      {p.place && <span className="type-caption mt-1 block text-(--color-muted)">{p.place}{p.hour && <>, <span className="tabular-nums text-(--color-accent)">{p.hour}</span></>}</span>}
    </L>
  )
}

function Pinned({ L, season, title, titleLines, text, pieces }: { L: ElementType; season: string; title: string; titleLines?: string[]; text: string; pieces: Piece[] }) {
  const section = useRef<HTMLElement>(null)
  const row = useRef<HTMLDivElement>(null)
  const [travel, setTravel] = useState(0)
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const el = row.current
    if (!el) return
    const measure = () => setTravel(Math.max(0, el.scrollWidth - window.innerWidth))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)
    return () => { ro.disconnect(); window.removeEventListener('resize', measure) }
  }, [])
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel])
  useMotionValueEvent(scrollYProgress, 'change', (v) => setIndex(Math.min(pieces.length - 1, Math.round(v * (pieces.length - 1)))))

  return (
    <section ref={section} id="collection" aria-label={title} style={{ height: `calc(100svh + ${travel}px)` }} className="relative">
      <div className="sticky top-(--nav-h) flex h-[calc(100svh-var(--nav-h))] flex-col justify-center overflow-hidden">
        <motion.div ref={row} style={{ x }} className="flex w-max items-end gap-(--within) pl-[max(var(--gutter),calc((100vw-var(--container))/2+var(--gutter)))] pr-(--gutter) will-change-transform">
          <RevealGroup className="w-[min(30rem,32vw)] shrink-0 self-center pr-(--within)">
            <FadeRise as="p" i={0} className="type-caption text-(--color-muted)">{season}</FadeRise>
            <Lines as="h2" standalone={false} lines={titleLines ?? [title]} className="type-display mt-3 [font-size:clamp(2.75rem,6vw,5.5rem)]" />
            <FadeRise as="p" i={2} className="type-body mt-8 max-w-[42ch]">{text}</FadeRise>
          </RevealGroup>
          {pieces.map((p, i) => (
            <figure key={p.href} className="w-[calc((100svh-var(--nav-h))*0.62*0.8)] shrink-0">
              {i === 0
                ? <ImageReveal><MediaAsset id={p.image} alt={p.alt} sizes="40vw" /></ImageReveal>
                : <MediaAsset id={p.image} alt={p.alt} sizes="40vw" />}
              <figcaption><Caption p={p} L={L} /></figcaption>
            </figure>
          ))}
        </motion.div>
        <p aria-hidden className="type-utility mt-12 pl-[max(var(--gutter),calc((100vw-var(--container))/2+var(--gutter)))] tabular-nums text-(--color-muted)">
          {pad(index + 1)} / {pad(pieces.length)}
        </p>
      </div>
    </section>
  )
}

function Swipe({ L, season, title, titleLines, text, pieces, tone }: { L: ElementType; season: string; title: string; titleLines?: string[]; text: string; pieces: Piece[]; tone?: string }) {
  const [cover, ...rest] = pieces
  const rowRef = useRef<HTMLUListElement>(null)
  const [index, setIndex] = useState(0)
  const onScroll = () => {
    const el = rowRef.current
    if (!el) return
    const w = (el.firstElementChild as HTMLElement | null)?.offsetWidth ?? 1
    setIndex(Math.min(rest.length - 1, Math.round(el.scrollLeft / w)))
  }
  return (
    <section id="collection" aria-label={title} data-tone={tone} className="py-(--section-y)">
      <div className="mx-auto max-w-(--container) md:px-(--gutter)">
        <div className="md:grid md:grid-cols-12 md:items-end md:gap-x-(--grid-gap)">
          <figure className="md:col-span-7">
            <div className="relative">
              <ImageReveal><MediaAsset id={cover.image} alt={cover.alt} sizes="(min-width: 768px) 58vw, 100vw" /></ImageReveal>
              {/* Phones: the title over the lower third of the cover, on a scrim (display:none elsewhere, so it is read once) */}
              <RevealGroup className="absolute inset-x-0 bottom-0 bg-linear-to-t from-(--color-background)/90 via-(--color-background)/60 to-transparent px-(--gutter) pb-8 pt-24 md:hidden">
                <FadeRise as="p" i={0} className="type-caption text-(--color-muted)">{season}</FadeRise>
                <Lines as="h2" standalone={false} lines={titleLines ?? [title]} className="type-display mt-3 [font-size:clamp(2.75rem,6vw,4.5rem)]" />
              </RevealGroup>
            </div>
            <figcaption className="px-(--gutter) md:px-0"><Caption p={cover} L={L} /></figcaption>
          </figure>
          <RevealGroup className="hidden md:col-span-4 md:col-start-9 md:block md:pb-24">
            <FadeRise as="p" i={0} className="type-caption text-(--color-muted)">{season}</FadeRise>
            <Lines as="h2" standalone={false} lines={titleLines ?? [title]} className="type-display mt-3 [font-size:clamp(2.75rem,6vw,4.5rem)]" />
            <FadeRise as="p" i={2} className="type-body mt-8 max-w-[52ch]">{text}</FadeRise>
          </RevealGroup>
        </div>
        <p className="type-body mt-12 max-w-[52ch] px-(--gutter) md:hidden">{text}</p>
      </div>
      {rest.length > 0 && (
        <div className="mx-auto mt-16 max-w-(--container)">
          <ul ref={rowRef} onScroll={onScroll} className="no-scrollbar flex snap-x snap-mandatory gap-(--grid-gap) overflow-x-auto scroll-px-(--gutter) px-(--gutter)">
            {rest.map((p) => (
              <li key={p.href} className="w-[78%] shrink-0 snap-start sm:w-[44%] md:w-[calc((100%-var(--grid-gap))/2.4)]">
                <MediaAsset id={p.image} alt={p.alt} sizes="(min-width: 768px) 40vw, 78vw" />
                <Caption p={p} L={L} />
              </li>
            ))}
          </ul>
          {rest.length > 1 && <p aria-hidden className="type-utility mt-6 px-(--gutter) tabular-nums text-(--color-muted)">{pad(index + 1)} / {pad(rest.length)}</p>}
        </div>
      )}
    </section>
  )
}

export function CollectionSection({ tone, link: L = Link, season, title, titleLines, text, pieces }: {
  tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; link?: ElementType; season: string; title: string
  /** The title broken by hand. */ titleLines?: string[]; text: string; pieces: Piece[]
}) {
  const desktop = useMediaQuery('(min-width: 1024px)')
  const reduce = useReducedMotion()
  const t = tone === 'ground' ? undefined : tone
  if (desktop && !reduce) return <Pinned L={L} season={season} title={title} titleLines={titleLines} text={text} pieces={pieces} />
  return <Swipe L={L} season={season} title={title} titleLines={titleLines} text={text} pieces={pieces} tone={t} />
}
