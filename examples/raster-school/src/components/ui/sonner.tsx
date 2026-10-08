'use client'
// shadcn/ui Sonner — the site's only toasts. Square, white on the blue, clear of the home bar.
import { Toaster as Sonner, type ToasterProps } from 'sonner'

export function Toaster(props: ToasterProps) {
  return (
    <Sonner
      position="bottom-center"
      offset={{ bottom: 'calc(16px + env(safe-area-inset-bottom, 0px))' }}
      mobileOffset={{ bottom: 'calc(16px + env(safe-area-inset-bottom, 0px))' }}
      toastOptions={{ classNames: { toast: 'type-body !gap-3 !px-5 !py-4', description: '!text-(--inv-text) !opacity-80' } }}
      {...props}
    />
  )
}
