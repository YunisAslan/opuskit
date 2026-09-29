// Sets a recipe's tokens (colours, type roles, shape) as CSS variables on one box, so ready pieces and sections
// render inside OpusKit exactly as they will in the built site — same variable names as its tokens.css.
import type { CSSProperties, ReactNode } from 'react'
import { typeVars } from '@/lib/type-tokens'
import type { PaletteColors, ShapeStyle, TypographyPairing } from '@/types/domain'

export function tokenVars(colors: PaletteColors, type?: TypographyPairing, shape?: ShapeStyle, chapters?: readonly string[]): CSSProperties {
  return {
    ...Object.fromEntries((chapters ?? []).map((c, i) => [`--color-chapter-${i + 1}`, c])),
    ...Object.fromEntries(Object.entries(colors).map(([k, v]) => [`--color-${k}`, v])),
    ...(type ? typeVars(type) : {}),
    ...(shape ? { '--radius-button': shape.button, '--radius-card': shape.card, '--radius-media': shape.media, '--shadow-card': shape.shadow.replace('var(--color-text)', colors.text), '--border-ui': shape.border } : {}),
    background: colors.background, color: colors.text,
  } as CSSProperties
}

export function TokenScope({ colors, type, shape, chapters, className, children }: { colors: PaletteColors; type?: TypographyPairing; shape?: ShapeStyle; chapters?: readonly string[]; className?: string; children: ReactNode }) {
  return <div className={className} style={tokenVars(colors, type, shape, chapters)}>{children}</div>
}
