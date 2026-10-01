'use client'

import { useId, useSyncExternalStore } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod/mini'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'

const editions = [
  { value: 'every', label: 'Every issue, every second Sunday' },
  { value: 'monthly', label: 'A monthly digest, first Sunday of the month' },
] as const

const schema = z.object({
  email: z.email('Enter an email address we can send the issue to.'),
  edition: z.enum(['every', 'monthly']),
  place: z.string().check(z.maxLength(280, 'Keep it under 280 characters.')),
  consent: z.boolean().check(z.refine((v) => v, 'Tick the box so we are allowed to send you the newsletter.')),
})
type Values = z.infer<typeof schema>

const fieldClass = 'border-(--color-muted) bg-(--color-surface) focus-visible:border-(--color-text)'

function useIsMobile() {
  return useSyncExternalStore(
    (cb) => { const m = matchMedia('(max-width: 639px)'); m.addEventListener('change', cb); return () => m.removeEventListener('change', cb) },
    () => matchMedia('(max-width: 639px)').matches,
    () => false,
  )
}

// Under 640px the select opens as a bottom sheet (recipe/ui.md); above it, the shadcn Select.
function EditionSelect({ id, value, onChange, invalid }: { id: string; value: Values['edition']; onChange: (v: Values['edition']) => void; invalid: boolean }) {
  const mobile = useIsMobile()
  const current = editions.find((e) => e.value === value)
  if (!mobile) return (
    <Select value={value} onValueChange={(v) => onChange(v as Values['edition'])}>
      <SelectTrigger id={id} aria-invalid={invalid} className={`w-full ${fieldClass}`}><SelectValue /></SelectTrigger>
      <SelectContent position="popper">
        {editions.map((e) => <SelectItem key={e.value} value={e.value}>{e.label}</SelectItem>)}
      </SelectContent>
    </Select>
  )
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button id={id} type="button" data-invalid={invalid} className={`flex h-11 w-full items-center justify-between border px-3 text-left text-base ${fieldClass}`}>
          {current?.label}<span aria-hidden className="type-utility text-(--color-muted)">Change</span>
        </button>
      </SheetTrigger>
      <SheetContent side="bottom" className="gap-0 px-6 pt-6 pb-8">
        <SheetTitle>How often</SheetTitle>
        <SheetDescription className="type-body mt-2 text-(--color-muted)">Pick one. You can change it from any email.</SheetDescription>
        <div role="radiogroup" aria-label="How often" className="mt-6 border-t border-(--color-border)">
          {editions.map((e) => (
            <SheetClose asChild key={e.value}>
              <button type="button" role="radio" aria-checked={e.value === value} onClick={() => onChange(e.value)}
                className="type-body flex min-h-14 w-full items-center justify-between gap-4 border-b border-(--color-border) px-3 py-2 text-left aria-checked:bg-(--color-surface)">
                {e.label}{e.value === value && <span className="type-utility shrink-0 text-(--color-accent)">Selected</span>}
              </button>
            </SheetClose>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export function SubscribeForm() {
  const uid = useId()
  const form = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { email: '', edition: 'every', place: '', consent: false } })

  // No mailing-list backend yet: connect your email provider here (e.g. a route handler that adds the contact).
  function onSubmit(values: Values) {
    toast.success('You’re on the list.', { description: `The next issue goes to ${values.email} on Sunday.` })
    form.reset()
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate aria-label="Subscribe to Slow Atlas">
      <FieldGroup className="gap-6">
        <Controller name="email" control={form.control} render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`${uid}-email`}>Email</FieldLabel>
            <Input {...field} id={`${uid}-email`} type="email" autoComplete="email" inputMode="email" aria-invalid={fieldState.invalid} className={fieldClass} />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )} />
        <Controller name="edition" control={form.control} render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`${uid}-edition`}>How often</FieldLabel>
            <EditionSelect id={`${uid}-edition`} value={field.value} onChange={field.onChange} invalid={fieldState.invalid} />
          </Field>
        )} />
        <Controller name="place" control={form.control} render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`${uid}-place`}>A place we should write about <span className="text-(--color-muted)">(optional)</span></FieldLabel>
            <Textarea {...field} id={`${uid}-place`} rows={3} aria-invalid={fieldState.invalid} className={fieldClass} />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )} />
        <Controller name="consent" control={form.control} render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} orientation="horizontal" className="items-start">
            <Checkbox id={`${uid}-consent`} checked={field.value} onCheckedChange={(v) => field.onChange(v === true)} aria-invalid={fieldState.invalid} className="mt-0.5 border-(--color-muted)" />
            <div className="space-y-2">
              <FieldLabel htmlFor={`${uid}-consent`} className="font-normal">Send me the Slow Atlas newsletter. I can unsubscribe from any email.</FieldLabel>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </div>
          </Field>
        )} />
        <Button type="submit" size="lg" className="w-full sm:w-auto sm:self-start">Subscribe</Button>
      </FieldGroup>
    </form>
  )
}
