"use client"

import * as React from "react"
import { cn } from "cn"
import { Tabs as TabsPrimitive } from "radix-ui"

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn("flex flex-col", className)} {...props} />
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn("inline-flex w-fit items-center gap-1 rounded-(--radius-card) border border-(--color-border) p-1", className)}
      {...props}
    />
  )
}

// Active side is a filled cream pill; hover warms the background; keyboard focus fills mint — never a ring.
function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "type-utility inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-(--radius-button) px-5 [font-size:0.9375rem] whitespace-nowrap text-(--color-muted) transition-colors duration-150 ease-out outline-none hover:bg-(--color-secondary) hover:text-(--color-text) data-[state=active]:bg-(--color-text) data-[state=active]:text-(--color-background) focus-fill",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  // the panel itself takes focus (it holds no controls): a mint frame drawn just outside the content, no layout shift
  return (
    <TabsPrimitive.Content data-slot="tabs-content"
      className={cn("relative outline-none after:pointer-events-none after:absolute after:-inset-3 after:rounded-(--radius-card) after:border-2 after:border-(--color-accent) after:opacity-0 focus-visible:after:opacity-100 md:after:-inset-5", className)} {...props} />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
