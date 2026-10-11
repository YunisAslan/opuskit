// OpusKit section — Trust strip: 3–5 short promises (shipping, returns, trial, guarantee). Three designs:
//   row       — one quiet ruled row, a short accent line over each promise.
//   statement — each promise's title set large, its line small under it, two to a row.
//   inline    — one compact band: title and line run together, in the small utility face.
const COLS: Record<number, string> = { 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5' }

export function TrustSection({ tone, variant = 'row', items }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; variant?: 'row' | 'statement' | 'inline'; items: { title: string; text: string }[] }) {
  const t = tone === 'ground' ? undefined : tone
  if (variant === 'statement') return (
    <section data-tone={t} aria-label="Our promises" className="px-(--gutter) py-(--section-y)">
      <ul className="mx-auto grid max-w-(--container) gap-x-10 gap-y-12 md:grid-cols-2">
        {items.map((it) => (
          <li key={it.title} className="border-t border-(--color-text) pt-6">
            <p className="type-display text-balance [font-size:clamp(1.8rem,4vw,3.4rem)] leading-[1.02]">{it.title}</p>
            <p className="type-body mt-3 max-w-[40ch] text-(--color-muted)">{it.text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
  if (variant === 'inline') return (
    <section data-tone={t} aria-label="Our promises" className="px-(--gutter) py-[calc(var(--section-y)*0.3)]">
      <ul className="mx-auto flex max-w-(--container) flex-wrap justify-center gap-x-10 gap-y-3 border-y border-(--color-border) py-5">
        {items.map((it) => <li key={it.title} className="type-utility"><span>{it.title}.</span> <span className="text-(--color-muted)">{it.text}</span></li>)}
      </ul>
    </section>
  )
  return (
    <section data-tone={t} aria-label="Our promises" className="px-(--gutter) py-[calc(var(--section-y)*0.6)]">
      <ul className={`mx-auto grid max-w-(--container) border-y border-(--color-border) sm:grid-cols-2 ${COLS[items.length] ?? 'lg:grid-cols-4'}`}>
        {items.map((it, i) => (
          <li key={it.title} className={`py-8 sm:px-6 lg:py-10 ${i ? 'border-t border-(--color-border) sm:border-t-0 lg:border-l' : 'sm:pl-0'}`}>
            <span aria-hidden className="block h-px w-6 bg-(--color-accent)" />
            <p className="type-heading mt-5 [font-size:clamp(1.15rem,1.7vw,1.45rem)]">{it.title}</p>
            <p className="type-body mt-2 max-w-[30ch] text-(--color-muted)">{it.text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
