import type { Metadata } from 'next'
import Link from 'next/link'
import { AuthShell } from '@/components/forms/AuthShell'
import { SignUpForm } from '@/components/forms/AuthForms'
import { auth } from '@/content/site'

export const metadata: Metadata = { title: 'Create an account' }

export default function SignUp() {
  const t = auth.signUp
  return (
    <AuthShell title={t.title} line={t.line} footer={<>{t.switch} <Link href="/sign-in" className="link-line text-(--color-text) underline decoration-current">{t.switchLink}</Link></>}>
      <SignUpForm />
    </AuthShell>
  )
}
