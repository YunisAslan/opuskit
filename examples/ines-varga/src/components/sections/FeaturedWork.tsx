'use client'
// OpusKit section — Featured Work, made this site's own. Three uses of the same projects:
//   index — Home: big titles on rules, the small picture beside each (always visible), kind and year on the right.
//   story — Selected Work: photo / text pairs alternating sides (7/5, 5/7, then one full-bleed), each picture a
//           PhotoMorph into its project page, and the walking route: a marker trail drawn by the scroll between the
//           maps, from "start here" to "your place next?" (the page's remembered moment).
//   held  — Project → More maps: the names scroll past one photo held still beside them; it shows whichever name is
//           in the middle of the screen, or hovered/focused (idea from IDEAS.md). Phones: each name has its photo.
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useEffect, useId, useRef, useState } from 'react'
import { MediaAsset } from '@/components/MediaAsset'
import { ClipReveal, Cut, Lines } from '@/components/motion'
import { PhotoMorph } from '@/components/pieces/PhotoMorph'
import { featuredFor } from '@/config/assets'
import type { ProjectEntry } from '@/content/site'

type Item = ProjectEntry & { n: number } // n: the project's place in the owner's order (its featuredWork file)
const href = (p: Item) => `/work/${p.slug}`

export function FeaturedWorkSection({ variant, title, aside, items, headingId, as = 'h2', route }: {
  variant: 'index' | 'story' | 'held'; title: string; aside?: string; items: Item[]; headingId?: string; as?: 'h1' | 'h2'
  route?: { start: string; end: string; endHref: string }
}) {
  if (variant === 'story') return <Story title={title} aside={aside} items={items} as={as} route={route!} />
  if (variant === 'held') return <Held title={title} items={items} />
  return (
    <ul aria-labelledby={headingId} className="border-t border-(--color-text)">
      {items.map((p, i) => {
        const flip = i % 2 === 1 // photo story rhythm: the picture swaps sides and width row by row (3 cols, then 2)
        return (
          <li key={p.slug} className="border-b border-(--color-border)">
            <Link href={href(p)} className="group press grid-site items-center gap-y-3 py-4 md:py-5">
              <span className={`relative col-span-1 aspect-square overflow-hidden rounded-(--radius-media) ${flip ? 'lg:order-last lg:col-span-2' : 'lg:col-span-3'}`}>
                <MediaAsset id={featuredFor(p.n)} fill sizes="(min-width: 1024px) 22vw, 25vw" imgClassName="transition-transform duration-200 [transition-timing-function:steps(2)] group-hover:scale-[1.04]" />
              </span>
              <span className={`col-span-3 min-w-0 sm:col-span-5 ${flip ? 'lg:col-span-5' : 'lg:col-span-4'}`}>
                <h3 className="type-h3 transition-transform duration-150 [transition-timing-function:steps(2)] group-hover:translate-x-2 group-focus-visible:underline group-focus-visible:decoration-1 group-focus-visible:underline-offset-8">{p.title}</h3>
                <span className="type-utility mt-2 block text-(--color-muted) lg:hidden">{p.kind}, {p.year}</span>
              </span>
              <span className="type-body hidden text-(--color-muted) lg:col-span-3 lg:block">{p.line}</span>
              <span className={`type-utility hidden lg:col-span-2 lg:block ${flip ? '' : 'text-right'}`}>{p.kind}<br /><span className="text-(--color-muted) tabular-nums">{p.year}</span></span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

// ── story ───────────────────────────────────────────────────────────────────────────────────────────────────
// Where each row's picture sits, as a share of the width (for the route between rows): 7/5, 5/7, full-bleed.
const LAYOUT = [
  { photo: 'lg:col-span-7', text: 'lg:col-span-5 lg:col-start-8', x: 29 },
  { photo: 'lg:col-span-5 lg:col-start-8 lg:row-start-1', text: 'lg:col-span-6 lg:col-start-1 lg:row-start-1', x: 79 },
  { photo: 'col-span-full', text: 'lg:col-span-6 lg:col-start-7', x: 50, wide: true },
]

function Story({ title, aside, items, as: H, route }: { title: string; aside?: string; items: Item[]; as: 'h1' | 'h2'; route: { start: string; end: string; endHref: string } }) {
  const xs = items.map((_, i) => LAYOUT[i % 3].x)
  return (
    <div>
      <div className="grid-site items-end gap-y-6">
        <Lines as={H} lines={[title]} className="type-display col-span-full lg:col-span-8" />
        {aside && <p className="type-body col-span-full max-w-[44ch] text-(--color-muted) lg:col-span-4">{aside}</p>}
      </div>
      <p aria-hidden className="type-note mt-12 -rotate-2 md:mt-16" style={{ marginLeft: `calc(${xs[0]}% - 3.5em)` }}>{route.start}</p>
      <Route from={xs[0] - 4} to={xs[0]} short />
      <ol>
        {items.map((p, i) => {
          const l = LAYOUT[i % 3]
          return (
            <li key={p.slug}>
              <article className={`grid-site gap-y-6 ${l.wide ? 'lg:gap-y-8' : 'items-end'}`}>
                <Link href={href(p)} data-morph aria-label={`${p.title}, ${p.kind}, ${p.year}`} className={`press col-span-full block ${l.photo} ${l.wide ? '-mx-(--gutter)' : ''}`}>
                  <ClipReveal className={`relative overflow-hidden ${l.wide ? 'aspect-square sm:aspect-[21/9]' : 'aspect-square rounded-(--radius-media)'}`}>
                    <PhotoMorph name={p.slug}>
                      <MediaAsset id={featuredFor(p.n)} fill priority={i === 0} sizes={l.wide ? '100vw' : '(min-width: 1024px) 58vw, 100vw'} />
                    </PhotoMorph>
                  </ClipReveal>
                </Link>
                <Cut className={`col-span-full ${l.text}`}>
                  <p className="type-utility text-(--color-muted)">{p.kind}, {p.year}</p>
                  <h2 className="type-h2 mt-3 border-t border-(--color-text) pt-4"><Link href={href(p)} data-morph className="hover:underline hover:decoration-1 hover:underline-offset-8">{p.title}</Link></h2>
                  <p className="type-body mt-4 max-w-[46ch]">{p.line}</p>
                  <p className="type-caption mt-3 text-(--color-muted)">{p.place}</p>
                </Cut>
              </article>
              {i < items.length - 1 && <Route from={xs[i]} to={xs[i + 1]} />}
            </li>
          )
        })}
      </ol>
      <Route from={xs[items.length - 1]} to={xs[items.length - 1] + 6} short />
      <Link href={route.endHref} className="press type-note mt-2 inline-flex min-h-11 items-center gap-3 rotate-1 hover:underline hover:decoration-2 hover:underline-offset-4" style={{ marginLeft: `calc(${xs[items.length - 1] + 6}% - 1em)` }}>
        <svg viewBox="0 0 24 24" aria-hidden className="size-7"><path d="M5 5 L 19 19 M19 5 L 5 19" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
        {route.end}
      </Link>
    </div>
  )
}

/** A stretch of the walking route between two maps: a dashed marker trail drawn as far as the visitor has scrolled. */
function Route({ from, to, short = false }: { from: number; to: number; short?: boolean }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  const length = useTransform(scrollYProgress, [0, 1], [0, 1])
  const mid = (from + to) / 2
  const d = `M${from} 0 C ${from} 30, ${mid + (to > from ? -8 : 8)} 38, ${mid} 50 S ${to} 70, ${to} 100`
  return (
    <div ref={ref} aria-hidden className={short ? 'h-12 md:h-16' : 'h-24 md:h-[clamp(120px,12vw,180px)]'}>
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="block size-full overflow-visible text-(--color-accent)">
      <mask id={id} maskUnits="userSpaceOnUse" x="-10" y="-10" width="120" height="120">
        <motion.path d={d} fill="none" stroke="#fff" strokeWidth={12} style={reduce ? undefined : { pathLength: length }} />
      </mask>
      <path d={d} fill="none" stroke="currentColor" strokeWidth={2.2} strokeDasharray="6 8" strokeLinecap="round" vectorEffect="non-scaling-stroke" mask={`url(#${id})`} />
    </svg>
    </div>
  )
}

// ── held ────────────────────────────────────────────────────────────────────────────────────────────────────
function Held({ title, items }: { title: string; items: Item[] }) {
  const [active, setActive] = useState(0)
  const list = useRef<HTMLUListElement>(null)
  useEffect(() => {
    const rows = [...(list.current?.children ?? [])]
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setActive(rows.indexOf(e.target))
    }, { rootMargin: '-45% 0px -45% 0px' })
    rows.forEach((r) => io.observe(r))
    return () => io.disconnect()
  }, [])
  if (!items.length) return null
  const shown = items[Math.min(active, items.length - 1)]
  return (
    <div className="grid-site">
      <div className="col-span-full lg:col-span-7">
        <Lines lines={[title]} className="type-h2" />
        <ul ref={list} className="mt-10 border-t border-(--color-text)">
          {items.map((p, i) => (
            <li key={p.slug} className="border-b border-(--color-border)">
              <Link href={href(p)} onPointerEnter={() => setActive(i)} onFocus={() => setActive(i)} className="group press block py-6 md:py-9">
                <span className="relative mb-5 block aspect-square overflow-hidden rounded-(--radius-media) lg:hidden">
                  <MediaAsset id={featuredFor(p.n)} fill sizes="100vw" />
                </span>
                <h3 className={`type-h3 transition-[color,transform] duration-150 [transition-timing-function:steps(2)] group-hover:translate-x-2 group-focus-visible:underline group-focus-visible:decoration-1 group-focus-visible:underline-offset-8 ${i === active ? '' : 'lg:text-(--color-muted)'}`}>{p.title}</h3>
                <p className="type-utility mt-3 text-(--color-muted)">{p.kind}, {p.year}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <figure aria-hidden className="hidden self-start lg:sticky lg:top-[14svh] lg:col-span-4 lg:col-start-9 lg:mt-24 lg:block">
        <div className="relative aspect-square overflow-hidden rounded-(--radius-media)">
          {items.map((p, i) => (
            <div key={p.slug} className={`absolute inset-0 transition-[opacity,scale,filter] duration-300 ease-(--ease-out) ${i === active ? 'scale-100 opacity-100' : 'opacity-0 blur-[2px] motion-safe:scale-[1.04]'}`}>
              <MediaAsset id={featuredFor(p.n)} fill sizes="34vw" alt="" />
            </div>
          ))}
        </div>
        <figcaption className="type-caption mt-3 text-(--color-muted)">{shown.title}, {shown.place.toLowerCase()}</figcaption>
      </figure>
    </div>
  )
}
