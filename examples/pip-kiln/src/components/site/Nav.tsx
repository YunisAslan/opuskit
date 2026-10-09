'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { DrawnLink } from '@/components/pieces/DrawnLink'
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { nav, site } from '@/content/site'
import { useCart } from '@/lib/cart'
import { BagSheet } from './BagSheet'
import { Logo } from './Logo'
import { useReduced } from '@/lib/use-media'

/** The count in its bubble: bumps once (1 → 1.15 → 1, 200ms) whenever something lands in the bag. */
function Count({ n, pulse }: { n: number; pulse: number }) {
  const reduce = useReduced()
  return (
    <motion.span key={pulse} initial={false} animate={pulse && !reduce ? { scale: [1, 1.15, 1] } : undefined} transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      className="grid h-6 min-w-6 place-items-center rounded-full bg-(--color-background) px-1.5 text-(--color-text) tabular-nums [font-size:0.8125rem]">{n}</motion.span>
  )
}

export function Nav() {
  const path = usePathname()
  const c = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const [bag, setBag] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on(); addEventListener('scroll', on, { passive: true })
    return () => removeEventListener('scroll', on)
  }, [])
  const isCurrent = (href: string) => !href.includes('?') && (href === '/' ? path === '/' : path === href || path.startsWith(href + '/'))
  const bagLabel = `${nav.bag}, ${c.count} ${c.count === 1 ? 'piece' : 'pieces'}`

  return (
    <header className={`sticky top-0 z-40 border-b border-(--color-border) pt-[env(safe-area-inset-top,0px)] transition-[background-color] duration-150 ${scrolled ? 'bg-(--color-surface)' : 'bg-(--color-background)'}`}>
      <a href="#main" className="t-action sr-only focus:not-sr-only focus:absolute focus:left-(--gutter) focus:top-3 focus:z-50 focus:rounded-(--radius-button) focus:bg-(--color-text) focus:px-4 focus:py-3 focus:text-(--color-background)">{nav.skip}</a>
      <div className="flex h-(--nav-h) items-center justify-between gap-6 px-(--gutter)">
        <Link href="/" aria-label={`${site.name}, home`} className="press -my-2 py-2"><Logo className="text-[1.6rem] md:text-[1.9rem]" /></Link>

        <div className="flex items-center gap-2 md:gap-8">
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-7">
              {nav.links.map((l) => (
                <li key={l.href}><DrawnLink link={Link} href={l.href} current={isCurrent(l.href)} className="t-action py-3">{l.label}</DrawnLink></li>
              ))}
            </ul>
          </nav>
          <Sheet open={bag} onOpenChange={setBag}>
            <SheetTrigger className="btn btn-ink min-h-11 gap-2.5 pl-5 pr-2.5" aria-label={bagLabel}>
              <span aria-hidden>{nav.bag}</span><span aria-hidden><Count n={c.count} pulse={c.pulse} /></span>
            </SheetTrigger>
            <BagSheet />
          </Sheet>
          <Sheet open={menu} onOpenChange={setMenu}>
            <SheetTrigger className="btn btn-light min-h-11 gap-3 px-4 md:hidden" aria-label={nav.menu}>
              <span aria-hidden className="relative block h-3 w-5">
                <span className="absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current" />
                <span className="absolute bottom-0 left-0 h-0.5 w-5 rounded-full bg-current" />
              </span>
            </SheetTrigger>
            <SheetContent side="top" aria-describedby={undefined}>
              <div className="flex h-(--nav-h) shrink-0 items-center justify-between border-b border-(--color-border) px-(--gutter)">
                <SheetClose asChild><Link href="/" className="press"><Logo className="text-[1.6rem]" /></Link></SheetClose>
                <SheetClose className="btn btn-ink min-h-11 gap-3 px-4" aria-label={nav.close}>
                  {/* the two lines turn into a close (200ms, --ease-in-out) */}
                  <span aria-hidden className="relative block h-3 w-5">
                    <span className="absolute left-0 top-[5px] h-0.5 w-5 rotate-45 rounded-full bg-current transition-transform duration-200 ease-(--ease-in-out) starting:rotate-0 starting:-translate-y-[5px]" />
                    <span className="absolute left-0 top-[5px] h-0.5 w-5 -rotate-45 rounded-full bg-current transition-transform duration-200 ease-(--ease-in-out) starting:rotate-0 starting:translate-y-[5px]" />
                  </span>
                </SheetClose>
              </div>
              <SheetTitle className="sr-only">{nav.menu}</SheetTitle>
              <nav aria-label="Main" className="flex flex-1 flex-col justify-center px-(--gutter) py-10">
                <ul className="space-y-1">
                  {[{ label: 'Home', href: '/' }, ...nav.links].map((l) => (
                    <li key={l.href}>
                      <SheetClose asChild>
                        <Link href={l.href} aria-current={isCurrent(l.href) ? 'page' : undefined}
                          className="press t-section block py-1 aria-[current=page]:underline aria-[current=page]:decoration-(--color-accent) aria-[current=page]:decoration-[0.06em] aria-[current=page]:underline-offset-[0.12em] [font-size:clamp(2.75rem,13vw,4.5rem)]">{l.label}</Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>
              <p className="type-caption px-(--gutter) pb-8 text-(--color-muted)">{site.address.join(', ')}<br /><a href={`mailto:${site.email}`} className="underline underline-offset-4">{site.email}</a></p>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
