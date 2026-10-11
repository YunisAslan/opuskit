"use client"

import * as React from "react"
import { cn } from "cn"
import { Dialog as SheetPrimitive } from "radix-ui"

const Sheet = (props: React.ComponentProps<typeof SheetPrimitive.Root>) => <SheetPrimitive.Root data-slot="sheet" {...props} />
const SheetTrigger = (props: React.ComponentProps<typeof SheetPrimitive.Trigger>) => <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
const SheetClose = (props: React.ComponentProps<typeof SheetPrimitive.Close>) => <SheetPrimitive.Close data-slot="sheet-close" {...props} />

// Slides on --ease-drawer for --duration-sheet and leaves the way it came. `full` makes it the whole screen (100dvh):
// the site menu. Reduced motion: a short fade.
function SheetContent({ className, children, side = "bottom", full = false, ...props }:
  React.ComponentProps<typeof SheetPrimitive.Content> & { side?: "top" | "bottom"; full?: boolean }) {
  return (
    <SheetPrimitive.Portal>
      {!full && <SheetPrimitive.Overlay className="fixed inset-0 z-[80] bg-(--color-text)/30 duration-(--duration-sheet) data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />}
      <SheetPrimitive.Content data-slot="sheet-content" data-side={side}
        className={cn(
          "fixed inset-x-0 z-[85] flex flex-col bg-(--color-background) text-(--color-text) outline-none duration-(--duration-sheet) ease-(--ease-drawer) data-[state=open]:animate-in data-[state=closed]:animate-out",
          side === "top" ? "top-0 data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top" : "bottom-0 data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",
          full ? "h-dvh" : "max-h-[85dvh] rounded-t-(--radius-card) border-t border-(--color-text) pb-[env(safe-area-inset-bottom)]",
          "motion-reduce:data-[state=open]:slide-in-from-top-0 motion-reduce:data-[state=closed]:slide-out-to-top-0 motion-reduce:data-[state=open]:slide-in-from-bottom-0 motion-reduce:data-[state=closed]:slide-out-to-bottom-0 motion-reduce:data-[state=open]:fade-in-0 motion-reduce:data-[state=closed]:fade-out-0 motion-reduce:duration-200",
          className)}
        {...props}>
        {children}
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  )
}

const SheetTitle = ({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Title>) => <SheetPrimitive.Title data-slot="sheet-title" className={cn("type-heading", className)} {...props} />
const SheetDescription = ({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Description>) => <SheetPrimitive.Description data-slot="sheet-description" className={cn("type-caption text-(--color-muted)", className)} {...props} />

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetTitle, SheetDescription }
