'use client'
// The tide letter sign-up. No mail service is connected, so it opens the visitor's own email app with the sign-up
// note to the charity filled in, and says so before and after — it never pretends to have subscribed anyone.
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SendButton, useSend } from './SendButton'

const schema = z.object({ email: z.string().trim().min(1, 'Add your email address.').email('That email address looks incomplete.') })

export function NewsletterForm({ placeholder, button, note, to }: { placeholder: string; button: string; note?: string; to: string }) {
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), defaultValues: { email: '' } })
  const send = useSend()
  const submit = form.handleSubmit(({ email }) => send.run(() => {
    const body = `Please add ${email} to the tide letter.`
    window.location.assign(`mailto:${to}?subject=${encodeURIComponent('Tide letter: sign me up')}&body=${encodeURIComponent(body)}`)
  }))
  return (
    <Form {...form}>
      <form noValidate onSubmit={submit}>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start">
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem className="min-w-0 flex-1">
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input {...field} onChange={(e) => { field.onChange(e); if (send.state === 'done') send.reset() }} type="email" inputMode="email" autoComplete="email" enterKeyHint="send" placeholder={placeholder} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <SendButton state={send.state} spin={send.spin} className="w-full lg:mt-[calc(1.4*0.8125rem+8px)] lg:w-auto">{button}</SendButton>
        </div>
        <p className="type-caption mt-4 text-(--color-muted)" aria-live="polite">
          {send.state === 'done'
            ? <>Your email app has opened with the note to us. Press send there and you are on the list.</>
            : <>{note} Signing up opens your email app with a short note to us.</>}
        </p>
      </form>
    </Form>
  )
}
