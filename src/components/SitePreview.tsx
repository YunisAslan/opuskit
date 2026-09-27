'use client'
// A miniature, live website rendered from ingredients. Scales with its container (cqw units),
// so the same component works as a thumbnail, a questionnaire preview or a recipe hero.

import type { CSSProperties } from 'react'
import { directions } from '@/data/taxonomy'
import { palettes, typography } from '@/data/ingredients'
import { img, type ImageKey } from '@/data/images'
import type { DirectionId, LayoutId, LeadId, MotionLevel, PaletteColors, TypographyPairing, UniversalRecipe } from '@/types/domain'
import { useGoogleFonts } from './FontLoader'

export type PreviewProps = {
  colors: PaletteColors
  type: TypographyPairing
  layout: LayoutId
  lead: LeadId
  motion: MotionLevel
  image: ImageKey
  title: string
  brand?: string
  className?: string
  /** Hide the image entirely (demonstrates an asset-less state). */
  noMedia?: boolean
}

export function previewFromDirection(id: DirectionId, over: Partial<PreviewProps> = {}): PreviewProps {
  const d = directions[id]
  return {
    colors: palettes[d.defaults.palette].colors, type: typography[d.defaults.typography], layout: d.defaults.layout,
    lead: d.defaults.lead, motion: d.defaults.motion, image: d.image, title: d.line, ...over,
  }
}

export function previewFromRecipe(r: UniversalRecipe, over: Partial<PreviewProps> = {}): PreviewProps {
  const colors = Object.fromEntries(r.visualSystem.palette.tokens.map((t) => [t.role, t.hex])) as PaletteColors
  const s = r.metadata.spec
  return { colors, type: r.visualSystem.typography, layout: r.layoutSystem.id, lead: s.lead, motion: s.motion, image: r.metadata.image, title: r.contentDirection.headlineExamples[0], ...over }
}

const font = (f: TypographyPairing['display']): CSSProperties => ({
  fontFamily: `'${f.family}', serif`, fontWeight: f.weight, letterSpacing: f.letterSpacing, lineHeight: f.lineHeight,
  fontStyle: f.italic ? 'italic' : undefined, textTransform: f.uppercase ? 'uppercase' : undefined, fontStretch: f.stretch,
})

export function SitePreview(p: PreviewProps) {
  useGoogleFonts(p.type.googleFamilies)
  const c = p.colors
  const display = font(p.type.display)
  const body: CSSProperties = { fontFamily: `'${p.type.body.family}', sans-serif` }
  const util: CSSProperties = { fontFamily: `'${p.type.utility.family}', sans-serif`, letterSpacing: p.type.utility.letterSpacing, textTransform: p.type.utility.uppercase ? 'uppercase' : undefined, fontStyle: p.type.utility.italic ? 'italic' : undefined, fontStretch: p.type.utility.stretch }
  const brand = p.brand ?? 'Studio'
  const bleed = p.layout === 'full-bleed' && !p.noMedia && p.lead !== 'typography'
  const fg = bleed ? '#F7F4EE' : c.text

  const media = <Media {...p} />

  return (
    <div
      data-motion={p.motion}
      className={`@container relative isolate overflow-hidden select-none ${p.className ?? ''}`}
      style={{ background: c.background, color: c.text, containerType: 'inline-size', aspectRatio: '16 / 10' }}
      aria-hidden
    >
      {bleed && <div className="absolute inset-0 -z-10">{media}<div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,.25), rgba(0,0,0,.05) 40%, rgba(0,0,0,.55))' }} /></div>}

      {/* nav */}
      <div className="flex items-center justify-between" style={{ padding: '3cqw 4cqw', fontSize: '1.5cqw', color: fg, ...util }}>
        <span style={{ ...font(p.type.heading), fontSize: '2cqw', textTransform: 'none', letterSpacing: '-0.01em' }}>{brand}</span>
        <span className="flex" style={{ gap: '3cqw', opacity: 0.8 }}><span>Work</span><span>About</span><span>Contact</span></span>
      </div>

      {p.layout === 'balanced' && (
        <div className="flex flex-col items-center text-center" style={{ padding: '2cqw 8cqw 0' }}>
          <Title p={p} style={{ ...display, fontSize: '6.4cqw', maxWidth: '70cqw' }} />
          <p style={{ ...body, fontSize: '1.6cqw', color: c.muted, marginTop: '1.6cqw' }}>Crafted slowly, made to last.</p>
          <Button c={c} util={util} />
          <div className="w-full overflow-hidden" style={{ marginTop: '3cqw', height: '26cqw', borderRadius: '.6cqw' }}>{media}</div>
        </div>
      )}

      {p.layout === 'editorial' && (
        <div className="grid" style={{ gridTemplateColumns: '7fr 5fr', gap: '3cqw', padding: '2cqw 4cqw 0' }}>
          <div className="flex flex-col justify-between">
            <span style={{ ...util, fontSize: '1.3cqw', color: c.muted }}>The autumn issue</span>
            <Title p={p} style={{ ...display, fontSize: '8cqw' }} />
            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '2cqw', ...body, fontSize: '1.35cqw', color: c.muted, lineHeight: 1.5 }}>
              <p>An index of spaces, objects and the people who make them.</p><p>Photographed in natural light across four seasons.</p>
            </div>
          </div>
          <div className="overflow-hidden" style={{ height: '48cqw' }}>{media}</div>
        </div>
      )}

      {p.layout === 'asymmetric' && (
        <div className="relative" style={{ height: '52cqw' }}>
          <div className="absolute overflow-hidden" style={{ right: '4cqw', top: '1cqw', width: '44cqw', height: '48cqw' }}>{media}</div>
          <div className="absolute" style={{ left: '6cqw', bottom: '5cqw', maxWidth: '38cqw' }}>
            <Title p={p} style={{ ...display, fontSize: '4.6cqw' }} />
            <p style={{ ...body, fontSize: '1.35cqw', color: c.muted, marginTop: '1.6cqw', lineHeight: 1.7 }}>A quiet place for considered things.</p>
          </div>
          <span className="absolute" style={{ left: '6cqw', top: '4cqw', ...util, fontSize: '1.2cqw', color: c.muted }}>Est. 2014</span>
        </div>
      )}

      {p.layout === 'grid' && (
        <div style={{ padding: '0 4cqw' }}>
          <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: '1.5cqw' }}>
            <Title p={p} style={{ ...display, fontSize: '8.6cqw' }} />
          </div>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginTop: '2.5cqw', borderTop: `1px solid ${c.border}`, borderLeft: `1px solid ${c.border}` }}>
            {['Index', 'Services', 'Clients', ''].map((l, i) => (
              <div key={i} style={{ borderRight: `1px solid ${c.border}`, borderBottom: `1px solid ${c.border}`, height: '22cqw', padding: i === 3 ? 0 : '1.4cqw', ...util, fontSize: '1.2cqw' }} className="overflow-hidden">
                {i === 3 ? media : <><div style={{ ...body, color: c.text, fontSize: '1.3cqw', textTransform: 'none', letterSpacing: 0 }}>{l}</div></>}
              </div>
            ))}
          </div>
        </div>
      )}

      {p.layout === 'full-bleed' && (
        <div className="absolute" style={{ left: '5cqw', right: '5cqw', bottom: '5cqw', color: fg }}>
          <span style={{ ...util, fontSize: '1.3cqw', opacity: 0.8 }}>{p.lead === 'video' ? 'Chapter one' : 'Selected work'}</span>
          <Title p={p} style={{ ...display, fontSize: '7.6cqw', maxWidth: '70cqw', marginTop: '1cqw' }} />
          {!bleed && <div className="overflow-hidden" style={{ marginTop: '2cqw', height: '14cqw' }}>{media}</div>}
        </div>
      )}

      {p.layout === 'experimental' && (
        <div className="relative" style={{ height: '52cqw' }}>
          <div className="absolute overflow-hidden" style={{ left: '30cqw', top: '2cqw', width: '34cqw', height: '46cqw', borderRadius: '17cqw 17cqw 0 0' }}>{media}</div>
          <div className="absolute" style={{ left: '4cqw', top: '10cqw', right: '4cqw', mixBlendMode: p.noMedia ? undefined : 'difference', color: p.noMedia ? c.text : '#fff' }}>
            <Title p={p} style={{ ...display, fontSize: '9cqw' }} />
          </div>
          <span className="absolute" style={{ right: '4cqw', bottom: '4cqw', ...util, fontSize: '1.3cqw', color: c.accent, transform: 'rotate(-90deg)', transformOrigin: 'right bottom' }}>Twelve projects</span>
        </div>
      )}
    </div>
  )
}

