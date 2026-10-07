'use client'
// Sign in and Sign up (shadcn Form, Input, Checkbox, InputOTP). No account service is connected yet, so after the
// form checks itself it says so plainly and points to booking by email or phone — it never pretends to sign anyone in.
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod/mini'
import { field } from '@/components/forms/Fields'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { auth, brand } from '@/content/site'

const box = 'size-5 rounded-none border-(--color-muted) data-checked:border-(--color-text) data-checked:bg-(--color-text) data-checked:text-(--color-background)'

const inForm = auth.signIn
const signInSchema = z.object({
  email: z.email(inForm.errors.email),
  password: z.string().check(z.minLength(1, inForm.errors.password)),
  remember: z.boolean(),
})

export function SignInForm() {
  const form = useForm<z.infer<typeof signInSchema>>({ resolver: zodResolver(signInSchema), defaultValues: { email: '', password: '', remember: true } })
  return (
    <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit(() => toast(inForm.submit, { description: inForm.pending }))} className="grid gap-6">
        <FormField control={form.control} name="email" render={({ field: fl }) => (
          <FormItem><FormLabel>{inForm.email}</FormLabel><FormControl><Input type="email" autoComplete="email" className={field} {...fl} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="password" render={({ field: fl }) => (
          <FormItem>
            <div className="flex items-baseline justify-between gap-4">
              <FormLabel>{inForm.password}</FormLabel>
              <a href={`mailto:${brand.email}?subject=${encodeURIComponent('Reset my password')}`} className="type-utility link-line -my-3 inline-flex min-h-11 items-center text-(--color-muted)">{inForm.forgot}</a>
            </div>
            <FormControl><Input type="password" autoComplete="current-password" className={field} {...fl} /></FormControl><FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="remember" render={({ field: fl }) => (
          <FormItem className="flex min-h-11 items-center gap-3">
            <FormControl><Checkbox checked={fl.value} onCheckedChange={(v) => fl.onChange(v === true)} className={box} /></FormControl>
            <FormLabel className="type-body font-normal">{inForm.remember}</FormLabel>
          </FormItem>
        )} />
        <button type="submit" className="btn btn-solid w-full">{inForm.submit}</button>
      </form>
    </Form>
  )
}

const up = auth.signUp
const signUpSchema = z.object({
  name: z.string().check(z.trim(), z.minLength(1, up.errors.name)),
  email: z.email(up.errors.email),
  password: z.string().check(z.minLength(8, up.errors.password)),
  terms: z.boolean().check(z.refine((v) => v, up.errors.terms)),
})
const codeSchema = z.object({ code: z.string().check(z.length(6, up.errors.code)) })

export function SignUpForm() {
  const [sentTo, setSentTo] = useState<string | null>(null)
  const form = useForm<z.infer<typeof signUpSchema>>({ resolver: zodResolver(signUpSchema), defaultValues: { name: '', email: '', password: '', terms: false } })
  const code = useForm<z.infer<typeof codeSchema>>({ resolver: zodResolver(codeSchema), defaultValues: { code: '' } })

  if (sentTo) return (
    <Form {...code}>
      <form noValidate onSubmit={code.handleSubmit(() => toast(up.codeSubmit, { description: up.pending }))} className="grid gap-6">
        <div>
          <p className="type-title">{up.codeTitle}</p>
          <p className="type-body mt-2 text-(--color-muted)">{up.codeLine} {sentTo}.</p>
        </div>
        <FormField control={code.control} name="code" render={({ field: fl }) => (
          <FormItem>
            <FormLabel>{up.codeLabel}</FormLabel>
            <FormControl>
              <InputOTP maxLength={6} {...fl}>
                <InputOTPGroup className="gap-2">
                  {Array.from({ length: 6 }, (_, i) => (
                    <InputOTPSlot key={i} index={i} className="type-title size-12 rounded-none border border-(--color-muted) first:rounded-none last:rounded-none data-[active=true]:border-(--color-text)" />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <button type="submit" className="btn btn-solid w-full">{up.codeSubmit}</button>
      </form>
    </Form>
  )

  return (
    <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit((v) => setSentTo(v.email))} className="grid gap-6">
        <FormField control={form.control} name="name" render={({ field: fl }) => (
          <FormItem><FormLabel>{up.name}</FormLabel><FormControl><Input autoComplete="name" className={field} {...fl} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="email" render={({ field: fl }) => (
          <FormItem><FormLabel>{up.email}</FormLabel><FormControl><Input type="email" autoComplete="email" className={field} {...fl} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="password" render={({ field: fl }) => (
          <FormItem><FormLabel>{up.password}</FormLabel><FormControl><Input type="password" autoComplete="new-password" className={field} {...fl} /></FormControl><FormDescription>{up.passwordHint}</FormDescription><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="terms" render={({ field: fl }) => (
          <FormItem>
            <div className="flex min-h-11 items-center gap-3">
              <FormControl><Checkbox checked={fl.value} onCheckedChange={(v) => fl.onChange(v === true)} className={box} /></FormControl>
              <FormLabel className="type-body font-normal">{up.terms}</FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )} />
        <button type="submit" className="btn btn-solid w-full">{up.submit}</button>
      </form>
    </Form>
  )
}
