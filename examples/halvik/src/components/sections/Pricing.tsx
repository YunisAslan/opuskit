import type { ElementType, ReactNode } from 'react'
import { Badge } from '@/components/ui/badge'
// OpusKit section — Pricing: 2–3 plans side by side, one recommended, everything each includes in plain words.
// Mobile: stacked, recommended first. `aside` sits beside the title (here: the Dial switch).
export type Plan = { name: string; price: string; period?: string; line?: string; features: string[]; action: { label: string; href: string }; recommended?: boolean }

export function PricingSection({ link: L = 'a', title, aside, plans, note, id }: { link?: ElementType; title: ReactNode; aside?: ReactNode; plans: Plan[]; note?: string; id?: string }) {
  return (
    <section id={id} className="scroll-mt-24 px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-wrap items-end justify-between gap-6">{typeof title === 'string' ? <h2 className="type-heading">{title}</h2> : title}{aside}</div>
        <ul className="mt-12 grid gap-6 md:grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]">
          {plans.map((p) => (
            <li key={p.name} className={`flex flex-col rounded-(--radius-card) border bg-(--color-surface) p-7 shadow-(--shadow-card) ${p.recommended ? 'max-md:order-first border-(--color-accent) ring-1 ring-(--color-accent)' : 'border-(--color-border)'}`}>
              <div className="flex items-baseline justify-between gap-3"><h3 className="type-heading [font-size:1.3rem]">{p.name}</h3>{p.recommended && <Badge>Recommended</Badge>}</div>
              {p.line && <p className="type-body mt-2 text-(--color-muted)">{p.line}</p>}
              <p className="mt-6"><span className="type-display [font-size:clamp(2.5rem,4vw,3.5rem)]">{p.price}</span>{p.period && <span className="type-body text-(--color-muted)"> / {p.period}</span>}</p>
              <ul className="type-body mt-6 flex-1 space-y-2">{p.features.map((f) => <li key={f} className="border-t border-(--color-border) pt-2">{f}</li>)}</ul>
              <L href={p.action.href} className={`type-body mt-8 flex min-h-11 items-center justify-center rounded-(--radius-button) px-5 py-3 text-center transition-colors duration-150 ${p.recommended ? 'bg-(--color-primary) text-(--color-background) hover:bg-(--color-muted)' : 'border border-(--color-text) hover:bg-(--color-background)'}`}>{p.action.label}</L>
            </li>
          ))}
        </ul>
        {note && <p className="type-utility mt-8 text-(--color-muted)">{note}</p>}
      </div>
    </section>
  )
}
