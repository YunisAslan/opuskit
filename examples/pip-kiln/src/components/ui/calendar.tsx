'use client'
import * as React from 'react'
import { DayPicker } from 'react-day-picker'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

// shadcn/ui Calendar (react-day-picker), restyled: round day pills, the picked day in ink, today ringed.
function Calendar({ className, classNames, showOutsideDays = false, ...props }: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('type-body p-1', className)}
      classNames={{
        root: 'relative',
        months: 'relative flex flex-col gap-4',
        month: 'flex flex-col gap-3',
        nav: 'absolute inset-x-0 top-0 flex items-center justify-between',
        button_previous: 'btn btn-light z-10 size-10 min-h-10 px-0',
        button_next: 'btn btn-light z-10 size-10 min-h-10 px-0',
        month_caption: 'flex h-10 items-center justify-center',
        caption_label: 't-card',
        month_grid: 'w-full border-collapse',
        weekdays: 'flex',
        weekday: 'type-utility flex-1 py-1 text-center text-(--color-muted)',
        week: 'mt-1 flex w-full',
        day: 'flex-1 p-0.5 text-center',
        day_button: 'mx-auto grid size-11 place-items-center rounded-full tabular-nums transition-[background-color] duration-150 hover:bg-(--color-secondary) focus-visible:shadow-[inset_0_0_0_2px_var(--color-text)] disabled:hover:bg-transparent',
        selected: '[&>button]:bg-(--color-text) [&>button]:text-(--color-background) [&>button]:hover:bg-(--color-text)',
        today: '[&>button]:shadow-[inset_0_0_0_1px_var(--color-text)]',
        outside: 'text-(--color-muted)',
        disabled: 'text-(--color-muted)/50 [&>button]:cursor-not-allowed',
        hidden: 'invisible',
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => (orientation === 'left' ? <ChevronLeft className="size-5" /> : <ChevronRight className="size-5" />),
      }}
      {...props}
    />
  )
}

export { Calendar }
