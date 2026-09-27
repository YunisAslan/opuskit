'use client'
import { colorRoles } from '@/data/ingredients'
import { contrast, contrastLabel } from '@/lib/color'
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
          <label key={role} className="flex items-center gap-3 rounded-md border border-line p-2">
            <input type="color" value={colors[role]} onChange={(e) => onChange({ ...colors, [role]: e.target.value.toUpperCase() })} className="h-9 w-9 shrink-0 cursor-pointer rounded border-0 bg-transparent p-0" aria-label={`${role} color`} />
            <span className="min-w-0 text-sm"><span className="block capitalize">{role}</span><span className="font-mono text-xs text-muted">{colors[role].toUpperCase()}</span></span>
          </label>
        ))}
      </div>
      <p className={`mt-4 text-sm ${text < 4.5 ? 'text-warn' : 'text-muted'}`}>
        Text on background {text.toFixed(1)}:1 ({contrastLabel(text)}) · Muted {muted.toFixed(1)}:1 ({contrastLabel(muted)})
        {text < 4.5 && ' — body text needs at least 4.5:1 to be readable.'}
      </p>
    </div>
  )
}
