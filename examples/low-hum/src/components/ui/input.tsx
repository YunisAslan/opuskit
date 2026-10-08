import * as React from "react"
import { cn } from "cn"

// Recipe field: muted 1px outline; keyboard focus draws a two-pixel mint edge inside it (focus-field) — no outer ring.
const field =
  "type-body h-12 w-full min-w-0 rounded-(--radius-button) border border-(--color-muted) bg-(--color-background) px-4 text-(--color-text) transition-colors duration-150 ease-out outline-none placeholder:text-(--color-muted)/70 hover:border-(--color-text)/80 focus-field disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-(--color-error)"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return <input type={type} data-slot="input" className={cn(field, className)} {...props} />
}

export { Input, field }
