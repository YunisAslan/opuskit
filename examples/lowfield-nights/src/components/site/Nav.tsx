'use client'
// Menu "Centered logo": links left, logo centred (with the live status line under it), secondary links and the RSVP
// action right. Tall at the top, a compact bar on the graphite ground after 80px. Phones: menu button left (a sheet),
// logo centre, RSVP right; the status line sits under the logo.
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ChevronDownIcon, MenuIcon } from 'lucide-react'
import { Logo } from './Logo'
import { StatusLine } from './StatusLine'
import { Button } from '@/components/ui/button'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { nav, visit } from '@/content/site'

const link = 'type-utility inline-flex min-h-11 items-center px-3 text-(--color-text) underline-offset-[6px] transition-colors duration-150 hover:underline aria-[current=page]:underline aria-[current=page]:decoration-(--color-accent)'

export function Nav() {
  const path = usePathname()
  const [compact, setCompact] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setCompact(scrollY > 80)
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,padding] duration-300 ${compact ? 'bg-(--color-background)/90 py-2' : 'py-4 md:py-6'}`}>
      <div className="mx-auto grid max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 md:px-10">
        <div className="flex items-center">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open the menu"><MenuIcon className="size-5" /></Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-none border-(--color-border) bg-(--color-background) px-6 pt-20 data-[side=left]:w-full">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav aria-label="Menu" className="flex flex-col">
                {[{ label: 'Home', href: '/' }, ...nav, { label: 'FAQ', href: '/faq' }, { label: 'RSVP', href: '/rsvp' }].map((l) => (
                  <Link key={l.href} href={l.href} aria-current={l.href === path ? 'page' : undefined} onClick={() => setOpen(false)} className="type-heading flex min-h-14 items-center border-b border-(--color-border) aria-[current=page]:text-(--color-accent)">{l.label}</Link>
                ))}
              </nav>
              <StatusLine className="mt-8" />
            </SheetContent>
          </Sheet>
          <NavigationMenu viewport={false} className="hidden md:flex">
            <NavigationMenuList className="-ml-3">
              {nav.map((l) => (
                <NavigationMenuItem key={l.href}>
                  <NavigationMenuLink asChild>
                    <Link href={l.href} aria-current={l.href === path ? 'page' : undefined} className={link}>{l.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Link href="/" aria-label="Lowfield Nights, home" className="flex min-h-11 items-center"><Logo className={`origin-center transition-transform duration-300 ${compact ? 'scale-90' : 'md:scale-110'}`} /></Link>
          <StatusLine className={`transition-opacity duration-300 max-md:[font-size:0.6875rem] ${compact ? 'max-md:hidden' : ''}`} />
        </div>

        <div className="flex items-center justify-end gap-2">
          <div className="hidden md:block">
          <DropdownMenu>
            <DropdownMenuTrigger className={`${link} gap-1`}>Plan your visit <ChevronDownIcon className="size-3.5" aria-hidden /></DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 border border-(--color-border) bg-(--color-background) p-0 ring-0">
              {visit.map((l) => (
                <DropdownMenuItem key={l.href} asChild className="type-utility min-h-11 px-4">
                  <Link href={l.href}>{l.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
          <Button asChild className="gap-1.5 px-4 md:px-6"><Link href="/rsvp">RSVP<span className="hidden lg:inline">for 12–14 June</span></Link></Button>
        </div>
      </div>
    </header>
  )
}
