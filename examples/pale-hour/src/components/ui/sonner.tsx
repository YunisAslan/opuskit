'use client'
// shadcn/ui Sonner, restyled: a flat ink slip at the bottom, utility type, square corners.
import { Toaster as Sonner } from 'sonner'

export function Toaster() {
  return (
    <Sonner
      position="bottom-center"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: 'type-caption flex w-[min(92vw,26rem)] items-start gap-3 rounded-(--radius-card) bg-(--color-text) px-5 py-4 text-(--color-background)',
          title: 'type-utility',
          description: 'type-caption mt-1 opacity-80',
          error: 'bg-(--color-error)',
        },
      }}
    />
  )
}
