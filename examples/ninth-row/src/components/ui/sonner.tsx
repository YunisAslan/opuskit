"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"

// Restyled: sharp, surface ground, hairline, the body face; sits above the home bar.
const Toaster = (props: ToasterProps) => (
  <Sonner
    theme="dark"
    position="bottom-center"
    offset={{ bottom: "max(24px, env(safe-area-inset-bottom, 0px))" }}
    mobileOffset={{ bottom: "max(16px, env(safe-area-inset-bottom, 0px))" }}
    toastOptions={{
      unstyled: true,
      classNames: {
        toast: "type-body flex w-[min(92vw,420px)] items-start gap-3 border border-(--color-border) bg-(--color-surface) p-4 text-(--color-text)",
        title: "type-body",
        description: "type-caption text-(--color-muted)",
      },
    }}
    {...props}
  />
)

export { Toaster }
