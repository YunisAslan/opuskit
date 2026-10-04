import * as React from "react"
import { cn } from "cn"
import { field } from "@/components/ui/input"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea data-slot="textarea" className={cn(field, "field-sizing-content min-h-32 py-3", className)} {...props} />
}

export { Textarea }
