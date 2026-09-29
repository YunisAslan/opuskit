"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { accountLinks, legalLinks, primaryLinks, secondaryLinks, site } from "@/config/site"
import { RollLabel } from "@/components/RollLabel"
import { Button } from "@/components/ui/button"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

// Centred logo: links left, logo centre, secondary links + the action right.
// Tall at the top, compact after 80px; hides on scroll down and returns on scroll up;
// transparent over the home film, solid white after it.
export function Navigation() {
  const pathname = usePathname()
  const [compact, setCompact] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [overFilm, setOverFilm] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      const film = document.getElementById("hero")
      setCompact(y > 80)
      setHidden(y > 200 && y > last + 2 ? true : y < last - 2 ? false : (h) => h)
      setOverFilm(!!film && document.documentElement.dataset.film !== "off" && film.getBoundingClientRect().bottom > 80)
      last = y
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [pathname])

  const isActive = (href: string) => pathname === href

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[transform,background-color,color] duration-300 ease-out",
        hidden && "-translate-y-full",
        overFilm ? "bg-transparent text-background" : "border-b border-border bg-background text-text",
      )}
    >
      {overFilm && (
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-linear-to-b from-text/60 to-transparent" />
      )}
      <div className={cn("page grid grid-cols-[1fr_auto_1fr] items-center transition-[height] duration-300 ease-out", compact ? "h-16" : "h-16 lg:h-24")}>
        {/* Left: menu button (mobile) / primary links (desktop) */}
        <div className="flex items-center">
          <MobileMenu isActive={isActive} />
          <NavigationMenu viewport={false} className="hidden justify-start lg:flex">
            <NavigationMenuList className="gap-6">
              {primaryLinks.map((l) => (
                <NavigationMenuItem key={l.href}>
                  <NavigationMenuLink
                    asChild
                    active={isActive(l.href)}
                    className="type-utility p-0 text-[inherit] hover:bg-transparent focus:bg-transparent data-active:bg-transparent data-active:text-accent data-active:hover:bg-transparent data-active:focus:bg-transparent"
                  >
                    <Link href={l.href} aria-current={isActive(l.href) ? "page" : undefined} className="flex h-11 items-center">
                      <RollLabel>{l.label}</RollLabel>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <Link href="/" aria-label={`${site.name}, home`} className="flex h-11 items-center">
          <span className={cn("font-display leading-none tracking-[-0.02em] transition-[font-size] duration-300", compact ? "text-lg" : "text-lg lg:text-2xl")}>
            {site.name}
          </span>
        </Link>

        <div className="flex items-center justify-end gap-6">
          {secondaryLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={cn("type-utility hidden h-11 items-center lg:flex", isActive(l.href) && "text-accent")}
            >
              <RollLabel>{l.label}</RollLabel>
            </Link>
          ))}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="type-utility hidden h-11 items-center lg:flex">
              <RollLabel>Account</RollLabel>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-background p-1">
              {accountLinks.map((l) => (
                <DropdownMenuItem key={l.href} asChild className="type-utility px-3">
                  <Link href={l.href}>{l.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                asChild
                className={cn(
                  "type-utility h-11 px-4",
                  overFilm && "bg-background text-text hover:bg-secondary",
                )}
              >
                <Link href="/rsvp">
                  RSVP<span className="hidden font-normal sm:inline">{site.datesShort}</span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Reply by {site.rsvpBy}</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </header>
  )
}

function MobileMenu({ isActive }: { isActive: (href: string) => boolean }) {
  const links = [{ href: "/", label: "Home" }, ...primaryLinks, ...secondaryLinks, { href: "/rsvp", label: "RSVP" }]
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu" className="-ml-3 text-[inherit] hover:bg-transparent lg:hidden">
          <Menu className="size-6" strokeWidth={1.5} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="border-0 bg-background text-text data-[side=left]:w-full data-[side=left]:sm:max-w-none">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Site navigation</SheetDescription>
        <nav className="page flex h-full flex-col pt-20 pb-8">
          <ul className="border-t border-border">
            {links.map((l) => (
              <li key={l.href} className="border-b border-border">
                <SheetClose asChild>
                  <Link
                    href={l.href}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    className={cn("type-heading flex min-h-16 items-center", isActive(l.href) && "text-accent")}
                  >
                    {l.label}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
          <ul className="mt-auto grid grid-cols-2 gap-x-4 gap-y-1">
            {[...accountLinks, ...legalLinks].map((l) => (
              <li key={l.href}>
                <SheetClose asChild>
                  <Link href={l.href} className="type-utility flex min-h-11 items-center text-muted">
                    {l.label}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
