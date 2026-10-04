import type { ElementType, ReactNode } from 'react'
// OpusKit section — Product Highlight: one product (or feature) in depth — large media and 3–4 real details.
export function ProductHighlightSection({ link: L = 'a', level: H = 'h2', top, name, text, image, alt, details, action, note }: { link?: ElementType; level?: 'h1' | 'h2'; top?: ReactNode; name: ReactNode; text: string; image: string; alt: string; details: { label: string; value: ReactNode }[]; action?: { label: string; href: string }; note?: ReactNode }) {
  return (
    <section className="px-5 pb-30 pt-10 md:px-10 md:pb-40 md:pt-14">
      <div className="mx-auto max-w-[1440px]">
        {top && <div className="mb-10">{top}</div>}
        <div className="grid gap-12 md:grid-cols-12 md:items-end">
          <div className="overflow-hidden rounded-(--radius-media) bg-(--color-surface) md:col-span-7">
            <img data-reveal="clip" src={image} alt={alt} fetchPriority="high" className="aspect-[4/5] w-full object-cover md:aspect-[5/6]" />
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <H className="type-display flex flex-wrap items-center gap-x-5 gap-y-4 [font-size:clamp(3rem,6vw,6rem)] leading-[0.95]">{name}</H>
            <p className="type-body mt-6 text-(--color-muted)">{text}</p>
            <dl className="mt-8 divide-y divide-(--color-border) border-y border-(--color-border)">
              {details.map((d) => <div key={d.label} className="flex items-baseline justify-between gap-4 py-3"><dt className="type-utility text-(--color-muted)">{d.label}</dt><dd className="type-body text-right tabular-nums">{d.value}</dd></div>)}
            </dl>
            {action && <L href={action.href} className="type-body mt-8 inline-flex min-h-14 items-center rounded-(--radius-button) bg-(--color-primary) px-8 text-(--color-background) transition-opacity duration-150 hover:opacity-85 focus-visible:underline">{action.label}</L>}
            {note && <div className="type-utility mt-4 text-(--color-muted)">{note}</div>}
          </div>
        </div>
      </div>
    </section>
  )
}
