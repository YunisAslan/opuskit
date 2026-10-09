'use client'
// OpusKit section — Newsletter: one reason to subscribe, an email field and a button, and a plain note on how often.
// Pip & Kiln: no mailing service is connected, so the button opens the visitor's email app with the sign-up written
// in (to the studio's address) and says so on screen — nothing pretends to have been sent.
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Check } from 'lucide-react'
import { SectionHead } from '@/components/parts/SectionHead'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useSend } from '@/components/parts/use-send'

const schema = z.object({ email: z.string().trim().email('That email looks off. Mind checking it?') })

export function NewsletterSection({ title, lines, text, placeholder, button, note, handoff, to, label = 'Email address' }: {
  title: string; lines: string[]; text: string; placeholder: string; button: string; note?: string; handoff: string; to: string; label?: string
}) {
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), defaultValues: { email: '' } })
  const { send, state } = useSend()
  const [done, setDone] = useState(false)
  const submit = form.handleSubmit(({ email }) =>
    send(`mailto:${to}?subject=${encodeURIComponent('Sign me up for kiln news')}&body=${encodeURIComponent(`Hello Pip & Kiln,\n\nPlease add ${email} to the monthly email.\n\nThanks!`)}`).then(() => setDone(true)))
  return (
    <section className="px-(--gutter) pb-(--section-y) pt-[calc(var(--section-y)*0.4)]">
      <div className="mx-auto grid max-w-(--container) gap-10 md:grid-cols-12 md:items-end md:gap-6">
        <div className="md:col-span-6">
          <SectionHead text={title} lines={lines} line={text} />
        </div>
        <Form {...form}>
          <form onSubmit={submit} noValidate className="md:col-span-5 md:col-start-8">
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <FormControl><Input type="email" autoComplete="email" inputMode="email" enterKeyHint="send" placeholder={placeholder} {...field} /></FormControl>
                  <Button type="submit" className="shrink-0 sm:min-w-[10.5rem]" data-state={state}>
                    {state === 'wait' ? <span aria-hidden className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none" /> : null}
                    <span className={state === 'wait' ? 'sr-only' : ''}>{button}</span>
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )} />
            <p aria-live="polite" className="type-caption mt-4">
              {done ? <span className="inline-flex items-start gap-2 font-semibold"><Check className="mt-0.5 size-4 shrink-0" strokeWidth={3} />{handoff}</span> : note}
            </p>
          </form>
        </Form>
      </div>
    </section>
  )
}
