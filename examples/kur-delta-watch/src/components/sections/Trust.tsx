// OpusKit section — Trust strip: 3–5 short promises (shipping, returns, trial, guarantee) in one quiet row.
const COLS: Record<number, string> = { 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5' }

export function TrustSection({ items, label = 'Our promises' }: { items: { title: string; text: string }[]; label?: string }) {
  return (
    <section aria-label={label} className="px-5 py-12 md:px-10 md:py-16">
      <ul className={`mx-auto grid max-w-[1440px] gap-x-8 gap-y-6 border-y-2 border-(--color-border) py-8 sm:grid-cols-2 ${COLS[items.length] ?? 'lg:grid-cols-4'}`}>
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
