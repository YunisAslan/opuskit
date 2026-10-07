'use client'
// Menu — Classic bar: logo left; links and the bag on the right, on the page ground with a hairline under it.
// Sticky; takes the surface tone after 40px of scroll. Phones: logo, bag and a menu button opening a full-width sheet.
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { nav } from '@/content/copy'
import { cn } from '@/lib/utils'
import { Logo } from './Logo'
import { useCart } from './cart'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

function useScrolled(y = 40) {
  const [s, set] = useState(false)
  useEffect(() => {
    const on = () => set(window.scrollY > y)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [y])
  return s
}

const isCurrent = (path: string, href: string) => href !== '/' && !href.includes('#') && (path === href || (href === '/shop' && path === '/shop'))

export function Header() {
  const path = usePathname()
  const scrolled = useScrolled()
  const { count, setOpen } = useCart()
  const [menu, setMenu] = useState(false)
  const bagLabel = `${nav.bag} (${count})`

  return (
    <header className={cn('sticky top-0 z-40 border-b border-(--color-border) transition-colors duration-300', scrolled ? 'bg-(--color-surface)' : 'bg-(--color-background)')}>
      <div className="mx-auto flex h-(--nav-h) max-w-(--container) items-center justify-between px-(--gutter)">
        <Link href="/" aria-label="Maison Vey, home" className="inline-flex min-h-11 items-center">
          <Logo />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <NavigationMenu aria-label="Main">
            <NavigationMenuList>
              {nav.links.map((l) => (
                <NavigationMenuItem key={l.href}>
                  <NavigationMenuLink asChild active={isCurrent(path, l.href)}>
                    <Link href={l.href} aria-current={isCurrent(path, l.href) ? 'page' : undefined}>{l.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button" onClick={() => setOpen(true)} className="type-utility link-quiet inline-flex min-h-11 cursor-pointer items-center tabular-nums">
                {bagLabel}
              </button>
            </TooltipTrigger>
            <TooltipContent>Free delivery over €120</TooltipContent>
          </Tooltip>
        </div>

        <div className="flex items-center gap-5 md:hidden">
          <button type="button" onClick={() => setOpen(true)} className="type-utility link-quiet inline-flex min-h-11 cursor-pointer items-center tabular-nums">{bagLabel}</button>
          <Sheet open={menu} onOpenChange={setMenu}>
            <SheetTrigger className="type-utility link-quiet inline-flex min-h-11 cursor-pointer items-center">{nav.menu}</SheetTrigger>
            <SheetContent side="top" className="bg-(--color-background)">
              <SheetHeader>
                <SheetTitle asChild><span><Logo /></span></SheetTitle>
                <SheetClose className="type-utility link-quiet inline-flex min-h-11 cursor-pointer items-center">{nav.close}</SheetClose>
              </SheetHeader>
              <SheetDescription className="sr-only">Site menu</SheetDescription>
              <nav aria-label="Main" className="px-(--gutter) pt-12">
                <ul className="space-y-2">
                  {[{ label: 'Home', href: '/' }, ...nav.links].map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} onClick={() => setMenu(false)} aria-current={path === l.href ? 'page' : undefined} className="type-heading link-quiet inline-flex min-h-14 items-center">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
