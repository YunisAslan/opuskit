'use client'
// "Ask us" — the FAQ page's closing form: topic, message, and an optional call back. Opens the visitor's mail app.
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { FormField, fieldLook } from '@/components/FormField'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { site } from '@/config/site'
import { openMail } from '@/lib/mail'

const TOPICS = ['Booking and times', 'Treatments', 'Prices and insurance', 'Getting here and access', 'Something else']
const schema = z.object({
  topic: z.string().min(1, 'Choose a topic'),
  name: z.string().trim().min(2, 'Tell us your name'),
  email: z.email('Check your email address'),
  message: z.string().trim().min(5, 'Write your question').max(1000, 'Keep it under 1000 characters'),
  callMe: z.boolean(),
  phone: z.string().trim().optional(),
}).refine((v) => !v.callMe || (v.phone && v.phone.length >= 7), { path: ['phone'], message: 'Add a number we can call' })
type Values = z.infer<typeof schema>

export function QuestionForm() {
  const { control, register, handleSubmit, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(schema), defaultValues: { topic: '', name: '', email: '', message: '', callMe: false, phone: '' },
  })
  const callMe = useWatch({ control, name: 'callMe' })
  const send = (v: Values) => {
    openMail(site.email, `Question: ${v.topic}`, [['Name', v.name], ['Email', v.email], ['Question', v.message], ['Please call me', v.callMe ? v.phone : undefined]])
    toast('Your mail app is opening', { description: 'Send the message and we will answer within one working day.' })
  }
  return (
    <form onSubmit={handleSubmit(send)} noValidate className="grid gap-x-4 gap-y-6 sm:grid-cols-2">
      <FormField id="q-topic" label="Topic" error={errors.topic?.message} className="sm:col-span-2">
        <Controller control={control} name="topic" render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger id="q-topic" aria-invalid={!!errors.topic} className={`${fieldLook} w-full`}><SelectValue placeholder="What is it about?" /></SelectTrigger>
            <SelectContent position="popper">{TOPICS.map((t) => <SelectItem key={t} value={t} className="type-body min-h-10">{t}</SelectItem>)}</SelectContent>
          </Select>
        )} />
      </FormField>
      <FormField id="q-name" label="Name" error={errors.name?.message}>
        <Input id="q-name" autoComplete="name" aria-invalid={!!errors.name} className={fieldLook} {...register('name')} />
      </FormField>
      <FormField id="q-email" label="Email" error={errors.email?.message}>
        <Input id="q-email" type="email" autoComplete="email" aria-invalid={!!errors.email} className={fieldLook} {...register('email')} />
      </FormField>
      <FormField id="q-message" label="Your question" error={errors.message?.message} className="sm:col-span-2">
        <Textarea id="q-message" rows={4} aria-invalid={!!errors.message} className={`${fieldLook} h-auto min-h-28 py-2.5`} {...register('message')} />
      </FormField>
      <div className="flex min-h-11 items-center gap-3 sm:col-span-2">
        <Controller control={control} name="callMe" render={({ field }) => (
          <Checkbox id="q-call" checked={field.value} onCheckedChange={(c) => field.onChange(c === true)} className="size-5 border-(--color-muted)" />
        )} />
        <Label htmlFor="q-call" className="type-body">I would rather you phoned me</Label>
      </div>
      {callMe && (
        <FormField id="q-phone" label="Phone" error={errors.phone?.message} className="sm:col-span-2">
          <Input id="q-phone" type="tel" autoComplete="tel" aria-invalid={!!errors.phone} className={fieldLook} {...register('phone')} />
        </FormField>
      )}
      <div className="sm:col-span-2"><Button type="submit">Send your question</Button></div>
    </form>
  )
}
