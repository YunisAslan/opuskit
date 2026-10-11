import type { ElementType } from 'react'
// OpusKit section — Pricing: 2–3 plans, one recommended, everything each includes in plain words. Two designs:
//   cards — plans side by side as cards, the recommended one outlined in the accent.
//   table — one ruled row per plan: name and line, price, what it includes, the action (calm, easy to compare).
export type Plan = { name: string; price: string; period?: string; line?: string; features: string[]; action: { label: string; href: string }; recommended?: boolean }

export function PricingSection({ tone, variant = 'cards', link: L = 'a', title, plans, note }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; variant?: 'cards' | 'table'; link?: ElementType; title: string; plans: Plan[]; note?: string }) {
  const t = tone === 'ground' ? undefined : tone
  const button = (p: Plan, extra = '') => <L href={p.action.href} className={`type-body rounded-(--radius-button) px-5 py-3 text-center ${p.recommended ? 'bg-(--color-primary) text-(--color-on-primary,var(--color-background))' : 'border border-(--color-text)'} ${extra}`}>{p.action.label}</L>
  return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <h2 className="type-heading">{title}</h2>
        {variant === 'table' ? (
          <ul className="mt-12 border-t border-(--color-text)">
            {plans.map((p) => (
              <li key={p.name} className="grid gap-6 border-b border-(--color-border) py-8 md:grid-cols-12 md:items-start">
                <div className="md:col-span-3">
                  <h3 className="type-heading [font-size:clamp(1.3rem,2vw,1.7rem)]">{p.name}</h3>
                  {p.recommended && <p className="type-utility mt-1 text-(--color-accent)">Recommended</p>}
                  {p.line && <p className="type-body mt-2 text-(--color-muted)">{p.line}</p>}
                </div>
                <p className="md:col-span-3"><span className="type-display [font-size:clamp(2.2rem,3.6vw,3.2rem)]">{p.price}</span>{p.period && <span className="type-body text-(--color-muted)"> / {p.period}</span>}</p>
                <ul className="type-body space-y-1 text-(--color-muted) md:col-span-4">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
                <div className="md:col-span-2 md:text-right">{button(p, 'inline-block')}</div>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mt-12 grid gap-6 md:grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]">
            {plans.map((p) => (
              <li key={p.name} className={`flex flex-col rounded-(--radius-card) border bg-(--color-surface) p-7 shadow-(--shadow-card) ${p.recommended ? 'border-(--color-accent) ring-1 ring-(--color-accent)' : 'border-(--color-border)'}`}>
                <div className="flex items-baseline justify-between gap-3"><h3 className="type-heading [font-size:1.3rem]">{p.name}</h3>{p.recommended && <span className="type-utility text-(--color-accent)">Recommended</span>}</div>
                {p.line && <p className="type-body mt-2 text-(--color-muted)">{p.line}</p>}
                <p className="mt-6"><span className="type-display [font-size:clamp(2.5rem,4vw,3.5rem)]">{p.price}</span>{p.period && <span className="type-body text-(--color-muted)"> / {p.period}</span>}</p>
                <ul className="type-body mt-6 flex-1 space-y-2">{p.features.map((f) => <li key={f} className="border-t border-(--color-border) pt-2">{f}</li>)}</ul>
                {button(p, 'mt-8')}
              </li>
            ))}
          </ul>
        )}
        {note && <p className="type-utility mt-8 text-(--color-muted)">{note}</p>}
      </div>
    </section>
  )
}
