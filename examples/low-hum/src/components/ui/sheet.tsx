"use client"

import * as React from "react"
import { cn } from "cn"
import { Dialog as SheetPrimitive } from "radix-ui"
import { XIcon } from "lucide-react"

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({ ...props }: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({ ...props }: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  closeLabel = "Close",
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
  closeLabel?: string
}) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay className="fixed inset-0 z-50 bg-(--color-background)/70 duration-200 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          "fixed z-50 flex flex-col gap-4 bg-(--color-surface) text-(--color-text) outline-none duration-300 ease-(--ease-hum)",
          "data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:max-h-[85svh] data-[side=bottom]:rounded-t-(--radius-card) data-[side=bottom]:border-t data-[side=bottom]:border-(--color-border)",
          "data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-[88%] data-[side=left]:max-w-md",
          "data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-[88%] data-[side=right]:max-w-md",
          "data-open:animate-in data-closed:animate-out data-[side=bottom]:data-open:slide-in-from-bottom data-[side=bottom]:data-closed:slide-out-to-bottom data-[side=left]:data-open:slide-in-from-left data-[side=left]:data-closed:slide-out-to-left data-[side=right]:data-open:slide-in-from-right data-[side=right]:data-closed:slide-out-to-right",
          "motion-reduce:data-open:slide-in-from-bottom-0 motion-reduce:data-open:slide-in-from-left-0 motion-reduce:data-open:slide-in-from-right-0 motion-reduce:data-open:fade-in-0",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close
            data-slot="sheet-close"
            className="absolute top-3 right-3 inline-flex size-11 cursor-pointer items-center justify-center rounded-(--radius-button) text-(--color-text) transition-colors duration-150 outline-none hover:bg-(--color-secondary) focus-fill"
          >
            <XIcon className="size-5" />
            <span className="sr-only">{closeLabel}</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  )
}

function SheetTitle({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return <SheetPrimitive.Title data-slot="sheet-title" className={cn("type-heading", className)} {...props} />
}

function SheetDescription({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return <SheetPrimitive.Description data-slot="sheet-description" className={cn("type-caption text-(--color-muted)", className)} {...props} />
}

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetTitle, SheetDescription }
