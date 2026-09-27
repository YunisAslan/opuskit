'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Symbol } from '@/components/Logo'
import { auth } from '.'

export function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const signup = mode === 'signup'

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const email = String(f.get('email') ?? '').trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError('Enter a valid email address, like name@studio.com.')
    if (String(f.get('password') ?? '').length < 8) return setError('Use a password of at least 8 characters.')
    if (signup) auth.signUp(String(f.get('name') ?? ''), email)
    else auth.signIn(email)
    router.push('/account')
  }

  return (
    <div className="mx-auto max-w-md px-5 py-20">
      <Symbol className="h-10 w-auto" />
      <h1 className="display mt-8 text-4xl">{signup ? 'Create your account' : 'Log in'}</h1>
      <p className="mt-2 text-ink-2">{signup ? 'Keep your recipes and purchases in one place.' : 'Welcome back.'}</p>
      <form onSubmit={submit} className="mt-8 space-y-4" noValidate>
        {signup && <Field name="name" label="Name" autoComplete="name" />}
        <Field name="email" label="Email" type="email" autoComplete="email" />
        <Field name="password" label="Password" type="password" autoComplete={signup ? 'new-password' : 'current-password'} />
        {error && <p role="alert" className="text-sm text-warn">{error}</p>}
        <button type="submit" className="btn btn-ink w-full">{signup ? 'Create account' : 'Log in'}</button>
      </form>
      <p className="mt-6 text-sm text-ink-2">{signup ? <>Already have an account? <Link href="/login" className="link">Log in</Link></> : <>New to OpusKit? <Link href="/signup" className="link">Create an account</Link></>}</p>
      <p className="mt-10 text-xs text-muted">Preview mode: accounts are stored in this browser only.</p>
    </div>
  )
}

function Field({ name, label, type = 'text', autoComplete }: { name: string; label: string; type?: string; autoComplete?: string }) {
  return (
    <label className="block text-sm">
      <span>{label}</span>
      <input name={name} type={type} autoComplete={autoComplete} required className="mt-1 block w-full rounded-md border border-line bg-white px-3 py-3 text-base" />
    </label>
  )
}
