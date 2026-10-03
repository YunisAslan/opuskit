'use client'
// Book a table in under 30 seconds. No booking backend yet: on submit it opens the visitor's mail app with every detail
// filled in, addressed to Fennwood — nothing is booked until the restaurant replies, and the form says so.
// The day is a Calendar in a Popover, time and party size are Selects; under 640px each opens as a bottom Sheet instead.
import { useId, useState, useSyncExternalStore, type ReactNode } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { CalendarDays, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { dinnerTimes, lunchDays, lunchTimes, openDays, partySizes, site } from '@/config/site'

const schema = z.object({
  date: z.date({ error: 'Choose a day' }),
  time: z.string({ error: 'Choose a time' }).min(1, 'Choose a time'),
  guests: z.string({ error: 'How many of you?' }).min(1, 'How many of you?'),
  name: z.string().trim().min(2, 'Your name, please'),
  email: z.email('An email address we can reply to'),
  phone: z.string().trim().optional(),
  notes: z.string().trim().max(600, 'A little shorter, please').optional(),
})
type Booking = z.infer<typeof schema>

const longDate = (d: Date) => d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })
const timesFor = (d?: Date) => (d && lunchDays.includes(d.getDay()) ? [...lunchTimes, ...dinnerTimes] : dinnerTimes)
const guestsLabel = (n: string) => (n === '1' ? '1 guest' : `${n} guests`)

