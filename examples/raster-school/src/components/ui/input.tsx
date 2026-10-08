// shadcn/ui Input, restyled: a 1px muted outline that turns to the text colour on focus; 16px text so phones never zoom.
import * as React from 'react'
import { cn } from '@/lib/utils'

export const fieldClass =
  'block w-full min-w-0 rounded-none border border-(--color-muted) bg-(--color-surface) px-4 py-3 text-base text-(--color-text) placeholder:text-(--color-muted) transition-[border-color] duration-150 focus:border-(--color-text) aria-invalid:border-(--color-error) disabled:opacity-50'

export function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return <input type={type} data-slot="input" className={cn(fieldClass, 'min-h-12', className)} {...props} />
}
