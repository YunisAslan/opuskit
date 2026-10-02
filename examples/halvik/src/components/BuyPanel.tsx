'use client'
// The buy panel itself (shadcn Sheet, RadioGroup, Select, Switch). Loaded the first time someone opens it, so its code
// stays out of the first page load. State lives in BuyProvider (Buy.tsx).
import { toast } from 'sonner'
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { MediaAsset } from '@/components/MediaAsset'
import { totalOf, type Order } from '@/components/Buy'
import { builds, dialAddOn, layouts, switchTypes, usd, type Build, type Layout, type SwitchType } from '@/config/product'

function Option({ value, title, line, price }: { value: string; title: string; line: string; price?: string }) {
  return (
    <Label htmlFor={`opt-${value}`} className="flex cursor-pointer items-start gap-3 rounded-(--radius-button) border border-(--color-border) p-3.5 has-data-checked:border-(--color-text) has-data-checked:bg-(--color-background)">
      <RadioGroupItem id={`opt-${value}`} value={value} className="mt-0.5" />
      <span className="flex-1"><span className="block">{title}</span><span className="type-utility mt-1 block font-normal text-(--color-muted)">{line}</span></span>
      {price && <span>{price}</span>}
    </Label>
  )
}

export default function BuyPanel({ open, setOpen, o, set }: { open: boolean; setOpen: (v: boolean) => void; o: Order; set: (p: Partial<Order>) => void }) {
  const keyboard = o.build !== 'dial'
  const add = () => {
    setOpen(false)
    const what = o.build === 'dial' ? builds.dial.name
      : [builds[o.build].name, o.build === 'complete' ? `${switchTypes[o.switch].name} switches` : null, layouts[o.layout], o.dial ? 'with the Dial' : null].filter(Boolean).join(', ')
    toast.success('Added to your bag', { description: `${what}. ${usd(totalOf(o))}` })
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full gap-0 overflow-y-auto data-[side=right]:w-full sm:data-[side=right]:max-w-md motion-reduce:animate-none" data-lenis-prevent>
          <SheetHeader className="p-6 pb-2">
            <SheetTitle>{keyboard ? 'Build your Halvik 65' : 'Halvik Dial'}</SheetTitle>
            <SheetDescription>Free shipping over $150. Ships within five working days.</SheetDescription>
          </SheetHeader>
          <div className="space-y-7 px-6 py-4">
            <MediaAsset id={keyboard ? 'product' : 'row2'} sizes="400px" frameClassName="aspect-[16/10]" className={keyboard ? 'object-[50%_55%]' : ''} />
            <fieldset>
              <legend className="type-utility mb-3 text-(--color-muted)">What you get</legend>
              <RadioGroup value={o.build} onValueChange={(v) => set({ build: v as Build })} className="gap-2">
                {(Object.keys(builds) as Build[]).map((b) => <Option key={b} value={b} title={builds[b].name} line={builds[b].line} price={usd(builds[b].price)} />)}
              </RadioGroup>
            </fieldset>
            {o.build === 'complete' && (
              <fieldset>
                <legend className="type-utility mb-3 text-(--color-muted)">Switches</legend>
                <RadioGroup value={o.switch} onValueChange={(v) => set({ switch: v as SwitchType })} className="gap-2">
                  {(Object.keys(switchTypes) as SwitchType[]).map((s) => <Option key={s} value={s} title={switchTypes[s].name} line={switchTypes[s].line} />)}
                </RadioGroup>
              </fieldset>
            )}
            {keyboard && (
              <>
                <div className="space-y-3">
                  <Label htmlFor="buy-layout" className="type-utility text-(--color-muted)">Layout</Label>
                  <Select value={o.layout} onValueChange={(v) => set({ layout: v as Layout })}>
                    <SelectTrigger id="buy-layout" className="w-full"><SelectValue /></SelectTrigger>
                    <SelectContent position="popper">{(Object.keys(layouts) as Layout[]).map((l) => <SelectItem key={l} value={l}>{layouts[l]}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <Label htmlFor="buy-dial" className="flex cursor-pointer items-center justify-between gap-4 rounded-(--radius-button) border border-(--color-border) p-3.5">
                  <span><span className="block">Add the Halvik Dial</span><span className="type-utility mt-1 block font-normal text-(--color-muted)">{usd(dialAddOn)} with a keyboard, {usd(builds.dial.price)} on its own</span></span>
                  <Switch id="buy-dial" checked={o.dial} onCheckedChange={(dial) => set({ dial })} />
                </Label>
              </>
            )}
          </div>
          <SheetFooter className="sticky bottom-0 mt-auto flex-row items-center justify-between gap-4 border-t border-(--color-border) bg-(--color-surface) p-6">
            <p><span className="type-utility block text-(--color-muted)">Total</span><span className="type-heading">{usd(totalOf(o))}</span></p>
            <Button size="lg" onClick={add}>Add to bag</Button>
          </SheetFooter>
        </SheetContent>
    </Sheet>
  )
}
