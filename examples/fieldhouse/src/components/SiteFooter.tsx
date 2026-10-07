'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { toast } from 'sonner'
import { FooterSection } from '@/components/sections/Footer'
import { Logo } from '@/components/Logo'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { nav, projects, studio } from '@/content/site'

function CopyEmail() {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(studio.email)
      toast('Address copied', { description: studio.email })
    } catch {
      window.location.href = `mailto:${studio.email}`
    }
  }
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button type="button" onClick={copy} className="link-line cursor-pointer text-left">{studio.email}</button>
      </TooltipTrigger>
      <TooltipContent side="top" className="type-utility rounded-button">Copy the address</TooltipContent>
    </Tooltip>
  )
}

export function SiteFooter() {
  const path = usePathname()
  return (
    <FooterSection
      link={Link}
      logo={<Link href="/" aria-label="Fieldhouse, home" className="inline-block"><Logo size="lg" /></Link>}
      line={studio.line}
      columns={[
        { title: 'Studio', links: nav.map((n) => ({ ...n, current: path === n.href })) },
        { title: 'Barns', links: projects.map((p) => ({ label: p.title, href: `/work/${p.slug}`, current: path === `/work/${p.slug}` })) },
        {
          title: 'Visit',
          links: [],
          extra: (
            <div className="type-utility mt-5 space-y-3">
              <address className="whitespace-pre-line not-italic text-(--color-muted)">{studio.address}</address>
              <p><CopyEmail /></p>
              <p><a href={`tel:${studio.phone.replace(/\s/g, '')}`} className="link-line">{studio.phone}</a></p>
              <p><a href={studio.instagram} target="_blank" rel="noreferrer" className="link-line">Instagram</a></p>
            </div>
          ),
        },
      ]}
      legal={[{ label: 'Privacy', href: '/privacy', current: path === '/privacy' }]}
      copyright={studio.copyright}
    />
  )
}
