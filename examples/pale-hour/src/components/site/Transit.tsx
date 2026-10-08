'use client'
// Getting here, by the way you are coming: shadcn Tabs, restyled.
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function Transit({ label, items }: { label: string; items: { id: string; label: string; text: string }[] }) {
  return (
    <div>
      <h2 className="type-utility mb-2">{label}</h2>
      <Tabs defaultValue={items[0].id}>
        <TabsList aria-label={label}>
          {items.map((t) => <TabsTrigger key={t.id} value={t.id}>{t.label}</TabsTrigger>)}
        </TabsList>
        {items.map((t) => <TabsContent key={t.id} value={t.id} className="type-body max-w-[52ch]">{t.text}</TabsContent>)}
      </Tabs>
    </div>
  )
}
