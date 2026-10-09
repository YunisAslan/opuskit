import type { Metadata } from 'next'
import { LocationSection } from '@/components/sections/Location'
import { FaqSection } from '@/components/sections/Faq'
import { location, visitFaq } from '@/content/visit'
import { site } from '@/content/site'

export const metadata: Metadata = { title: 'Visit', description: 'How to find Ninth Row: the address, the hours and the way in.' }

export default function Visit() {
  return (
    <>
      <LocationSection
        title={location.title}
        address={location.address}
        hours={location.hours}
        mapUrl={site.mapUrl}
        mapLabel={location.map}
        phone={site.phone}
        callLabel={location.call}
        corners={location.corners}
        transitTitle={location.transitTitle}
        transit={location.transit}
      />
      <FaqSection id="questions" title={visitFaq.title} items={visitFaq.items} />
    </>
  )
}
