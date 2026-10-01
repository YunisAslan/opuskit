'use client'
// The main action: "Start free" anywhere on the site opens this panel. Step 1 asks for an email and studio size,
// step 2 takes the 6-digit code. Form: react-hook-form + zod, inline errors under each field.
// ponytail: static site, no backend — onSubmit only moves between steps. Wire both submits to your auth provider.
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'

const sizes = ['Just me', '2 to 5 people', '6 to 20 people'] as const
const schema = z.object({
  email: z.string().trim().email('Enter an email address like name@studio.com'),
  size: z.enum(sizes, { message: 'Pick the size of your studio' }),
  changelog: z.boolean(),
})
type Values = z.infer<typeof schema>

export function Signup() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState<string | null>(null)
  const [code, setCode] = useState('')
  const form = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { email: '', changelog: true } })

  useEffect(() => {
    const onStart = () => setOpen(true)
    addEventListener('hexmint:start', onStart)
    return () => removeEventListener('hexmint:start', onStart)
  }, [])

  const onOpenChange = (o: boolean) => {
    setOpen(o)
    if (!o) { setEmail(null); setCode('') }
  }
  const verify = (value: string) => {
    if (value.length !== 6) return
    onOpenChange(false)
    form.reset()
    toast.success('Your studio is set up', { description: 'Connect a bank next. It takes about two minutes.' })
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full gap-0 overflow-y-auto border-(--color-border) bg-(--color-surface) sm:max-w-md" data-lenis-prevent>
        <SheetHeader className="px-6 pt-8 pb-2">
          <p className="type-utility text-(--color-muted)">{email ? '// 02 Verify' : '// 01 Start free'}</p>
          <SheetTitle className="type-heading mt-2">{email ? 'Check your inbox' : 'Your studio, in five minutes'}</SheetTitle>
          <SheetDescription className="type-body text-(--color-muted)">
            {email ? `We sent a 6-digit code to ${email}. It works for 10 minutes.` : '30 days free on any plan. No card needed.'}
          </SheetDescription>
        </SheetHeader>

        {!email ? (
          <form noValidate className="px-6 pt-6 pb-8" onSubmit={form.handleSubmit((v) => setEmail(v.email))}>
            <FieldGroup className="gap-6">
              <Controller name="email" control={form.control} render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="signup-email" className="type-utility">Work email</FieldLabel>
                  <Input {...field} id="signup-email" type="email" autoComplete="email" placeholder="name@studio.com" aria-invalid={fieldState.invalid} />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )} />
              <Controller name="size" control={form.control} render={({ field, fieldState }) => (
                <FieldSet data-invalid={fieldState.invalid}>
                  <FieldLegend variant="label" className="type-utility">Studio size</FieldLegend>
                  <RadioGroup name={field.name} value={field.value ?? ''} onValueChange={field.onChange} aria-invalid={fieldState.invalid} className="gap-0">
                    {sizes.map((s) => (
                      <Field key={s} orientation="horizontal" className="min-h-11 items-center">
                        <RadioGroupItem value={s} id={`size-${s}`} aria-invalid={fieldState.invalid} />
                        <FieldLabel htmlFor={`size-${s}`} className="type-body font-normal">{s}</FieldLabel>
                      </Field>
                    ))}
                  </RadioGroup>
                  <FieldError errors={[fieldState.error]} />
                </FieldSet>
              )} />
              <Controller name="changelog" control={form.control} render={({ field }) => (
                <Field orientation="horizontal" className="min-h-11 items-center">
                  <Checkbox id="signup-changelog" checked={field.value} onCheckedChange={(c) => field.onChange(c === true)} />
                  <FieldLabel htmlFor="signup-changelog" className="type-body font-normal">Send me the monthly changelog</FieldLabel>
                </Field>
              )} />
              <Button type="submit" size="lg" className="w-full">Email me a code</Button>
              <FieldDescription className="type-utility">We use your email for your account and nothing else.</FieldDescription>
            </FieldGroup>
          </form>
        ) : (
          <div className="px-6 pt-6 pb-8">
            <Field>
              <FieldLabel htmlFor="signup-code" className="type-utility">6-digit code</FieldLabel>
              <InputOTP id="signup-code" maxLength={6} value={code} onChange={setCode} onComplete={verify} inputMode="numeric" pattern="^[0-9]+$" autoFocus>
                <InputOTPGroup>
                  {Array.from({ length: 6 }, (_, i) => <InputOTPSlot key={i} index={i} />)}
                </InputOTPGroup>
              </InputOTP>
            </Field>
            <Button size="lg" className="mt-6 w-full" disabled={code.length !== 6} onClick={() => verify(code)}>Open my studio</Button>
            <Button variant="ghost" className="mt-2 w-full" onClick={() => { setEmail(null); setCode('') }}>Use a different email</Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
