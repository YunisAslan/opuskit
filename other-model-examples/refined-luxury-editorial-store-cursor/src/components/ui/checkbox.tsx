'use client'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

// shadcn/ui Checkbox, themed: a square in the muted outline tone; checked fills with the ink.
export const Checkbox = forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer size-5 shrink-0 rounded-(--radius-button) border border-(--color-muted) bg-transparent text-(--color-background) transition-colors duration-150 focus-visible:border-(--color-text) focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-(--color-primary) data-[state=checked]:bg-(--color-primary) data-[state=checked]:text-(--color-background)',
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      <Check className="size-3.5" strokeWidth={2.5} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName