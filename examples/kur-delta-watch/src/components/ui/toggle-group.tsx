"use client"

import * as React from "react"
import { cn } from "cn"
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui"

function ToggleGroup({ className, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Root>) {
  return <ToggleGroupPrimitive.Root data-slot="toggle-group" className={cn("flex flex-wrap gap-3", className)} {...props} />
}

// A chip: 2px ink border, pressed = filled ink. Focus = surface fill, never a ring.
function ToggleGroupItem({ className, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      className={cn(
        "type-utility min-h-12 cursor-pointer rounded-none border-2 border-(--color-text) bg-(--color-background) px-4 text-left outline-none transition-colors duration-150 hover:bg-(--color-surface) focus-visible:bg-(--color-surface) focus-visible:underline focus-visible:underline-offset-4 data-[state=on]:bg-(--color-text) data-[state=on]:text-(--color-background)",
        className
      )}
      {...props}
    />
  )
}

export { ToggleGroup, ToggleGroupItem }
