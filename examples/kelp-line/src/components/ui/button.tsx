// shadcn/ui Button, restyled to the recipe: Hedvig Letters Sans in the utility role, Soft shape (8px), 1px borders,
// no rings — focus changes the ground. Every button answers the press (scale 0.97, --duration-press, --ease-out).
import { Slot } from 'radix-ui'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export const buttonVariants = cva(
  'type-utility press inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap rounded-(--radius-button) border disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: 'border-(--color-primary) bg-(--color-primary) text-(--color-background) hover:bg-(--color-muted) hover:border-(--color-muted) focus-visible:bg-(--color-muted) focus-visible:border-(--color-muted)',
        secondary: 'border-(--color-secondary) bg-(--color-secondary) text-(--color-text) hover:bg-(--color-border) hover:border-(--color-border) focus-visible:bg-(--color-border)',
        outline: 'border-(--color-muted) bg-transparent text-(--color-text) hover:bg-(--color-surface) focus-visible:bg-(--color-surface) focus-visible:border-(--color-text)',
        ghost: 'border-transparent bg-transparent text-(--color-text) hover:bg-(--color-surface) focus-visible:bg-(--color-surface)',
      },
      size: {
        default: 'h-12 px-6',
        sm: 'h-11 px-4',
        icon: 'size-11',
      },
    },
    defaultVariants: { variant: 'primary', size: 'default' },
  },
)

export function Button({ className, variant, size, asChild = false, ...props }: ComponentProps<'button'> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'button'
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size }), className)} {...props} />
}
