'use client'
// The booking form: day (Calendar in a Popover), time and guests (Selects), name, email, a note. Nothing is connected
// yet, so sending opens the visitor's email app with every field filled in, addressed to the bar — and says so.
// Under 640px the day, time and guest pickers open as bottom sheets.
import { useEffect, useState, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { format, startOfDay } from 'date-fns'
import { CalendarIcon, ChevronDownIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { brand, guestOptions, reservation, times } from '@/content/site'
import { useIsMobile } from './useIsMobile'

const f = reservation.form
const schema = z.object({
  date: z.date({ error: f.errors.date }),
  time: z.string({ error: f.errors.time }).min(1, f.errors.time),
  guests: z.string({ error: f.errors.guests }).min(1, f.errors.guests),
  name: z.string().trim().min(1, f.errors.name),
  email: z.string().trim().email(f.errors.email),
  note: z.string().optional(),
})
export type Booking = z.infer<typeof schema>
export type BookingDraft = Partial<Booking>

export const dayLabel = (d: Date) => format(d, 'EEEE d MMMM')
const guestLabel = (g: string) => (g === '1' ? 'Just me' : `${g} people`)

const trigger = 'type-body flex h-12 w-full cursor-pointer items-center justify-between gap-2 rounded-(--radius-button) border border-(--color-muted) bg-(--color-background) px-4 text-left transition-colors duration-150 ease-out outline-none hover:border-(--color-text)/80 focus-field aria-invalid:border-(--color-error)'

function Choice({ value, onChange, options, label, placeholder, show, mobile, invalid, id }: {
  value?: string; onChange: (v: string) => void; options: string[]; label: string; placeholder: string
  show: (v: string) => string; mobile: boolean; invalid?: boolean; id?: string
}) {
  const [open, setOpen] = useState(false)
  if (!mobile) return (
    <Select value={value ?? ''} onValueChange={onChange}>
      <SelectTrigger id={id} aria-invalid={invalid}><SelectValue placeholder={placeholder} /></SelectTrigger>
      <SelectContent>{options.map((o) => <SelectItem key={o} value={o}>{show(o)}</SelectItem>)}</SelectContent>
    </Select>
  )
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger id={id} aria-invalid={invalid} className={`${trigger} ${value ? '' : 'text-(--color-muted)'}`}>
        {value ? show(value) : placeholder}<ChevronDownIcon className="size-4 text-(--color-muted)" />
      </SheetTrigger>
      <SheetContent side="bottom" className="px-(--gutter) pt-6 pb-[max(24px,env(safe-area-inset-bottom))]">
        <SheetTitle>{label}</SheetTitle>
        <SheetDescription className="sr-only">{placeholder}</SheetDescription>
        <div role="radiogroup" aria-label={label} className="grid grid-cols-3 gap-2 overflow-y-auto">
          {options.map((o) => (
            <button key={o} type="button" role="radio" aria-checked={value === o} onClick={() => { onChange(o); setOpen(false) }}
              className="type-body h-12 cursor-pointer rounded-(--radius-button) border border-(--color-border) tabular-nums transition-colors duration-150 outline-none hover:bg-(--color-secondary) aria-checked:border-(--color-text) aria-checked:bg-(--color-text) aria-checked:text-(--color-background) focus-fill">
              {show(o)}
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export function BookingForm({ onDraft, onSent, beforeSubmit }: { onDraft?: (d: BookingDraft) => void; onSent?: (b: Booking) => void; beforeSubmit?: ReactNode }) {
  const mobile = useIsMobile()
  const [dayOpen, setDayOpen] = useState(false)
  const form = useForm<Booking>({ resolver: zodResolver(schema), defaultValues: { name: '', email: '', note: '', time: '', guests: '' } })

  useEffect(() => {
    if (!onDraft) return
    const sub = form.watch((v) => onDraft(v as BookingDraft))
    return () => sub.unsubscribe()
  }, [form, onDraft])

  const send = (b: Booking) => {
    const subject = `Table for ${b.guests}, ${dayLabel(b.date)} at ${b.time}`
    const body = [
      `Hello Low Hum,`, ``,
      `I would like to book a table.`, ``,
      `Day: ${dayLabel(b.date)}`, `Time: ${b.time}`, `Guests: ${b.guests}`, `Name: ${b.name}`, `Email: ${b.email}`,
      b.note ? `Note: ${b.note}` : '', ``, `Thank you!`,
    ].filter((l) => l !== null).join('\n')
    window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    toast.success(f.toastTitle, { description: f.toastBody })
    onSent?.(b)
  }

  const today = startOfDay(new Date())
  const closed = (d: Date) => d < today || d.getDay() === 1 // Mondays the records rest

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(send)} noValidate className="grid gap-6 sm:grid-cols-2">
        <FormField control={form.control} name="date" render={({ field, fieldState }) => {
          const label = field.value ? dayLabel(field.value) : f.datePlaceholder
          const cal = <Calendar mode="single" selected={field.value} onSelect={(d) => { field.onChange(d); setDayOpen(false) }} disabled={closed} defaultMonth={field.value} weekStartsOn={1} autoFocus />
          return (
            <FormItem className="sm:col-span-2">
              <FormLabel>{f.date}</FormLabel>
              {mobile ? (
                <Sheet open={dayOpen} onOpenChange={setDayOpen}>
                  <FormControl>
                    <SheetTrigger className={`${trigger} ${field.value ? '' : 'text-(--color-muted)'}`} aria-invalid={!!fieldState.error}>
                      {label}<CalendarIcon className="size-4 text-(--color-muted)" />
                    </SheetTrigger>
                  </FormControl>
                  <SheetContent side="bottom" className="items-center px-(--gutter) pt-6 pb-[max(24px,env(safe-area-inset-bottom))]">
                    <SheetTitle className="self-start">{f.date}</SheetTitle>
                    <SheetDescription className="sr-only">{f.datePlaceholder}</SheetDescription>
                    {cal}
                  </SheetContent>
                </Sheet>
              ) : (
                <Popover open={dayOpen} onOpenChange={setDayOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <button type="button" className={`${trigger} ${field.value ? '' : 'text-(--color-muted)'}`}>
                        {label}<CalendarIcon className="size-4 text-(--color-muted)" />
                      </button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent>{cal}</PopoverContent>
                </Popover>
              )}
              <FormMessage />
            </FormItem>
          )
        }} />

        <FormField control={form.control} name="time" render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>{f.time}</FormLabel>
            <FormControl>
              <Choice value={field.value} onChange={field.onChange} options={times} label={f.time} placeholder={f.timePlaceholder} show={(v) => v} mobile={mobile} invalid={!!fieldState.error} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="guests" render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>{f.guests}</FormLabel>
            <FormControl>
              <Choice value={field.value} onChange={field.onChange} options={guestOptions} label={f.guests} placeholder={f.guestsPlaceholder} show={mobile ? (v) => v : guestLabel} mobile={mobile} invalid={!!fieldState.error} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <FormLabel>{f.name}</FormLabel>
            <FormControl><Input autoComplete="name" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>{f.email}</FormLabel>
            <FormControl><Input type="email" autoComplete="email" inputMode="email" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="note" render={({ field }) => (
          <FormItem className="sm:col-span-2">
            <FormLabel>{f.note}</FormLabel>
            <FormControl><Textarea placeholder={f.notePlaceholder} rows={3} {...field} /></FormControl>
          </FormItem>
        )} />

        {beforeSubmit && <div className="sm:col-span-2">{beforeSubmit}</div>}

        <div className="sm:col-span-2">
          <Button type="submit" size="lg" className="w-full">{f.submit}</Button>
          <p className="type-caption mt-4 text-(--color-muted)">
            {f.where} <a className="link-hum text-(--color-text)" href={`mailto:${brand.email}`}>{brand.email}</a>. {f.after}
          </p>
        </div>
      </form>
    </Form>
  )
}
