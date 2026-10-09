'use client'
// shadcn/ui Checkbox — a 20px box inside a 44px hit area; checked fills with the ink, the tick draws in.
import { Checkbox as CheckboxPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export function Checkbox({ className, ...props }: ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'press peer relative grid size-5 shrink-0 place-items-center rounded-[5px] border border-(--color-muted) bg-(--color-background) before:absolute before:-inset-3 before:content-[""] hover:border-(--color-text) focus-visible:border-(--color-text) focus-visible:bg-(--color-surface) data-[state=checked]:border-(--color-text) data-[state=checked]:bg-(--color-text) aria-invalid:border-(--color-error)',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="text-(--color-background)">
        <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path className="tick-draw" d="M3.5 8.5l3 3 6-7" /></svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}
