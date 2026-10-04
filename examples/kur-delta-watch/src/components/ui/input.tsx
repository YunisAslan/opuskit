import * as React from "react"
import { cn } from "cn"

// A focused field only darkens its border to the text colour; no ring.
export const field =
  "type-body w-full min-w-0 rounded-(--radius-button) border-2 border-(--color-muted) bg-(--color-surface) px-4 text-(--color-text) outline-none transition-colors placeholder:text-(--color-muted)/80 focus-visible:border-(--color-text) aria-invalid:border-(--color-text) aria-invalid:border-dashed disabled:opacity-50"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return <input type={type} data-slot="input" className={cn(field, "h-12", className)} {...props} />
}

export { Input }
