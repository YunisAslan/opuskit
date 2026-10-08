'use client'
// Menu — Centered logo: links left, the wordmark centred, secondary links and the action right. Generous at the top,
// it settles into a compact solid bar after 80px (transform + opacity only). Mobile: menu button left, logo centred,
// Book right; the menu opens as a sheet of big lowercase links.
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MenuIcon } from 'lucide-react'
import { Logo } from './Logo'
import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { brand, hours, nav } from '@/content/site'

const item = 'type-utility link-hum hidden h-11 items-center px-1 text-(--color-text) [font-size:0.9375rem] lg:inline-flex'

export function Navbar() {
  const path = usePathname()
  const [compact, setCompact] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const on = () => setCompact(window.scrollY > 80)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  const current = (href: string) => (href === path ? 'page' : undefined)

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-(--gutter)">
      {/* the solid bar fades in under the content once scrolled */}
      <div aria-hidden className={`absolute inset-x-0 top-0 h-16 border-b border-(--color-border) bg-(--color-background) transition-opacity duration-300 ease-(--ease-hum) ${compact ? 'opacity-100' : 'opacity-0'}`} />
      <div className={`relative mx-auto grid h-16 max-w-(--container) grid-cols-[1fr_auto_1fr] items-center transition-transform duration-300 ease-(--ease-hum) ${compact ? 'translate-y-0' : 'translate-y-4'}`}>
        <nav aria-label="Main" className="flex items-center gap-6">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="-ml-2 lg:hidden" aria-label={nav.menuButton}>
                <MenuIcon className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="px-(--gutter) pt-20 pb-8">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">Pages and how to reach Low Hum</SheetDescription>
              <ul className="space-y-1">
                {[{ label: 'Home', href: '/' }, ...nav.left, ...nav.right].map((l) => (
                  <li key={l.href}>
                    <SheetClose asChild>
                      <Link href={l.href} aria-current={current(l.href)} className="type-poster link-hum inline-block py-1.5 lowercase [font-size:2.75rem]">{l.label}</Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>
              <div className="type-caption mt-auto space-y-1 text-(--color-muted)">
                {hours.map((h) => <p key={h}>{h}</p>)}
                <p className="pt-3"><a className="link-hum type-body text-(--color-text)" href={`tel:${brand.phone.replace(/\s/g, '')}`}>{brand.phoneDisplay}</a></p>
              </div>
              <SheetClose asChild>
                <Button asChild size="lg" className="w-full"><Link href={nav.action.href}>{nav.action.label}</Link></Button>
              </SheetClose>
            </SheetContent>
          </Sheet>
          {nav.left.map((l) => <Link key={l.href} href={l.href} aria-current={current(l.href)} className={item}>{l.label}</Link>)}
        </nav>

        <Link href="/" aria-label="Low Hum, home" className={`relative inline-flex h-11 items-center px-2 text-(--color-text) outline-none transition-transform duration-300 ease-(--ease-hum) after:absolute after:inset-x-2 after:bottom-0.5 after:h-[3px] after:rounded-full after:bg-(--color-accent) after:opacity-0 after:transition-opacity after:duration-150 focus-visible:after:opacity-100 ${compact ? 'scale-100' : 'scale-[1.3]'}`}>
          <Logo className="[font-size:1.75rem]" />
        </Link>

        <div className="flex items-center justify-end gap-6">
          {nav.right.map((l) => <Link key={l.href} href={l.href} className={item}>{l.label}</Link>)}
          <Button asChild size="default" className="[font-size:0.9375rem]">
            <Link href={nav.action.href}><span className="hidden sm:inline">{nav.action.label}</span><span className="sm:hidden">{nav.actionShort}</span></Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
