'use client'
// Gallery — Gallery wall, opened by a floor plan of the print works (the page's remembered moment).
//
// The plan: a hairline drawing of the ground floor (yard, press hall, composing room, bindery) with the walk most
// visitors take, and a numbered square on the spot where each photograph was made — the numbers are the walking order.
// Room names carry their counts in superscript. On a pointer, hovering or focusing a mark brings that photograph and
// its caption into a fixed frame beside the plan (crossfade); choosing it opens the photograph large. On a phone the
// frame steps aside and a tap opens the photograph straight away. Reduced motion: the frame swaps without the fade.
//
// The wall: every photograph at its own ratio (never cropped), three columns on desktop and two on tablets and phones
// down to 360px, then one; one photograph spans two columns to break the grid. Staggered reveal, 60ms apart. Each
// opens from a real button into the lightbox (arrows, Esc, swipe) with its caption.
import { useState, type ReactNode } from 'react'
import { Lightbox } from '@/components/pieces/Lightbox'
import { MediaAsset } from '@/components/site/MediaAsset'
import { Reveal } from '@/components/motion/Reveal'
import { i } from '@/components/motion/stagger'
import type { Media } from '@/config/assets'
import type { Room } from '@/content/site'
import { cn } from '@/lib/utils'

export type GalleryPhoto = { image: Media; caption: string; room: Room }

// Plan coordinates in a 1000 × 560 drawing
const ROOMS: { name: Room; x: number; y: number; w: number; h: number; lx: number; ly: number }[] = [
  { name: 'Yard', x: 0, y: 150, w: 210, h: 410, lx: 24, ly: 186 },
  { name: 'Press hall', x: 210, y: 0, w: 500, h: 560, lx: 236, ly: 36 },
  { name: 'Composing room', x: 710, y: 0, w: 290, h: 270, lx: 736, ly: 36 },
  { name: 'Bindery', x: 710, y: 270, w: 290, h: 290, lx: 736, ly: 306 },
]
const MARKS: [number, number][] = [[105, 470], [330, 170], [560, 250], [400, 430], [800, 140], [930, 215], [810, 400], [930, 490]]
const WALK = 'M 0 522 L 105 470 L 210 410 L 330 170 L 560 250 L 400 430 L 710 140 L 800 140 L 930 215 L 885 270 L 810 400 L 930 490 L 1000 522'
const pct = (x: number, y: number) => ({ left: `${x / 10}%`, top: `${(y / 560) * 100}%` })

export function GallerySection({ tone, title, intro, planLabel, hint, hintTouch, photos, lightbox, closing }: {
  tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; title: ReactNode; intro: string; planLabel: string; hint: string; hintTouch: string
  photos: GalleryPhoto[]; lightbox: { label: string; close: string; prev: string; next: string }; closing?: string
}) {
  const [on, setOn] = useState(0)
  const [shown, setShown] = useState<number | null>(null)
  const count = (r: Room) => photos.filter((p) => p.room === r).length
  const cap = (n: number) => `No. ${n + 1}, ${photos[n].room}. ${photos[n].caption}`

  return (
    <section id="the-plan" data-tone={tone === 'ground' ? undefined : tone} className="relative z-10 scroll-mt-16 bg-(--color-background) px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <div className="grid gap-x-(--gutter) gap-y-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">{title}</div>
          <p className="type-body md:col-span-4 md:col-start-9">{intro}</p>
        </div>

        {/* ——— The plan ——— */}
        <Reveal className="mt-[calc(var(--section-y)*0.5)] grid gap-x-(--gutter) gap-y-6 md:grid-cols-12 md:items-start">
          <figure className="md:col-span-8">
            <div className="rv relative aspect-[1000/560] w-full">
              <svg viewBox="0 0 1000 560" className="absolute inset-0 h-full w-full overflow-visible" role="img" aria-label={planLabel}>
                {ROOMS.map((r) => (
                  <rect key={r.name} x={r.x} y={r.y} width={r.w} height={r.h} fill={r.name === 'Yard' ? 'none' : 'var(--color-surface)'}
                    stroke="var(--color-text)" strokeWidth={r.name === 'Yard' ? 1 : 2} strokeDasharray={r.name === 'Yard' ? '4 6' : undefined} vectorEffect="non-scaling-stroke" />
                ))}
                {/* doorways: the yard gate, yard to hall, hall to composing room and bindery, composing room to bindery, the street door */}
                {[[0, 500, 0, 545], [710, 110, 710, 170], [710, 390, 710, 450], [210, 380, 210, 440], [860, 270, 910, 270], [1000, 500, 1000, 545]].map(([x1, y1, x2, y2]) => (
                  <line key={`${x1}-${y1}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={x1 === 0 || x1 === 1000 ? 'var(--color-background)' : 'var(--color-surface)'} strokeWidth={6} />
                ))}
                {/* the last press, drawn where it stands */}
                <rect x={520} y={430} width={80} height={44} fill="none" stroke="var(--color-muted)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
                <path d={WALK} fill="none" stroke="var(--color-muted)" strokeWidth={1} strokeDasharray="2 5" vectorEffect="non-scaling-stroke" />
              </svg>
              {ROOMS.map((r) => (
                <span key={r.name} aria-hidden className="type-caption absolute -translate-y-1/2 whitespace-nowrap max-sm:text-[0.6875rem]" style={pct(r.lx, r.ly)}>
                  {r.name}<sup className="ml-px">{count(r.name)}</sup>
                </span>
              ))}
              <span aria-hidden className="type-caption absolute -translate-x-1/2 text-(--color-muted) max-sm:hidden" style={pct(560, 484)}>The last press</span>
              {MARKS.slice(0, photos.length).map(([x, y], n) => (
                <button key={n} type="button" onClick={() => setShown(n)} onPointerEnter={() => setOn(n)} onFocus={() => setOn(n)}
                  aria-label={`Open photograph ${n + 1}: ${photos[n].caption}`}
                  className={cn('type-utility absolute grid size-11 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center border border-(--color-text) tabular-nums transition-colors duration-150 ease-out max-sm:size-10',
                    n === on ? 'bg-(--color-text) text-(--color-background)' : 'bg-(--color-background) hover:bg-(--color-secondary) focus-visible:bg-(--color-secondary)')}
                  style={pct(x, y)}>
                  {n + 1}
                </button>
              ))}
            </div>
            <figcaption className="type-caption mt-4 text-(--color-muted)">
              <span className="hidden [@media(pointer:fine)]:inline">{hint}</span>
              <span className="[@media(pointer:fine)]:hidden">{hintTouch}</span>
            </figcaption>
          </figure>

          {/* The fixed frame beside the plan (pointer devices) */}
          <div aria-hidden className="rv hidden md:col-span-4 md:block" style={i(2)}>
            <div className="relative aspect-(--ratio-media) bg-(--color-secondary)">
              {photos.map((p, n) => (
                <div key={p.image.src} className={cn('absolute inset-0 transition-opacity duration-250 ease-out motion-reduce:transition-none', n === on ? 'opacity-100' : 'opacity-0')}>
                  <MediaAsset m={p.image} fit="cover" sizes="30vw" alt="" />
                </div>
              ))}
            </div>
            <p className="type-caption mt-4 min-h-[4.35em] border-t border-(--color-border) pt-3">{cap(on)}</p>
          </div>
        </Reveal>

        {/* ——— The wall ——— */}
        <Reveal as="ul" className="mt-[calc(var(--section-y)*0.6)] grid grid-flow-dense items-start gap-x-6 gap-y-10 min-[360px]:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {photos.map((p, n) => (
            <li key={p.image.src} className={cn(n === 3 && 'min-[360px]:col-span-2 lg:row-span-2')}>
              <figure>
                <button type="button" onClick={() => setShown(n)} className="block w-full cursor-zoom-in">
                  <span className="rv-img block overflow-hidden" style={i(n)}>
                    <MediaAsset m={p.image} sizes={n === 3 ? '(min-width: 1024px) 64vw, 100vw' : '(min-width: 1024px) 31vw, 50vw'} />
                  </span>
                </button>
                <figcaption className="type-caption mt-3 flex gap-3">
                  <span className="tabular-nums text-(--color-muted)">{n + 1}</span>
                  <span>{p.caption}</span>
                </figcaption>
              </figure>
            </li>
          ))}
          {closing && <li className="type-caption self-end text-(--color-muted) max-lg:hidden">{closing}</li>}
        </Reveal>
      </div>

      <Lightbox
        photos={photos.map((p, n) => ({ src: p.image.src, alt: p.image.alt, width: p.image.width, height: p.image.height, caption: cap(n) }))}
        index={shown} onIndex={setShown} {...lightbox}
      />
    </section>
  )
}
