"use client"

import { forwardRef, useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, ChevronDownIcon } from "lucide-react"
import { useIsMobile } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Select and date picker that open as a bottom drawer under 640px (recipe: ui.md, Mobile).
const trigger =
  "type-body flex h-12 w-full items-center justify-between gap-2 border border-input bg-background px-3 text-left transition-colors duration-150 hover:border-text focus-visible:border-text aria-invalid:border-destructive data-[empty=true]:text-muted"

type Option = { value: string; label: string }

type ChoiceProps = {
  value?: string
  onChange: (v: string) => void
  options: Option[]
  placeholder: string
  title: string
  id?: string
  "aria-invalid"?: boolean
  "aria-describedby"?: string
}

export const ChoiceField = forwardRef<HTMLButtonElement, ChoiceProps>(function ChoiceField(
  { value, onChange, options, placeholder, title, ...aria },
  ref,
) {
  const mobile = useIsMobile()
  const [open, setOpen] = useState(false)
  const label = options.find((o) => o.value === value)?.label

  if (mobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger ref={ref} className={trigger} data-empty={!label} {...aria}>
          {label ?? placeholder}
          <ChevronDownIcon className="size-4 text-muted" />
        </DrawerTrigger>
        <DrawerContent className="bg-background">
          <DrawerHeader className="text-left">
            <DrawerTitle className="type-heading">{title}</DrawerTitle>
            <DrawerDescription className="sr-only">{placeholder}</DrawerDescription>
          </DrawerHeader>
          <ul className="border-t border-border pb-6" role="listbox" aria-label={title}>
            {options.map((o) => (
              <li key={o.value} className="border-b border-border">
                <DrawerClose asChild>
                  <button
                    type="button"
                    role="option"
                    aria-selected={o.value === value}
                    onClick={() => onChange(o.value)}
                    className={cn("type-body flex min-h-14 w-full items-center px-4 text-left", o.value === value && "bg-secondary font-bold")}
                  >
                    {o.label}
                  </button>
                </DrawerClose>
              </li>
            ))}
          </ul>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger ref={ref} className={cn(trigger, "w-full")} {...aria}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent position="popper" className="bg-background">
        {options.map((o) => (
          <SelectItem key={o.value} value={o.value} className="type-body px-3">
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
})

type DateProps = {
  value?: Date
  onChange: (d: Date | undefined) => void
  allowed: Date[]
  placeholder: string
  title: string
  id?: string
  "aria-invalid"?: boolean
  "aria-describedby"?: string
}

export const DateField = forwardRef<HTMLButtonElement, DateProps>(function DateField(
  { value, onChange, allowed, placeholder, title, ...aria },
  ref,
) {
  const mobile = useIsMobile()
  const [open, setOpen] = useState(false)
  const key = (d: Date) => d.toDateString()
  const allowedKeys = new Set(allowed.map(key))
  const cal = (
    <Calendar
      mode="single"
      selected={value}
      defaultMonth={allowed[0]}
      startMonth={allowed[0]}
      endMonth={allowed[allowed.length - 1]}
      disabled={(d) => !allowedKeys.has(key(d))}
      onSelect={(d) => {
        onChange(d)
        setOpen(false)
      }}
      weekStartsOn={1}
      className="w-full p-3 [--cell-size:--spacing(11)]"
    />
  )
  const face = (
    <>
      {value ? format(value, "EEEE d MMMM yyyy") : placeholder}
      <CalendarIcon className="size-4 text-muted" />
    </>
  )

  if (mobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger ref={ref} className={trigger} data-empty={!value} {...aria}>
          {face}
        </DrawerTrigger>
        <DrawerContent className="bg-background pb-6">
          <DrawerHeader className="text-left">
            <DrawerTitle className="type-heading">{title}</DrawerTitle>
            <DrawerDescription>Play runs 11 to 13 June 2027.</DrawerDescription>
          </DrawerHeader>
          <div className="flex">{cal}</div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger ref={ref} className={trigger} data-empty={!value} {...aria}>
        {face}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto bg-background p-0">
        {cal}
      </PopoverContent>
    </Popover>
  )
})
