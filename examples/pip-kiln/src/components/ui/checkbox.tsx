'use client'
import * as React from 'react'
import { Checkbox as CheckboxPrimitive } from 'radix-ui'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

// shadcn/ui Checkbox: a round sticker that fills with ink when ticked.
function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root data-slot="checkbox"
      className={cn('peer grid size-6 shrink-0 place-items-center rounded-full border border-(--color-muted) bg-(--color-surface) transition-[background-color,border-color] duration-150 focus-visible:border-2 focus-visible:border-(--color-text) data-[state=checked]:border-(--color-text) data-[state=checked]:bg-(--color-text) data-[state=checked]:text-(--color-background) aria-invalid:border-(--color-error)', className)} {...props}>
      <CheckboxPrimitive.Indicator className="grid place-items-center"><Check className="size-4" strokeWidth={3} /></CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
