'use client'
// Services brief: react-hook-form + zod, inline errors under each field, toast on send.
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { ChoiceField, DateField } from '@/components/forms/pickers'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const KINDS = ['Short film', 'Music video', 'Edit and grade', 'Something else']

const schema = z.object({
  name: z.string().trim().min(2, 'Tell me your name.'),
  email: z.email('That email does not look right.'),
  kind: z.string({ error: 'Pick the closest one.' }).min(1, 'Pick the closest one.'),
  start: z.date({ error: 'Pick a rough start date.' }),
  message: z.string().trim().min(20, 'A few lines is enough, at least 20 characters.'),
  copy: z.boolean(),
})
type Brief = z.infer<typeof schema>

export function BriefForm() {
  const { register, control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Brief>({ resolver: zodResolver(schema), defaultValues: { name: '', email: '', message: '', copy: true } })

  const send = async (b: Brief) => {
    // ponytail: no backend yet — wire this to email or a form service when the site goes live.
    await new Promise((r) => setTimeout(r, 400))
    toast.success('Brief sent', { description: `Thanks, ${b.name.split(' ')[0]}. I reply within two working days.` })
    reset()
  }

  return (
    <form id="brief" onSubmit={handleSubmit(send)} noValidate className="mt-24 scroll-mt-8 border-2 border-(--color-text) bg-(--color-surface) p-6 shadow-(--shadow-card) md:mt-32 md:p-12">
      <h2 className="type-heading">Tell me about the film</h2>
      <p className="type-body mt-3 max-w-[52ch] text-(--color-muted)">Two minutes to fill in. I read every brief myself and reply within two working days.</p>
      <FieldGroup className="mt-10 grid gap-6 md:grid-cols-2">
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="name" className="type-utility">Name</FieldLabel>
          <Input id="name" autoComplete="name" aria-invalid={!!errors.name} {...register('name')} />
          <FieldError errors={[errors.name]} />
        </Field>
        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email" className="type-utility">Email</FieldLabel>
          <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} {...register('email')} />
          <FieldError errors={[errors.email]} />
        </Field>
        <Field data-invalid={!!errors.kind}>
          <FieldLabel htmlFor="kind" className="type-utility">What is it</FieldLabel>
          <Controller control={control} name="kind" render={({ field }) => <ChoiceField id="kind" label="What is it" placeholder="Choose one" options={KINDS} value={field.value} onChange={field.onChange} invalid={!!errors.kind} />} />
          <FieldError errors={[errors.kind]} />
        </Field>
        <Field data-invalid={!!errors.start}>
          <FieldLabel htmlFor="start" className="type-utility">Earliest start</FieldLabel>
          <Controller control={control} name="start" render={({ field }) => <DateField id="start" label="Earliest start" value={field.value} onChange={field.onChange} invalid={!!errors.start} />} />
          <FieldError errors={[errors.start]} />
        </Field>
        <Field data-invalid={!!errors.message} className="md:col-span-2">
          <FieldLabel htmlFor="message" className="type-utility">The film, in a few lines</FieldLabel>
          <Textarea id="message" rows={5} aria-invalid={!!errors.message} {...register('message')} />
          <FieldError errors={[errors.message]} />
        </Field>
        <Field orientation="horizontal" className="md:col-span-2">
          <Controller control={control} name="copy" render={({ field }) => <Checkbox id="copy" checked={field.value} onCheckedChange={(v) => field.onChange(v === true)} />} />
          <FieldLabel htmlFor="copy" className="type-body min-h-11 items-center">Send me a copy of this brief</FieldLabel>
        </Field>
      </FieldGroup>
      <Button type="submit" size="lg" disabled={isSubmitting} className="mt-10 w-full sm:w-auto">{isSubmitting ? 'Sending' : 'Send the brief'}</Button>
    </form>
  )
}
