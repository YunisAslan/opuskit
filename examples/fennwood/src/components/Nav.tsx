'use client'
// Menu "Centered logo": links left, logo centred, secondary links and the action right. Generous at the top, it slides
// into a compact bar after 80px (transform only), hides while scrolling down and comes back on the way up.
// Over the home hero it is clear with light text; everywhere else it sits on the page ground.
// Mobile: menu button left (a Sheet), logo centred, the action right — plus a sticky "Book a table" at thumb height.
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ChevronDown, Menu as MenuIcon, Phone } from 'lucide-react'
import { ScribbleLink } from '@/components/pieces/ScribbleLink'
import { Logo } from '@/components/Mark'
import { Button } from '@/components/ui/button'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetDescription } from '@/components/ui/sheet'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { nav, site } from '@/config/site'

const tel = `tel:${site.phone.replace(/\s/g, '')}`

export function Nav() {
  const path = usePathname()
  const [compact, setCompact] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [bookInView, setBookInView] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setCompact(y > 80)
      setHidden(y > 240 && y > last + 4 ? true : y < last - 4 ? false : (h) => h)
      last = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // The sticky mobile button steps aside while the booking form itself is on screen, and as soon as the dark footer
  // comes into view (the dark button would disappear into it).
  useEffect(() => {
    const seen = new Set<Element>()
    const watch = (el: Element | null, rootMargin: string) => {
      if (!el) return
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) seen.add(el); else seen.delete(el)
        setBookInView(seen.size > 0)
      }, { rootMargin })
      io.observe(el)
      return io
    }
    const ios = [watch(document.getElementById('book'), '0px 0px -20% 0px'), watch(document.querySelector('footer'), '0px')]
    return () => ios.forEach((io) => io?.disconnect())
  }, [path])

  const overHero = path === '/' && !compact
  const tone = overHero ? 'text-(--color-background) [--color-chapter-1:var(--color-background)]' : 'text-(--color-text)'
  const ground = overHero ? 'bg-transparent border-transparent' : 'bg-(--color-background) border-(--color-border)'
  const shift = hidden && !open ? '-translate-y-full' : compact ? '-translate-y-6' : 'translate-y-0'

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 h-22 border-b transition-[transform,background-color,border-color,color] duration-300 ease-(--ease-out-soft) motion-reduce:transition-none ${ground} ${tone} ${shift}`}>
        <div className="mx-auto grid h-16 max-w-[1200px] translate-y-6 grid-cols-[1fr_auto_1fr] items-center px-5 md:px-6">
          {/* left: links (desktop) / menu button (mobile) */}
          <div className="flex items-center">
            <NavigationMenu viewport={false} className="hidden lg:flex">
              <NavigationMenuList className="gap-6">
                {nav.map((l) => (
                  <NavigationMenuItem key={l.href}>
                    <NavigationMenuLink asChild className="type-utility rounded-none p-0 [font-size:0.9375rem] hover:bg-transparent focus:bg-transparent data-active:bg-transparent">
                      <ScribbleLink link={Link} href={l.href} current={path === l.href}>{l.label}</ScribbleLink>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="-ml-3 text-current hover:bg-(--color-secondary)/40 lg:hidden" aria-label="Open the menu">
                  <MenuIcon className="size-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[86vw] gap-0 bg-(--color-background) px-5 pt-6 pb-8">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetDescription className="sr-only">Pages and how to reach us</SheetDescription>
                <Link href="/" onClick={() => setOpen(false)} aria-label="Fennwood, home" className="self-start"><Logo /></Link>
                <nav aria-label="Main" className="mt-12 flex flex-col gap-3">
                  {[{ label: 'Home', href: '/' }, ...nav].map((l) => (
                    <span key={l.href} onClick={() => setOpen(false)}>
                      <ScribbleLink link={Link} href={l.href} current={path === l.href} className="type-heading py-1">{l.label}</ScribbleLink>
                    </span>
                  ))}
                </nav>
                <div className="type-body mt-auto space-y-1 text-(--color-muted)">
                  {site.hours.map((h) => <p key={h}>{h}</p>)}
                  <a href={tel} className="inline-block py-2.5 text-(--color-text) underline underline-offset-4">{site.phone}</a>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* centre: logo */}
          <Link href="/" aria-label="Fennwood, home" className={`transition-transform duration-300 ease-(--ease-out-soft) motion-reduce:transition-none ${compact ? 'scale-[0.86]' : 'scale-100'}`}>
            <Logo />
          </Link>

          {/* right: secondary links and the action */}
          <div className="flex items-center justify-end gap-2 lg:gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="type-utility hidden gap-1 px-3 [font-size:0.9375rem] text-current hover:bg-(--color-secondary)/40 focus-visible:bg-(--color-secondary)/40 aria-expanded:bg-(--color-secondary)/40 aria-expanded:text-current lg:inline-flex">
                  Visit <ChevronDown className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-52 bg-(--color-surface) p-1.5">
                <DropdownMenuItem asChild className="py-2.5 text-base"><Link href="/reservations#location">Find us</Link></DropdownMenuItem>
                <DropdownMenuItem asChild className="py-2.5 text-base"><Link href="/reservations#faq">Questions</Link></DropdownMenuItem>
                <DropdownMenuItem asChild className="py-2.5 text-base"><a href={`mailto:${site.email}`}>Email us</a></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <a href={tel} aria-label={`Call us on ${site.phone}`} className="hidden size-11 items-center justify-center rounded-(--radius-button) transition-colors duration-150 hover:bg-(--color-secondary)/40 focus-visible:bg-(--color-secondary)/40 lg:inline-flex">
                  <Phone className="size-[18px]" />
                </a>
              </TooltipTrigger>
              <TooltipContent>Call us on {site.phone}</TooltipContent>
            </Tooltip>
            <Button asChild className={overHero ? 'bg-(--color-background) text-(--color-text) hover:bg-(--color-surface) focus-visible:bg-(--color-surface)' : ''}>
              <Link href="/reservations"><span className="lg:hidden">Book</span><span className="hidden lg:inline">Book a table</span></Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Sticky booking button on mobile: always one tap away. */}
      <div className={`fixed inset-x-4 bottom-4 z-40 transition-[transform,opacity] duration-300 motion-reduce:transition-none lg:hidden ${compact && !bookInView ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}>
        <Button asChild size="lg" className="w-full shadow-none">
          <a href="#book" tabIndex={compact && !bookInView ? 0 : -1}>Book a table</a>
        </Button>
      </div>
    </>
  )
}
