'use client'
import * as React from 'react'
import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui'
import { cn } from '@/lib/utils'

// shadcn/ui ToggleGroup as filter chips: pills, the picked one filled with ink.
function ToggleGroup({ className, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Root>) {
  return <ToggleGroupPrimitive.Root data-slot="toggle-group" className={cn('flex flex-wrap gap-2', className)} {...props} />
}

function ToggleGroupItem({ className, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  return (
    <ToggleGroupPrimitive.Item data-slot="toggle-group-item"
      className={cn('type-utility press inline-flex min-h-11 select-none items-center gap-2 rounded-(--radius-button) border border-(--color-text) bg-transparent px-4 font-bold [font-size:0.9375rem] transition-[background-color,color,transform] duration-150 hover:bg-(--color-surface) focus-visible:underline focus-visible:decoration-2 focus-visible:underline-offset-4 data-[state=on]:bg-(--color-text) data-[state=on]:text-(--color-background)', className)} {...props} />
  )
}

export { ToggleGroup, ToggleGroupItem }
