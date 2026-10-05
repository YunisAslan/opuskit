'use client'
// Style's right side: the picked colours, lettering and shape put to work at full size — a style tile, not a page
// shrunk to a thumbnail: your name and words as a headline, a paragraph, the main button and a link, a card on the
// surface, a photo, an inverse band, and the palette with its contrast. Then OpusKit's built sites with the same colours
// or lettering, as proof of how they look on a finished site.
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import type { CSSProperties } from 'react'
import exampleSpecs from '@/data/example-specs.generated.json'
import { examples } from '@/data/examples'
import { images } from '@/data/images'
import { palettes } from '@/data/ingredients'
import { contrast } from '@/lib/color'
import type { FontSpec, KitPlan, PaletteId, RecipeSpec, ShapeStyle, TypographyPairing } from '@/types/domain'

const specs = exampleSpecs as unknown as Record<string, RecipeSpec>
const built = examples.filter((e) => !e.legacy && specs[e.slug])
const face = (f: FontSpec): CSSProperties => ({ fontFamily: `'${f.family}'`, fontWeight: f.weight, letterSpacing: f.letterSpacing, fontStyle: f.italic ? 'italic' : undefined, textTransform: f.uppercase ? 'uppercase' : undefined, fontStretch: f.stretch })

export function UsedOn({ plan, palette, type, shape, photo }: { plan: KitPlan; palette: PaletteId; type: TypographyPairing; shape: ShapeStyle; photo: string }) {
  const p = palettes[palette], c = p.colors, t = type
  const name = plan.name || 'Your name'
  const line = plan.about || 'One sentence about what you do, and who it is for — your own words go here.'
  const ours = built.filter((e) => specs[e.slug].palette === palette || specs[e.slug].typography === t.id)

  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-xl border border-line" style={{ background: c.background, color: c.text }}>
        <div className="flex items-center justify-between px-6 pt-5 text-sm" style={face(t.utility)}>
          <span style={{ ...face(t.display), fontSize: '1.15rem', textTransform: 'none' }}>{name}</span>
          <span className="flex gap-5" style={{ color: c.muted }}><span style={{ color: c.text }}>Work</span><span>About</span><span>Contact</span></span>
        </div>
        <div className="px-6 pb-8 pt-10">
          <p className="text-xs" style={{ ...face(t.utility), color: c.muted }}>{p.name} · {t.name}</p>
          <h3 className="mt-3 break-words text-[clamp(2.1rem,3.4vw,3.4rem)]" style={{ ...face(t.display), lineHeight: t.display.lineHeight }}>{t.sample}</h3>
          <p className="mt-4 max-w-md text-[1.0625rem]" style={{ ...face(t.body), lineHeight: t.body.lineHeight, color: c.text }}>{line}</p>
          <div className="mt-6 flex flex-wrap items-center gap-5">
            <span className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium" style={{ ...face(t.body), background: c.accent, color: c.background, borderRadius: shape.button }}>Get in touch<ArrowRight size={15} aria-hidden /></span>
            <span className="text-sm underline underline-offset-4" style={face(t.body)}>See the work</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 px-6 pb-6">
          <div className="p-4" style={{ background: c.surface, borderRadius: shape.card, boxShadow: shape.shadow }}>
            <p className="text-[11px]" style={{ ...face(t.utility), color: c.muted }}>01 — Studio</p>
            <p className="mt-2 text-xl leading-tight" style={face(t.heading)}>Made slowly, kept for years</p>
            <p className="mt-2 text-sm" style={{ ...face(t.body), lineHeight: t.body.lineHeight, color: c.muted }}>Surface, muted text and a heading — how cards and forms read.</p>
          </div>
          <div className="relative min-h-40 overflow-hidden" style={{ borderRadius: shape.media }}>
            <Image src={photo} alt="" fill sizes="20rem" className="object-cover" />
          </div>
        </div>
        <div className="flex items-end justify-between gap-4 px-6 py-6" style={{ background: c.text, color: c.background }}>
          <p className="max-w-xs text-xl leading-snug" style={face(t.heading)}>“The dark sections of your site look like this.”</p>
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
      <p className="-mt-5 text-xs text-muted">Text on ground {contrast(c.text, c.background).toFixed(1)}:1 · muted {contrast(c.muted, c.background).toFixed(1)}:1 · {shape.name.toLowerCase()} corners</p>

      {!!ours.length && (
        <section aria-labelledby="ours">
          <h2 id="ours" className="text-sm text-muted">Built with OpusKit in {ours.every((e) => specs[e.slug].palette === palette) ? 'these colours' : ours.every((e) => specs[e.slug].typography === t.id) ? 'this lettering' : 'these colours or this lettering'}</h2>
          <ul className="mt-3 grid grid-cols-2 gap-3">
            {ours.map((e) => (
              <li key={e.slug}>
                <a href={e.livePath} target="_blank" rel="noreferrer" className="group block">
                  <span className="block overflow-hidden rounded-md border border-line"><Image src={`/examples/${e.slug}.jpg`} alt={`${e.title} — homepage`} width={720} height={450} className="aspect-[16/10] w-full object-cover object-top transition-transform duration-300 group-hover:scale-105" /></span>
                  <span className="mt-1.5 block truncate text-sm font-medium group-hover:text-pencil">{e.title.split(/ [—|] |, /)[0]}</span>
                  <span className="block text-xs text-muted">{[specs[e.slug].palette === palette && 'Same colours', specs[e.slug].typography === t.id && 'Same lettering'].filter(Boolean).join(' · ')}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
