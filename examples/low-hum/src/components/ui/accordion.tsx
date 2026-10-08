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

// The question in the heading face; a soft plus that turns into a minus. Hover underlines the question; keyboard
// focus underlines it thick in mint and fills the plus mint.
function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/acc flex min-h-11 flex-1 cursor-pointer items-center justify-between gap-6 py-6 text-left outline-none",
          className
        )}
        {...props}
      >
        <span className="type-heading [font-size:clamp(1.25rem,2vw,1.6rem)] underline decoration-transparent decoration-1 underline-offset-[0.2em] transition-[text-decoration-color] duration-150 group-hover/acc:decoration-current group-focus-visible/acc:decoration-(--color-accent) group-focus-visible/acc:decoration-[3px]">
          {children}
        </span>
        <span aria-hidden className="relative grid size-11 shrink-0 place-items-center rounded-full border border-(--color-border) transition-colors duration-150 group-hover/acc:border-(--color-text) group-aria-expanded/acc:bg-(--color-text) group-focus-visible/acc:border-(--color-accent) group-focus-visible/acc:bg-(--color-accent)">
          <span className="absolute h-px w-4 bg-(--color-text) group-aria-expanded/acc:bg-(--color-background) group-focus-visible/acc:bg-(--color-background)" />
          <span className="absolute h-4 w-px bg-(--color-text) group-focus-visible/acc:bg-(--color-background) transition-transform duration-200 ease-(--ease-hum) group-aria-expanded/acc:scale-y-0" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-top-2 data-open:duration-300 motion-reduce:data-open:slide-in-from-top-0"
      {...props}
    >
      <div className={cn("type-body max-w-[60ch] pr-14 pb-7 text-(--color-muted)", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
