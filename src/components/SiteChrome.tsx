'use client'
// The site's frame: a hairline bar with mono labels on top, ruled columns at the bottom ending on the name set wide —
// the structure is visible, like an instrument panel. The Collection and its way on (Build my site) sit at the right.
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'
import { useCollection } from '@/lib/collection'
import { BuildButton, CollectionSheet } from '@/app/library/parts'

const NAV = [
  { href: '/library', label: 'Library' },
  { href: '/examples', label: 'Examples' },
  { href: '/saved', label: 'Saved' },
]

export function Header() {
  const path = usePathname()
  const [open, setOpen] = useState(false)
  // The Collection is the way on once something is in it; until then the button starts the road.
  const n = useCollection().items.length

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1440px] items-stretch border-x border-line">
        <Link href="/" className="flex items-center border-r border-line px-5 text-[1.15rem] transition-colors hover:bg-paper-2 md:px-6 [&_svg]:transition-transform [&_svg]:duration-500 hover:[&_svg]:-rotate-12" aria-label="OpusKit home"><Logo /></Link>
        <nav aria-label="Main" className="hidden items-center gap-1 px-4 md:flex">
          {NAV.map((x) => (
            <Link key={x.href} href={x.href} aria-current={path.startsWith(x.href) ? 'page' : undefined}
              className="label px-2.5 py-1.5 text-ink-2! transition-colors hover:bg-paper-2 hover:text-ink! aria-[current=page]:bg-ink aria-[current=page]:text-paper!">{x.label}</Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 px-3 md:px-4">
          <ThemeToggle />
          {/* One Collection for every screen size (two would open two sheets). */}
          <CollectionSheet />
          {n ? <BuildButton /> : null}
        </div>
        {!n && <Link href="/library" className="label hidden items-center bg-ink px-6 text-paper! transition-colors hover:bg-ink-2 md:flex">Start a site</Link>}
        <button className="border-l border-line px-4 md:hidden" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>
          <span className="sr-only">Menu</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">{open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 9h18M3 15h18" />}</svg>
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-line px-5 pb-8 pt-2 md:hidden">
          {NAV.map((x) => (
            <Link key={x.href} href={x.href} onClick={() => setOpen(false)} className="display block border-b border-line py-4 text-3xl transition-[color,padding] hover:pl-2 hover:text-pencil">{x.label}</Link>
          ))}
          <Link href="/library" onClick={() => setOpen(false)} className="btn btn-ink mt-6 w-full">Start a site</Link>
        </nav>
      )}
    </header>
  )
}

const COLUMNS: [string, [string, string][]][] = [
  ['Make', [['/library', 'Library'], ['/studio/you', 'Your site'], ['/studio/direction', 'Directions']]],
  ['See', [['/examples', 'Examples'], ['/#how', 'How it works'], ['/#package', 'The Build Package']]],
  ['Yours', [['/saved', 'Saved recipes']]],
]

export function Footer() {
  return (
    <footer className="mt-auto overflow-x-clip">
      <div className="xm mx-auto max-w-[1440px] border-x border-t border-line">
        <div className="grid md:grid-cols-[2fr_1fr_1fr_1fr]">
          <p className="border-line p-6 text-ink-2 max-md:border-b md:p-8"><span className="block max-w-xs">Pick sites you like. Get your own — built by your AI tool.</span></p>
          {COLUMNS.map(([title, links]) => (
            <div key={title} className="border-line p-6 max-md:border-b md:border-l md:p-8">
              <p className="label">{title}</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {links.map(([href, label]) => <li key={href}><Link href={href} className="ulink text-ink-2 hover:text-ink">{label}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>
        {/* The name, wide and heavy across the page — the last thing it says. */}
        <p aria-hidden className="wordmark select-none overflow-hidden border-t border-line px-4 pb-2 pt-10 text-center text-[clamp(3rem,17.2vw,15.8rem)] md:pt-14">OpusKit</p>
        <div className="flex flex-wrap justify-between gap-2 border-t border-line px-6 py-4 md:px-8">
          <span className="label">© {new Date().getFullYear()} OpusKit</span>
          <span className="label">Study the principle · build something original</span>
        </div>
      </div>
    </footer>
  )
}
