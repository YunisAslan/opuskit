'use client'
// shadcn/ui ToggleGroup — chips for once/monthly and the gift amounts. The chosen chip takes the ink; a change of
// state is a colour change, at once (it is used again and again).
import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export function ToggleGroup({ className, ...props }: ComponentProps<typeof ToggleGroupPrimitive.Root>) {
  return <ToggleGroupPrimitive.Root data-slot="toggle-group" className={cn('flex flex-wrap gap-2', className)} {...props} />
}

export function ToggleGroupItem({ className, ...props }: ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      className={cn(
        'type-utility press inline-flex h-11 min-w-16 flex-1 select-none items-center justify-center rounded-(--radius-button) border border-(--color-border) px-4 tabular-nums text-(--color-text) hover:border-(--color-muted) focus-visible:border-(--color-text) focus-visible:bg-(--color-secondary) data-[state=on]:border-(--color-text) data-[state=on]:bg-(--color-text) data-[state=on]:text-(--color-background)',
        className,
      )}
      {...props}
    />
  )
}
