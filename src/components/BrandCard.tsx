// The brand as the build will use it (decision 40): the name in its display face, the sentence in its body face, the
// main action in its button shape, a link in the accent and the palette. Exact — the one thing a picker can promise.
// Direction draws it beside the lists; the recipe page leads with it.
import type { CSSProperties } from 'react'
import type { PaletteColors, TypographyPairing } from '@/types/domain'

const face = (f: TypographyPairing['display']): CSSProperties => ({ fontFamily: `'${f.family}'`, fontWeight: f.weight, letterSpacing: f.letterSpacing, lineHeight: f.lineHeight, fontStyle: f.italic ? 'italic' : undefined, textTransform: f.uppercase ? 'uppercase' : undefined, fontStretch: f.stretch })

export function BrandCard({ name, about, cta, colors: c, type: t, button, caption }: { name?: string; about?: string; cta: string; colors: PaletteColors; type: TypographyPairing; button: string; caption: string }) {
  return (
    <div>
      <div className="border border-line p-6 md:p-8" style={{ background: c.background, color: c.text }}>
        <p className="text-[clamp(2rem,3.6vw,3.2rem)]" style={face(t.display)}>{name || 'Your name'}</p>
        <p className="mt-4 max-w-[42ch] text-[0.95rem] leading-relaxed" style={{ ...face(t.body), lineHeight: 1.6, color: c.muted }}>{about || 'Your sentence, in your body lettering.'}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <span className="px-4 py-2 text-sm" style={{ ...face(t.utility), background: c.primary, color: c.background, borderRadius: button }}>{cta}</span>
          <span className="text-sm underline underline-offset-4" style={{ ...face(t.utility), color: c.accent }}>Learn more</span>
        </div>
        <div className="mt-8 flex" aria-hidden>
          {(['background', 'surface', 'text', 'primary', 'accent'] as const).map((r) => <span key={r} className="h-8 flex-1 first:border-l" style={{ background: c[r], borderTop: `1px solid ${c.border}`, borderBottom: `1px solid ${c.border}`, borderRight: `1px solid ${c.border}`, borderLeftColor: c.border }} />)}
        </div>
      </div>
      <p className="mt-2 text-xs text-muted">{caption}</p>
    </div>
  )
}
