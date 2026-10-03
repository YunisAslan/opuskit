'use client'
// Menu — Classic bar: logo and the live status line left; links, the phone and the primary action right; sticky,
// on the page ground with a hairline, gaining the surface colour after 40px. Phones/tablets: a full-width sheet.
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useSyncExternalStore } from 'react'
import { Logo } from '@/components/Logo'
import { MotionSiteLink } from '@/components/SiteLink'
import { StatusLine } from '@/components/StatusLine'
import { UnderlineFill } from '@/components/pieces/UnderlineFill'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { site } from '@/config/site'

const onScroll = (cb: () => void) => { window.addEventListener('scroll', cb, { passive: true }); return () => window.removeEventListener('scroll', cb) }

export function Header() {
  const pathname = usePathname()
  const scrolled = useSyncExternalStore(onScroll, () => window.scrollY > 40, () => false)
  const [open, setOpen] = useState(false)
  const links = site.nav.map((l) => ({ ...l, current: pathname === l.href }))

  return (
    <header className={`sticky top-0 z-40 h-(--header-h) border-b border-(--color-border) transition-colors duration-150 ${scrolled ? 'bg-(--color-surface)' : 'bg-(--color-background)'}`}>
      <div className="flex h-full items-center justify-between gap-6 px-[5vw]">
        <div className="flex min-w-0 flex-col gap-1 md:flex-row md:items-center md:gap-8">
          <Link href="/" aria-label="Hane, home"><Logo /></Link>
          <StatusLine />
        </div>
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          <ul className="type-utility flex gap-5">
            {links.map((l) => (
              <li key={l.href}><UnderlineFill href={l.href} link={MotionSiteLink} current={l.current} className={l.current ? '' : 'opacity-75 hover:opacity-100'}>{l.label}</UnderlineFill></li>
            ))}
          </ul>
          <UnderlineFill href={site.tel} className="type-utility">{site.phone}</UnderlineFill>
          <Button asChild><Link href={site.book.href}>{site.book.label}</Link></Button>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild><Button variant="ghost" className="-mr-3 lg:hidden">Menu</Button></SheetTrigger>
          <SheetContent side="top" className="gap-0 border-(--color-border) bg-(--color-background) px-[5vw] pb-10 pt-6">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <Logo />
            <nav aria-label="Main" onClick={(e) => (e.target as HTMLElement).closest('a') && setOpen(false)}>
              <ul className="type-heading mt-10 space-y-4 [font-size:2rem]">
                {links.map((l) => <li key={l.href}><UnderlineFill href={l.href} link={MotionSiteLink} current={l.current}>{l.label}</UnderlineFill></li>)}
              </ul>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Button asChild><Link href={site.book.href}>{site.book.label}</Link></Button>
                <UnderlineFill href={site.tel} className="type-body">{site.phone}</UnderlineFill>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
