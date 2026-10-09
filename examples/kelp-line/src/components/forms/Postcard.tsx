'use client'
// Contact's remembered moment, "Postcard to the boathouse": the enquiry form set as a postcard — the message on the
// left, the address side on the right, a stamp in the corner showing the count and a postmark with today's date on
// the coast. It opens in a centred dialog and hands off to the visitor's own email app (no service is connected), and
// says so. Phones: message above the fields, the stamp kept in the corner. Reduced motion: the dialog fades.
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ResponsiveSelect } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { contact, count, site } from '@/content/site'
import { number } from '@/lib/utils'
import { SendButton, useSend } from './SendButton'

const p = contact.postcard
const schema = z.object({
  message: z.string().trim().min(5, 'Write a line or two, so we know how to help.'),
  name: z.string().trim().min(1, 'Add your name.'),
  email: z.string().trim().min(1, 'Add your email, so we can write back.').email('That email address looks incomplete.'),
  topic: z.string().min(1, 'Choose what it is about.'),
  keep: z.boolean(),
})

function Postmark() {
  // rendered only inside the opened dialog (client side), so today's date on the coast is safe to read here
  const day = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: site.timeZone }).format(new Date())
  return (
    <div aria-hidden className="pointer-events-none flex items-start gap-3">
      <div className="grid size-[4.75rem] -rotate-6 place-items-center rounded-full border border-(--color-muted)/70 text-center text-(--color-muted)">
        <span className="type-caption leading-tight [font-size:0.6875rem]">{site.place}<br /><span className="tabular-nums">{day}</span></span>
      </div>
      <div className="grid h-[5.25rem] w-[4.25rem] place-items-center rounded-[6px] border border-dashed border-(--color-accent) p-1">
        <div className="grid size-full place-items-center rounded-[3px] bg-(--color-background) text-center">
          <span className="type-number block [font-size:0.95rem]">{number(count.plants)}</span>
          <span className="type-caption -mt-1 block text-(--color-muted) [font-size:0.625rem]">planted</span>
        </div>
      </div>
    </div>
  )
}

export function PostcardDialog({ label }: { label: string }) {
  const [open, setOpen] = useState(false)
  const send = useSend()
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), defaultValues: { message: '', name: '', email: '', topic: '', keep: false } })
  const submit = form.handleSubmit((d) => send.run(() => {
    const body = `${d.message}\n\n${d.name}\n${d.email}${d.keep ? '\n\nPlease add me to the tide letter too.' : ''}`
    window.location.assign(`mailto:${site.email}?subject=${encodeURIComponent(`Postcard: ${d.topic}`)}&body=${encodeURIComponent(body)}`)
  }))
  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) send.reset() }}>
      <DialogTrigger asChild><Button>{label}</Button></DialogTrigger>
      <DialogContent className="max-w-[920px]" closeLabel="Close the postcard">
        <Form {...form}>
          <form noValidate onSubmit={submit} className="grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            <div className="flex flex-col gap-5 p-6 pt-16 md:border-r md:border-(--color-border) md:p-8 md:pt-8">
              <DialogTitle className="max-w-[16ch] pr-10 md:pr-0">{p.title}</DialogTitle>
              <DialogDescription className="type-caption max-w-[40ch]">{p.lead}</DialogDescription>
              <FormField control={form.control} name="message" render={({ field }) => (
                <FormItem className="flex flex-1 flex-col">
                  <FormLabel>{p.message}</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder={p.messagePlaceholder} className="min-h-48 flex-1 border-x-0 border-t-0 rounded-none bg-transparent px-0 leading-[2rem] [background-image:repeating-linear-gradient(to_bottom,transparent_0,transparent_calc(2rem-1px),var(--color-border)_calc(2rem-1px),var(--color-border)_2rem)] [background-attachment:local] [background-position:0_12px] md:min-h-64" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <div className="flex flex-col gap-5 border-t border-(--color-border) p-6 md:border-t-0 md:p-8">
              <div className="flex justify-end md:mr-12"><Postmark /></div>
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem><FormLabel>{p.name}</FormLabel><FormControl><Input {...field} autoComplete="name" enterKeyHint="next" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem><FormLabel>{p.email}</FormLabel><FormControl><Input {...field} type="email" inputMode="email" autoComplete="email" enterKeyHint="next" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="topic" render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>{p.topic}</FormLabel>
                  <FormControl><SelectBridge value={field.value} onChange={field.onChange} invalid={!!fieldState.error} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="keep" render={({ field }) => (
                <FormItem className="flex items-center gap-3">
                  <FormControl><Checkbox checked={field.value} onCheckedChange={(c) => field.onChange(c === true)} /></FormControl>
                  <FormLabel className="type-body cursor-pointer text-(--color-text)">{p.keep}</FormLabel>
                </FormItem>
              )} />
              <div className="mt-auto pt-2">
                <SendButton state={send.state} spin={send.spin} className="w-full">{p.button}</SendButton>
                <p className="type-caption mt-3 text-(--color-muted)" aria-live="polite">
                  {send.state === 'done' ? p.done : <>Addressed to {site.email}. Nothing is sent until you press send in your email.</>}
                </p>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

// FormControl (a Slot) hands its id and aria wiring to whichever control shows: Radix Select or the phone sheet
function SelectBridge({ value, onChange, invalid, id, ...aria }: { value: string; onChange: (v: string) => void; invalid: boolean; id?: string; 'aria-describedby'?: string }) {
  return <ResponsiveSelect id={id} value={value} onValueChange={onChange} options={p.topics} placeholder="Choose one" label={p.topic} invalid={invalid} describedBy={aria['aria-describedby']} />
}
