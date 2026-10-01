import type { Metadata } from 'next'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { FaqSearch } from '@/components/site/FaqSearch'
import { SiteLink, START } from '@/components/site/SiteLink'
import { brand } from '@/content/site'

export const metadata: Metadata = { title: 'FAQ', description: 'Straight answers on bank connections, VAT filing, moving over, data storage and cancelling.' }

export default function Faq() {
  return (
    <>
      <FaqSearch />
      <ContactCtaSection link={SiteLink} label="// 02 Start" headline="Still unsure? Try it." quiet="Or write to us. A person replies." action={{ label: 'Start free', href: START }} email={brand.email} />
    </>
  )
}
