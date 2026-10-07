'use client'
// OpusKit section — Newsletter: one reason to subscribe beside an email field and a button, with a note under it.
// Fitted to Maison Vey: shadcn Form (react-hook-form + zod) with the error inline under the field; on phones the field
// and button stack full width. `action` is the email provider's endpoint (PLACEHOLDER until the owner connects one).
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FadeRise, RevealGroup } from '@/components/motion/Reveal'

export function NewsletterSection({ tone, title, text, placeholder, button, note, action, label = 'Email address', success, error }: {
  tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; title: string; text: string; placeholder: string; button: string; note?: string; action?: string; label?: string
  success: string; error: string
}) {
  const schema = z.object({ email: z.string().trim().email(error) })
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), defaultValues: { email: '' } })
  const onSubmit = async (v: z.infer<typeof schema>) => {
    if (action) {
      try { await fetch(action, { method: 'POST', body: new URLSearchParams({ email: v.email }) }) } catch {}
    }
    toast(success)
    form.reset()
  }
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-(--section-y)">
      <RevealGroup className="mx-auto grid max-w-(--container) gap-x-(--grid-gap) gap-y-12 md:grid-cols-12 md:items-end">
        <div className="md:col-span-6">
          <FadeRise as="h2" i={0} className="type-heading text-balance">{title}</FadeRise>
          <FadeRise as="p" i={1} className="type-body mt-5 max-w-[52ch] text-(--color-muted)">{text}</FadeRise>
        </div>
        <FadeRise i={2} className="md:col-span-5 md:col-start-8">
          <Form {...form}>
            <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>{label}</FormLabel>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <FormControl><Input type="email" autoComplete="email" placeholder={placeholder} {...field} /></FormControl>
                    <Button type="submit" className="w-full sm:w-auto sm:shrink-0">{button}</Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )} />
              {note && <p className="type-caption mt-3 text-(--color-muted)">{note}</p>}
            </form>
          </Form>
        </FadeRise>
      </RevealGroup>
    </section>
  )
}
