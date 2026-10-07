'use client'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { ChevronDown } from 'lucide-react'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

// shadcn/ui NavigationMenu, themed to the Classic bar: flat links, a hairline flyout, no chrome.
export const NavigationMenu = forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root ref={ref} className={cn('relative z-40 flex max-w-max flex-1 items-center', className)} {...props}>
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
))
NavigationMenu.displayName = 'NavigationMenu'

export const NavigationMenuList = forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List ref={ref} className={cn('group flex flex-1 list-none items-center gap-8', className)} {...props} />
))
NavigationMenuList.displayName = 'NavigationMenuList'

export const NavigationMenuItem = NavigationMenuPrimitive.Item

export const navigationMenuTriggerStyle = cn(
  'type-utility inline-flex h-9 w-max items-center gap-1.5 rounded-(--radius-button) bg-transparent text-(--color-text) transition-colors duration-150 hover:text-(--color-muted) focus-visible:outline-none focus-visible:underline data-[state=open]:text-(--color-muted)',
)

export const NavigationMenuTrigger = forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger ref={ref} className={cn(navigationMenuTriggerStyle, className)} {...props}>
    {children}
    <ChevronDown className="size-3 transition-transform duration-200 group-data-[state=open]:rotate-180" aria-hidden />
  </NavigationMenuPrimitive.Trigger>
))
NavigationMenuTrigger.displayName = 'NavigationMenuTrigger'

export const NavigationMenuContent = forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content ref={ref} className={cn('left-0 top-0 w-full md:absolute md:w-auto', className)} {...props} />
))
NavigationMenuContent.displayName = 'NavigationMenuContent'

export const NavigationMenuLink = NavigationMenuPrimitive.Link

export const NavigationMenuViewport = forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className="absolute left-0 top-full flex w-full justify-start">
    <NavigationMenuPrimitive.Viewport
      ref={ref}
      className={cn(
        'relative mt-3 h-[var(--radix-navigation-menu-viewport-height)] w-full origin-top overflow-hidden border border-(--color-border) bg-(--color-surface) text-(--color-text) md:w-[var(--radix-navigation-menu-viewport-width)]',
        className,
      )}
      {...props}
    />
  </div>
))
NavigationMenuViewport.displayName = 'NavigationMenuViewport'