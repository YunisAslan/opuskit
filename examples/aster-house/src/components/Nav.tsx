'use client'
// Menu — Classic bar: logo left, links and the one primary action right, on the page ground with a hairline.
// Sticky; takes the surface colour after 40px of scroll. Phones: logo + menu button opening a full-width sheet.
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import { UnderlineFill } from '@/components/pieces/UnderlineFill'
import { Logo } from '@/components/Logo'
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet'
import { nav, site } from '@/data/site'

export function Nav() {
  const path = usePathname()
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    const on = () => setSolid(scrollY > 40)
    on()
    addEventListener('scroll', on, { passive: true })
    return () => removeEventListener('scroll', on)
  }, [])
  const current = (href: string) => href === path

  return (
    <header className={`sticky top-0 z-40 border-b border-(--color-border) transition-colors duration-200 ${solid ? 'bg-(--color-surface)' : 'bg-(--color-background)'}`}>
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-3 px-4 md:px-10">
        <Link href="/" aria-label="Aster House, home" className="flex min-h-11 items-center"><Logo /></Link>
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          <ul className="type-utility flex items-center gap-6 [font-size:0.875rem]">
            {nav.map((l) => (
              <li key={l.href} className={current(l.href) ? 'ink-current' : undefined} aria-current={current(l.href) ? 'page' : undefined}>
                <UnderlineFill link={Link} href={l.href}>{l.label}</UnderlineFill>
              </li>
            ))}
          </ul>
          <Link href="/book" className="type-utility inline-flex h-11 items-center rounded-(--radius-button) bg-(--color-primary) px-5 [font-size:0.875rem] text-(--color-background) transition-opacity duration-150 hover:opacity-85 focus-visible:underline">Book a viewing</Link>
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <Link href="/book" className="type-utility inline-flex h-11 items-center whitespace-nowrap rounded-(--radius-button) bg-(--color-primary) px-3.5 text-(--color-background)">Book a viewing</Link>
          <Sheet>
            <SheetTrigger className="inline-flex size-11 items-center justify-center rounded-(--radius-button) border border-(--color-border)" aria-label="Open the menu"><Menu className="size-5" strokeWidth={1.25} /></SheetTrigger>
            <SheetContent side="top" className="bg-(--color-background) px-5 pb-10 pt-6">
              <SheetTitle className="type-utility text-(--color-muted)">Menu</SheetTitle>
              <ul className="mt-2 divide-y divide-(--color-border) border-y border-(--color-border)">
                {[{ label: 'Home', href: '/' }, ...nav, { label: 'Book a viewing', href: '/book' }].map((l) => (
                  <li key={l.href}>
                    <SheetClose asChild>
                      <Link href={l.href} aria-current={current(l.href) ? 'page' : undefined} className="type-heading flex min-h-14 items-center aria-[current=page]:text-(--color-accent)">{l.label}</Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>
              <p className="type-utility mt-6 text-(--color-muted)"><a href={site.phoneHref} className="underline underline-offset-4">{site.phone}</a></p>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
