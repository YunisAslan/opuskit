// shadcn/ui Badge, restyled: a small hairline box in the utility face — a label, never a button.
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export function Badge({ className, ...props }: ComponentProps<'span'>) {
  return <span className={cn('type-caption inline-flex items-center rounded-(--radius-button) border border-(--color-border) px-2 py-0.5 text-(--color-muted)', className)} {...props} />
}
