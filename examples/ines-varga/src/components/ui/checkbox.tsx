"use client"

import * as React from "react"
import { cn } from "cn"
import { Checkbox as CheckboxPrimitive } from "radix-ui"

// The tick is drawn by hand: a pen stroke, not an icon.
function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root data-slot="checkbox"
      className={cn("peer relative grid size-6 shrink-0 place-items-center rounded-(--radius-button) border border-(--color-muted) bg-(--color-surface) outline-none transition-[border-color] duration-150 after:absolute after:-inset-2.5 focus-visible:border-(--color-text) focus-visible:border-2 aria-invalid:border-(--color-error) data-[state=checked]:border-(--color-text) disabled:opacity-50", className)}
      {...props}>
      <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className="grid place-content-center text-(--color-text)">
        <svg viewBox="0 0 20 20" className="size-5" aria-hidden><path d="M3.5 10.5 C 5.5 12, 7 14, 8 16 C 10 10.5, 13 6.5, 17 3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
