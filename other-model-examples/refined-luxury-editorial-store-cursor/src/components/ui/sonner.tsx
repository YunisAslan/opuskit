'use client'
import { Toaster as Sonner, type ToasterProps } from 'sonner'

// shadcn/ui Sonner, themed to the tokens: a sharp ink note, no rounding.
export function Toaster(props: ToasterProps) {
  return (
    <Sonner
      theme="dark"
      position="bottom-right"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast type-body group-[.toaster]:border group-[.toaster]:border-(--color-border) group-[.toaster]:bg-(--color-surface) group-[.toaster]:text-(--color-text) group-[.toaster]:rounded-(--radius-card)',
          description: 'group-[.toast]:text-(--color-muted)',
          actionButton: 'group-[.toast]:bg-(--color-primary) group-[.toast]:text-(--color-background)',
          cancelButton: 'group-[.toast]:bg-(--color-secondary) group-[.toast]:text-(--color-text)',
        },
      }}
      {...props}
    />
  )
}