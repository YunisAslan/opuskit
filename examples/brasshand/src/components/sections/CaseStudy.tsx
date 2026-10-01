import type { ElementType } from 'react'
// OpusKit section — Case Study preview: one project in depth — wide media, facts, then problem / approach / result.
export function CaseStudySection({ link: L = 'a', title, image, alt, facts, paragraphs, href }: { link?: ElementType; title: string; image: string; alt: string; facts: { label: string; value: string }[]; paragraphs: string[]; href?: string }) {
  return (
    <section className="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <img src={image} alt={alt} loading="lazy" className="aspect-[21/9] w-full rounded-(--radius-media) object-cover" />
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="type-heading">{title}</h2>
            <dl className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-1">
              {facts.map((f) => <div key={f.label}><dt className="type-utility text-(--color-muted)">{f.label}</dt><dd className="type-body mt-1">{f.value}</dd></div>)}
            </dl>
          </div>
          <div className="type-body space-y-5 md:col-span-7 md:col-start-6">
            {paragraphs.map((p, i) => <p key={i} className="max-w-[62ch]">{p}</p>)}
            {href && <L href={href} className="inline-flex min-h-11 items-center underline underline-offset-4">Read the full case study</L>}
          </div>
        </div>
      </div>
    </section>
  )
}
