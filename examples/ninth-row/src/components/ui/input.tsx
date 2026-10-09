import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "@/lib/utils"

// Restyled: 48px, 16px+ text (no iOS zoom), a muted 1px outline that darkens to the text colour on focus — no rings.
export const fieldClass =
  "type-body h-12 w-full min-w-0 rounded-none border border-(--color-muted) bg-(--color-surface) px-4 text-[max(1rem,var(--type-body-size))] text-(--color-text) transition-[border-color] duration-150 outline-none placeholder:text-(--color-muted) focus-visible:border-(--color-text) disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-(--color-error)"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return <InputPrimitive type={type} data-slot="input" className={cn(fieldClass, className)} {...props} />
}

export { Input }
