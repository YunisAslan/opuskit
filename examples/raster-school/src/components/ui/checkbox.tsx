'use client'
// shadcn/ui Checkbox, restyled: a square on the hairline that fills white with a drawn tick.
import * as React from 'react'
import { Checkbox as CheckboxPrimitive } from 'radix-ui'
import { cn } from '@/lib/utils'

export function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'peer relative grid size-6 shrink-0 place-items-center rounded-none border border-(--color-muted) bg-(--color-surface) text-(--color-background) transition-[background-color,border-color] duration-150 focus-visible:border-(--color-text) data-[state=checked]:border-(--color-text) data-[state=checked]:bg-(--color-text) aria-invalid:border-(--color-error)',
        'before:absolute before:-inset-2.5 before:content-[""]',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator data-slot="checkbox-indicator">
        <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M3 8.5 6.5 12 13 4.5" /></svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}
