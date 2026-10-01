"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"

// Restyled to the recipe: sharp, 1px border, the site's fonts, no icons (the words say it).
const Toaster = ({ ...props }: ToasterProps) => (
  <Sonner
    theme="light"
    className="toaster group"
    style={
      {
        "--normal-bg": "var(--color-text)",
        "--normal-text": "var(--color-background)",
        "--normal-border": "var(--color-text)",
        "--border-radius": "0px",
      } as React.CSSProperties
    }
    toastOptions={{ classNames: { toast: "type-body !shadow-none" } }}
    {...props}
  />
)

export { Toaster }
