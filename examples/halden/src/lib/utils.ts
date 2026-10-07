import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// The recipe's type roles (type-display / heading / title / body / utility) set the size, so a component default
// like shadcn's text-sm must give way to them instead of quietly winning in the stylesheet order.
const twMerge = extendTailwindMerge({
  extend: { classGroups: { "font-size": [{ type: ["display", "heading", "title", "body", "utility"] }] } },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
