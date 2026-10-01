'use client'
// The main action, get in touch: a short brief (react-hook-form + zod, inline errors under each field). The site is
// static, so sending opens the visitor's email app with the brief already written to the studio's address.
// ponytail: mailto hand-off, no inbox of its own; swap onSubmit for a form service (Formspree, Basin) if one is wanted.
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { contact } from '@/content/site'

const kinds = ['A name', 'A name and identity', 'A campaign', 'Packaging or menus', 'Signs and wayfinding', 'Not sure yet']

const schema = z.object({
  name: z.string().trim().min(1, 'Tell us who you are.'),
  email: z.email('That email address doesn’t look right.'),
  kind: z.string().min(1, 'Pick the closest one, “Not sure yet” counts.'),
  message: z.string().trim().min(20, 'A couple of sentences, please: what, when, roughly how much.'),
  call: z.boolean(),
})
type Brief = z.infer<typeof schema>

const field = 'h-12 rounded-none border-(--color-muted) bg-transparent px-4 text-base! placeholder:text-(--color-muted)'
const label = 'type-utility text-[0.875rem]!'
const error = 'type-utility text-(--color-text)! before:content-["!_"]'

export function BriefForm() {
  const { register, control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Brief>({
    resolver: zodResolver(schema), defaultValues: { name: '', email: '', kind: '', message: '', call: false },
  })

  const send = (b: Brief) => {
    const body = `${b.message}\n\n${b.name}\n${b.email}${b.call ? '\n\nHappy to start with a 30-minute call.' : ''}`
    window.location.assign(`mailto:${contact.email}?subject=${encodeURIComponent(`${b.kind}: a brief from ${b.name}`)}&body=${encodeURIComponent(body)}`)
    toast('Your email app should open with the brief written.', { description: `If it doesn’t, write to ${contact.email}.` })
    reset()
  }

  return (
    <form id="brief" noValidate onSubmit={handleSubmit(send)} className="scroll-mt-24">
      <FieldGroup className="gap-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Field data-invalid={!!errors.name}>
            <FieldLabel htmlFor="name" className={label}>Your name</FieldLabel>
            <Input id="name" autoComplete="name" aria-invalid={!!errors.name} className={field} {...register('name')} />
            <FieldError className={error} errors={[errors.name]} />
          </Field>
          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="email" className={label}>Email</FieldLabel>
            <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} className={field} {...register('email')} />
            <FieldError className={error} errors={[errors.email]} />
          </Field>
        </div>
        <Field data-invalid={!!errors.kind}>
          <FieldLabel htmlFor="kind" className={label}>What do you need?</FieldLabel>
          <Controller control={control} name="kind" render={({ field: f }) => (
            <Select value={f.value} onValueChange={f.onChange}>
              <SelectTrigger id="kind" aria-invalid={!!errors.kind} onBlur={f.onBlur} className={`${field} w-full data-[size=default]:h-12`}>
                <SelectValue placeholder="Pick the closest" />
              </SelectTrigger>
              <SelectContent position="popper" className="rounded-none border border-(--color-text) bg-(--color-surface)">
                {kinds.map((k) => <SelectItem key={k} value={k} className="type-body min-h-11 rounded-none px-4 focus:bg-(--color-secondary)">{k}</SelectItem>)}
              </SelectContent>
            </Select>
          )} />
          <FieldError className={error} errors={[errors.kind]} />
        </Field>
        <Field data-invalid={!!errors.message}>
          <FieldLabel htmlFor="message" className={label}>Tell us about it</FieldLabel>
          <Textarea id="message" rows={5} aria-invalid={!!errors.message} placeholder="What you’re opening, when, and roughly what you can spend."
            className={`${field} h-auto min-h-36 py-3`} {...register('message')} />
          <FieldError className={error} errors={[errors.message]} />
        </Field>
        <Controller control={control} name="call" render={({ field: f }) => (
          <Field orientation="horizontal" className="min-h-11 items-center">
            <Checkbox id="call" checked={f.value} onCheckedChange={(v) => f.onChange(v === true)} className="size-5 rounded-none border-(--color-muted)" />
            <FieldLabel htmlFor="call" className="type-body font-normal!">I’d like to start with a 30-minute call</FieldLabel>
          </Field>
        )} />
        <div>
          <Button type="submit" disabled={isSubmitting}
            className="type-body h-auto min-h-12 rounded-(--radius-button) bg-(--color-primary) px-7 text-base! font-normal! text-(--color-background) hover:bg-(--color-muted) focus-visible:bg-(--color-muted)">
            Send the brief
          </Button>
        </div>
      </FieldGroup>
    </form>
  )
}
