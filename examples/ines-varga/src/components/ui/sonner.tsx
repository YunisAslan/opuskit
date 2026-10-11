"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"

// Toasts in the site's own hand: surface paper, ink text, the hairline, the body face.
const Toaster = (props: ToasterProps) => (
  <Sonner theme="light" position="bottom-center" offset={{ bottom: "max(16px, env(safe-area-inset-bottom))" }}
    style={{ "--normal-bg": "var(--color-surface)", "--normal-text": "var(--color-text)", "--normal-border": "var(--color-text)", "--border-radius": "var(--radius-card)" } as React.CSSProperties}
    toastOptions={{ classNames: { toast: "type-caption !text-[0.9375rem] !shadow-none [font-family:var(--font-body)]" } }}
    {...props} />
)

export { Toaster }
