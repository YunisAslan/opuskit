'use client'
// RSVP — one button with the date beside it, repeated after the schedule. Opens a sheet: name, email, which Thursday,
// how many seats. Nothing is connected, so "Write the email" opens the visitor's email app with everything filled in,
// addressed to the gallery, and says so on screen. It never pretends a seat is booked.
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { rsvp, site, talks } from '@/content/site'
import { cn } from '@/lib/utils'

const schema = z.object({
  name: z.string().trim().min(1, rsvp.errors.name),
  email: z.string().trim().email(rsvp.errors.email),
  evening: z.string().min(1, rsvp.errors.evening),
  seats: z.number().int().min(1).max(6),
})
type Values = z.infer<typeof schema>

const field = 'type-body mt-2 block min-h-11 w-full rounded-(--radius-button) border border-(--color-muted) bg-(--color-surface) px-4 py-2 outline-none transition-colors duration-150 focus:border-(--color-text) aria-invalid:border-(--color-error)'

export function Rsvp({ className }: { className?: string }) {
  const next = talks[0]
  const [sent, setSent] = useState(false)
  const { register, handleSubmit, control, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(schema), defaultValues: { name: '', email: '', evening: next.date, seats: 2 },
  })

  const submit = (v: Values) => {
    const body = `Name: ${v.name}\nEmail: ${v.email}\nEvening: ${v.evening}\nSeats: ${v.seats}\n`
    window.location.assign(`mailto:${site.email}?subject=${encodeURIComponent(rsvp.subject(v.evening))}&body=${encodeURIComponent(body)}`)
    setSent(true)
    toast(rsvp.title, { description: rsvp.done })
  }

  return (
    <div className={cn('flex flex-wrap items-center gap-x-8 gap-y-3', className)}>
      <Sheet onOpenChange={(o) => !o && setSent(false)}>
        <SheetTrigger asChild><Button className="min-w-32">{rsvp.button}</Button></SheetTrigger>
        <SheetContent side="right" className="px-(--gutter) pb-10 pt-5">
          <div className="flex justify-end"><SheetClose className="type-utility -mr-3 min-h-11 cursor-pointer px-3">Close</SheetClose></div>
          <SheetTitle className="type-display mt-8 [font-size:clamp(2.5rem,5vw,3.5rem)]">{rsvp.title}</SheetTitle>
          <SheetDescription className="mt-4 max-w-[44ch]">{rsvp.intro}</SheetDescription>

          {sent ? (
            <p role="status" className="type-body mt-10 border-t border-(--color-text) pt-6">{rsvp.done}</p>
          ) : (
            <form noValidate onSubmit={handleSubmit(submit)} className="mt-10 space-y-7">
              <div>
                <label htmlFor="rsvp-name" className="type-utility">{rsvp.fields.name}</label>
                <input id="rsvp-name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'rsvp-name-e' : undefined} className={field} {...register('name')} />
                {errors.name && <p id="rsvp-name-e" className="type-caption mt-2 text-(--color-error)">{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="rsvp-email" className="type-utility">{rsvp.fields.email}</label>
                <input id="rsvp-email" type="email" autoComplete="email" inputMode="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'rsvp-email-e' : undefined} className={field} {...register('email')} />
                {errors.email && <p id="rsvp-email-e" className="type-caption mt-2 text-(--color-error)">{errors.email.message}</p>}
              </div>
              <Controller control={control} name="evening" render={({ field: f }) => (
                <fieldset>
                  <legend className="type-utility">{rsvp.fields.evening}</legend>
                  <div role="radiogroup" aria-label={rsvp.fields.evening} className="mt-2 border-t border-(--color-border)">
                    {talks.map((t) => {
                      const on = f.value === t.date
                      return (
                        <button key={t.iso} type="button" role="radio" aria-checked={on} onClick={() => f.onChange(t.date)}
                          className={cn('flex min-h-11 w-full cursor-pointer items-baseline justify-between gap-4 border-b border-(--color-border) px-3 py-3 text-left transition-colors duration-150 hover:bg-(--color-secondary) focus-visible:bg-(--color-secondary)', on && 'bg-(--color-text) text-(--color-background) hover:bg-(--color-text) focus-visible:bg-(--color-muted)')}>
                          <span className="type-body">{t.label}</span>
                          <span className="type-caption text-right opacity-80">{t.items[1].title}</span>
                        </button>
                      )
                    })}
                  </div>
                  {errors.evening && <p className="type-caption mt-2 text-(--color-error)">{errors.evening.message}</p>}
                </fieldset>
              )} />
              <Controller control={control} name="seats" render={({ field: f }) => (
                <div>
                  <p id="rsvp-seats" className="type-utility">{rsvp.fields.seats}</p>
                  <div role="group" aria-labelledby="rsvp-seats" className="mt-2 inline-flex items-center border border-(--color-muted)">
                    <Button type="button" variant="outline" size="icon" className="border-0" aria-label={rsvp.less} disabled={f.value <= 1} onClick={() => f.onChange(f.value - 1)}>−</Button>
                    <output aria-live="polite" className="type-body w-12 text-center tabular-nums">{f.value}</output>
                    <Button type="button" variant="outline" size="icon" className="border-0" aria-label={rsvp.more} disabled={f.value >= 6} onClick={() => f.onChange(f.value + 1)}>+</Button>
                  </div>
                </div>
              )} />
              <div className="border-t border-(--color-border) pt-6">
                <Button type="submit" className="w-full">{rsvp.submit}</Button>
                <p className="type-caption mt-3 text-(--color-muted)">To {site.email}</p>
              </div>
            </form>
          )}
        </SheetContent>
      </Sheet>
      <p className="type-utility"><span className="text-(--color-muted)">{rsvp.next} </span><time dateTime={next.iso}>{next.date}</time></p>
    </div>
  )
}
