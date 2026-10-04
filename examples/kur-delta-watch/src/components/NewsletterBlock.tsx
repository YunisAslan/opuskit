'use client'
import { toast } from 'sonner'
import { NewsletterSection } from '@/components/sections/Newsletter'
import { submitForm } from '@/lib/submit'

export function NewsletterBlock() {
  return (
    <NewsletterSection
      title="The monthly results, by email"
      text="On the first Monday of every month: the water test numbers, the tonnes, the birds counted. One email, and no appeals in between."
      placeholder="you@example.com"
      button="Send me the results"
      note="Leave with one click, any time. We never share your address."
      onSubmit={async (e) => {
        e.preventDefault()
        const form = e.currentTarget
        const email = String(new FormData(form).get('email'))
        try {
          await submitForm('newsletter', { email })
          form.reset()
          toast('You’re on the list', { description: `The next results go to ${email} on the first Monday of the month.` })
        } catch {
          toast('That didn’t go through', { description: 'Please try again, or write to hello@kurdeltawatch.az.' })
        }
      }}
    />
  )
}
