'use client'
import { toast } from 'sonner'
import { NewsletterSection } from '@/components/sections/Newsletter'

// The way in, for now: one email on the day orders open. No provider is wired up yet, so the form says so honestly.
export function Newsletter() {
  return (
    <div onSubmit={(e) => {
      e.preventDefault()
      const form = e.target as HTMLFormElement
      toast('Thank you. You are on the list.', { description: 'We will write once, on the day orders open in spring.' })
      form.reset()
    }}>
      <NewsletterSection title="Hear the day orders open"
        text="One email when the shop opens in spring, then a short letter when a new batch is poured: what is in it, where the salt and saffron came from, and how many bottles are left."
        placeholder="you@example.com" button="Write to me" note="About once a month. Leave with one click, whenever you like." />
    </div>
  )
}
