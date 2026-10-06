// OpusKit section — Trust strip: 3–5 short promises (shipping, returns, trial, guarantee) in one quiet row.
const COLS: Record<number, string> = { 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5' }

export function TrustSection({ tone, items }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; items: { title: string; text: string }[] }) {
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} aria-label="Our promises" className="px-(--gutter) py-[calc(var(--section-y)*0.6)]">
      <ul className={`mx-auto grid max-w-(--container) border-y border-(--color-border) sm:grid-cols-2 ${COLS[items.length] ?? 'lg:grid-cols-4'}`}>
        {items.map((t, i) => (
          <li key={t.title} className={`py-8 sm:px-6 lg:py-10 ${i ? 'border-t border-(--color-border) sm:border-t-0 lg:border-l' : 'sm:pl-0'}`}>
            <span aria-hidden className="block h-px w-6 bg-(--color-accent)" />
            <p className="type-heading mt-5 [font-size:clamp(1.15rem,1.7vw,1.45rem)]">{t.title}</p>
            <p className="type-body mt-2 max-w-[30ch] text-(--color-muted)">{t.text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
