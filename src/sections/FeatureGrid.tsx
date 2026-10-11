// OpusKit section — Features: 3–6 capabilities in concrete language, each with a real visual when there is one.
// Three designs:
//   cells — ruled cells in a grid.
//   rows  — one ruled row per feature: the name large on the left, the line on the right; pictures left out.
//   bento — mixed sizes: the first feature wide with its picture, the rest in cells around it.
type Feature = { name: string; text: string; image?: string; alt?: string }
export function FeatureGridSection({ tone, variant = 'cells', title, features }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; variant?: 'cells' | 'rows' | 'bento'; title: string; features: Feature[] }) {
  const t = tone === 'ground' ? undefined : tone
  if (variant === 'rows') return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <h2 className="type-heading max-w-[24ch]">{title}</h2>
        <ul className="mt-12 border-t border-(--color-text)">
          {features.map((f) => (
            <li key={f.name} className="grid gap-3 border-b border-(--color-border) py-7 md:grid-cols-12 md:gap-8">
              <h3 className="type-display text-balance [font-size:clamp(1.5rem,3vw,2.6rem)] leading-[1.05] md:col-span-6">{f.name}</h3>
              <p className="type-body max-w-[52ch] text-(--color-muted) md:col-span-5 md:col-start-8 md:self-end">{f.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
  if (variant === 'bento') return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <h2 className="type-heading max-w-[24ch]">{title}</h2>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {features.map((f, i) => (
            <li key={f.name} className={`flex flex-col justify-between gap-6 rounded-(--radius-card) bg-(--color-surface) p-6 md:p-8 ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
              {f.image && i === 0 && <img src={f.image} alt={f.alt ?? ''} loading="lazy" className="aspect-(--ratio-media) w-full flex-1 rounded-(--radius-media) object-cover" />}
              <div><h3 className={`type-heading ${i === 0 ? '[font-size:clamp(1.4rem,2.4vw,2rem)]' : '[font-size:clamp(1.1rem,1.5vw,1.3rem)]'}`}>{f.name}</h3><p className="type-body mt-2 text-(--color-muted)">{f.text}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
  return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
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
