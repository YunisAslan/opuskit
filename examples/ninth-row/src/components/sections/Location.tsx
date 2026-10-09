'use client'
// Location — media "over": the facts on a card over the exterior photo — address, hours, how to get here (tabs: train,
// bus, bike), a real map link and tap-to-call. The photo and its opening are the page's moment (CreditsLocation).
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CreditsLocation } from '@/components/visit/CreditsLocation'
import { asset } from '@/config/assets'

type Transit = { id: string; label: string; text: string }
type P = {
  title: string; address: string; hours: string[]; mapUrl: string; mapLabel: string; phone: string; callLabel: string
  corners: { topLeft: string; topRight: string; bottomLeft: string; bottomRight: string }
  transitTitle: string; transit: Transit[]
}

export function LocationSection({ title, address, hours, mapUrl, mapLabel, phone, callLabel, corners, transitTitle, transit }: P) {
  const card = (
    <Card className="bg-(--color-background) p-6 md:p-8">
      <h2 className="type-utility text-(--color-muted)">The address</h2>
      <address className="type-heading mt-2 whitespace-pre-line not-italic">{address}</address>
      <ul className="type-body mt-5 space-y-1 text-(--color-muted)">{hours.map((h) => <li key={h}>{h}</li>)}</ul>
      <h2 className="type-utility mt-8 text-(--color-muted)">{transitTitle}</h2>
      <Tabs defaultValue={transit[0]?.id} className="mt-3">
        <TabsList>{transit.map((t) => <TabsTrigger key={t.id} value={t.id}>{t.label}</TabsTrigger>)}</TabsList>
        {transit.map((t) => <TabsContent key={t.id} value={t.id}><p className="type-body min-h-[6.2em] text-(--color-text)">{t.text}</p></TabsContent>)}
      </Tabs>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a href={mapUrl} target="_blank" rel="noreferrer" className="btn btn-solid flex-1">{mapLabel}</a>
        <a href={`tel:${phone.replace(/\s/g, '')}`} className="btn btn-line flex-1">{callLabel}</a>
      </div>
    </Card>
  )
  // the bottom-right credit sits on the picture's edge: it is the photo's own caption
  return <CreditsLocation title={title} corners={{ ...corners, bottomRight: asset('location').caption ?? corners.bottomRight }} card={card} />
}
