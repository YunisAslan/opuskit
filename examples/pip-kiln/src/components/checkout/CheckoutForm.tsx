'use client'
// Checkout: contact, delivery address, delivery choice, then payment — one column, the order summary beside it (above
// it on phones). Card payments aren't connected, so the last step says so plainly and the button writes the whole
// order into an email to the studio. Nothing pretends to be paid.
import Link from 'next/link'
import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Check } from 'lucide-react'
import { MediaAsset } from '@/components/media/MediaAsset'
import { SectionHead } from '@/components/parts/SectionHead'
import { useSend } from '@/components/parts/use-send'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { checkout as copy } from '@/content/cart'
import { site } from '@/content/site'
import { useCart } from '@/lib/cart'
import { price } from '@/lib/format'

const e = copy.errors
const schema = z.object({
  email: z.string().trim().email(e.email),
  name: z.string().trim().min(2, e.required),
  line1: z.string().trim().min(3, e.required),
  city: z.string().trim().min(2, e.required),
  postcode: z.string().trim().regex(/^[A-Za-z]{1,2}\d[A-Za-z\d]?\s*\d[A-Za-z]{2}$/, e.postcode),
  delivery: z.enum(['standard', 'collect']),
  gift: z.boolean(),
})
type Values = z.infer<typeof schema>

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <fieldset className="min-w-0">
      <legend className="flex items-center gap-4">
        <span aria-hidden className="type-display grid size-11 place-items-center rounded-full bg-(--color-text) text-(--color-background) [font-size:1.4rem]">{n}</span>
        <span className="t-card [font-size:clamp(1.3rem,2vw,1.7rem)]">{title}</span>
      </legend>
      <div className="mt-6 grid gap-5">{children}</div>
    </fieldset>
  )
}

