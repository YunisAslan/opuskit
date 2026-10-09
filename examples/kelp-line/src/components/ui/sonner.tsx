'use client'
// shadcn/ui Sonner — toasts on the surface, in the site's faces, clear of the home bar.
import { Toaster as Sonner } from 'sonner'

export function Toaster() {
  return (
    <Sonner
      position="bottom-center"
      offset={{ bottom: 'calc(16px + env(safe-area-inset-bottom, 0px))' }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: 'type-body flex w-[min(92vw,420px)] items-center gap-3 rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) px-5 py-4 text-(--color-text)',
          description: 'type-caption text-(--color-muted)',
        },
      }}
    />
  )
}
