// OpusKit section — Trust strip, fitted to Kelp Line: the four promises that matter before giving, in one quiet row
// between rules, each led by a short accent rule. Phones: two columns, then one.
const COLS: Record<number, string> = { 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5' }

export function TrustSection({ tone, items }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; items: { title: string; text: string }[] }) {
  if (!items.length) return null
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} aria-label="Our promises" className="band-pad">
      <ul className={`frame grid border-y border-(--color-border) sm:grid-cols-2 ${COLS[items.length] ?? 'lg:grid-cols-4'}`}>
        {items.map((t, i) => (
          <li key={t.title} data-fade style={{ ['--i' as string]: i }} className={`py-8 sm:px-6 lg:py-10 ${i ? 'border-t border-(--color-border) sm:border-t-0' : ''} ${i % 2 ? 'sm:border-l' : 'sm:pl-0'} ${i >= 2 ? 'sm:border-t lg:border-t-0' : ''} ${i ? 'lg:border-l lg:pl-6' : ''}`}>
            <span aria-hidden className="block h-px w-6 bg-(--color-accent)" />
            <h3 className="type-title mt-5">{t.title}</h3>
            <p className="type-body mt-2 max-w-[30ch] text-(--color-muted)">{t.text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
