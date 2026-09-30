import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

// Bold outline: 2px ink border, hard 4px offset shadow that collapses on press, 0 radius, 44px targets.
const buttonVariants = cva(
  "group/button type-utility inline-flex shrink-0 items-center justify-center rounded-(--radius-button) border-2 border-foreground whitespace-nowrap transition-[transform,box-shadow,background-color,color] duration-150 ease-out outline-none select-none focus-visible:underline focus-visible:underline-offset-4 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-card hover:bg-(--color-muted) active:translate-x-1 active:translate-y-1 active:shadow-none motion-reduce:active:translate-x-0 motion-reduce:active:translate-y-0",
        outline: "bg-surface text-foreground shadow-card hover:bg-secondary active:translate-x-1 active:translate-y-1 active:shadow-none motion-reduce:active:translate-x-0 motion-reduce:active:translate-y-0 aria-expanded:bg-secondary",
        secondary: "bg-secondary text-foreground shadow-card hover:bg-surface active:translate-x-1 active:translate-y-1 active:shadow-none motion-reduce:active:translate-x-0 motion-reduce:active:translate-y-0",
        ghost: "border-transparent hover:bg-secondary aria-expanded:bg-secondary",
        destructive: "bg-surface text-destructive shadow-card hover:bg-secondary",
        link: "border-transparent text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 gap-2 px-6",
        xs: "h-8 gap-1 px-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1.5 px-3",
        lg: "h-14 gap-2 px-8 [font-size:1rem]",
        icon: "size-11",
        "icon-xs": "size-8 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-9",
        "icon-lg": "size-14",
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
