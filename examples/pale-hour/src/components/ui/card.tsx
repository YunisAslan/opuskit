// shadcn/ui Card, restyled: the surface tone, a hairline top rule instead of a shadow, square corners.
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export function Card({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="card" className={cn('flex flex-col gap-3 rounded-(--radius-card) border-t border-(--color-text) bg-(--color-surface) p-6 shadow-(--shadow-card)', className)} {...props} />
}
export function CardTitle({ className, ...props }: ComponentProps<'h3'>) {
  return <h3 className={cn('type-heading [font-size:1.5rem]', className)} {...props} />
}
export function CardContent({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('type-body', className)} {...props} />
}
