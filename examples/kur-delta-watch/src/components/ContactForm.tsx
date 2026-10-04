'use client'
import { useState } from 'react'
import { toast } from 'sonner'
import { Field, invalid } from '@/components/Field'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { isEmail, submitForm } from '@/lib/submit'

const TOPICS = ['Volunteering', 'A boat day', 'A school visit', 'Press', 'Something else']

export function ContactForm() {
  const [topic, setTopic] = useState(TOPICS[0])
  const [errors, setErrors] = useState<Record<string, string>>({})

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const f = new FormData(form)
    const name = String(f.get('name') ?? '').trim()
    const email = String(f.get('email') ?? '').trim()
    const message = String(f.get('message') ?? '').trim()
    const next: Record<string, string> = {}
    if (!name) next.name = 'Tell us your name.'
    if (!isEmail(email)) next.email = 'We need a working email to reply to.'
    if (message.length < 10) next.message = 'A line or two, so we know how to help.'
    setErrors(next)
    if (Object.keys(next).length) return
    try {
      await submitForm('contact', { name, email, topic, message, results: f.get('results') === 'on' })
      form.reset()
      toast(`Thanks, ${name}`, { description: 'We reply within two working days, usually sooner.' })
    } catch {
      toast('That didn’t go through', { description: 'Please try again, or write to hello@kurdeltawatch.az.' })
    }
  }

  return (
    <form id="message" noValidate onSubmit={onSubmit} className="mt-16 grid max-w-3xl scroll-mt-24 gap-8 border-t-2 border-(--color-border) pt-10">
      <div>
        <p id="topic-label" className="type-utility mb-2 text-(--color-muted)">What it’s about</p>
        <ToggleGroup type="single" value={topic} onValueChange={(v) => v && setTopic(v)} aria-labelledby="topic-label">
          {TOPICS.map((t) => <ToggleGroupItem key={t} value={t}>{t}</ToggleGroupItem>)}
        </ToggleGroup>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="c-name" label="Your name" error={errors.name}>
          <Input id="c-name" name="name" autoComplete="name" {...invalid('c-name', errors.name)} />
        </Field>
        <Field id="c-email" label="Email" error={errors.email}>
          <Input id="c-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" {...invalid('c-email', errors.email)} />
        </Field>
      </div>
      <Field id="c-message" label="Message" error={errors.message}>
        <Textarea id="c-message" name="message" {...invalid('c-message', errors.message)} />
      </Field>
      <div className="flex items-center gap-3">
        <Checkbox id="c-results" name="results" />
        <Label htmlFor="c-results" className="type-body font-normal">Send me the monthly results too</Label>
      </div>
      <div><Button type="submit" size="lg">Send</Button></div>
    </form>
  )
}
