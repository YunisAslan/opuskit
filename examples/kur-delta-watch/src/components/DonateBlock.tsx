'use client'
import { useState, type ReactNode } from 'react'
import { toast } from 'sonner'
import { Field, invalid } from '@/components/Field'
import { PricingSection } from '@/components/sections/Pricing'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { isEmail, submitForm } from '@/lib/submit'

type Freq = 'once' | 'monthly'
const GIFTS = [
  { amount: 10, name: 'A sack out', line: 'One sack of rubbish out of the reeds.', features: ['A heavy-duty sack and gloves', 'Its share of the skip and the truck', 'Weighed and logged with the rest'] },
  { amount: 45, name: 'A month of water tests', line: 'Six samples, tested in a lab in Baku.', features: ['Six sampling points, same day each month', 'Lab analysis for nine measures', 'Results published on the first Monday'], recommended: true },
  { amount: 120, name: 'A boat day', line: 'Two crews in the channels you can’t walk to.', features: ['Fuel for two boats for a day', 'The skipper’s day rate', 'Usually 400 to 700 kg out'] },
]

// Give once or monthly: three amounts that each say what they pay for, then the pledge form. The site is static and
// takes no card details — the pledge is collected and the payment link goes out by email.
export function DonateBlock() {
  const [freq, setFreq] = useState<Freq>('once')
  const [amount, setAmount] = useState('45')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sent, setSent] = useState<string | null>(null)
  const per = freq === 'monthly' ? ' a month' : ''

  // The plan buttons pick their amount and jump to the form (PricingSection renders them through `link`).
  const Pick = ({ href, className, children }: { href: string; className?: string; children: ReactNode }) => (
    <a href="#pledge" className={className} onClick={() => setAmount(href)}>{children}</a>
  )

  const freqToggle = (id: string) => (
    <ToggleGroup type="single" value={freq} onValueChange={(v) => v && setFreq(v as Freq)} aria-labelledby={id}>
      <ToggleGroupItem value="once">Give once</ToggleGroupItem>
      <ToggleGroupItem value="monthly">Give monthly</ToggleGroupItem>
    </ToggleGroup>
  )

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const name = String(f.get('name') ?? '').trim()
    const email = String(f.get('email') ?? '').trim()
    const other = String(f.get('other') ?? '').trim()
    const value = amount === 'other' ? other : amount
    const next: Record<string, string> = {}
    if (amount === 'other' && !(Number(other) >= 5)) next.other = 'Enter an amount of 5 AZN or more.'
    if (!name) next.name = 'Tell us your name, so we know who to thank.'
    if (!isEmail(email)) next.email = 'We need a working email to send the payment link.'
    setErrors(next)
    if (Object.keys(next).length) return
    try {
      await submitForm('pledge', { name, email, amount: value, frequency: freq, credit: f.get('credit') === 'on' })
      setSent(`Thank you, ${name}. We’ll email the payment link for ${value} AZN${per} to ${email} within one working day.`)
      toast('Pledge received', { description: 'Look out for an email from hello@kurdeltawatch.az.' })
    } catch {
      toast('That didn’t go through', { description: 'Please try again, or write to hello@kurdeltawatch.az.' })
    }
  }

  return (
    <PricingSection
      id="give"
      link={Pick}
      title="Pick what your gift does"
      head={<div className="mt-8 flex flex-wrap items-center gap-4"><span id="freq-top" className="sr-only">How often</span>{freqToggle('freq-top')}</div>}
      plans={GIFTS.map((g) => ({
        name: g.name, price: `${g.amount} AZN`, period: freq === 'monthly' ? 'month' : undefined, line: g.line, features: g.features,
        recommended: g.recommended, action: { label: `Give ${g.amount} AZN${per}`, href: String(g.amount) },
      }))}
      note="Any amount helps. A monthly gift lets us book the lab and the boats a season ahead."
    >
      <div id="pledge" className="mt-20 grid scroll-mt-24 gap-10 border-t-2 border-(--color-border) pt-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <h3 className="type-heading">Your pledge</h3>
          <p className="type-body mt-4 max-w-[36ch] text-(--color-muted)">We don’t take card details on this site. Leave your pledge here and we’ll email you a secure payment link from our bank within one working day.</p>
        </div>
        {sent ? (
          <p role="status" className="type-heading border-2 border-(--color-border) bg-(--color-surface) p-8 shadow-(--shadow-card) [font-size:clamp(1.3rem,2vw,1.75rem)] md:col-span-7 md:col-start-6">{sent}</p>
        ) : (
          <form noValidate onSubmit={onSubmit} className="grid gap-8 md:col-span-7 md:col-start-6">
            <div>
              <p id="freq-form" className="type-utility mb-2 text-(--color-muted)">How often</p>
              {freqToggle('freq-form')}
            </div>
            <div>
              <p id="amount-label" className="type-utility mb-2 text-(--color-muted)">Amount</p>
              <ToggleGroup type="single" value={amount} onValueChange={(v) => v && setAmount(v)} aria-labelledby="amount-label">
                {GIFTS.map((g) => <ToggleGroupItem key={g.amount} value={String(g.amount)} className="tabular">{g.amount} AZN</ToggleGroupItem>)}
                <ToggleGroupItem value="other">Other amount</ToggleGroupItem>
              </ToggleGroup>
              {amount === 'other' && (
                <Field id="other" label="Your amount in AZN" error={errors.other} className="mt-4 max-w-56">
                  <Input id="other" name="other" type="number" inputMode="numeric" min={5} step={1} {...invalid('other', errors.other)} />
                </Field>
              )}
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field id="name" label="Your name" error={errors.name}>
                <Input id="name" name="name" autoComplete="name" {...invalid('name', errors.name)} />
              </Field>
              <Field id="email" label="Email" error={errors.email}>
                <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" {...invalid('email', errors.email)} />
              </Field>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="credit" name="credit" />
              <Label htmlFor="credit" className="type-body font-normal">Put my name in the yearly report</Label>
            </div>
            <div>
              <Button type="submit" size="lg">Send my pledge</Button>
              <p className="type-utility mt-4 text-(--color-muted)">Nothing is charged now. The payment link comes by email.</p>
            </div>
          </form>
        )}
      </div>
    </PricingSection>
  )
}
