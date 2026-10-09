"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"
import { CheckIcon, ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { fieldClass } from "./input"

// Restyled: the trigger is a field (48px, muted outline darkening to bone on focus); the list grows out of it from 0.95
// in --duration-menu; a highlighted option only changes its background.
const Select = SelectPrimitive.Root

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return <SelectPrimitive.Value data-slot="select-value" className={cn("flex-1 truncate text-left", className)} {...props} />
}

function SelectTrigger({ className, children, ...props }: SelectPrimitive.Trigger.Props) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(fieldClass, "flex items-center justify-between gap-3 text-left select-none data-placeholder:text-(--color-muted) data-popup-open:border-(--color-text)", className)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon render={<ChevronDownIcon className="pointer-events-none size-4 shrink-0 text-(--color-muted)" />} />
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({ className, children, side = "bottom", sideOffset = 4, align = "start", alignItemWithTrigger = false, ...props }: SelectPrimitive.Popup.Props & Pick<SelectPrimitive.Positioner.Props, "align" | "side" | "sideOffset" | "alignItemWithTrigger">) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner side={side} sideOffset={sideOffset} align={align} alignItemWithTrigger={alignItemWithTrigger} className="isolate z-50">
        <SelectPrimitive.Popup
          data-slot="select-content"
          className={cn(
            "max-h-(--available-height) w-(--anchor-width) min-w-40 origin-(--transform-origin) overflow-y-auto overscroll-contain border border-(--color-border) bg-(--color-surface) py-1 text-(--color-text) outline-none transition-[opacity,transform] duration-(--duration-menu) ease-(--ease-out) data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 motion-reduce:data-ending-style:scale-100 motion-reduce:data-starting-style:scale-100",
            className
          )}
          {...props}
        >
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectItem({ className, children, ...props }: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn("type-body relative flex min-h-11 w-full items-center gap-2 py-2 pr-10 pl-4 outline-none select-none data-disabled:opacity-40 data-highlighted:bg-(--color-secondary)", className)}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex-1">{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator render={<span className="pointer-events-none absolute right-4 flex size-4 items-center justify-center" />}>
        <CheckIcon className="size-4" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }
