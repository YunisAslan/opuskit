'use client'
// Menu — Classic bar: logo left, links and the primary action right, on the page ground with a hairline bottom
// border; sticky, gains the surface ground after 40px of scroll. Phones: logo + menu button opening a full-screen sheet.
import { ChevronDownIcon, MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu'
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { categories } from '@/content/magazine'
import { Logo } from './Logo'

const LINKS = [
  { href: '/articles', label: 'Essays' },
  { href: '/about', label: 'About' },
  { href: '/newsletter', label: 'Newsletter' },
]
const link = 'type-utility inline-flex h-11 items-center px-3 [font-size:0.9375rem] underline-offset-[6px] decoration-2 transition-colors duration-150 hover:underline focus-visible:underline aria-[current=page]:underline aria-[current=page]:decoration-(--color-accent)'

export function SiteHeader() {
  const path = usePathname()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const current = (href: string) => (path === href || path.startsWith(`${href}/`) ? 'page' : undefined)
  const onRoutes = path.startsWith('/routes/')

  return (
    <header className={`sticky top-0 z-40 border-b border-(--color-border) transition-colors duration-200 ${scrolled ? 'bg-(--color-surface)' : 'bg-(--color-background)'}`}>
      <div className="flex h-[4.5rem] items-center justify-between gap-6 px-6">
        <Link href="/" aria-label="Slow Atlas, home" className="inline-flex h-11 items-center"><Logo /></Link>

        <div className="hidden items-center gap-4 md:flex">
          <NavigationMenu viewport={false} aria-label="Main">
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={link}><Link href="/articles" aria-current={current('/articles')}>Essays</Link></NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger className={`${link} gap-1`} aria-current={onRoutes ? 'page' : undefined}>
                    Routes <ChevronDownIcon aria-hidden className="size-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="min-w-52 rounded-none border border-(--color-border) bg-(--color-surface) p-0">
                    {categories.map((c) => (
                      <DropdownMenuItem key={c.slug} asChild className="type-utility h-11 rounded-none px-4 [font-size:0.9375rem]">
                        <Link href={`/routes/${c.slug}`}>{c.name}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuItem>
              {LINKS.slice(1).map((l) => (
                <NavigationMenuItem key={l.href}>
                  <NavigationMenuLink asChild className={link}><Link href={l.href} aria-current={current(l.href)}>{l.label}</Link></NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild><Link href="/newsletter">Subscribe</Link></Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={8} className="type-utility rounded-none">Free, every second Sunday</TooltipContent>
          </Tooltip>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu"><MenuIcon className="size-6" /></Button>
          </SheetTrigger>
          <SheetContent side="top" aria-describedby={undefined}
            className="h-dvh data-[side=top]:h-dvh max-h-none gap-0 border-0 bg-(--color-background) p-0 text-(--color-text) [&>[data-slot=sheet-close]]:top-3.5 [&>[data-slot=sheet-close]]:right-4">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <div className="flex h-[4.5rem] items-center border-b border-(--color-border) px-6"><Logo /></div>
            <nav aria-label="Main" className="flex flex-1 flex-col overflow-y-auto px-6 py-8">
              {[LINKS[0], ...categories.map((c) => ({ href: `/routes/${c.slug}`, label: c.name, sub: true })), ...LINKS.slice(1)].map((l) => (
                <SheetClose asChild key={l.href}>
                  <Link href={l.href} aria-current={current(l.href)}
                    className={`flex min-h-11 items-center border-b border-(--color-border) aria-[current=page]:underline aria-[current=page]:decoration-(--color-accent) underline-offset-8 ${'sub' in l ? 'type-utility py-2 pl-6 [font-size:1.125rem]' : 'type-heading py-3 [font-size:2.25rem]'}`}>
                    {l.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>
            <div className="border-t border-(--color-border) p-6">
              <SheetClose asChild>
                <Button asChild size="lg" className="w-full"><Link href="/newsletter">Subscribe</Link></Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
