'use client'
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
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const TOPICS = ['A project', 'A collaboration', 'Prints', 'Just saying hello']
const schema = z.object({
  name: z.string().trim().min(1, 'Tell me what to call you.'),
  email: z.email('That address doesn’t look right.'),
  topic: z.string().min(1, 'Pick the closest one.'),
  message: z.string().trim().min(10, 'A sentence or two is plenty.'),
  letter: z.boolean(),
})
type Values = z.infer<typeof schema>

// No server needed: a valid form opens the visitor's mail app with the message written out.
// ponytail: mailto hand-off, swap for a form endpoint (Formspree, a route handler) when you want messages stored.
export function ContactForm({ email }: { email: string }) {
  const { register, control, handleSubmit, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(schema), defaultValues: { name: '', email: '', topic: '', message: '', letter: false },
  })
  const send = (v: Values) => {
    const body = `${v.message}\n\n${v.name}\n${v.email}${v.letter ? '\n\nPlease add me to the monthly letter.' : ''}`
    window.location.assign(`mailto:${email}?subject=${encodeURIComponent(`${v.topic}, from ${v.name}`)}&body=${encodeURIComponent(body)}`)
    toast('Your mail app should open with the message ready.', { description: `If it doesn’t, write to ${email}.` })
  }
  const copy = async () => {
    try { await navigator.clipboard.writeText(email); toast('Address copied.') } catch { toast(`Write to ${email}`) }
  }
  const err = (m?: string) => m && <FieldError>{m}</FieldError>

  return (
    <form noValidate onSubmit={handleSubmit(send)} className="type-body">
      <FieldGroup className="gap-7">
        <div className="grid gap-7 sm:grid-cols-2">
          <Field data-invalid={!!errors.name}><FieldLabel htmlFor="name" className="type-utility text-(--color-muted)">Your name</FieldLabel>
            <Input id="name" autoComplete="name" aria-invalid={!!errors.name} {...register('name')} />{err(errors.name?.message)}</Field>
          <Field data-invalid={!!errors.email}><FieldLabel htmlFor="email" className="type-utility text-(--color-muted)">Your email</FieldLabel>
            <Input id="email" type="email" autoComplete="email" placeholder="you@example.com" aria-invalid={!!errors.email} {...register('email')} />{err(errors.email?.message)}</Field>
        </div>
        <Field data-invalid={!!errors.topic}><FieldLabel htmlFor="topic" className="type-utility text-(--color-muted)">What it’s about</FieldLabel>
          <Controller control={control} name="topic" render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="topic" aria-invalid={!!errors.topic} className="w-full" onBlur={field.onBlur}><SelectValue placeholder="Choose one" /></SelectTrigger>
              <SelectContent position="popper">{TOPICS.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
            </Select>
          )} />{err(errors.topic?.message)}</Field>
        <Field data-invalid={!!errors.message}><FieldLabel htmlFor="message" className="type-utility text-(--color-muted)">Your message</FieldLabel>
          <Textarea id="message" placeholder="What are you making, and when do you need it?" aria-invalid={!!errors.message} {...register('message')} />{err(errors.message?.message)}</Field>
        <Field orientation="horizontal" className="min-h-11">
          <Controller control={control} name="letter" render={({ field }) => <Checkbox id="letter" checked={field.value} onCheckedChange={(c) => field.onChange(c === true)} />} />
          <FieldLabel htmlFor="letter" className="font-normal">Add me to the monthly letter too</FieldLabel>
        </Field>
      </FieldGroup>
      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
        <Button type="submit" className="h-12 px-8">Send it</Button>
        <Tooltip>
          <TooltipTrigger asChild>
            <button type="button" onClick={copy} className="type-utility h-11 px-1 text-(--color-muted) underline decoration-(--color-border) underline-offset-4 transition-colors hover:text-(--color-text)">or copy {email}</button>
          </TooltipTrigger>
          <TooltipContent>Copy the address</TooltipContent>
        </Tooltip>
      </div>
    </form>
  )
}
