'use client'
// "Ask us" under the closing CTA (FAQ page): like the RSVP form, it opens the visitor's mail app with the question
// filled in — there is no backend yet.
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { contactEmail } from '@/content/site'

const topics = ['Access and seating', 'Getting here', 'Groups over four', 'Press and photography', 'Something else']
const schema = z.object({
  name: z.string().trim().min(2, 'Tell us your name.'),
  email: z.string().trim().email('That email doesn’t look right.'),
  topic: z.string().min(1, 'Pick the closest topic.'),
  message: z.string().trim().min(10, 'A sentence or two, so we can answer properly.'),
  nextYear: z.boolean(),
})
type Values = z.infer<typeof schema>
const field = 'type-body h-11 border-(--color-muted) bg-transparent px-3 focus-visible:border-(--color-text)'

export function QuestionForm() {
  const { register, control, handleSubmit, formState: { errors } } = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { name: '', email: '', topic: '', message: '', nextYear: false } })
  const send = (v: Values) => {
    const body = `${v.message}\n\n${v.name}, ${v.email}${v.nextYear ? '\n\nPlease tell me when next year’s dates are out.' : ''}`
    window.location.assign(`mailto:${contactEmail}?subject=${encodeURIComponent(`Question: ${v.topic}`)}&body=${encodeURIComponent(body)}`)
    toast('Your mail app should open with your question.', { description: `Send it to ${contactEmail}; we answer within two days.` })
  }
  return (
    <form onSubmit={handleSubmit(send)} noValidate className="max-w-[40rem]">
      <FieldGroup>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field data-invalid={!!errors.name}>
            <FieldLabel htmlFor="q-name" className="type-utility">Name</FieldLabel>
            <Input id="q-name" autoComplete="name" aria-invalid={!!errors.name} className={field} {...register('name')} />
            <FieldError errors={[errors.name]} className="type-utility" />
          </Field>
          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="q-email" className="type-utility">Email</FieldLabel>
            <Input id="q-email" type="email" autoComplete="email" aria-invalid={!!errors.email} className={field} {...register('email')} />
            <FieldError errors={[errors.email]} className="type-utility" />
          </Field>
        </div>
        <Controller control={control} name="topic" render={({ field: f }) => (
          <Field data-invalid={!!errors.topic}>
            <FieldLabel htmlFor="q-topic" className="type-utility">Topic</FieldLabel>
            <Select value={f.value} onValueChange={f.onChange}>
              <SelectTrigger id="q-topic" aria-invalid={!!errors.topic} className={`${field} w-full`}><SelectValue placeholder="What is it about?" /></SelectTrigger>
              <SelectContent position="popper" className="border border-(--color-border) bg-(--color-background) ring-0">
                {topics.map((t) => <SelectItem key={t} value={t} className="type-body min-h-11">{t}</SelectItem>)}
              </SelectContent>
            </Select>
            <FieldError errors={[errors.topic]} className="type-utility" />
          </Field>
        )} />
        <Field data-invalid={!!errors.message}>
          <FieldLabel htmlFor="q-message" className="type-utility">Your question</FieldLabel>
          <Textarea id="q-message" rows={4} aria-invalid={!!errors.message} className="type-body min-h-28 border-(--color-muted) bg-transparent px-3 focus-visible:border-(--color-text)" {...register('message')} />
          <FieldError errors={[errors.message]} className="type-utility" />
        </Field>
        <Controller control={control} name="nextYear" render={({ field: f }) => (
          <Field orientation="horizontal" className="min-h-11">
            <Checkbox id="q-next" checked={f.value} onCheckedChange={(c) => f.onChange(c === true)} className="size-5" />
            <FieldLabel htmlFor="q-next" className="type-body">Tell me when next year’s dates are out</FieldLabel>
          </Field>
        )} />
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Button type="submit" size="lg" className="type-body">Write to us</Button>
          <p className="type-utility text-(--color-muted)">Opens your mail app, addressed to {contactEmail}.</p>
        </div>
      </FieldGroup>
    </form>
  )
}
