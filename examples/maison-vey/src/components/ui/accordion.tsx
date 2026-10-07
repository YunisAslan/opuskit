'use client'
import * as React from 'react'
import { Accordion as AccordionPrimitive } from 'radix-ui'
import { cn } from '@/lib/utils'

// shadcn/ui Accordion: hairline rows, a plus that turns to a minus; the height animates (instant for reduced motion).
const Accordion = AccordionPrimitive.Root

function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item data-slot="accordion-item" className={cn('border-b border-(--color-border)', className)} {...props} />
}

function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn('group type-body flex min-h-14 flex-1 cursor-pointer items-center justify-between gap-6 py-4 text-left', className)}
        {...props}
      >
        <span className="link-quiet group-hover:decoration-current group-focus-visible:decoration-current">{children}</span>
        <span aria-hidden className="relative size-3 shrink-0 text-(--color-muted)">
          <span className="absolute inset-x-0 top-1/2 h-px bg-current" />
          <span className="absolute inset-y-0 left-1/2 w-px bg-current transition-transform duration-200 group-data-[state=open]:scale-y-0" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden data-[state=closed]:animate-[vey-accordion-up_260ms_var(--ease-page)] data-[state=open]:animate-[vey-accordion-down_320ms_var(--ease-page)]"
      {...props}
    >
      <div className={cn('type-body max-w-[60ch] pb-6 text-(--color-muted)', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
