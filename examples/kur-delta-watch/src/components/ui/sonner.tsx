"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"

// Toasts as hard-edged modules: surface ground, 2px ink border, offset shadow.
const Toaster = (props: ToasterProps) => (
  <Sonner
    theme="light"
    position="bottom-left"
    toastOptions={{
      unstyled: true,
      classNames: {
        toast: "type-body flex w-full items-start gap-3 border-2 border-(--color-text) bg-(--color-surface) p-4 text-(--color-text) shadow-(--shadow-card)",
        title: "type-heading [font-size:1.15rem]",
        description: "type-body mt-1 text-(--color-muted)",
      },
    }}
    {...props}
  />
)

export { Toaster }
