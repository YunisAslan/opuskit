import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

// Bold outline: 2px ink border, 0 radius, hard 4px offset shadow that collapses on press. No focus ring — a focused
// button underlines its label instead.
const buttonVariants = cva(
  "type-utility inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-(--radius-button) border-2 border-(--color-border) whitespace-nowrap uppercase outline-none select-none transition-[transform,box-shadow,background-color,color] duration-150 ease-out shadow-(--shadow-card) focus-visible:underline focus-visible:underline-offset-4 active:translate-x-1 active:translate-y-1 active:shadow-none motion-reduce:active:translate-0 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-(--color-primary) text-(--color-background) hover:bg-(--color-background) hover:text-(--color-text)",
        outline: "bg-(--color-surface) text-(--color-text) hover:bg-(--color-text) hover:text-(--color-background)",
        ghost: "border-transparent shadow-none hover:bg-(--color-surface) active:translate-0",
      },
      size: {
        default: "h-12 px-6 text-base",
        lg: "h-14 px-8 text-lg",
        icon: "size-12",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button"
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
