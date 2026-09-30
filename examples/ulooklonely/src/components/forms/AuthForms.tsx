'use client'
// Sign in and sign up. Front end only: validation, states and toasts are real; no auth backend is connected yet.
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'

const card = 'border-2 border-(--color-text) bg-(--color-surface) p-6 shadow-(--shadow-card) md:p-10'
const link = 'inline-flex min-h-11 items-center underline underline-offset-4 hover:text-(--color-accent)'
const wait = () => new Promise((r) => setTimeout(r, 400)) // ponytail: stand-in for the auth call

const signIn = z.object({ email: z.email('That email does not look right.'), password: z.string().min(1, 'Enter your password.'), remember: z.boolean() })

export function SignInForm() {
  const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<z.infer<typeof signIn>>({ resolver: zodResolver(signIn), defaultValues: { email: '', password: '', remember: true } })
  return (
    <form noValidate onSubmit={handleSubmit(async () => { await wait(); toast.success('Signed in', { description: 'Your saved films are where you left them.' }) })} className={card}>
      <FieldGroup className="gap-6">
        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email" className="type-utility">Email</FieldLabel>
          <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} {...register('email')} />
          <FieldError errors={[errors.email]} />
        </Field>
        <Field data-invalid={!!errors.password}>
          <div className="flex items-center justify-between gap-4">
            <FieldLabel htmlFor="password" className="type-utility">Password</FieldLabel>
            <button type="button" className={`type-utility ${link}`} onClick={() => toast('Check your inbox', { description: 'If that email has an account, a reset link is on its way.' })}>Forgot password?</button>
          </div>
          <Input id="password" type="password" autoComplete="current-password" aria-invalid={!!errors.password} {...register('password')} />
          <FieldError errors={[errors.password]} />
        </Field>
        <Field orientation="horizontal">
          <Controller control={control} name="remember" render={({ field }) => <Checkbox id="remember" checked={field.value} onCheckedChange={(v) => field.onChange(v === true)} />} />
          <FieldLabel htmlFor="remember" className="type-body min-h-11 items-center">Keep me signed in</FieldLabel>
        </Field>
      </FieldGroup>
      <Button type="submit" size="lg" disabled={isSubmitting} className="mt-8 w-full">{isSubmitting ? 'Signing in' : 'Sign in'}</Button>
      <p className="type-body mt-6 text-(--color-muted)">New here? <Link href="/sign-up" className={`text-(--color-text) ${link}`}>Create an account</Link></p>
    </form>
  )
}

const signUp = z.object({
  name: z.string().trim().min(2, 'Tell me your name.'),
  email: z.email('That email does not look right.'),
  password: z.string().min(8, 'At least 8 characters.'),
  terms: z.literal(true, { error: 'Please accept the terms to continue.' }),
})

export function SignUpForm() {
  const [email, setEmail] = useState<string | null>(null)
  const [code, setCode] = useState('')
  const [codeError, setCodeError] = useState('')
  const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<z.input<typeof signUp>>({ resolver: zodResolver(signUp), defaultValues: { name: '', email: '', password: '' } })

  if (email) {
    return (
      <form noValidate className={card} onSubmit={async (e) => {
        e.preventDefault()
        if (code.length < 6) return setCodeError('Enter all six digits.')
        await wait()
        toast.success('Account ready', { description: 'New films will reach you first.' })
      }}>
        <h2 className="type-heading">Check your email</h2>
        <p className="type-body mt-3 text-(--color-muted)">A six-digit code is on its way to {email}.</p>
        <Field data-invalid={!!codeError} className="mt-8">
          <FieldLabel htmlFor="code" className="type-utility">Code</FieldLabel>
          <InputOTP id="code" maxLength={6} value={code} onChange={(v) => { setCode(v); setCodeError('') }} aria-invalid={!!codeError}>
            <InputOTPGroup>{[0, 1, 2, 3, 4, 5].map((i) => <InputOTPSlot key={i} index={i} />)}</InputOTPGroup>
          </InputOTP>
          <FieldError>{codeError || undefined}</FieldError>
        </Field>
        <Button type="submit" size="lg" className="mt-8 w-full">Confirm</Button>
        <button type="button" className={`type-body mt-4 ${link}`} onClick={() => setEmail(null)}>Use a different email</button>
      </form>
    )
  }

  return (
    <form noValidate onSubmit={handleSubmit(async (v) => { await wait(); setEmail(v.email) })} className={card}>
      <FieldGroup className="gap-6">
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="name" className="type-utility">Name</FieldLabel>
          <Input id="name" autoComplete="name" aria-invalid={!!errors.name} {...register('name')} />
          <FieldError errors={[errors.name]} />
        </Field>
        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email" className="type-utility">Email</FieldLabel>
          <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} {...register('email')} />
          <FieldError errors={[errors.email]} />
        </Field>
        <Field data-invalid={!!errors.password}>
          <FieldLabel htmlFor="password" className="type-utility">Password</FieldLabel>
          <Input id="password" type="password" autoComplete="new-password" aria-invalid={!!errors.password} {...register('password')} />
          <FieldDescription className="type-utility text-(--color-muted)">At least 8 characters.</FieldDescription>
          <FieldError errors={[errors.password]} />
        </Field>
        <Field orientation="horizontal" data-invalid={!!errors.terms}>
          <Controller control={control} name="terms" render={({ field }) => <Checkbox id="terms" checked={field.value === true} onCheckedChange={(v) => field.onChange(v === true ? true : undefined)} aria-invalid={!!errors.terms} />} />
          <FieldLabel htmlFor="terms" className="type-body min-h-11 items-center">I accept the terms and privacy notice</FieldLabel>
        </Field>
        <FieldError errors={[errors.terms]} />
      </FieldGroup>
      <Button type="submit" size="lg" disabled={isSubmitting} className="mt-8 w-full">{isSubmitting ? 'Sending code' : 'Create account'}</Button>
      <p className="type-body mt-6 text-(--color-muted)">Already have one? <Link href="/sign-in" className={`text-(--color-text) ${link}`}>Sign in</Link></p>
    </form>
  )
}
