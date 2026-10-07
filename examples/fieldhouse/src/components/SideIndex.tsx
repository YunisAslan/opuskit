'use client'
// Menu — Side index: a fixed left column like a book's contents. Logo, the pages in the utility face, the current
// page marked with a brass rule and its parts listed under it (scroll-spy marks the part in view). Under 1024px it
// collapses to a top bar whose menu button opens a Sheet.
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MenuIcon } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { nav, pageSections, studio } from '@/content/site'

const isCurrent = (path: string, href: string) => (href === '/' ? path === '/' : path === href || path.startsWith(href + '/'))
const sectionsFor = (path: string) => pageSections[path] ?? (path.startsWith('/work/') ? pageSections['/work/[slug]'] : undefined)

function useScrollSpy(path: string) {
  const [seen, setSeen] = useState<{ path: string; id: string }>()
  useEffect(() => {
    const els = (sectionsFor(path) ?? []).map((s) => document.getElementById(s.id)).filter((e): e is HTMLElement => !!e)
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setSeen({ path, id: e.target.id })
    }, { rootMargin: '-45% 0px -50% 0px' })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [path])
  return seen?.path === path ? seen.id : undefined
}

export function SideIndex() {
  const path = usePathname()
  const active = useScrollSpy(path)
  const [open, setOpen] = useState(false)
  const sections = sectionsFor(path)

  return (
    <>
      <aside style={{ viewTransitionName: 'side-index' }} className="fixed inset-y-0 left-0 z-40 hidden w-(--nav-w) flex-col border-r border-border bg-background px-6 pb-8 pt-9 lg:flex">
        <Link href="/" aria-label="Fieldhouse, home" className="text-(--color-text)"><Logo /></Link>
        <NavigationMenu orientation="vertical" viewport={false} aria-label="Pages" className="mt-16 max-w-none flex-none items-start justify-start">
          <NavigationMenuList className="w-full flex-col items-stretch">
            {nav.map((item) => {
              const current = isCurrent(path, item.href)
              return (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild active={current}>
                    <Link
                      href={item.href}
                      aria-current={current ? 'page' : undefined}
                      className={`type-utility flex items-center gap-3 rounded-none p-0 py-2 transition-colors duration-150 hover:bg-transparent hover:text-(--color-text) focus:bg-transparent focus-visible:text-(--color-text) focus-visible:underline focus-visible:outline-none data-active:bg-transparent data-active:hover:bg-transparent ${current ? 'text-(--color-text)' : 'text-(--color-muted)'}`}
                    >
                      <span aria-hidden className={`h-px w-4 shrink-0 transition-colors duration-150 ${current ? 'bg-(--color-accent)' : 'bg-(--color-border)'}`} />
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                  {current && sections && (
                    <ul aria-label={`On this page`} className="mb-3 ml-7 mt-1 space-y-0.5 border-l border-border pl-3">
                      {sections.map((s) => (
                        <li key={s.id}>
                          <a href={`#${s.id}`} className={`type-utility link-line block py-1 ${active === s.id ? 'text-(--color-text)' : 'text-(--color-muted)'}`}>{s.label}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </NavigationMenuItem>
              )
            })}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="mt-auto space-y-4">
          <a href={`mailto:${studio.email}`} className="type-utility link-line block break-all text-(--color-muted) hover:text-(--color-text)">{studio.email}</a>
          <Button asChild variant="outline" className="w-full">
            <Link href="/contact">Start a project</Link>
          </Button>
        </div>
      </aside>

      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background px-(--gutter) lg:hidden">
        <Link href="/" aria-label="Fieldhouse, home"><Logo /></Link>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open the menu" className="-mr-3"><MenuIcon className="size-5" strokeWidth={1.5} /></Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full gap-0 border-l-0 bg-background px-(--gutter) pb-8 pt-5 data-[side=right]:w-full data-[side=right]:sm:max-w-md">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <Link href="/" onClick={() => setOpen(false)} className="flex h-6 items-center self-start"><Logo /></Link>
            <nav aria-label="Pages" className="mt-14">
              <ul className="border-t border-border">
                {nav.map((item) => {
                  const current = isCurrent(path, item.href)
                  return (
                    <li key={item.href} className="border-b border-border">
                      <Link href={item.href} onClick={() => setOpen(false)} aria-current={current ? 'page' : undefined} className="type-display flex min-h-16 items-center justify-between py-3 [font-size:2.5rem]">
                        {item.label}
                        {current && <span aria-hidden className="h-px w-8 bg-(--color-accent)" />}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
            <div className="mt-auto space-y-4">
              <a href={`mailto:${studio.email}`} className="type-body link-line block">{studio.email}</a>
              <Button asChild className="h-12 w-full"><Link href="/contact" onClick={() => setOpen(false)}>Start a project</Link></Button>
            </div>
          </SheetContent>
        </Sheet>
      </header>
    </>
  )
}
