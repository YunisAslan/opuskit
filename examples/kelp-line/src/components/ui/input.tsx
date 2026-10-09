// shadcn/ui Input — 17px text (never under 16px, so phones never zoom), muted outline for WCAG 1.4.11; focus darkens
// the border to the text colour, no ring. An invalid field takes --color-error.
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export const fieldClass =
  'type-body block w-full min-w-0 rounded-(--radius-button) border border-(--color-muted) bg-(--color-background) px-4 text-(--color-text) placeholder:text-(--color-muted) transition-[border-color] duration-150 hover:border-(--color-text) focus:border-(--color-text) focus:outline-none aria-invalid:border-(--color-error) disabled:opacity-50'

export function Input({ className, type, ...props }: ComponentProps<'input'>) {
  return <input type={type} data-slot="input" className={cn(fieldClass, 'h-12', className)} {...props} />
}
