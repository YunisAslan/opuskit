'use client'
// Full-screen menu: a minimal bar (the wordmark and "Menu"), opening into a full-viewport sheet with display-size
// links one per line, the action, and the contact details. The sheet slides from the top on --ease-drawer and leaves
// the way it came; links land 40ms apart. Radix (shadcn Sheet) traps focus and returns it to "Menu" on close.
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, type CSSProperties } from 'react'
import { DrawnLink } from '@/components/pieces/DrawnLink'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { CopyEmail } from '@/components/site/CopyEmail'
import { menu, nav, site } from '@/content/site'

export function Wordmark({ className = '' }: { className?: string }) {
  return <span className={`font-(family-name:--font-display) leading-none [font-size:1.75rem] ${className}`}>{site.name}</span>
}

const current = (path: string, href: string) => (href === '/' ? path === '/' : path === href || path.startsWith(href + '/'))

export function Header() {
  const path = usePathname()
  const [open, setOpen] = useState(false)
  const bar = 'flex h-16 items-center justify-between px-(--gutter) pt-[env(safe-area-inset-top)] md:h-20'
  const label = 'type-utility press relative flex min-h-11 items-center gap-3 px-1'
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className={bar}>
        <Link href="/" aria-label={`${site.name}, home`} className="press flex min-h-11 items-center"><Wordmark /></Link>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className={label} aria-label="Open the menu">
            <MenuIcon open={false} />{menu.open}
          </SheetTrigger>
          <SheetContent side="top" full aria-describedby={undefined} className="overflow-y-auto overscroll-contain">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <div className={bar}>
              <SheetClose asChild><Link href="/" className="press flex min-h-11 items-center"><Wordmark /></Link></SheetClose>
              <SheetClose className={label}><MenuIcon open />{menu.close}</SheetClose>
            </div>
            <nav aria-label="Main" className="grid-site flex-1 content-center gap-y-12 px-(--gutter) py-12">
              <ul className="col-span-full lg:col-span-7 lg:col-start-2">
                {nav.map((l, i) => (
                  <li key={l.href} className="motion-safe:animate-[menu-in_200ms_steps(2)_both]" style={{ animationDelay: `${120 + i * 40}ms` } as CSSProperties}>
                    <SheetClose asChild>
                      <DrawnLink href={l.href} current={current(path, l.href)} className="type-display press py-1 [font-size:clamp(3.25rem,10vw,7rem)]">{l.label}</DrawnLink>
                    </SheetClose>
                  </li>
                ))}
              </ul>
              <div className="col-span-full flex flex-col gap-6 self-end lg:col-span-3 lg:col-start-10">
                <SheetDescription className="type-body text-(--color-muted)">{site.offer}</SheetDescription>
                <SheetClose asChild>
                  <Link href={menu.action.href} className="type-utility press inline-flex min-h-11 w-fit items-center rounded-(--radius-button) border border-(--color-primary) bg-(--color-primary) px-5 text-(--color-on-primary) transition-colors duration-150 hover:bg-(--color-background) hover:text-(--color-text)">{menu.action.label}</Link>
                </SheetClose>
                <div className="type-utility space-y-1 text-(--color-muted)">
                  <p className="text-(--color-text)">{menu.note}</p>
                  <CopyEmail className="type-utility" />
                  <p>{site.studio}</p>
                </div>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

/** Two pencil strokes that turn into a cross (200ms, --ease-in-out). */
function MenuIcon({ open }: { open: boolean }) {
  const line = 'absolute left-0 h-[2px] w-6 rounded-full bg-current transition-transform duration-200 ease-(--ease-in-out)'
  return (
    <span aria-hidden className="relative block h-3 w-6">
      <span className={`${line} top-0 ${open ? 'translate-y-[5px] rotate-[42deg]' : '-rotate-2'}`} />
      <span className={`${line} bottom-0 ${open ? '-translate-y-[5px] -rotate-[42deg]' : 'rotate-1'}`} />
    </span>
  )
}
