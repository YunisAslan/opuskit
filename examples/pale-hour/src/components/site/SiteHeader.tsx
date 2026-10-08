'use client'
// Menu — Centered logo. Links left, the name centred, today's hours and the action right. Generous at the top of the
// page, it shrinks to a compact bar after 80px (transform only: the bar's ground scales, the row and the name move).
// On Home it starts over the photograph, its ink type on the hero's pale wash. Phones: menu button left, name centred,
// action right; the menu opens as a sheet from the left.
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { nav, site } from '@/content/site'
import { Logo } from './Logo'
import { OpenStatus } from './OpenStatus'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const path = usePathname()
  const [compact, setCompact] = useState(false)
  useEffect(() => {
    const on = () => setCompact(window.scrollY > 80)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const over = path === '/' && !compact
  const current = (href: string) => (path === href || (href !== '/' && path.startsWith(href)) ? 'page' : undefined)

  return (
    <header
      style={{ background: 'transparent', viewTransitionName: 'site-header' }}
      className="fixed inset-x-0 top-0 z-50 h-(--header-h) text-(--color-text) transition-colors duration-300 max-md:h-[72px]"
    >
      {/* The bar's ground: full height at the top, scaled down to the compact height after 80px */}
      <div aria-hidden className={cn(
        'absolute inset-x-0 top-0 h-full origin-top border-b bg-(--color-background) transition-[transform,opacity,border-color] duration-500 ease-(--ease-page) motion-reduce:transition-none',
        compact ? 'scale-y-[0.615] border-(--color-border) max-md:scale-y-[0.84]' : 'border-transparent',
        over && 'opacity-0',
      )} />
      <div className={cn(
        'relative mx-auto grid h-full max-w-(--container) grid-cols-[1fr_auto_1fr] items-center px-(--gutter) transition-transform duration-500 ease-(--ease-page) motion-reduce:transition-none',
        compact && '-translate-y-5 max-md:-translate-y-[6px]',
      )}>
        <nav aria-label="Main" className="type-utility hidden items-center gap-8 md:flex">
          {nav.left.map((l) => (
            <Link key={l.href} href={l.href} aria-current={current(l.href)} className="link inline-flex min-h-11 items-center">{l.label}</Link>
          ))}
        </nav>

        {/* Phone menu */}
        <Sheet>
          <SheetTrigger className="type-utility -ml-3 inline-flex min-h-11 cursor-pointer items-center px-3 md:hidden">{nav.menu}</SheetTrigger>
          <SheetContent side="left" className="px-(--gutter) pb-8 pt-5">
            <div className="flex items-center justify-between">
              <SheetTitle asChild><p><Logo className="text-2xl" /></p></SheetTitle>
              <SheetClose className="type-utility -mr-3 min-h-11 cursor-pointer px-3">{nav.close}</SheetClose>
            </div>
            <nav aria-label="Main" className="mt-16 flex flex-col border-t border-(--color-border)">
              {[{ label: 'Home', href: '/' }, ...nav.left].map((l) => (
                <SheetClose asChild key={l.href}>
                  <Link href={l.href} aria-current={current(l.href) ?? (l.href === '/' && path === '/' ? 'page' : undefined)}
                    className="type-display link border-b border-(--color-border) py-4 [font-size:2.75rem]">{l.label}</Link>
                </SheetClose>
              ))}
            </nav>
            <SheetDescription asChild>
              <div className="type-caption mt-auto space-y-1 pt-12 text-(--color-muted)">
                <OpenStatus mark className="text-(--color-text)" />
                <p>{site.address.lines.join(', ')}</p>
                <a href={site.mapUrl} target="_blank" rel="noreferrer" className="link-on inline-flex min-h-11 items-center text-(--color-text)">Get directions</a>
              </div>
            </SheetDescription>
          </SheetContent>
        </Sheet>

        <Link href="/" aria-label={nav.home} className={cn('justify-self-center transition-transform duration-500 ease-(--ease-page) motion-reduce:transition-none', compact ? 'scale-[0.8]' : 'scale-100')}>
          <Logo className="text-[1.6rem] md:text-[2.125rem]" />
        </Link>

        <div className="type-utility flex items-center justify-end gap-8">
          <OpenStatus mark className="hidden lg:inline-flex" />
          <Link href={nav.action.href} aria-current={current(nav.action.href)} className="link inline-flex min-h-11 items-center md:hidden">{nav.action.short}</Link>
          <Link href={nav.action.href}
            className={cn('hidden min-h-11 items-center border px-5 transition-colors duration-150 md:inline-flex',
              over ? 'border-current hover:bg-(--color-text) hover:text-(--color-background)' : 'border-(--color-text) bg-(--color-text) text-(--color-background) hover:bg-transparent hover:text-(--color-text) focus-visible:bg-transparent focus-visible:text-(--color-text)')}>
            {nav.action.label}
          </Link>
        </div>
      </div>
    </header>
  )
}
