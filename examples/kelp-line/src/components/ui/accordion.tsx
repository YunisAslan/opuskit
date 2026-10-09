'use client'
// shadcn/ui Accordion — rules between questions, a plus that turns to a minus; the answer opens in height (the one
// place height may move), quickly. Focus underlines the question.
import { Accordion as AccordionPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export const Accordion = AccordionPrimitive.Root

export function AccordionItem({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item data-slot="accordion-item" className={cn('border-b border-(--color-border)', className)} {...props} />
}

export function AccordionTrigger({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn('group type-title flex min-h-11 flex-1 cursor-pointer items-start justify-between gap-6 py-6 text-left decoration-1 underline-offset-4 transition-[color] duration-150 hover:text-(--color-muted) focus-visible:underline', className)}
        {...props}
      >
        <span className="min-w-0">{children}</span>
        <span aria-hidden className="relative mt-[0.45em] size-3.5 shrink-0">
          <span className="absolute left-0 top-1/2 h-px w-full bg-current" />
          <span className="absolute left-1/2 top-0 h-full w-px bg-current transition-transform duration-200 ease-(--ease-out) group-data-[state=open]:scale-y-0" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

export function AccordionContent({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content data-slot="accordion-content" className="anim-acc overflow-hidden" {...props}>
      <div className={cn('type-body max-w-[60ch] pb-7 text-(--color-muted)', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}
