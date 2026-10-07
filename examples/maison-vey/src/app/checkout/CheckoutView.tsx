'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Masthead } from '@/components/pieces/Masthead'
import { MediaAsset } from '@/components/media/MediaAsset'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ResponsiveSelect } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { useCart } from '@/components/site/cart'
import { bag, checkout as copy } from '@/content/copy'
import { formatPrice, getScent } from '@/content/products'

const e = copy.errors
const schema = z.object({
  email: z.string().trim().email(e.email),
  letter: z.boolean(),
  firstName: z.string().trim().min(1, e.required),
  lastName: z.string().trim().min(1, e.required),
  address: z.string().trim().min(3, e.required),
  city: z.string().trim().min(1, e.required),
  postcode: z.string().trim().min(3, e.required),
  country: z.string().min(1, e.country),
  method: z.enum(['standard', 'express', 'collect']),
  gift: z.boolean(),
  card: z.string().transform((v) => v.replace(/\s/g, '')).pipe(z.string().regex(/^\d{16}$/, e.card)),
  expiry: z.string().trim().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, e.expiry),
  cvc: z.string().trim().regex(/^\d{3,4}$/, e.cvc),
})
type In = z.input<typeof schema>
type Out = z.output<typeof schema>

function Fieldset({ legend, children, className }: { legend: string; children: React.ReactNode; className?: string }) {
  return (
    <fieldset className={className}>
      <legend className="type-heading [font-size:clamp(1.5rem,2vw,1.75rem)]">{legend}</legend>
      <div className="mt-8 grid gap-x-(--grid-gap) gap-y-6 sm:grid-cols-2">{children}</div>
    </fieldset>
  )
}

