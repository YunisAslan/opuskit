'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/pieces/Reveal'

// OpusKit section — Newsletter: one reason to subscribe, an email field and a button with validation,
// and a plain note on how often. Posts to the studio's list (here, a confirmation toast).
const schema = z.object({ email: z.string().email('Enter an email address we can reach you at.') })

export function NewsletterSection({
  tone,
  title,
  text,
  placeholder,
  button,
  note,
  label = 'Email address',
}: {
  tone?: 'ground' | 'surface' | 'inverse' | 'chapter'
  title: string
  text: string
  placeholder: string
  button: string
  note?: string
  label?: string
}) {
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), defaultValues: { email: '' } })

  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto grid max-w-(--container) gap-10 md:grid-cols-12 md:items-end">
        <Reveal className="md:col-span-6">
          <h2 className="type-heading text-balance">{title}</h2>
          <p className="type-body mt-4 max-w-[52ch] text-(--color-muted)">{text}</p>
        </Reveal>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(({ email }) => {
              toast.success('You are on the list.', { description: `We will write to ${email} once a month.` })
              form.reset()
            })}
            className="md:col-span-5 md:col-start-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{label}</FormLabel>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                    <FormControl>
                      <Input type="email" autoComplete="email" placeholder={placeholder} {...field} />
                    </FormControl>
                    <Button type="submit" className="shrink-0">
                      {button}
                    </Button>
                  </div>
                  <FormMessage />
                  {note && <p className="type-utility text-(--color-muted)">{note}</p>}
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </section>
  )
}