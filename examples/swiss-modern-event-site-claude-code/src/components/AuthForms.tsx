"use client"

import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

// ponytail: no auth backend yet — both forms only confirm with a toast. Connect an auth provider before launch.

const signInSchema = z.object({
  email: z.email("Enter the email you signed up with."),
  password: z.string().min(1, "Enter your password."),
  remember: z.boolean(),
})

export function SignInForm() {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "", remember: true },
  })
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => toast.success("Signed in", { description: "Your RSVP and passes are on your account page." }))} noValidate className="grid gap-8">
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel className="type-utility">Email</FormLabel>
            <FormControl><Input type="email" autoComplete="email" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="password" render={({ field }) => (
          <FormItem>
            <div className="flex items-baseline justify-between gap-4">
              <FormLabel className="type-utility">Password</FormLabel>
              <Link href="/contact" className="type-utility text-muted underline-offset-4 hover:text-text hover:underline">Forgot password?</Link>
            </div>
            <FormControl><Input type="password" autoComplete="current-password" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="remember" render={({ field }) => (
          <FormItem className="flex min-h-11 flex-row items-center gap-3">
            <FormControl><Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(v === true)} className="size-5" /></FormControl>
            <FormLabel className="type-body font-normal">Keep me signed in on this device</FormLabel>
          </FormItem>
        )} />
        <div className="flex flex-wrap items-center gap-6">
          <Button type="submit" size="lg" className="type-utility">Sign in</Button>
          <p className="text-muted">New here? <Link href="/sign-up" className="text-text underline underline-offset-4">Create an account</Link></p>
        </div>
      </form>
    </Form>
  )
}

const signUpSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name."),
  email: z.email("Enter an email address we can send the code to."),
  password: z.string().min(10, "Use at least 10 characters."),
  terms: z.boolean().refine((v) => v, "Accept the terms to continue."),
})

export function SignUpForm() {
  const [sentTo, setSentTo] = useState<string | null>(null)
  const [code, setCode] = useState("")
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "", terms: false },
  })

  if (sentTo) {
    return (
      <form
        className="grid gap-8"
        onSubmit={(e) => {
          e.preventDefault()
          if (code.length === 6) toast.success("Account created", { description: "You can now reply and manage your RSVP." })
          else toast.error("Enter all six digits.")
        }}
      >
        <p>We sent a six-digit code to <strong>{sentTo}</strong>. It expires in 10 minutes.</p>
        <div className="grid gap-3">
          <Label htmlFor="otp" className="type-utility">Code</Label>
          <InputOTP id="otp" maxLength={6} value={code} onChange={setCode} inputMode="numeric" autoComplete="one-time-code">
            <InputOTPGroup>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot key={i} index={i} className="type-heading size-12 border-input sm:size-14" />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <Button type="submit" size="lg" className="type-utility">Confirm</Button>
          <button type="button" onClick={() => setSentTo(null)} className="type-utility min-h-11 text-muted underline-offset-4 hover:text-text hover:underline">
            Use a different email
          </button>
        </div>
      </form>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((v) => setSentTo(v.email))} noValidate className="grid gap-8">
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <FormLabel className="type-utility">Full name</FormLabel>
            <FormControl><Input autoComplete="name" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel className="type-utility">Email</FormLabel>
            <FormControl><Input type="email" autoComplete="email" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="password" render={({ field }) => (
          <FormItem>
            <FormLabel className="type-utility">Password</FormLabel>
            <FormControl><Input type="password" autoComplete="new-password" {...field} /></FormControl>
            <FormDescription>At least 10 characters.</FormDescription>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="terms" render={({ field }) => (
          <FormItem>
            <div className="flex min-h-11 items-center gap-3">
              <FormControl><Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(v === true)} className="size-5" /></FormControl>
              <FormLabel className="type-body font-normal">
                I accept the <Link href="/terms" className="underline underline-offset-4">terms</Link> and <Link href="/privacy" className="underline underline-offset-4">privacy policy</Link>
              </FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )} />
        <div className="flex flex-wrap items-center gap-6">
          <Button type="submit" size="lg" className="type-utility">Send code</Button>
          <p className="text-muted">Have an account? <Link href="/sign-in" className="text-text underline underline-offset-4">Sign in</Link></p>
        </div>
      </form>
    </Form>
  )
}
