"use client"

import * as React from "react"
import { cn } from "cn"
import { Accordion as AccordionPrimitive } from "radix-ui"

function Accordion({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" className={cn("flex w-full flex-col", className)} {...props} />
}

function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item data-slot="accordion-item" className={cn("border-b border-(--color-border)", className)} {...props} />
}

// The marker is a hand-drawn plus whose upright stroke lifts away when open.
function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger data-slot="accordion-trigger"
        className={cn("group/acc flex min-h-11 flex-1 items-start justify-between gap-6 py-4 text-left outline-none focus-visible:underline focus-visible:decoration-1 focus-visible:underline-offset-6", className)}
        {...props}>
        <span className="min-w-0">{children}</span>
        <svg viewBox="0 0 24 24" aria-hidden className="mt-[0.2em] size-6 shrink-0 text-(--color-text)">
          <path d="M3 12.5 C 9 11.5, 15 12.8, 21 11.6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M12.4 3 C 11.6 9, 12.6 15, 11.8 21" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="origin-center transition-[transform,opacity] duration-200 ease-(--ease-out) group-data-[state=open]/acc:rotate-90 group-data-[state=open]/acc:opacity-0 motion-reduce:transition-opacity" />
        </svg>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content data-slot="accordion-content" className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down motion-reduce:animate-none" {...props}>
      <div className={cn("type-body max-w-[62ch] pb-6 text-(--color-muted) [&_a]:underline [&_a]:underline-offset-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
