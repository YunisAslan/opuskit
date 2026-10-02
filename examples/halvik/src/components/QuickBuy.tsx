'use client'
// Option picker inside a Product Highlight: choose the switches (and the layout) here, then open the buy panel preset.
import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { BuyButton } from '@/components/Buy'
import { builds, layouts, switchTypes, usd, type Layout, type SwitchType } from '@/config/product'

export function QuickBuy({ withLayout = false, id }: { withLayout?: boolean; id: string }) {
  const [sw, setSw] = useState<SwitchType>('tactile')
  const [layout, setLayout] = useState<Layout>('ansi')
  return (
    <div className="space-y-6">
      <fieldset>
        <legend className="type-utility mb-3 text-(--color-muted)">Switches</legend>
        <RadioGroup value={sw} onValueChange={(v) => setSw(v as SwitchType)} className="grid-cols-3 gap-2">
          {(Object.keys(switchTypes) as SwitchType[]).map((s) => (
            <Label key={s} htmlFor={`${id}-${s}`} className="flex min-h-11 cursor-pointer items-center gap-2.5 rounded-(--radius-button) border border-(--color-border) px-3 has-data-checked:border-(--color-text) has-data-checked:bg-(--color-surface)">
              <RadioGroupItem id={`${id}-${s}`} value={s} />{switchTypes[s].name}
            </Label>
          ))}
        </RadioGroup>
      </fieldset>
      {withLayout && (
        <div className="space-y-3">
          <Label htmlFor={`${id}-layout`} className="type-utility text-(--color-muted)">Layout</Label>
          <Select value={layout} onValueChange={(v) => setLayout(v as Layout)}>
            <SelectTrigger id={`${id}-layout`} className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent position="popper">{(Object.keys(layouts) as Layout[]).map((l) => <SelectItem key={l} value={l}>{layouts[l]}</SelectItem>)}</SelectContent>
          </Select>
        </div>
      )}
      <BuyButton preset={{ build: 'complete', switch: sw, layout }}>Add to bag, {usd(builds.complete.price)}</BuyButton>
    </div>
  )
}
