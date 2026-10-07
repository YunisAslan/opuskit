'use client'
import { Toaster as Sonner, type ToasterProps } from 'sonner'

// shadcn/ui Sonner: quiet confirmations on the surface tone, sharp, hairline border.
function Toaster(props: ToasterProps) {
  return (
    <Sonner
      position="bottom-center"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: 'type-body flex w-[min(92vw,420px)] items-center justify-between gap-4 border border-(--color-border) bg-(--color-surface) px-5 py-4 text-(--color-text)',
          title: 'type-body',
          description: 'type-caption text-(--color-muted)',
          actionButton: 'type-caption link-quiet shrink-0 text-(--color-text) underline! decoration-current!',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
