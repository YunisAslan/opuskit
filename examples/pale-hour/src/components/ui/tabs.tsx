'use client'
// shadcn/ui Tabs, restyled: a row of utility-type labels on a hairline; the chosen one carries an ink rule.
import { Tabs as TabsPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export const Tabs = TabsPrimitive.Root

export function TabsList({ className, ...props }: ComponentProps<typeof TabsPrimitive.List>) {
  return <TabsPrimitive.List className={cn('flex flex-wrap gap-x-6 border-b border-(--color-border)', className)} {...props} />
}
export function TabsTrigger({ className, ...props }: ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        'type-utility -mb-px min-h-11 cursor-pointer border-b border-transparent text-(--color-muted) transition-colors duration-150 ease-out hover:text-(--color-text) focus-visible:text-(--color-text) data-[state=active]:border-(--color-text) data-[state=active]:text-(--color-text)',
        className,
      )}
      {...props}
    />
  )
}
export function TabsContent({ className, ...props }: ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content className={cn('pt-4 outline-none', className)} {...props} />
}
