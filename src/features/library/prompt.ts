// "Copy as a prompt" on a Library card (the user, 2026-10-11): one design in words an AI builder can act on — what it
// is, how it is laid out, how it moves, what it does on phones — written to fit the reader's own site, not to copy the
// one it was seen on. Pure: built from the catalog and the knowledge base the recipes use.
import { footerStyles, heroes, navStyles, sections } from '@/data/patterns'
import { pieces } from '@/data/pieces'
import { sectionGuide } from '@/data/section-guide'
import { sectionVariants } from '@/data/section-variants'
import { IDEA_BY_ID } from '@/data/site-ideas'
import { TAKE_BY_KEY } from '@/data/takeables'
import type { FooterStyleId, HeroId, NavStyleId, PieceId, SectionId } from '@/types/domain'
import { palettes, typography } from '@/data/ingredients'
import { directions } from '@/data/taxonomy'
import { siteName, takeKeyOf, type CollectionItem, type SiteRef } from './collection'
import { siteTraits } from './inspire'

const FIT = 'Make it belong to my site: my colours, fonts, spacing and words, not a copy of where it was seen. It works on phones, and with reduced motion it keeps its content and drops the movement.'

export function promptFor(key: string): string {
  const e = TAKE_BY_KEY.get(key)
  if (!e) return ''
  return compose(key, e.name, e.line, e.bestOn && siteName(e.bestOn))
}

/** What the knowledge base says about one design, whether or not the Library offers it on its own card. */
function details(key: string): string[] {
  const at = key.indexOf(':'), kind = key.slice(0, at), id = key.slice(at + 1)
  const out: string[] = []
  const add = (label: string, text?: string) => { if (text) out.push(`${label}: ${text}`) }
  const pattern = (p?: { composition: string; behavior: string; responsive: string }) => {
    add('Layout', p?.composition); add('How it moves', p?.behavior); add('On phones', p?.responsive)
  }
  switch (kind) {
    case 'hero': pattern(heroes[id as HeroId]); break
    case 'nav': pattern(navStyles[id as NavStyleId]); break
    case 'footer': pattern(footerStyles[id as FooterStyleId]); break
    case 'section': {
      const [sid, variant] = id.split('/') as [SectionId, string?]
      add('Layout', sectionVariants[sid]?.options.find((o) => o.id === variant)?.line)
      add('Best when', sectionGuide[sid]?.bestWhen)
      break
    }
    case 'effect': {
      const p = pieces[id as PieceId]
      if (p?.rules.length) out.push('Use it so:', ...p.rules.map((r) => `- ${r}`))
      break
    }
    case 'idea': {
      const i = IDEA_BY_ID.get(id)
      add('Where it lives there', i?.page)
      out.push('Make the same idea for my site, as one of its remembered moments, in my site’s own look and words.')
      break
    }
  }
  return out
}

const compose = (key: string, name: string, line: string, seenOn?: string) => {
  const out = details(key)
  return [`Add this to my website: ${name}.`, ...(line ? ['', line] : []), ...(out.length ? ['', ...out] : []), '', FIT, seenOn ? `Seen on ${seenOn}, in the OpusKit Library.` : 'From the OpusKit Library.'].join('\n')
}

/** A design's own name and one line, from the knowledge base — for a design without a catalog card. */
function plain(key: string): [string, string] | undefined {
  const at = key.indexOf(':'), kind = key.slice(0, at), id = key.slice(at + 1)
  switch (kind) {
    case 'hero': { const h = heroes[id as HeroId]; return h && [h.name, ''] }
    case 'nav': { const n = navStyles[id as NavStyleId]; return n && [n.name, n.line] }
    case 'footer': { const f = footerStyles[id as FooterStyleId]; return f && [f.name, f.line] }
    case 'effect': { const p = pieces[id as PieceId]; return p && [p.name, p.line] }
    case 'section': { const [sid] = id.split('/') as [SectionId]; const g = sectionGuide[sid]; return g && [sections[sid]?.name ?? sid, `Shows ${g.look}.`] }
    default: return undefined
  }
}

const colours = (ref: SiteRef) => {
  const p = palettes[siteTraits(ref)!.palette], c = p.colors
  return [`Colours — ${p.name}: ${p.line}`, `Background ${c.background}, surface ${c.surface}, text ${c.text}, muted text ${c.muted}, primary ${c.primary}, secondary ${c.secondary}, accent ${c.accent}, borders ${c.border}.`,
    ...Object.entries(p.usage).map(([role, use]) => `- ${role}: ${use}`)]
}
const lettering = (ref: SiteRef) => {
  const t = typography[siteTraits(ref)!.typography], f = (label: string, x: { family: string; weight: number }) => `${label} ${x.family} ${x.weight}`
  return [`Lettering — ${t.name}: ${t.line}`, `${f('Display', t.display)}; ${f('headings', t.heading)}; ${f('body', t.body)}; ${f('small labels', t.utility)}. All from Google Fonts.`]
}

/** Any taken thing as a prompt: a catalog design, or a site's colours, lettering or whole look; none for what words
 *  cannot carry (how it opens, how much it moves — those are designs with their own cards). */
export function promptForItem(i: CollectionItem): string | undefined {
  const key = takeKeyOf(i)
  if (key && TAKE_BY_KEY.has(key)) return promptFor(key)
  const own = key && plain(key), from = 'from' in i && i.from ? i.from : undefined
  if (key && own && from) return compose(key, own[0], own[1], siteName(from))
  const site = i.kind === 'site' || i.kind === 'like' ? i.site : undefined
  if (!site || !siteTraits(site)) return undefined
  const end = ['', `Seen on ${siteName(site)}, in the OpusKit Library.`]
  if (i.kind === 'like' && i.what === 'colours') return ['Use this colour palette on my website, with these roles.', '', ...colours(site), '', 'Keep text readable on every ground (WCAG AA).', ...end].join('\n')
  if (i.kind === 'like' && i.what === 'lettering') return ['Use this lettering on my website.', '', ...lettering(site), ...end].join('\n')
  if (i.kind === 'site') {
    const d = directions[siteTraits(site)!.direction]
    return [`Give my website the look of ${siteName(site)}: ${d.name}.`, '', ...colours(site), '', ...lettering(site), '', FIT, ...end].join('\n')
  }
  return undefined
}
