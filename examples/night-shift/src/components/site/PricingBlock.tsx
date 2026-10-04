'use client'
import { useId, useState, type ReactNode } from 'react'
import { PricingSection } from '@/components/sections/Pricing'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ScrambleLink } from './ScrambleLink'
import { cohorts, plans, site } from '@/content/site'
import { shortDate } from '@/lib/status'

const HREF: Record<string, string> = { Seat: '#enrol', 'Seat and 1:1': '#enrol-1to1', Recordings: '#enrol-recordings' }

// Pricing with the instalment switch: in full, or three monthly payments.
export function PricingBlock({ title, children }: { title: string; children?: ReactNode }) {
  const [split, setSplit] = useState(false)
  const id = useId()
  const next = cohorts.find((c) => c.seatsLeft > 0) ?? cohorts[0]
  return (
    <PricingSection link={ScrambleLink} title={title}
      controls={
        <div className="flex min-h-11 items-center gap-3">
          <Switch id={id} checked={split} onCheckedChange={setSplit} />
          <Label htmlFor={id} className="type-utility cursor-pointer">Pay in three instalments</Label>
        </div>
      }
      plans={plans.map((p) => ({
        name: p.name, line: p.line, features: p.features, recommended: p.recommended,
        price: split && p.split ? p.split : p.full,
        period: split && p.split ? 'a month, three times' : p.name === 'Recordings' ? 'once' : 'per seat',
        badge: p.recommended ? `${next.seatsLeft} of ${site.seatsPerCohort} left` : undefined,
        action: { label: p.action, href: HREF[p.name] },
      }))}
      note={`Next cohort: ${next.n}, starting ${shortDate(next.start)}. Prices include VAT. Full refund until the second Tuesday.`}>
      {children}
    </PricingSection>
  )
}
