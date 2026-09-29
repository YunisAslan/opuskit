import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/PageHeader'
import { DemoForm, Field } from '@/components/DemoForm'

export const metadata: Metadata = { title: 'Sign in' }

export default function SignInPage() {
  return (
    <>
      <PageHeader lines={['Sign in']} />
      <section aria-label="Sign in form" className="container-text max-w-xl pb-32">
        <DemoForm submit="Sign in" done="You are signed in.">
          <Field label="Email" name="email" type="email" required autoComplete="email" />
          <Field label="Password" name="password" type="password" required autoComplete="current-password" />
          <Link href="/contact" className="inline-flex min-h-11 items-center underline">Forgot your password?</Link>
        </DemoForm>
        <p className="mt-8">
          New here? <Link href="/sign-up" className="font-semibold underline">Create an account</Link>
        </p>
      </section>
    </>
  )
}
