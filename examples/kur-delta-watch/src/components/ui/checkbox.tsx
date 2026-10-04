"use client"

import * as React from "react"
import { cn } from "cn"
import { Checkbox as CheckboxPrimitive } from "radix-ui"
import { CheckIcon } from "lucide-react"

// 24px box with a 44px hit area (the ::after), 2px ink border; focus fills it with the surface tone.
function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer relative flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-none border-2 border-(--color-text) bg-(--color-background) outline-none transition-colors after:absolute after:-inset-2.5 focus-visible:bg-(--color-surface) data-[state=checked]:bg-(--color-text) data-[state=checked]:text-(--color-background) disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className="grid place-content-center [&>svg]:size-4">
        <CheckIcon strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
