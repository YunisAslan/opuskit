import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

// shadcn/ui Button, themed to the recipe: sharp corners, recipe type roles, no focus rings — a
// focused button changes its background instead.
const buttonVariants = cva(
  'type-body inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-(--radius-button) border border-transparent transition-[color,background-color,border-color] duration-150 ease-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-(--color-primary) text-(--color-background) hover:bg-(--color-muted) focus-visible:bg-(--color-accent) focus-visible:text-(--color-background)',
        secondary: 'bg-(--color-secondary) text-(--color-text) hover:bg-(--color-border) focus-visible:bg-(--color-primary) focus-visible:text-(--color-background)',
        outline: 'border-(--color-border) text-(--color-text) hover:border-(--color-text) hover:bg-(--color-surface) focus-visible:bg-(--color-surface)',
        ghost: 'text-(--color-text) hover:bg-(--color-surface) focus-visible:bg-(--color-surface)',
        link: 'underline-offset-4 hover:underline focus-visible:underline',
      },
      size: {
        default: 'px-6 py-3',
        sm: 'px-4 py-2 [font-size:0.875rem]',
        lg: 'px-8 py-3.5 [font-size:1.05rem]',
        icon: 'size-11 p-0',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, type, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : type ?? 'button'}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { buttonVariants }