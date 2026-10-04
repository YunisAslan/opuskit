'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { cohorts, plans, site } from '@/content/site'
import { shortDate } from '@/lib/status'
import { useMedia } from '@/lib/useMedia'

// The main action. Any link to #enrol (or #enrol-1to1, #enrol-recordings) opens the sign-up sheet; #preview opens it
// for the free preview lesson. The site is static, so a valid form opens the visitor's mail app with everything
// filled in, addressed to the course.
const enrolSchema = z.object({
  name: z.string().trim().min(2, 'Your name, please.'),
  email: z.email('An email address I can reply to.'),
  cohort: z.string().min(1, 'Pick a cohort.'),
  plan: z.string().min(1, 'Pick a plan.'),
  company: z.string().optional(),
  work: z.string().max(600, 'Keep it under 600 characters.').optional(),
  referral: z.string().refine((v) => v === '' || v.length === 6, 'Referral codes have six characters.'),
  evenings: z.boolean().refine((v) => v, 'Sessions are live on these evenings; recordings are up the same night.'),
})
type Enrol = z.infer<typeof enrolSchema>
type Mode = 'enrol' | 'preview'

const PLAN_FROM_HASH: Record<string, string> = { '#enrol-1to1': 'Seat and 1:1', '#enrol-recordings': 'Recordings' }
const firstOpen = () => cohorts.find((c) => c.start >= new Date().toISOString().slice(0, 10) && c.seatsLeft > 0) ?? cohorts[0]


