import type { Metadata } from 'next'
import Link from 'next/link'
import AuthForm from '@/components/AuthForm'
import Lines from '@/components/Lines'

export const metadata: Metadata = { title: 'Sign in' }

export default function SignInPage() {
  return (
    <section className="container-text grid gap-12 pb-32 pt-40 md:grid-cols-12 md:gap-6 md:pb-40 md:pt-60">
      <div className="md:col-span-6">
        <Lines as="h1" lines={['Sign in']} className="type-display" />
        <p className="type-body mt-6 text-lg">Manage your subscription, skip a month or change your delivery address.</p>
      </div>
      <div className="border-t-2 border-border pt-6 md:col-span-5 md:col-start-8">
        <AuthForm
          submit="Sign in"
          done="Accounts open when the first boxes ship on 3 November. We will email you a sign-in link."
          fields={[
            { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
            { name: 'password', label: 'Password', type: 'password', autoComplete: 'current-password' },
          ]}
        />
        <div className="type-body mt-6 flex flex-col gap-2 border-t border-border pt-6">
          <a href="mailto:hello@keepersdrinks.com?subject=Password%20reset" className="link-quiet inline-flex min-h-11 w-fit items-center">Forgot your password?</a>
          <p>
            New here? <Link href="/sign-up" className="link-quiet inline-flex min-h-11 items-center">Create an account</Link>
          </p>
        </div>
      </div>
    </section>
  )
}
