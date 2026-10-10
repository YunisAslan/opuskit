// The page frame each recipe writes into its tokens: the chosen layout's container, gutter, section spacing and card /
// media proportions (so "Balanced" and "Full-bleed" really differ in the shipped code), and the section tones — a
// section can sit on the ground, the surface, the inverse (text colour as ground) or a chapter colour, so a page gets
// rhythm instead of one long strip. Used by the Build Package's tokens.css and by the kit's live previews.
import { contrast, mutedOn, readableOn } from './color'
import type { LayoutId, PaletteColors, SectionTone } from '@/types/domain'

export type Frame = { container: string; gutter: string; sectionY: string; ratioCard: string; ratioMedia: string }

export const FRAMES: Record<LayoutId, Frame> = {
  balanced: { container: '1200px', gutter: 'clamp(20px, 4vw, 32px)', sectionY: 'clamp(88px, 11vw, 152px)', ratioCard: '4 / 5', ratioMedia: '16 / 9' },
  editorial: { container: '1440px', gutter: 'clamp(20px, 3vw, 44px)', sectionY: 'clamp(104px, 13vw, 196px)', ratioCard: '3 / 4', ratioMedia: '3 / 2' },
  asymmetric: { container: '100%', gutter: '5vw', sectionY: 'clamp(112px, 15vw, 232px)', ratioCard: '4 / 5', ratioMedia: '3 / 2' },
  grid: { container: '100%', gutter: 'clamp(16px, 2vw, 24px)', sectionY: 'clamp(72px, 9vw, 120px)', ratioCard: '1 / 1', ratioMedia: '4 / 3' },
  'full-bleed': { container: '1200px', gutter: 'clamp(20px, 4vw, 40px)', sectionY: 'clamp(96px, 12vw, 160px)', ratioCard: '3 / 2', ratioMedia: '16 / 9' },
  experimental: { container: '100%', gutter: 'clamp(16px, 1vw + 12px, 28px)', sectionY: 'clamp(80px, 14vw, 240px)', ratioCard: '2 / 3', ratioMedia: '1 / 1' },
}

export const frameVars = (f: Frame): Record<string, string> =>
  ({ '--container': f.container, '--gutter': f.gutter, '--section-y': f.sectionY, '--ratio-card': f.ratioCard, '--ratio-media': f.ratioMedia })

/** The inverse and chapter grounds as concrete colours, with text and muted text that pass AA on them (the rules in
 *  TONE_CSS mix the rest). Chapter text is the palette's ink or ground when one reads (4.5:1), else black or white. */
export function toneVars(c: PaletteColors, chapter?: string): Record<string, string> {
  const chap = chapter ?? c.accent
  const chapText = readableOn(chap, [c.text, c.background].sort((a, b) => contrast(b, chap) - contrast(a, chap)))
  return {
    '--inv-bg': c.text, '--inv-text': c.background, '--inv-muted': mutedOn(c.background, c.text),
    '--inv-accent': contrast(c.accent, c.text) >= 3 ? c.accent : c.background,
    '--chap-bg': chap, '--chap-text': chapText, '--chap-muted': mutedOn(chapText, chap),
  }
}

/** Text for each colour-chapter field (--color-chapter-N-text): what reads on it, so a builder never guesses. */
export const chapterTextVars = (c: PaletteColors, chapters: string[] = []): Record<string, string> =>
  Object.fromEntries(chapters.map((x, i) => [`--color-chapter-${i + 1}-text`, readableOn(x, [c.text, c.background].sort((a, b) => contrast(b, x) - contrast(a, x)))]))

/** Section tones: `data-tone` on a section's root. Muted, surface, secondary and border are mixed from the tone's own
 *  ground and text, so every ready section reads right on any tone without knowing about it. */
export const TONE_CSS = `[data-tone="surface"]{background:var(--color-surface)}
[data-tone="inverse"]{--color-background:var(--inv-bg);--color-text:var(--inv-text);--color-primary:var(--inv-text);--color-accent:var(--inv-accent);--color-muted:var(--inv-muted);--color-on-primary:var(--inv-bg)}
[data-tone="chapter"]{--color-background:var(--chap-bg);--color-text:var(--chap-text);--color-primary:var(--chap-text);--color-accent:var(--chap-text);--color-muted:var(--chap-muted);--color-on-primary:var(--chap-bg)}
[data-tone="inverse"],[data-tone="chapter"]{--color-surface:color-mix(in oklab,var(--color-text) 7%,var(--color-background));--color-secondary:color-mix(in oklab,var(--color-text) 14%,var(--color-background));--color-border:color-mix(in oklab,var(--color-text) 24%,var(--color-background));background:var(--color-background);color:var(--color-text)}`

/** The error colour no palette names: a red that reads on this ground (AA, 4.5:1) — form errors used to borrow the accent
 *  (Fieldhouse, Maison Vey). The warmest of a few reds that passes; the text colour if none does. */
export function errorColor(c: PaletteColors): string {
  const reds = ['#B42318', '#C8102E', '#9F1D14', '#FF7A6B', '#FF9286', '#FFB4A9']
  return reds.find((x) => contrast(x, c.background) >= 4.5) ?? c.text
}

export const TONES: SectionTone[] = ['ground', 'surface', 'inverse', 'chapter']
