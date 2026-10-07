'use client'
import * as React from 'react'
import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui'
import { cn } from '@/lib/utils'

// shadcn/ui Toggle group as filter chips: quiet text with the site underline; the chosen one keeps it.
function ToggleGroup({ className, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Root>) {
  return <ToggleGroupPrimitive.Root className={cn('flex flex-wrap items-center gap-x-6 gap-y-1', className)} {...props} />
}
function ToggleGroupItem({ className, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  return (
    <ToggleGroupPrimitive.Item
      className={cn(
        'type-body link-quiet inline-flex min-h-11 cursor-pointer items-center text-(--color-muted) transition-colors duration-150 hover:text-(--color-text)',
        'data-[state=on]:text-(--color-text) data-[state=on]:decoration-current',
        className,
      )}
      {...props}
    />
  )
}

export { ToggleGroup, ToggleGroupItem }