export function CheckoutForm() {
  const c = useCart()
  const { send, state } = useSend()
  const [sent, setSent] = useState(false)
  const form = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { email: '', name: '', line1: '', city: '', postcode: '', delivery: 'standard', gift: false } })
  const collect = useWatch({ control: form.control, name: 'delivery' }) === 'collect'
  const delivery = collect ? 0 : c.delivery
  const total = c.subtotal + delivery

  const submit = form.handleSubmit((v) => {
    const lines = c.lines.map((l) => `- ${l.qty} × ${l.product.name} (${l.glaze}), ${price(l.product.price * l.qty)}`).join('\n')
    const body = [
      'Hello Pip & Kiln,', '', 'I’d like to order:', lines, '',
      `Subtotal: ${price(c.subtotal)}`, `Delivery: ${delivery ? price(delivery) : 'Free'} (${copy.options.find((o) => o.value === v.delivery)!.label})`, `Total: ${price(total)}`, '',
      'Send to:', v.name, v.line1, v.city, v.postcode.toUpperCase(), '', `Email: ${v.email}`, v.gift ? 'It’s a present, please leave the price out of the box.' : '', '',
      'Please send me a payment link. Thank you!',
    ].join('\n')
    send(`mailto:${site.email}?subject=${encodeURIComponent(`Order from ${v.name}`)}&body=${encodeURIComponent(body)}`).then(() => setSent(true))
  })

  const head = <SectionHead as="h1" text={copy.title} lines={[copy.title]} line={copy.intro} />

  if (!c.ready) return <section className="px-(--gutter) pb-(--section-y) pt-12 md:pt-16"><div className="mx-auto max-w-(--container)">{head}<div aria-hidden className="skeleton mt-12 h-96 rounded-(--radius-card)" /></div></section>
  if (c.lines.length === 0) return (
    <section className="px-(--gutter) pb-(--section-y) pt-12 md:pt-16">
      <div className="mx-auto max-w-(--container)">{head}
        <div className="mt-12 rounded-(--radius-card) border border-(--color-text) p-8 md:p-12"><p className="t-card">{copy.empty}</p><Button asChild className="mt-6"><Link href="/shop">{copy.emptyAction}</Link></Button></div>
      </div>
    </section>
  )

  const field = (name: 'email' | 'name' | 'line1' | 'city' | 'postcode', label: string, props: React.ComponentProps<'input'>) => (
    <FormField control={form.control} name={name} render={({ field: f }) => (
      <FormItem><FormLabel>{label}</FormLabel><FormControl><Input {...props} {...f} /></FormControl><FormMessage /></FormItem>
    )} />
  )

  return (
    <section className="px-(--gutter) pb-(--section-y) pt-12 md:pt-16">
      <div className="mx-auto max-w-(--container)">
        {head}
        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-6">
          <aside aria-label={copy.summary} className="md:order-2 md:col-span-4 md:col-start-9">
            <div className="rounded-(--radius-card) bg-(--color-surface) p-6 md:sticky md:top-[calc(var(--nav-h)+24px)] md:p-8">
              <div className="flex items-baseline justify-between gap-4"><h2 className="t-card">{copy.summary}</h2><Link href="/cart" className="type-caption font-semibold underline underline-offset-4">{copy.edit}</Link></div>
              <ul className="mt-5 space-y-4">
                {c.lines.map((l) => (
                  <li key={l.slug + l.glaze} className="grid grid-cols-[3.5rem_minmax(0,1fr)_auto] items-center gap-4">
                    <MediaAsset id="productGrid" index={l.product.photo - 1} alt="" sizes="56px" className="rounded-[14px]" />
                    <p className="min-w-0"><span className="type-body block font-semibold leading-snug">{l.product.name}</span><span className="type-caption">{l.qty} × {l.glaze}</span></p>
                    <span className="type-body tabular-nums">{price(l.product.price * l.qty)}</span>
                  </li>
                ))}
              </ul>
              <Separator className="my-5 bg-(--color-text)/25" />
              <dl className="type-body space-y-1.5">
                <div className="flex justify-between"><dt>Subtotal</dt><dd className="tabular-nums">{price(c.subtotal)}</dd></div>
                <div className="flex justify-between"><dt>Delivery</dt><dd className="tabular-nums">{delivery ? price(delivery) : 'Free'}</dd></div>
                <div className="flex items-baseline justify-between border-t border-(--color-text) pt-3"><dt className="t-card">Total</dt><dd className="t-price [font-size:2rem]">{price(total)}</dd></div>
              </dl>
            </div>
          </aside>

          <Form {...form}>
            <form onSubmit={submit} noValidate className="grid gap-12 md:order-1 md:col-span-7">
              <Step n={1} title={copy.steps.contact}>{field('email', copy.fields.email, { type: 'email', autoComplete: 'email', inputMode: 'email' })}</Step>
              <Separator className="bg-(--color-text)/25" />
              <Step n={2} title={copy.steps.address}>
                {field('name', copy.fields.name, { autoComplete: 'name' })}
                {field('line1', copy.fields.line1, { autoComplete: 'address-line1' })}
                <div className="grid gap-5 sm:grid-cols-2">
                  {field('city', copy.fields.city, { autoComplete: 'address-level2' })}
                  {field('postcode', copy.fields.postcode, { autoComplete: 'postal-code', autoCapitalize: 'characters' })}
                </div>
                <FormField control={form.control} name="gift" render={({ field: f }) => (
                  <FormItem className="flex items-center gap-3">
                    <FormControl><Checkbox checked={f.value} onCheckedChange={(v) => f.onChange(v === true)} /></FormControl>
                    <FormLabel className="type-body font-normal">{copy.fields.gift}</FormLabel>
                  </FormItem>
                )} />
              </Step>
              <Separator className="bg-(--color-text)/25" />
              <Step n={3} title={copy.steps.delivery}>
                <FormField control={form.control} name="delivery" render={({ field: f }) => (
                  <RadioGroup value={f.value} onValueChange={f.onChange} className="gap-3">
                    {copy.options.map((o) => (
                      <Label key={o.value} className="type-body cursor-pointer gap-4 rounded-(--radius-card) border border-(--color-text)/40 bg-(--color-surface) p-5 has-[[data-state=checked]]:border-(--color-text) has-[[data-state=checked]]:shadow-[inset_0_0_0_1px_var(--color-text)]">
                        <RadioGroupItem value={o.value} />
                        <span className="min-w-0"><span className="block font-semibold">{o.label}</span><span className="type-caption block">{o.note}</span></span>
                      </Label>
                    ))}
                  </RadioGroup>
                )} />
              </Step>
              <Separator className="bg-(--color-text)/25" />
              <Step n={4} title={copy.steps.payment}>
                <div className="rounded-(--radius-card) border border-(--color-text) p-6">
                  <p className="t-card">{copy.payment.title}</p>
                  <p className="type-body mt-2 max-w-[52ch]">{copy.payment.text}</p>
                </div>
                <Button type="submit" size="lg" className="w-full sm:w-auto sm:min-w-[16rem]">
                  {state === 'wait' && <span aria-hidden className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none" />}
                  <span className={state === 'wait' ? 'sr-only' : ''}>{copy.payment.button}, {price(total)}</span>
                </Button>
                <p aria-live="polite" className="type-caption min-h-5">{sent && <span className="inline-flex items-start gap-2 font-semibold"><Check className="mt-0.5 size-4 shrink-0" strokeWidth={3} />{copy.payment.handoff}</span>}</p>
              </Step>
            </form>
          </Form>
        </div>
      </div>
    </section>
  )
}
