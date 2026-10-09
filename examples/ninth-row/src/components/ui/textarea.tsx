import * as React from "react"
import { cn } from "@/lib/utils"
import { fieldClass } from "./input"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea data-slot="textarea" className={cn(fieldClass, "field-sizing-content h-auto min-h-28 py-3", className)} {...props} />
}

export { Textarea }
