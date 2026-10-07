import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

// shadcn/ui Input, themed: a focused field darkens its border to the text colour — no ring, no outline.
export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        'type-body flex h-11 w-full min-w-0 rounded-(--radius-button) border border-(--color-border) bg-(--color-surface) px-4 py-2 text-(--color-text) transition-colors duration-150 placeholder:text-(--color-muted) focus-visible:border-(--color-text) focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-(--color-accent)',
        className,
      )}
      {...props}
    />
  ),
)
Input.displayName = 'Input'