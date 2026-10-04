// OpusKit section — Specs: the facts people check before deciding — a product's dimensions and materials, a property's
// rooms and area, a project's place, year and team. Two designs:
//   table — one ruled line per fact, the name on the left and the value on the right (exact, easy to scan).
//   grid  — each fact in its own cell, the value large and the name small under it (a few facts that matter).
export type Spec = { label: string; value: string }

export function SpecsSection({ tone, variant = 'table', title, text, specs, note }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; variant?: 'table' | 'grid'; title: string; text?: string; specs: Spec[]; note?: string }) {
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto grid max-w-(--container) gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <h2 className="type-heading">{title}</h2>
          {text && <p className="type-body mt-4 max-w-[40ch] text-(--color-muted)">{text}</p>}
        </div>
        <div className="md:col-span-8">
          {variant === 'grid' ? (
            <dl className="grid grid-cols-2 border-l border-t border-(--color-border) lg:grid-cols-3">
              {specs.map((s) => (
                <div key={s.label} className="flex flex-col border-b border-r border-(--color-border) p-5 md:p-6">
                  <dt className="type-utility order-2 mt-2 text-(--color-muted)">{s.label}</dt>
                  <dd className="type-heading order-1 [font-size:clamp(1.3rem,2.2vw,1.9rem)]">{s.value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <dl className="border-t border-(--color-text)">
              {specs.map((s) => (
                <div key={s.label} className="grid grid-cols-[minmax(8rem,1fr)_2fr] gap-6 border-b border-(--color-border) py-4">
                  <dt className="type-body text-(--color-muted)">{s.label}</dt>
                  <dd className="type-body">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}
          {note && <p className="type-utility mt-6 text-(--color-muted)">{note}</p>}
        </div>
      </div>
    </section>
  )
}
