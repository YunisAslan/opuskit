"use client"

import * as React from "react"
import { cn } from "cn"
import { Select as SelectPrimitive } from "radix-ui"
import { fieldClass } from "./input"

const Select = (props: React.ComponentProps<typeof SelectPrimitive.Root>) => <SelectPrimitive.Root data-slot="select" {...props} />
const SelectValue = (props: React.ComponentProps<typeof SelectPrimitive.Value>) => <SelectPrimitive.Value data-slot="select-value" {...props} />

const Chevron = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 20 20" aria-hidden className={cn("size-5 shrink-0", className)}><path d="M4 7.5 C 7 10, 8.5 12, 10 13.5 C 12 11, 13.5 9.5, 16.5 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

function SelectTrigger({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger data-slot="select-trigger"
      className={cn(fieldClass, "flex h-12 items-center justify-between gap-3 text-left data-[placeholder]:text-(--color-muted) *:data-[slot=select-value]:line-clamp-1", className)} {...props}>
      {children}
      <SelectPrimitive.Icon asChild><Chevron className="text-(--color-text)" /></SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

// Grows out of its trigger (Radix origin), 0.95 → 1 with opacity, --duration-menu on --ease-out; leaves the way it came.
function SelectContent({ className, children, position = "popper", ...props }: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content data-slot="select-content" position={position} sideOffset={6}
        className={cn("relative z-[90] max-h-(--radix-select-content-available-height) min-w-(--radix-select-trigger-width) origin-(--radix-select-content-transform-origin) overflow-y-auto rounded-(--radius-card) border border-(--color-text) bg-(--color-surface) p-1 text-(--color-text) duration-(--duration-menu) ease-(--ease-out) data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 motion-reduce:data-[state=open]:zoom-in-100 motion-reduce:data-[state=closed]:zoom-out-100", className)}
        {...props}>
        <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item data-slot="select-item"
      className={cn("type-body relative flex min-h-11 w-full cursor-pointer select-none items-center rounded-(--radius-button) py-2 pl-3 pr-10 outline-none data-[highlighted]:bg-(--color-secondary) data-[disabled]:opacity-50", className)} {...props}>
      <span className="pointer-events-none absolute right-3 flex size-5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <svg viewBox="0 0 20 20" className="size-5" aria-hidden><path d="M3.5 10.5 C 5.5 12, 7 14, 8 16 C 10 10.5, 13 6.5, 17 3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Chevron }
