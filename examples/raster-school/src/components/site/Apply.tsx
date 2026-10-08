'use client'
// The site's one main action: apply for a seat. Any "Apply" on any page opens the same sheet. Requirements and
// deadlines come first, then a short form in two steps. Nothing is connected to a service, so the last step opens the
// visitor's email app with every field filled in, addressed to the school — and says so on screen. No faked sending.
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { cohorts, seatsLeft, seatsLine, site } from '@/content/site'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet'
import { Button, buttonVariants } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Select } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CopyEmail } from './CopyEmail'
import { cn } from '@/lib/utils'
import type { VariantProps } from 'class-variance-authority'

type Ctx = { open: (cohort?: string) => void }
const ApplyContext = createContext<Ctx>({ open: () => {} })
export const useApply = () => useContext(ApplyContext)

export function ApplyProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false)
  const [cohort, setCohort] = useState<string | undefined>()
  const [key, setKey] = useState(0)
  const open = useCallback((c?: string) => {
    setCohort(c)
    setKey((k) => k + 1)
    setOpen(true)
  }, [])
  return (
    <ApplyContext.Provider value={{ open }}>
      {children}
      <Sheet open={isOpen} onOpenChange={setOpen}>
        <SheetContent side="right" aria-describedby="apply-desc">
          <ApplyFlow key={key} cohort={cohort} />
        </SheetContent>
      </Sheet>
    </ApplyContext.Provider>
  )
}

export function ApplyButton({
  cohort,
  children,
  className,
  variant,
  size,
}: { cohort?: string; children: ReactNode; className?: string } & VariantProps<typeof buttonVariants>) {
  const { open } = useApply()
  return (
    <Button type="button" variant={variant} size={size} className={className} onClick={() => open(cohort)} aria-haspopup="dialog">
      {children}
    </Button>
  )
}

const schema = z.object({
  cohort: z.string().min(1, 'Choose the cohort you would like to join.'),
  rate: z.enum(['standard', 'reduced']),
  evenings: z.boolean().refine((v) => v, 'Tick this if you can keep the evenings free.'),
  name: z.string().trim().min(2, 'Write your name as you would like us to use it.'),
  email: z.string().trim().min(1, 'Write your email so we can reply.').email('This email address looks incomplete.'),
  link: z.string().trim().optional(),
  subject: z.string().trim().max(600, 'Keep it under 600 characters; we will talk on the call.').optional(),
})
type Values = z.infer<typeof schema>

const STEPS = ['Before you apply', 'Your seat', 'About you'] as const

