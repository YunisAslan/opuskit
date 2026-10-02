import type { ElementType, ReactNode } from 'react'
import { MediaAsset } from '@/components/MediaAsset'
import { UnderlineFill } from '@/components/pieces/UnderlineFill'
import type { AssetKey } from '@/config/assets'
// OpusKit section — Feature rows: one capability or offer per row, picture beside words, sides alternating on desktop.
// Each row fades and rises as it arrives; its photo opens like a curtain. Mobile: media first, then the words.
export function FeatureRowsSection({ link, title, rows }: { link?: ElementType; title?: ReactNode; rows: { name: string; text: string; image?: AssetKey; imageClassName?: string; link?: { label: string; href: string } }[] }) {
  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        {title && (typeof title === 'string' ? <h2 className="type-heading mb-16 max-w-[24ch] md:mb-24">{title}</h2> : <div className="mb-16 md:mb-24">{title}</div>)}
        <ul className="space-y-20 md:space-y-32">
          {rows.map((r, i) => (
            <li key={r.name} data-reveal="" className="grid items-center gap-8 md:grid-cols-12 md:gap-10">
              {r.image && <MediaAsset id={r.image} reveal="clip" sizes="(min-width: 768px) 58vw, 100vw" frameClassName={`aspect-[4/3] w-full md:col-span-7 ${i % 2 ? 'md:order-2 md:col-start-6' : ''}`} className={r.imageClassName} />}
              <div className={!r.image ? 'md:col-span-8' : i % 2 ? 'md:order-1 md:col-span-4 md:col-start-1' : 'md:col-span-4 md:col-start-9'}>
                <h3 className="type-heading text-balance [font-size:clamp(1.5rem,2.6vw,2.4rem)]">{r.name}</h3>
                <p className="type-body mt-4 max-w-[46ch] text-(--color-muted)">{r.text}</p>
                {r.link && <UnderlineFill link={link} href={r.link.href} className="type-body mt-6">{r.link.label}</UnderlineFill>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
