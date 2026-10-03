import type { ElementType } from 'react'
import { Chapter } from '@/components/site/Motif'

// OpusKit section — Feature rows: one capability or offer per row, picture beside words, sides alternating on desktop.
// Each row rises in on its own; its picture opens like a curtain.
export function FeatureRowsSection({ link: L = 'a', title, rows }: { link?: ElementType; title?: string; rows: { name: string; text: string; image?: string; alt?: string; width?: number; height?: number; link?: { label: string; href: string } }[] }) {
  return (
    <section className="py-32 md:py-40">
      <div className="shell">
        {title && <Chapter className="mb-16 md:mb-24"><h2 className="type-heading max-w-[24ch]">{title}</h2></Chapter>}
        <ul className="space-y-24 md:space-y-40">
          {rows.map((r, i) => (
            <li key={r.name} data-reveal className="grid items-center gap-8 md:grid-cols-12 md:gap-6">
              {r.image && (
                <div data-clip className={`overflow-hidden rounded-(--radius-media) bg-(--color-surface) md:col-span-7 ${i % 2 ? 'md:order-2 md:col-start-6' : ''}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.image} alt={r.alt ?? ''} width={r.width} height={r.height} loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover md:aspect-[4/3]" />
                </div>
              )}
              <div className={!r.image ? 'md:col-span-8' : i % 2 ? 'md:order-1 md:col-span-4 md:col-start-1' : 'md:col-span-4 md:col-start-9'}>
                <h3 data-rise className="type-heading text-balance [font-size:clamp(1.5rem,2.6vw,2.2rem)]">{r.name}</h3>
                <p data-rise style={{ '--i': 1 } as React.CSSProperties} className="type-body mt-4 max-w-[46ch] text-(--color-muted)">{r.text}</p>
                {r.link && <L data-rise style={{ '--i': 2 }} href={r.link.href} className="type-body mt-6 inline-flex min-h-11 items-center underline decoration-current/40 underline-offset-[6px] transition-[text-decoration-color] duration-150 hover:decoration-current">{r.link.label}</L>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
