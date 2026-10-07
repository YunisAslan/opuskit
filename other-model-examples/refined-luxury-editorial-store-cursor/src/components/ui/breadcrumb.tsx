import { Slot } from '@radix-ui/react-slot'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

// shadcn/ui Breadcrumb, themed to the utility face.
export const Breadcrumb = forwardRef<HTMLElement, React.ComponentProps<'nav'>>(({ ...props }, ref) => (
  <nav ref={ref} aria-label="Breadcrumb" {...props} />
))
Breadcrumb.displayName = 'Breadcrumb'

export const BreadcrumbList = forwardRef<HTMLOListElement, React.ComponentProps<'ol'>>(
  ({ className, ...props }, ref) => (
    <ol ref={ref} className={cn('type-utility flex flex-wrap items-center gap-2 text-(--color-muted)', className)} {...props} />
  ),
)
BreadcrumbList.displayName = 'BreadcrumbList'

export const BreadcrumbItem = forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn('inline-flex items-center gap-2', className)} {...props} />,
)
BreadcrumbItem.displayName = 'BreadcrumbItem'

export const BreadcrumbLink = forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<'a'> & { asChild?: boolean }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : 'a'
  return <Comp ref={ref} className={cn('transition-colors duration-150 hover:text-(--color-text) focus-visible:outline-none focus-visible:underline', className)} {...props} />
})
BreadcrumbLink.displayName = 'BreadcrumbLink'

export const BreadcrumbPage = forwardRef<HTMLSpanElement, React.ComponentProps<'span'>>(
  ({ className, ...props }, ref) => (
    <span ref={ref} role="link" aria-disabled="true" aria-current="page" className={cn('text-(--color-text)', className)} {...props} />
  ),
)
BreadcrumbPage.displayName = 'BreadcrumbPage'

export function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li role="presentation" aria-hidden className={cn('opacity-60', className)} {...props}>
      {children ?? '/'}
    </li>
  )
}