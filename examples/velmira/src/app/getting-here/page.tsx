import type { Metadata } from 'next'
import { assets } from '@/config/assets'
import { travelFaq, ADDRESS, MAP_URL, PHONE } from '@/content'
import { FaqList } from '@/components/site/FaqList'
import { LocationSection } from '@/components/sections/Location'
import { FaqSection } from '@/components/sections/Faq'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const metadata: Metadata = { title: 'Getting here', description: 'Velmira is on the shore of a lake above Gabala: three and a half hours from Baku by road, twenty-five minutes from Gabala airport.' }

const ways = [
  { id: 'road', label: 'By road', cards: [
    { title: 'From Baku', text: 'About three and a half hours west, through Shamakhi and Ismayilli. The last twenty minutes climb through the forest; the gate is on your left after the lake comes into view.' },
    { title: 'From Ganja', text: 'About three hours north-east. Leave the main road at Gabala town and follow the signs for the lake.' },
  ] },
  { id: 'air', label: 'By air', cards: [
    { title: 'Gabala airport', text: 'Twenty-five minutes by car. Send us your flight number and a driver will meet you at arrivals, 30 AZN each way.' },
    { title: 'Baku airport', text: 'More flights, a longer drive: about four hours. We can arrange a car for 160 AZN each way, or you can hire one at the airport.' },
  ] },
  { id: 'town', label: 'From Gabala town', cards: [
    { title: 'By taxi', text: 'Fifteen minutes and around 10 AZN from the town centre. Ask for the Nohur lake road; drivers know the house.' },
    { title: 'On foot', text: 'A long walk, but a lovely one: about an hour and a half on the lake road, shaded most of the way.' },
  ] },
]

export default function GettingHere() {
  return (
    <>
      <LocationSection
        as="h1"
        reveal={false}
        title="Getting here"
        address={ADDRESS}
        hours={['Check-in 3 pm to 9 pm', 'Check-out by noon', 'Front desk 8 am to 10 pm']}
        notes="The house sits on the shore of a lake in the hills above Gabala, at the end of a paved road through the firs."
        mapUrl={MAP_URL}
        phone={PHONE}
        image={assets.arrival.src}
        alt={assets.arrival.alt}
      >
        <Tabs defaultValue="road" className="gap-8">
          <TabsList variant="line" className="h-auto w-full justify-start gap-2 border-b border-(--color-border) p-0">
            {ways.map((w) => (
              <TabsTrigger key={w.id} value={w.id}
                className="type-utility h-12 flex-none rounded-none border-0 border-b-2 border-transparent px-1 text-[0.9375rem] text-(--color-muted) after:hidden hover:text-(--color-text) focus-visible:text-(--color-text) focus-visible:underline data-active:border-(--color-accent) data-active:bg-transparent data-active:text-(--color-text) mr-6">
                {w.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {ways.map((w) => (
            <TabsContent key={w.id} value={w.id} className="grid gap-6 md:grid-cols-2">
              {w.cards.map((c) => (
                <Card key={c.title} className="gap-4 rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) py-8 text-(--color-text) shadow-(--shadow-card)">
                  <CardHeader className="px-8"><CardTitle className="type-heading [font-size:1.5rem]">{c.title}</CardTitle></CardHeader>
                  <CardContent className="type-body px-8 text-(--color-muted)">{c.text}</CardContent>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </LocationSection>
      <FaqSection title="On the way"><FaqList items={travelFaq} /></FaqSection>
    </>
  )
}
