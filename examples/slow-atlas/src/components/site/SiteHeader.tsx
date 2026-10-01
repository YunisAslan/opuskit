'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ListIcon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu'
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Logo } from './Logo'

type NavLink = { label: string; href: string }
type Place = { place: string; href: string }

const linkClass = 'type-utility inline-flex h-11 items-center px-3 [font-size:0.9375rem] underline-offset-[6px] decoration-2 hover:underline aria-[current=page]:underline aria-[current=page]:decoration-(--color-accent)'

// Navigation — Classic bar: logo left, links + Subscribe right, hairline bottom border.
// Sticky; gains the surface background after 40px of scroll. Mobile: logo + Menu button opening a full-width sheet.
export function SiteHeader({ links, places, subscribeHref }: { links: NavLink[]; places: Place[]; subscribeHref: string }) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const current = (href: string) => (href === pathname ? 'page' : undefined)

  return (
    <header className={`sticky top-0 z-40 border-b border-(--color-border) transition-colors duration-150 ease-out ${scrolled ? 'bg-(--color-surface)' : 'bg-(--color-background)'}`}>
      <div className="flex h-16 items-center justify-between gap-6 px-6">
        <Link href="/" aria-label="Slow Atlas, home" className="inline-flex h-11 items-center"><Logo /></Link>

        <div className="hidden items-center gap-4 lg:flex">
          <NavigationMenu viewport={false} aria-label="Main">
            <NavigationMenuList className="gap-0">
              {links.slice(0, 2).map((l) => (
                <NavigationMenuItem key={l.href}>
                  <NavigationMenuLink asChild className={`${linkClass} hover:bg-transparent focus:bg-transparent`}>
                    <Link href={l.href} aria-current={current(l.href)}>{l.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger className={`${linkClass} gap-1 data-[state=open]:underline`}>Places</DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-72 border border-(--color-border) bg-(--color-surface) p-0 ring-0">
                    <DropdownMenuLabel className="type-utility px-4 py-3 text-(--color-muted)">One essay for each place</DropdownMenuLabel>
                    <DropdownMenuSeparator className="mx-0" />
                    {places.map((p) => (
                      <DropdownMenuItem key={p.href} asChild className="type-body min-h-11 px-4 [font-size:1rem] focus:bg-(--color-secondary)">
                        <Link href={p.href}>{p.place}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuItem>
              {links.slice(2).map((l) => (
                <NavigationMenuItem key={l.href}>
                  <NavigationMenuLink asChild className={`${linkClass} hover:bg-transparent focus:bg-transparent`}>
                    <Link href={l.href} aria-current={current(l.href)}>{l.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild><Link href={subscribeHref}>Subscribe</Link></Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={8}>Free. One essay every second Sunday.</TooltipContent>
          </Tooltip>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="-mr-3 gap-2 lg:hidden"><ListIcon className="size-5" />Menu</Button>
          </SheetTrigger>
          <SheetContent side="top" className="data-[side=top]:h-dvh gap-0 overflow-y-auto px-6 pt-4 pb-8">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <div className="flex h-12 items-center"><Logo /></div>
            <nav aria-label="Main" className="mt-8 border-t border-(--color-border)">
              {links.map((l) => (
                <SheetClose asChild key={l.href}>
                  <Link href={l.href} aria-current={current(l.href)} className="type-display flex min-h-16 items-center border-b border-(--color-border) [font-size:2.5rem] aria-[current=page]:underline aria-[current=page]:decoration-(--color-accent) aria-[current=page]:underline-offset-8">{l.label}</Link>
                </SheetClose>
              ))}
            </nav>
            <p className="type-utility mt-8 text-(--color-muted)">Places</p>
            <ul className="mt-2">
              {places.map((p) => (
                <li key={p.href}>
                  <SheetClose asChild><Link href={p.href} className="type-body flex min-h-11 items-center">{p.place}</Link></SheetClose>
                </li>
              ))}
            </ul>
            <SheetClose asChild>
              <Button asChild size="lg" className="mt-8 w-full"><Link href={subscribeHref}>Subscribe</Link></Button>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
