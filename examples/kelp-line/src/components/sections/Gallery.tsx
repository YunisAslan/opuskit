'use client'
// OpusKit section — Gallery as "Photo story", fitted to Kelp Line as Stories' remembered moment, "The dive log": photo
// and text pairs alternate sides on the 12-column grid — 7/5, then 5/7, then one full-bleed — so the rhythm never
// repeats twice in a row. Each text is a logbook entry: a short title, a line, and the date, depth and sea temperature
// as quiet numbers. Each pair reveals together (the photo opens with the clip reveal, the words fade); the first
// full-bleed photo is the one picture on the whole site that drifts (5% of its frame). Phones: photo then text, every
// photo full width, the original order kept; half the drift. Reduced motion: no drift, short fades.
import { useReduced } from '@/components/motion/useReduced'
import { motion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef } from 'react'
import { MediaAsset } from '@/components/media/MediaAsset'
import { cn } from '@/lib/utils'

export type StoryPhoto = { alt: string; caption: string; text: string; log: { date: string; depth: string; temp: string } }

function Log({ p }: { p: StoryPhoto }) {
  return (
    <div>
      <h3 className="type-title">{p.caption}</h3>
      <p className="type-body mt-3 max-w-[40ch] text-(--color-muted)">{p.text}</p>
      <dl className="type-caption mt-6 grid max-w-[22rem] grid-cols-3 border-t border-(--color-border) pt-3">
        <div><dt className="text-(--color-muted)">Date</dt><dd className="mt-1 tabular-nums">{p.log.date}</dd></div>
        <div><dt className="text-(--color-muted)">Depth</dt><dd className="mt-1 tabular-nums">{p.log.depth}</dd></div>
        <div><dt className="text-(--color-muted)">Sea</dt><dd className="mt-1 tabular-nums">{p.log.temp}</dd></div>
      </dl>
    </div>
  )
}

function Drift({ i, p }: { i: number; p: StoryPhoto }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReduced()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // 5% of the frame across its pass; half on phones (read after mount, so server and client render alike)
  const travel = useRef(5)
  useEffect(() => { travel.current = window.innerWidth < 768 ? 2.5 : 5 }, [])
  const y = useTransform(scrollYProgress, (v) => `${(v - 0.5) * travel.current}%`)
  return (
    <div ref={ref} className="drift overflow-hidden rounded-(--radius-media)">
      <motion.div style={reduce ? undefined : { y, scale: 1.1 }} className="will-change-transform">
        <MediaAsset id="gallery" index={i} alt={p.alt} ratio="21 / 9" mobileRatio="3 / 2" reveal="clip" rounded={false} sizes="100vw" />
      </motion.div>
    </div>
  )
}

export function GallerySection({ tone, title, intro, photos }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; title?: string; intro?: string; photos: StoryPhoto[] }) {
  // the one drifting picture on the site: the first full-bleed photo
  const driftAt = photos.findIndex((_, i) => i % 3 === 2)
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="section-pad">
      <div className="frame">
        {title && (
          <div data-fade className="grid gap-4 md:grid-cols-12 md:gap-x-(--gutter)">
            <h2 className="type-heading md:col-span-5">{title}</h2>
            {intro && <p className="type-body max-w-[44ch] text-(--color-muted) md:col-span-5 md:col-start-8">{intro}</p>}
          </div>
        )}
        {photos.length === 0 && <p className="type-body mt-10 text-(--color-muted)">The log is drying out on the quay. New photos after the next dive.</p>}
        <ol className="mt-14 space-y-[clamp(72px,10vw,160px)] md:mt-20">
          {photos.map((p, i) => {
            const beat = i % 3 // 0: photo 7 / text 5 · 1: text 5 / photo 7 · 2: full-bleed
            if (beat === 2) {
              return (
                <li key={i} className="mx-[calc(50%-50vw)]">
                  {i === driftAt ? <Drift i={i} p={p} /> : <MediaAsset id="gallery" index={i} alt={p.alt} ratio="21 / 9" mobileRatio="3 / 2" reveal="clip" rounded={false} sizes="100vw" />}
                  <div data-fade className="mx-auto mt-6 grid max-w-(--container) px-(--gutter) md:mt-8 md:grid-cols-12 md:gap-x-(--gutter)">
                    <div className="md:col-span-5 md:col-start-8"><Log p={p} /></div>
                  </div>
                </li>
              )
            }
            const photoFirst = beat === 0
            return (
              <li key={i} className="grid gap-6 md:grid-cols-12 md:items-end md:gap-x-(--gutter)">
                <div className={cn('md:row-start-1', photoFirst ? 'md:col-span-7' : 'md:col-span-7 md:col-start-6')}>
                  <MediaAsset id="gallery" index={i} alt={p.alt} ratio="var(--ratio-media)" reveal="clip" sizes="(min-width: 768px) 56vw, 100vw" />
                </div>
                <div data-fade className={cn('md:row-start-1', photoFirst ? 'md:col-span-4 md:col-start-9' : 'md:col-span-4 md:col-start-1')}>
                  <Log p={p} />
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
