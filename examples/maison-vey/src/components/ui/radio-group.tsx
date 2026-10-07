'use client'
import * as React from 'react'
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui'
import { cn } from '@/lib/utils'

// shadcn/ui Radio group, two looks: `choice` (an option set as square buttons) and `list` (a square mark beside a label).
function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root data-slot="radio-group" className={cn('grid gap-2', className)} {...props} />
}

function RadioChoice({ className, children, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        'type-body inline-flex min-h-11 cursor-pointer items-center justify-center border border-(--color-border) px-5 text-(--color-muted) transition-colors duration-150',
        'hover:border-(--color-muted) hover:text-(--color-text) focus-visible:border-(--color-text) focus-visible:text-(--color-text)',
        'data-[state=checked]:border-(--color-text) data-[state=checked]:text-(--color-text) disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {children}
    </RadioGroupPrimitive.Item>
  )
}

function RadioGroupItem({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn('grid size-5 shrink-0 cursor-pointer place-items-center border border-(--color-muted) transition-colors duration-150 focus-visible:border-(--color-text) data-[state=checked]:border-(--color-text)', className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="block size-2.5 bg-(--color-text)" />
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem, RadioChoice }
