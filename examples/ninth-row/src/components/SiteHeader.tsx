'use client'
// Menu — Centered logo. Desktop: Programme and Tickets left, the wordmark centred, Visit, About and the Book action
// right. Generous at the top of the page, it settles into a compact bar after 80 px (transform and opacity only).
// Phones: the menu word-button left, the wordmark centred, Book right; the menu is a sheet sliding from the left under
// the bar, its two lines turning into a close.
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { nav, site } from '@/content/site'
import { Logo } from './Logo'
import { Sheet, SheetContent, SheetTitle } from './ui/sheet'
import { cn } from '@/lib/utils'

const all = [...nav.left, ...nav.right]

export function SiteHeader() {
  const path = usePathname()
  const [compact, setCompact] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const on = () => setCompact(window.scrollY > 80)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  // a new page closes the menu (state adjusted while rendering)
  const [seen, setSeen] = useState(path)
  if (seen !== path) { setSeen(path); setOpen(false) }
  const tight = compact || open
  const current = (href: string) => (path === href || path.startsWith(href + '/') ? 'page' : undefined)
  const link = (l: { label: string; href: string }) => (
    <Link key={l.href} href={l.href} aria-current={current(l.href)} className="press link-line type-utility text-base">{l.label}</Link>
  )

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[80] pt-[env(safe-area-inset-top,0px)]">
        {/* the bar's ground: a soft scrim over the film at the top, a solid ground with a hairline once compact */}
        <div aria-hidden className={cn('absolute inset-x-0 top-0 h-40 bg-linear-to-b from-(--color-background)/80 to-transparent transition-opacity duration-300', tight ? 'opacity-0' : 'opacity-100')} />
        <div aria-hidden className={cn('absolute inset-0 border-b border-(--color-border) bg-(--color-background)/92 backdrop-blur-sm transition-opacity duration-300', tight ? 'opacity-100' : 'opacity-0')} />
        <div className={cn('relative mx-auto grid h-16 max-w-[calc(var(--container)+2*var(--gutter))] grid-cols-[1fr_auto_1fr] items-center px-(--gutter) transition-transform duration-300 ease-(--ease-out) motion-reduce:transition-none', !tight && 'md:translate-y-4')}>
          {/* left */}
          <nav aria-label="Main" className="hidden items-center gap-8 md:flex">{nav.left.map(link)}</nav>
          <button
            type="button"
            className="press type-utility -ml-3 flex min-h-11 items-center gap-3 px-3 text-base md:hidden"
            aria-expanded={open}
            aria-controls="phone-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span aria-hidden className="relative block h-3 w-5">
              <span className={cn('absolute left-0 h-px w-5 bg-current transition-transform duration-200 ease-(--ease-in-out) motion-reduce:transition-none', open ? 'top-1.5 rotate-45' : 'top-0.5')} />
              <span className={cn('absolute left-0 h-px w-5 bg-current transition-transform duration-200 ease-(--ease-in-out) motion-reduce:transition-none', open ? 'top-1.5 -rotate-45' : 'top-2.5')} />
            </span>
            <span>{open ? nav.menuClose : nav.menuOpen}</span>
          </button>
          {/* centre */}
          <Link href="/" aria-label="Ninth Row, home" className="press justify-self-center">
            <Logo className={cn('block origin-center text-[2rem] transition-transform duration-300 ease-(--ease-out) motion-reduce:transition-none', !tight && 'md:scale-[1.5]')} />
          </Link>
          {/* right */}
          <div className="flex items-center justify-end gap-8">
            <nav aria-label="More" className="hidden items-center gap-8 md:flex">{nav.right.map(link)}</nav>
            <Link href={nav.action.href} className="press type-utility -mr-3 flex min-h-11 items-center border border-transparent px-3 text-base md:mr-0 md:border-(--color-text) md:px-4 md:hover:bg-(--color-text) md:hover:text-(--color-background) md:transition-[background-color,color] md:duration-150 focus-visible:bg-(--color-secondary)">
              <span className="md:hidden">Book</span><span className="hidden md:inline">{nav.action.label}</span>
            </Link>
          </div>
        </div>
      </header>

      <Sheet open={open} onOpenChange={setOpen} modal={false} disablePointerDismissal>
        <SheetContent id="phone-menu" side="left" className="top-[calc(4rem+env(safe-area-inset-top,0px))]! h-auto! border-r-0 px-(--gutter) pt-12 pb-[max(32px,env(safe-area-inset-bottom,0px))] md:hidden">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <nav aria-label="Phone" className="flex flex-col">
            {[{ label: 'Home', href: '/' }, ...all].map((l) => (
              <Link key={l.href} href={l.href} aria-current={path === l.href ? 'page' : undefined} className="press type-display block py-1 text-[clamp(3.5rem,17vw,5rem)] text-(--color-text) aria-[current=page]:text-(--color-muted)">
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto space-y-4">
            <Link href={nav.action.href} className="btn btn-solid w-full">{nav.action.label}</Link>
            <p className="type-caption text-(--color-muted)">{site.address.street}, {site.address.city}<br /><a className="link-line" href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a></p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
