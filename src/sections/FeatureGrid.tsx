// OpusKit section — Features: 3–6 capabilities in concrete language, each with a real visual when there is one.
export function FeatureGridSection({ title, features }: { title: string; features: { name: string; text: string; image?: string; alt?: string }[] }) {
  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="type-heading max-w-[24ch]">{title}</h2>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-(--radius-card) border border-(--color-border) bg-(--color-border) md:grid-cols-2 xl:grid-cols-3">
          {features.map((f) => (
            <li key={f.name} className="bg-(--color-background) p-6 md:p-8">
              {f.image && <img src={f.image} alt={f.alt ?? ''} loading="lazy" className="mb-6 aspect-[16/10] w-full rounded-(--radius-media) object-cover" />}
              <h3 className="type-heading [font-size:clamp(1.15rem,1.6vw,1.4rem)]">{f.name}</h3>
              <p className="type-body mt-2 text-(--color-muted)">{f.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
