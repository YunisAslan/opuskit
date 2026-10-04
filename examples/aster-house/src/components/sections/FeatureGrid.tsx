import type { ReactNode } from 'react'
// OpusKit section — Features: 3–6 capabilities in concrete language, each with a real visual when there is one.
export function FeatureGridSection({ title, features }: { title: ReactNode; features: { name: string; text: string; image?: string; alt?: string }[] }) {
  return (
    <section className="px-5 py-30 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="type-display flex max-w-[20ch] items-center gap-5 [font-size:clamp(2.4rem,5vw,4.5rem)]">{title}</h2>
        <ul className="mt-16 grid gap-px overflow-hidden rounded-(--radius-card) border border-(--color-border) bg-(--color-border) md:grid-cols-2 xl:grid-cols-3">
          {features.map((f, i) => (
            <li key={f.name} data-reveal="rise" style={{ ['--i' as string]: i % 3 }} className="bg-(--color-background) p-6 md:p-8">
              {f.image && <img src={f.image} alt={f.alt ?? ''} loading="lazy" className="mb-6 aspect-[3/2] w-full rounded-(--radius-media) object-cover" />}
              <h3 className="type-heading [font-size:clamp(1.2rem,1.6vw,1.45rem)]">{f.name}</h3>
              <p className="type-body mt-2 text-(--color-muted)">{f.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
