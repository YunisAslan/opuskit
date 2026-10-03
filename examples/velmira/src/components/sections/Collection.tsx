'use client'
import { useEffect, useRef, useState, type ElementType } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'motion/react'
import { Chapter } from '@/components/site/Motif'
import { Badge } from '@/components/ui/badge'

// OpusKit section — Collection: a full-height image with the season's title, then its key pieces as a sideways strip.
// A client component, so in-site links use next/link by default. Desktop: the strip is pinned and vertical scroll slides it sideways. Phone and reduced motion: a native swipe row
// with scroll-snap. The title's motif mark is the "moment" pose — the disc lands here biggest.
export type Piece = { name: string; price: string; image: string; alt: string; href: string; tag?: string; width?: number; height?: number }

export function CollectionSection({ link: L = Link, season, title, text, image, alt, pieces, more, as: H = 'h2', id, reveal = true }: {
  link?: ElementType; season: string; title: string; text: string; image: string; alt: string; pieces: Piece[]
  /** A closing card at the end of the strip. */ more?: { text: string; label: string; href: string }
  as?: 'h1' | 'h2'; id?: string; /** false on a page's first screen: it is shown complete, not animated. */ reveal?: boolean
}) {
  const strip = useRef<HTMLDivElement>(null)
  const row = useRef<HTMLUListElement>(null)
  const [pinned, setPinned] = useState(false)
  const [distance, setDistance] = useState(0)
  const { scrollYProgress } = useScroll({ target: strip, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])

  useEffect(() => {
    const mq = matchMedia('(min-width: 64rem) and (prefers-reduced-motion: no-preference)')
    const measure = () => {
      setPinned(mq.matches)
      if (row.current) setDistance(Math.max(0, row.current.scrollWidth - innerWidth))
    }
    measure()
    mq.addEventListener('change', measure)
    addEventListener('resize', measure)
    return () => { mq.removeEventListener('change', measure); removeEventListener('resize', measure) }
  }, [])
  const pin = pinned && distance > 0

  const items = (
    <>
      <li className="flex w-[78vw] shrink-0 snap-start flex-col justify-end self-stretch pb-2 sm:w-[48vw] lg:w-[min(34vw,440px)]">
        <p className="type-utility text-(--color-muted)">{season}</p>
        <p className="type-body mt-4 max-w-[40ch]">{text}</p>
      </li>
      {pieces.map((p) => (
        <li key={p.href} className="shrink-0 snap-start">
          <L href={p.href} className="group block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.image} alt={p.alt} width={p.width} height={p.height} loading="lazy" decoding="async"
              className="h-[62svh] max-h-[680px] w-auto rounded-(--radius-media) bg-(--color-surface) object-cover lg:h-[64vh]" />
            <p className="mt-4 flex items-baseline justify-between gap-4">
              <span className="type-heading underline decoration-transparent decoration-1 underline-offset-[6px] transition-[text-decoration-color] duration-150 [font-size:1.35rem] group-hover:decoration-current group-focus-visible:decoration-current">{p.name}</span>
              <span className="type-utility tabular-nums text-(--color-muted)">{p.price}</span>
            </p>
            {p.tag && <Badge variant="outline" className="mt-3 h-6 rounded-button border-(--color-border) px-2.5 text-(--color-muted)">{p.tag}</Badge>}
          </L>
        </li>
      ))}
      {more && (
        <li className="flex w-[78vw] shrink-0 snap-start flex-col justify-center sm:w-[48vw] lg:w-[min(30vw,400px)]">
          <p className="type-heading text-balance">{more.text}</p>
          <L href={more.href} className="type-body mt-6 inline-flex min-h-11 items-center underline decoration-current/40 underline-offset-[6px] hover:decoration-current">{more.label}</L>
        </li>
      )}
    </>
  )
  return (
    <section id={id}>
      <div data-reveal={reveal ? '' : undefined} className="relative flex min-h-svh items-end overflow-hidden">
        <div data-clip className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={alt} loading={reveal ? 'lazy' : 'eager'} decoding="async" className="size-full object-cover object-[60%_center]" />
        </div>
        <div aria-hidden className="absolute inset-0 bg-(--color-background)/20" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-(--color-background)/70 to-transparent" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-(--color-background) via-(--color-background)/30 to-transparent" />
        <div className="shell relative pb-16 pt-40 md:pb-24">
          <Chapter pose="moment" className="md:max-w-[80%]">
            <H data-rise className="type-display [font-size:clamp(3rem,8vw,7rem)]">{title}</H>
          </Chapter>
        </div>
      </div>

      <div ref={strip} data-motif-hide={pin || undefined} style={pin ? { height: `calc(100vh + ${distance}px)` } : undefined} className={pin ? 'relative' : 'py-24 md:py-32'}>
        <div className={pin ? 'sticky top-0 flex h-screen items-center overflow-hidden' : ''}>
          <motion.ul ref={row} style={pin ? { x } : undefined}
            className={`flex gap-6 px-5 md:gap-12 md:px-10 lg:px-[var(--gutter)] ${pin ? '' : 'snap-x snap-mandatory overflow-x-auto scroll-px-5 pb-4 md:scroll-px-10 [scrollbar-width:thin]'}`}>
            {items}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
