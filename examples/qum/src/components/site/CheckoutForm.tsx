'use client'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { bySlug, money } from '@/data/shop'
import { useBag } from '@/lib/bag'

const schema = z.object({
  name: z.string().trim().min(2, 'Please write your name.'),
  email: z.email('That email address does not look right.'),
  phone: z.string().trim().regex(/^\+?[\d\s()-]{7,}$/, 'A phone number, so the courier can call.'),
  city: z.string().min(1, 'Choose your city.'),
  address: z.string().trim(),
  delivery: z.enum(['courier', 'pickup']),
  payment: z.enum(['card', 'delivery']),
  updates: z.boolean(),
}).refine((v) => v.delivery === 'pickup' || v.address.length >= 5, { path: ['address'], message: 'Street, building and flat, please.' })
type Values = z.infer<typeof schema>

const CITIES = ['Baku', 'Sumgait', 'Ganja', 'Lankaran', 'Shaki', 'Somewhere else in Azerbaijan']

// A short checkout that looks and validates like the real one will. There is no payment provider yet:
// submitting says so plainly and sends nothing.
export function CheckoutForm() {
  const { items, subtotal } = useBag()
  const form = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { name: '', email: '', phone: '', city: 'Baku', address: '', delivery: 'courier', payment: 'card', updates: true } })
  const city = form.watch('city'), how = form.watch('delivery')
  const fee = items.length === 0 || how === 'pickup' ? 0 : city === 'Baku' ? (subtotal >= 60 ? 0 : 4) : 6
  const onSubmit = () => toast('Not yet: orders open in spring', { description: 'Nothing was sent and nothing was charged. Your bag will keep everything until then.' })
  const err = (k: keyof Values) => form.formState.errors[k]
  const text = (k: 'name' | 'email' | 'phone' | 'address', label: string, type = 'text', auto?: string) => (
    <Field data-invalid={!!err(k)}>
      <FieldLabel htmlFor={k} className="type-utility">{label}</FieldLabel>
      <Input id={k} type={type} autoComplete={auto} aria-invalid={!!err(k)} {...form.register(k)} />
      <FieldError errors={[err(k)]} className="type-utility" />
    </Field>
  )
  return (
    <div className="px-(--gutter) pb-(--section-y) pt-10">
      <div className="mx-auto max-w-(--container)">
        <p role="note" className="type-body mb-10 flex max-w-[64ch] gap-3 rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) p-5">
          <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-(--color-accent)" />
          <span><strong className="font-medium">Orders open in spring.</strong> You can fill this in to see how it works, but nothing is sent and nothing is charged yet. Leave your email at the bottom of any page and we will write on the day it opens.</span>
        </p>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-7">
            <FieldSet id="details" data-stop="Your details" className="scroll-mt-28">
              <FieldLegend className="type-heading text-[length:var(--type-heading-size)]!">Your details</FieldLegend>
              <FieldGroup className="grid gap-5 sm:grid-cols-2">
                {text('name', 'Name', 'text', 'name')}
                {text('phone', 'Phone', 'tel', 'tel')}
                <div className="sm:col-span-2">{text('email', 'Email', 'email', 'email')}</div>
              </FieldGroup>
            </FieldSet>
            <FieldSet id="delivery" data-stop="Delivery" className="scroll-mt-28">
              <FieldLegend className="type-heading text-[length:var(--type-heading-size)]!">Delivery</FieldLegend>
              <Controller control={form.control} name="delivery" render={({ field }) => (
                <RadioGroup value={field.value} onValueChange={field.onChange} className="gap-3">
                  {[['courier', 'Courier to your door', city === 'Baku' ? 'Free in Baku over 60 ₼, otherwise 4 ₼. Next day.' : '6 ₼, 2 to 4 days.'], ['pickup', 'Collect from the lab in Mardakan', 'Free. Saturdays 10:00 to 14:00.']].map(([v, label, note]) => (
                    <FieldLabel key={v} htmlFor={`d-${v}`} className="type-body flex w-full cursor-pointer items-start gap-3 rounded-(--radius-card) border border-(--color-border) p-4 has-data-[state=checked]:border-(--color-text)">
                      <RadioGroupItem value={v} id={`d-${v}`} className="mt-1" />
                      <span>{label}<span className="type-utility block text-(--color-muted)">{note}</span></span>
                    </FieldLabel>
                  ))}
                </RadioGroup>
              )} />
              {how === 'courier' && (
                <FieldGroup className="grid gap-5 sm:grid-cols-2">
                  <Field data-invalid={!!err('city')}>
                    <FieldLabel htmlFor="city" className="type-utility">City</FieldLabel>
                    <Controller control={form.control} name="city" render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="city" className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent className="bg-(--color-surface)">{CITIES.map((c) => <SelectItem key={c} value={c} className="h-10">{c}</SelectItem>)}</SelectContent>
                      </Select>
                    )} />
                  </Field>
                  {text('address', 'Address', 'text', 'street-address')}
                </FieldGroup>
              )}
            </FieldSet>
            <FieldSet id="payment" data-stop="Payment" className="scroll-mt-28">
              <FieldLegend className="type-heading text-[length:var(--type-heading-size)]!">Payment</FieldLegend>
              <FieldDescription className="type-utility text-(--color-muted)">Card payments open with the shop in spring.</FieldDescription>
              <Controller control={form.control} name="payment" render={({ field }) => (
                <RadioGroup value={field.value} onValueChange={field.onChange} className="gap-3 sm:grid-cols-2">
                  {[['card', 'Card, online'], ['delivery', 'Card or cash on delivery']].map(([v, label]) => (
                    <FieldLabel key={v} htmlFor={`p-${v}`} className="type-body flex w-full cursor-pointer items-center gap-3 rounded-(--radius-card) border border-(--color-border) p-4 has-data-[state=checked]:border-(--color-text)">
                      <RadioGroupItem value={v} id={`p-${v}`} />{label}
                    </FieldLabel>
                  ))}
                </RadioGroup>
              )} />
              <Controller control={form.control} name="updates" render={({ field }) => (
                <Field orientation="horizontal">
                  <Checkbox id="updates" checked={field.value} onCheckedChange={(v) => field.onChange(v === true)} />
                  <FieldLabel htmlFor="updates" className="type-body font-normal">Email me when my batch is poured</FieldLabel>
                </Field>
              )} />
            </FieldSet>
          </div>
          <Card className="self-start rounded-(--radius-card) border-(--color-border) bg-(--color-surface) shadow-none lg:sticky lg:top-28 lg:col-span-5">
            <CardHeader>
              <Badge variant="outline" className="type-utility mb-2 border-(--color-accent) text-(--color-accent)">Orders open in spring</Badge>
              <CardTitle className="type-heading text-[length:var(--type-heading-size)]!">Your order</CardTitle>
            </CardHeader>
            <CardContent className="type-body space-y-3">
              {items.length === 0 ? (
                <p className="text-(--color-muted)">Your bag is empty. <Link href="/shop" className="text-(--color-text) underline underline-offset-4">See the six</Link></p>
              ) : items.map((l) => {
                const p = bySlug(l.slug)!
                return <p key={l.slug + l.option} className="flex justify-between gap-4"><span>{p.name} <span className="text-(--color-muted)">× {l.qty}</span></span><span className="tabular-nums">{money(p.price * l.qty)}</span></p>
              })}
              <Separator className="bg-(--color-border)" />
              <p className="flex justify-between text-(--color-muted)"><span>Delivery</span><span className="tabular-nums">{fee ? money(fee) : 'Free'}</span></p>
              <p className="flex justify-between text-[1.2rem]"><span>Total</span><span className="tabular-nums">{money(subtotal + fee)}</span></p>
              <Button type="submit" size="lg" className="mt-3 w-full" disabled={items.length === 0}>Place order</Button>
              <p className="type-utility text-(--color-muted)">Nothing is charged today. This button will work when orders open in spring.</p>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
}
