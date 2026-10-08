'use client'
// shadcn/ui Accordion, restyled: ruled rows on the hairline, the question in the heading role, a drawn plus that turns
// into a minus. Focus underlines the question; no rings.
import * as React from 'react'
import { Accordion as AccordionPrimitive } from 'radix-ui'
import { cn } from '@/lib/utils'

export function Accordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

export function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item data-slot="accordion-item" className={cn('border-b border-(--color-border)', className)} {...props} />
}

export function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'group flex min-h-14 flex-1 items-start justify-between gap-6 py-5 text-left',
          'type-heading [font-size:clamp(1.125rem,1.6vw,1.375rem)] leading-[1.2]',
          className,
        )}
        {...props}
      >
        <span className="link-line min-w-0 group-hover:decoration-current group-focus-visible:decoration-current">{children}</span>
        <span aria-hidden className="relative mt-[0.35em] size-3.5 shrink-0">
          <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
          <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-current transition-transform duration-200 ease-(--ease-out) group-data-[state=open]:rotate-90 group-data-[state=open]:scale-y-0 reduced:transition-none" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

export function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content data-slot="accordion-content" className="acc-content overflow-hidden" {...props}>
      <div className={cn('type-body max-w-[60ch] pb-6 text-(--color-muted)', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}
