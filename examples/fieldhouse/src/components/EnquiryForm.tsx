'use client'
// The main action — get in touch. react-hook-form + zod, shadcn fields, errors inline under each field. There is no
// server: a valid enquiry opens the visitor's own email, addressed to the studio and already written, and a toast
// confirms it. (Swap `send` for a form endpoint when the studio has one.)
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { contact, studio } from '@/content/site'

const schema = z.object({
  name: z.string().trim().min(1, 'Please tell us your name.'),
  email: z.email('Please check your email address.'),
  place: z.string().trim().min(2, 'Roughly where is the barn?'),
  stage: z.string().min(1, 'Choose the one closest to you.'),
  message: z.string().trim().min(10, 'A line or two about the barn helps us reply.'),
  consent: z.boolean().refine((v) => v, 'We need this to write back to you.'),
})
type Enquiry = z.infer<typeof schema>

function send(v: Enquiry) {
  const body = `${v.message}\n\nWhere: ${v.place}\nStage: ${v.stage}\n\n${v.name}\n${v.email}`
  window.location.href = `mailto:${studio.email}?subject=${encodeURIComponent(`A barn in ${v.place}`)}&body=${encodeURIComponent(body)}`
}

/** Under 640px the choice opens as a bottom Sheet; above it, the shadcn Select. */
function StageSelect({ id, value, onChange, invalid }: { id: string; value: string; onChange: (v: string) => void; invalid: boolean }) {
  const [open, setOpen] = useState(false)
  const trigger = 'type-body flex h-11 w-full items-center justify-between rounded-button border border-input bg-transparent px-3 text-left outline-none transition-colors focus-visible:border-ring data-invalid:border-destructive'
  return (
    <>
      <div className="max-sm:hidden">
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger id={id} aria-invalid={invalid}><SelectValue placeholder="Choose one" /></SelectTrigger>
          <SelectContent position="popper">
            {contact.form.stages.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="sm:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button type="button" data-invalid={invalid || undefined} aria-labelledby={`${id}-label`} className={trigger}>
              <span className={value ? '' : 'text-muted-foreground'}>{value || 'Choose one'}</span>
              <ChevronDownIcon className="size-4 text-muted-foreground" />
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-card bg-popover px-(--gutter) pb-8 pt-6">
            <SheetTitle className="type-heading [font-size:1.5rem]">Where are you with the barn?</SheetTitle>
            <ul role="listbox" aria-label="Where are you with the barn?" className="mt-2 border-t border-border">
              {contact.form.stages.map((s) => (
                <li key={s} className="border-b border-border">
                  <button type="button" role="option" aria-selected={s === value} onClick={() => { onChange(s); setOpen(false) }} className="type-body flex min-h-14 w-full items-center justify-between text-left">
                    {s}{s === value && <CheckIcon className="size-4" />}
                  </button>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

export function EnquiryForm({ onSent }: { onSent?: () => void }) {
  const { control, handleSubmit, reset } = useForm<Enquiry>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', place: '', stage: '', message: '', consent: false },
  })
  const submit = (v: Enquiry) => {
    send(v)
    toast(contact.form.sent, { description: 'Your email app has opened with your message in it.' })
    reset()
    onSent?.()
  }
  const text = (name: 'name' | 'email' | 'place', label: string, auto: string, type = 'text') => (
    <Controller name={name} control={control} render={({ field, fieldState }) => (
      <Field data-invalid={fieldState.invalid}>
        <FieldLabel htmlFor={`enq-${name}`}>{label}</FieldLabel>
        <Input {...field} id={`enq-${name}`} type={type} autoComplete={auto} aria-invalid={fieldState.invalid} />
        <FieldError className="type-utility" errors={[fieldState.error]} />
      </Field>
    )} />
  )

  return (
    <form id="enquiry" onSubmit={handleSubmit(submit)} noValidate className="scroll-mt-24">
      <FieldGroup className="gap-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {text('name', 'Your name', 'name')}
          {text('email', 'Your email', 'email', 'email')}
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {text('place', 'Where the barn is', 'off')}
          <Controller name="stage" control={control} render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel id="enq-stage-label" htmlFor="enq-stage">Where you are with it</FieldLabel>
              <StageSelect id="enq-stage" value={field.value} onChange={field.onChange} invalid={fieldState.invalid} />
              <FieldError className="type-utility" errors={[fieldState.error]} />
            </Field>
          )} />
        </div>
        <Controller name="message" control={control} render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="enq-message">Tell us about the barn</FieldLabel>
            <Textarea {...field} id="enq-message" rows={5} aria-invalid={fieldState.invalid} placeholder="What it is built of, how old it is, what you hope it becomes." />
            <FieldError className="type-utility" errors={[fieldState.error]} />
          </Field>
        )} />
        <Controller name="consent" control={control} render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} orientation="horizontal" className="items-start">
            <Checkbox id="enq-consent" checked={field.value} onCheckedChange={(c) => field.onChange(c === true)} aria-invalid={fieldState.invalid} className="mt-0.5" />
            <div className="space-y-1">
              <FieldLabel htmlFor="enq-consent" className="type-body leading-snug">Keep my details so you can reply. <Link href="/privacy" className="link-line text-(--color-muted)">Privacy</Link></FieldLabel>
              <FieldError className="type-utility" errors={[fieldState.error]} />
            </div>
          </Field>
        )} />
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-2">
          <Button type="submit" size="lg" className="max-sm:w-full">{contact.form.submit}</Button>
          <a href={`mailto:${studio.email}`} className="type-utility link-line text-(--color-muted)">or write to {studio.email}</a>
        </div>
      </FieldGroup>
    </form>
  )
}

/** Home's closing action: the same form, in a Sheet. */
export function EnquirySheet({ label }: { label: string }) {
  const [open, setOpen] = useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild><Button size="lg">{label}</Button></SheetTrigger>
      <SheetContent side="right" className="w-full overflow-y-auto bg-background px-(--gutter) pb-10 pt-16 data-[side=right]:w-full data-[side=right]:sm:max-w-xl">
        <SheetTitle className="type-display mb-10 [font-size:clamp(2.5rem,5vw,3.5rem)]">{contact.headline}</SheetTitle>
        <EnquiryForm onSent={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}
