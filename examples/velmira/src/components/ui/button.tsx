import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-button border border-transparent font-(family-name:--font-utility) text-[0.9375rem] font-medium whitespace-nowrap transition-[color,background-color,border-color] duration-150 ease-out outline-none select-none disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-muted focus-visible:bg-muted",
        outline: "border-current/40 bg-transparent hover:border-current hover:bg-white/10 focus-visible:border-current focus-visible:bg-white/10",
        glass: "glass text-foreground hover:bg-white/15 focus-visible:bg-white/15",
        secondary: "bg-secondary text-secondary-foreground hover:bg-surface focus-visible:bg-surface",
        ghost: "hover:bg-white/10 focus-visible:bg-white/10",
        destructive: "border-destructive text-destructive hover:bg-destructive/10",
        link: "text-primary underline-offset-4 hover:underline focus-visible:underline",
      },
      size: {
        default: "h-11 gap-2 px-5",
        sm: "h-11 gap-1.5 px-4 text-sm",
        lg: "h-12 gap-2 px-6",
        icon: "size-11",
        "icon-sm": "size-11",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
