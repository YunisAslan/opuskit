import type { ElementType } from 'react'
import { MediaAsset } from '@/components/media/MediaAsset'
import { Cut } from '@/components/motion/Cut'
import { SectionHead } from '@/components/parts/SectionHead'
// OpusKit section — Categories: tiles that show the range at a glance — a picture, a name and how many are inside.
// Pip & Kiln: four tall tiles, every other one dropped half a step so the row bounces; the count sits as a sticker.
type Item = { name: string; href: string; index: number; alt: string; count: string }

export function CategoriesSection({ link: L = 'a', title, lines, items }: { link?: ElementType; title: string; lines: string[]; items: Item[] }) {
  return (
    <section className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <SectionHead text={title} lines={lines} />
        <Cut as="ul" className="mt-12 grid grid-cols-2 gap-x-(--gutter) gap-y-10 md:mt-16 md:grid-cols-4">
          {items.map((c, i) => (
            <li key={c.name} className={i % 2 ? 'md:translate-y-16' : ''}>
              <L href={c.href} className="press focus-title group block">
                <MediaAsset id="categories" index={c.index} alt={c.alt} sizes="(min-width: 768px) 24vw, 46vw" className="rounded-(--radius-media)" imgClassName="transition-transform duration-500 ease-(--ease-out) group-hover:scale-[1.03]" />
                <div className="mt-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                  <h3 className="title t-card [font-size:clamp(1.3rem,2vw,1.75rem)] group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4">{c.name}</h3>
                  <span className="type-caption shrink-0 rounded-(--radius-button) border border-(--color-text) px-2.5 py-0.5">{c.count}</span>
                </div>
              </L>
            </li>
          ))}
        </Cut>
      </div>
    </section>
  )
}
