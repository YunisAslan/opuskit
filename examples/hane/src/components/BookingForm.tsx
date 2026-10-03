'use client'
// The booking form: treatment, day (Calendar in a Popover — a bottom sheet on phones), time, and how to reach you.
// Validated with zod; sending opens the visitor's mail app with everything filled in (no backend yet).
import { zodResolver } from '@hookform/resolvers/zod'
import { format, startOfToday } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { FormField, fieldLook } from '@/components/FormField'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { site } from '@/config/site'
import { HOURS } from '@/lib/hours'
import { openMail } from '@/lib/mail'

export const TREATMENTS = ['First visit, 60 minutes', 'Hands-on treatment, 45 minutes', 'Slow-movement session, 45 minutes', 'Not sure yet, help me choose']

/** Start times for a day: on the hour, the last one an hour before closing; today only the ones still ahead. */
function slots(d?: Date) {
  const h = d && HOURS[d.getDay()]
  if (!h) return []
  const now = new Date()
  const from = d.toDateString() === now.toDateString() ? now.getHours() * 60 + now.getMinutes() + 30 : 0
  const out: string[] = []
  for (let m = h[0]; m <= h[1] - 60; m += 60) if (m >= from) out.push(`${String(m / 60).padStart(2, '0')}:00`)
  return out
}

const schema = z.object({
  treatment: z.string().min(1, 'Choose what you would like to book'),
  date: z.date({ error: 'Choose a day' }),
  time: z.string().min(1, 'Choose a time'),
  name: z.string().trim().min(2, 'Tell us your name'),
  email: z.email('Check your email address'),
  phone: z.string().trim().optional(),
  note: z.string().max(600, 'Keep it under 600 characters').optional(),
})
type Values = z.infer<typeof schema>

export function BookingForm() {
  const [dayOpen, setDayOpen] = useState(false)
  const { control, register, handleSubmit, getValues, setValue, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(schema), defaultValues: { treatment: '', time: '', name: '', email: '', phone: '', note: '' },
  })
  const date = useWatch({ control, name: 'date' })
  const times = slots(date)

  const send = (v: Values) => {
    const day = format(v.date, 'EEEE d MMMM yyyy')
    openMail(site.email, `Booking request: ${v.treatment.split(',')[0]}, ${format(v.date, 'EEE d MMM')} at ${v.time}`, [
      ['Treatment', v.treatment], ['Day', day], ['Time', v.time], ['Name', v.name], ['Email', v.email], ['Phone', v.phone], ['Note', v.note],
    ])
    toast('Your mail app is opening', { description: 'Send the message and we will confirm your time within one working day. Nothing reaches us until you press send.' })
  }

  return (
    <form id="book" onSubmit={handleSubmit(send)} noValidate className="grid gap-x-4 gap-y-6 sm:grid-cols-2">
      <FormField id="b-treatment" label="Treatment" error={errors.treatment?.message} className="sm:col-span-2">
        <Controller control={control} name="treatment" render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger id="b-treatment" aria-invalid={!!errors.treatment} className={`${fieldLook} w-full`}><SelectValue placeholder="What would you like to book?" /></SelectTrigger>
            <SelectContent position="popper">{TREATMENTS.map((t) => <SelectItem key={t} value={t} className="type-body min-h-10">{t}</SelectItem>)}</SelectContent>
          </Select>
        )} />
      </FormField>

      <FormField id="b-date" label="Day" error={errors.date?.message}>
        <Controller control={control} name="date" render={({ field }) => (
          <Popover open={dayOpen} onOpenChange={setDayOpen}>
            <PopoverTrigger asChild>
              <Button id="b-date" type="button" variant="outline" aria-invalid={!!errors.date} className={`${fieldLook} w-full justify-between px-3 font-normal hover:bg-(--color-surface)`}>
                {field.value ? format(field.value, 'EEEE d MMMM') : <span className="text-(--color-muted)">Pick a day</span>}
                <CalendarIcon className="text-(--color-muted)" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto items-center p-1">
              <Calendar mode="single" selected={field.value} weekStartsOn={1}
                onSelect={(d) => { field.onChange(d); if (d && !slots(d).includes(getValues('time'))) setValue('time', ''); setDayOpen(false) }}
                disabled={[{ before: startOfToday() }, (day: Date) => slots(day).length === 0]} className="[--cell-size:--spacing(11)]" />
            </PopoverContent>
          </Popover>
        )} />
      </FormField>

      <FormField id="b-time" label="Time" error={errors.time?.message}>
        <Controller control={control} name="time" render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange} disabled={!date}>
            <SelectTrigger id="b-time" aria-invalid={!!errors.time} className={`${fieldLook} w-full`}><SelectValue placeholder={date ? 'Pick a time' : 'Pick a day first'} /></SelectTrigger>
            <SelectContent position="popper">{times.map((t) => <SelectItem key={t} value={t} className="type-body min-h-10">{t}</SelectItem>)}</SelectContent>
          </Select>
        )} />
      </FormField>

      <FormField id="b-name" label="Name" error={errors.name?.message}>
        <Input id="b-name" autoComplete="name" aria-invalid={!!errors.name} className={fieldLook} {...register('name')} />
      </FormField>
      <FormField id="b-email" label="Email" error={errors.email?.message}>
        <Input id="b-email" type="email" autoComplete="email" aria-invalid={!!errors.email} className={fieldLook} {...register('email')} />
      </FormField>
      <FormField id="b-phone" label="Phone (if you would like a call back)" error={errors.phone?.message} className="sm:col-span-2">
        <Input id="b-phone" type="tel" autoComplete="tel" className={fieldLook} {...register('phone')} />
      </FormField>
      <FormField id="b-note" label="Anything we should know (optional)" error={errors.note?.message} className="sm:col-span-2">
        <Textarea id="b-note" rows={4} placeholder="Where it hurts, how long for, a practitioner you would like to see" aria-invalid={!!errors.note} className={`${fieldLook} h-auto min-h-28 py-2.5`} {...register('note')} />
      </FormField>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:col-span-2">
        <Button type="submit">Send booking request</Button>
        <p className="type-utility max-w-[40ch] text-(--color-muted)">Opens your mail app with this filled in. We confirm within one working day.</p>
      </div>
    </form>
  )
}
