// OpusKit section — Pricing, `cards`: plans side by side as cards, the recommended one outlined in the accent.
// Fitted to Raster School: each card takes four columns; the price is set in the display face;
// the start date sits beside the button (the recipe's CTA style); the free preview lesson is the quiet second action.
// On phones and tablets the plans stack, recommended first. `head` replaces the heading (the Enrol page's seat map);
// `children` sits between the head and the cards.
import type { ReactNode } from 'react'
import { Section, SectionHead } from '@/components/site/SectionHead'
import { ApplyButton } from '@/components/site/Apply'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Plan } from '@/content/course'

export function PricingSection({ tone, title, plans, note, preview, head, children, id }: {
  tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; variant?: 'cards'; title: string; plans: Plan[]; note?: string
  preview?: { label: string; href: string }; head?: ReactNode; children?: ReactNode; id?: string
}) {
  return (
    <Section tone={tone} id={id}>
      {head ?? <SectionHead title={title} aside={note} />}
      {children}
      <ul className="raster mt-10 gap-y-(--gutter) lg:mt-16">
        {plans.map((p) => (
          <li key={p.id} className={cn('col-span-4 sm:col-span-6 lg:col-span-4', p.recommended ? 'max-lg:order-first' : '')}>
            <Card className={cn('h-full p-6 lg:p-7', p.recommended && 'border-(--color-accent) outline outline-1 outline-(--color-accent)')}>
              <CardHeader>
                <div className="flex items-baseline justify-between gap-3">
                  <CardTitle className="[font-size:clamp(1.25rem,1.8vw,1.5rem)]">{p.name}</CardTitle>
                  {p.recommended && <Badge>Recommended</Badge>}
                </div>
                <p className="type-body text-(--color-muted)">{p.line}</p>
              </CardHeader>
              <p className="type-display mt-8 whitespace-nowrap [font-size:clamp(2.75rem,4.6vw,4.25rem)]">
                {p.price}
                {p.period && <span className="type-body text-(--color-muted)"> / {p.period}</span>}
              </p>
              <CardContent className="mt-8 flex-1">
                <ul className="type-body">
                  {p.features.map((f) => (
                    <li key={f} className="border-t border-(--color-border) py-2.5">{f}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-6 flex-row flex-wrap items-center justify-between gap-x-4 gap-y-3">
                <ApplyButton cohort={p.cohort} variant={p.recommended ? 'primary' : 'outline'}>Enrol</ApplyButton>
                <p className="type-utility">{p.start}</p>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
      {(head || preview) && (
        <div className="raster mt-8 gap-y-3">
          {head && note && <p className="type-body col-span-4 text-(--color-muted) sm:col-span-4 lg:col-span-6">{note}</p>}
          {preview && (
            <p className={cn('type-body col-span-4 sm:col-span-6', head ? 'lg:col-span-4 lg:col-start-9' : 'lg:col-span-6')}>
              Not sure yet? <a href={preview.href} className="link-line underline decoration-current">{preview.label}</a>
            </p>
          )}
        </div>
      )}
    </Section>
  )
}
