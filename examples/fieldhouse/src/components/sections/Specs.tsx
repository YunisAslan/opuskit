import { Lines, Reveal } from '@/components/motion'
// Specs — table: one ruled line per fact, the name on the left and the value on the right. Keeps two columns on phones.
export type Spec = { label: string; value: string }
export function SpecsSection({ id, title, text, specs, note }: { id?: string; title: string; text?: string; specs: Spec[]; note?: string }) {
  return (
    <section id={id} className="section-y px-(--gutter)">
      <div className="mx-auto grid max-w-(--container) gap-x-8 gap-y-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <Lines lines={[title]} className="type-heading" />
          {text && <p className="type-body mt-4 max-w-[34ch] text-(--color-muted)">{text}</p>}
        </div>
        <Reveal className="md:col-span-7 md:col-start-6">
          <dl className="border-t border-(--color-text)">
            {specs.map((s) => (
              <div key={s.label} className="grid grid-cols-[minmax(7rem,1fr)_2fr] gap-6 border-b border-(--color-border) py-4">
                <dt className="type-body text-(--color-muted)">{s.label}</dt>
                <dd className="type-body">{s.value}</dd>
              </div>
            ))}
          </dl>
          {note && <p className="type-utility mt-6 text-(--color-muted)">{note}</p>}
        </Reveal>
      </div>
    </section>
  )
}
