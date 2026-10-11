import * as React from "react"
import { cn } from "cn"

// A focused field only darkens its border to the ink; an invalid one turns --color-error. 16px+ on phones (no iOS zoom).
export const fieldClass = "w-full min-w-0 rounded-(--radius-button) border border-(--color-muted) bg-(--color-surface) px-4 text-[1rem] leading-normal text-(--color-text) outline-none transition-[border-color] duration-150 placeholder:text-(--color-muted) focus-visible:border-(--color-text) aria-invalid:border-(--color-error) disabled:cursor-not-allowed disabled:opacity-50 [font-family:var(--font-body)]"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return <input type={type} data-slot="input" className={cn(fieldClass, "h-12", className)} {...props} />
}

export { Input }
