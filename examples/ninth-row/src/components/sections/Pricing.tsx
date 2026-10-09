// Pricing — cards: plans side by side, the recommended one outlined in bone and set in the middle; on phones the plans
// stack with the recommended first. Prices are compared, so nothing here moves for style.
import type { ElementType } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export type Plan = { name: string; price: string; period?: string; line?: string; features: string[]; recommended?: boolean }

export function PricingSection({ id, link: L = 'a', title, plans, note, recommendedLabel, action, href }: { id?: string; link?: ElementType; title: string; plans: Plan[]; note?: string; recommendedLabel: string; action: string; href: string }) {
  const middle = Math.floor(plans.length / 2)
  return (
    <section id={id} className="scroll-mt-16 px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <div className="grid gap-4 md:grid-cols-12 md:items-end md:gap-6">
          <h2 className="type-heading md:col-span-6">{title}</h2>
          {note && <p className="type-body text-(--color-muted) md:col-span-5 md:col-start-8">{note}</p>}
        </div>
        <ul className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3">
          {plans.map((p, i) => {
            // recommended plans come first in the data (first on phones); on wide screens they take the middle
            const order = p.recommended ? middle : i <= middle ? i - 1 : i
            return (
              <li key={p.name} style={{ ['--o' as string]: order }} className="md:order-(--o)">
                <Card className={cn('h-full', p.recommended && 'border-(--color-text)')}>
                  <CardHeader>
                    <div className="flex min-h-6 items-baseline justify-between gap-3">
                      <CardTitle className="text-[clamp(1.4rem,2vw,1.75rem)]">{p.name}</CardTitle>
                      {p.recommended && <Badge>{recommendedLabel}</Badge>}
                    </div>
                    {p.line && <CardDescription>{p.line}</CardDescription>}
                    <p className="mt-6 flex items-baseline gap-3">
                      <span className="type-display text-[clamp(4rem,6vw,5.5rem)] tabular-nums">{p.price}</span>
                      {p.period && <span className="type-utility text-base text-(--color-muted)">{p.period}</span>}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="type-body">{p.features.map((f) => <li key={f} className="border-t border-(--color-border) py-3">{f}</li>)}</ul>
                  </CardContent>
                  <CardFooter>
                    <L href={href} className={cn('btn w-full', p.recommended ? 'btn-solid' : 'btn-line')}>{action} {p.name}</L>
                  </CardFooter>
                </Card>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
