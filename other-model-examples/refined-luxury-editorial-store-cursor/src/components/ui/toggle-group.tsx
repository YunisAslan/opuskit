'use client'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

// shadcn/ui ToggleGroup, themed as filter chips: hairline chips; the active chip is inked.
export const ToggleGroup = forwardRef<
  React.ComponentRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <ToggleGroupPrimitive.Root ref={ref} className={cn('flex flex-wrap gap-2', className)} {...props} />
))
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

export const ToggleGroupItem = forwardRef<
  React.ComponentRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <ToggleGroupPrimitive.Item
    ref={ref}
    className={cn(
      'type-utility inline-flex h-9 items-center rounded-(--radius-button) border border-(--color-border) px-3 text-(--color-muted) transition-colors duration-150 focus-visible:outline-none hover:border-(--color-text) hover:text-(--color-text) disabled:pointer-events-none disabled:opacity-50 data-[state=on]:border-(--color-text) data-[state=on]:bg-(--color-text) data-[state=on]:text-(--color-background)',
      className,
    )}
    {...props}
  />
))
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName