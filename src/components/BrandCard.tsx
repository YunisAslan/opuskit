// The brand as the build will use it (decision 40), drawn as a poster (2026-10-08, the user: simple, creative, nothing
// that looks clickable): the accent as one short rule, the name in the display face, the sentence in the body face, a
// big "Aa" with the faces named — and along the right edge the palette as a printer's colour bar. No buttons: a picture
// of a button asks to be pressed. OpusKit's mark is its own, never the brand's: an ink label in OpusKit's own face and
// colours, at the foot on the type specimen's line — it does not change with the owner's picks.
// Direction draws it beside the lists; the recipe page leads with it; Saved and the landing use the small one.
import type { CSSProperties } from 'react'
import { Logo } from '@/components/Logo'
import type { PaletteColors, TypographyPairing } from '@/types/domain'

const face = (f: TypographyPairing['display']): CSSProperties => ({ fontFamily: `'${f.family}'`, fontWeight: f.weight, letterSpacing: f.letterSpacing, lineHeight: f.lineHeight, fontStyle: f.italic ? 'italic' : undefined, textTransform: f.uppercase ? 'uppercase' : undefined, fontStretch: f.stretch })
const small = (t: TypographyPairing): CSSProperties => ({ fontFamily: `'${t.utility.family}'`, fontWeight: t.utility.weight, fontStretch: t.utility.stretch, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', lineHeight: 1.3 })
// A new palette re-inks the poster instead of swapping it.
const ink = 'background-color 300ms ease, color 300ms ease, border-color 300ms ease'
const BAR = [['background', 'Ground'], ['surface', 'Surface'], ['text', 'Ink'], ['primary', 'Primary'], ['accent', 'Accent']] as const

/** The palette as a printer's colour bar down the poster's edge; each band names itself on hover. */
function ColourBar({ c, className }: { c: PaletteColors; className: string }) {
  return (
    <div className={`flex shrink-0 flex-col border-l ${className}`} style={{ borderColor: c.border, transition: ink }} role="img" aria-label={`Palette: ${BAR.map(([r, n]) => `${n} ${c[r]}`).join(', ')}`}>
      {BAR.map(([r, n], i) => <span key={r} title={`${n} ${c[r].toUpperCase()}`} className={`flex-1 ${i ? 'border-t' : ''}`} style={{ background: c[r], borderColor: c.border, transition: ink }} />)}
    </div>
  )
}

/** OpusKit's maker's label: OpusKit's own ink, face and mark whatever the brand — the one thing on the poster that is not
 *  the owner's. */
const MakerLabel = ({ className = '', mini = false }: { className?: string; mini?: boolean }) => (
  <span className={`pointer-events-none inline-flex items-center bg-ink text-paper shadow-[0_6px_16px_-8px_rgb(14_14_16/.6)] ${mini ? 'gap-1.5 px-2 py-1 text-[11px]' : 'gap-2 px-3 py-1.5 text-[13px]'} ${className}`}>
    <Logo />
  </span>
)

export function BrandCard({ name, about, colors: c, type: t, caption }: { name?: string; about?: string; colors: PaletteColors; type: TypographyPairing; caption: string }) {
  const two = t.body.family !== t.display.family
  return (
    <figure>
      <div className="relative flex min-h-104 border border-line" style={{ background: c.background, color: c.text, transition: ink }} aria-label={`${name || 'Your'} brand`}>
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-10 p-7 md:p-9">
          <div>
            <span aria-hidden className="block h-1 w-10" style={{ background: c.accent, transition: ink }} />
            <p className="mt-6 text-balance text-[clamp(2.2rem,4vw,3.6rem)]" style={face(t.display)}>{name || 'Your name'}</p>
            <p className="mt-4 max-w-[40ch] text-[0.95rem]" style={{ ...face(t.body), lineHeight: 1.6, color: c.muted }}>{about || 'Your sentence, in your body lettering.'}</p>
          </div>
          <div className="flex items-end justify-between gap-6">
            <div className="flex min-w-0 items-end gap-4">
              <span aria-hidden className="text-[clamp(3.5rem,6vw,5.5rem)]" style={{ ...face(t.display), lineHeight: 0.8, textTransform: undefined }}>Aa</span>
              <span className="min-w-0 pb-1" style={{ ...small(t), color: c.muted }}>
                {/* Wraps rather than cuts: on a phone the maker's label shares this line. */}
                <span className="block">{t.display.family}</span>
                {two && <span className="block">{t.body.family}</span>}
              </span>
            </div>
            {/* At the foot, on the specimen's line. */}
            <MakerLabel className="shrink-0" />
          </div>
        </div>
        <ColourBar c={c} className="w-9 md:w-11" />
      </div>
      <figcaption className="mt-3 text-xs text-muted">{caption}</figcaption>
    </figure>
  )
}

/** The same poster, small — Saved's cards and the landing's 02 station. It fills its box (`className` sets the size). */
export function BrandSheetMini({ name, about, colors: c, type: t, className = '', nameSize = '2rem', specimen = true }: { name?: string; about?: string; colors: PaletteColors; type: TypographyPairing; className?: string; nameSize?: string; specimen?: boolean }) {
  return (
    <div className={`relative flex overflow-hidden ${className}`} style={{ background: c.background, color: c.text, transition: ink }}>
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 p-4 md:p-5">
        <div className="min-w-0">
          <span aria-hidden className="block h-0.5 w-6" style={{ background: c.accent }} />
          <p className="mt-3 truncate" style={{ ...face(t.display), fontSize: nameSize, lineHeight: 1 }}>{name || 'Your name'}</p>
          {about && <p className="mt-2 line-clamp-2 max-w-[38ch] text-[0.8rem]" style={{ ...face(t.body), lineHeight: 1.45, color: c.muted }}>{about}</p>}
        </div>
        <div className="flex items-end justify-between gap-3">
          {specimen ? <span aria-hidden style={{ ...face(t.display), fontSize: `calc(${nameSize} * 1.2)`, lineHeight: 0.8, textTransform: undefined }}>Aa</span> : <span />}
          <MakerLabel mini className="shrink-0" />
        </div>
      </div>
      <ColourBar c={c} className="w-5 md:w-6" />
    </div>
  )
}
