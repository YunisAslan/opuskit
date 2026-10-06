import type { ElementType } from 'react'
// OpusKit section — Case Study preview: one project in depth — media, facts, then problem / approach / result.
// `media`: full (a wide image first, the story under it), side (a tall image held beside the story) or over (the
// title and facts on the image, the story after).
type P = { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; media?: 'side' | 'full' | 'over'; link?: ElementType; title: string; image: string; alt: string; facts: { label: string; value: string }[]; paragraphs: string[]; href?: string }
export function CaseStudySection({ tone, media = 'full', link: L = 'a', title, image, alt, facts, paragraphs, href }: P) {
  const factList = (cls: string) => <dl className={cls}>{facts.map((f) => <div key={f.label}><dt className="type-utility text-(--color-muted)">{f.label}</dt><dd className="type-body mt-1">{f.value}</dd></div>)}</dl>
  const story = <div className="type-body space-y-5">{paragraphs.map((p, i) => <p key={i} className="max-w-[62ch]">{p}</p>)}{href && <L href={href} className="inline-block underline underline-offset-4">Read the full case study</L>}</div>
  if (media === 'over') return (
    <section data-tone={tone === 'ground' ? undefined : tone}>
      <div data-tone="inverse" className="relative isolate flex min-h-[85svh] items-end px-(--gutter) py-[calc(var(--section-y)*0.6)]">
        <img src={image} alt={alt} loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-55" />
        <div className="mx-auto grid w-full max-w-(--container) gap-8 md:grid-cols-12 md:items-end">
          <h2 className="type-display text-balance [font-size:clamp(2.4rem,6vw,5.5rem)] md:col-span-7">{title}</h2>
          {factList('grid grid-cols-2 gap-4 md:col-span-4 md:col-start-9')}
        </div>
      </div>
      <div className="mx-auto max-w-(--container) px-(--gutter) py-(--section-y)"><div className="md:ml-[33%]">{story}</div></div>
    </section>
  )
  if (media === 'side') return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto grid max-w-(--container) gap-10 md:grid-cols-12">
        <img src={image} alt={alt} loading="lazy" className="aspect-(--ratio-card) w-full rounded-(--radius-media) object-cover md:sticky md:top-24 md:col-span-5 md:self-start" />
        <div className="md:col-span-6 md:col-start-7">
          <h2 className="type-heading">{title}</h2>
          {factList('mt-6 grid grid-cols-2 gap-4 border-y border-(--color-border) py-6')}
          <div className="mt-8">{story}</div>
        </div>
      </div>
    </section>
  )
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <img src={image} alt={alt} loading="lazy" className="aspect-[21/9] w-full rounded-(--radius-media) object-cover" />
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4"><h2 className="type-heading">{title}</h2>{factList('mt-6 grid grid-cols-2 gap-4 md:grid-cols-1')}</div>
          <div className="md:col-span-7 md:col-start-6">{story}</div>
        </div>
      </div>
    </section>
  )
}
