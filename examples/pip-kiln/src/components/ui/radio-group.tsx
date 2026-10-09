'use client'
import * as React from 'react'
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui'
import { cn } from '@/lib/utils'

function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root data-slot="radio-group" className={cn('grid gap-3', className)} {...props} />
}

// A round dot, filled with ink when picked; focus thickens its ring.
function RadioGroupItem({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item data-slot="radio-group-item"
      className={cn('grid size-6 shrink-0 place-items-center rounded-full border border-(--color-muted) bg-(--color-surface) focus-visible:border-2 focus-visible:border-(--color-text) data-[state=checked]:border-(--color-text)', className)} {...props}>
      <RadioGroupPrimitive.Indicator className="size-3 rounded-full bg-(--color-text)" />
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem, RadioGroupPrimitive }
