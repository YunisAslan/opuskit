import * as React from 'react'
import { cn } from '@/lib/utils'

// shadcn/ui Breadcrumb: captions joined by a slash, the current page plain.
function Breadcrumb(props: React.ComponentProps<'nav'>) {
  return <nav aria-label="Breadcrumb" {...props} />
}
function BreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>) {
  return <ol className={cn('type-caption flex flex-wrap items-center gap-2 text-(--color-muted)', className)} {...props} />
}
function BreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>) {
  return <li className={cn('inline-flex items-center', className)} {...props} />
}
function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>) {
  return <span aria-current="page" className={cn('text-(--color-text)', className)} {...props} />
}
function BreadcrumbSeparator({ className, ...props }: React.ComponentProps<'li'>) {
  return <li role="presentation" aria-hidden className={cn(className)} {...props}>/</li>
}

export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbPage, BreadcrumbSeparator }
