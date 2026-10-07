'use client'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

// shadcn/ui Sheet (Radix Dialog), themed: a sharp panel that slides in from a side — the mobile menu,
// the bag, and any select or menu on small screens.
export const Sheet = DialogPrimitive.Root
export const SheetTrigger = DialogPrimitive.Trigger
export const SheetClose = DialogPrimitive.Close
export const SheetPortal = DialogPrimitive.Portal

export const SheetOverlay = forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay ref={ref} data-slot="sheet-overlay" className={cn('fixed inset-0 z-50 bg-black/55', className)} {...props} />
))
SheetOverlay.displayName = 'SheetOverlay'

export const SheetContent = forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & { side?: 'right' | 'left' | 'top' | 'bottom' }
>(({ className, children, side = 'right', ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <DialogPrimitive.Content
      ref={ref}
      data-slot="sheet-content"
      data-side={side}
      className={cn(
        'fixed z-50 flex flex-col gap-6 overflow-y-auto border-(--color-border) bg-(--color-surface) p-6 text-(--color-text)',
        side === 'right' && 'inset-y-0 right-0 h-full w-full max-w-md border-l',
        side === 'left' && 'inset-y-0 left-0 h-full w-full max-w-md border-r',
        side === 'bottom' && 'inset-x-0 bottom-0 max-h-[85svh] w-full border-t',
        side === 'top' && 'inset-x-0 top-0 w-full border-b',
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="type-body absolute right-5 top-5 rounded-(--radius-button) text-(--color-muted) transition-colors duration-150 hover:text-(--color-text) focus-visible:outline-none focus-visible:underline">
        <X className="size-5" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = 'SheetContent'

export function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col gap-1.5', className)} {...props} />
}

export const SheetTitle = forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title ref={ref} className={cn('type-heading [font-size:1.4rem]', className)} {...props} />
))
SheetTitle.displayName = 'SheetTitle'

export const SheetDescription = forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn('type-body text-(--color-muted)', className)} {...props} />
))
SheetDescription.displayName = 'SheetDescription'