'use client'
import type { ReactNode } from 'react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'
import { CartProvider } from '@/components/cart/cart-context'

// One client boundary for the whole site: the bag, tooltips and toasts.
export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <TooltipProvider delayDuration={200}>
        {children}
        <Toaster />
      </TooltipProvider>
    </CartProvider>
  )
}