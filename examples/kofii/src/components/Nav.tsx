'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { lenisRef, useReducedMotionSafe } from '@/lib/motion'
import { navLinks, site } from '@/config/site'

const menuLinks = [{ href: '/', label: 'Home' }, ...navLinks, { href: '/order', label: 'Order online' }, { href: '/contact', label: 'Contact' }]
const ease = [0.65, 0, 0.35, 1] as const

// Full-screen menu: the bar is only the logo and "Menu"; it opens into huge links over the whole screen.
export function Nav() {
  const pathname = usePathname()
  const reduce = useReducedMotionSafe()
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const button = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      if (Math.abs(y - last) < 8) return
      setHidden(y > last && y > 120)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // While open: lock scroll, make the page behind inert, close on Escape, return focus on close.
  useEffect(() => {
    if (!open) return
    const behind = Array.from(document.body.children).filter((el) => el.tagName !== 'HEADER' && el.tagName !== 'SCRIPT') as HTMLElement[]
    behind.forEach((el) => (el.inert = true))
    document.documentElement.style.overflow = 'hidden'
    lenisRef.current?.stop()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    const btn = button.current
    requestAnimationFrame(() => panel.current?.querySelector<HTMLElement>('a')?.focus())
    return () => {
      behind.forEach((el) => (el.inert = false))
      document.documentElement.style.overflow = ''
      lenisRef.current?.start()
      window.removeEventListener('keydown', onKey)
      btn?.focus()
    }
  }, [open])

  const current = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))
  const chip = 'flex min-h-12 items-center rounded-[24px] border border-border bg-surface/75 px-6 backdrop-blur-md backdrop-saturate-150'

  return (
    <header>
      <div
        className={`fixed inset-x-0 top-4 z-[60] transition-transform duration-300 ease-out ${hidden && !open ? '-translate-y-[calc(100%+16px)]' : ''}`}
      >
        <div className="container-text flex items-center justify-between">
          <Link href="/" onClick={() => setOpen(false)} className={`${chip} text-xl font-extrabold tracking-[-0.03em]`}>
            KOFİİ
          </Link>
          <button ref={button} type="button" className={`${chip} font-semibold transition-colors duration-150 hover:bg-surface`} aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen((o) => !o)}>
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panel}
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-50 overflow-y-auto bg-background"
            initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={reduce ? { opacity: 0 } : { clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={reduce ? { duration: 0.2 } : { duration: 0.55, ease }}
          >
            <div className="container-text grid min-h-full gap-16 pb-32 pt-32 md:grid-cols-12 md:gap-6 md:pb-12">
              <nav aria-label="Main" className="md:col-span-8 md:self-center">
                <ul className="group/menu">
                  {menuLinks.map((l, i) => (
                    <li key={l.href} className="overflow-hidden">
                      <motion.div
                        initial={reduce ? false : { y: '105%' }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 + i * 0.06 }}
                      >
                        <Link
                          href={l.href}
                          onClick={() => setOpen(false)}
                          aria-current={current(l.href) ? 'page' : undefined}
                          className="flex min-h-12 items-center gap-4 text-[clamp(2.75rem,min(9vw,10vh),8rem)] font-extrabold leading-[0.95] tracking-[-0.045em] transition-opacity duration-150 group-hover/menu:opacity-40 hover:!opacity-100 focus-visible:!opacity-100 aria-[current=page]:text-primary"
                        >
                          {l.label}
                          {current(l.href) && <span aria-hidden className="h-3 w-3 shrink-0 rounded-full bg-accent" />}
                        </Link>
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </nav>
              <motion.aside
                className="grid content-end gap-8 md:col-span-4 md:col-start-9"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
              >
                <Link href="/reservations" onClick={() => setOpen(false)} className="btn min-h-14 text-lg">
                  Book a table
                </Link>
                <address className="not-italic">
                  {site.address.map((a) => <span key={a} className="block">{a}</span>)}
                  <a href={`mailto:${site.email}`} className="flex min-h-11 items-center underline">{site.email}</a>
                </address>
                <dl className="grid gap-1 text-muted">
                  {site.hours.map((h) => (
                    <div key={h.days}>
                      <dt className="inline">{h.days}: </dt>
                      <dd className="inline">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </motion.aside>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

// "Book a table" always one tap away on phones.
export function MobileBook() {
  const pathname = usePathname()
  if (pathname === '/reservations') return null
  return (
    <Link href="/reservations" className="btn fixed inset-x-4 bottom-4 z-40 min-h-14 md:hidden" style={{ marginBottom: 'env(safe-area-inset-bottom)' }}>
      Book a table
    </Link>
  )
}
