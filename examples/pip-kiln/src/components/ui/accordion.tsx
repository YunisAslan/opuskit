'use client'
import * as React from 'react'
import { Accordion as AccordionPrimitive } from 'radix-ui'
import { cn } from '@/lib/utils'

function Accordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item data-slot="accordion-item" className={cn('border-b border-(--color-text)/25', className)} {...props} />
}

// The question in Epilogue 800; a round + that turns into × when open.
function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger data-slot="accordion-trigger"
        className={cn('group t-card flex min-h-16 flex-1 items-center justify-between gap-6 py-5 text-left [font-size:clamp(1.1rem,1.5vw,1.35rem)] focus-visible:underline focus-visible:decoration-2 focus-visible:underline-offset-4', className)} {...props}>
        <span className="min-w-0">{children}</span>
        <span aria-hidden className="relative grid size-10 shrink-0 place-items-center rounded-full border border-(--color-text) transition-[background-color,transform] duration-200 ease-(--ease-out) group-hover:bg-(--color-surface) group-data-[state=open]:rotate-45 group-data-[state=open]:bg-(--color-text) group-data-[state=open]:text-(--color-background) motion-reduce:transition-[background-color]">
          <span className="absolute h-0.5 w-4 rounded-full bg-current" /><span className="absolute h-4 w-0.5 rounded-full bg-current" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content data-slot="accordion-content" className="acc overflow-hidden" {...props}>
      <div className={cn('type-body max-w-[60ch] pb-6 pr-14 text-(--color-text)', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
