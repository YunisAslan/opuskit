"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { site } from "@/config/site"

// Mobile: the primary action stays under the thumb. The RSVP page renders its own sticky submit bar.
export function StickyRSVP() {
  const pathname = usePathname()
  if (pathname === "/rsvp") return null
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-text bg-background p-3 sm:hidden">
      <Link href="/rsvp" className="type-utility flex h-14 items-center justify-between bg-primary px-5 text-primary-foreground">
        <span>RSVP</span>
        <span className="font-normal">{site.dates}</span>
      </Link>
    </div>
  )
}
