import type { Metadata } from 'next'
import Link from 'next/link'
import AuthForm from '@/components/AuthForm'
import Lines from '@/components/Lines'

export const metadata: Metadata = { title: 'Create account' }

export default function SignUpPage() {
  return (
    <section className="container-text grid gap-12 pb-32 pt-40 md:grid-cols-12 md:gap-6 md:pb-40 md:pt-60">
      <div className="md:col-span-6">
        <Lines as="h1" lines={['Save your', 'place in line.']} mobile={['Save', 'your place', 'in line.']} className="type-display" />
        <ul className="type-body mt-6 flex flex-col gap-2 text-lg">
          <li>Your first box ships 3 November. Nothing is charged before then.</li>
          <li>Pause, skip or cancel any month from your account.</li>
        </ul>
      </div>
      <div className="border-t-2 border-border pt-6 md:col-span-5 md:col-start-8">
        <AuthForm
          submit="Create account"
          done="You are on the list. We will email you before your box is packed."
          fields={[
            { name: 'name', label: 'Name', type: 'text', autoComplete: 'name' },
            { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
            { name: 'password', label: 'Password', type: 'password', autoComplete: 'new-password', minLength: 10, hint: 'At least 10 characters.' },
          ]}
        />
        <p className="type-body mt-6 border-t border-border pt-6">
          Already have an account? <Link href="/sign-in" className="link-quiet inline-flex min-h-11 items-center">Sign in</Link>
        </p>
      </div>
    </section>
  )
}
