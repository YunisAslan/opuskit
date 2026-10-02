'use client'
// Pricing on Home: the three things Halvik sells, and one switch that adds the Dial to a keyboard at its bundle price.
import { useState } from 'react'
import { PricingSection } from '@/components/sections/Pricing'
import { Chapter } from '@/components/Chapter'
import { SiteLink } from '@/components/SiteLink'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { builds, dialAddOn, usd } from '@/config/product'

export function HomePricing() {
  const [dial, setDial] = useState(false)
  const plus = (n: number) => usd(n + (dial ? dialAddOn : 0))
  const withDial = dial ? ['Halvik Dial, 16 keys and 3 knobs'] : []
  return (
    <PricingSection id="pricing" link={SiteLink}
      title={<Chapter slot={{ className: 'size-10', rotate: 8 }} className="type-heading">Pick your Halvik</Chapter>}
      aside={
        <Label htmlFor="pricing-dial" className="flex min-h-11 cursor-pointer items-center gap-3 rounded-full border border-(--color-border) py-1.5 pl-4 pr-1.5">
          Add the Dial for {usd(dialAddOn)}<Switch id="pricing-dial" checked={dial} onCheckedChange={setDial} />
        </Label>
      }
      plans={[
        { name: builds.barebones.name, price: plus(builds.barebones.price), line: 'For people who already have favourite switches.', features: ['Aluminium case and cork base', 'Hot-swap board, USB-C', 'No switches or keycaps', ...withDial], action: { label: 'Choose Barebones', href: `#buy?build=barebones&dial=${dial ? 1 : 0}` } },
        { name: builds.complete.name, price: plus(builds.complete.price), line: 'Ready to type the day it arrives.', features: ['Everything in Barebones', '67 switches: linear, tactile or silent', 'Double-shot PBT keycaps, cream and grey', ...withDial], action: { label: 'Add to bag', href: `#buy?build=complete&dial=${dial ? 1 : 0}` }, recommended: true },
        { name: builds.dial.name, price: usd(builds.dial.price), line: 'The dial pad on its own, for any keyboard.', features: ['16 hot-swap keys, 3 aluminium knobs', 'Remap in the browser, no app', 'USB-C, brushed silver case'], action: { label: 'Choose the Dial', href: '#buy?build=dial' } },
      ]}
      note="Prices include VAT. Free shipping over $150, 30-day returns." />
  )
}
