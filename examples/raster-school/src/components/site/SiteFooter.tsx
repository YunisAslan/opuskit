'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FooterSection } from '@/components/sections/Footer'
import { nav, nextCohort, seatsLine, site } from '@/content/site'
import { ApplyButton } from './Apply'
import { CopyEmail } from './CopyEmail'
import { StudioClock } from './StudioClock'

export function SiteFooter() {
  const pathname = usePathname()
  return (
    <FooterSection
      link={Link}
      variant="wordmark"
      wordmark="cropped"
      light
      brand={site.name}
      columns={[{ title: 'Pages', links: [{ label: 'Home', href: '/' }, ...nav].map((l) => ({ ...l, current: pathname === l.href })) }]}
      contact={
        <>
          <CopyEmail email={site.email} className="-my-2" />
          <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="link-line flex min-h-9 items-center">{site.phone}</a>
          <p className="mt-1 text-(--color-muted)">{site.address}</p>
        </>
      }
      extra={
        <div className="flex h-full flex-col gap-3 lg:pl-0">
          <h2 className="type-utility text-(--color-muted)">Next cohort</h2>
          <p className="type-utility [font-size:0.9375rem]">
            {nextCohort.name}, {nextCohort.format.toLowerCase()}, from {nextCohort.start}. {seatsLine(nextCohort)}.
          </p>
          <ApplyButton cohort={nextCohort.id} className="self-start">Apply</ApplyButton>
          <StudioClock className="mt-auto pt-4 text-(--color-muted)" />
        </div>
      }
      copyright={`© ${new Date().getFullYear()} ${site.name}. Twelve seats a cohort, in our studio or online.`}
      legal={site.legal}
    />
  )
}
