'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { DrawnLink } from '@/components/pieces/DrawnLink'
import { Logo } from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { site } from '@/config/site'

// Floating pill: a centred capsule 16px from the top; tucks away on scroll down, returns on scroll up.
// Mobile: logo + menu button, the menu opens inside the capsule.
export function Nav() {
  const path = usePathname()
  const reduce = useReducedMotion()
  const [hidden, setHidden] = useState(false)
  const [menuAt, setMenuAt] = useState<string | null>(null)
  const open = menuAt === path // closes itself on navigation
  const active = site.nav.find((l) => path.startsWith(l.href))?.href

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => { const y = window.scrollY; setHidden(y > last && y > 160); last = y }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = (mobile: boolean) => site.nav.map((l) => (
    <li key={l.href} className="relative">
      {!mobile && active === l.href && <motion.span layoutId="nav-active" aria-hidden className="absolute inset-0 rounded-full bg-(--color-secondary)" transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }} />}
      <DrawnLink link={Link} href={l.href} current={active === l.href} className={mobile ? 'type-heading py-2.5 [font-size:1.5rem]' : 'type-utility relative px-3.5 leading-[44px]'}>{l.label}</DrawnLink>
    </li>
  ))

  return (
    <header className={`fixed inset-x-0 top-4 z-50 px-4 transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-opacity ${hidden && !open ? '-translate-y-[160%] motion-reduce:translate-y-0 motion-reduce:opacity-0 pointer-events-none' : ''}`}>
      <nav aria-label="Main" className={`mx-auto max-w-[720px] border border-(--color-border) bg-(--color-surface)/70 backdrop-blur-md ${open ? 'rounded-[28px]' : 'rounded-full'}`}>
        <div className="flex h-14 items-center justify-between gap-4 pl-5 pr-1.5">
          <Link href="/" aria-label="Yunis Aslanov, home" className="flex h-11 items-center"><Logo /></Link>
          <ul className="hidden items-center sm:flex">{links(false)}</ul>
          <Button asChild className="type-utility text-(length:--type-utility-size) hidden h-11 rounded-full px-5 sm:inline-flex"><Link href="/contact">Say hello</Link></Button>
          <button type="button" aria-expanded={open} aria-controls="menu" onClick={() => setMenuAt(open ? null : path)} className="type-utility h-11 rounded-full px-5 sm:hidden">
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
        {open && (
          <div id="menu" className="px-5 pb-5 sm:hidden">
            <ul className="flex flex-col items-start border-t border-(--color-border) pt-3">{links(true)}</ul>
            <Button asChild className="mt-4 h-12 w-full rounded-full"><Link href="/contact">Say hello</Link></Button>
          </div>
        )}
      </nav>
    </header>
  )
}
