import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/PageHeader'
import { DemoForm, Field } from '@/components/DemoForm'

export const metadata: Metadata = { title: 'Sign up' }

export default function SignUpPage() {
  return (
    <>
      <PageHeader lines={['Create an', 'account']}>
        <p>Save your usual order and reorder in two taps. Get a receipt by email every time.</p>
      </PageHeader>
      <section aria-label="Sign up form" className="container-text max-w-xl pb-32">
        <DemoForm submit="Create account" done="Welcome. Your account is ready.">
          <Field label="Name" name="name" required autoComplete="name" />
          <Field label="Email" name="email" type="email" required autoComplete="email" />
          <Field label="Password (8 characters or more)" name="password" type="password" required autoComplete="new-password" minLength={8} />
          <label className="flex min-h-11 items-start gap-3">
            <input type="checkbox" name="terms" required className="mt-1 h-5 w-5 accent-primary" />
            <span>
              I agree to the <Link href="/terms" className="underline">terms of service</Link> and <Link href="/privacy" className="underline">privacy policy</Link>.
            </span>
          </label>
        </DemoForm>
        <p className="mt-8">
          Already have one? <Link href="/sign-in" className="font-semibold underline">Sign in</Link>
        </p>
      </section>
    </>
  )
}
