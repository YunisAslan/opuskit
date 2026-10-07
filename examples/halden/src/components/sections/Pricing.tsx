'use client'
// Pricing — Cards, made Halden's own (shadcn Card + Badge, restyled to the tokens): the plans side by side, the
// recommended one outlined in the text colour and marked; everything each includes in plain words. Phones: stacked,
// the recommended plan first.
import Link from 'next/link'
import type { ElementType } from 'react'
import { Lines, Reveal } from '@/components/motion/Reveal'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { STAGGER } from '@/lib/motion'

export type Plan = { name: string; price: string; period?: string; line?: string; features: readonly string[]; action: { label: string; href: string }; recommended?: boolean }

export function PricingSection({ tone, link: L = Link, title, plans, note, recommended = 'Recommended' }: {
  tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; link?: ElementType; title: string; plans: readonly Plan[]; note?: string; recommended?: string
}) {
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <Lines lines={[title]} className="type-heading" />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal as="li" key={p.name} delay={0.2 + i * STAGGER} className={`flex ${p.recommended ? 'max-md:order-first' : ''}`}>
              <Card className={`w-full gap-0 rounded-(--radius-card) bg-(--color-surface) py-0 text-(--color-text) shadow-(--shadow-card) ring-0 ${p.recommended ? 'border border-(--color-text)' : 'border border-(--color-border)'}`}>
                <CardHeader className="gap-0 px-8 pt-8">
                  <div className="flex min-h-7 items-center justify-between gap-3">
                    <h3 className="type-title">{p.name}</h3>
                    {p.recommended && <Badge className="type-utility h-7 rounded-none bg-(--color-text) px-3 text-(--color-background)">{recommended}</Badge>}
                  </div>
                  {p.line && <p className="type-body mt-2 text-(--color-muted)">{p.line}</p>}
                </CardHeader>
                <CardContent className="flex flex-1 flex-col px-8 pt-10">
                  <p className="flex items-baseline gap-3">
                    <span className="type-display [font-size:clamp(3rem,5vw,4.5rem)]">{p.price}</span>
                    {p.period && <span className="type-utility text-(--color-muted)">{p.period}</span>}
                  </p>
                  <ul className="type-body mt-8 flex-1">
                    {p.features.map((f) => <li key={f} className="border-t border-(--color-border) py-3">{f}</li>)}
                  </ul>
                </CardContent>
                <CardFooter className="border-0 bg-transparent px-8 pt-4 pb-8">
                  <L href={p.action.href} className={`btn w-full ${p.recommended ? 'btn-solid' : 'btn-line'}`}>{p.action.label}</L>
                </CardFooter>
              </Card>
            </Reveal>
          ))}
        </ul>
        {note && <p className="type-utility mt-8 text-(--color-muted)">{note}</p>}
      </div>
    </section>
  )
}
