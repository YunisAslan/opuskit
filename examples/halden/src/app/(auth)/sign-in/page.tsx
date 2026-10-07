import type { Metadata } from 'next'
import Link from 'next/link'
import { AuthShell } from '@/components/forms/AuthShell'
import { SignInForm } from '@/components/forms/AuthForms'
import { auth } from '@/content/site'

export const metadata: Metadata = { title: 'Sign in' }

export default function SignIn() {
  const t = auth.signIn
  return (
    <AuthShell title={t.title} line={t.line} footer={<>{t.switch} <Link href="/sign-up" className="link-line text-(--color-text) underline decoration-current">{t.switchLink}</Link></>}>
      <SignInForm />
    </AuthShell>
  )
}
