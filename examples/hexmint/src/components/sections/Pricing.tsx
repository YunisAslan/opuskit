import type { ComponentProps, ElementType, ReactNode } from 'react'
import { TextEffect } from '@/components/pieces/TextEffect'
import { ChapterLabel } from '@/components/site/ChapterLabel'
import { Badge } from '@/components/ui/badge'
// OpusKit section — Pricing: 2–3 plans side by side, one recommended (first when stacked on mobile), everything each
// includes in plain words. `controls` sits beside the title (the billing switch); `children` follow the plans.
export type Plan = { name: string; price: string; period?: string; line?: string; features: string[]; action: { label: string; href: string }; recommended?: boolean }

export function PricingSection({ link: L = 'a', title, label, plans, note, lead = false, controls, children }: { link?: ElementType<ComponentProps<'a'>>; title: string; label?: string; plans: Plan[]; note?: string; lead?: boolean; controls?: ReactNode; children?: ReactNode }) {
  return (
    <section className={`console-grid-soft px-6 md:pb-32 ${lead ? 'pt-40 pb-24 md:pt-48' : 'py-24 md:pt-32'}`}>
      <div className="mx-auto max-w-[1440px]">
        {label && <ChapterLabel className="mb-4">{label}</ChapterLabel>}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <TextEffect as={lead ? 'h1' : 'h2'} className={lead ? 'type-display max-w-[14ch]' : 'type-heading'}>{title}</TextEffect>
          {controls}
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {plans.map((p, i) => (
            <li key={p.name} data-reveal style={{ '--i': i } as React.CSSProperties} className={`flex flex-col rounded-(--radius-card) border bg-(--color-surface) p-7 shadow-(--shadow-card) ${p.recommended ? 'border-(--color-accent) max-md:order-first' : 'border-(--color-border)'}`}>
              <div className="flex items-center justify-between gap-3"><h3 className="type-heading [font-size:1.3rem]">{p.name}</h3>{p.recommended && <Badge className="type-utility h-6 bg-(--color-accent) px-2.5 text-(--color-background)">Recommended</Badge>}</div>
              {p.line && <p className="type-body mt-2 text-(--color-muted)">{p.line}</p>}
              <p className="mt-8"><span className="type-display tabular-nums [font-size:clamp(2.5rem,4vw,3.5rem)]">{p.price}</span>{p.period && <span className="type-body text-(--color-muted)"> / {p.period}</span>}</p>
              <ul className="type-body mt-6 flex-1 space-y-2">{p.features.map((f) => <li key={f} className="border-t border-(--color-border) pt-2">{f}</li>)}</ul>
              <L href={p.action.href} className={`type-body mt-8 flex min-h-12 items-center justify-center rounded-(--radius-button) px-5 font-medium transition-opacity duration-150 hover:opacity-90 ${p.recommended ? 'bg-(--color-primary) text-(--color-background)' : 'border border-(--color-text)'}`}>{p.action.label}</L>
            </li>
          ))}
        </ul>
        {note && <p className="type-utility mt-8 text-(--color-muted)">{note}</p>}
        {children}
      </div>
    </section>
  )
}
