"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { site } from "@/config/site"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ChoiceField, DateField } from "@/components/ResponsiveFields"

const schema = z.object({
  name: z.string().trim().min(2, "Enter your full name."),
  email: z.email("Enter an email address we can reply to."),
  day: z.date({ error: "Choose the day you will come." }),
  arrival: z.string({ error: "Choose an arrival time." }).min(1, "Choose an arrival time."),
  guests: z.string({ error: "Choose how many are coming." }).min(1, "Choose how many are coming."),
  notes: z.string().max(500, "Keep notes under 500 characters.").optional(),
})
type Values = z.infer<typeof schema>

const arrivals = [
  { value: "10:00", label: "10:00, gates open" },
  { value: "11:00", label: "11:00, first chukka" },
  { value: "13:00", label: "13:00, for lunch" },
  { value: "15:00", label: "15:00, afternoon match" },
]
const guests = ["1", "2", "3", "4", "5", "6"].map((n) => ({ value: n, label: n === "1" ? "Just me" : `${n} people` }))

export function ReservationForm() {
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", arrival: "", guests: "", notes: "" },
  })

  const onSubmit = (v: Values) => {
    // ponytail: no backend yet — wire this to the booking provider or an API route before launch.
    toast.success("RSVP received", { description: `${v.guests === "1" ? "One seat" : `${v.guests} seats`}, ${v.day.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}. Confirmation follows by email.` })
    form.reset()
  }

  return (
    <Form {...form}>
      <form id="rsvp-form" onSubmit={form.handleSubmit(onSubmit)} noValidate className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel className="type-utility">Full name</FormLabel>
              <FormControl><Input autoComplete="name" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel className="type-utility">Email</FormLabel>
              <FormControl><Input type="email" inputMode="email" autoComplete="email" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="day"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel className="type-utility">Day</FormLabel>
              <FormControl>
                <DateField value={field.value} onChange={field.onChange} allowed={site.days.map((d) => d.date)} placeholder="Choose a day" title="Which day?" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="arrival"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="type-utility">Arrival</FormLabel>
              <FormControl>
                <ChoiceField value={field.value} onChange={field.onChange} options={arrivals} placeholder="Choose a time" title="Arrival time" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="guests"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="type-utility">Party size</FormLabel>
              <FormControl>
                <ChoiceField value={field.value} onChange={field.onChange} options={guests} placeholder="How many" title="Party size" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel className="type-utility">Dietary needs or access requirements</FormLabel>
              <FormControl><Textarea rows={4} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="hidden items-center gap-6 sm:col-span-2 sm:flex">
          <Button type="submit" size="lg" className="type-utility">Send RSVP</Button>
          <p className="type-utility text-muted">Reply by <span className="text-accent">{site.rsvpBy}</span></p>
        </div>
      </form>

      {/* Mobile: the submit stays under the thumb */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-text bg-background p-3 sm:hidden">
        <Button type="submit" form="rsvp-form" className="type-utility h-14 w-full justify-between px-5">
          <span>Send RSVP</span>
          <span className="font-normal">{site.dates}</span>
        </Button>
      </div>
    </Form>
  )
}
