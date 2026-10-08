// shadcn/ui Badge, restyled: a small square label. `signal` is the one pink mark.
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva('type-utility inline-flex items-center rounded-none px-2 py-1 whitespace-nowrap', {
  variants: {
    variant: {
      signal: 'bg-(--color-accent) text-(--inv-text)',
      outline: 'border border-(--color-text) text-(--color-text)',
    },
  },
  defaultVariants: { variant: 'signal' },
})

export function Badge({ className, variant, ...props }: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
}