function Title({ p, style }: { p: PreviewProps; style: CSSProperties }) {
  return <h3 className="sp-title" style={{ margin: 0, textWrap: 'balance', ...style }}>{p.title}</h3>
}

function Button({ c, util }: { c: PaletteColors; util: CSSProperties }) {
  return <span style={{ ...util, marginTop: '2cqw', fontSize: '1.3cqw', padding: '1cqw 2.4cqw', background: c.primary, color: c.background, borderRadius: '99cqw' }}>Book a visit</span>
}

function Media(p: PreviewProps) {
  const c = p.colors
  if (p.noMedia) {
    return <div className="grid h-full w-full place-items-center" style={{ border: `1px dashed ${c.muted}`, color: c.muted, fontSize: '1.4cqw' }}>No media yet</div>
  }
  if (p.lead === 'typography') {
    return (
      <div className="flex h-full w-full items-end overflow-hidden" style={{ background: c.surface, padding: '1.5cqw' }}>
        <span style={{ ...font(p.type.display), fontSize: '22cqw', lineHeight: 0.75, color: c.accent }}>Aa</span>
      </div>
    )
  }
  if (p.lead === 'illustration') {
    return (
      <svg viewBox="0 0 100 120" className="h-full w-full" preserveAspectRatio="xMidYMid slice" style={{ background: c.surface }}>
        <circle cx="62" cy="40" r="22" fill={c.accent} />
        <path d="M0 120 C 25 70, 55 70, 100 95 L100 120Z" fill={c.primary} />
        <path d="M0 105 C 30 85, 60 100, 100 80" stroke={c.background} strokeWidth="1.5" fill="none" />
      </svg>
    )
  }
  return (
    <div className="sp-media relative h-full w-full overflow-hidden" style={{ background: c.surface }}>
      <img src={img(p.image, 900)} alt="" loading="lazy" className="h-full w-full" style={{ objectFit: p.lead === 'product' ? 'contain' : 'cover', padding: p.lead === 'product' ? '8%' : 0, borderRadius: p.lead === '3d' ? '50%' : 0, transform: p.lead === '3d' ? 'scale(.8)' : undefined }} />
      {p.lead === 'video' && (
        <span className="absolute flex items-center" style={{ left: '1.4cqw', bottom: '1.4cqw', gap: '.8cqw', fontSize: '1.2cqw', color: '#fff', background: 'rgba(0,0,0,.45)', padding: '.5cqw 1cqw', borderRadius: '99cqw' }}>
          <svg viewBox="0 0 10 10" style={{ width: '1cqw', height: '1cqw' }} fill="currentColor"><path d="M2 1l7 4-7 4z" /></svg> 0:08
        </span>
      )}
    </div>
  )
}
