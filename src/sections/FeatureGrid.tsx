// OpusKit section — Features: 3–6 capabilities in concrete language, each with a real visual when there is one.
export function FeatureGridSection({ tone, title, features }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; title: string; features: { name: string; text: string; image?: string; alt?: string }[] }) {
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <h2 className="type-heading max-w-[24ch]">{title}</h2>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-(--radius-card) border border-(--color-border) bg-(--color-border) md:grid-cols-2 xl:grid-cols-3">
          {features.map((f) => (
            <li key={f.name} className="bg-(--color-background) p-6 md:p-8">
              {f.image && <img src={f.image} alt={f.alt ?? ''} loading="lazy" className="mb-6 aspect-(--ratio-media) w-full rounded-(--radius-media) object-cover" />}
              <h3 className="type-heading [font-size:clamp(1.15rem,1.6vw,1.4rem)]">{f.name}</h3>
              <p className="type-body mt-2 text-(--color-muted)">{f.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
