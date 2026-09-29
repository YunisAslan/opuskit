import * as React from "react"
import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-32 w-full rounded-none border border-input bg-transparent px-3 py-3 text-base transition-colors outline-none placeholder:text-muted focus-visible:border-ring disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
