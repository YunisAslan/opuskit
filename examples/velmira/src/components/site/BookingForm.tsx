'use client'
// The booking form. No booking backend yet: on submit it opens the visitor's mail app with a request to
// stay@velmira.az, every detail filled in — no fake confirmation. Dates are a Calendar in a Popover (a bottom Sheet
// on phones), guests and room are Selects; react-hook-form + zod, with the error under each field.
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { differenceInCalendarDays, format, startOfToday } from 'date-fns'
import type { DateRange } from 'react-day-picker'
import { CalendarDays } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { useMedia } from '@/hooks/use-media'

export const BOOKING_EMAIL = 'stay@velmira.az'

const guests = ['1 guest', '2 guests', '3 guests', '4 guests', '5 to 18 guests (the whole house)']
const rooms = ['Any room', 'Room 2, the Blue Room', 'Room 5, the Window Room', 'Room 8, the Linen Room', 'One of the other six rooms']

const schema = z.object({
  stay: z.object({ from: z.date().optional(), to: z.date().optional() }, { error: 'Pick the night you arrive and the day you leave.' })
    .refine((s) => s.from && s.to && differenceInCalendarDays(s.to, s.from) >= 1, 'Pick the night you arrive and the day you leave.'),
  guests: z.string({ error: 'How many of you are coming?' }).min(1, 'How many of you are coming?'),
  room: z.string(),
  name: z.string().trim().min(2, 'Your name, so we know who to write to.'),
  email: z.email('An email address we can answer.'),
  message: z.string().max(1000, 'Keep it under 1000 characters, or write to us directly.').optional(),
})
type Values = z.input<typeof schema>

const day = (d?: Date) => (d ? format(d, 'd MMM yyyy') : '')
export const nightsLabel = (r?: DateRange) => {
  if (!r?.from) return 'Choose dates'
  if (!r.to) return `${day(r.from)}, then pick the day you leave`
  const n = differenceInCalendarDays(r.to, r.from)
  return `${format(r.from, 'd MMM')} to ${day(r.to)}, ${n} night${n === 1 ? '' : 's'}`
}

export function BookingForm() {
  const phone = useMedia('(max-width: 39.99rem)')
  const [open, setOpen] = useState(false)
  const { control, register, handleSubmit, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { stay: {}, guests: '', room: rooms[0], name: '', email: '', message: '' },
  })

  const submit = (v: Values) => {
    const stay = v.stay as Required<DateRange>
    const subject = `Stay request: ${nightsLabel(stay)}`
    const body = [
      'Hello Velmira,', '', 'I would like to stay:', '',
      `Arriving: ${day(stay.from)}`, `Leaving: ${day(stay.to)}`, `Guests: ${v.guests}`, `Room: ${v.room}`, '',
      v.message ? `${v.message}\n` : '', `${v.name}`, `${v.email}`,
    ].join('\n')
    window.location.assign(`mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
    toast('Your mail app should open with the request written out.', { description: `Send it and we reply within a day. Nothing opened? Write to ${BOOKING_EMAIL}.`, duration: 9000 })
  }

  return (
    <form onSubmit={handleSubmit(submit)} noValidate>
      <FieldGroup className="gap-6">
        <Controller control={control} name="stay" render={({ field, fieldState }) => {
          const trigger = (
            <Button id="stay-dates" type="button" variant="outline" aria-invalid={fieldState.invalid}
              className="h-11 w-full justify-start border-(--color-muted) px-4 text-base font-normal hover:bg-transparent aria-expanded:border-(--color-text)">
              <CalendarDays className="text-(--color-muted)" />
              <span className={field.value?.from ? '' : 'text-(--color-muted)'}>{nightsLabel(field.value as DateRange)}</span>
            </Button>
          )
          const calendar = (
            <Calendar mode="range" numberOfMonths={1} selected={field.value as DateRange} defaultMonth={field.value?.from}
              onSelect={(r) => { field.onChange(r ?? {}); if (r?.from && r.to && differenceInCalendarDays(r.to, r.from) >= 1) setOpen(false) }}
              disabled={{ before: startOfToday() }} className="mx-auto bg-transparent [--cell-size:2.75rem]" />
          )
          return (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="stay-dates" className="type-utility">Your nights</FieldLabel>
              {phone ? (
                <Sheet open={open} onOpenChange={setOpen}>
                  <SheetTrigger asChild>{trigger}</SheetTrigger>
                  <SheetContent side="bottom" className="rounded-t-(--radius-card) border-(--color-border) bg-(--color-surface) pb-8 pt-6">
                    <SheetTitle className="type-heading px-6 [font-size:1.4rem]">Your nights</SheetTitle>
                    <SheetDescription className="px-6 text-(--color-muted)">Tap the night you arrive, then the day you leave.</SheetDescription>
                    {calendar}
                  </SheetContent>
                </Sheet>
              ) : (
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>{trigger}</PopoverTrigger>
                  <PopoverContent align="start" className="w-auto p-3">{calendar}</PopoverContent>
                </Popover>
              )}
              <FieldError errors={[fieldState.error]} />
            </Field>
          )
        }} />

        <div className="grid gap-6 sm:grid-cols-2">
          <Controller control={control} name="guests" render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="guests" className="type-utility">Guests</FieldLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="guests" aria-invalid={fieldState.invalid} className="w-full"><SelectValue placeholder="How many?" /></SelectTrigger>
                <SelectContent position="popper">{guests.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
              </Select>
              <FieldError errors={[fieldState.error]} />
            </Field>
          )} />
          <Controller control={control} name="room" render={({ field }) => (
            <Field>
              <FieldLabel htmlFor="room" className="type-utility">Room</FieldLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="room" className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent position="popper">{rooms.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
          )} />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field data-invalid={!!errors.name}>
            <FieldLabel htmlFor="name" className="type-utility">Your name</FieldLabel>
            <Input id="name" autoComplete="name" aria-invalid={!!errors.name} {...register('name')} />
            <FieldError errors={[errors.name]} />
          </Field>
          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="email" className="type-utility">Email</FieldLabel>
            <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} {...register('email')} />
            <FieldError errors={[errors.email]} />
          </Field>
        </div>

        <Field data-invalid={!!errors.message}>
          <FieldLabel htmlFor="message" className="type-utility">Anything we should know <span className="text-(--color-muted)">(optional)</span></FieldLabel>
          <Textarea id="message" rows={3} placeholder="Arriving late, a birthday, a pillow you can't sleep without" aria-invalid={!!errors.message} {...register('message')} />
          <FieldError errors={[errors.message]} />
        </Field>

        <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <Button type="submit" size="lg" className="w-full sm:w-auto">Check availability</Button>
          <p className="type-utility text-(--color-muted)">Opens your mail app. We reply within a day.</p>
        </div>
      </FieldGroup>
    </form>
  )
}
