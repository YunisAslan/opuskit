// Typography roles as CSS variables + one utility per role — shared by every Build Package's tokens.css and by
// OpusKit's own previews (globals.css carries the same TYPE_UTILITIES block; check.ts keeps them identical).
import type { TypographyPairing } from '@/types/domain'

export const TYPE_ROLES = ['display', 'heading', 'body', 'utility'] as const

export function typeVars(t: TypographyPairing): Record<string, string> {
  return Object.fromEntries(TYPE_ROLES.flatMap((k) => [
    [`--font-${k}`, `'${t[k].family}'`], [`--type-${k}-size`, t[k].size], [`--type-${k}-weight`, String(t[k].weight)],
    [`--type-${k}-leading`, t[k].lineHeight], [`--type-${k}-tracking`, t[k].letterSpacing],
    [`--type-${k}-case`, t[k].uppercase ? 'uppercase' : 'none'], [`--type-${k}-stretch`, t[k].stretch ?? 'normal'],
  ]))
}

export const TYPE_UTILITIES = TYPE_ROLES.map((k) => `@utility type-${k} { font-family: var(--font-${k}), sans-serif; font-size: var(--type-${k}-size); font-weight: var(--type-${k}-weight); line-height: var(--type-${k}-leading); letter-spacing: var(--type-${k}-tracking); text-transform: var(--type-${k}-case, none); font-stretch: var(--type-${k}-stretch, normal); }`).join('\n')
