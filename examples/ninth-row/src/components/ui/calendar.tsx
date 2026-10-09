"use client"

import * as React from "react"
import { DayPicker, getDefaultClassNames, type DayButton } from "react-day-picker"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"

// Restyled to the recipe: utility face, sharp 44px cells, today marked by the accent dot, the chosen night in bone.
function Calendar({ className, classNames, showOutsideDays = false, ...props }: React.ComponentProps<typeof DayPicker>) {
  const d = getDefaultClassNames()
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 [--cell-size:44px]", className)}
      classNames={{
        root: cn("w-fit", d.root),
        months: cn("relative flex flex-col gap-4", d.months),
        month: cn("flex w-full flex-col gap-3", d.month),
        nav: cn("absolute inset-x-0 top-0 flex w-full items-center justify-between", d.nav),
        button_previous: cn("press grid size-(--cell-size) place-items-center text-(--color-text) hover:bg-(--color-secondary) focus-visible:bg-(--color-secondary) aria-disabled:opacity-30", d.button_previous),
        button_next: cn("press grid size-(--cell-size) place-items-center text-(--color-text) hover:bg-(--color-secondary) focus-visible:bg-(--color-secondary) aria-disabled:opacity-30", d.button_next),
        month_caption: cn("flex h-(--cell-size) w-full items-center justify-center", d.month_caption),
        caption_label: cn("type-utility text-base text-(--color-text)", d.caption_label),
        month_grid: cn("w-full border-collapse", d.month_grid),
        weekdays: cn("flex", d.weekdays),
        weekday: cn("type-caption w-(--cell-size) text-(--color-muted) select-none", d.weekday),
        week: cn("flex w-full", d.week),
        day: cn("relative size-(--cell-size) p-0 text-center select-none", d.day),
        today: cn("today", d.today),
        outside: cn("text-(--color-muted)", d.outside),
        disabled: cn("opacity-30", d.disabled),
        hidden: cn("invisible", d.hidden),
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className }) => orientation === "left" ? <ChevronLeftIcon className={cn("size-4", className)} /> : <ChevronRightIcon className={cn("size-4", className)} />,
        DayButton: CalendarDayButton,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({ className, day, modifiers, ...props }: React.ComponentProps<typeof DayButton>) {
  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => { if (modifiers.focused) ref.current?.focus() }, [modifiers.focused])
  return (
    <button
      ref={ref}
      data-day={day.date.toLocaleDateString()}
      data-selected={modifiers.selected || undefined}
      className={cn(
        "press type-utility relative grid size-(--cell-size) place-items-center text-base tabular-nums text-(--color-text) transition-[background-color,color] duration-150 hover:bg-(--color-secondary) focus-visible:bg-(--color-secondary) disabled:cursor-not-allowed data-selected:bg-(--color-text) data-selected:text-(--color-background)",
        modifiers.today && "after:absolute after:bottom-1.5 after:left-1/2 after:size-1 after:-translate-x-1/2 after:bg-(--color-accent)",
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