/** The booking email: subject and body, ready for a mailto: link. */
export function bookingMail(b: Booking) {
  const subject = `Table for ${b.guests} on ${longDate(b.date)} at ${b.time}`
  const details = [`Day: ${longDate(b.date)}`, `Time: ${b.time}`, `Guests: ${b.guests}`, `Name: ${b.name}`, `Email: ${b.email}`,
    b.phone && `Phone: ${b.phone}`, b.notes && `Notes: ${b.notes}`].filter(Boolean)
  const body = ['Hello Fennwood,', '', 'I would like to book a table.', '', ...details].join('\n')
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

function useSmall() {
  return useSyncExternalStore(
    (cb) => { const mq = window.matchMedia('(max-width: 639px)'); mq.addEventListener('change', cb); return () => mq.removeEventListener('change', cb) },
    () => window.matchMedia('(max-width: 639px)').matches,
    () => false,
  )
}

function Field({ id, label, error, children, className }: { id: string; label: string; error?: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <Label htmlFor={id} className="type-utility mb-2 block text-(--color-text)">{label}</Label>
      {children}
      {error && <p id={`${id}-error`} className="type-utility mt-1.5 text-(--color-destructive)">{error}</p>}
    </div>
  )
}

const triggerClass = 'h-11 w-full justify-between rounded-(--radius-button) border-input bg-transparent px-3 text-base font-normal hover:bg-(--color-background)/50 focus-visible:border-(--color-text) focus-visible:bg-(--color-background)/50 aria-invalid:border-(--color-destructive)'

/** Choose one option: a Select on larger screens, a bottom Sheet of large buttons on phones. */
function Choice({ id, title, value, onChange, options, label, placeholder, invalid }: {
  id: string; title: string; value?: string; onChange: (v: string) => void; options: string[]; label: (v: string) => string; placeholder: string; invalid: boolean
}) {
  const small = useSmall()
  const [open, setOpen] = useState(false)
  const aria = { 'aria-invalid': invalid || undefined, 'aria-describedby': invalid ? `${id}-error` : undefined }
  if (small) return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button id={id} variant="outline" className={triggerClass} {...aria}>
          <span className={value ? '' : 'text-(--color-muted)'}>{value ? label(value) : placeholder}</span><ChevronDown className="opacity-60" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="max-h-[80svh] rounded-t-(--radius-card) bg-(--color-surface) px-5 pt-6 pb-8">
        <SheetTitle className="type-heading">{title}</SheetTitle>
        <SheetDescription className="sr-only">{placeholder}</SheetDescription>
        <div role="radiogroup" aria-label={title} className="grid grid-cols-3 gap-2 overflow-y-auto">
          {options.map((o) => (
            <Button key={o} role="radio" aria-checked={value === o} variant={value === o ? 'secondary' : 'outline'} className="h-12"
              onClick={() => { onChange(o); setOpen(false) }}>{label(o)}</Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
  return (
    <Select value={value ?? ''} onValueChange={onChange}>
      <SelectTrigger id={id} className="w-full aria-invalid:border-(--color-destructive)" {...aria}><SelectValue placeholder={placeholder} /></SelectTrigger>
      <SelectContent position="popper" className="bg-(--color-surface)">
        {options.map((o) => <SelectItem key={o} value={o}>{label(o)}</SelectItem>)}
      </SelectContent>
    </Select>
  )
}

/** The day: a Calendar in a Popover; on phones the same Calendar in a bottom Sheet with larger days. */
function DayField({ id, value, onChange, invalid }: { id: string; value?: Date; onChange: (d?: Date) => void; invalid: boolean }) {
  const small = useSmall()
  const [open, setOpen] = useState(false)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const last = new Date(today)
  last.setDate(today.getDate() + 60)
  const closed = [0, 1, 2, 3, 4, 5, 6].filter((d) => !openDays.includes(d))
  const trigger = (
    <Button id={id} variant="outline" className={triggerClass} aria-invalid={invalid || undefined} aria-describedby={invalid ? `${id}-error` : undefined}>
      <span className={value ? '' : 'text-(--color-muted)'}>{value ? longDate(value) : 'Choose a day'}</span><CalendarDays className="opacity-60" />
    </Button>
  )
  const calendar = (cell: string) => (
    <Calendar mode="single" selected={value} defaultMonth={value ?? today} onSelect={(d) => { onChange(d); setOpen(false) }} weekStartsOn={1}
      disabled={[{ before: today }, { after: last }, { dayOfWeek: closed }]} className={`bg-transparent ${cell}`} />
  )
  if (small) return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="bottom" className="items-center rounded-t-(--radius-card) bg-(--color-surface) px-5 pt-6 pb-8">
        <SheetTitle className="type-heading self-start">Choose a day</SheetTitle>
        <SheetDescription className="type-utility self-start text-(--color-muted)">We cook Wednesday to Sunday.</SheetDescription>
        {calendar('[--cell-size:--spacing(11)]')}
      </SheetContent>
    </Sheet>
  )
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent align="start" className="w-auto bg-(--color-surface) p-2">{calendar('[--cell-size:--spacing(10)]')}</PopoverContent>
    </Popover>
  )
}

export function BookingForm() {
  const uid = useId()
  const id = (k: string) => `${uid}-${k}`
  const { control, register, handleSubmit, setValue, getValues, formState: { errors } } = useForm<Booking>({
    resolver: zodResolver(schema), defaultValues: { name: '', email: '', phone: '', notes: '' },
  })
  const date = useWatch({ control, name: 'date' })
  const invalid = (k: keyof Booking) => ({ 'aria-invalid': !!errors[k] || undefined, 'aria-describedby': errors[k] ? `${id(k)}-error` : undefined })

  const submit = (b: Booking) => {
    window.location.assign(bookingMail(b))
    toast('Your email is ready to send', {
      description: `Your mail app should open with the booking filled in. Send it, and we confirm within a day. No mail app? Write to ${site.email} or call ${site.phone}.`,
      duration: 12000,
    })
  }

  return (
    <form noValidate onSubmit={handleSubmit(submit)} className="grid gap-5 sm:grid-cols-2">
      <Field id={id('date')} label="Day" error={errors.date?.message} className="sm:col-span-2">
        <Controller control={control} name="date" render={({ field }) => (
          <DayField id={id('date')} value={field.value} invalid={!!errors.date} onChange={(d) => {
            field.onChange(d)
            const t = getValues('time')
            if (t && !timesFor(d).includes(t)) setValue('time', '')
          }} />
        )} />
      </Field>
      <Field id={id('time')} label="Time" error={errors.time?.message}>
        <Controller control={control} name="time" render={({ field }) => (
          <Choice id={id('time')} title="Choose a time" value={field.value || undefined} onChange={field.onChange} options={timesFor(date)}
            label={(t) => t} placeholder="Choose a time" invalid={!!errors.time} />
        )} />
      </Field>
      <Field id={id('guests')} label="Guests" error={errors.guests?.message}>
        <Controller control={control} name="guests" render={({ field }) => (
          <Choice id={id('guests')} title="How many of you?" value={field.value || undefined} onChange={field.onChange} options={partySizes}
            label={guestsLabel} placeholder="How many?" invalid={!!errors.guests} />
        )} />
      </Field>
      <Field id={id('name')} label="Name" error={errors.name?.message}>
        <Input id={id('name')} autoComplete="name" {...register('name')} {...invalid('name')} />
      </Field>
      <Field id={id('email')} label="Email" error={errors.email?.message}>
        <Input id={id('email')} type="email" autoComplete="email" inputMode="email" {...register('email')} {...invalid('email')} />
      </Field>
      <Field id={id('phone')} label="Phone, if you like" error={errors.phone?.message} className="sm:col-span-2">
        <Input id={id('phone')} type="tel" autoComplete="tel" {...register('phone')} {...invalid('phone')} />
      </Field>
      <Field id={id('notes')} label="Anything we should know?" error={errors.notes?.message} className="sm:col-span-2">
        <Textarea id={id('notes')} rows={3} placeholder="Allergies, a birthday, a pram, a quiet corner" {...register('notes')} {...invalid('notes')} />
      </Field>
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" className="w-full">Book a table</Button>
        <p className="type-utility mt-3 text-(--color-muted)">This opens your email with the details filled in. Nothing is booked until we reply, usually within a day.</p>
      </div>
    </form>
  )
}
