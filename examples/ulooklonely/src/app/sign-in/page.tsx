import type { Metadata } from 'next'
import { SignInForm } from '@/components/forms/AuthForms'

export const metadata: Metadata = { title: 'Sign in' }

export default function SignIn() {
  return (
    <section className="px-6 pt-32 pb-32 md:px-10 md:pt-40 md:pb-40">
      <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-5">
          <h1 className="type-display">Welcome back.</h1>
          <p className="type-body mt-6 max-w-[40ch] text-(--color-muted)">Your saved films and notes are where you left them.</p>
        </div>
        <div className="md:col-span-6 md:col-start-7"><SignInForm /></div>
      </div>
    </section>
  )
}
