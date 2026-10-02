'use client'
// The main action on every page: "Start a project" leans toward the cursor and slides the hello form in from the side.
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Magnetic } from '@/components/pieces/Magnetic'
import { ContactForm } from '@/components/ContactForm'
import { brand } from '@/content/site'

export function StartProject({ label = 'Start a project', onDark = false }: { label?: string; onDark?: boolean }) {
  return (
    <Sheet>
      <Magnetic>
        <SheetTrigger asChild>
          <Button className={`type-body h-14 rounded-(--radius-button) px-8 ${onDark ? 'bg-(--color-chapter-2) text-(--color-text) hover:bg-(--color-background)' : 'hover:bg-(--color-muted) focus-visible:bg-(--color-muted)'}`}>{label}</Button>
        </SheetTrigger>
      </Magnetic>
      <SheetContent data-lenis-prevent className="w-full gap-0 overflow-y-auto border-(--color-text) bg-(--color-background) p-0 data-[side=right]:w-full data-[side=right]:sm:max-w-xl">
        <SheetHeader className="p-6 pr-16 md:p-10 md:pr-16">
          <SheetTitle className="type-display [font-size:clamp(2.25rem,5vw,3.5rem)]">Hello? Hello.</SheetTitle>
          <SheetDescription className="type-body mt-2 text-(--color-muted)">Tell us a little about it. We reply within two working days, or write straight to {brand.email}.</SheetDescription>
        </SheetHeader>
        <div className="px-6 pb-10 md:px-10"><ContactForm id="sheet" /></div>
      </SheetContent>
    </Sheet>
  )
}
