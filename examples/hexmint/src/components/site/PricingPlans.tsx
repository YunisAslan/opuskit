'use client'
// Pricing with the billing switch (monthly / yearly) and the plan comparison table beneath the plans.
import { useId, useState } from 'react'
import { PricingSection } from '@/components/sections/Pricing'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { compare, plans } from '@/content/site'
import { SiteLink, START } from './SiteLink'

export function PricingPlans() {
  const [yearly, setYearly] = useState(true)
  const id = useId()
  return (
    <PricingSection lead link={SiteLink} label="// 01 Plans" title="Priced per studio, not per seat"
      note="Prices exclude VAT. Every plan starts with 30 days free, no card needed."
      plans={plans.map((p) => ({ name: p.name, line: p.line, features: p.features, recommended: p.recommended, price: yearly ? p.yearly : p.monthly, period: yearly ? 'month, billed yearly' : 'month', action: { label: 'Start free', href: START } }))}
      controls={
        <div className="flex min-h-11 items-center gap-3">
          <Label htmlFor={id} className="type-utility text-(--color-muted)">Monthly</Label>
          <Switch id={id} checked={yearly} onCheckedChange={setYearly} aria-label="Bill yearly" className="data-[size=default]:h-6 data-[size=default]:w-11 [&>span]:size-5" />
          <Label htmlFor={id} className="type-utility">Yearly</Label>
          <Badge variant="outline" className="type-utility h-6 border-(--color-border) px-2.5">2 months free</Badge>
        </div>
      }>
      <div className="mt-20">
        <h2 className="type-heading [font-size:clamp(1.25rem,2vw,1.6rem)]">Compare the plans</h2>
        <div className="mt-6 rounded-(--radius-card) border border-(--color-border) bg-(--color-background)" data-lenis-prevent-horizontal>
          <Table className="type-body tabular-nums">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="type-utility h-12 pl-6 text-(--color-muted)">Included</TableHead>
                {plans.map((p) => <TableHead key={p.name} className="type-utility h-12 text-right last:pr-6">{p.name}</TableHead>)}
              </TableRow>
            </TableHeader>
            <TableBody>
              {compare.map((c) => (
                <TableRow key={c.row} className="hover:bg-(--color-surface)">
                  <TableCell className="py-4 pl-6 text-(--color-muted)">{c.row}</TableCell>
                  {c.values.map((v, i) => <TableCell key={i} className="py-4 text-right last:pr-6">{v}</TableCell>)}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </PricingSection>
  )
}
