'use client'
import type { CSSProperties } from 'react'
import type { FontSpec, TypographyPairing } from '@/types/domain'
import { useGoogleFonts } from './FontLoader'

export const fontStyle = (f: FontSpec): CSSProperties => ({
  fontFamily: `'${f.family}'`, fontWeight: f.weight, lineHeight: f.lineHeight, letterSpacing: f.letterSpacing,
  fontStyle: f.italic ? 'italic' : undefined, textTransform: f.uppercase ? 'uppercase' : undefined, fontStretch: f.stretch,
})

const ROLES = ['display', 'heading', 'body', 'utility'] as const

/** Compact specimen for choice cards. */
export function TypeCard({ t }: { t: TypographyPairing }) {
  useGoogleFonts(t.googleFamilies)
  return (
    <div>
      <p style={{ ...fontStyle(t.display), fontSize: '2.4rem' }} className="truncate">{t.sample}</p>
      <p style={{ ...fontStyle(t.body), fontSize: '0.95rem', lineHeight: 1.5 }} className="mt-3 text-ink-2">Every choice is written down, so your website is built exactly the way you picked it.</p>
      <p style={{ ...fontStyle(t.utility), fontSize: '0.72rem' }} className="mt-3 text-muted">{t.display.family} · {t.body.family}</p>
    </div>
  )
}

/** Full specimen with specs for each role. */
export function TypeSpecimen({ t, colors }: { t: TypographyPairing; colors?: { bg: string; fg: string; muted: string } }) {
  useGoogleFonts(t.googleFamilies)
  return (
    <div className="divide-y divide-line rounded-lg border border-line" style={{ background: colors?.bg, color: colors?.fg }}>
      {ROLES.map((role) => {
        const f = t[role]
        const size = role === 'display' ? 'clamp(2.4rem, 5vw, 4.2rem)' : role === 'heading' ? 'clamp(1.5rem, 2.5vw, 2rem)' : f.size
        return (
          <div key={role} className="grid gap-3 p-5 md:grid-cols-[10rem_1fr]">
            <div className="text-sm">
              <p className="font-medium capitalize">{role}</p>
              <p style={{ color: colors?.muted }} className={colors ? '' : 'text-muted'}>{f.family} {f.weight}<br />{f.size.replace(/clamp\((.*)\)/, '$1')}<br />lh {f.lineHeight} · ls {f.letterSpacing}</p>
            </div>
            <div className="min-w-0">
              <p style={{ ...fontStyle(f), fontSize: size }} className="break-words">{role === 'body' ? 'Body copy sits at a comfortable measure, under 70 characters per line, with enough line-height to read without effort.' : role === 'utility' ? 'Caption · Label · 2026' : t.sample}</p>
              <p style={{ color: colors?.muted }} className={`mt-2 text-sm ${colors ? '' : 'text-muted'}`}>{f.use}</p>
            </div>
          </div>
        )
      })}
      <p className="p-5 prose-serif text-base"><span className="font-sans font-medium">Why it works. </span>{t.why}</p>
    </div>
  )
}
