import * as React from "react"
import { cn } from "cn"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-24 w-full rounded-(--radius-button) border border-input bg-transparent px-3 py-2.5 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-(--color-text)   disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive   dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 ",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
