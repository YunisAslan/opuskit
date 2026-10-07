// Typography roles as CSS variables + one utility per role — shared by every Build Package's tokens.css and by
// OpusKit's own previews (globals.css carries the same TYPE_UTILITIES block; check.ts keeps them identical).
import type { TypographyPairing } from '@/types/domain'

export const TYPE_ROLES = ['display', 'heading', 'body', 'utility'] as const

/** Serif faces in the library — their fallback is serif, not sans-serif (a serif display falling back to a sans read as
 *  a different site — Fieldhouse, #17). Brand's lettering filter uses the same list. */
export const SERIF_FAMILIES = new Set(['Amiri', 'Ancizar Serif', 'Bellefair', 'Besley', 'Bodoni Moda', 'Castoro', 'Castoro Titling', 'Cormorant', 'Gilda Display', 'Gloock', 'Hedvig Letters Serif', 'Ibarra Real Nova', 'Imbue', 'Italiana', 'Kalnia', 'Labrada', 'Libertinus Serif', 'Libre Caslon Display', 'Libre Caslon Text', 'Literata', 'Newsreader', 'Noto Serif Display', 'Petrona', 'Prata', 'Sedan', 'Shippori Mincho', 'Source Serif 4', 'Spectral', 'Young Serif'])
const MONO = /mono|courier|press start|martian/i
export const fallbackOf = (family: string) => (SERIF_FAMILIES.has(family) ? 'serif' : MONO.test(family) ? 'monospace' : 'sans-serif')

export function typeVars(t: TypographyPairing): Record<string, string> {
  return Object.fromEntries(TYPE_ROLES.flatMap((k) => [
    [`--font-${k}`, `'${t[k].family}'`], [`--type-${k}-size`, t[k].size], [`--type-${k}-weight`, String(t[k].weight)],
    [`--type-${k}-leading`, t[k].lineHeight], [`--type-${k}-tracking`, t[k].letterSpacing],
    [`--type-${k}-case`, t[k].uppercase ? 'uppercase' : 'none'], [`--type-${k}-stretch`, t[k].stretch ?? 'normal'],
    [`--type-${k}-style`, t[k].italic ? 'italic' : 'normal'], [`--type-${k}-fallback`, fallbackOf(t[k].family)],
  ]))
}

export const TYPE_UTILITIES = TYPE_ROLES.map((k) => `@utility type-${k} { font-family: var(--font-${k}), var(--type-${k}-fallback, sans-serif); font-size: var(--type-${k}-size); font-weight: var(--type-${k}-weight); line-height: var(--type-${k}-leading); letter-spacing: var(--type-${k}-tracking); text-transform: var(--type-${k}-case, none); font-stretch: var(--type-${k}-stretch, normal); font-style: var(--type-${k}-style, normal); }`).join('\n')
