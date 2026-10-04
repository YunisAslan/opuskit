import type { ComponentType, ReactNode } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
type LinkLike = 'a' | ComponentType<{ href: string; className?: string; children?: ReactNode; 'aria-current'?: 'page' }>
// OpusKit section — Pricing: 2–3 plans side by side, one recommended, everything each includes in plain words.
// Plans are shadcn Cards, outlined; only the recommended plan's action is filled. `controls` sit beside the title,
// `children` under the plans.
export type Plan = { name: string; price: string; period?: string; line?: string; features: string[]; action: { label: string; href: string }; recommended?: boolean; badge?: string }

export function PricingSection({ link: L = 'a', title, plans, note, controls, children }: { link?: LinkLike; title: string; plans: Plan[]; note?: string; controls?: ReactNode; children?: ReactNode }) {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="type-heading">{title}</h2>
          {controls}
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {plans.map((p) => (
            <li key={p.name} className="flex">
              <Card className={`w-full gap-6 ${p.recommended ? 'border-(--color-text)' : ''}`}>
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <CardTitle>{p.name}</CardTitle>
                    <span className="flex gap-2">
                      {p.recommended && <Badge variant="outline" className="border-(--color-text)">Recommended</Badge>}
                      {p.badge && <Badge variant="outline">{p.badge}</Badge>}
                    </span>
                  </div>
                  {p.line && <CardDescription>{p.line}</CardDescription>}
                </CardHeader>
                <CardContent className="flex-1">
                  <p><span className="type-display [font-size:clamp(2.5rem,4vw,3.5rem)]">{p.price}</span>{p.period && <span className="type-body text-(--color-muted)"> {p.period}</span>}</p>
                  <ul className="type-body mt-4 space-y-2">{p.features.map((f) => <li key={f} className="border-t border-(--color-border) pt-2">{f}</li>)}</ul>
                </CardContent>
                <CardFooter>
                  <L href={p.action.href} className={`type-utility inline-flex min-h-11 w-full items-center justify-center rounded-(--radius-button) px-5 text-[0.9375rem] transition-colors duration-150 ${p.recommended ? 'bg-(--color-primary) text-(--color-background) hover:bg-(--color-muted)' : 'border border-(--color-muted) hover:bg-(--color-surface)'}`}>{p.action.label}</L>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
        {note && <p className="type-utility mt-8 text-(--color-muted)">{note}</p>}
        {children}
      </div>
    </section>
  )
}
