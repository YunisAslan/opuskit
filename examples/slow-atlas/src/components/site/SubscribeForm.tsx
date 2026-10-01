'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

const schema = z.object({ email: z.email('That doesn’t look like an email address.') })

// The newsletter form: react-hook-form + zod, inline error under the field, a toast on success.
// With an action (your email provider's URL) it posts there after validating; without one it confirms on the page.
export function SubscribeForm({ action, placeholder, button, label, note }: { action?: string; placeholder: string; button: string; label: string; note?: string }) {
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), defaultValues: { email: '' } })
  const error = form.formState.errors.email
  return (
    <form noValidate action={action || undefined} method={action ? 'post' : undefined}
      onSubmit={form.handleSubmit((_, e) => {
        if (action) return (e?.target as HTMLFormElement).submit()
        toast('You’re on the list.', { description: 'The next issue arrives on Sunday morning.' })
        form.reset()
      })}>
      <Field data-invalid={!!error} className="gap-2">
        <FieldLabel htmlFor="subscribe-email" className="type-utility text-(--color-muted)">{label}</FieldLabel>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input id="subscribe-email" type="email" autoComplete="email" placeholder={placeholder} aria-invalid={!!error} {...form.register('email')} />
          <Button type="submit" size="lg" className="shrink-0">{button}</Button>
        </div>
        <FieldError errors={[error]} className="type-utility text-(--color-text)" />
      </Field>
      {note && <p className="type-utility mt-3 text-(--color-muted)">{note}</p>}
    </form>
  )
}
