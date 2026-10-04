"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"

// Dark, hairline toasts in the recipe's tokens (no theme switching: the site is one black box).
const Toaster = (props: ToasterProps) => (
  <Sonner
    theme="dark"
    className="toaster group"
    style={
      {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
        "--border-radius": "var(--radius)",
        fontFamily: "var(--font-body)",
      } as React.CSSProperties
    }
    {...props}
  />
)

export { Toaster }
