// Featured Work — one per row, shown as a photo story: photo / text pairs that alternate sides on the 12-column grid,
// their widths varied so the rhythm never repeats twice in a row (7/5, then 5/7, then one full-bleed band cropped wide,
// then 7/5 again). Each pair arrives together — the picture cuts in first, its words follow — and the picture drifts a
// little slower than the page (±4%, pictures only). Phones: photo then words, every photo full width, order kept.
import type { ElementType } from 'react'
import { MediaAsset } from '@/components/MediaAsset'
import { asset } from '@/config/assets'
import { After, Cut } from '@/components/motion/Reveal'
import { cn } from '@/lib/utils'

export type Project = { title: string; kind: string; year: string; line: string; href: string; image: number; action: string }

const RHYTHM = ['left', 'right', 'band', 'left'] as const

export function FeaturedWorkSection({ link: L = 'a', projects }: { link?: ElementType; projects: Project[] }) {
  return (
    <section className="py-(--section-y)">
      <ul className="space-y-24 md:space-y-40">
        {projects.map((p, i) => {
          const shape = RHYTHM[i % RHYTHM.length]
          const caption = asset('featuredWork', p.image).caption
          const cap = caption && <figcaption className="type-caption mt-3 text-(--color-muted)">{caption}</figcaption>
          const words = (
            <After delay={0.45} className="min-w-0">
              <p className="type-utility text-(--color-muted)">{p.kind}, {p.year.toLowerCase()}</p>
              <h3 className="type-display mt-3 text-[clamp(3rem,5.6vw,5.5rem)]">{p.title}</h3>
              <p className="type-body mt-5 max-w-[42ch] text-(--color-muted)">{p.line}</p>
              <L href={p.href} className="press link-line type-utility mt-6 inline-block text-base">{p.action}</L>
            </After>
          )
          if (shape === 'band') return (
            <li key={p.href + i}>
              <figure>
                <Cut from="below" className="parallax aspect-[4/3] md:aspect-[2.39/1]">
                  <MediaAsset id="featuredWork" index={p.image} fill sizes="100vw" className="h-full w-full" />
                </Cut>
                <div className="mx-auto max-w-(--container) px-(--gutter) md:text-right">{cap}</div>
              </figure>
              <div className="mx-auto mt-10 grid max-w-(--container) px-(--gutter) md:grid-cols-12 md:gap-6">
                <div className="md:col-span-6 md:col-start-2">{words}</div>
              </div>
            </li>
          )
          return (
            <li key={p.href + i} className="mx-auto max-w-(--container) px-(--gutter)">
              <div className="grid gap-8 md:grid-cols-12 md:items-end md:gap-6">
                <figure className={cn(shape === 'left' ? 'md:col-span-7' : 'md:order-2 md:col-span-7 md:col-start-6')}>
                  <Cut className="parallax aspect-[3/2]">
                    <MediaAsset id="featuredWork" index={p.image} fill sizes="(min-width: 768px) 58vw, 100vw" className="h-full w-full" />
                  </Cut>
                  {cap}
                </figure>
                <div className={cn(shape === 'left' ? 'md:col-span-4 md:col-start-9' : 'md:order-1 md:col-span-4 md:col-start-1')}>{words}</div>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
