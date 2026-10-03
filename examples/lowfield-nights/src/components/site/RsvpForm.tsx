'use client'
// The RSVP form. No backend yet: on send it opens the visitor's mail app with every detail filled in, addressed to the
// RSVP inbox — nothing is confirmed until they send that email, and the toast says so.
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { toast } from 'sonner'
import { CalendarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { EVENT } from '@/lib/event'

const schema = z.object({
  name: z.string().trim().min(2, 'Tell us your name, so we can find you at the door.'),
  email: z.string().trim().email('That email doesn’t look right.'),
  night: z.string({ required_error: 'Pick one of the three nights.' }).min(1, 'Pick one of the three nights.'),
  guests: z.string({ required_error: 'How many of you are coming?' }).min(1, 'How many of you are coming?'),
  arrival: z.string().optional(),
  note: z.string().max(600, 'Keep it under 600 characters.').optional(),
})
type Values = z.infer<typeof schema>

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
const nightOf = (date?: string) => EVENT.nights.find((n) => n.date === date)
const arrivals = ['Free shuttle from 28 May metro', 'By car', 'Taxi or other']
const field = 'type-body h-11 border-(--color-muted) bg-transparent px-3 focus-visible:border-(--color-text)'

export function RsvpForm() {
  const [dateOpen, setDateOpen] = useState(false)
  const { register, control, handleSubmit, formState: { errors } } = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { name: '', email: '', night: '', guests: '', note: '' } })

  const send = (v: Values) => {
    const night = nightOf(v.night)!
    const body = [
      `Name: ${v.name}`, `Email: ${v.email}`, `Night: ${night.label} 2027`, `Seats: ${v.guests}`,
      v.arrival && `Arriving: ${v.arrival}`, v.note && `\nNote: ${v.note}`,
    ].filter(Boolean).join('\n')
    window.location.assign(`mailto:${EVENT.email}?subject=${encodeURIComponent(`RSVP: ${night.short}, ${v.guests} ${v.guests === '1' ? 'seat' : 'seats'}`)}&body=${encodeURIComponent(body)}`)
    toast('Your mail app should open with the RSVP filled in.', { description: `Send it to ${EVENT.email} to hold your seat; we reply within two days.` })
  }

  return (
    <form id="rsvp-form" onSubmit={handleSubmit(send)} noValidate>
      <FieldGroup>
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="rsvp-name" className="type-utility">Name</FieldLabel>
          <Input id="rsvp-name" autoComplete="name" aria-invalid={!!errors.name} className={field} {...register('name')} />
          <FieldError errors={[errors.name]} className="type-utility" />
        </Field>
        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="rsvp-email" className="type-utility">Email</FieldLabel>
          <Input id="rsvp-email" type="email" autoComplete="email" aria-invalid={!!errors.email} className={field} {...register('email')} />
          <FieldError errors={[errors.email]} className="type-utility" />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Controller control={control} name="night" render={({ field: f }) => (
            <Field data-invalid={!!errors.night}>
              <FieldLabel htmlFor="rsvp-night" className="type-utility">Night</FieldLabel>
              <Popover open={dateOpen} onOpenChange={setDateOpen}>
                <PopoverTrigger asChild>
                  <Button id="rsvp-night" type="button" variant="outline" aria-invalid={!!errors.night} className={`${field} w-full justify-between font-normal`}>
                    {nightOf(f.value)?.label ?? <span className="text-(--color-muted)">Pick a night</span>}
                    <CalendarIcon className="size-4 text-(--color-muted)" aria-hidden />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto border border-(--color-border) bg-(--color-background) p-2 ring-0">
                  <Calendar
                    mode="single"
                    className="[--cell-size:--spacing(11)]"
                    defaultMonth={new Date(2027, 5, 1)}
                    startMonth={new Date(2027, 5, 1)}
                    endMonth={new Date(2027, 5, 1)}
                    selected={f.value ? new Date(`${f.value}T12:00:00`) : undefined}
                    disabled={(d) => !nightOf(iso(d))}
                    onSelect={(d) => { f.onChange(d ? iso(d) : ''); setDateOpen(false) }}
                  />
                  <p className="type-utility px-2 pb-1 text-(--color-muted)">Three nights: 12, 13 and 14 June.</p>
                </PopoverContent>
              </Popover>
              <FieldError errors={[errors.night]} className="type-utility" />
            </Field>
          )} />
          <Controller control={control} name="guests" render={({ field: f }) => (
            <Field data-invalid={!!errors.guests}>
              <FieldLabel htmlFor="rsvp-guests" className="type-utility">Seats</FieldLabel>
              <Select value={f.value} onValueChange={f.onChange}>
                <SelectTrigger id="rsvp-guests" aria-invalid={!!errors.guests} className={`${field} w-full`}><SelectValue placeholder="How many" /></SelectTrigger>
                <SelectContent position="popper" className="border border-(--color-border) bg-(--color-background) ring-0">
                  {['1', '2', '3', '4'].map((n) => <SelectItem key={n} value={n} className="type-body min-h-11">{n === '1' ? '1 seat' : `${n} seats`}</SelectItem>)}
                </SelectContent>
              </Select>
              <FieldError errors={[errors.guests]} className="type-utility" />
            </Field>
          )} />
        </div>
        <Controller control={control} name="arrival" render={({ field: f }) => (
          <Field>
            <FieldLabel htmlFor="rsvp-arrival" className="type-utility">How you’ll arrive (optional)</FieldLabel>
            <Select value={f.value} onValueChange={f.onChange}>
              <SelectTrigger id="rsvp-arrival" className={`${field} w-full`}><SelectValue placeholder="Shuttle, car or taxi" /></SelectTrigger>
              <SelectContent position="popper" className="border border-(--color-border) bg-(--color-background) ring-0">
                {arrivals.map((a) => <SelectItem key={a} value={a} className="type-body min-h-11">{a}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
        )} />
        <Field data-invalid={!!errors.note}>
          <FieldLabel htmlFor="rsvp-note" className="type-utility">Anything we should know? (optional)</FieldLabel>
          <Textarea id="rsvp-note" rows={3} placeholder="Access needs, a seat near the musicians…" aria-invalid={!!errors.note} className="type-body min-h-24 border-(--color-muted) bg-transparent px-3 focus-visible:border-(--color-text)" {...register('note')} />
          <FieldError errors={[errors.note]} className="type-utility" />
        </Field>
        <div className="flex flex-col gap-3 pt-2">
          <Button type="submit" size="lg" className="type-body w-full">Send my RSVP</Button>
          <p className="type-utility text-(--color-muted)">Opens your mail app with the details filled in, addressed to {EVENT.email}.</p>
        </div>
      </FieldGroup>
    </form>
  )
}
