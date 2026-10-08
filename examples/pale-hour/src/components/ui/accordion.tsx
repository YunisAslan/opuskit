'use client'
// shadcn/ui Accordion (Radix), restyled: hairline rows, the question in the heading face, a drawn plus that turns.
import { Accordion as AccordionPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export const Accordion = AccordionPrimitive.Root

export function AccordionItem({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item className={cn('border-b border-(--color-border)', className)} {...props} />
}

export function AccordionTrigger({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn('group flex min-h-11 flex-1 cursor-pointer items-baseline justify-between gap-6 py-5 text-left transition-colors duration-150 focus-visible:bg-(--color-secondary)', className)}
        {...props}
      >
        <span className="type-heading [font-size:clamp(1.15rem,1.6vw,1.4rem)]">{children}</span>
        <span aria-hidden className="relative size-3 shrink-0 translate-y-[-0.1em] transition-transform duration-300 ease-(--ease-page) group-data-[state=open]:rotate-45 motion-reduce:transition-none">
          <span className="absolute inset-x-0 top-1/2 h-px bg-current" />
          <span className="absolute inset-y-0 left-1/2 w-px bg-current" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

export function AccordionContent({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-[accordion-up_250ms_var(--ease-page)] data-[state=open]:animate-[accordion-down_300ms_var(--ease-page)]" {...props}>
      <div className={cn('type-body max-w-[60ch] pb-6', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}
