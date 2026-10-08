// shadcn/ui Button, restyled to the recipe: utility type role, sharp corners, 1px lines, 44px tall, no rings.
import { Slot } from 'radix-ui'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export const buttonVariants = cva(
  'type-utility inline-flex min-h-11 cursor-pointer items-center justify-center gap-3 whitespace-nowrap rounded-(--radius-button) px-5 transition-[background-color,color,border-color] duration-150 ease-out disabled:pointer-events-none disabled:opacity-50 focus-visible:underline focus-visible:underline-offset-4',
  {
    variants: {
      variant: {
        primary: 'bg-(--color-primary) text-(--color-background) hover:bg-(--color-muted) focus-visible:bg-(--color-muted)',
        outline: 'border border-current bg-transparent text-current hover:bg-(--color-text) hover:text-(--color-background) hover:border-(--color-text) focus-visible:bg-(--color-secondary)',
        quiet: 'px-0 text-current underline decoration-1 underline-offset-[0.3em] hover:decoration-transparent',
      },
      size: { default: '', compact: 'min-h-9 px-4', icon: 'size-11 px-0' },
    },
    defaultVariants: { variant: 'primary', size: 'default' },
  },
)

export function Button({ className, variant, size, asChild = false, ...props }: ComponentProps<'button'> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'button'
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size }), className)} {...props} />
}
