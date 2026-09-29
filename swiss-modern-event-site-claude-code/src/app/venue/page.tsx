import type { Metadata } from "next"
import Link from "next/link"
import { SectionHeader } from "@/components/SectionHeader"
import { HoverPreview } from "@/components/HoverPreview"
import { Reveal } from "@/components/Reveal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { site } from "@/config/site"

export const metadata: Metadata = { title: "Venue & travel", description: "How to reach the Sheki Polo Ground and where to stay." }

const areas = [
  { title: "The field", detail: "A 270 by 150 metre grass ground, rolled each morning. Guests watch from the west lawn.", image: "photoGallop" as const },
  { title: "Horse lines", detail: "Ponies rest between chukkas under the plane trees. Open to guests with a groom present.", image: "photoRider" as const },
  { title: "Covered arena", detail: "Warm-up ring and wet-weather shelter, 50 metres from the clubhouse.", image: "photoArena" as const },
  { title: "Stable block", detail: "Forty boxes at the east gate. Visits at 10:30 and 15:30 each day.", image: "photoStables" as const },
]

const travel = [
  { title: "By air", km: "90 min", text: "Gabala International Airport. Taxis wait outside arrivals; ask for the Kish road." },
  { title: "From Baku", km: "4 h 30", text: "Five hours by road via Ismayilli, or the overnight train to Shaki station." },
  { title: "Shuttle bus", km: "20 min", text: "Every 20 minutes from Sheki bus station, 09:30 to 20:00. Free with your RSVP email." },
  { title: "Parking", km: "400", text: "Spaces on the grass by the east gate. Arrive before 10:30 on Sunday." },
]

const stays = [
  { title: "Caravanserai Hotel", km: "3 km", text: "Rooms in the eighteenth-century upper caravanserai. Guest rate until 1 May." },
  { title: "Sheki Palace Hotel", km: "2 km", text: "Modern rooms with a view of the ground from the upper floors." },
  { title: "Marxal Resort", km: "9 km", text: "Forest resort with a spa. Shuttle to the ground at 09:45 and back at 19:00." },
  { title: "Guest houses, Kish", km: "5 km", text: "Family rooms in Kish village. We keep a list; ask when you reply." },
]

function CardGrid({ items }: { items: { title: string; km: string; text: string }[] }) {
  return (
    <Reveal className="grid grid-cols-1 border-t border-l border-border sm:grid-cols-2 lg:grid-cols-4">
      {items.map((c) => (
        <Card key={c.title} className="aspect-square gap-0 border-0 border-r border-b border-border bg-background py-0 ring-0 max-sm:aspect-auto">
          <CardHeader className="p-6">
            <CardTitle className="type-heading">{c.title}</CardTitle>
          </CardHeader>
          <CardContent className="mt-auto p-6">
            <p className="font-display text-[clamp(2.5rem,4vw,3.5rem)] leading-none tracking-[-0.02em]">{c.km}</p>
            <CardDescription className="type-body mt-4 text-muted">{c.text}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </Reveal>
  )
}

export default function VenuePage() {
  return (
    <section className="page pt-32 pb-24 lg:pt-48 lg:pb-32">
      <SectionHeader as="h1" label="Venue & travel" lines={["Find the ground,", "then your bed"]} mobile={["Find the", "ground, then", "your bed"]} />

      <Tabs defaultValue="ground" className="mt-16 gap-10 lg:mt-24">
        <TabsList className="h-auto w-full justify-start gap-0 overflow-x-auto border-b border-border bg-transparent p-0">
          {[
            ["ground", "The ground"],
            ["travel", "Getting there"],
            ["stay", "Where to stay"],
          ].map(([v, l]) => (
            <TabsTrigger
              key={v}
              value={v}
              className="type-utility h-12 flex-none border-0 border-b-2 border-transparent px-0 pr-8 text-muted data-[state=active]:border-text data-[state=active]:bg-transparent data-[state=active]:text-text"
            >
              {l}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="ground">
          <HoverPreview items={areas} />
        </TabsContent>
        <TabsContent value="travel">
          <CardGrid items={travel} />
        </TabsContent>
        <TabsContent value="stay">
          <CardGrid items={stays} />
        </TabsContent>
      </Tabs>

      <div className="mt-24 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-text pt-8">
        <Button asChild size="lg" className="type-utility">
          <Link href="/rsvp">RSVP<span className="font-normal">{site.dates}</span></Link>
        </Button>
        <p className="text-muted">Shuttle passes and hotel rates come with your confirmation.</p>
      </div>
    </section>
  )
}
