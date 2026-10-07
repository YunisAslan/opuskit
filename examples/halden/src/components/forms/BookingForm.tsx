'use client'
// The booking form (shadcn Form + react-hook-form + zod): name, email, the day (a Calendar in a Popover / bottom
// Sheet), the time and party size (Select / bottom Sheet), a note. It hands off to email with every detail filled
// in — nothing pretends to be booked until the bathhouse answers.
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod/mini'
import { ChoiceField, DateField, field } from '@/components/forms/Fields'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, useFormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { brand, reservation } from '@/content/site'

const f = reservation.form

// zod/mini keeps the validation out of the heavy bundle; same rules, inline messages under each field.
const schema = z.object({
  name: z.string().check(z.trim(), z.minLength(1, f.errors.name)),
  email: z.email(f.errors.email),
  date: z.date({ error: f.errors.date }),
  time: z.string({ error: f.errors.time }).check(z.minLength(1, f.errors.time)),
  guests: z.string({ error: f.errors.guests }).check(z.minLength(1, f.errors.guests)),
  message: z.optional(z.string()),
})
const longDay = (d: Date) => d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
const today = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d }
type Values = z.infer<typeof schema>

/** Ties a custom picker to its label and message the way FormControl does for native fields. */
function useIds() {
  const { formItemId, formDescriptionId, formMessageId, error } = useFormField()
  return { id: formItemId, invalid: !!error, describedBy: error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId }
}
function DatePicker({ value, onChange }: { value?: Date; onChange: (d?: Date) => void }) {
  const ids = useIds()
  // Closed on Mondays (⚑ owner to confirm), and no days in the past.
  return <DateField {...ids} value={value} onChange={onChange} placeholder={f.datePlaceholder} title={f.date} disabled={[{ before: today() }, { dayOfWeek: [1] }]} />
}
function Choice({ value, onChange, options, placeholder, title }: { value?: string; onChange: (v: string) => void; options: readonly string[]; placeholder: string; title: string }) {
  const ids = useIds()
  return <ChoiceField {...ids} value={value} onChange={onChange} options={options} placeholder={placeholder} title={title} />
}

export function BookingForm() {
  const form = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { name: '', email: '', time: '', guests: '', message: '' } })

  const submit = (v: Values) => {
    const day = longDay(v.date)
    const subject = `Session request: ${day}, ${v.time}, ${v.guests} ${v.guests === '1' ? 'guest' : 'guests'}`
    const body = [`Name: ${v.name}`, `Email: ${v.email}`, `Day: ${day}`, `Time: ${v.time}`, `Guests: ${v.guests}`, v.message ? `\n${v.message}` : ''].join('\n')
    window.location.assign(`mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
    toast(f.toast, { description: f.toastLine })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} noValidate className="grid gap-6 sm:grid-cols-2">
        <FormField control={form.control} name="name" render={({ field: fl }) => (
          <FormItem><FormLabel>{f.name}</FormLabel><FormControl><Input autoComplete="name" className={field} {...fl} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="email" render={({ field: fl }) => (
          <FormItem><FormLabel>{f.email}</FormLabel><FormControl><Input type="email" autoComplete="email" className={field} {...fl} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="date" render={({ field: fl }) => (
          <FormItem className="sm:col-span-2"><FormLabel>{f.date}</FormLabel><DatePicker value={fl.value} onChange={fl.onChange} /><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="time" render={({ field: fl }) => (
          <FormItem><FormLabel>{f.time}</FormLabel><Choice value={fl.value} onChange={fl.onChange} options={reservation.times} placeholder={f.timePlaceholder} title={f.time} /><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="guests" render={({ field: fl }) => (
          <FormItem><FormLabel>{f.guests}</FormLabel><Choice value={fl.value} onChange={fl.onChange} options={reservation.guests} placeholder={f.guestsPlaceholder} title={f.guests} /><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="message" render={({ field: fl }) => (
          <FormItem className="sm:col-span-2"><FormLabel>{f.message}</FormLabel><FormControl><Textarea rows={3} placeholder={f.messagePlaceholder} className={`${field} h-auto min-h-28 py-3`} {...fl} /></FormControl><FormMessage /></FormItem>
        )} />
        <div className="sm:col-span-2">
          <button type="submit" className="btn btn-solid w-full">{f.submit}</button>
          <p className="type-utility mt-4 text-(--color-muted)">{f.handoff}</p>
        </div>
      </form>
    </Form>
  )
}
