'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import RollLabel from './RollLabel'
import Logo from './Logo'

export const navLinks = [
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
]

export default function Navigation() {
  const pathname = usePathname()
  const [hidden, setHidden] = useState(false)
  const [overFilm, setOverFilm] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > last && y > 96)
      last = y
      const hero = document.getElementById('film-hero')
      setOverFilm(!!hero && hero.getBoundingClientRect().bottom > 80)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
  }, [open])

  const film = overFilm && !open
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,color] duration-150 ease-out motion-reduce:transition-none ${
        hidden && !open ? '-translate-y-full' : 'translate-y-0'
      } ${film ? 'bg-transparent text-background' : 'bg-background text-text border-b border-border'}`}
    >
      <nav aria-label="Main" className="flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex min-h-11 items-center" aria-label="Keepers home">
          <Logo />
        </Link>
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={pathname === l.href ? 'page' : undefined}
                aria-label={l.label}
                className="type-utility flex min-h-11 items-center text-lg uppercase aria-[current=page]:underline aria-[current=page]:underline-offset-4"
              >
                <RollLabel>{l.label}</RollLabel>
              </Link>
            </li>
          ))}
          <li>
            <Link href="/pricing" className={`btn ${film ? 'bg-background text-text hover:bg-surface' : 'btn-primary'}`}>
              Pre-order
            </Link>
          </li>
        </ul>
        <button
          type="button"
          className="type-utility flex min-h-11 min-w-11 items-center justify-end text-lg uppercase md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>
      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-16 flex flex-col justify-between overflow-y-auto bg-background px-4 pb-8 pt-6 text-text md:hidden">
          <ul className="border-t border-border">
            {[...navLinks, { href: '/contact', label: 'Contact' }].map((l) => (
              <li key={l.href} className="border-b border-border">
                <Link href={l.href} className="type-display block py-3 text-[3.5rem]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/pricing" className="btn btn-primary mt-8 w-full">
            Pre-order, from €12
          </Link>
        </div>
      )}
    </header>
  )
}
