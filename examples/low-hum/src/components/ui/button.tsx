import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

// Restyled to the recipe: utility type role, 8px soft shape, 44px targets, no rings — focus and hover change the fill.
const buttonVariants = cva(
  "group/button type-utility focus-fill inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-(--radius-button) border border-transparent whitespace-nowrap transition-[background-color,color,border-color,transform] duration-150 ease-out outline-none select-none motion-safe:active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-(--color-primary) text-(--color-background) hover:bg-(--color-muted)",
        outline: "border-(--color-text) bg-transparent text-(--color-text) hover:bg-(--color-text) hover:text-(--color-background)",
        secondary: "bg-(--color-secondary) text-(--color-text) hover:bg-(--color-border)",
        ghost: "bg-transparent text-(--color-text) hover:bg-(--color-secondary)",
        link: "link-hum px-0 text-(--color-text) focus-visible:!bg-transparent focus-visible:!text-(--color-text)",
        destructive: "border-(--color-error) text-(--color-error) hover:bg-(--color-secondary)",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-10 px-4",
        lg: "h-13 px-7 [font-size:0.9375rem]",
        icon: "size-11",
        "icon-sm": "size-10",
        "icon-lg": "size-12",
        "icon-xs": "size-8",
        xs: "h-8 px-3",
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
