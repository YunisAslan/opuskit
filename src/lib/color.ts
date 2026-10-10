// WCAG 2.x relative luminance + contrast ratio.
const channel = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)

export function luminance(hex: string) {
  const n = parseInt(hex.replace('#', '').padEnd(6, '0').slice(0, 6), 16)
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => channel(v / 255))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function contrast(a: string, b: string) {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p)
  return (x + 0.05) / (y + 0.05)
}

export function contrastLabel(ratio: number) {
  if (ratio >= 7) return 'AAA'
  if (ratio >= 4.5) return 'AA'
  if (ratio >= 3) return 'AA large text only'
  return 'Decorative only'
}

export const isHex = (v: unknown): v is string => typeof v === 'string' && /^#[0-9a-f]{6}$/i.test(v)

/** The first colour that reads on `bg` as body text (AA, 4.5:1), else black or white, whichever reads better — the palette's
 *  own ink first, so a chapter keeps its character; neutral otherwise (ink stays neutral). */
export function readableOn(bg: string, prefer: string[]): string {
  return prefer.find((c) => contrast(c, bg) >= 4.5) ?? (contrast('#000000', bg) >= contrast('#FFFFFF', bg) ? '#000000' : '#FFFFFF')
}

/** `a` mixed into `b` (share of `a`, 0–1), in sRGB. */
export function mixHex(a: string, b: string, share: number): string {
  const ch = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
  const [x, y] = [ch(a), ch(b)]
  return '#' + x.map((v, i) => Math.round(v * share + y[i] * (1 - share)).toString(16).padStart(2, '0')).join('').toUpperCase()
}

/** Secondary text on a ground: the text colour softened toward the ground (72% — the look the tones always had), only as
 *  far as AA still holds; `text` itself when even that is too soft. The previews' grey-on-colour misses (Kelp Line, Sticky
 *  Weather: 30 of 42 palettes failed on a chapter) came from a fixed 72% mix. */
export function mutedOn(text: string, bg: string): string {
  for (let share = 0.72; share < 1; share += 0.02) { const m = mixHex(text, bg, share); if (contrast(m, bg) >= 4.5) return m }
  return text
}

// OKLab / OKLCH (Björn Ottosson). Perceptual — used to keep palettes genuinely distinct from each other.
export function oklab(hex: string) {
  const n = parseInt(hex.replace('#', ''), 16)
  const lin = (v: number) => { const c = v / 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4 }
  const [r, g, b] = [lin((n >> 16) & 255), lin((n >> 8) & 255), lin(n & 255)]
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s
  const bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  return { L, a, b: bb, C: Math.hypot(a, bb), H: ((Math.atan2(bb, a) * 180) / Math.PI + 360) % 360 }
}

/** ΔE in OKLab. ~0.02 is barely noticeable; under ~0.06 two page grounds read as "the same colour". */
export function deltaE(x: string, y: string) {
  const p = oklab(x), q = oklab(y)
  return Math.hypot(p.L - q.L, p.a - q.a, p.b - q.b)
}
