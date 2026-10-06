'use client'
// Brand's right side: the picked colours, lettering and shape put to work at full size — a style tile, not a page
// shrunk to a thumbnail: your name and words as a headline, a paragraph, the main button and a link, a card on the
// surface, a photo, an inverse band, and the palette.
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import type { CSSProperties } from 'react'
import { palettes } from '@/data/ingredients'
import { goals } from '@/data/taxonomy'
import { inferGoal } from '@/features/kit/plan'
import type { FontSpec, KitPlan, PaletteId, ShapeStyle, TypographyPairing } from '@/types/domain'

const face = (f: FontSpec): CSSProperties => ({ fontFamily: `'${f.family}'`, fontWeight: f.weight, letterSpacing: f.letterSpacing, fontStyle: f.italic ? 'italic' : undefined, textTransform: f.uppercase ? 'uppercase' : undefined, fontStretch: f.stretch })

export function UsedOn({ plan, palette, type, shape, photo }: { plan: KitPlan; palette: PaletteId; type: TypographyPairing; shape: ShapeStyle; photo: string }) {
  const p = palettes[palette], c = p.colors, t = type
  const name = plan.name || 'Your name'
  const line = plan.about || 'What you do, and for whom.'

  return (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-xl border border-line" style={{ background: c.background, color: c.text }}>
        <div className="flex items-center justify-between px-6 pt-5 text-sm" style={face(t.utility)}>
          <span style={{ ...face(t.display), fontSize: '1.15rem', textTransform: 'none' }}>{name}</span>
          <span className="flex gap-5" style={{ color: c.muted }}><span style={{ color: c.text }}>Work</span><span>About</span><span>Contact</span></span>
        </div>
        <div className="px-6 pb-6 pt-7">
          <h3 className="break-words text-[clamp(1.9rem,2.8vw,2.9rem)]" style={{ ...face(t.display), lineHeight: t.display.lineHeight }}>{t.sample}</h3>
          <p className="mt-3 max-w-md text-base" style={{ ...face(t.body), lineHeight: t.body.lineHeight, color: c.text }}>{line}</p>
          <div className="mt-5 flex flex-wrap items-center gap-5">
            <span className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium" style={{ ...face(t.body), background: c.accent, color: c.background, borderRadius: shape.button }}>{goals[plan.goal ?? inferGoal(plan)].cta[0]}<ArrowRight size={15} aria-hidden /></span>
            <span className="text-sm underline underline-offset-4" style={face(t.body)}>See the work</span>
          </div>
        </div>
        {/* On short screens the card row goes, so the whole example always fits beside the lists (never its own scroll). */}
        <div className="grid grid-cols-2 gap-3 px-6 pb-6 [@media(max-height:840px)]:hidden">
          <div className="p-4" style={{ background: c.surface, borderRadius: shape.card, boxShadow: shape.shadow }}>
            <p className="text-[11px]" style={{ ...face(t.utility), color: c.muted }}>01 — Studio</p>
            <p className="mt-2 text-xl leading-tight" style={face(t.heading)}>Made slowly, kept for years</p>
            <p className="mt-2 text-sm" style={{ ...face(t.body), lineHeight: t.body.lineHeight, color: c.muted }}>Three rooms, one long table.</p>
          </div>
          <div className="relative min-h-32 overflow-hidden" style={{ borderRadius: shape.media }}>
            <Image src={photo} alt="" fill sizes="20rem" className="object-cover" />
          </div>
        </div>
        <div className="flex items-end justify-between gap-4 px-6 py-4" style={{ background: c.text, color: c.background }}>
          <p className="max-w-xs text-xl leading-snug" style={face(t.heading)}>“Quiet, careful, and on time.”</p>
          <span className="size-3 shrink-0 rounded-full" style={{ background: c.accent }} aria-hidden />
        </div>
        <div className="grid grid-cols-5 text-[10px]" style={face(t.utility)}>
          {(['background', 'surface', 'text', 'muted', 'accent'] as const).map((role) => (
            <div key={role} className="px-2.5 py-2" style={{ background: c[role], color: role === 'background' || role === 'surface' ? c.text : c.background }}>
              <span className="block capitalize">{role === 'background' ? 'ground' : role}</span><span className="uppercase opacity-70">{c[role]}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