export function CheckoutView() {
  const { lines, subtotal, clear, ready } = useCart()
  const [done, setDone] = useState(false)
  const form = useForm<In, unknown, Out>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', letter: false, firstName: '', lastName: '', address: '', city: '', postcode: '', country: '', method: 'standard', gift: false, card: '', expiry: '', cvc: '' },
  })
  const watchedMethod = useWatch({ control: form.control, name: 'method' })
  const method = copy.methods.find((m) => m.value === watchedMethod) ?? copy.methods[0]
  const delivery = subtotal >= bag.freeOver && method.value === 'standard' ? 0 : method.price
  const total = subtotal + delivery

  // PLACEHOLDER: hand the order to a real payment processor here.
  const onSubmit = () => {
    clear()
    setDone(true)
    toast(copy.done.title)
    window.scrollTo({ top: 0 })
  }

  const text = (name: 'email' | 'firstName' | 'lastName' | 'address' | 'city' | 'postcode' | 'card' | 'expiry' | 'cvc', label: string, auto: string, extra: Partial<React.ComponentProps<'input'>> = {}, wide = false) => (
    <FormField control={form.control} name={name} render={({ field }) => (
      <FormItem className={wide ? 'sm:col-span-2' : undefined}>
        <FormLabel>{label}</FormLabel>
        <FormControl><Input autoComplete={auto} {...extra} {...field} /></FormControl>
        <FormMessage />
      </FormItem>
    )} />
  )

  if (done) return (
    <section className="px-(--gutter) pb-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <Masthead title={{ desktop: [copy.done.title], mobile: [copy.done.title] }} intro={copy.done.text}>
          <Link href="/shop" className="btn-secondary mt-10">{copy.done.action}</Link>
        </Masthead>
      </div>
    </section>
  )

  return (
    <section className="px-(--gutter) pb-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <Masthead title={lines.length || !ready ? copy.title : { desktop: [copy.emptyTitle], mobile: [copy.emptyTitle] }} intro={lines.length || !ready ? copy.intro : bag.empty}>
          {ready && lines.length === 0 && <Link href="/shop" className="btn-secondary mt-10">{bag.emptyAction}</Link>}
        </Masthead>

        {ready && lines.length > 0 && (
          <div className="grid gap-x-(--grid-gap) gap-y-16 border-t border-(--color-border) pt-12 md:grid-cols-12">
            <Form {...form}>
              <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-16 md:col-span-7">
                <Fieldset legend={copy.contact}>
                  {text('email', copy.fields.email, 'email', { type: 'email', inputMode: 'email' }, true)}
                  <FormField control={form.control} name="letter" render={({ field }) => (
                    <FormItem className="flex items-center gap-3 sm:col-span-2">
                      <FormControl><Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(v === true)} /></FormControl>
                      <FormLabel className="type-body text-(--color-text)">{copy.fields.letter}</FormLabel>
                    </FormItem>
                  )} />
                </Fieldset>

                <Fieldset legend={copy.shipping}>
                  {text('firstName', copy.fields.firstName, 'given-name')}
                  {text('lastName', copy.fields.lastName, 'family-name')}
                  {text('address', copy.fields.address, 'street-address', {}, true)}
                  {text('postcode', copy.fields.postcode, 'postal-code')}
                  {text('city', copy.fields.city, 'address-level2')}
                  <FormField control={form.control} name="country" render={({ field, fieldState }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>{copy.fields.country}</FormLabel>
                      <FormControl>
                        <div><ResponsiveSelect label={copy.fields.country} placeholder={copy.fields.countryPlaceholder} invalid={!!fieldState.error} value={field.value} onValueChange={field.onChange} options={copy.countries.map((c) => ({ value: c, label: c }))} /></div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </Fieldset>

                <fieldset>
                  <legend className="type-heading [font-size:clamp(1.5rem,2vw,1.75rem)]">{copy.method}</legend>
                  <FormField control={form.control} name="method" render={({ field }) => (
                    <RadioGroup value={field.value} onValueChange={field.onChange} className="mt-8 gap-0 border-t border-(--color-border)">
                      {copy.methods.map((m) => (
                        <Label key={m.value} htmlFor={`m-${m.value}`} className="type-body flex min-h-16 cursor-pointer items-center gap-4 border-b border-(--color-border) py-4 text-(--color-text)">
                          <RadioGroupItem id={`m-${m.value}`} value={m.value} />
                          <span className="flex-1">{m.label}<span className="type-caption block text-(--color-muted)">{m.text}</span></span>
                          <span className="tabular-nums">{m.value === 'standard' && subtotal >= bag.freeOver ? bag.deliveryFree : m.price ? formatPrice(m.price) : bag.deliveryFree}</span>
                        </Label>
                      ))}
                    </RadioGroup>
                  )} />
                  <FormField control={form.control} name="gift" render={({ field }) => (
                    <FormItem className="mt-6 flex items-center gap-3">
                      <FormControl><Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(v === true)} /></FormControl>
                      <FormLabel className="type-body text-(--color-text)">{copy.fields.gift}</FormLabel>
                    </FormItem>
                  )} />
                </fieldset>

                <Fieldset legend={copy.payment}>
                  {text('card', copy.fields.card, 'cc-number', { inputMode: 'numeric', placeholder: '1234 1234 1234 1234' }, true)}
                  {text('expiry', copy.fields.expiry, 'cc-exp', { placeholder: 'MM/YY', inputMode: 'numeric' })}
                  {text('cvc', copy.fields.cvc, 'cc-csc', { inputMode: 'numeric' })}
                  <p className="type-caption text-(--color-muted) sm:col-span-2">{copy.secure}</p>
                </Fieldset>

                <Button type="submit" width="full" className="md:hidden">{copy.pay(formatPrice(total))}</Button>
                <Button type="submit" className="hidden md:inline-flex">{copy.pay(formatPrice(total))}</Button>
              </form>
            </Form>

            <aside aria-label={copy.summary} className="self-start md:sticky md:top-[calc(var(--nav-h)+48px)] md:col-span-4 md:col-start-9">
              <h2 className="type-heading [font-size:clamp(1.5rem,2vw,1.75rem)]">{copy.summary}</h2>
              <ul className="mt-8 divide-y divide-(--color-border) border-y border-(--color-border)">
                {lines.map((l) => {
                  const s = getScent(l.slug)!
                  return (
                    <li key={l.slug + l.size} className="grid grid-cols-[4rem_1fr_auto] items-start gap-4 py-4">
                      <MediaAsset id={s.images.front} alt={s.alt.front} sizes="4rem" />
                      <span><span className="type-body block">{s.name}</span><span className="type-caption text-(--color-muted)">{l.size}, quantity {l.qty}</span></span>
                      <span className="type-body tabular-nums">{formatPrice(l.total)}</span>
                    </li>
                  )
                })}
              </ul>
              <dl className="type-body mt-5 space-y-2">
                <div className="flex justify-between"><dt className="text-(--color-muted)">{bag.subtotal}</dt><dd className="tabular-nums">{formatPrice(subtotal)}</dd></div>
                <div className="flex justify-between"><dt className="text-(--color-muted)">{bag.delivery}</dt><dd className="tabular-nums">{delivery ? formatPrice(delivery) : bag.deliveryFree}</dd></div>
              </dl>
              <Separator className="my-5" />
              <div className="flex items-baseline justify-between">
                <span className="type-body">{bag.total}</span>
                <span className="type-heading tabular-nums [font-size:1.75rem]">{formatPrice(total)}</span>
              </div>
              <p className="type-caption mt-4 text-(--color-muted)">{bag.sample}</p>
            </aside>
          </div>
        )}
      </div>
    </section>
  )
}
