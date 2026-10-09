// shadcn/ui Badge — a quiet tag on the supporting tone, sentence case.
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export function Badge({ className, ...props }: ComponentProps<'span'>) {
  return <span data-slot="badge" className={cn('type-caption inline-flex items-center rounded-(--radius-button) bg-(--color-secondary) px-2 py-0.5 text-(--color-text)', className)} {...props} />
}
