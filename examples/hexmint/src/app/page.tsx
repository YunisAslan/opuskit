import { Magnetic } from '@/components/pieces/Magnetic'
import { TextEffect } from '@/components/pieces/TextEffect'
import { TextScramble } from '@/components/pieces/TextScramble'
import { Hero3D } from '@/components/scene/Hero3D'
import { ClientsSection } from '@/components/sections/Clients'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { FeatureGridSection } from '@/components/sections/FeatureGrid'
import { FeatureRowsSection } from '@/components/sections/FeatureRows'
import { IntegrationsSection } from '@/components/sections/Integrations'
import { TestimonialsSection } from '@/components/sections/Testimonials'
import { SiteLink, START } from '@/components/site/SiteLink'
import { assets } from '@/config/assets'
import { brand, clients, features, heroStats, quotes, rows, tools } from '@/content/site'

export default function Home() {
  return (
    <>
      <section className="relative flex min-h-[640px] flex-col justify-end overflow-hidden px-6 pb-8 pt-40 [height:100svh] md:pb-10">
        <Hero3D />
        <div className="relative mx-auto w-full max-w-[1440px]">
          {/* One h1, split into lines by hand: two lines on desktop, three on a phone. */}
          <h1 className="type-display">
            <TextEffect as="span" className="block">Your books,</TextEffect>
            <TextEffect as="span" delay={0.08} className="block md:inline">closed in</TextEffect>{' '}
            <TextEffect as="span" delay={0.16} className="block md:inline">one click.</TextEffect>
          </h1>
          <div className="mt-8 grid gap-6 md:grid-cols-12 md:items-end">
            <p className="type-body max-w-[46ch] text-(--color-muted) md:col-span-5">Invoices, expenses and quarterly books for small studios. Set up in five minutes, then close each quarter when the work is done, not a week later.</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 md:col-span-6 md:col-start-7 md:justify-end">
              <Magnetic>
                <SiteLink href={START} className="type-body inline-flex min-h-14 items-center rounded-(--radius-button) bg-(--color-primary) px-8 font-medium text-(--color-background) transition-opacity duration-150 hover:opacity-90">Start free</SiteLink>
              </Magnetic>
              <SiteLink href="/features" className="type-body inline-flex min-h-11 items-center underline underline-offset-4 decoration-(--color-border) transition-colors duration-150 hover:decoration-(--color-text)"><TextScramble>See how it works</TextScramble></SiteLink>
            </div>
          </div>
          {/* Metadata row: 4 modules of 3 columns, figures in tabular numerals. */}
          <dl className="mt-10 grid grid-cols-2 border-t border-(--color-border) md:mt-14 md:grid-cols-12">
            {heroStats.map((s) => (
              <div key={s.label} className="py-4 pr-4 md:col-span-3">
                <dd className="type-heading tabular-nums [font-size:clamp(1.25rem,2vw,1.75rem)]">{s.value}</dd>
                <dt className="type-utility mt-1 text-(--color-muted)">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ClientsSection title="// 01 Studios on Hexmint" names={clients} />
      <FeatureRowsSection link={SiteLink} label="// 02 The work" title="Three jobs, done in the background"
        rows={rows.map((r) => ({ ...r, image: assets[r.media].src, alt: assets[r.media].alt }))} />
      <FeatureGridSection label="// 03 Features" title="Everything a studio's books need, nothing more" features={features} />
      <IntegrationsSection label="// 04 Connections" title="Works with the tools you already pay for"
        text="Connect once in settings. Hexmint syncs every fifteen minutes and never writes to your other tools without asking." tools={tools} />
      <TestimonialsSection title="// 05 From the studios" quotes={quotes} />
      <ContactCtaSection link={SiteLink} label="// 06 Start" headline="Close this quarter early." quiet="Free for the first 30 days." action={{ label: 'Start free', href: START }} email={brand.email} />
    </>
  )
}
