import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// shadcn/ui Badge, themed. Used for facts (size, family, sold out) — never for discount messaging.
const badgeVariants = cva(
  'type-utility inline-flex items-center gap-1 rounded-(--radius-button) border px-2.5 py-1 leading-none',
  {
    variants: {
      variant: {
        default: 'border-(--color-border) bg-(--color-secondary) text-(--color-text)',
        outline: 'border-(--color-border) text-(--color-muted)',
        solid: 'border-transparent bg-(--color-text) text-(--color-background)',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { badgeVariants }