import type { ComponentProps, ElementType } from 'react'
import { TextEffect } from '@/components/pieces/TextEffect'
import { TextScramble } from '@/components/pieces/TextScramble'
import { ChapterLabel } from '@/components/site/ChapterLabel'
// OpusKit section — Feature rows: one capability or offer per row, picture beside words, sides alternating on desktop.
// Each row fades and rises on its own; its picture drifts slowly inside the frame (parallax, CSS only).
export function FeatureRowsSection({ link: L = 'a', title, label, rows }: { link?: ElementType<ComponentProps<'a'>>; title?: string; label?: string; rows: { name: string; text: string; label?: string; image?: string; alt?: string; link?: { label: string; href: string } }[] }) {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        {label && <ChapterLabel className="mb-4">{label}</ChapterLabel>}
        {title && <TextEffect as="h2" className="type-heading mb-16 max-w-[24ch] md:mb-24">{title}</TextEffect>}
        <ul className="space-y-20 md:space-y-32">
          {rows.map((r, i) => (
            <li key={r.name} data-reveal-group className="grid items-center gap-8 md:grid-cols-12 md:gap-10">
              {r.image && (
                <div data-reveal className={`parallax aspect-[4/3] w-full overflow-hidden rounded-(--radius-media) bg-(--color-surface) md:col-span-7 ${i % 2 ? 'md:order-2 md:col-start-6' : ''}`}>
                  <img src={r.image} alt={r.alt ?? ''} loading="lazy" width={1600} height={1200} className="size-full object-cover" />
                </div>
              )}
              <div data-reveal style={{ '--i': 1 } as React.CSSProperties} className={!r.image ? 'md:col-span-8' : i % 2 ? 'md:order-1 md:col-span-4 md:col-start-1' : 'md:col-span-4 md:col-start-9'}>
                {r.label && <ChapterLabel>{r.label}</ChapterLabel>}
                <h3 className="type-heading mt-3 text-balance [font-size:clamp(1.5rem,2.6vw,2.4rem)]">{r.name}</h3>
                <p className="type-body mt-4 max-w-[46ch] text-(--color-muted)">{r.text}</p>
                {r.link && <L href={r.link.href} className="type-body mt-6 inline-flex min-h-11 items-center underline underline-offset-4 decoration-(--color-border) transition-colors duration-150 hover:decoration-(--color-text)"><TextScramble>{r.link.label}</TextScramble></L>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
