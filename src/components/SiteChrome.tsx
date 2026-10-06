'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useUser } from '@/features/auth'
import { Logo, Symbol } from './Logo'
import { useCollection } from '@/lib/collection'
import { BuildButton, CollectionSheet } from '@/app/library/parts'

const NAV = [
  { href: '/library', label: 'Library' },
  { href: '/examples', label: 'Examples' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/saved', label: 'Saved' },
]

export function Header() {
  const path = usePathname()
  const user = useUser()
  const [open, setOpen] = useState(false)
  // The Collection is the way on once something is in it; until then the button starts the road.
  const n = useCollection().items.length

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-8">
        <Link href="/" className="text-[1.35rem]" aria-label="OpusKit home"><Logo /></Link>
        <div className="flex items-center gap-2 md:gap-7">
          <nav aria-label="Main" className="hidden items-center gap-7 text-[0.95rem] md:flex">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} aria-current={path.startsWith(n.href) ? 'page' : undefined} className="text-ink-2 hover:text-ink aria-[current=page]:text-ink aria-[current=page]:underline underline-offset-8">{n.label}</Link>
            ))}
            <Link href={user ? '/account' : '/login'} className="text-ink-2 hover:text-ink">{user ? user.name : 'Log in'}</Link>
          </nav>
          {/* One Collection for every screen size (two would open two sheets). */}
          <CollectionSheet />
          {/* The cart and its checkout: once something is collected, the one way on sits next to it. */}
          {n ? <BuildButton /> : <span className="hidden md:block"><Link href="/library" className="btn btn-ink btn-sm">Start a site</Link></span>}
          <button className="-mr-2 p-2 md:hidden" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>
            <span className="sr-only">Menu</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">{open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 8h18M3 16h18" />}</svg>
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-line px-5 pb-8 pt-4 md:hidden">
          {[...NAV, { href: user ? '/account' : '/login', label: user ? 'Account' : 'Log in' }].map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="block border-b border-line py-4 text-2xl font-medium tracking-tight">{n.label}</Link>
          ))}
          <Link href="/library" onClick={() => setOpen(false)} className="btn btn-ink mt-6 w-full">Start a site</Link>
        </nav>
      )}
    </header>
  )
}

export function Footer() {
  const path = usePathname()
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 md:grid-cols-[2fr_1fr_1fr_1fr] md:px-8">
        <div>
          <Symbol className="h-10 w-auto" />
          <p className="mt-5 max-w-xs text-muted">From inspiration to implementation. Design recipes you can build with any AI tool.</p>
        </div>
        <FooterCol title="Product" links={[['/library', 'Library'], ['/examples', 'Examples'], ['/kit', 'Kit'], ['/pricing', 'Pricing']]} />
        <FooterCol title="Library" links={[['/resources', 'Resources'], ['/explore?tab=references', 'References'], ['/explore?tab=styles', 'Styles']]} />
        <FooterCol title="You" links={[['/saved', 'Saved recipes'], ['/account', 'Account']]} />
      </div>
      <div className="mx-auto flex max-w-[1440px] justify-between px-5 pb-8 text-sm text-muted md:px-8">
        <span>© {new Date().getFullYear()} OpusKit</span>
        <span>Study the principle. Build something original.</span>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h2 className="text-sm text-muted">{title}</h2>
      <ul className="mt-3 space-y-2">{links.map(([h, l]) => <li key={h}><Link className="hover:text-pencil" href={h}>{l}</Link></li>)}</ul>
    </div>
  )
}
