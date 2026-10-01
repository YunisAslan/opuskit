'use client'
// Menu — Floating pill: a centred capsule (max 720px) 16px from the top — logo, links, one action — on a translucent
// surface with backdrop blur, the live status line beneath it. Hides on scroll down, returns on scroll up; the active
// link has a sliding highlight. Mobile: logo + menu button; the menu expands inside the capsule.
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { TextScramble } from '@/components/pieces/TextScramble'
import { Button } from '@/components/ui/button'
import { nav } from '@/content/site'
import { Logo } from './Logo'
import { startSignup } from './SiteLink'
import { StatusLine } from './StatusLine'

export function Nav() {
  const path = usePathname()
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > 160 && y > prev)
  })
  useEffect(() => setOpen(false), [path])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [open])

  const start = () => { setOpen(false); startSignup() }

  return (
    <motion.header className="fixed inset-x-0 top-4 z-50 flex flex-col items-center gap-2 px-4"
      animate={{ y: hidden && !open ? '-160%' : '0%' }} transition={reduce ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
      <nav aria-label="Main" className={`w-full max-w-[720px] border border-(--color-border) bg-(--color-surface)/75 backdrop-blur-md transition-[border-radius] duration-200 ${open ? 'rounded-(--radius-card)' : 'rounded-full'}`}>
        <div className="flex h-14 items-center justify-between gap-4 pl-5 pr-2">
          <Link href="/" aria-label="Hexmint, home" className="shrink-0"><Logo /></Link>
          <ul className="hidden items-center sm:flex">
            {nav.map((l) => {
              const active = path === l.href
              return (
                <li key={l.href} className="relative">
                  {active && <motion.span layoutId="nav-active" aria-hidden className="absolute inset-0 rounded-full bg-(--color-secondary)" transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 34 }} />}
                  <Link href={l.href} aria-current={active ? 'page' : undefined} className="type-utility relative flex h-11 items-center px-4 text-(--color-text)">
                    <TextScramble>{l.label}</TextScramble>
                  </Link>
                </li>
              )
            })}
          </ul>
          <Button onClick={start} aria-haspopup="dialog" className="hidden rounded-full sm:inline-flex">Start free</Button>
          <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu"
            className="type-utility flex h-11 items-center rounded-full px-4 text-(--color-text) sm:hidden">
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
        {open && (
          <motion.div id="mobile-menu" className="px-3 pb-3 sm:hidden" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
            <ul className="border-t border-(--color-border) py-2">
              {nav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} aria-current={path === l.href ? 'page' : undefined}
                    className="type-heading flex h-14 items-center px-2 aria-[current=page]:text-(--color-muted)">{l.label}</Link>
                </li>
              ))}
            </ul>
            <Button onClick={start} aria-haspopup="dialog" size="lg" className="w-full">Start free</Button>
          </motion.div>
        )}
      </nav>
      <StatusLine className="rounded-full bg-(--color-background)/60 px-3 py-1 text-(--color-muted) backdrop-blur-sm" />
    </motion.header>
  )
}
