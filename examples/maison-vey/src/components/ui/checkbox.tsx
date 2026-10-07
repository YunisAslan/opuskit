'use client'
import * as React from 'react'
import { Checkbox as CheckboxPrimitive } from 'radix-ui'
import { cn } from '@/lib/utils'

// shadcn/ui Checkbox: a square in muted, filled with the text colour when checked.
function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn('grid size-5 shrink-0 cursor-pointer place-items-center border border-(--color-muted) transition-colors duration-150 focus-visible:border-(--color-text) data-[state=checked]:border-(--color-text) data-[state=checked]:bg-(--color-text)', className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="text-(--color-background)">
        <svg viewBox="0 0 12 12" className="size-3" aria-hidden><path d="M2 6.5 5 9l5-6" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
