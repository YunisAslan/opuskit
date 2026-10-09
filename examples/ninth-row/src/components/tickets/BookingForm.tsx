'use client'
// The booking form: a night (Calendar in a Popover), a screening that night (Select), how many tickets (Select), a seat
// from the plan, a name, an email, a note. No booking service is connected yet, so it opens the visitor's own email app
// with every detail filled in, addressed to the box office — and says so. It never pretends a booking was made.
// Links from the programme arrive with the night, time and film already chosen (?day=…&time=…&film=…).
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Choice, DatePick } from '@/components/forms/Pickers'
import { SendButton, useSend } from '@/components/forms/SendButton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { reservation, seatPlan } from '@/content/tickets'
import { week } from '@/content/programme'
import { site } from '@/content/site'
import { SeatPlan, type Seat } from './SeatPlan'

const F = reservation.form
const schema = z.object({
  date: z.date({ error: F.errors.date }),
  time: z.string({ error: F.errors.time }).min(1, F.errors.time),
  count: z.string(),
  name: z.string().trim().min(1, F.errors.name),
  email: z.string().trim().email(F.errors.email),
  notes: z.string().optional(),
})
type Values = z.infer<typeof schema>

function nextDateFor(label: string) {
  const day = week.find((d) => d.label.toLowerCase() === label.toLowerCase())
  if (!day) return undefined
  const d = new Date(); d.setHours(0, 0, 0, 0)
  while (d.getDay() !== day.weekday) d.setDate(d.getDate() + 1)
  return d
}

const counts = Array.from({ length: 8 }, (_, i) => ({ value: String(i + 1), label: i === 0 ? '1 ticket' : `${i + 1} tickets` }))

export function BookingForm() {
  const params = useSearchParams()
  const [seat, setSeat] = useState<Seat>(null)
  const { state, spin, send, reset: resetSend } = useSend()
  const { control, register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { count: '2', notes: '', name: '', email: '' },
  })

  // arriving from the programme: fill in the night and the screening
  useEffect(() => {
    const day = params.get('day'), time = params.get('time')
    if (day) { const d = nextDateFor(day); if (d) setValue('date', d) }
    if (time) setValue('time', time)
  }, [params, setValue])

  const date = watch('date')
  const screenings = useMemo(() => {
    if (!date) return []
    return (week.find((d) => d.weekday === date.getDay())?.items ?? []).map((it) => ({ value: it.time, label: `${it.time}, ${it.title}` }))
  }, [date])
  // a night without the chosen time clears the screening
  const time = watch('time')
  useEffect(() => { if (date && time && !screenings.some((s) => s.value === time)) setValue('time', '') }, [date, time, screenings, setValue])

  const onSubmit = handleSubmit((v) => send(() => {
    const film = screenings.find((s) => s.value === v.time)?.label ?? v.time
    const lines = [
      `Night: ${v.date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}`,
      `Screening: ${film}`,
      `Tickets: ${v.count}`,
      `Seat: ${seat ? seatPlan.chosen(seat.row, seat.seat) : F.seatNone}`,
      `Name: ${v.name}`,
      `Email: ${v.email}`,
      v.notes ? `Note: ${v.notes}` : '',
    ].filter(Boolean)
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Tickets: ${film}`)}&body=${encodeURIComponent(lines.join('\n'))}`
    toast(F.done)
  }))

  if (state === 'done') return (
    <div role="status" className="flex min-h-[24rem] flex-col justify-center">
      <p className="type-display text-[clamp(3rem,5vw,4.5rem)]">Check your email app</p>
      <p className="type-body mt-4 max-w-[46ch] text-(--color-muted)">{F.done}</p>
      <button type="button" onClick={() => { reset(); setSeat(null); resetSend() }} className="btn btn-line mt-8 self-start">{F.again}</button>
    </div>
  )

  const err = (k: keyof Values) => errors[k] && <p id={`b-${k}-error`} className="type-caption mt-2 text-(--color-error)">{errors[k]?.message as string}</p>

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="b-date">{F.date}</Label>
          <div className="mt-2">
            <Controller control={control} name="date" render={({ field }) => <DatePick id="b-date" label={F.date} value={field.value} onChange={field.onChange} placeholder={F.datePlaceholder} invalid={!!errors.date} describedBy="b-date-error" />} />
          </div>
          {err('date')}
        </div>
        <div>
          <Label htmlFor="b-time">{F.time}</Label>
          <div className="mt-2">
            <Controller control={control} name="time" render={({ field }) => <Choice id="b-time" label={F.time} value={field.value || undefined} onChange={field.onChange} options={screenings} placeholder={date ? F.timePlaceholder : F.timeEmpty} empty={date ? F.timeNone : F.timeEmpty} invalid={!!errors.time} describedBy="b-time-error" />} />
          </div>
          {err('time')}
        </div>
        <div className="sm:col-span-2 sm:max-w-[calc(50%-12px)]">
          <Label htmlFor="b-count">{F.count}</Label>
          <div className="mt-2">
            <Controller control={control} name="count" render={({ field }) => <Choice id="b-count" label={F.count} value={field.value} onChange={field.onChange} options={counts} placeholder="2 tickets" />} />
          </div>
        </div>
      </div>

      <fieldset>
        <legend className="type-utility flex w-full items-baseline justify-between gap-4 text-(--color-muted)"><span>{seatPlan.title}</span><span className="type-caption">{F.seatHint}</span></legend>
        <div className="mt-6"><SeatPlan value={seat} onChange={setSeat} /></div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="b-name">{F.name}</Label>
          <Input id="b-name" autoComplete="name" enterKeyHint="next" className="mt-2" aria-invalid={!!errors.name} aria-describedby="b-name-error" {...register('name')} />
          {err('name')}
        </div>
        <div>
          <Label htmlFor="b-email">{F.email}</Label>
          <Input id="b-email" type="email" inputMode="email" autoComplete="email" enterKeyHint="next" className="mt-2" aria-invalid={!!errors.email} aria-describedby="b-email-error" {...register('email')} />
          {err('email')}
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="b-notes">{F.notes}</Label>
          <Textarea id="b-notes" placeholder={F.notesPlaceholder} className="mt-2" {...register('notes')} />
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-(--color-border) pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="type-caption max-w-[40ch] text-(--color-muted)">Opens your email app, addressed to {site.email}, with everything above filled in.</p>
        <SendButton label={F.submit} state={state} spin={spin} className="w-full sm:w-auto" />
      </div>
    </form>
  )
}
