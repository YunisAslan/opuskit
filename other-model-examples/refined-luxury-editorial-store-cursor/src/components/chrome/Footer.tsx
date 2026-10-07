import Link from 'next/link'
import { Info } from 'lucide-react'
import { FooterSection } from '@/components/sections/Footer'
import { Logo } from '@/components/pieces/Logo'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { copyright, footerColumns, legalLinks, site } from '@/config/site'

// Signature columns — the designed ending: the logo large on the left, link columns, then a hairline
// and one row of legal links. On every page.
export function Footer() {
  const brand = (
    <div className="flex flex-col gap-6">
      <Logo size="lg" />
      <p className="type-body max-w-[34ch] text-(--color-muted)">
        {site.address}
        <br />
        {site.tagline}, made by hand.
      </p>
      <div className="flex items-center gap-3">
        <Link href={`mailto:${site.email}`} className="type-body transition-colors hover:text-(--color-muted) hover:underline">
          {site.email}
        </Link>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              aria-label="When we reply"
              className="inline-flex size-5 items-center justify-center rounded-full border border-(--color-border) text-(--color-muted) transition-colors hover:border-(--color-text) hover:text-(--color-text) focus-visible:outline-none focus-visible:ring-0"
            >
              <Info className="size-3" aria-hidden />
            </button>
          </TooltipTrigger>
          <TooltipContent>We answer within a day, from the studio.</TooltipContent>
        </Tooltip>
      </div>
    </div>
  )

  return (
    <FooterSection
      link={Link}
      variant="signature"
      logo={brand}
      columns={footerColumns}
      legal={legalLinks}
      copyright={copyright}
    />
  )
}