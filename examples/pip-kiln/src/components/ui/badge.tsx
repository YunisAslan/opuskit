import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// shadcn/ui Badge as a small pill sticker.
const badgeVariants = cva('type-utility inline-flex items-center whitespace-nowrap rounded-(--radius-button) px-3 py-1 leading-none', {
  variants: {
    variant: {
      light: 'bg-(--color-surface) text-(--color-text) border border-(--color-text)',
      ink: 'bg-(--color-text) text-(--color-background)',
      quiet: 'bg-(--color-secondary) text-(--color-text)',
    },
  },
  defaultVariants: { variant: 'light' },
})

function Badge({ className, variant, ...props }: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
