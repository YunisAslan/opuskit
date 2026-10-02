'use client'
// Menu "Split pill": three separate white pieces at the top edge, no bar behind them: the logo left, a compact pill of
// uppercase links centred (a hand-drawn squiggle under the hovered and the current link), and one boxed action with a
// status dot right. White over every section, so it reads on pink, on the colour chapters and on the plum ending.
// Mobile: logo + menu button; the links open as a full-width sheet with the same squiggles.
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Logo } from '@/components/Logo'
import { WavyLink } from '@/components/pieces/WavyLink'
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { brand } from '@/content/site'

export const links = [
  { label: 'Home', href: '/' },
  { label: 'Practice', href: '/practice' },
  { label: 'About', href: '/about' },
]

const chip = 'pointer-events-auto flex h-11 items-center bg-(--color-paper) text-(--color-text)'
const ink = '[--color-chapter-2:var(--color-text)]' // the squiggle in ink: the second chapter colour would vanish on the white pill

function Dot() {
  return <span aria-hidden className="size-2 rounded-full bg-(--color-accent) motion-safe:animate-pulse" />
}

export function Nav() {
  const path = usePathname()
  const [open, setOpen] = useState(false)
  const current = (href: string) => (href === '/' ? path === '/' : path.startsWith(href))
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
      <div className="flex items-center justify-between gap-4">
        <Link href="/" aria-label="Sticky Weather, home" className={`${chip} px-3 transition-transform duration-200 hover:-rotate-2 motion-reduce:transition-none`}><Logo /></Link>

        <NavigationMenu viewport={false} aria-label="Main" className={`${chip} absolute left-1/2 hidden -translate-x-1/2 px-6 md:flex`}>
          <NavigationMenuList className="gap-7">
            {links.map((l) => (
              <NavigationMenuItem key={l.href}>
                <WavyLink link={Link} href={l.href} current={current(l.href)} className={`type-utility pt-1.5 uppercase tracking-[0.06em] ${ink}`}>{l.label}</WavyLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/contact" aria-current={current('/contact') ? 'page' : undefined}
                className={`${chip} type-utility gap-2 max-md:hidden border border-(--color-text) px-4 uppercase tracking-[0.06em] transition-colors hover:bg-(--color-text) hover:text-(--color-paper) focus-visible:bg-(--color-text) focus-visible:text-(--color-paper) aria-[current=page]:bg-(--color-text) aria-[current=page]:text-(--color-paper)`}>
                <Dot /> Contact
              </Link>
            </TooltipTrigger>
            <TooltipContent className="type-utility rounded-none bg-(--color-text) px-3 py-2 text-(--color-background)">{brand.booking}</TooltipContent>
          </Tooltip>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className={`${chip} type-utility px-4 uppercase tracking-[0.06em] md:hidden`}>Menu</SheetTrigger>
            <SheetContent side="top" className="gap-0 border-(--color-text) bg-(--color-paper) px-5 pt-20 pb-10">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">Pages of the Sticky Weather site</SheetDescription>
              <nav aria-label="Main">
                <ul className="space-y-3">
                  {[...links, { label: 'Contact', href: '/contact' }].map((l) => (
                    <li key={l.href} onClick={() => setOpen(false)}>
                      <WavyLink link={Link} href={l.href} current={current(l.href)} className={`type-display py-1 [font-size:2.75rem] ${ink}`}>{l.label}</WavyLink>
                    </li>
                  ))}
                </ul>
              </nav>
              <p className="type-utility mt-8 flex items-center gap-2 text-(--color-muted)"><Dot /> {brand.booking}</p>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
