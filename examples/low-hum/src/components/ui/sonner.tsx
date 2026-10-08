"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"
import { MailIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

// Toasts in the house style: surface card, soft 12px corners, Figtree, the site's own words.
const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      icons={{
        success: <MailIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 motion-safe:animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--color-surface)",
          "--normal-text": "var(--color-text)",
          "--normal-border": "var(--color-border)",
          "--border-radius": "var(--radius-card)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "!font-(family-name:--font-body) !gap-3 !p-5",
          title: "type-utility !text-[0.9375rem]",
          description: "type-caption !text-(--color-muted)",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
