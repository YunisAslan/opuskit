'use client'
// The booking form: name, email, a Saturday (Calendar in a Popover), a session and how many (Selects), a note.
// It writes the booking into an email to the studio and says so on screen — the studio confirms by reply.
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Check } from 'lucide-react'
import { Choice } from '@/components/parts/Choice'
import { DateField, formatDay } from '@/components/parts/DateField'
import { useSend } from '@/components/parts/use-send'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { workshops } from '@/content/workshops'
import { site } from '@/content/site'

const f = workshops.reservation.form
const schema = z.object({
  name: z.string().trim().min(1, f.errors.name),
  email: z.string().trim().email(f.errors.email),
  date: z.date({ required_error: f.errors.date, invalid_type_error: f.errors.date }),
  session: z.string().min(1, f.errors.session),
  people: z.string().min(1, f.errors.people),
  message: z.string().optional(),
})
type Values = z.infer<typeof schema>
const PEOPLE = Array.from({ length: 8 }, (_, i) => ({ value: String(i + 1), label: i ? `${i + 1} people` : 'Just me' }))

export function BookingForm() {
  const form = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { name: '', email: '', session: '', people: '', message: '' } })
  const { send, state } = useSend()
  const [sent, setSent] = useState(false)
  const submit = form.handleSubmit((v) => {
    const session = f.sessions.find((s) => s.value === v.session)!.label
    const body = `Hello Pip & Kiln,\n\nI'd like to book a Saturday at the wheel.\n\nName: ${v.name}\nEmail: ${v.email}\nSaturday: ${formatDay(v.date)}\nSession: ${session}\nHow many: ${v.people}\n${v.message ? `\nNote: ${v.message}\n` : ''}\nPlease confirm if there's space. Thanks!`
    send(`mailto:${site.email}?subject=${encodeURIComponent(`Workshop booking, ${formatDay(v.date)}`)}&body=${encodeURIComponent(body)}`).then(() => setSent(true))
  })
  return (
    <Form {...form}>
      <form onSubmit={submit} noValidate className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem><FormLabel>{f.name}</FormLabel><FormControl><Input autoComplete="name" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem><FormLabel>{f.email}</FormLabel><FormControl><Input type="email" inputMode="email" autoComplete="email" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
        </div>
        <FormField control={form.control} name="date" render={({ field, fieldState }) => (
          <FormItem><FormLabel>{f.date}</FormLabel><FormControl><DateField label={f.date} value={field.value} onChange={field.onChange} placeholder={f.datePlaceholder} invalid={!!fieldState.error} /></FormControl><FormMessage /></FormItem>
        )} />
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField control={form.control} name="session" render={({ field, fieldState }) => (
            <FormItem><FormLabel>{f.session}</FormLabel><FormControl><Choice label={f.session} value={field.value} onChange={field.onChange} options={f.sessions} placeholder={f.sessionPlaceholder} invalid={!!fieldState.error} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="people" render={({ field, fieldState }) => (
            <FormItem><FormLabel>{f.people}</FormLabel><FormControl><Choice label={f.people} value={field.value} onChange={field.onChange} options={PEOPLE} placeholder={f.peoplePlaceholder} invalid={!!fieldState.error} /></FormControl><FormMessage /></FormItem>
          )} />
        </div>
        <FormField control={form.control} name="message" render={({ field }) => (
          <FormItem><FormLabel>{f.message}</FormLabel><FormControl><Textarea placeholder={f.messagePlaceholder} {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <Button type="submit" size="lg" className="mt-2 w-full">
          {state === 'wait' && <span aria-hidden className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none" />}
          <span className={state === 'wait' ? 'sr-only' : ''}>{f.submit}</span>
        </Button>
        <p aria-live="polite" className="type-caption min-h-5">{sent && <span className="inline-flex items-start gap-2 font-semibold"><Check className="mt-0.5 size-4 shrink-0" strokeWidth={3} />{f.handoff}</span>}</p>
      </form>
    </Form>
  )
}
