import * as React from "react"
import { cn } from "cn"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-32 w-full rounded-(--radius-button) border border-input bg-transparent px-3.5 py-3 font-(family-name:--font-body) text-base transition-colors outline-none placeholder:text-muted focus-visible:border-ring disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-text aria-invalid:border-2 ",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
