'use client'
// Contact form (react-hook-form + zod, shadcn Field controls, inline errors). The site is static, so sending opens the
// visitor's own mail app with the message filled in, addressed to Halvik — nothing is stored anywhere.
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod/mini' // the small build of zod: same checks, a fraction of the JavaScript
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Magnetic } from '@/components/pieces/Magnetic'
import { email } from '@/config/product'

const topics = { order: 'An order', shipping: 'Shipping and returns', switches: 'Switches and keycaps', dial: 'The Halvik Dial', other: 'Something else' } as const

const topicKeys = Object.keys(topics) as [keyof typeof topics, ...(keyof typeof topics)[]]
const schema = z.object({
  name: z.string().check(z.trim(), z.minLength(2, 'Tell us your name.')),
  from: z.email('That email doesn’t look right.'),
  topic: z.enum(topicKeys, { error: 'Pick a topic.' }),
  message: z.string().check(z.trim(), z.minLength(10, 'A sentence or two helps us answer.'), z.maxLength(2000, 'Keep it under 2000 characters.')),
  news: z.boolean(),
})
type Values = z.infer<typeof schema>

export function ContactForm() {
  const { control, handleSubmit, reset } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', from: '', topic: undefined, message: '', news: false },
  })

  const send = (v: Values) => {
    const body = `${v.message}\n\n${v.name}\n${v.from}${v.news ? '\n\nPlease email me when new colours launch.' : ''}`
    window.location.assign(`mailto:${email}?subject=${encodeURIComponent(`${topics[v.topic]}, from ${v.name}`)}&body=${encodeURIComponent(body)}`)
    toast.success('Your mail app is opening', { description: `The message is ready to send to ${email}.` })
    reset()
  }

  return (
    <form noValidate onSubmit={handleSubmit(send)} className="mt-16 max-w-[720px] rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) p-6 md:p-10">
      <h2 className="type-heading">Write to us</h2>
      <FieldGroup className="mt-8 gap-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Controller name="name" control={control} render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="c-name">Name</FieldLabel>
              <Input {...field} id="c-name" autoComplete="name" aria-invalid={fieldState.invalid} />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )} />
          <Controller name="from" control={control} render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="c-email">Email</FieldLabel>
              <Input {...field} id="c-email" type="email" autoComplete="email" inputMode="email" aria-invalid={fieldState.invalid} />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )} />
        </div>
        <Controller name="topic" control={control} render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="c-topic">What is it about?</FieldLabel>
            <Select name={field.name} value={field.value ?? ''} onValueChange={field.onChange}>
              <SelectTrigger id="c-topic" className="w-full" aria-invalid={fieldState.invalid} onBlur={field.onBlur}><SelectValue placeholder="Pick a topic" /></SelectTrigger>
              <SelectContent position="popper">{Object.entries(topics).map(([k, label]) => <SelectItem key={k} value={k}>{label}</SelectItem>)}</SelectContent>
            </Select>
            <FieldError errors={[fieldState.error]} />
          </Field>
        )} />
        <Controller name="message" control={control} render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="c-message">Message</FieldLabel>
            <Textarea {...field} id="c-message" rows={5} aria-invalid={fieldState.invalid} />
            <FieldError errors={[fieldState.error]} />
          </Field>
        )} />
        <Controller name="news" control={control} render={({ field }) => (
          <Field orientation="horizontal" className="min-h-11">
            <Checkbox id="c-news" checked={field.value} onCheckedChange={(c) => field.onChange(c === true)} />
            <FieldLabel htmlFor="c-news" className="font-normal">Email me when new colours launch</FieldLabel>
          </Field>
        )} />
      </FieldGroup>
      <div className="mt-8"><Magnetic><Button type="submit" size="lg">Send message</Button></Magnetic></div>
    </form>
  )
}
