import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Restyled to the recipe: the site's one button family (.btn in globals.css) — utility face, sharp, 48px, the press.
const buttonVariants = cva(
  "btn disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "btn-solid",
        outline: "btn-line",
        ghost: "border-transparent bg-transparent px-3 text-(--color-text) hover:bg-(--color-secondary) focus-visible:bg-(--color-secondary)",
      },
      size: { default: "", icon: "size-12 px-0" },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

function Button({ className, variant = "default", size = "default", ...props }: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return <ButtonPrimitive data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
