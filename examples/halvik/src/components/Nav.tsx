'use client'
// Menu — Floating pill: a centred capsule (max 720px) 16px from the top — logo, links, one action — translucent with a
// backdrop blur. Tucks away while you scroll down, returns when you scroll up. The current page's link sits on a
// highlight that slides between links. Mobile: logo + menu button; the menu opens inside the capsule.
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Logo } from '@/components/Logo'
import { MotionSiteLink, SiteLink } from '@/components/SiteLink'
import { BuyButton } from '@/components/Buy'
import { Button } from '@/components/ui/button'
import { UnderlineFill } from '@/components/pieces/UnderlineFill'

export const NAV = [
  { label: 'Overview', href: '/' },
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Contact', href: '/contact' },
]

export function Nav() {
  const path = usePathname()
  const reduce = useReducedMotion()
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(!open && y > 160 && y > prev)
  })

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <motion.nav aria-label="Main" animate={{ y: hidden ? -96 : 0 }} transition={reduce ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`w-full max-w-[720px] border border-(--color-border) bg-(--color-surface)/75 backdrop-blur-md transition-[border-radius] duration-200 ${open ? 'rounded-(--radius-card)' : 'rounded-full'}`}>
        <div className="flex h-14 items-center justify-between gap-4 pl-5 pr-1.5">
          <SiteLink href="/" aria-label="Halvik, home" className="type-heading flex h-11 items-center [font-size:1.15rem]"><Logo /></SiteLink>
          <ul className="type-utility hidden items-center gap-1 md:flex">
            {NAV.map((l) => {
              const current = l.href === path
              return (
                <li key={l.href} className="relative">
                  {current && <motion.span layoutId="nav-current" aria-hidden className="absolute inset-0 rounded-full bg-(--color-secondary)" transition={reduce ? { duration: 0 } : { type: 'spring', bounce: 0.15, duration: 0.45 }} />}
                  <span className="relative flex h-11 items-center px-3">
                    <UnderlineFill link={MotionSiteLink} href={l.href} className="[font-size:0.9375rem]">{l.label}</UnderlineFill>
                  </span>
                </li>
              )
            })}
          </ul>
          <div className="flex items-center gap-1.5">
            <BuyButton size="default" className="rounded-full">Buy</BuyButton>
            <Button variant="ghost" size="icon" className="rounded-full md:hidden" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
              <span aria-hidden className="relative block h-3 w-5">
                <span className={`absolute left-0 top-0 h-0.5 w-5 bg-(--color-text) transition-transform duration-200 ${open ? 'translate-y-[5px] rotate-45' : ''}`} />
                <span className={`absolute bottom-0 left-0 h-0.5 w-5 bg-(--color-text) transition-transform duration-200 ${open ? '-translate-y-[5px] -rotate-45' : ''}`} />
              </span>
            </Button>
          </div>
        </div>
        {open && (
          <ul id="mobile-menu" className="type-heading space-y-1 px-5 pb-6 pt-2 md:hidden">
            {NAV.map((l) => (
              <li key={l.href}>
                <SiteLink href={l.href} onClick={() => setOpen(false)} aria-current={l.href === path ? 'page' : undefined}
                  className="flex min-h-12 items-center border-b border-(--color-border) aria-[current=page]:underline aria-[current=page]:underline-offset-8">{l.label}</SiteLink>
              </li>
            ))}
          </ul>
        )}
      </motion.nav>
    </header>
  )
}

/** Mobile: the main action stays under the thumb — price and "Add to bag" in a bar pinned to the bottom. */
export function MobileBuyBar() {
  return (
    <div className="fixed inset-x-3 bottom-3 z-40 flex items-center justify-between gap-3 rounded-(--radius-card) border border-(--color-border) bg-(--color-surface)/85 py-2 pl-5 pr-2 backdrop-blur-md md:hidden">
      <p className="type-utility leading-tight"><span className="block text-(--color-muted)">Halvik 65</span><span className="type-heading [font-size:1.15rem]">from $159</span></p>
      <BuyButton size="default">Add to bag</BuyButton>
    </div>
  )
}
