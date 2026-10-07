'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { navLinks } from '@/config/site'
import { scents } from '@/content/products'
import { Logo } from '@/components/pieces/Logo'
import { BagSheet } from '@/components/cart/BagSheet'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

// Classic bar: logo left, links and the primary action right, on the page ground with a hairline
// underneath. Sticky, and it gains a surface background after 40px of scroll.
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b border-(--color-border) transition-colors duration-200',
        scrolled ? 'bg-(--color-surface)' : 'bg-(--color-background)',
      )}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-(--container) items-center justify-between gap-6 px-(--gutter)">
        <Link href="/" aria-label="Maison Vey — home" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle}>
                  <Link href="/shop">Shop</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>The scents</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[36rem] grid-cols-2 gap-1 p-3">
                    {scents.map((s) => (
                      <li key={s.slug}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={`/product/${s.slug}`}
                            className="flex flex-col gap-1 p-3 transition-colors duration-150 hover:bg-(--color-secondary) focus-visible:outline-none"
                          >
                            <span className="type-body">{s.name}</span>
                            <span className="type-utility text-(--color-muted)">{s.hour} — {s.family}</span>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {navLinks.slice(1).map((l) => (
                <NavigationMenuItem key={l.href}>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle}>
                    <Link href={l.href}>{l.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Account">
                  <User className="size-4" aria-hidden />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/cart">Your bag</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/checkout">Checkout</Link>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>Sign in — coming soon</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <BagSheet />
          </div>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <BagSheet />
          <MobileMenu />
        </div>
      </div>
    </header>
  )
function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu className="size-5" aria-hidden />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-sm">
        <SheetHeader>
          <SheetTitle>Maison Vey</SheetTitle>
        </SheetHeader>
        <nav aria-label="Mobile" className="flex flex-col">
          {navLinks.map((l) => (
            <SheetClose asChild key={l.href}>
              <Link href={l.href} className="type-heading border-b border-(--color-border) py-4 text-[1.6rem]">
                {l.label}
              </Link>
            </SheetClose>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-1">
          <p className="type-utility mb-2 text-(--color-muted)">The five scents</p>
          {scents.map((s) => (
            <SheetClose asChild key={s.slug}>
              <Link href={`/product/${s.slug}`} className="type-body flex items-baseline justify-between py-1.5 hover:underline">
                <span>{s.name}</span>
                <span className="type-utility text-(--color-muted)">{s.hour}</span>
              </Link>
            </SheetClose>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
}