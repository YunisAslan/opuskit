'use client'
// Menu — Centered logo: links left, logo centred, secondary links and the bag right. Tall at the top, compact after 80px.
// Phones: menu button left, logo centred, bag right.
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ChevronDown, Menu } from 'lucide-react'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { TextRoll } from '@/components/pieces/TextRoll'
import { Logo } from '@/components/Logo'
import { useBag, useShop } from '@/components/shop'
import { EMAIL } from '@/data/shop'

const left = [
  { label: 'Collections', href: '/collections' },
  { label: 'Shop', href: '/collections#shop' },
  { label: 'About', href: '/about' },
]
const help = [
  { label: 'Delivery and returns', href: '/contact#faq' },
  { label: 'Sizing', href: '/contact#faq' },
  { label: 'Visit the shop', href: '/contact#visit' },
]

const link = 'type-utility flex min-h-11 items-center px-2 underline-offset-[6px] decoration-(--color-accent) decoration-1 aria-[current=page]:underline'

export function Header() {
  const path = usePathname()
  const [compact, setCompact] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { count } = useBag()
  const { openBag } = useShop()
  useEffect(() => {
    const on = () => setCompact(window.scrollY > 80)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const current = (href: string) => (href === path ? 'page' : undefined)

  const bag = (
    <Tooltip>
      <TooltipTrigger asChild>
        <button type="button" onClick={openBag} className="type-utility flex min-h-11 items-center gap-1 px-2" aria-label={`Bag, ${count} ${count === 1 ? 'piece' : 'pieces'}`}>
          <TextRoll>Bag</TextRoll><span className="tabular-nums">({count})</span>
        </button>
      </TooltipTrigger>
      <TooltipContent className="type-utility bg-(--color-text) text-(--color-background)">Kept in this browser until you check out</TooltipContent>
    </Tooltip>
  )

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color] duration-300 ${compact ? 'border-b border-(--color-border) bg-(--color-background)' : 'border-b border-transparent bg-transparent'}`}>
      <div className={`mx-auto grid max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-4 transition-[height] duration-300 md:px-10 ${compact ? 'h-16' : 'h-20 md:h-28'}`}>
        {/* left: links (desktop) / menu button (phone) */}
        <div className="flex items-center">
          <NavigationMenu viewport={false} className="hidden md:flex">
            <NavigationMenuList className="gap-4">
              {left.map((l) => (
                <NavigationMenuItem key={l.href}>
                  <NavigationMenuLink asChild className="p-0 hover:bg-transparent focus:bg-transparent data-active:bg-transparent">
                    <Link href={l.href} aria-current={current(l.href)} className={link}><TextRoll>{l.label}</TextRoll></Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger className="type-utility -ml-2 flex size-11 items-center justify-center md:hidden" aria-label="Open the menu"><Menu className="size-5" /></SheetTrigger>
            <SheetContent side="left" className="w-full border-(--color-border) bg-(--color-background) px-6 pt-20 text-(--color-text) sm:max-w-sm">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav aria-label="Main" className="flex flex-col">
                {[{ label: 'Home', href: '/' }, ...left, { label: 'Contact', href: '/contact' }].map((l) => (
                  <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} aria-current={current(l.href)} className="type-display border-b border-(--color-border) py-3 [font-size:3rem] aria-[current=page]:underline decoration-(--color-accent) decoration-2 underline-offset-8">{l.label}</Link>
                ))}
              </nav>
              <a href={`mailto:${EMAIL}`} className="type-utility mt-8 text-(--color-muted) underline underline-offset-4">{EMAIL}</a>
            </SheetContent>
          </Sheet>
        </div>

        <Link href="/" aria-label="Saint Ashe, home" className={`transition-transform duration-300 ${compact ? 'scale-90' : 'md:scale-110'}`}><Logo /></Link>

        {/* right: secondary links and the bag */}
        <div className="flex items-center justify-end gap-2 md:gap-4">
          <Link href="/contact" aria-current={current('/contact')} className={`${link} hidden md:flex`}><TextRoll>Contact</TextRoll></Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="type-utility hidden min-h-11 items-center gap-1 px-2 md:flex">Help<ChevronDown className="size-3.5" /></DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 border-(--color-border) bg-(--color-surface) p-0">
              {help.map((h) => (
                <DropdownMenuItem key={h.label} asChild className="type-utility min-h-11 px-4 focus:bg-(--color-secondary)">
                  <Link href={h.href}>{h.label}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem asChild className="type-utility min-h-11 px-4 focus:bg-(--color-secondary)"><a href={`mailto:${EMAIL}`}>Write to us</a></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {bag}
        </div>
      </div>
    </header>
  )
}
