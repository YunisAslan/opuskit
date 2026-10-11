'use client'
// The commission form (react-hook-form + zod). Nothing is connected to a service, so it never pretends to send:
// on submit it opens the visitor's email app with every field filled in, addressed to Ines, and says so on screen.
// Errors sit under their field in --color-error. "What kind of map" is a Radix Select on wide screens and a bottom
// sheet of choices under 640px. Beside it (above it on phones): the place card, lettering whatever is typed in
// "Where is it?" onto a little sheet.
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useId, useState } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { PlaceCard } from '@/components/drawings/PlaceCard'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { fieldClass, Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Chevron, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { contact, site } from '@/content/site'

const f = contact.form
const schema = z.object({
  name: z.string().trim().min(1, f.errors.name),
  email: z.email(f.errors.email),
  place: z.string().trim().min(1, f.errors.place),
  kind: z.string().min(1, f.errors.kind),
  when: z.string().trim().optional(),
  message: z.string().trim().min(10, f.errors.message),
  consent: z.literal(true, { error: f.errors.consent }),
})
type Values = z.input<typeof schema>

function useNarrow() {
  const [narrow, setNarrow] = useState(false)
  useEffect(() => {
    const m = matchMedia('(max-width: 639px)')
    const on = () => setNarrow(m.matches)
    on(); m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [])
  return narrow
}

function Field({ id, label, error, hint, children }: { id: string; label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="type-caption text-(--color-muted)">{hint}</p>}
      {error && <p id={`${id}-error`} className="type-caption text-(--color-error)">{error}</p>}
    </div>
  )
}

export function ContactForm() {
  const uid = useId()
  const id = (k: string) => `${uid}-${k}`
  const narrow = useNarrow()
  const [sent, setSent] = useState<string | null>(null)
  const { register, control, handleSubmit, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(schema), mode: 'onTouched',
    defaultValues: { name: '', email: '', place: '', kind: '', when: '', message: '', consent: false as unknown as true },
  })
  const place = useWatch({ control, name: 'place' }) ?? ''
  const a = (k: keyof Values, hint = false) => ({ id: id(k), 'aria-invalid': !!errors[k] || undefined, 'aria-describedby': errors[k] ? `${id(k)}-error` : hint ? `${id(k)}-hint` : undefined })

  const onSubmit = (v: Values) => {
    const body = [`Hello Ines,`, ``, v.message, ``, `Where: ${v.place}`, `Kind of map: ${v.kind}`, v.when ? `When: ${v.when}` : '', ``, `${v.name}`, `${v.email}`].filter((l, i, arr) => l !== '' || arr[i - 1] !== '').join('\n')
    const href = `mailto:${site.email}?subject=${encodeURIComponent(`${f.subject} ${v.place}`)}&body=${encodeURIComponent(body)}`
    setSent(href)
    window.location.assign(href)
  }

  return (
    <div className="grid-site gap-y-10">
      <div className="col-span-full lg:order-2 lg:col-span-4 lg:col-start-9">
        <div className="lg:sticky lg:top-28"><PlaceCard place={place} labels={contact.card} /></div>
      </div>
      <form noValidate onSubmit={handleSubmit(onSubmit)} className="col-span-full grid gap-6 sm:grid-cols-2 lg:order-1 lg:col-span-7">
        <Field id={id('name')} label={f.name} error={errors.name?.message}>
          <Input {...register('name')} {...a('name')} autoComplete="name" enterKeyHint="next" />
        </Field>
        <Field id={id('email')} label={f.email} error={errors.email?.message}>
          <Input {...register('email')} {...a('email')} type="email" inputMode="email" autoComplete="email" enterKeyHint="next" />
        </Field>
        <Field id={id('place')} label={f.place} error={errors.place?.message} hint={f.placeHint}>
          <Input {...register('place')} {...a('place', true)} autoComplete="off" enterKeyHint="next" maxLength={80} />
        </Field>
        <Field id={id('kind')} label={f.kind} error={errors.kind?.message}>
          <Controller control={control} name="kind" render={({ field }) => narrow ? (
            <Sheet>
              <SheetTrigger {...a('kind')} onBlur={field.onBlur} className={`${fieldClass} flex h-12 items-center justify-between text-left ${field.value ? '' : 'text-(--color-muted)'}`}>
                {field.value || f.kindPlaceholder}<Chevron className="text-(--color-text)" />
              </SheetTrigger>
              <SheetContent aria-describedby={undefined} className="px-(--gutter) pt-5">
                <SheetTitle>{f.kind}</SheetTitle>
                <div role="radiogroup" aria-label={f.kind} className="mt-3 flex flex-col pb-4">
                  {f.kinds.map((k) => (
                    <SheetClose key={k} role="radio" aria-checked={field.value === k} onClick={() => field.onChange(k)}
                      className={`type-body press flex min-h-12 items-center justify-between border-b border-(--color-border) text-left ${field.value === k ? 'font-medium' : ''}`}>
                      {k}{field.value === k && <svg viewBox="0 0 20 20" aria-hidden className="size-5"><path d="M3.5 10.5 C 5.5 12, 7 14, 8 16 C 10 10.5, 13 6.5, 17 3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>}
                    </SheetClose>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger {...a('kind')} onBlur={field.onBlur}><SelectValue placeholder={f.kindPlaceholder} /></SelectTrigger>
              <SelectContent>{f.kinds.map((k) => <SelectItem key={k} value={k}>{k}</SelectItem>)}</SelectContent>
            </Select>
          )} />
        </Field>
        <div className="sm:col-span-2">
          <Field id={id('when')} label={f.when}>
            <Input {...register('when')} {...a('when')} placeholder={f.whenPlaceholder} enterKeyHint="next" />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field id={id('message')} label={f.message} error={errors.message?.message}>
            <Textarea {...register('message')} {...a('message')} placeholder={f.messagePlaceholder} rows={5} />
          </Field>
        </div>
        <div className="flex flex-col gap-2 sm:col-span-2">
          <Controller control={control} name="consent" render={({ field }) => (
            <div className="flex items-center gap-3">
              <Checkbox id={id('consent')} checked={field.value === true} onCheckedChange={(c) => field.onChange(c === true)} onBlur={field.onBlur} aria-invalid={!!errors.consent || undefined} aria-describedby={errors.consent ? `${id('consent')}-error` : undefined} />
              <Label htmlFor={id('consent')} className="type-body leading-snug">{f.consent}</Label>
            </div>
          )} />
          {errors.consent && <p id={`${id('consent')}-error`} className="type-caption text-(--color-error)">{errors.consent.message}</p>}
        </div>
        <div className="flex flex-col gap-4 sm:col-span-2">
          <Button type="submit" size="lg" className="w-full sm:w-fit">
            {sent && <svg viewBox="0 0 20 20" aria-hidden className="size-5"><path d="M3.5 10.5 C 5.5 12, 7 14, 8 16 C 10 10.5, 13 6.5, 17 3.5" pathLength={1} strokeDasharray="1" className="motion-safe:animate-[tick_200ms_ease-out_both]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>}
            {f.send}
          </Button>
          <p role="status" className="type-body max-w-[52ch]">
            {sent && <>{f.sent} <span className="text-(--color-muted)">{f.fallback} <a href={`mailto:${site.email}`} className="underline underline-offset-4 [overflow-wrap:anywhere]">{site.email}</a>.</span></>}
          </p>
        </div>
      </form>
    </div>
  )
}
