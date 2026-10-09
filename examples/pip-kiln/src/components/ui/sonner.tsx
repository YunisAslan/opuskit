'use client'
import { Toaster as Sonner, type ToasterProps } from 'sonner'

// shadcn/ui Sonner: ink toasts with a yellow pill action (styled in globals.css), clear of the home bar.
function Toaster(props: ToasterProps) {
  return <Sonner position="bottom-center" offset={{ bottom: 'calc(24px + env(safe-area-inset-bottom, 0px))' }} mobileOffset={{ bottom: 'calc(88px + env(safe-area-inset-bottom, 0px))' }} {...props} />
}

export { Toaster }
