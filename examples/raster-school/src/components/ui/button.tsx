// shadcn/ui Button, restyled to the recipe: square, the utility role for its text, colours that swap at once on
// hover (the one pink hover of the site lives on the primary button), and a press that answers.
import * as React from 'react'
import { Slot } from 'radix-ui'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

export const buttonVariants = cva(
  'press relative inline-flex min-h-11 shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap rounded-(--radius-button) type-utility [font-size:0.9375rem] transition-[transform,background-color,color,border-color] duration-(--duration-press) disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-(--color-primary) text-(--color-background) hover:bg-(--chap-bg) hover:text-(--chap-text) focus-visible:bg-(--chap-bg) focus-visible:text-(--chap-text)',
        outline:
          'border border-(--color-text) text-(--color-text) hover:bg-(--color-text) hover:text-(--color-background) focus-visible:bg-(--color-text) focus-visible:text-(--color-background)',
        quiet: 'link-line px-0 text-(--color-text)',
      },
      size: {
        md: 'px-5 py-3',
        lg: 'min-h-13 px-7 py-4 [font-size:1rem]',
        bare: '',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'button'
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}
