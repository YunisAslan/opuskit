import type { Metadata } from 'next'
import { LocationSection } from '@/components/sections/Location'
import { FaqSection } from '@/components/sections/Faq'
import { TextEffect } from '@/components/pieces/TextEffect'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FaqAccordion } from '@/components/site/Faqs'
import { InView } from '@/components/site/InView'
import { Opener } from '@/components/site/Opener'
import { Stop } from '@/components/site/Stop'
import { Walk } from '@/components/site/Walk'
import { assets } from '@/config/assets'
import { faqSets, location, mapUrl, travel } from '@/content/site'

export const metadata: Metadata = { title: 'Venue & travel', description: 'Hangar 2 on the old Lowfield airstrip, 40 minutes east of Baku: how to get there, and a walk through the hangar.' }

export default function Venue() {
  return (
    <>
      <Stop id="the-hangar-door" name="The hangar door" film>
        <Opener
          title="Forty minutes east of Baku"
          lead="Hangar 2 stands on the old Lowfield airstrip, where the Zira road meets the sea."
          card={{ name: 'The hangar door', text: 'Doors open at 19:00 each night. The free shuttle leaves 28 May metro at 18:00 and 18:30.', link: { label: 'Open in maps', href: mapUrl } }}
        />
        <div className="bg-(--color-background)/85">
          <InView className="clip">
            <LocationSection {...location} mapUrl={mapUrl} image={assets.location.src} alt={assets.location.alt} />
          </InView>
          <section id="getting-here" className="scroll-mt-20 px-5 pb-24 md:px-10 md:pb-32">
            <div className="mx-auto grid max-w-[1440px] gap-8 md:grid-cols-12">
              <h2 className="type-heading md:col-span-4">Getting here</h2>
              <Tabs defaultValue={travel[0].id} className="md:col-span-7 md:col-start-6">
                <TabsList variant="line" className="h-auto w-full justify-start gap-0 overflow-x-auto border-b border-(--color-border) p-0">
                  {travel.map((t) => (
                    <TabsTrigger key={t.id} value={t.id} className="type-utility min-h-11 flex-none px-4 text-(--color-muted) data-active:text-(--color-text)">{t.tab}</TabsTrigger>
                  ))}
                </TabsList>
                {travel.map((t) => (
                  <TabsContent key={t.id} value={t.id} className="pt-6">
                    <Card className="gap-2 border border-(--color-border) bg-(--color-surface)/80 py-6 ring-0">
                      <CardHeader className="px-6">
                        <CardTitle className="type-heading font-semibold [font-size:1.375rem]">{t.title}</CardTitle>
                        <CardDescription className="type-body mt-2 max-w-[60ch] text-(--color-muted)">{t.text}</CardDescription>
                      </CardHeader>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </section>
        </div>
      </Stop>

      <Stop id="the-walk" name="The walk" ownIndex>
        <header className="px-5 pb-16 pt-24 md:px-10 md:pt-32">
          <div className="mx-auto max-w-[1440px]">
            <TextEffect as="h2" preset="slide" className="type-display max-w-[14ch]">Walk through the hangar</TextEffect>
            <p className="type-body mt-6 max-w-[44ch] text-(--color-muted)">Four stops, from the hall to the shore. Scroll to walk; the names on the side take you straight to one.</p>
          </div>
        </header>
        <Walk />
      </Stop>

      <Stop id="questions" name="Questions">
        <FaqSection title="Travel questions">
          <FaqAccordion items={faqSets.venue} />
        </FaqSection>
      </Stop>
    </>
  )
}
