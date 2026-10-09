'use client'
// Newsletter — one reason to subscribe beside an email field and a button, a plain note under it. No mailing service is
// connected yet, so the form opens the visitor's own email app with the request filled in, and says so — it never
// pretends a subscription happened.
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { After, Lines } from '@/components/motion/Reveal'
import { SendButton, useSend } from '@/components/forms/SendButton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type Copy = { title: string; text: string; label: string; placeholder: string; button: string; note: string; sent: string; invalid: string }

export function NewsletterSection({ copy, to, titleLines }: { copy: Copy; to: string; titleLines: string[] }) {
  const schema = z.object({ email: z.string().trim().email(copy.invalid) })
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) })
  const { state, spin, send } = useSend()
  const onSubmit = handleSubmit(({ email }) => send(() => {
    const body = `Please add ${email} to the Monday email with the week's programme.`
    window.location.href = `mailto:${to}?subject=${encodeURIComponent('The week, on Monday morning')}&body=${encodeURIComponent(body)}`
  }))
  return (
    <section className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto grid max-w-(--container) gap-10 border-t border-(--color-border) pt-16 md:grid-cols-12 md:items-end md:gap-6 md:pt-24">
        <div className="md:col-span-6">
          <Lines lines={titleLines} className="type-display text-[clamp(3rem,5.6vw,5.5rem)]" />
          <After delay={0.3}><p className="type-body mt-6 max-w-[46ch] text-(--color-muted)">{copy.text}</p></After>
        </div>
        <After delay={0.4} className="md:col-span-5 md:col-start-8">
          <form onSubmit={onSubmit} noValidate>
            <Label htmlFor="nl-email">{copy.label}</Label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Input id="nl-email" type="email" autoComplete="email" inputMode="email" enterKeyHint="send" placeholder={copy.placeholder} aria-invalid={!!errors.email} aria-describedby="nl-note nl-error" className="sm:flex-1" {...register('email')} />
              <SendButton label={copy.button} state={state} spin={spin} className="w-full sm:w-auto" />
            </div>
            {errors.email && <p id="nl-error" className="type-caption mt-2 text-(--color-error)">{errors.email.message}</p>}
            <p id="nl-note" role="status" className="type-caption mt-3 text-(--color-muted)">{state === 'done' ? copy.sent : copy.note}</p>
          </form>
        </After>
      </div>
    </section>
  )
}