function ApplyFlow({ cohort }: { cohort?: string }) {
  const open = cohorts.filter((c) => seatsLeft(c) > 0)
  const [step, setStep] = useState(0)
  const [done, setDone] = useState<Values | null>(null)
  const top = useRef<HTMLDivElement>(null)
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { cohort: cohort && open.some((c) => c.id === cohort) ? cohort : '', rate: 'standard', evenings: false, name: '', email: '', link: '', subject: '' },
    mode: 'onTouched',
  })
  const chosenId = useWatch({ control: form.control, name: 'cohort' })
  const chosen = cohorts.find((c) => c.id === chosenId)

  useEffect(() => {
    top.current?.scrollIntoView({ block: 'start' })
  }, [step, done])

  async function next() {
    if (step === 1 && !(await form.trigger(['cohort', 'rate', 'evenings']))) return
    setStep((s) => s + 1)
  }

  function submit(v: Values) {
    const c = cohorts.find((x) => x.id === v.cohort)!
    const subject = `Application: ${c.name}, ${c.format.toLowerCase()}, from ${c.start}`
    const body = [
      `Name: ${v.name}`,
      `Email: ${v.email}`,
      `Cohort: ${c.name} (${c.format}, ${c.dates})`,
      `Rate: ${v.rate === 'reduced' ? 'Reduced (student or between jobs)' : 'Standard'}`,
      `Can keep the twelve evenings free: yes`,
      v.link ? `Work or website: ${v.link}` : '',
      '',
      'What I would like to make a poster about:',
      v.subject || '(to talk about on the call)',
    ]
      .filter((l, i, a) => l !== '' || a[i - 1] !== '')
      .join('\n')
    window.location.assign(`mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
    setDone(v)
    toast('Your email app should now be open', { description: 'Your application is written out there. Press send to apply.' })
  }

  return (
    <div className="flex min-h-full flex-col">
      <div ref={top} className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-(--color-border) bg-(--color-background) px-(--gutter) pt-[calc(env(safe-area-inset-top,0px)+12px)] pb-3">
        <p className="type-utility text-(--color-muted)">{done ? 'Ready to send' : `Step ${step + 1} of 3, ${STEPS[step].toLowerCase()}`}</p>
        <SheetClose className="press type-utility link-line min-h-11 px-1">Close</SheetClose>
      </div>
      {!done && (
        <div aria-hidden className="grid grid-cols-3 gap-px px-(--gutter) pt-4">
          {STEPS.map((s, i) => (
            <span key={s} className={cn('h-1 transition-colors duration-200', i <= step ? 'bg-(--color-text)' : 'bg-(--color-border)')} />
          ))}
        </div>
      )}

      <div className="flex flex-1 flex-col px-(--gutter) pt-8 pb-[calc(env(safe-area-inset-bottom,0px)+24px)]">
        {done ? (
          <Done values={done} />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} noValidate className="flex flex-1 flex-col">
              {step === 0 && (
                <div className="space-y-8">
                  <div>
                    <SheetTitle className="type-display [font-size:clamp(2.5rem,7vw,3.5rem)]">Apply</SheetTitle>
                    <SheetDescription id="apply-desc" className="mt-4">
                      Twelve seats a cohort. Read what it takes, then the form takes about ten minutes.
                    </SheetDescription>
                  </div>
                  <dl className="divide-y divide-(--color-border) border-y border-(--color-border)">
                    {[
                      ['You need', `Twelve free evenings, ${site.days} ${site.time} ${site.zoneLabel}, about three hours a week for the hand-in, and a laptop with any layout program.`],
                      ['You don’t need', 'A portfolio, a design job or a degree.'],
                      ['After you apply', `A 15-minute call within two working days, then a ${site.deposit} deposit holds your seat.`],
                    ].map(([k, v]) => (
                      <div key={k} className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-4">
                        <dt className="type-utility">{k}</dt>
                        <dd className="type-body text-(--color-muted)">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <div>
                    <h3 className="type-utility">Deadlines</h3>
                    <Table className="mt-2">
                      <TableHeader>
                        <TableRow className="border-0">
                          <TableHead>Cohort</TableHead>
                          <TableHead>Starts</TableHead>
                          <TableHead>Applications close</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cohorts.map((c) => (
                          <TableRow key={c.id}>
                            <TableCell>{c.name}<span className="type-caption block text-(--color-muted)">{c.format}</span></TableCell>
                            <TableCell>{c.start}</TableCell>
                            <TableCell>{c.closes}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-7">
                  <SheetTitle className="type-display [font-size:clamp(2.25rem,6vw,3rem)]">Your seat</SheetTitle>
                  <SheetDescription id="apply-desc" className="sr-only">Choose your cohort and rate.</SheetDescription>
                  <FormField
                    control={form.control}
                    name="cohort"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Cohort</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={(v) => {
                              field.onChange(v)
                              if (cohorts.find((c) => c.id === v)?.format === 'Online') form.setValue('rate', 'standard')
                            }}
                            label="Cohort"
                            placeholder="Choose a cohort"
                            invalid={!!fieldState.error}
                            options={open.map((c) => ({ value: c.id, label: `${c.name}, ${c.format.toLowerCase()}`, detail: `${c.dates}. ${seatsLine(c)}.` }))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="rate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rate</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                            label="Rate"
                            placeholder="Choose a rate"
                            options={
                              chosen?.format === 'Online'
                                ? [{ value: 'standard', label: 'Online, CHF 960' }]
                                : [
                                    { value: 'standard', label: 'Studio, CHF 1,480' },
                                    { value: 'reduced', label: 'Studio reduced, CHF 1,040', detail: 'Students and anyone between jobs' },
                                  ]
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="evenings"
                    render={({ field }) => (
                      <FormItem className="gap-3">
                        <div className="flex items-start gap-4">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(v === true)} onBlur={field.onBlur} className="mt-0.5" />
                          </FormControl>
                          <FormLabel className="type-body cursor-pointer">
                            I can keep {site.days} evenings free for six weeks, or watch the recording the same week.
                          </FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-7">
                  <SheetTitle className="type-display [font-size:clamp(2.25rem,6vw,3rem)]">About you</SheetTitle>
                  <SheetDescription id="apply-desc" className="sr-only">Your name, email and what you would like to make.</SheetDescription>
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl><Input autoComplete="name" enterKeyHint="next" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl><Input type="email" inputMode="email" autoComplete="email" enterKeyHint="next" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="link" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Work or website <span className="text-(--color-muted)">(optional)</span></FormLabel>
                      <FormControl><Input type="url" inputMode="url" autoComplete="url" placeholder="https://" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="subject" render={({ field }) => (
                    <FormItem>
                      <FormLabel>What would you like to make a poster about? <span className="text-(--color-muted)">(optional)</span></FormLabel>
                      <FormControl><Textarea rows={4} {...field} /></FormControl>
                      <FormDescription>A concert, a street, a word you like. It can change on the call.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              )}

              <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-10">
                {step > 0 ? (
                  <Button type="button" variant="quiet" size="bare" className="min-h-11" onClick={() => setStep((s) => s - 1)}>Back</Button>
                ) : <span />}
                {step < 2 ? (
                  <Button type="button" size="lg" onClick={next}>{step === 0 ? 'Start the application' : 'Continue'}</Button>
                ) : (
                  <Button type="submit" size="lg">Write the email</Button>
                )}
              </div>
              {step === 2 && (
                <p className="type-caption mt-4 text-(--color-muted)">
                  This opens your email app with the application written out, addressed to {site.email}. Nothing is sent until you press send there.
                </p>
              )}
            </form>
          </Form>
        )}
      </div>
    </div>
  )
}

function Done({ values }: { values: Values }) {
  const c = cohorts.find((x) => x.id === values.cohort)!
  return (
    <div className="space-y-8">
      <svg viewBox="0 0 48 48" className="size-12" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M10 25 20 35 38 14" pathLength={24} strokeDasharray="24" className="animate-[tick-draw_200ms_var(--ease-out)_both]" />
      </svg>
      <div>
        <SheetTitle className="type-display [font-size:clamp(2.25rem,6vw,3rem)]">Press send in your email app.</SheetTitle>
        <SheetDescription id="apply-desc" className="mt-4">
          Your application for {c.name}, {c.format.toLowerCase()}, is written out in a new email to us. Once you send it, we reply within two working days to arrange the call.
        </SheetDescription>
      </div>
      <div className="border-t border-(--color-border) pt-4">
        <p className="type-utility">No email app opened?</p>
        <p className="type-body mt-1 text-(--color-muted)">Write to us directly, with your name and the cohort:</p>
        <CopyEmail email={site.email} className="type-body mt-1" />
      </div>
      <SheetClose asChild>
        <Button variant="outline">Close</Button>
      </SheetClose>
    </div>
  )
}
