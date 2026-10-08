import * as React from "react"
import { cn } from "cn"
import { field } from "@/components/ui/input"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea data-slot="textarea" className={cn(field, "h-auto min-h-24 resize-none py-3 [field-sizing:content]", className)} {...props} />
}

export { Textarea }
