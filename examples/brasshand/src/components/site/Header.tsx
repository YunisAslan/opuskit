'use client'
// Full-screen menu: a minimal bar (logo and "Menu"), hiding on scroll down and back on scroll up. The bar always carries
// the page blue, so the logo and "Menu" stay readable over the giant chapter words (at the top it is invisible anyway). The menu is a full-viewport panel (shadcn Sheet: focus trap, Escape, labelled) that wipes down from the top,
// display-size links one per line staggering in 40ms apart, plus the contact details. Same on every screen.
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Logo } from '@/components/site/Logo'
import { RollLink } from '@/components/site/links'
import { TextRoll } from '@/components/pieces/TextRoll'
import { contact, nav } from '@/content/site'
import { EASE } from '@/components/site/Reveal'

const bar = 'type-utility inline-flex min-h-11 min-w-11 items-center text-[0.9375rem]'

export function Header() {
  const path = usePathname()
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > prev && y > 160)
  })

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <motion.header className="fixed inset-x-0 top-0 z-40 bg-(--color-background) px-5 md:px-8"
        animate={{ y: hidden && !open ? '-100%' : 0 }} transition={reduce ? { duration: 0 } : { duration: 0.3, ease: EASE }}>
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between">
          <Link href="/" aria-label="Brasshand, home" className="inline-flex min-h-11 items-center"><Logo /></Link>
          <SheetTrigger className={bar}><TextRoll>Menu</TextRoll></SheetTrigger>
        </div>
      </motion.header>

      <SheetContent side="top" showCloseButton={false}
        className="h-svh data-[side=top]:h-svh gap-0 overflow-y-auto border-0 bg-(--color-text) px-5 text-(--color-background) md:px-8 data-open:slide-in-from-top! data-closed:slide-out-to-top! data-open:fade-in-100 data-closed:fade-out-100 duration-500 motion-reduce:animate-none">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Pages and contact details</SheetDescription>
        <div className="mx-auto flex h-16 w-full max-w-[1440px] shrink-0 items-center justify-between">
          <Link href="/" aria-label="Brasshand, home" onClick={() => setOpen(false)} className="inline-flex min-h-11 items-center"><Logo /></Link>
          <SheetClose className={bar}><TextRoll>Close</TextRoll></SheetClose>
        </div>
        <nav aria-label="Main" className="mx-auto mt-[6svh] w-full max-w-[1440px]">
          <ul>
            {nav.map((l, i) => (
              <motion.li key={l.href} initial={reduce ? false : { y: '60%', opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.15 + i * 0.04 }}>
                <RollLink href={l.href} onClick={() => setOpen(false)} aria-current={path === l.href ? 'page' : undefined}
                  className="type-display inline-block leading-[0.9]! [font-size:clamp(3.5rem,11vw,8.5rem)]! aria-[current=page]:opacity-60">
                  {l.label}
                </RollLink>
              </motion.li>
            ))}
          </ul>
        </nav>
        <div className="type-body mx-auto mt-auto grid w-full max-w-[1440px] gap-6 py-8 sm:grid-cols-3">
          <a href={`mailto:${contact.email}`} className="inline-flex min-h-11 items-center underline underline-offset-4">{contact.email}</a>
          <a href={`tel:${contact.tel}`} className="inline-flex min-h-11 items-center">{contact.phone}</a>
          <address className="whitespace-pre-line not-italic opacity-80">{contact.address.split('\n').slice(1).join('\n')}</address>
        </div>
      </SheetContent>
    </Sheet>
  )
}
