'use client'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { Minus, Plus } from 'lucide-react'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

// shadcn/ui Accordion (type="single" collapsible), themed to the tokens: hairline dividers, one answer
// open at a time, height easing open and closed.
export const Accordion = AccordionPrimitive.Root

export const AccordionItem = forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn('border-b border-(--color-border)', className)} {...props} />
))
AccordionItem.displayName = 'AccordionItem'

export const AccordionTrigger = forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'type-body group flex flex-1 items-center justify-between gap-6 py-5 text-left transition-colors duration-150 hover:text-(--color-muted) focus-visible:outline-none focus-visible:text-(--color-muted) [&[data-state=open]>svg]:hidden',
        className,
      )}
      {...props}
    >
      {children}
      <Plus aria-hidden className="size-4 shrink-0 text-(--color-muted) transition-transform duration-200 group-data-[state=open]:rotate-90" />
      <Minus aria-hidden className="hidden size-4 shrink-0 text-(--color-muted) group-data-[state=open]:block" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = 'AccordionTrigger'

export const AccordionContent = forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn('type-body max-w-[60ch] pb-6 text-(--color-muted)', className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = 'AccordionContent'