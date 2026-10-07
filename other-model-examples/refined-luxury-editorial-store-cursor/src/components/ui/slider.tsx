'use client'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

// shadcn/ui Slider, themed: a hairline track and a sharp handle.
export const Slider = forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root ref={ref} className={cn('relative flex w-full touch-none select-none items-center', className)} {...props}>
    <SliderPrimitive.Track className="relative h-px w-full grow bg-(--color-border)">
      <SliderPrimitive.Range className="absolute h-px bg-(--color-text)" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block size-4 border border-(--color-text) bg-(--color-background) focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName