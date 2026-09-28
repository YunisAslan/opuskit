'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const links = [
  { href: '/collections', label: 'Collections' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/journal', label: 'Journal' },
]
const more = [
  { href: '/size-guide', label: 'Size guide' },
  { href: '/faq', label: 'FAQ' },
  { href: '/gift-cards', label: 'Gift cards' },
  { href: '/sign-in', label: 'Sign in' },
]

export default function Navigation() {
  const pathname = usePathname()
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      const hero = document.querySelector('[data-hero]')
      setSolid(!hero || hero.getBoundingClientRect().bottom < 64)
      setHidden(y > last && y > 120)
      last = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color] duration-300 ease-out ${
        hidden && !open ? '-translate-y-full' : ''
      } ${solid || open ? 'bg-background' : 'bg-transparent'}`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        <Link href="/" className="font-display text-2xl font-extrabold tracking-tight [font-stretch:150%]" aria-label="CHEEKY, home">
          CHEEKY
        </Link>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={pathname.startsWith(l.href) ? 'page' : undefined}
                className="py-3 hover:text-muted aria-[current=page]:text-accent"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/contact" className="text-link py-3">Start a conversation</Link>
          </li>
        </ul>
        <button
          type="button"
          className="-mr-3 flex h-11 min-w-11 items-center px-3 md:hidden"
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>
      {open && (
        <div id="menu" className="fixed inset-0 top-16 flex h-[calc(100svh-4rem)] flex-col justify-between overflow-y-auto bg-background px-6 pb-12 pt-8 md:hidden">
          <ul className="flex flex-col gap-2">
            {[...links, { href: '/contact', label: 'Contact' }].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={pathname.startsWith(l.href) ? 'page' : undefined}
                  className="type-heading block py-2 text-[2.5rem] [font-stretch:130%] aria-[current=page]:text-accent"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="grid grid-cols-2 gap-x-6">
            {more.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="flex min-h-11 items-center text-muted">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
