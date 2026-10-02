"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"

// Restyled to the recipe: surface card, ink text, 24px radius, no theme switching (the site has one ground).
const Toaster = (props: ToasterProps) => (
  <Sonner
    theme="light"
    position="bottom-center"
    className="toaster group"
    style={
      {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
        "--border-radius": "var(--radius-button)",
      } as React.CSSProperties
    }
    toastOptions={{ classNames: { toast: "cn-toast type-body" } }}
    {...props}
  />
)

export { Toaster }
