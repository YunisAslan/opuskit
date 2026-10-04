'use client'
// OpusKit section — Newsletter: one reason to subscribe, an email field and a button, and a plain note on how often.
// The site is static, so with no provider `action` the form opens a ready-made email instead of posting anywhere.
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const schema = z.object({ email: z.string().email('That doesn’t look like an email address.') })

export function NewsletterSection({ title, text, placeholder, button, note, action, to, label = 'Email address' }: { title: string; text: string; placeholder: string; button: string; note?: string; action?: string; /** Where the subscribe email goes when there is no provider. */ to: string; label?: string }) {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) })
  const send = handleSubmit(({ email }, e) => {
    if (action) return (e?.target as HTMLFormElement).submit()
    window.location.assign(`mailto:${to}?subject=${encodeURIComponent('Subscribe me to the monthly letter')}&body=${encodeURIComponent(`Please add ${email} to the monthly letter.`)}`)
    toast('Your email app is opening with the request ready. Send it and you’re on the list.')
  })
  return (
    <section className="px-5 py-(--section-gap) md:px-8">
      <div className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-6">
          <h2 className="type-heading text-balance">{title}</h2>
          <p className="type-body mt-4 max-w-[52ch] text-(--color-muted)">{text}</p>
        </div>
        <form action={action} method={action ? 'post' : undefined} onSubmit={send} noValidate className="md:col-span-5 md:col-start-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex-1">
              <Label htmlFor="newsletter-email" className="type-body text-(--color-muted)">{label}</Label>
              <Input id="newsletter-email" type="email" autoComplete="email" placeholder={placeholder} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'newsletter-error' : undefined} className="mt-2" {...register('email')} />
            </div>
            <Button type="submit" className="type-body h-11 font-semibold">{button}</Button>
          </div>
          {errors.email && <p id="newsletter-error" role="alert" className="type-body mt-2">{errors.email.message}</p>}
          {note && <p className="type-body mt-3 text-(--color-muted)">{note}</p>}
        </form>
      </div>
    </section>
  )
}
