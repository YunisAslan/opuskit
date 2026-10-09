"use client"

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cn } from "@/lib/utils"

// Restyled: plain words on a hairline; the active one in bone with a 1px rule under it (instant — the tabs are used
// often, so they answer at once).
function Tabs({ className, ...props }: TabsPrimitive.Root.Props) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn("flex flex-col gap-6", className)} {...props} />
}

function TabsList({ className, ...props }: TabsPrimitive.List.Props) {
  return <TabsPrimitive.List data-slot="tabs-list" className={cn("flex gap-6 border-b border-(--color-border)", className)} {...props} />
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "press type-utility -mb-px min-h-11 border-b border-transparent text-base text-(--color-muted) transition-[color,border-color] duration-150 hover:text-(--color-text) focus-visible:text-(--color-text) focus-visible:border-(--color-muted) data-active:border-(--color-text) data-active:text-(--color-text)",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return <TabsPrimitive.Panel data-slot="tabs-content" className={cn("outline-none", className)} {...props} />
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
