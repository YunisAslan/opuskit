import type { ElementType } from 'react'
// OpusKit section — Case Study preview: one project in depth. Desktop: the wide photo holds still (sticky) while the
// facts and the problem / approach / result text advance beside it, with a second detail photo arriving in the text.
// Phones: photo, facts under it, then the text. Sticky is layout, not motion, so reduced motion keeps it.
export function CaseStudySection({ link: L = 'a', title, image, alt, detail, facts, paragraphs, href }: { link?: ElementType; title: string; image: string; alt: string; detail?: { src: string; alt: string; caption?: string }; facts: { label: string; value: string }[]; paragraphs: string[]; href?: string }) {
  return (
    <section className="px-5 py-12 md:px-8">
      <div className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7">
          <img src={image} alt={alt} loading="lazy" width={2400} height={1351} className="aspect-[4/5] w-full rounded-media object-cover object-[20%_50%] md:sticky md:top-28 md:aspect-[4/3]" />
        </div>
        <div className="md:col-span-4 md:col-start-9 md:pt-[20svh]">
          <h2 className="type-heading">{title}</h2>
          <dl className="mt-8 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-(--color-border) pt-6">
            {facts.map((f) => <div key={f.label}><dt className="type-body text-(--color-muted)">{f.label}</dt><dd className="type-body mt-1">{f.value}</dd></div>)}
          </dl>
          <div className="type-body mt-12 space-y-8">
            {paragraphs.map((p, i) => (
              <div key={i}>
                <p className="max-w-[46ch]">{p}</p>
                {detail && i === 1 && (
                  <figure className="mt-8">
                    <img src={detail.src} alt={detail.alt} loading="lazy" width={2400} height={1677} className="aspect-[3/4] w-full rounded-media object-cover" />
                    {detail.caption && <figcaption className="type-body mt-3 text-(--color-muted)">{detail.caption}</figcaption>}
                  </figure>
                )}
              </div>
            ))}
            {href && <L href={href} className="inline-flex min-h-11 items-center underline decoration-1 underline-offset-4">Hear a piece of it</L>}
          </div>
        </div>
      </div>
    </section>
  )
}
