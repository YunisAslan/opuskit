'use client'
// shadcn/ui Dialog — stays centred and grows from the centre (scale 0.95 + opacity, --duration-dialog, --ease-out);
// leaves the same way, faster. The overlay is the page ground, deepened.
import { Dialog as DialogPrimitive } from 'radix-ui'
import { X } from 'lucide-react'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogClose = DialogPrimitive.Close

export function DialogContent({ className, children, closeLabel = 'Close', ...props }: ComponentProps<typeof DialogPrimitive.Content> & { closeLabel?: string }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="anim-overlay fixed inset-0 z-[100] bg-(--color-background)/85 backdrop-blur-sm" />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          'anim-dialog fixed left-1/2 top-1/2 z-[101] max-h-[calc(100dvh-24px)] w-[calc(100vw-24px)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto overscroll-contain rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) text-(--color-text)',
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="press absolute right-3 top-3 grid size-11 place-items-center rounded-(--radius-button) text-(--color-text) hover:bg-(--color-secondary) focus-visible:bg-(--color-secondary)" aria-label={closeLabel}>
          <X className="size-5" strokeWidth={1.5} aria-hidden />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

export const DialogTitle = ({ className, ...props }: ComponentProps<typeof DialogPrimitive.Title>) => <DialogPrimitive.Title className={cn('type-heading', className)} {...props} />
export const DialogDescription = ({ className, ...props }: ComponentProps<typeof DialogPrimitive.Description>) => <DialogPrimitive.Description className={cn('type-body text-(--color-muted)', className)} {...props} />
