import * as React from 'react'
import { cn } from '@/lib/utils'

// shadcn/ui Input: a pill field on the surface; focus only darkens the border (no rings). 16px+ so phones never zoom.
const field = 'type-body w-full min-w-0 rounded-(--radius-button) border border-(--color-muted) bg-(--color-surface) px-5 text-(--color-text) placeholder:text-(--color-muted)/80 transition-[border-color] duration-150 focus:border-(--color-text) focus:border-2 focus:px-[19px] aria-invalid:border-(--color-error) disabled:opacity-50 [font-size:max(16px,var(--type-body-size))]'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return <input type={type} data-slot="input" className={cn(field, 'h-12', className)} {...props} />
}

export { Input, field }
