import * as React from "react"
import { cn } from "@/lib/utils"

// Restyled: a small label with the accent's live dot — the accent is a signal, never a fill.
function Badge({ className, children, ...props }: React.ComponentProps<"span">) {
  return (
    <span data-slot="badge" className={cn("type-utility inline-flex items-center gap-2 text-(--color-text)", className)} {...props}>
      <span aria-hidden className="size-1.5 shrink-0 bg-(--color-accent)" />
      {children}
    </span>
  )
}

export { Badge }
