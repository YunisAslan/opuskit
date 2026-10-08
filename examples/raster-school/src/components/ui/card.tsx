// shadcn/ui Card, restyled: square, on the surface, a 1px hairline, no shadow.
import * as React from 'react'
import { cn } from '@/lib/utils'

export function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card" className={cn('flex flex-col rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) text-(--color-text) shadow-(--shadow-card)', className)} {...props} />
}
export function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-header" className={cn('flex flex-col gap-2', className)} {...props} />
}
export function CardTitle({ className, ...props }: React.ComponentProps<'h3'>) {
  return <h3 data-slot="card-title" className={cn('type-heading', className)} {...props} />
}
export function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-content" className={className} {...props} />
}
export function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-footer" className={cn('flex flex-col gap-3', className)} {...props} />
}
