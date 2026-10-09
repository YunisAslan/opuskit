'use client'
// OpusKit section — Collection: the season's name and one paragraph, then one picture per range or key piece.
// Photos — "Sideways strip": one row of tall photos at a shared height, native widths, generous gutters, a caption
// under each in the small face. Desktop: the section pins and the vertical scroll slides the row sideways.
// Phones: a native swipe row with snap; the title sits on a solid block over the first photo's lower third.
// Reduced motion: no pin, the row scrolls natively with snap.
import Link from 'next/link'
import { useLayoutEffect, useRef, useState, type ElementType } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { MediaAsset } from '@/components/media/MediaAsset'
import { ClipReveal } from '@/components/motion/ClipReveal'
import { Lines } from '@/components/motion/Lines'
import { DrawnLink } from '@/components/pieces/DrawnLink'
import { Badge } from '@/components/ui/badge'
import { price } from '@/lib/format'
import { useReduced } from '@/lib/use-media'

export type Piece = { name: string; price: number; index: number; alt: string; href: string }

export function CollectionSection({ link: L = Link, season, title, lines, text, action, pieces }: {
  link?: ElementType; season: string; title: string; lines: string[]; text: string; action: { label: string; href: string }; pieces: Piece[]
}) {
  const reduce = useReduced()
  const section = useRef<HTMLElement>(null)
  const row = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  const pinned = !reduce

  useLayoutEffect(() => {
    const el = row.current
    if (!el) return
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, (v) => -v * distance)

  const caption = (p: Piece) => (
    <p className="type-caption mt-3 flex items-baseline justify-between gap-4">
      <DrawnLink link={L} href={p.href} className="font-semibold">{p.name}</DrawnLink>
      <span className="tabular-nums">{price(p.price)}</span>
    </p>
  )

  const intro = (
    <div className="w-[min(30rem,34vw)] shrink-0 self-center pr-[4vw]">
      <Badge variant="ink">{season}</Badge>
      <Lines text={title} lines={lines} className="t-section mt-5" />
      <p className="type-body mt-6 max-w-[38ch]">{text}</p>
      <p className="mt-8"><DrawnLink link={L} href={action.href} className="t-action py-3">{action.label}</DrawnLink></p>
    </div>
  )

  return (
    <section ref={section} aria-label={title} className="relative" style={pinned && distance ? { height: `calc(100svh + ${distance}px)` } : undefined}>
      {/* Desktop */}
      <div className={`hidden md:block ${pinned ? 'sticky top-0 h-svh overflow-hidden' : 'py-(--section-y)'}`}>
        <motion.div ref={row} style={pinned ? { x } : undefined}
          className={`flex h-full items-center gap-[4vw] px-(--gutter) ${pinned ? 'w-max' : 'snap-x snap-mandatory overflow-x-auto pb-6'}`}>
          {intro}
          {pieces.map((p) => (
            <figure key={p.href} className="shrink-0 snap-start">
              <ClipReveal className="h-[64vh] overflow-hidden rounded-(--radius-media)">
                <MediaAsset id="collection" index={p.index} alt={p.alt} sizes="45vh" className="h-full" />
              </ClipReveal>
              <figcaption>{caption(p)}</figcaption>
            </figure>
          ))}
          <div aria-hidden className="w-[2vw] shrink-0" />
        </motion.div>
      </div>

      {/* Phones */}
      <div className="py-(--section-y) md:hidden">
        <div className="-mb-2 flex snap-x snap-mandatory gap-4 overflow-x-auto px-(--gutter) pb-2 [scroll-padding-inline:var(--gutter)]">
          {pieces.map((p, i) => (
            <figure key={p.href} className="w-[80vw] shrink-0 snap-start">
              <div className="relative">
                <MediaAsset id="collection" index={p.index} alt={p.alt} sizes="80vw" className="rounded-(--radius-media)" />
                {i === 0 && (
                  <div className="absolute inset-x-3 bottom-3 rounded-[20px] bg-(--color-background) p-4">
                    <Badge variant="ink">{season}</Badge>
                    <p aria-hidden className="type-display mt-2 [font-size:2.4rem] leading-[0.86]">{lines.map((l) => <span key={l} className="block">{l}</span>)}</p>
                  </div>
                )}
              </div>
              <figcaption>{caption(p)}</figcaption>
            </figure>
          ))}
        </div>
        <div className="px-(--gutter)">
          <h2 className="sr-only">{title}</h2>
          <p className="type-body mt-8 max-w-[38ch]">{text}</p>
          <p className="mt-6"><DrawnLink link={L} href={action.href} className="t-action py-3">{action.label}</DrawnLink></p>
        </div>
      </div>
    </section>
  )
}
