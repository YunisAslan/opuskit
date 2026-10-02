'use client'
// The one form: say hello. A static site has no server, so a valid note opens the visitor's email app with it
// written out, addressed to the studio (and a toast says so). react-hook-form + zod, inline errors under each field.
// `onPick` lets the Contact page take the colour of the project type picked — every choice brings its own ground.
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Magnetic } from '@/components/pieces/Magnetic'
import { brand, projectTypes } from '@/content/site'

const schema = z.object({
  name: z.string().trim().min(1, 'We’d love to know what to call you.'),
  email: z.string().trim().email('That email looks a little unstuck. Check it?'),
  kind: z.string().min(1, 'Pick the closest one. “Stickers, obviously” is allowed.'),
  message: z.string().trim().min(10, 'A sentence or two is plenty, but we need at least that.'),
  post: z.boolean(),
})
type Values = z.infer<typeof schema>

const field = 'type-body h-12 rounded-(--radius-button) border-(--color-muted) bg-(--color-surface)/60 px-4 focus-visible:border-(--color-text) aria-invalid:border-(--color-text) aria-invalid:border-2'

export function ContactForm({ onPick, id = 'project' }: { onPick?: (ground: string) => void; id?: string }) {
  const { control, register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Values>({
    resolver: zodResolver(schema), defaultValues: { name: '', email: '', kind: '', message: '', post: false },
  })

  const send = (v: Values) => {
    const kind = projectTypes.find((t) => t.value === v.kind)?.label ?? v.kind
    const body = `${v.message}\n\nProject: ${kind}\nFrom: ${v.name} (${v.email})${v.post ? '\nPS: yes to the sticker post, please.' : ''}`
    window.location.assign(`mailto:${brand.email}?subject=${encodeURIComponent(`New project: ${kind}`)}&body=${encodeURIComponent(body)}`)
    toast('Your email app is opening with your note in it.', { description: `If nothing happens, write to ${brand.email} and we’ll reply within two working days.` })
    reset()
  }

  return (
    <form noValidate onSubmit={handleSubmit(send)} className="text-(--color-text)">
      <FieldGroup className="gap-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Field data-invalid={!!errors.name}>
            <FieldLabel htmlFor={`${id}-name`} className="type-utility">Your name</FieldLabel>
            <Input id={`${id}-name`} autoComplete="name" aria-invalid={!!errors.name} className={field} {...register('name')} />
            <FieldError className="type-utility text-(--color-text)" errors={[errors.name]} />
          </Field>
          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor={`${id}-email`} className="type-utility">Email</FieldLabel>
            <Input id={`${id}-email`} type="email" autoComplete="email" aria-invalid={!!errors.email} className={field} {...register('email')} />
            <FieldError className="type-utility text-(--color-text)" errors={[errors.email]} />
          </Field>
        </div>
        <Field data-invalid={!!errors.kind}>
          <FieldLabel htmlFor={`${id}-kind`} className="type-utility">What are we making?</FieldLabel>
          <Controller control={control} name="kind" render={({ field: f }) => (
            <Select value={f.value} onValueChange={(v) => { f.onChange(v); onPick?.(projectTypes.find((t) => t.value === v)!.ground) }}>
              <SelectTrigger id={`${id}-kind`} aria-invalid={!!errors.kind} className={`${field} w-full data-[size=default]:h-12`}><SelectValue placeholder="Pick one" /></SelectTrigger>
              <SelectContent position="popper" className="rounded-(--radius-card) border border-(--color-text) bg-(--color-surface)">
                {projectTypes.map((t) => <SelectItem key={t.value} value={t.value} className="type-body min-h-11 rounded-none px-4 focus:bg-(--color-secondary)">{t.label}</SelectItem>)}
              </SelectContent>
            </Select>
          )} />
          <FieldError className="type-utility text-(--color-text)" errors={[errors.kind]} />
        </Field>
        <Field data-invalid={!!errors.message}>
          <FieldLabel htmlFor={`${id}-message`} className="type-utility">What’s stuck?</FieldLabel>
          <Textarea id={`${id}-message`} rows={4} aria-invalid={!!errors.message} className={`${field} h-auto min-h-32 py-3`} {...register('message')} />
          <FieldError className="type-utility text-(--color-text)" errors={[errors.message]} />
        </Field>
        <Controller control={control} name="post" render={({ field: f }) => (
          <Field orientation="horizontal" className="min-h-11 items-center gap-3">
            <Checkbox id={`${id}-post`} checked={f.value} onCheckedChange={(c) => f.onChange(c === true)} className="size-6 rounded-none border-(--color-text) focus-visible:border-2" />
            <FieldLabel htmlFor={`${id}-post`} className="type-body font-normal">Put me on the sticker post: four envelopes a year, no newsletters.</FieldLabel>
          </Field>
        )} />
        <div>
          <Magnetic>
            <Button type="submit" disabled={isSubmitting} className="type-body h-14 rounded-(--radius-button) px-8 hover:bg-(--color-muted) focus-visible:bg-(--color-muted)">Send it over</Button>
          </Magnetic>
        </div>
      </FieldGroup>
    </form>
  )
}
