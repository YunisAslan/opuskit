import type { ElementType, ReactNode } from 'react'
import { Badge } from '@/components/ui/badge'
// OpusKit section — Pricing: 2–3 plans side by side, one recommended, everything each includes in plain words.
// Unboxed for this recipe: columns divided by hairlines; the recommended one carries the claret seal and leads on phones.
export type Plan = { name: string; price: string; period?: string; line?: string; features: string[]; action: { label: string; href: string }; recommended?: boolean }

export function PricingSection({ link: L = 'a', title, plans, note, control }: { link?: ElementType; title: string; plans: Plan[]; note?: string; /** e.g. a switch that changes the prices shown */ control?: ReactNode }) {
  return (
    <section className="px-[5vw] section-y">
      <div className="grid gap-x-[2vw] gap-y-6 md:grid-cols-12 md:items-end">
        <h2 className="type-heading md:col-span-5">{title}</h2>
        {control && <div className="md:col-span-5 md:col-start-8 md:justify-self-end">{control}</div>}
      </div>
      <ul className="mt-12 grid gap-12 md:grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] md:gap-[2vw]">
        {plans.map((p) => (
          <li key={p.name} className={`flex flex-col border-t border-(--color-text) pt-6 ${p.recommended ? 'order-first md:order-none' : ''}`}>
            <div className="flex items-baseline justify-between gap-3"><h3 className="type-heading [font-size:1.4rem]">{p.name}</h3>{p.recommended && <Badge variant="outline" className="type-utility h-6 border-(--color-accent) px-2.5 text-(--color-accent)">Start here</Badge>}</div>
            {p.line && <p className="type-body mt-2 text-(--color-muted)">{p.line}</p>}
            <p className="mt-6"><span className="type-display [font-size:clamp(2.5rem,4vw,3.5rem)]">{p.price}</span>{p.period && <span className="type-body text-(--color-muted)"> / {p.period}</span>}</p>
            <ul className="type-body mt-6 flex-1 space-y-2">{p.features.map((f) => <li key={f} className="border-t border-(--color-border) pt-2">{f}</li>)}</ul>
            <L href={p.action.href} className={`type-utility mt-8 inline-flex h-11 items-center justify-center rounded-(--radius-button) px-5 transition-colors duration-150 ${p.recommended ? 'bg-(--color-primary) text-(--color-background) hover:opacity-90' : 'border border-(--color-text) hover:bg-(--color-surface)'}`}>{p.action.label}</L>
          </li>
        ))}
      </ul>
      {note && <p className="type-utility mt-10 max-w-[70ch] text-(--color-muted)">{note}</p>}
    </section>
  )
}
