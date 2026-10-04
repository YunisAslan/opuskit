'use client'
// Menu "Split pill": three separate pieces on the top edge, no bar behind them. The logo (left) inverts over whatever
// it sits on; a white pill of four uppercase links (centre); the sound switch and the one boxed action (right).
// Below 1024 px: logo, sound, and a Menu button that opens the same links as a full-width sheet.
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, type ReactNode } from 'react'
import { Logo } from '@/components/Logo'
import { Magnetic } from '@/components/pieces/Magnetic'
import { TextRoll } from '@/components/pieces/TextRoll'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { nav } from '@/content/site'

const box = 'inline-flex h-11 items-center gap-2.5 rounded-button border border-border bg-background px-4 text-[0.8125rem] font-semibold uppercase tracking-[0.04em] text-(--color-text) transition-colors duration-150 hover:bg-secondary'

export function Nav({ sound }: { sound: ReactNode }) {
  const path = usePathname()
  const [open, setOpen] = useState(false)
  const current = (href: string) => path === href || path.startsWith(href + '/')
  return (
    <>
      <Link href="/" aria-label="Sela Mor, home" className="fixed left-5 top-4 z-50 flex h-11 items-center text-(--color-text) mix-blend-difference md:left-8">
        <Logo className="text-[1.05rem]" />
      </Link>
      <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex h-11 items-center justify-end gap-2 px-5 md:px-8">
        <nav aria-label="Main" className="pointer-events-auto absolute left-1/2 hidden -translate-x-1/2 lg:block">
          <ul className="flex h-11 items-center gap-1 rounded-full bg-(--color-text) px-2 text-(--color-background)">
            {nav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} aria-current={current(l.href) ? 'page' : undefined}
                  className="flex h-9 items-center rounded-full px-3.5 text-[0.8125rem] font-semibold uppercase tracking-[0.04em] transition-colors duration-150 aria-[current=page]:bg-(--color-background) aria-[current=page]:text-(--color-text) focus-visible:bg-secondary focus-visible:text-(--color-text)">
                  <TextRoll>{l.label}</TextRoll>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="pointer-events-auto">{sound}</div>
        <span className="pointer-events-auto hidden lg:block">
          <Magnetic>
            <Link href="/contact" aria-current={current('/contact') ? 'page' : undefined} className={box}>
              <span aria-hidden className="size-2 rounded-full bg-(--color-text)" />
              <TextRoll>Contact</TextRoll>
            </Link>
          </Magnetic>
        </span>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className={`${box} pointer-events-auto lg:hidden`}>Menu</SheetTrigger>
          <SheetContent side="top" className="border-border bg-background px-5 pb-10 pt-20">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav aria-label="Main">
              <ul className="divide-y divide-border border-y border-border">
                {[...nav, { label: 'Contact', href: '/contact' }].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} onClick={() => setOpen(false)} aria-current={current(l.href) ? 'page' : undefined}
                      className="type-heading flex min-h-16 items-center justify-between py-3 [font-size:2rem] aria-[current=page]:underline aria-[current=page]:underline-offset-8">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
    </>
  )
}
