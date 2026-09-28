import type { Metadata } from 'next'
import Link from 'next/link'
import TextPage from '@/components/TextPage'
import { Field, FormShell } from '@/components/Form'

export const metadata: Metadata = { title: 'Sign up' }

export default function SignUp() {
  return (
    <TextPage title="Sign up" intro="An account gets you each collection a day before it goes public, and first call on viewings.">
      <FormShell submit="Create account" done="Welcome. The next collection will reach you first.">
        <Field label="Name" name="name" autoComplete="name" />
        <Field label="Email" name="email" type="email" autoComplete="email" />
        <Field label="Password" name="password" type="password" autoComplete="new-password" />
      </FormShell>
      <Link href="/sign-in" className="text-link mt-8 inline-flex min-h-11 items-center">Already have an account? Sign in</Link>
    </TextPage>
  )
}
