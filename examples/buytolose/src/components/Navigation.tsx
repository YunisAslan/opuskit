"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useCart } from "./Cart"

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
]

export function Navigation() {
  const pathname = usePathname()
  const { count } = useCart()
  const [hidden, setHidden] = useState(false)
  const [overHero, setOverHero] = useState(pathname === "/")
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > last && y > 80)
      last = y
      const hero = document.getElementById("hero")
      setOverHero(!!hero && hero.getBoundingClientRect().bottom > 80)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [pathname])

  // eslint-disable-next-line react-hooks/set-state-in-effect -- close the menu on navigation
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color] duration-300 ease-out motion-reduce:transition-colors ${
        hidden && !open ? "-translate-y-full" : ""
      } ${overHero && !open ? "bg-transparent" : "bg-background"}`}
    >
      <nav aria-label="Main" className="container-content flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="relative z-10 flex min-h-11 items-center font-display text-lg font-bold tracking-tight">
          BUYTOLOSE
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={pathname.startsWith(l.href) ? "page" : undefined}
                className="inline-flex min-h-11 items-center font-utility text-utility underline-offset-8 decoration-2 decoration-accent transition-opacity duration-150 hover:opacity-70 aria-[current=page]:underline">
                {l.label}
              </Link>
            </li>
          ))}
          <li><Link href="/account" className="inline-flex min-h-11 items-center font-utility text-utility transition-opacity duration-150 hover:opacity-70">Account</Link></li>
        </ul>

        <div className="relative z-10 flex items-center gap-2">
          <Link href="/cart" className="btn btn-primary min-h-11 px-5">
            Bag{count > 0 && <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs text-surface">{count}</span>}
          </Link>
          <button type="button" className="btn min-h-11 px-4 md:hidden" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="fixed inset-0 flex flex-col justify-end bg-background px-6 pt-24 pb-12 md:hidden">
          <ul className="flex flex-col gap-2">
            {[...links, { href: "/account", label: "Account" }].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="block py-2 font-display text-[2.75rem] leading-none font-bold tracking-tight">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
