import type { Metadata } from 'next'
import { ContactBlock } from '@/components/ContactBlock'
import { LocationSection } from '@/components/sections/Location'
import { assets } from '@/config/assets'
import { brand, location } from '@/content/site'

export const metadata: Metadata = { title: 'Contact', description: 'Start a project with Sticky Weather, or visit the studio at 12 Gasferry Road, Bristol.' }

export default function Contact() {
  return (
    <>
      <ContactBlock />
      <LocationSection {...location} phone={{ label: brand.phone, href: brand.phoneHref }}
        image={assets.studio3.src} alt={assets.studio3.alt} width={assets.studio3.width} height={assets.studio3.height} />
    </>
  )
}