export function EnrolSheet() {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<Mode>('enrol')
  const small = useMedia('(max-width: 639px)')
  const form = useForm<Enrol>({
    resolver: zodResolver(enrolSchema),
    defaultValues: { name: '', email: '', cohort: '', plan: 'Seat', company: '', work: '', referral: '', evenings: false },
  })

  useEffect(() => {
    const openFor = (hash: string) => {
      if (!/^#(enrol|preview)/.test(hash)) return false
      setMode(hash === '#preview' ? 'preview' : 'enrol')
      if (PLAN_FROM_HASH[hash]) form.setValue('plan', PLAN_FROM_HASH[hash])
      if (!form.getValues('cohort')) form.setValue('cohort', firstOpen().n)
      setOpen(true)
      return true
    }
    // Capture phase, before next/link sees the click: these hashes are actions, not places.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href*="#enrol"], a[href*="#preview"]')
      if (!a || e.metaKey || e.ctrlKey) return
      if (openFor(new URL((a as HTMLAnchorElement).href).hash)) { e.preventDefault(); e.stopPropagation() }
    }
    document.addEventListener('click', onClick, true)
    openFor(location.hash)
    return () => document.removeEventListener('click', onClick, true)
  }, [form])

  const send = (subject: string, lines: string[]) => {
    window.location.assign(`mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`)
    toast.success('Your mail app is opening with the request filled in.', { description: 'Send it and I reply within a working day.' })
    setOpen(false)
  }

  const submit = (v: Enrol) => {
    const c = cohorts.find((k) => k.n === v.cohort)!
    send(`Seat request, cohort ${c.n}`, [
      `Name: ${v.name}`, `Email: ${v.email}`, `Cohort: ${c.n}, starts ${shortDate(c.start)}`, `Plan: ${v.plan}`,
      v.company ? `Company, for the invoice: ${v.company}` : '', v.referral ? `Referral code: ${v.referral}` : '',
      '', v.work ? `What I edit or grade now: ${v.work}` : '',
    ].filter((l, i, all) => l !== '' || all[i + 1]))
  }

  const sendPreview = async () => {
    const ok = await form.trigger(['name', 'email'])
    if (ok) send('The free preview lesson', [`Name: ${form.getValues('name')}`, `Email: ${form.getValues('email')}`, '', 'Please send me the preview lesson (week 3, Balance).'])
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side={small ? 'bottom' : 'right'} className="w-full gap-0 overflow-y-auto data-[side=bottom]:max-h-[92svh] sm:max-w-md">
        <SheetHeader className="border-b border-(--color-border) p-6">
          <SheetTitle className="type-heading text-[1.5rem]">{mode === 'preview' ? 'Watch a free lesson' : 'Reserve a seat'}</SheetTitle>
          <SheetDescription className="type-body text-(--color-muted)">
            {mode === 'preview'
              ? 'Week 3, Balance: 40 minutes from a recorded session, with the night street to grade yourself.'
              : `${site.price} for a seat. Twelve per cohort, Tuesday and Thursday ${site.session.start}–${site.session.end} Oslo time.`}
          </SheetDescription>
        </SheetHeader>

        <form noValidate onSubmit={form.handleSubmit(submit)} className="p-6">
          <FieldGroup className="gap-5">
            <Controller name="name" control={form.control} render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="enrol-name">Name</FieldLabel>
                <Input {...field} id="enrol-name" autoComplete="name" aria-invalid={fieldState.invalid} />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )} />
            <Controller name="email" control={form.control} render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="enrol-email">Email</FieldLabel>
                <Input {...field} id="enrol-email" type="email" autoComplete="email" aria-invalid={fieldState.invalid} />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )} />

            {mode === 'preview' ? (
              <Button type="button" size="lg" className="mt-2 w-full" onClick={sendPreview}>Send me the lesson</Button>
            ) : (
              <>
                <div className="grid gap-5">
                  <Controller name="cohort" control={form.control} render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="enrol-cohort">Cohort</FieldLabel>
                      <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="enrol-cohort" className="w-full" aria-invalid={fieldState.invalid}><SelectValue placeholder="Choose" /></SelectTrigger>
                        <SelectContent position="popper">
                          {cohorts.map((c) => (
                            <SelectItem key={c.n} value={c.n} disabled={c.seatsLeft === 0}>Cohort {c.n}, {shortDate(c.start)}, {c.seatsLeft} left</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )} />
                  <Controller name="plan" control={form.control} render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="enrol-plan">Plan</FieldLabel>
                      <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="enrol-plan" className="w-full" aria-invalid={fieldState.invalid}><SelectValue /></SelectTrigger>
                        <SelectContent position="popper">
                          {plans.map((p) => <SelectItem key={p.name} value={p.name}>{p.name}, {p.full}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </Field>
                  )} />
                </div>
                <Controller name="company" control={form.control} render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="enrol-company">Company, for an invoice <span className="text-(--color-muted)">(optional)</span></FieldLabel>
                    <Input {...field} id="enrol-company" autoComplete="organization" />
                  </Field>
                )} />
                <Controller name="work" control={form.control} render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="enrol-work">What do you edit or grade now? <span className="text-(--color-muted)">(optional)</span></FieldLabel>
                    <Textarea {...field} id="enrol-work" rows={3} aria-invalid={fieldState.invalid} />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )} />
                <Controller name="referral" control={form.control} render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="enrol-referral">Referral code <span className="text-(--color-muted)">(optional)</span></FieldLabel>
                    <InputOTP id="enrol-referral" maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} value={field.value}
                      onChange={(v) => field.onChange(v.toUpperCase())} aria-invalid={fieldState.invalid}>
                      <InputOTPGroup>
                        {[0, 1, 2, 3, 4, 5].map((i) => <InputOTPSlot key={i} index={i} className="size-11 text-base uppercase" />)}
                      </InputOTPGroup>
                    </InputOTP>
                    <FieldDescription>From a past student: 15% off.</FieldDescription>
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )} />
                <Controller name="evenings" control={form.control} render={({ field, fieldState }) => (
                  <Field orientation="horizontal" data-invalid={fieldState.invalid} className="items-start">
                    <Checkbox id="enrol-evenings" checked={field.value} onCheckedChange={(v) => field.onChange(v === true)} aria-invalid={fieldState.invalid} className="mt-0.5 size-5" />
                    <div>
                      <FieldLabel htmlFor="enrol-evenings" className="font-normal">I can join on Tuesday and Thursday evenings, {site.session.start}–{site.session.end} Oslo time, or watch the same night.</FieldLabel>
                      <FieldError errors={[fieldState.error]} className="mt-1" />
                    </div>
                  </Field>
                )} />
                <Button type="submit" size="lg" className="mt-2 w-full">Send my request</Button>
                <p className="type-utility text-(--color-muted)">Nothing is charged now. I confirm your seat by email and send the invoice.</p>
              </>
            )}
          </FieldGroup>
        </form>
      </SheetContent>
    </Sheet>
  )
}
