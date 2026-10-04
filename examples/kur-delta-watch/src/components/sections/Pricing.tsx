import type { ElementType, ReactNode } from 'react'
// OpusKit section — Pricing: 2–3 plans side by side, one recommended, everything each includes in plain words.
export type Plan = { name: string; price: string; period?: string; line?: string; features: string[]; action: { label: string; href: string }; recommended?: boolean }

// `head` sits between the title and the plans (the once/monthly tabs); `children` after them (the pledge form).
export function PricingSection({ link: L = 'a', id, title, plans, note, head, children }: { link?: ElementType; id?: string; title: string; plans: Plan[]; note?: string; head?: ReactNode; children?: ReactNode }) {
  return (
    <section id={id} className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="type-heading">{title}</h2>
        {head}
        <ul className="mt-12 grid gap-6 md:grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]">
          {plans.map((p) => (
            <li key={p.name} className={`flex flex-col rounded-(--radius-card) border-2 bg-(--color-surface) p-7 shadow-(--shadow-card) ${p.recommended ? 'border-(--color-text) bg-(--color-background)' : 'border-(--color-border)'}`}>
              <div className="flex items-baseline justify-between gap-3"><h3 className="type-heading [font-size:1.3rem]">{p.name}</h3>{p.recommended && <span className="type-utility bg-(--color-accent) px-2 py-0.5 uppercase text-(--color-background)">Most chosen</span>}</div>
              {p.line && <p className="type-body mt-2 text-(--color-muted)">{p.line}</p>}
              <p className="mt-6"><span className="type-display tabular [font-size:clamp(2.5rem,4vw,3.5rem)]">{p.price}</span>{p.period && <span className="type-body text-(--color-muted)"> / {p.period}</span>}</p>
              <ul className="type-body mt-6 flex-1 space-y-2">{p.features.map((f) => <li key={f} className="border-t-2 border-(--color-border) pt-2">{f}</li>)}</ul>
              <L href={p.action.href} className={`type-utility mt-8 inline-flex min-h-12 items-center justify-center rounded-(--radius-button) px-5 text-center uppercase [font-size:1.05rem] border-2 border-(--color-border) shadow-(--shadow-card) transition-[transform,box-shadow] duration-150 active:translate-x-1 active:translate-y-1 active:shadow-none motion-reduce:active:translate-0 ${p.recommended ? 'bg-(--color-primary) text-(--color-background)' : 'bg-(--color-background)'}`}>{p.action.label}</L>
            </li>
          ))}
        </ul>
        {note && <p className="type-utility mt-8 text-(--color-muted)">{note}</p>}
        {children}
      </div>
    </section>
  )
}
