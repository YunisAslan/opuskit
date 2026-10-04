'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu'
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { money, products } from '@/data/shop'
import { Bag } from './Bag'
import { LiveStatus } from './LiveStatus'
import { Logo } from './Logo'
import { TextLink } from './NavLink'

// Centered logo: links left, the wordmark in the middle, the live line, help and the bag on the right.
// Generous at the top of the page; a compact bar after 80px.
export function Navbar() {
  const [compact, setCompact] = useState(false)
  useEffect(() => {
    const on = () => setCompact(scrollY > 80)
    on(); addEventListener('scroll', on, { passive: true })
    return () => removeEventListener('scroll', on)
  }, [])
  return (
    <header data-compact={compact || undefined} className="group/nav sticky top-0 z-50 border-b border-transparent bg-(--color-background)/95 backdrop-blur transition-colors data-compact:border-(--color-border)">
      <div className="mx-auto grid h-14 max-w-(--container) grid-cols-[1fr_auto_1fr] items-center px-(--gutter) transition-[height] duration-300 lg:h-22 lg:group-data-compact/nav:h-16">
        <div className="flex items-center">
          <MobileMenu />
          <NavigationMenu viewport={false} className="hidden lg:flex">
            <NavigationMenuList className="gap-6">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="type-utility h-11 bg-transparent px-0 hover:bg-transparent focus:bg-transparent data-open:bg-transparent">Shop</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-(--color-surface) p-2">
                  <ul className="grid w-72">
                    {products.map((p) => (
                      <li key={p.slug}>
                        <NavigationMenuLink asChild>
                          <Link href={`/shop/${p.slug}`} className="type-utility flex-row justify-between gap-4 rounded-(--radius-button) px-3 py-2.5">
                            <span>{p.name}</span><span className="tabular-nums text-(--color-muted)">{money(p.price)}</span>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                    <li className="mt-1 border-t border-(--color-border) pt-1">
                      <NavigationMenuLink asChild><Link href="/shop" className="type-utility rounded-(--radius-button) px-3 py-2.5">Everything, side by side</Link></NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem><TextLink href="/the-salt" className="type-utility">The salt</TextLink></NavigationMenuItem>
              <NavigationMenuItem><TextLink href="/journal" className="type-utility">Journal</TextLink></NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <Link href="/" aria-label="QUM, home" className="px-2 py-2"><Logo className="transition-[font-size] duration-300 lg:text-[2rem] lg:group-data-compact/nav:text-[1.6rem]" /></Link>
        <div className="flex items-center justify-end gap-5">
          <span className="hidden xl:block"><LiveStatus /></span>
          <DropdownMenu>
            <DropdownMenuTrigger className="type-utility hidden h-11 items-center lg:flex">Help</DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-(--color-surface) p-1.5">
              <DropdownMenuItem asChild className="type-utility h-10 px-3"><Link href="/help">Questions and answers</Link></DropdownMenuItem>
              <DropdownMenuItem asChild className="type-utility h-10 px-3"><Link href="/help#delivery">Delivery and returns</Link></DropdownMenuItem>
              <DropdownMenuItem asChild className="type-utility h-10 px-3"><Link href="/the-salt#visit">Visit the lab</Link></DropdownMenuItem>
              <DropdownMenuItem asChild className="type-utility h-10 px-3"><a href="mailto:hello@qum.az">Write to us</a></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Bag />
        </div>
      </div>
      <div className="flex justify-center border-t border-(--color-border) px-(--gutter) py-1.5 xl:hidden"><LiveStatus /></div>
    </header>
  )
}

function MobileMenu() {
  const links = [['/', 'Home'], ['/shop', 'Shop'], ['/the-salt', 'The salt'], ['/journal', 'Journal'], ['/help', 'Help'], ['/cart', 'Your bag']]
  return (
    <Sheet>
      <SheetTrigger asChild><Button variant="ghost" size="icon" className="-ml-3 lg:hidden" aria-label="Menu"><Menu strokeWidth={1.5} /></Button></SheetTrigger>
      <SheetContent side="left" className="w-[86%] bg-(--color-background) p-6 pt-16">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <nav aria-label="Main">
          <ul className="space-y-1">
            {links.map(([href, label]) => (
              <li key={href}><SheetClose asChild><Link href={href} className="type-heading block py-2">{label}</Link></SheetClose></li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto"><LiveStatus /></div>
      </SheetContent>
    </Sheet>
  )
}
