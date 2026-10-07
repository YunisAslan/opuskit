'use client'
import * as React from 'react'
import { NavigationMenu as NavigationMenuPrimitive } from 'radix-ui'
import { cn } from '@/lib/utils'

// shadcn/ui Navigation menu: the menu's links, in the utility face with the site's quiet underline.
function NavigationMenu({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Root>) {
  return <NavigationMenuPrimitive.Root className={cn('relative', className)} {...props} />
}
function NavigationMenuList({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return <NavigationMenuPrimitive.List className={cn('flex items-center gap-8', className)} {...props} />
}
const NavigationMenuItem = NavigationMenuPrimitive.Item
function NavigationMenuLink({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return <NavigationMenuPrimitive.Link className={cn('type-utility link-quiet inline-flex min-h-11 items-center data-[active]:decoration-current', className)} {...props} />
}

export { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink }
