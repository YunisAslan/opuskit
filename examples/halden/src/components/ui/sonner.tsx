"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"

// Toasts in the recipe: the surface, a hairline, sharp corners, body type. The site is dark only.
const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--color-surface)",
          "--normal-text": "var(--color-text)",
          "--normal-border": "var(--color-border)",
          "--border-radius": "0px",
          fontFamily: "var(--font-body)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "!font-(family-name:--font-body) !rounded-none !p-5",
          title: "type-body !font-medium",
          description: "type-utility !text-(--color-muted)",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
