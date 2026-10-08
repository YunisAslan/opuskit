'use client'
// Featured Work — Photo story. Photo / text pairs that alternate sides on the 12-column grid with varied widths
// (7/5, then 5/7, then one full-bleed band) so the rhythm never repeats twice in a row. Every work keeps its own
// 3:4 shape (never cropped, never rounded) and drifts slightly slower than its words (≤ 8%). Each pair reveals
// together: the frame opens, then the words follow.
//   grid      (Home)        — every picture the same shape; a title, the museum label, one curator's sentence.
//                             Tap a picture to open it large (Lightbox).
//   staggered (Exhibitions) — large and small alternate; the artist's name set huge over the work, the full label
//                             and the longer note.
// Phones: photo, then words, every photo full width, the original order.
import Link from 'next/link'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import { i } from '@/components/motion/stagger'
import { Drift } from '@/components/motion/Drift'
import { Lightbox } from '@/components/pieces/Lightbox'
import { MediaAsset } from '@/components/site/MediaAsset'
import type { Media } from '@/config/assets'
import type { Exhibition } from '@/content/site'
import { cn } from '@/lib/utils'

export type Project = Exhibition & { image: Media; href: string }

/** Museum order: artist, title in italic, year, medium, size. */
export function MuseumLabel({ p, className }: { p: Exhibition; className?: string }) {
  return (
    <p className={cn('type-caption', className)}>
      <span className="block">{p.artist}</span>
      <span className="block"><span className="label-title">{p.title}</span>, {p.year}</span>
      <span className="block text-(--color-muted)">{p.medium}</span>
      <span className="block text-(--color-muted)">{p.size}</span>
    </p>
  )
}

export function Status({ s }: { s: Exhibition['status'] }) {
  return (
    <p className="type-utility flex items-center gap-2">
      {s === 'Now on' && <span aria-hidden className="size-1.5 bg-(--color-accent)" />}
      {s}
    </p>
  )
}

export function FeaturedWorkSection({ tone, variant = 'grid', title, header, projects, more, open, lightbox }: {
  tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; variant?: 'grid' | 'staggered'
  title?: ReactNode; header?: ReactNode; projects: Project[]
  more?: { label: string; href: string }; open?: string
  lightbox?: { label: string; close: string; prev: string; next: string }
}) {
  const [shown, setShown] = useState<number | null>(null)
  const big = variant === 'staggered'

  const photo = (p: Project, n: number, sizes: string, align: 'start' | 'end' | 'center' = 'start') => {
    const frame = (
      <Drift amount={4} className="aspect-(--ratio-card) w-full bg-(--color-secondary)">
        <MediaAsset m={p.image} fit="cover" sizes={sizes} />
      </Drift>
    )
    return (
      // One work per screen: the frame never grows taller than the viewport, so the whole print is seen at once
      <div className={cn('rv-img md:max-w-[calc(86svh*0.75)]', align === 'end' && 'md:ml-auto', align === 'center' && 'md:mx-auto')}>
        {lightbox ? (
          <button type="button" onClick={() => setShown(n)} className="group relative block w-full cursor-zoom-in" title={open}>
            {frame}
          </button>
        ) : frame}
      </div>
    )
  }

  // Exhibitions: the artist's name set huge over the work, breaking the line between the two
  const artist = (p: Project, cls: string) => (
    <p aria-hidden className={cn('type-display rv -mb-4 text-balance max-md:order-first md:-mb-[calc(var(--gutter)*0.5)]', cls)}>{p.artist}</p>
  )

  const words = (p: Project, at: number) => (
    <div className="space-y-6">
      <div className="rv-text" style={i(at)}><Status s={p.status} /></div>
      {big ? (
        <h2 className="type-heading rv-text" style={i(at + 2)}><span className="sr-only">{p.artist}, </span>{p.title}</h2>
      ) : (
        <h3 className="type-heading rv-text [font-size:clamp(1.75rem,3.2vw,2.75rem)]" style={i(at + 1)}>
          <Link href={p.href} className="link">{p.title}</Link>
        </h3>
      )}
      <div className="rv-text grid gap-6 sm:grid-cols-[minmax(0,12rem)_1fr] md:grid-cols-1" style={i(at + 3)}>
        <MuseumLabel p={p} />
        <p className="type-caption">{p.dates}</p>
      </div>
      <p className="type-body rv-text max-w-[46ch]" style={i(at + 4)}>{p.curator}</p>
      {big && <p className="type-body rv-text max-w-[58ch]" style={i(at + 5)}>{p.long}</p>}
      {!big && <p className="rv-text" style={i(at + 5)}><Link href={p.href} className="type-utility link-on inline-flex min-h-11 items-center">See the exhibition</Link></p>}
    </div>
  )

  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="relative z-10 bg-(--color-background) px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        {header}
        {title && (
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 md:grid md:grid-cols-12 md:gap-x-(--gutter)">
            <div className="md:col-span-8">{title}</div>
            {more && <Link href={more.href} className="type-utility link-on inline-flex min-h-11 items-center md:col-span-3 md:col-start-10 md:justify-self-end">{more.label}</Link>}
          </div>
        )}

        <ol className={cn('space-y-[calc(var(--section-y)*0.75)]', (title || header) && 'mt-[calc(var(--section-y)*0.6)]')}>
          {projects.map((p, n) => {
            const k = n % 3
            if (k === 2) return (
              // The full-bleed turn: a band one small step from the ground, the work alone at its own shape
              <li key={p.slug} id={p.slug} className="scroll-mt-24">
                <Reveal className="-mx-(--gutter) bg-(--color-secondary) px-(--gutter) py-[calc(var(--section-y)*0.6)] min-[1528px]:mx-[calc(50%-50vw)]">
                  <div className="mx-auto grid max-w-(--container) gap-x-(--gutter) gap-y-10 md:grid-cols-12 md:items-end">
                    {big && artist(p, 'md:col-span-12 md:text-center')}
                    <div className="md:col-span-6 md:col-start-4">{photo(p, n, '(min-width: 768px) 45vw, 100vw', 'center')}</div>
                    <div className="md:col-span-3 md:col-start-10">{words(p, 1)}</div>
                  </div>
                </Reveal>
              </li>
            )
            const left = k === 0
            return (
              <li key={p.slug} id={p.slug} className="scroll-mt-24">
                <Reveal className="grid gap-x-(--gutter) gap-y-10 md:grid-cols-12 md:items-end">
                  {big && artist(p, left ? 'md:col-span-12' : 'md:order-0 md:col-span-12 md:text-right')}
                  <div className={cn(left ? 'md:col-span-7' : 'md:order-2 md:col-span-5 md:col-start-8')}>{photo(p, n, left ? '(min-width: 768px) 55vw, 100vw' : '(min-width: 768px) 40vw, 100vw', left ? 'start' : 'end')}</div>
                  <div className={cn(
                    left ? 'md:col-span-4 md:col-start-9' : 'md:order-1 md:col-span-5 md:col-start-1 md:pb-[12%]',
                  )}>
                    {words(p, 1)}
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>

      {lightbox && (
        <Lightbox
          photos={projects.map((p) => ({ src: p.image.src, alt: p.image.alt, width: p.image.width, height: p.image.height, caption: <>{p.artist}, <span className="label-title">{p.title}</span>, {p.year}. {p.medium}, {p.size}.</> }))}
          index={shown} onIndex={setShown} {...lightbox}
        />
      )}
    </section>
  )
}
