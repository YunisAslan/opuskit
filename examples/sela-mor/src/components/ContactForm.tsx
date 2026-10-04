'use client'
// The main action: get in touch. Validated with react-hook-form + zod, errors inline under each field. The site is
// static (no server), so sending opens the visitor's own email app with the message written out; nothing is stored.
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { site } from '@/content/site'

const topics = ['A commission', 'A live date', 'Film or licensing', 'Press', 'Something else']

const schema = z.object({
  name: z.string().trim().min(1, 'Tell me who you are.'),
  email: z.string().email('That doesn’t look like an email address.'),
  topic: z.string({ required_error: 'Pick what it’s about.' }).min(1, 'Pick what it’s about.'),
  message: z.string().trim().min(10, 'A sentence or two, please.'),
  letter: z.boolean(),
})
type Values = z.infer<typeof schema>

const label = 'type-body text-(--color-muted)'
const error = (m?: string, id?: string) => m && <p id={id} role="alert" className="type-body mt-2">{m}</p>

export function ContactForm() {
  const { register, control, handleSubmit, formState: { errors } } = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { letter: false } })
  const send = handleSubmit((v) => {
    const to = v.topic === 'A live date' ? site.bookings : site.email
    const body = `${v.message}\n\n${v.name}\n${v.email}${v.letter ? '\n\nPlease add me to the monthly letter.' : ''}`
    window.location.assign(`mailto:${to}?subject=${encodeURIComponent(`${v.topic}, from ${v.name}`)}&body=${encodeURIComponent(body)}`)
    toast('Your email app is opening with the message written out. Send it from there.')
  })
  return (
    <form onSubmit={send} noValidate className="grid gap-6 md:grid-cols-2">
      <div>
        <Label htmlFor="c-name" className={label}>Your name</Label>
        <Input id="c-name" autoComplete="name" className="mt-2" aria-invalid={!!errors.name} aria-describedby="c-name-e" {...register('name')} />
        {error(errors.name?.message, 'c-name-e')}
      </div>
      <div>
        <Label htmlFor="c-email" className={label}>Email</Label>
        <Input id="c-email" type="email" autoComplete="email" className="mt-2" aria-invalid={!!errors.email} aria-describedby="c-email-e" {...register('email')} />
        {error(errors.email?.message, 'c-email-e')}
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="c-topic" className={label}>What it’s about</Label>
        <Controller control={control} name="topic" render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger id="c-topic" className="mt-2 w-full" aria-invalid={!!errors.topic} aria-describedby="c-topic-e" onBlur={field.onBlur}>
              <SelectValue placeholder="Choose one" />
            </SelectTrigger>
            <SelectContent position="popper">
              {topics.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
        )} />
        {error(errors.topic?.message, 'c-topic-e')}
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="c-message" className={label}>Message</Label>
        <Textarea id="c-message" rows={6} className="mt-2 min-h-40" aria-invalid={!!errors.message} aria-describedby="c-message-e" {...register('message')} />
        {error(errors.message?.message, 'c-message-e')}
      </div>
      <div className="flex min-h-11 items-center gap-3 md:col-span-2">
        <Controller control={control} name="letter" render={({ field }) => (
          <Checkbox id="c-letter" checked={field.value} onCheckedChange={(c) => field.onChange(c === true)} />
        )} />
        <Label htmlFor="c-letter" className="type-body font-normal">Add me to the monthly letter too</Label>
      </div>
      <div className="md:col-span-2">
        <Button type="submit" size="lg" variant="outline" className="type-body border-(--color-text) font-semibold hover:bg-(--color-text) hover:text-(--color-background)">Send it</Button>
      </div>
    </form>
  )
}
