import { Cut } from '@/components/motion/Cut'
// OpusKit section — Trust strip: 3–5 short promises (shipping, returns, trial, guarantee) in one quiet row between rules.
// Pip & Kiln: ink rules, the promise in Epilogue 800, a raspberry dash as the one signal. 4 → 2 → 1 columns.
const COLS: Record<number, string> = { 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5' }

export function TrustSection({ items }: { items: { title: string; text: string }[] }) {
  return (
    <section aria-label="Our promises" className="px-(--gutter) py-[calc(var(--section-y)*0.6)]">
      <Cut as="ul" className={`mx-auto grid max-w-(--container) border-y border-(--color-text) sm:grid-cols-2 ${COLS[items.length] ?? 'lg:grid-cols-4'}`}>
        {items.map((t, i) => (
          <li key={t.title} className={`py-8 sm:px-6 lg:py-10 ${i ? 'border-t border-(--color-text)/25 sm:border-t-0' : 'sm:pl-0'} ${i % 2 ? 'sm:border-l sm:border-(--color-text)/25' : ''} ${i >= 2 ? 'sm:border-t lg:border-t-0' : ''} ${i ? 'lg:border-l lg:border-(--color-text)/25' : ''}`}>
            <span aria-hidden className="block h-1 w-8 rounded-full bg-(--color-accent)" />
            <p className="t-card mt-5 [font-size:clamp(1.2rem,1.7vw,1.5rem)]">{t.title}</p>
            <p className="type-body mt-2 max-w-[30ch]">{t.text}</p>
          </li>
        ))}
      </Cut>
    </section>
  )
}
