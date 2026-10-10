// Sets a recipe's tokens (colours, type roles, shape) as CSS variables on one box, so ready pieces and sections
// render inside OpusKit exactly as they will in the built site — same variable names as its tokens.css.
import type { CSSProperties, ReactNode } from 'react'
import { typeVars } from '@/lib/type-tokens'
import { FRAMES, chapterTextVars, frameVars, toneVars } from '@/lib/frame'
import { readableOn } from '@/lib/color'
import type { LayoutId, PaletteColors, ShapeStyle, TypographyPairing } from '@/types/domain'

export function tokenVars(colors: PaletteColors, type?: TypographyPairing, shape?: ShapeStyle, chapters?: readonly string[], layout: LayoutId = 'balanced'): CSSProperties {
  return {
    ...frameVars(FRAMES[layout]), ...toneVars(colors, chapters?.[0]),
    ...Object.fromEntries((chapters ?? []).map((c, i) => [`--color-chapter-${i + 1}`, c])),
    ...Object.fromEntries(Object.entries(colors).map(([k, v]) => [`--color-${k}`, v])),
    '--color-on-primary': readableOn(colors.primary, [colors.background, colors.text]),
    ...chapterTextVars(colors, [...(chapters ?? [])]),
    ...(type ? typeVars(type) : {}),
    ...(shape ? { '--radius-button': shape.button, '--radius-card': shape.card, '--radius-media': shape.media, '--shadow-card': shape.shadow.replace('var(--color-text)', colors.text), '--border-ui': shape.border } : {}),
    background: colors.background, color: colors.text,
  } as CSSProperties
}

export function TokenScope({ colors, type, shape, chapters, layout, className, children }: { colors: PaletteColors; type?: TypographyPairing; shape?: ShapeStyle; chapters?: readonly string[]; layout?: LayoutId; className?: string; children: ReactNode }) {
  return <div className={className} style={tokenVars(colors, type, shape, chapters, layout)}>{children}</div>
}
