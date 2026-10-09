"use client"

import * as React from "react"
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog"
import { cn } from "@/lib/utils"

// Restyled: a sheet slides from its edge on the drawer curve (--duration-sheet) and leaves the way it came; full
// height layers are 100dvh; scroll inside never chains to the page. Reduced motion: a short fade.
function Sheet({ ...props }: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}
function SheetTrigger({ ...props }: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}
function SheetClose({ ...props }: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetContent({ className, children, side = "left", ...props }: SheetPrimitive.Popup.Props & { side?: "left" | "bottom" }) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Backdrop className="fixed inset-0 z-[70] bg-(--color-background)/70 transition-opacity duration-(--duration-sheet) ease-(--ease-drawer) data-ending-style:opacity-0 data-starting-style:opacity-0" />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          "fixed z-[71] flex flex-col overscroll-contain bg-(--color-background) text-(--color-text) outline-none transition-[transform,opacity] duration-(--duration-sheet) ease-(--ease-drawer) motion-reduce:transition-opacity motion-reduce:duration-200",
          "data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-dvh data-[side=left]:w-full data-[side=left]:border-r data-[side=left]:border-(--color-border) data-[side=left]:data-starting-style:-translate-x-full data-[side=left]:data-ending-style:-translate-x-full",
          "data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:max-h-[85dvh] data-[side=bottom]:overflow-y-auto data-[side=bottom]:border-t data-[side=bottom]:border-(--color-border) data-[side=bottom]:pb-[env(safe-area-inset-bottom,0px)] data-[side=bottom]:data-starting-style:translate-y-full data-[side=bottom]:data-ending-style:translate-y-full",
          "motion-reduce:data-starting-style:translate-x-0 motion-reduce:data-ending-style:translate-x-0 motion-reduce:data-starting-style:translate-y-0 motion-reduce:data-ending-style:translate-y-0 motion-reduce:data-starting-style:opacity-0 motion-reduce:data-ending-style:opacity-0",
          className
        )}
        {...props}
      >
        {children}
      </SheetPrimitive.Popup>
    </SheetPrimitive.Portal>
  )
}

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
  return <SheetPrimitive.Title data-slot="sheet-title" className={cn("type-utility text-(--color-muted)", className)} {...props} />
}

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetTitle }
