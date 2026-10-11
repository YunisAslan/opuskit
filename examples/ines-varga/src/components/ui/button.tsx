import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

// Hairline shape: outlined by default, filled only for the one primary action. Press = this look's own: a 2px offset,
// no curve (recipe → Seasoning); reduced motion keeps the colour change only.
const buttonVariants = cva(
  "type-utility group/button inline-flex min-h-11 shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap rounded-(--radius-button) border px-5 outline-none transition-[background-color,color,border-color,transform] duration-(--duration-press) [transition-timing-function:steps(2)] active:translate-x-[2px] active:translate-y-[2px] motion-reduce:active:translate-0 disabled:opacity-50 focus-visible:underline focus-visible:underline-offset-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "border-(--color-primary) bg-(--color-primary) text-(--color-on-primary) hover:bg-(--color-background) hover:text-(--color-text)",
        outline: "border-(--color-text) bg-transparent text-(--color-text) hover:bg-(--color-text) hover:text-(--color-background)",
        ghost: "border-transparent bg-transparent text-(--color-text) hover:border-(--color-text)",
      },
      size: {
        default: "",
        lg: "min-h-14 px-7",
        icon: "size-11 px-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

function Button({ className, variant = "default", size = "default", asChild = false, ...props }:
  React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button"
  return <Comp data-slot="button" data-variant={variant} data-size={size} className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
