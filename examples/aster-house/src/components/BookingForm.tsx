'use client'
// Book a viewing: name, email, which house, a preferred day. The site is static, so sending opens the visitor's own
// mail app with the request written out to the sales office. shadcn Select, Calendar in a Popover, Input, Label.
import { useSearchParams } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import { CalendarIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { houses, houseBySlug, statusLabel } from '@/data/houses'
import { site } from '@/data/site'

const field = 'h-12 rounded-(--radius-button) border-(--color-muted) bg-transparent px-3 text-[1rem] font-(family-name:--font-body) focus-visible:border-(--color-text) aria-invalid:border-(--color-accent)'
const fmt = (d: Date) => d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
const ANY = 'any'

type Errors = Partial<Record<'name' | 'email' | 'day', string>>

export function BookingForm() {
  const params = useSearchParams()
  const start = houseBySlug(params.get('house') ?? '')
  const [house, setHouse] = useState(start && start.status !== 'sold' ? start.slug : ANY)
  const [day, setDay] = useState<Date>()
  const [open, setOpen] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const today = new Date(); today.setHours(0, 0, 0, 0)

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const name = String(f.get('name') ?? '').trim(), email = String(f.get('email') ?? '').trim(), note = String(f.get('note') ?? '').trim()
    const next: Errors = {}
    if (!name) next.name = 'Please tell us your name.'
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = 'Please give an email we can answer.'
    if (!day) next.day = 'Please pick a day.'
    setErrors(next)
    if (Object.keys(next).length) return
    const h = houseBySlug(house)
    const subject = `Viewing request: ${h ? h.name : 'Aster House'}, ${fmt(day!)}`
    const body = [
      'Hello,', '',
      `I would like to book a viewing at Aster House.`, '',
      `Name: ${name}`, `Email: ${email}`, `House: ${h ? `${h.name} (built around ${h.time})` : 'Not sure yet, please suggest one'}`, `Preferred day: ${fmt(day!)}`,
      ...(note ? ['', note] : []), '', 'Thank you.',
    ].join('\n')
    location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    toast('Your mail app should open with the request written out. Send it, and we will reply within a working day.')
  }

  return (
    <form onSubmit={submit} onInput={() => Object.keys(errors).length && setErrors({})} noValidate className="grid gap-6 md:grid-cols-2">
      <div className="grid gap-2">
        <Label htmlFor="name" className="type-utility">Your name</Label>
        <Input id="name" name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} className={field} />
        {errors.name && <p id="name-error" className="type-utility text-(--color-accent)">{errors.name}</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email" className="type-utility">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} className={field} />
        {errors.email && <p id="email-error" className="type-utility text-(--color-accent)">{errors.email}</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="house" className="type-utility">Which house</Label>
        <Select value={house} onValueChange={setHouse}>
          <SelectTrigger id="house" className={`${field} w-full`}><SelectValue /></SelectTrigger>
          <SelectContent position="popper" className="max-h-80 rounded-(--radius-card) border-(--color-border) bg-(--color-surface)">
            <SelectItem value={ANY} className="min-h-11 text-[1rem]">Not sure yet</SelectItem>
            {houses.map((h) => (
              <SelectItem key={h.slug} value={h.slug} disabled={h.status === 'sold'} className="min-h-11 text-[1rem]">
                {h.name} <span className="type-utility text-(--color-muted)">{h.time}{h.status !== 'available' ? `, ${statusLabel[h.status].toLowerCase()}` : ''}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="day" className="type-utility">Preferred day</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button id="day" type="button" data-invalid={errors.day ? "" : undefined} aria-describedby={errors.day ? 'day-error' : undefined}
              className={`${field} flex w-full items-center justify-between border text-left outline-none data-invalid:border-(--color-accent) ${day ? '' : 'text-(--color-muted)'}`}>
              {day ? fmt(day) : 'Pick a day'}<CalendarIcon className="size-4 opacity-70" strokeWidth={1.25} />
            </button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-auto rounded-(--radius-card) border-(--color-border) bg-(--color-surface) p-2">
            <Calendar mode="single" selected={day} onSelect={(d) => { setDay(d); setOpen(false) }} disabled={{ before: today }} weekStartsOn={1}
              className="bg-transparent [--cell-size:2.75rem]" />
          </PopoverContent>
        </Popover>
        {errors.day && <p id="day-error" className="type-utility text-(--color-accent)">{errors.day}</p>}
      </div>
      <div className="grid gap-2 md:col-span-2">
        <Label htmlFor="note" className="type-utility">Anything we should know <span className="text-(--color-muted)">(optional)</span></Label>
        <Textarea id="note" name="note" rows={3} className={`${field} h-auto min-h-24 py-3`} />
      </div>
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4 md:col-span-2">
        <button type="submit" className="type-body inline-flex min-h-14 items-center rounded-(--radius-button) bg-(--color-primary) px-8 text-(--color-background) transition-opacity duration-150 hover:opacity-85 focus-visible:underline">Send the request</button>
        <p className="type-utility max-w-[40ch] text-(--color-muted)">This opens your mail app with the request written out to {site.email}. Nothing is stored on this site.</p>
      </div>
    </form>
  )
}
