"use client"

import * as React from "react"
import { cn } from "cn"
import { DayPicker, getDefaultClassNames, type DayButton } from "react-day-picker"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

// Recipe calendar: 44px day cells, Figtree, cream for the chosen day, warm secondary on hover, mint on keyboard focus.
function Calendar({ className, classNames, showOutsideDays = false, ...props }: React.ComponentProps<typeof DayPicker>) {
  const d = getDefaultClassNames()
  const nav = "inline-flex size-11 cursor-pointer items-center justify-center rounded-(--radius-button) text-(--color-text) transition-colors duration-150 outline-none hover:bg-(--color-secondary) focus-fill aria-disabled:pointer-events-none aria-disabled:opacity-30"
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-1 [--cell:2.75rem]", className)}
      classNames={{
        root: cn("w-fit", d.root),
        months: cn("relative flex flex-col", d.months),
        month: cn("flex w-full flex-col gap-3", d.month),
        nav: cn("absolute inset-x-0 top-0 flex w-full items-center justify-between", d.nav),
        button_previous: cn(nav, d.button_previous),
        button_next: cn(nav, d.button_next),
        month_caption: cn("flex h-11 w-full items-center justify-center px-12", d.month_caption),
        caption_label: cn("type-heading [font-size:1.25rem]", d.caption_label),
        month_grid: cn("w-full border-collapse", d.month_grid),
        weekdays: cn("flex", d.weekdays),
        weekday: cn("type-caption flex w-(--cell) justify-center text-(--color-muted) select-none", d.weekday),
        week: cn("flex w-full", d.week),
        day: cn("relative size-(--cell) p-0 text-center select-none", d.day),
        today: cn("[&>button]:underline [&>button]:decoration-(--color-accent) [&>button]:underline-offset-4", d.today),
        outside: cn("text-(--color-muted)/50", d.outside),
        disabled: cn("text-(--color-muted)/40", d.disabled),
        hidden: cn("invisible", d.hidden),
        ...classNames,
      }}
      components={{
        Chevron: ({ className, orientation, ...p }) =>
          orientation === "left" ? <ChevronLeftIcon className={cn("size-5", className)} {...p} /> : <ChevronRightIcon className={cn("size-5", className)} {...p} />,
        DayButton: CalendarDayButton,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({ className, day, modifiers, ...props }: React.ComponentProps<typeof DayButton>) {
  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])
  return (
    <button
      ref={ref}
      data-day={day.date.toLocaleDateString()}
      data-selected={modifiers.selected || undefined}
      className={cn(
        "type-body inline-flex size-(--cell) cursor-pointer items-center justify-center rounded-(--radius-button) tabular-nums text-(--color-text) transition-colors duration-150 outline-none hover:bg-(--color-secondary) disabled:cursor-default disabled:text-(--color-muted)/40 disabled:hover:bg-transparent data-selected:bg-(--color-text) data-selected:text-(--color-background) focus-fill",
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
