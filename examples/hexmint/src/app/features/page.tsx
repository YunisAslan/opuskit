import type { Metadata } from 'next'
import { MediaAsset } from '@/components/MediaAsset'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { FeatureGridSection } from '@/components/sections/FeatureGrid'
import { HowItWorksSection } from '@/components/sections/HowItWorks'
import { ProductHighlightSection } from '@/components/sections/ProductHighlight'
import { SiteLink, START } from '@/components/site/SiteLink'
import { brand, close, features, steps } from '@/content/site'

export const metadata: Metadata = { title: 'Features', description: 'Bank feeds, VAT, multi-currency invoicing and a one-click quarterly close, with the numbers to show for it.' }

export default function Features() {
  return (
    <>
      <FeatureGridSection lead label="// 01 Features" title="Bookkeeping, measured in minutes" features={features} />
      <ProductHighlightSection link={SiteLink} label="// 02 The close" name={close.name} text={close.text} details={close.details}
        media={<MediaAsset id="renderClose" className="size-full object-cover" />} action={{ label: 'Start free', href: START }} />
      <HowItWorksSection label="// 03 Setup" title="Five minutes from sign-up to first invoice" steps={steps} />
      <ContactCtaSection link={SiteLink} label="// 04 Start" headline="See it on your own numbers." quiet="Connect a bank in two minutes." action={{ label: 'Start free', href: START }} email={brand.email} />
    </>
  )
}
