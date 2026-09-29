'use client'
import { colorRoles } from '@/data/ingredients'
import { contrast, contrastLabel } from '@/lib/color'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import type { ColorRole, PaletteColors } from '@/types/domain'

const ROLES = Object.keys(colorRoles) as ColorRole[]

export function PaletteEditor({ colors, onChange, onReset, changed }: { colors: PaletteColors; onChange: (c: PaletteColors) => void; onReset: () => void; changed: boolean }) {
  const text = contrast(colors.text, colors.background)
  const muted = contrast(colors.muted, colors.background)
  return (
    <div className="rounded-lg border border-line bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-medium">Customize palette</p>
        <button type="button" onClick={onReset} disabled={!changed} className="text-sm link disabled:no-underline disabled:opacity-40">Reset to curated palette</button>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {ROLES.map((role) => (
          <Popover key={role}>
            <PopoverTrigger className="flex items-center gap-3 rounded-md border border-line p-2 text-left transition-colors hover:border-ink data-[state=open]:border-ink" aria-label={`Change ${role} color`}>
              <span className="h-9 w-9 shrink-0 rounded ring-1 ring-black/10" style={{ background: colors[role] }} />
              <span className="min-w-0 text-sm"><span className="block capitalize">{role}</span><span className="font-mono text-xs text-muted">{colors[role].toUpperCase()}</span></span>
            </PopoverTrigger>
            <PopoverContent className="w-64 space-y-3 bg-white">
              <p className="text-sm font-medium capitalize">{role}</p>
              <input type="color" value={colors[role]} onChange={(e) => onChange({ ...colors, [role]: e.target.value.toUpperCase() })} aria-label={`${role} color picker`}
                className="block h-28 w-full cursor-pointer rounded-md border border-line bg-transparent p-1" />
              <HexField value={colors[role]} onValid={(hex) => onChange({ ...colors, [role]: hex })} />
            </PopoverContent>
          </Popover>
        ))}
      </div>
      <p className={`mt-4 text-sm ${text < 4.5 ? 'text-warn' : 'text-muted'}`}>
        Text on background {text.toFixed(1)}:1 ({contrastLabel(text)}) · Muted {muted.toFixed(1)}:1 ({contrastLabel(muted)})
        {text < 4.5 && ' — body text needs at least 4.5:1 to be readable.'}
      </p>
    </div>
  )
}

/** Type a hex code; applied as soon as it is a valid #RRGGBB. */
function HexField({ value, onValid }: { value: string; onValid: (hex: string) => void }) {
  const [text, setText] = useState(value.toUpperCase())
  useEffect(() => setText(value.toUpperCase()), [value])
  const ok = /^#[0-9A-F]{6}$/.test(text)
  return (
    <Input value={text} aria-label="Hex code" aria-invalid={!ok} maxLength={7} className="font-mono"
      onChange={(e) => { const t = e.target.value.toUpperCase().replace(/^([^#])/, '#$1'); setText(t); if (/^#[0-9A-F]{6}$/.test(t)) onValid(t) }} />
  )
}
