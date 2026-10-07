import * as React from 'react'
import { cn } from '@/lib/utils'

// shadcn/ui Input: outline in muted (WCAG 1.4.11); focus only darkens the border to the text colour.
function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'type-body h-12 w-full min-w-0 rounded-(--radius-button) border border-(--color-muted) bg-(--color-surface) px-4 text-(--color-text) transition-colors duration-150',
        'placeholder:text-(--color-muted)/80 focus:border-(--color-text) aria-invalid:border-(--color-accent) disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
