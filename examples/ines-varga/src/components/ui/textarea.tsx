import * as React from "react"
import { cn } from "cn"
import { fieldClass } from "./input"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea data-slot="textarea" className={cn(fieldClass, "field-sizing-content min-h-36 py-3", className)} {...props} />
}

export { Textarea }
