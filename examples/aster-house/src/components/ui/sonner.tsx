"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"

// Restyled to the recipe: hairline border, page-ground surface, no shadow, recipe fonts.
const Toaster = (props: ToasterProps) => (
  <Sonner
    theme="light"
    className="toaster group"
    toastOptions={{ classNames: { toast: "!rounded-(--radius-card) !border !border-(--color-border) !bg-(--color-surface) !text-(--color-text) !shadow-none font-(family-name:--font-body)" } }}
    {...props}
  />
)

export { Toaster }
