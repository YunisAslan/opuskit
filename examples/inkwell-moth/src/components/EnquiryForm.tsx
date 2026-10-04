'use client'
// The enquiry form (react-hook-form + zod, shadcn fields). The site is static, so sending opens the visitor's own mail
// app with the note already written to the studio; a toast says so.
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import { Field, FieldError, FieldLabel } from './ui/field'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { email as studio } from './SideIndex'

const kinds = ['A picture book', 'A book cover', 'Drawings for a magazine', 'Something else']
const whens = ['Within 3 months', 'In 3 to 6 months', 'In 6 to 12 months', 'Next year or later']

const schema = z.object({
  name: z.string().trim().min(2, 'Please tell Nell your name.'),
  email: z.string().trim().email('That email address doesn’t look right.'),
  kind: z.string().min(1, 'Pick what you’d like drawn.'),
  when: z.string().min(1, 'Pick roughly when you need the art.'),
  story: z.string().trim().min(20, 'A few lines about the story, please (20 characters or more).'),
  finished: z.boolean(),
})
type Values = z.infer<typeof schema>

const field = 'h-12 rounded-none border-(--color-muted) bg-(--color-surface) px-3 text-base md:text-base focus-visible:border-(--color-text)'

export function EnquiryForm() {
  const { register, control, handleSubmit, reset, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(schema), defaultValues: { name: '', email: '', kind: '', when: '', story: '', finished: false },
  })
  const send = (v: Values) => {
    const body = `${v.story}\n\nWhat: ${v.kind}\nWhen: ${v.when}\nThe text is ${v.finished ? 'finished' : 'still being written'}.\n\n${v.name}, ${v.email}`
    window.location.assign(`mailto:${studio}?subject=${encodeURIComponent(`Commission: ${v.kind} (${v.name})`)}&body=${encodeURIComponent(body)}`)
    toast('Your mail app should open with the note written. If it doesn’t, write to ' + studio)
    reset()
  }
  const label = 'type-utility text-(--color-text) [font-size:0.875rem]'
  return (
    <form id="enquiry" noValidate onSubmit={handleSubmit(send)} className="type-body grid scroll-mt-24 gap-6 md:grid-cols-2">
      <Field data-invalid={!!errors.name}>
        <FieldLabel htmlFor="name" className={label}>Your name</FieldLabel>
        <Input id="name" autoComplete="name" aria-invalid={!!errors.name} className={field} {...register('name')} />
        <FieldError errors={[errors.name]} />
      </Field>
      <Field data-invalid={!!errors.email}>
        <FieldLabel htmlFor="email" className={label}>Email</FieldLabel>
        <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} className={field} {...register('email')} />
        <FieldError errors={[errors.email]} />
      </Field>
      <Controller control={control} name="kind" render={({ field: f, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="kind" className={label}>What would you like drawn?</FieldLabel>
          <Select value={f.value} onValueChange={f.onChange}>
            <SelectTrigger id="kind" aria-invalid={fieldState.invalid} onBlur={f.onBlur} className={`${field} w-full data-[size=default]:h-12`}><SelectValue placeholder="Choose one" /></SelectTrigger>
            <SelectContent className="rounded-none bg-(--color-surface)">{kinds.map((k) => <SelectItem key={k} value={k} className="min-h-11 rounded-none text-base">{k}</SelectItem>)}</SelectContent>
          </Select>
          <FieldError errors={[fieldState.error]} />
        </Field>
      )} />
      <Controller control={control} name="when" render={({ field: f, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="when" className={label}>When do you need the art?</FieldLabel>
          <Select value={f.value} onValueChange={f.onChange}>
            <SelectTrigger id="when" aria-invalid={fieldState.invalid} onBlur={f.onBlur} className={`${field} w-full data-[size=default]:h-12`}><SelectValue placeholder="Roughly" /></SelectTrigger>
            <SelectContent className="rounded-none bg-(--color-surface)">{whens.map((k) => <SelectItem key={k} value={k} className="min-h-11 rounded-none text-base">{k}</SelectItem>)}</SelectContent>
          </Select>
          <FieldError errors={[fieldState.error]} />
        </Field>
      )} />
      <Field data-invalid={!!errors.story} className="md:col-span-2">
        <FieldLabel htmlFor="story" className={label}>About the story</FieldLabel>
        <Textarea id="story" rows={6} aria-invalid={!!errors.story} placeholder="Who it’s for, how long it is, and the animal you can’t stop thinking about."
          className={`${field} h-auto min-h-40 py-3`} {...register('story')} />
        <FieldError errors={[errors.story]} />
      </Field>
      <Controller control={control} name="finished" render={({ field: f }) => (
        <Field orientation="horizontal" className="min-h-11 md:col-span-2">
          <Checkbox id="finished" checked={f.value} onCheckedChange={(c) => f.onChange(c === true)} className="size-5 border-(--color-muted)" />
          <FieldLabel htmlFor="finished" className="type-body cursor-pointer font-normal">The text is finished</FieldLabel>
        </Field>
      )} />
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 md:col-span-2">
        <Button type="submit" className="type-body h-14 rounded-none bg-(--color-primary) px-8 text-(--color-background) hover:bg-(--color-text)">Send to Nell</Button>
        <p className="type-utility text-(--color-muted)">Opens your own mail app. Nothing is stored here.</p>
      </div>
    </form>
  )
}
