// OpusKit section — Trust strip: 3–5 short promises (shipping, returns, trial, guarantee) in one quiet row.
const COLS: Record<number, string> = { 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5' }

export function TrustSection({ tone, items }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; items: { title: string; text: string }[] }) {
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} aria-label="Our promises" className="px-(--gutter) py-[calc(var(--section-y)*0.45)]">
      <ul className={`mx-auto grid max-w-(--container) gap-x-8 gap-y-6 border-y border-(--color-border) py-8 sm:grid-cols-2 ${COLS[items.length] ?? 'lg:grid-cols-4'}`}>
        {items.map((t) => (
          <li key={t.title}>
            <span aria-hidden className="mb-3 block size-1.5 rounded-full bg-(--color-accent)" />
            <p className="type-heading [font-size:clamp(1rem,1.3vw,1.15rem)]">{t.title}</p>
            <p className="type-utility mt-1 text-(--color-muted)">{t.text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
