'use client'
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useUser } from '@/features/auth'
import { directions } from '@/data/taxonomy'
import { planSummary, usePlan } from '@/lib/kit'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { Logo, Symbol } from './Logo'

const NAV = [
  { href: '/explore', label: 'Explore' },
  { href: '/examples', label: 'Examples' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/saved', label: 'Saved' },
]

export function Header() {
  const path = usePathname()
  const user = useUser()
  const [open, setOpen] = useState(false)
  if (path.startsWith('/create')) return null // the creator is a focused, full-screen flow

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-8">
        <Link href="/" className="text-[1.35rem]" aria-label="OpusKit home"><Logo /></Link>
        <nav aria-label="Main" className="hidden items-center gap-7 text-[0.95rem] md:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={path.startsWith(n.href) ? 'page' : undefined} className="text-ink-2 hover:text-ink aria-[current=page]:text-ink aria-[current=page]:underline underline-offset-8">{n.label}</Link>
          ))}
          <Link href={user ? '/account' : '/login'} className="text-ink-2 hover:text-ink">{user ? user.name : 'Log in'}</Link>
          <KitBag />
          <Link href="/create" className="btn btn-ink btn-sm">Create your recipe</Link>
        </nav>
        <div className="flex items-center gap-1 md:hidden"><KitBag />
        <button className="-mr-2 p-2" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>
          <span className="sr-only">Menu</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">{open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 8h18M3 16h18" />}</svg>
        </button></div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-line px-5 pb-8 pt-4 md:hidden">
          {[...NAV, { href: user ? '/account' : '/login', label: user ? 'Account' : 'Log in' }].map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="block border-b border-line py-4 text-2xl font-medium tracking-tight">{n.label}</Link>
          ))}
          <Link href="/create" onClick={() => setOpen(false)} className="btn btn-ink mt-6 w-full">Create your recipe</Link>
        </nav>
      )}
    </header>
  )
}

/** The kit bag: the site planned from the showcase. Empty → go to the showcase; otherwise open the plan. */
const n = (k: number, word: string) => k > 0 && `${k} ${word}${k > 1 ? 's' : ''}`

function KitBag() {
  const path = usePathname()
  const plan = usePlan()
  const { count, pages, sections, pieces } = planSummary(plan)
  const summary = count ? [plan.direction && directions[plan.direction].name, n(pages, 'page'), n(sections, 'section'), n(pieces, 'ready piece')].filter(Boolean).join(' · ') || `${count} items` : 'Empty — plan a site from the showcase'
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href="/kit" aria-label={`Kit bag${count ? `, ${count} items` : ', empty'}`} aria-current={path.startsWith('/kit') ? 'page' : undefined}
          className="relative grid size-10 place-items-center rounded-full text-ink-2 hover:bg-white hover:text-ink aria-[current=page]:text-ink">
          <ShoppingBag size={20} strokeWidth={1.6} aria-hidden />
          {count > 0 && <span aria-hidden className="absolute -right-0.5 -top-0.5 grid min-w-4.5 place-items-center rounded-full bg-pencil px-1 text-[11px] leading-[18px] tabular-nums text-white">{count}</span>}
        </Link>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="text-center"><span className="block font-medium">Kit bag</span><span className="block opacity-80">{summary}</span></TooltipContent>
    </Tooltip>
  )
}

export function Footer() {
  const path = usePathname()
  if (path.startsWith('/create')) return null
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 md:grid-cols-[2fr_1fr_1fr_1fr] md:px-8">
        <div>
          <Symbol className="h-10 w-auto" />
          <p className="mt-5 max-w-xs text-muted">From inspiration to implementation. Design recipes you can build with any AI tool.</p>
        </div>
        <FooterCol title="Product" links={[['/create', 'Create a recipe'], ['/explore', 'Explore recipes'], ['/examples', 'Examples'], ['/kit', 'Kit showcase'], ['/pricing', 'Pricing']]} />
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
