'use client'
// The pledge form (Donate): once or monthly and the amount as shadcn ToggleGroups, name, email, Gift Aid, and one
// button that hands off to the payment page. Donate's remembered moment lives here — "What your gift plants": the
// sentence under the amounts says, in place, how many plants this gift puts in the water; the number changes without
// moving anything (fixed-width figures, a 200ms cross-fade; instant when motion is reduced).
// No payment page is connected yet (content: donate.paymentUrl), so the pledge goes to the charity by email instead —
// and the form says so plainly. It never pretends a card was charged.
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { donate, site } from '@/content/site'
import { number, pounds } from '@/lib/utils'
import { SendButton, useSend } from './SendButton'

export type Frequency = 'once' | 'monthly'

const schema = z.object({
  name: z.string().trim().min(1, 'Add your name, so we can thank you.'),
  email: z.string().trim().min(1, 'Add your email for the receipt.').email('That email address looks incomplete.'),
  giftAid: z.boolean(),
})

export function plantsFor(amount: number, frequency: Frequency, giftAid: boolean) {
  const yearly = amount * (frequency === 'monthly' ? 12 : 1) * (giftAid ? 1.25 : 1)
  return Math.round((yearly * donate.plantsPerPound) / 10) * 10
}

export function PledgeForm({ amount, setAmount, other, setOther, frequency, setFrequency }: {
  amount: number | 'other'; setAmount: (a: number | 'other') => void; other: string; setOther: (v: string) => void
  frequency: Frequency; setFrequency: (f: Frequency) => void
}) {
  const reduce = useReducedMotion()
  const f = donate.form
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), defaultValues: { name: '', email: '', giftAid: false } })
  const giftAid = form.watch('giftAid')
  const send = useSend()
  const value = amount === 'other' ? Math.max(0, Math.floor(Number(other.replace(/[^\d.]/g, '')) || 0)) : amount
  const otherError = amount === 'other' && value > 0 && value < 2 ? 'The smallest gift we can take online is £2.' : null
  const plants = plantsFor(value, frequency, giftAid)

  const submit = form.handleSubmit((d) => {
    if (!value || otherError) { document.getElementById('other-amount')?.focus(); return }
    return send.run(() => {
      const params = new URLSearchParams({ amount: String(value), frequency, giftaid: d.giftAid ? 'yes' : 'no', name: d.name, email: d.email })
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- the payment page is the owner’s external service
      if (donate.paymentUrl) { window.location.assign(`${donate.paymentUrl}?${params}`); return }
      const body = [
        `I would like to give ${pounds(value)} ${frequency === 'monthly' ? 'every month' : 'once'}.`,
        `Name: ${d.name}`, `Email: ${d.email}`, `Gift Aid: ${d.giftAid ? 'yes, I am a UK taxpayer' : 'no'}`,
        '', 'Please send me the payment link.',
      ].join('\n')
      window.location.assign(`mailto:${site.email}?subject=${encodeURIComponent(`Pledge: ${pounds(value)} ${frequency}`)}&body=${encodeURIComponent(body)}`)
    })
  })

  return (
    <Form {...form}>
      <form noValidate onSubmit={submit} aria-labelledby="pledge-title" className="space-y-7">
        <h2 id="pledge-title" className="type-title">{f.title}</h2>

        <div className="space-y-3">
          <Label id="freq-label">How often</Label>
          <ToggleGroup type="single" aria-labelledby="freq-label" value={frequency} onValueChange={(v) => v && setFrequency(v as Frequency)}>
            <ToggleGroupItem value="once">{f.once}</ToggleGroupItem>
            <ToggleGroupItem value="monthly">{f.monthly}</ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="space-y-3">
          <Label id="amount-label">Amount</Label>
          <ToggleGroup type="single" aria-labelledby="amount-label" className="grid grid-cols-3" value={String(amount)} onValueChange={(v) => v && setAmount(v === 'other' ? 'other' : Number(v))}>
            {donate.gifts.map((g) => <ToggleGroupItem key={g.amount} value={String(g.amount)}>{pounds(g.amount)}</ToggleGroupItem>)}
            <ToggleGroupItem value="other" className="col-span-2">{f.other}</ToggleGroupItem>
          </ToggleGroup>
          {amount === 'other' && (
            <div className="space-y-2 pt-1">
              <Label htmlFor="other-amount">Your amount in pounds</Label>
              <div className="relative">
                <span aria-hidden className="type-body pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-(--color-muted)">£</span>
                <Input id="other-amount" autoFocus inputMode="numeric" autoComplete="transaction-amount" enterKeyHint="next" value={other} onChange={(e) => setOther(e.target.value)} aria-invalid={!!otherError || undefined} aria-describedby={otherError ? 'other-error' : undefined} className="pl-9 tabular-nums" placeholder="40" />
              </div>
              {otherError && <p id="other-error" role="alert" className="type-caption text-(--color-error)">{otherError}</p>}
            </div>
          )}
        </div>

        {/* What your gift plants */}
        <p className="type-body border-y border-(--color-border) py-5" aria-live="polite">
          {value > 0 ? (
            <>
              {pounds(value)} {frequency === 'monthly' ? 'every month' : 'once'} puts about{' '}
              <span className="relative inline-block align-baseline">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={plants}
                    className="type-number inline-block text-(--color-accent) [font-size:1.6rem]"
                    initial={reduce ? false : { opacity: 0, filter: 'blur(2px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, filter: 'blur(2px)' }}
                    transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                  >{number(plants)}</motion.span>
                </AnimatePresence>
              </span>{' '}
              plants in the water {frequency === 'monthly' ? 'in a year' : ''}{giftAid ? ', with Gift Aid' : ''}.
            </>
          ) : <span className="text-(--color-muted)">Choose an amount to see what it plants.</span>}
        </p>

        <div className="grid gap-5">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>{f.name}</FormLabel>
              <FormControl><Input {...field} autoComplete="name" enterKeyHint="next" /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel>{f.email}</FormLabel>
              <FormControl><Input {...field} type="email" inputMode="email" autoComplete="email" enterKeyHint="done" /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="giftAid" render={({ field }) => (
            <FormItem className="flex items-start gap-3">
              <FormControl><Checkbox checked={field.value} onCheckedChange={(c) => field.onChange(c === true)} className="mt-[3px]" /></FormControl>
              <FormLabel className="type-body cursor-pointer text-(--color-text)">{f.giftAid}</FormLabel>
            </FormItem>
          )} />
        </div>

        <div>
          <SendButton state={send.state} spin={send.spin} className="w-full">{f.button}</SendButton>
          <p className="type-caption mt-4 text-(--color-muted)" aria-live="polite">
            {send.state === 'done' && !donate.paymentUrl
              ? <>Online payment is not open yet, so your email app has opened with your pledge to us. Press send there and we will reply with a secure payment link.</>
              : donate.paymentUrl ? donate.note : <>Online payment opens soon. For now, this button opens your email app with your pledge to us, and we reply with a secure payment link.</>}
          </p>
        </div>
      </form>
    </Form>
  )
}
