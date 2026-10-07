'use client'
// Menu — Classic bar: logo left; links, the phone and the one action right; on the page ground with a hairline below.
// Sticky; takes the surface after 40 px of scroll. Phones: logo + Menu, which opens a full-width sheet.
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Logo } from '@/components/Logo'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { brand, nav } from '@/content/site'

const tel = `tel:${brand.phone.replace(/\s/g, '')}`

export function Navbar() {
  const path = usePathname()
  const [raised, setRaised] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const on = () => setRaised(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const current = (href: string) => (path === href ? 'page' : undefined)

  return (
    <header
      style={{ viewTransitionName: 'site-nav' }}
      className={`sticky top-0 z-40 h-(--nav-h) border-b border-(--color-border) px-(--gutter) transition-colors duration-300 ${raised ? 'bg-(--color-surface)' : 'bg-(--color-background)'}`}
    >
      <div className="mx-auto flex h-full max-w-(--container) items-center justify-between gap-6">
        <Link href="/" aria-label="Halden, home" className="flex min-h-11 items-center">
          <Logo />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          <NavigationMenu viewport={false} aria-label="Main">
            <NavigationMenuList className="gap-6">
              {nav.links.map((l) => (
                <NavigationMenuItem key={l.href}>
                  <NavigationMenuLink asChild active={path === l.href} className="type-utility link-line p-0 text-(--color-text) hover:bg-transparent focus:bg-transparent data-active:bg-transparent data-active:hover:bg-transparent data-active:focus:bg-transparent">
                    <Link href={l.href} aria-current={current(l.href)} className="flex min-h-11 items-center">{l.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <a href={tel} className="type-utility link-line flex min-h-11 items-center text-(--color-muted) hover:text-(--color-text)">{brand.phone}</a>
            </TooltipTrigger>
            <TooltipContent>{nav.callTip}</TooltipContent>
          </Tooltip>
          <Link href={nav.action.href} className="btn btn-solid">{nav.action.label}</Link>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="type-utility link-line -mr-3 flex min-h-11 items-center px-3 lg:hidden">{nav.menu}</SheetTrigger>
          <SheetContent side="top" showCloseButton={false} className="h-svh gap-0 border-0 bg-(--color-background) p-0 text-(--color-text) shadow-none data-[side=top]:h-svh">
            <div className="flex h-(--nav-h) shrink-0 items-center justify-between border-b border-(--color-border) px-(--gutter)">
              <SheetTitle asChild><span><Logo /></span></SheetTitle>
              <SheetClose className="type-utility link-line -mr-3 flex min-h-11 items-center px-3">{nav.close}</SheetClose>
            </div>
            <SheetDescription className="sr-only">Pages of the Halden site</SheetDescription>
            <nav aria-label="Main" className="flex flex-1 flex-col justify-between px-(--gutter) pb-[max(24px,env(safe-area-inset-bottom))] pt-12">
              <ul className="space-y-4">
                {[{ label: 'Home', href: '/' }, ...nav.links].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} onClick={() => setOpen(false)} aria-current={current(l.href)} className="type-heading link-line block">{l.label}</Link>
                  </li>
                ))}
              </ul>
              <div className="space-y-6">
                <a href={tel} className="type-body link-line block text-(--color-muted)">{brand.phone}</a>
                <Link href={nav.action.href} onClick={() => setOpen(false)} className="btn btn-solid w-full">{nav.action.label}</Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
