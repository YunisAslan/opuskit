import type { Metadata } from 'next'
import Link from 'next/link'
import TextPage from '@/components/TextPage'
import { Field, FormShell } from '@/components/Form'

export const metadata: Metadata = { title: 'Sign in' }

export default function SignIn() {
  return (
    <TextPage title="Sign in">
      <FormShell submit="Sign in" done="Signed in. Welcome back.">
        <Field label="Email" name="email" type="email" autoComplete="email" />
        <Field label="Password" name="password" type="password" autoComplete="current-password" />
      </FormShell>
      <div className="mt-8 flex flex-wrap gap-x-8">
        <Link href="/contact" className="text-link inline-flex min-h-11 items-center">Forgot your password?</Link>
        <Link href="/sign-up" className="text-link inline-flex min-h-11 items-center">New here? Create an account</Link>
      </div>
    </TextPage>
  )
}
