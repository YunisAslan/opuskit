"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ChoiceField } from "@/components/ResponsiveFields"

const schema = z.object({
  topic: z.string().min(1, "Choose a topic."),
  name: z.string().trim().min(2, "Enter your name."),
  email: z.email("Enter an email address we can reply to."),
  message: z.string().trim().min(10, "Tell us a little more.").max(1000, "Keep it under 1000 characters."),
  consent: z.boolean().refine((v) => v, "We need your permission to reply."),
})
type Values = z.infer<typeof schema>

const topics = [
  { value: "rsvp", label: "My RSVP" },
  { value: "groups", label: "Groups of seven or more" },
  { value: "access", label: "Access needs" },
  { value: "press", label: "Press and photography" },
  { value: "other", label: "Something else" },
]

export function ContactForm() {
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { topic: "", name: "", email: "", message: "", consent: false },
  })

  const onSubmit = () => {
    // ponytail: no backend yet — post to an API route or form service before launch.
    toast.success("Message sent", { description: "We reply within two working days." })
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <FormField control={form.control} name="topic" render={({ field }) => (
          <FormItem className="sm:col-span-2">
            <FormLabel className="type-utility">Topic</FormLabel>
            <FormControl><ChoiceField value={field.value} onChange={field.onChange} options={topics} placeholder="Choose a topic" title="Topic" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <FormLabel className="type-utility">Name</FormLabel>
            <FormControl><Input autoComplete="name" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel className="type-utility">Email</FormLabel>
            <FormControl><Input type="email" autoComplete="email" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="message" render={({ field }) => (
          <FormItem className="sm:col-span-2">
            <FormLabel className="type-utility">Message</FormLabel>
            <FormControl><Textarea rows={5} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="consent" render={({ field }) => (
          <FormItem className="sm:col-span-2">
            <div className="flex min-h-11 items-center gap-3">
              <FormControl><Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(v === true)} className="size-5" /></FormControl>
              <FormLabel className="type-body font-normal">Use my details to reply to this message only.</FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )} />
        <div className="sm:col-span-2">
          <Button type="submit" size="lg" variant="outline" className="type-utility border-text">Send message</Button>
        </div>
      </form>
    </Form>
  )
}
