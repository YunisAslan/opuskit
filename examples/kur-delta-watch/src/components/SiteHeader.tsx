'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import { Logo } from '@/components/Logo'
import { MediaAsset } from '@/components/MediaAsset'
import { UnderlineFill } from '@/components/pieces/UnderlineFill'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { menuCards } from '@/content/site'

const EASE = [0.22, 1, 0.36, 1] as const

function Card({ card, i, current, reduce }: { card: (typeof menuCards)[number]; i: number; current: boolean; reduce: boolean | null }) {
  return (
    <motion.li
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0.2 : 0.45, delay: reduce ? 0 : i * 0.06, ease: EASE }}
      className="grid grid-cols-[7rem_1fr] border-2 border-(--color-border) bg-(--color-surface) md:grid-cols-1"
    >
      <Link href={card.href} tabIndex={-1} aria-hidden className="block overflow-hidden border-r-2 border-(--color-border) md:border-r-0 md:border-b-2">
        <MediaAsset id={card.image} alt="" className="aspect-square size-full object-cover md:aspect-[4/3]" />
      </Link>
      <div className="p-4 md:p-5">
        <Link href={card.href} aria-current={current ? 'page' : undefined} className="type-heading block [font-size:1.6rem] aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-4">{card.title}</Link>
        <ul className="type-body mt-3 space-y-1.5">
          {card.links.map((l) => <li key={l.href}><UnderlineFill href={l.href}>{l.label}</UnderlineFill></li>)}
        </ul>
      </div>
    </motion.li>
  )
}

// Menu with cards: a compact bar (logo, Menu, Donate) that grows to hold one card per part of the site.
// Hides on scroll down, comes back on scroll up. Phones get the same cards stacked in a sheet.
export function SiteHeader() {
  const path = usePathname()
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [sheet, setSheet] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > 120 && y > prev && !open)
  })
  // A new page closes the menu (state reset during render, keyed on the path).
  const [lastPath, setLastPath] = useState(path)
  if (path !== lastPath) { setLastPath(path); setOpen(false); setSheet(false) }
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [open])

  const current = (href: string) => path === href

  return (
    <motion.header
      animate={{ y: hidden ? '-100%' : 0 }}
      transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
      className="sticky top-0 z-40 border-b-2 border-(--color-border) bg-(--color-background)"
    >
      <div className="flex h-16 items-center justify-between gap-4 px-5 md:px-10">
        <Link href="/" aria-label="Kür Delta Watch, home" className="-my-1 py-1"><Logo /></Link>
        <nav aria-label="Main" className="flex items-center gap-3">
          <Button variant="outline" className="hidden md:inline-flex" aria-expanded={open} aria-controls="menu-cards" onClick={() => setOpen((o) => !o)}>
            {open ? 'Close' : 'Menu'}
          </Button>
          <Sheet open={sheet} onOpenChange={setSheet}>
            <SheetTrigger asChild><Button variant="outline" className="md:hidden">Menu</Button></SheetTrigger>
            <SheetContent side="right" className="w-full! max-w-none! border-l-0! p-5 pt-16">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <ul className="grid gap-4" onClick={(e) => (e.target as Element).closest('a') && setSheet(false)}>{menuCards.map((c, i) => <Card key={c.href} card={c} i={i} current={current(c.href)} reduce={reduce} />)}</ul>
              <Link href="/" className="type-utility mt-2 underline underline-offset-4">Home</Link>
            </SheetContent>
          </Sheet>
          <Button asChild><Link href="/donate">Donate</Link></Button>
        </nav>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-cards"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.15 }}
            className="hidden border-t-2 border-(--color-border) px-10 py-8 md:block"
          >
            <ul className="grid grid-cols-4 gap-4" onClick={(e) => (e.target as Element).closest('a') && setOpen(false)}>{menuCards.map((c, i) => <Card key={c.href} card={c} i={i} current={current(c.href)} reduce={reduce} />)}</ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
