'use client'
// Menu — Side index: a fixed left column like a book's contents (logo, the pages, the current page's parts with
// scroll-spy, one action). Its right edge is the legal pad's red margin line. Mobile: a top bar with a menu button
// that opens the same list in a Sheet.
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ScribbleLink } from './pieces/ScribbleLink'
import { Logo } from './Logo'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from './ui/sheet'

export const pages = [
  { href: '/', label: 'Home' },
  { href: '/books', label: 'Books' },
  { href: '/about', label: 'About' },
  { href: '/commissions', label: 'Commissions' },
]
export const email = 'studio@inkwellandmoth.com'

function useParts(path: string) {
  const [parts, setParts] = useState<{ id: string; label: string }[]>([])
  const [active, setActive] = useState('')
  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>('main [data-spy]')]
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the parts are read from the page that just rendered
    setParts(els.map((el) => ({ id: el.id, label: el.dataset.spy ?? '' })))
    setActive(els[0]?.id ?? '')
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [path])
  return { parts, active }
}

function Contents({ path, onGo }: { path: string; onGo?: () => void }) {
  const { parts, active } = useParts(path)
  return (
    <nav aria-label="Pages" className="type-utility">
      <ul className="space-y-3 [font-size:0.95rem]">
        {pages.map((p) => (
          <li key={p.href} onClick={onGo}>
            <ScribbleLink link={Link} href={p.href} current={path === p.href} className="min-h-11 py-2.5 lg:min-h-0 lg:py-0">{p.label}</ScribbleLink>
            {path === p.href && parts.length > 1 && (
              <ul className="mb-2 mt-2 space-y-1.5 border-l border-(--color-border) pl-3 text-(--color-muted)">
                {parts.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} aria-current={active === s.id ? 'location' : undefined}
                      className="block transition-colors duration-150 hover:text-(--color-text) aria-[current]:text-(--color-primary)">
                      <span aria-hidden className={`mr-1.5 inline-block transition-transform duration-150 ${active === s.id ? 'rotate-0' : '-rotate-45 opacity-0'}`}>~</span>{s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function SideIndex() {
  const path = usePathname()
  const [open, setOpen] = useState(false)
  const action = (
    <div className="space-y-3">
      <Link href="/commissions#enquiry" className="type-utility flex min-h-12 items-center justify-center whitespace-nowrap bg-(--color-primary) px-3 text-(--color-background) transition-colors duration-150 hover:bg-(--color-text)">
        Commission a book
      </Link>
      <a href={`mailto:${email}`} className="type-utility block text-(--color-muted) [font-size:0.6875rem] hover:text-(--color-text)">{email}</a>
    </div>
  )
  return (
    <>
      <header data-chrome className="fixed inset-y-0 left-0 z-40 hidden w-(--rail) flex-col justify-between border-r border-(--color-accent) bg-(--color-background) px-6 py-8 lg:flex">
        <a href="#main" className="type-utility sr-only focus:not-sr-only">Skip to content</a>
        <div className="space-y-12">
          <Link href="/" aria-label="Inkwell & Moth, home" className="block"><Logo /></Link>
          <Contents path={path} />
        </div>
        {action}
      </header>

      <header data-chrome className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-(--color-accent)/50 bg-(--color-background)/95 px-4 backdrop-blur-sm lg:hidden">
        <Link href="/" aria-label="Inkwell & Moth, home" className="-ml-1 p-1"><Logo className="[&_svg]:h-8 [&_svg]:w-8 [&>span:last-child]:text-[1.05rem]" /></Link>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="type-utility min-h-11 min-w-11 cursor-pointer px-3 [font-size:0.95rem]">Menu</SheetTrigger>
          <SheetContent side="left" className="w-[82vw] gap-10 border-r border-(--color-accent)/70 bg-(--color-background) px-6 pt-8 pb-8">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <Logo />
            <Contents path={path} onGo={() => setOpen(false)} />
            <div className="mt-auto">{action}</div>
          </SheetContent>
        </Sheet>
      </header>
    </>
  )
}
