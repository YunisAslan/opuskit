'use client'
import * as React from 'react'
import { Dialog as DialogPrimitive } from 'radix-ui'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

function Dialog(props: React.ComponentProps<typeof DialogPrimitive.Root>) { return <DialogPrimitive.Root data-slot="dialog" {...props} /> }
function DialogTrigger(props: React.ComponentProps<typeof DialogPrimitive.Trigger>) { return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} /> }
function DialogClose(props: React.ComponentProps<typeof DialogPrimitive.Close>) { return <DialogPrimitive.Close data-slot="dialog-close" {...props} /> }

function DialogOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return <DialogPrimitive.Overlay data-slot="dialog-overlay" className={cn('overlay fixed inset-0 z-50 bg-(--color-text)/70', className)} {...props} />
}

// Stays centred and scales from the centre (--duration-dialog).
function DialogContent({ className, children, closeLabel = 'Close', ...props }: React.ComponentProps<typeof DialogPrimitive.Content> & { closeLabel?: string }) {
  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <DialogPrimitive.Content data-slot="dialog-content"
        className={cn('dialog-pop fixed left-1/2 top-1/2 z-50 w-[min(100%-2*var(--gutter),72rem)] -translate-x-1/2 -translate-y-1/2 rounded-(--radius-card) bg-(--color-background) p-4 text-(--color-text) outline-none md:p-6', className)} {...props}>
        {children}
        <DialogPrimitive.Close className="btn btn-light absolute right-3 top-3 z-10 size-12 min-h-12 px-0 md:right-4 md:top-4" aria-label={closeLabel}><X className="size-5" /></DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}
function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return <DialogPrimitive.Title data-slot="dialog-title" className={cn('t-card', className)} {...props} />
}
function DialogDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return <DialogPrimitive.Description data-slot="dialog-description" className={cn('type-caption text-(--color-muted)', className)} {...props} />
}

export { Dialog, DialogTrigger, DialogClose, DialogContent, DialogTitle, DialogDescription, DialogOverlay }
