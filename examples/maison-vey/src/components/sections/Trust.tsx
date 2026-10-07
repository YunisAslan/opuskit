// OpusKit section — Trust strip: short promises in one quiet row between rules. Static by design.
// Fitted to Maison Vey: Bodoni at heading size for the promise, a plain line under it; no accent marks.
const COLS: Record<number, string> = { 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5' }

export function TrustSection({ tone, items }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; items: { title: string; text: string }[] }) {
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} aria-label="Our promises" className="px-(--gutter) py-(--section-y)">
      <ul className={`mx-auto grid max-w-(--container) border-y border-(--color-border) sm:grid-cols-2 ${COLS[items.length] ?? 'lg:grid-cols-4'}`}>
        {items.map((t, i) => (
          <li key={t.title} className={`py-10 sm:px-6 lg:py-12 ${i ? 'border-t border-(--color-border) sm:border-t-0' : ''} ${i % 2 ? 'sm:border-l' : 'sm:pl-0'} ${i > 1 ? 'sm:border-t lg:border-t-0' : ''} ${i ? 'lg:border-l lg:pl-6' : 'lg:pl-0'}`}>
            <p className="type-heading text-balance [font-size:clamp(1.5rem,2vw,1.75rem)]">{t.title}</p>
            <p className="type-body mt-3 max-w-[30ch] text-(--color-muted)">{t.text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
