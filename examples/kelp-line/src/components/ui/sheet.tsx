'use client'
// shadcn/ui Sheet — a bottom sheet for phones: slides up on --ease-drawer (--duration-sheet), leaves the way it came,
// pads the home bar, scrolls inside without moving the page.
import { Dialog as SheetPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export const Sheet = SheetPrimitive.Root
export const SheetTrigger = SheetPrimitive.Trigger
export const SheetClose = SheetPrimitive.Close

export function SheetContent({ className, children, ...props }: ComponentProps<typeof SheetPrimitive.Content>) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay className="anim-overlay fixed inset-0 z-[110] bg-(--color-background)/80" />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          'anim-sheet fixed inset-x-0 bottom-0 z-[111] max-h-[85dvh] overflow-y-auto overscroll-contain rounded-t-(--radius-card) border-t border-(--color-border) bg-(--color-surface) px-(--gutter) pb-[calc(24px+env(safe-area-inset-bottom,0px))] pt-3 text-(--color-text)',
          className,
        )}
        {...props}
      >
        <span aria-hidden className="mx-auto mb-4 block h-1 w-10 rounded-full bg-(--color-border)" />
        {children}
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  )
}

export const SheetTitle = ({ className, ...props }: ComponentProps<typeof SheetPrimitive.Title>) => <SheetPrimitive.Title className={cn('type-title', className)} {...props} />
export const SheetDescription = ({ className, ...props }: ComponentProps<typeof SheetPrimitive.Description>) => <SheetPrimitive.Description className={cn('type-caption text-(--color-muted)', className)} {...props} />
