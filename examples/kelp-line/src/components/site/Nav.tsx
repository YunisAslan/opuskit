'use client'
// Menu — Floating pill: a centred, rounded capsule (max 720px) floating 16px from the top: logo, links, one action, on
// a translucent surface with backdrop blur. It tucks away while you read (scrolling down) and returns when you scroll
// up; the active link has a sliding highlight. Phones: logo + menu button; the menu expands inside the capsule — the
// capsule's clip opens downward on --ease-drawer, the icon's two lines turn into a close.
import { useReduced } from '@/components/motion/useReduced'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { nav } from '@/content/site'
import { cn } from '@/lib/utils'
import { Logo } from './Logo'

export function Nav() {
  const path = usePathname()
  const reduce = useReduced()
  const [hidden, setHidden] = useState(false)
  // the phone menu belongs to the page it was opened on: moving to another page closes it
  const [openOn, setOpenOn] = useState<string | null>(null)
  const open = openOn === path
  const setOpen = (o: boolean | ((o: boolean) => boolean)) => setOpenOn((typeof o === 'function' ? o(open) : o) ? path : null)
  const last = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const down = y > last.current + 4, up = y < last.current - 4
      if (y < 120 || up) setHidden(false)
      else if (down) setHidden(true)
      if (down || up) last.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenOn(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const tucked = hidden && !open
  const isActive = (href: string) => path === href || path.startsWith(href + '/')

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-[calc(16px+env(safe-area-inset-top,0px))]">
      <div
        className={cn(
          'pointer-events-auto mx-auto max-w-[720px] transition-[transform,opacity] duration-300 ease-(--ease-out)',
          tucked && (reduce ? 'pointer-events-none opacity-0' : '-translate-y-[calc(100%+24px)]'),
        )}
      >
        <nav
          aria-label="Main"
          className="nav-capsule relative rounded-[28px] border border-transparent md:border-(--color-border)/70 bg-(--frost) backdrop-blur-xl backdrop-saturate-150 md:rounded-full"
          data-open={open ? '' : undefined}
        >
          <div className="flex h-14 items-center justify-between gap-2 pl-5 pr-1.5">
            <Link href="/" aria-current={path === '/' ? 'page' : undefined} className="press -my-2 flex h-11 items-center decoration-1 underline-offset-4 focus-visible:underline" onClick={() => setOpen(false)}>
              <Logo />
            </Link>
            <ul className="hidden items-center md:flex">
              {nav.links.map((l) => (
                <li key={l.href} className="relative">
                  {isActive(l.href) && (
                    <motion.span layoutId="nav-active" aria-hidden className="absolute inset-0 rounded-(--radius-button) bg-(--color-secondary)" transition={reduce ? { duration: 0 } : { duration: 0.25, ease: [0.77, 0, 0.175, 1] }} />
                  )}
                  <Link href={l.href} aria-current={isActive(l.href) ? 'page' : undefined} className={cn('type-utility press relative flex h-10 items-center rounded-(--radius-button) px-3.5 transition-colors hover:text-(--color-text) focus-visible:bg-(--color-surface)', isActive(l.href) ? 'text-(--color-text)' : 'text-(--color-muted)')}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-1">
              <Link href={nav.action.href} aria-current={isActive(nav.action.href) ? 'page' : undefined} className="type-utility press hidden h-10 items-center rounded-(--radius-button) bg-(--color-primary) px-4 text-(--color-background) hover:bg-(--color-muted) focus-visible:bg-(--color-muted) md:flex">
                {nav.action.label}
              </Link>
              <button
                type="button"
                aria-expanded={open}
                aria-controls="nav-panel"
                aria-label={open ? 'Close menu' : 'Open menu'}
                onClick={() => setOpen((o) => !o)}
                className="press grid size-11 place-items-center rounded-full hover:bg-(--color-secondary) focus-visible:bg-(--color-secondary) md:hidden"
              >
                <span aria-hidden className="relative block h-3 w-5">
                  <span className={cn('absolute left-0 h-px w-full bg-current transition-transform duration-200 ease-(--ease-in-out)', open ? 'top-1/2 rotate-45' : 'top-0')} />
                  <span className={cn('absolute left-0 h-px w-full bg-current transition-transform duration-200 ease-(--ease-in-out)', open ? 'top-1/2 -rotate-45' : 'bottom-0')} />
                </span>
              </button>
            </div>
          </div>
          {/* phone menu — inside the capsule */}
          <div id="nav-panel" inert={!open} className="nav-panel md:hidden">
            <ul className="border-t border-(--color-border) px-5 pb-2 pt-3">
              {nav.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} aria-current={isActive(l.href) ? 'page' : undefined} className="type-title press link-quiet flex min-h-12 items-center justify-between aria-[current=page]:text-(--color-text)">
                    {l.label}
                    {isActive(l.href) && <span aria-hidden className="size-1.5 rounded-full bg-(--color-accent)" />}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="px-3 pb-3">
              <Link href={nav.action.href} className="type-utility press flex h-12 items-center justify-center rounded-(--radius-button) bg-(--color-primary) text-(--color-background) focus-visible:bg-(--color-muted)">
                {nav.action.label}
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
