'use client'
// Menu "Centered logo": links left, logo centred, the secondary link and the action right. Roomy at the top of the
// page, compact with a solid ground after 80px (transform + opacity only). Phone: menu button left, logo centred,
// action right, and a sticky "Check availability" once the first screen is passed.
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { Logo } from './Logo'
import { AmbientSound } from '@/components/pieces/AmbientSound'
import { assets } from '@/config/assets'
import { Button } from '@/components/ui/button'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

export const pages = [
  { href: '/rooms', label: 'Rooms' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/getting-here', label: 'Getting here' },
  { href: '/book', label: 'Book a stay' },
]

const linkStyle = 'type-utility inline-flex min-h-11 items-center px-3 text-[0.9375rem] underline decoration-transparent decoration-1 underline-offset-8 transition-[text-decoration-color] duration-150 ease-out hover:decoration-current focus-visible:decoration-current aria-[current=page]:decoration-(--color-accent) aria-[current=page]:decoration-2'

export function SiteNav() {
  const pathname = usePathname()
  const [compact, setCompact] = useState(false)
  const [past, setPast] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setCompact(scrollY > 80)
      // The sticky action shows past the first screen, and steps aside over the (white) footer.
      const footer = document.querySelector('footer')
      setPast(scrollY > innerHeight * 0.7 && (!footer || footer.getBoundingClientRect().top > innerHeight - 80))
    }
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [])

  const current = (href: string) => (pathname === href ? 'page' : undefined)
  const item = (p: { href: string; label: string }) => (
    <NavigationMenuItem key={p.href}>
      <NavigationMenuLink asChild className="rounded-none p-0 hover:bg-transparent focus:bg-transparent data-active:bg-transparent">
        <Link href={p.href} aria-current={current(p.href)} className={linkStyle}>{p.label}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 text-(--color-text)">
        <div aria-hidden className={`absolute inset-0 border-b border-(--color-border) bg-(--color-background) transition-opacity duration-300 ease-out ${compact ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`shell relative grid h-16 grid-cols-[1fr_auto_1fr] items-center transition-transform duration-300 ease-out ${compact ? '' : 'translate-y-4'}`}>
          <div className="flex items-center">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="-ml-3 lg:hidden" aria-label="Open the menu"><Menu className="size-5" /></Button>
              </SheetTrigger>
              <SheetContent side="left" className="glass w-[min(86vw,360px)] border-0 border-r bg-(--color-background)/70 px-6 pt-20 text-(--color-text)">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetDescription className="sr-only">Pages of the Velmira site</SheetDescription>
                <nav aria-label="Menu" className="flex flex-col">
                  {[{ href: '/', label: 'Home' }, ...pages].map((p) => (
                    <Link key={p.href} href={p.href} aria-current={current(p.href)} onClick={() => setOpen(false)}
                      className="type-heading flex min-h-14 items-center gap-3 underline decoration-transparent decoration-1 underline-offset-8 hover:decoration-current focus-visible:decoration-current aria-[current=page]:decoration-(--color-accent)">
                      {p.label}
                    </Link>
                  ))}
                </nav>
                <p className="type-utility mt-auto pb-8 text-(--color-muted)">stay@velmira.az<br />+994 24 205 18 40</p>
              </SheetContent>
            </Sheet>
            <NavigationMenu viewport={false} className="hidden lg:flex">
              <NavigationMenuList className="-ml-3 gap-1">{pages.slice(0, 2).map(item)}</NavigationMenuList>
            </NavigationMenu>
            {/* The sound switch lives in the menu bar so it never sits on top of text: words on desktop, bars only on phones. */}
            <AmbientSound src={assets.ambientSound.src} label="Lake sound" volume={0.35} placement="lg:ml-3 max-lg:justify-center max-lg:border-transparent max-lg:bg-transparent max-lg:px-0" labelClassName="max-lg:sr-only" />
          </div>
          <Link href="/" aria-label="Velmira, home" className={`origin-center transition-transform duration-300 ease-out ${compact ? '' : 'md:scale-[1.18]'}`}>
            <Logo />
          </Link>
          <div className="flex items-center justify-end gap-2">
            <NavigationMenu viewport={false} className="hidden lg:flex">
              <NavigationMenuList>{item(pages[2])}</NavigationMenuList>
            </NavigationMenu>
            <Button asChild size="sm" variant={pathname === '/' && !compact ? 'glass' : 'default'} className="-mr-1 lg:mr-0">
              <Link href="/book"><span className="sm:hidden">Book</span><span className="hidden sm:inline">Book a stay</span></Link>
            </Button>
          </div>
        </div>
      </header>
      {pathname !== '/book' && (
        <Button asChild size="lg" className={`fixed bottom-4 right-4 z-[80] shadow-(--shadow-card) transition-[opacity,transform] duration-300 ease-out lg:hidden ${past ? '' : 'pointer-events-none translate-y-4 opacity-0'}`}>
          <Link href="/book" tabIndex={past ? undefined : -1} aria-hidden={past ? undefined : true}>Check availability</Link>
        </Button>
      )}
    </>
  )
}
