import type { ElementType } from 'react'
// OpusKit section — Product Highlight: one product (or feature) in depth — large media and 3–4 real details.
export function ProductHighlightSection({ link: L = 'a', name, text, image, alt, details, action }: { link?: ElementType; name: string; text: string; image: string; alt: string; details: { label: string; value: string }[]; action: { label: string; href: string } }) {
  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 md:grid-cols-12">
        <img src={image} alt={alt} loading="lazy" className="aspect-square w-full rounded-(--radius-media) bg-(--color-surface) object-cover md:col-span-7" />
        <div className="md:col-span-4 md:col-start-9">
          <h2 className="type-display [font-size:clamp(2.2rem,4.5vw,4rem)]">{name}</h2>
          <p className="type-body mt-4 text-(--color-muted)">{text}</p>
          <dl className="mt-8 divide-y divide-(--color-border) border-y border-(--color-border)">
            {details.map((d) => <div key={d.label} className="flex justify-between gap-4 py-3"><dt className="type-utility text-(--color-muted)">{d.label}</dt><dd className="type-body text-right">{d.value}</dd></div>)}
          </dl>
          <L href={action.href} className="type-body mt-8 inline-block rounded-(--radius-button) bg-(--color-primary) px-6 py-3 text-(--color-background)">{action.label}</L>
        </div>
      </div>
    </section>
  )
}
