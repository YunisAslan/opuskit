import Link from 'next/link'
import { Cut } from '@/components/motion/Cut'
import { SectionHead } from '@/components/parts/SectionHead'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { cn } from '@/lib/utils'
// OpusKit section — Pricing, "cards": plans side by side, the recommended one outlined. Pip & Kiln: shadcn Cards on
// the surface; the recommended one in ink outline with a sticker; phones stack them with the recommended one first.
export type Plan = { name: string; price: string; period?: string; line?: string; features: string[]; action: { label: string; href: string }; recommended?: boolean }

export function PricingSection({ title, lines, plans, note, recommendedLabel }: { title: string; lines: string[]; plans: Plan[]; note?: string; recommendedLabel: string }) {
  return (
    <section id="pricing" className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <SectionHead text={title} lines={lines} line={note} />
        <Cut as="ul" className="mt-12 grid gap-(--gutter) md:mt-16 md:grid-cols-3 md:items-stretch">
          {plans.map((p) => (
            <li key={p.name} className={cn('flex', p.recommended && 'max-md:order-first md:-translate-y-6')}>
              <Card className={cn('w-full', p.recommended && 'border-(--color-text) shadow-[inset_0_0_0_1px_var(--color-text)]')}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="[font-size:clamp(1.3rem,1.8vw,1.6rem)]">{p.name}</CardTitle>
                    {p.recommended && <Badge variant="ink" className="-rotate-3">{recommendedLabel}</Badge>}
                  </div>
                  {p.line && <CardDescription className="text-(--color-text)">{p.line}</CardDescription>}
                  <p className="mt-4"><span className="t-price">{p.price}</span>{p.period && <span className="type-body"> per {p.period}</span>}</p>
                </CardHeader>
                <CardContent>
                  <ul className="type-body space-y-2">{p.features.map((f) => <li key={f} className="border-t border-(--color-text)/20 pt-2">{f}</li>)}</ul>
                </CardContent>
                <CardFooter className="pt-8">
                  <Link href={p.action.href} className={cn('btn w-full', p.recommended ? 'btn-ink' : 'btn-light')}>{p.action.label}</Link>
                </CardFooter>
              </Card>
            </li>
          ))}
        </Cut>
      </div>
    </section>
  )
}
