'use client'
// shadcn/ui Dialog (Radix), restyled. Used full screen by the lightbox: focus trap, Esc, scroll lock and focus return
// come from Radix.
import { Dialog as DialogPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export const Dialog = DialogPrimitive.Root
export const DialogClose = DialogPrimitive.Close
export const DialogTitle = DialogPrimitive.Title
export const DialogDescription = DialogPrimitive.Description

export function DialogContent({ className, children, ...props }: ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-[110] bg-(--color-text)/95 data-[state=open]:animate-[fade-in_250ms_var(--ease-page)] data-[state=closed]:animate-[fade-out_200ms_var(--ease-page)]" />
      <DialogPrimitive.Content className={cn('fixed inset-0 z-[120] outline-none data-[state=open]:animate-[fade-in_250ms_var(--ease-page)] data-[state=closed]:animate-[fade-out_200ms_var(--ease-page)]', className)} {...props}>
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}
