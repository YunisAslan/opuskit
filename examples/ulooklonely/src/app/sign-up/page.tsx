import type { Metadata } from 'next'
import { SignUpForm } from '@/components/forms/AuthForms'

export const metadata: Metadata = { title: 'Sign up' }

export default function SignUp() {
  return (
    <section className="px-6 pt-32 pb-32 md:px-10 md:pt-40 md:pb-40">
      <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-5">
          <h1 className="type-display">Keep a seat.</h1>
          <p className="type-body mt-6 max-w-[40ch] text-(--color-muted)">An account lets you save films to watch later and get a short note when a new one is out. Nothing else, no feed.</p>
        </div>
        <div className="md:col-span-6 md:col-start-7"><SignUpForm /></div>
      </div>
    </section>
  )
}
