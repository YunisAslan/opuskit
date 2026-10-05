'use client'
// Discover (docs/plan-library.md): three shelves — sites, sections, effects — every card drawn in the look you would
// get, filtered by kind of site and by what you're after. Anything can go into the Collection with +.
import { Search } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, type ReactNode } from 'react'
import { LazyMount } from '@/components/LazyMount'
import { Chip } from '@/components/ui'
import { Input } from '@/components/ui/input'
import { examples } from '@/data/examples'
import { EFFECTS, footerStyles, navStyles, sections } from '@/data/patterns'
import { behaviourOf, pieceSlots, pieces } from '@/data/pieces'
import { seedBySlug } from '@/data/recipes'
import { sectionGuide } from '@/data/section-guide'
import { sectionVariants } from '@/data/section-variants'
import { directions, families, purposes } from '@/data/taxonomy'
import { sectionGroups } from '@/features/kit/plan'
import { allSites, siteName, siteSpec, sitesWith, type CollectionItem, type SiteRef } from '@/features/library/collection'
import { updateCollection, useCollection } from '@/lib/collection'
import { useHydrated } from '@/lib/store'
import type { FamilyId, PieceId, PieceSlot, PurposeId, SectionId } from '@/types/domain'
import { CollectButton, ItemPreview, SiteThumb, sampleLook, useCollect, type Look } from './parts'

const SHELVES = [['sites', 'Sites'], ['sections', 'Sections'], ['effects', 'Effects']] as const
type Shelf = (typeof SHELVES)[number][0]
type Entry = { item: CollectionItem; name: string; line: string; group: string; text: string; badge?: string }

// ─── What each shelf holds ──────────────────────────────────────────────────

const cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1)
const SECTION_ENTRIES: Entry[] = [
  ...EFFECTS.map((e): Entry => ({ item: { kind: 'hero', id: e.hero }, name: e.name, line: e.line, group: 'First screen', text: '' })),
  ...Object.values(navStyles).map((n): Entry => ({ item: { kind: 'menu', id: n.id }, name: n.name, line: n.line, group: 'Menu', text: '' })),
  ...sectionGroups.flatMap((g) => g.ids.flatMap((id) => {
    const looks = sectionVariants[id]?.options ?? [undefined]
    return looks.map((v): Entry => ({
      item: { kind: 'section', id, ...(v ? { variant: v.id } : {}) }, group: g.name, text: g.job,
      name: v ? `${sections[id].name} — ${v.name}` : sections[id].name, line: v?.line ?? cap(sectionGuide[id]?.look ?? '') + '.',
    }))
  })),
  ...Object.values(footerStyles).map((f): Entry => ({ item: { kind: 'footer', id: f.id }, name: f.name, line: f.line, group: 'Footer', text: '' })),
].map((e) => ({ ...e, text: `${e.name} ${e.line} ${e.group} ${e.text}`.toLowerCase() }))
const SECTION_GROUPS = ['First screen', 'Menu', ...sectionGroups.map((g) => g.name), 'Footer']

const EFFECT_ENTRIES: Entry[] = (Object.keys(pieces) as PieceId[]).map((id) => {
  const p = pieces[id]
  return { item: { kind: 'effect', id }, name: p.name, line: p.line, group: pieceSlots[p.slot].name, badge: behaviourOf(id) ? 'Whole site' : 'On one part', text: `${p.name} ${p.line} ${pieceSlots[p.slot].name}`.toLowerCase() }
})
const EFFECT_GROUPS = [...new Set((Object.keys(pieceSlots) as PieceSlot[]).filter((s) => EFFECT_ENTRIES.some((e) => e.group === pieceSlots[s].name)).map((s) => pieceSlots[s].name))]

function siteInfo(ref: SiteRef) {
  const spec = siteSpec(ref)!, [kind, slug] = ref.split(':')
  const summary = (kind === 'example' ? examples.find((e) => e.slug === slug)?.summary : seedBySlug[slug]?.summary) ?? ''
  return { ref, spec, name: siteName(ref), summary, built: kind === 'example', families: directions[spec.direction].families, text: `${siteName(ref)} ${summary} ${directions[spec.direction].name} ${purposes[spec.purpose].name}`.toLowerCase() }
}
const SITES = allSites.map(siteInfo)
const KINDS = (Object.keys(purposes) as PurposeId[]).filter((p) => p !== 'other')

export function Library() {
  const params = useSearchParams()
  const router = useRouter()
  const ready = useHydrated()
  const c = useCollection()
  const shelf = (SHELVES.find(([s]) => s === params.get('shelf'))?.[0] ?? 'sites') as Shelf
  const [q, setQ] = useState('')
  const [group, setGroup] = useState<string | null>(null)
  const go = (s: Shelf) => { setGroup(null); router.replace(s === 'sites' ? '/library' : `/library?shelf=${s}`, { scroll: false }) }
  const kind = c.purpose
  const setKind = (p: PurposeId | undefined) => updateCollection((x) => ({ ...x, purpose: p }))
  const counts: Record<Shelf, number> = { sites: SITES.length, sections: SECTION_ENTRIES.length, effects: EFFECT_ENTRIES.length }

  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-32 pt-10 md:px-8 md:pt-14">
      <h1 className="display max-w-4xl text-[clamp(2.4rem,5.5vw,4.8rem)]">Find what you like. Collect it.</h1>

      <div className="mt-8">
        <p className="text-sm text-muted">What are you making?</p>
        <div className="-mx-5 mt-2 flex gap-1.5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0 [&>*]:shrink-0 [&>*]:whitespace-nowrap">
          <Chip active={ready && !kind} onClick={() => setKind(undefined)}>Anything</Chip>
          {KINDS.map((p) => <Chip key={p} active={ready && kind === p} onClick={() => setKind(kind === p ? undefined : p)}>{purposes[p].name}</Chip>)}
        </div>
      </div>

      <div className="sticky top-16 z-20 -mx-5 mt-8 flex flex-wrap items-center justify-between gap-3 border-b border-line bg-paper/95 px-5 py-3 backdrop-blur-sm md:-mx-8 md:px-8">
        <div className="flex gap-1" role="tablist" aria-label="Shelves">
          {SHELVES.map(([id, label]) => (
            <button key={id} role="tab" aria-selected={shelf === id} onClick={() => go(id)} className="rounded-full px-4 py-2 text-sm aria-selected:bg-ink aria-selected:text-paper hover:bg-paper-2">
              {label} <span className="tabular-nums opacity-60">{counts[id]}</span>
            </button>
          ))}
        </div>
        <label className="w-full sm:w-72"><span className="sr-only">Search the {shelf}</span>
          <span className="relative block"><Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
            <Input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${shelf}`} className="h-10 w-full rounded-full bg-white pl-10" /></span>
        </label>
      </div>

      <div className="pt-6" role="tabpanel">
        {ready && shelf === 'sites' && <Sites q={q} kind={kind} />}
        {ready && shelf === 'sections' && <Shelf entries={SECTION_ENTRIES} groups={SECTION_GROUPS} group={group} setGroup={setGroup} q={q} kind={kind} usual={kind ? new Set(purposes[kind].pages.flatMap((p) => p.sections ?? [])) : undefined} kindName={kind && purposes[kind].name} />}
        {ready && shelf === 'effects' && <Shelf entries={EFFECT_ENTRIES} groups={EFFECT_GROUPS} group={group} setGroup={setGroup} q={q} kind={kind} />}
      </div>
    </div>
  )
}

// ─── Sites ──────────────────────────────────────────────────────────────────

function Sites({ q, kind }: { q: string; kind?: PurposeId }) {
  const [fam, setFam] = useState<FamilyId | null>(null)
  const [built, setBuilt] = useState(false)
  const list = SITES.filter((s) => (!fam || s.families.includes(fam)) && (!built || s.built) && (!q || s.text.includes(q.toLowerCase())))
  // The chosen kind of site first: those sites lead, the rest follow as "might also suit".
  const mine = kind ? list.filter((s) => s.spec.purpose === kind) : list, rest = kind ? list.filter((s) => s.spec.purpose !== kind) : []
  const card = (s: (typeof SITES)[number]) => (
    <li key={s.ref} className="group relative">
      <Link href={`/library/sites/${s.ref.replace(':', '/')}`} className="block">
        <div className="overflow-hidden rounded-lg border border-line transition-transform duration-300 group-hover:-translate-y-1"><LazyMount className="aspect-[16/10]"><SiteThumb site={s.ref} /></LazyMount></div>
        <div className="mt-3 flex items-baseline justify-between gap-3">
          <h2 className="text-lg font-medium tracking-tight group-hover:text-pencil">{s.name}</h2>
          <span className="shrink-0 text-xs text-muted">{s.built ? 'Built site' : 'Recipe'}</span>
        </div>
        <p className="mt-0.5 text-sm text-muted">{purposes[s.spec.purpose].name} · {directions[s.spec.direction].name}</p>
      </Link>
      <CollectButton item={{ kind: 'site', site: s.ref }} label="Start from this" className="absolute right-3 top-3 shadow-sm" />
    </li>
  )
  return (
    <>
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-sm text-muted">Feel</span>
        {(Object.keys(families) as FamilyId[]).filter((f) => SITES.some((s) => s.families.includes(f))).map((f) => <Chip key={f} active={fam === f} onClick={() => setFam(fam === f ? null : f)}>{families[f].name}</Chip>)}
        <span className="mx-2 h-5 w-px bg-line" aria-hidden />
        <Chip active={built} onClick={() => setBuilt(!built)}>Built and live only</Chip>
      </div>
      {!list.length && <Empty onClear={() => { setFam(null); setBuilt(false) }} />}
      {kind && !!mine.length && <h2 className="mt-8 text-sm text-muted">For a {purposes[kind].name.toLowerCase()}</h2>}
      <ul className="mt-4 grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">{mine.map(card)}</ul>
      {!!rest.length && <><h2 className="mt-14 text-sm text-muted">Other sites</h2>
        <ul className="mt-4 grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">{rest.map(card)}</ul></>}
    </>
  )
}

// ─── Sections and effects ───────────────────────────────────────────────────

function Shelf({ entries, groups, group, setGroup, q, kind, usual, kindName }: { entries: Entry[]; groups: string[]; group: string | null; setGroup: (g: string | null) => void; q: string; kind?: PurposeId; usual?: Set<SectionId>; kindName?: string }) {
  const list = entries.filter((e) => (!group || e.group === group) && (!q || e.text.includes(q.toLowerCase())))
  const shown = groups.filter((g) => list.some((e) => e.group === g))
  return (
    <>
      <div className="flex flex-wrap items-center gap-1.5">
        <Chip active={!group} onClick={() => setGroup(null)}>All</Chip>
        {groups.map((g) => <Chip key={g} active={group === g} onClick={() => setGroup(group === g ? null : g)}>{g}</Chip>)}
      </div>
      {!list.length && <Empty onClear={() => setGroup(null)} />}
      {shown.map((g) => (
        <section key={g} className="mt-10" aria-labelledby={`g-${g}`}>
          <h2 id={`g-${g}`} className="border-t border-ink pt-3 text-xl font-medium tracking-tight">{g}</h2>
          <ul className="mt-5 grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {list.filter((e) => e.group === g).map((e) => <Card key={JSON.stringify(e.item)} e={e} look={sampleLook(e.item, kind)} badge={e.item.kind === 'section' && usual?.has(e.item.id) ? `Usual for a ${kindName!.toLowerCase()}` : e.badge} />)}
          </ul>
        </section>
      ))}
    </>
  )
}

function Card({ e, look, badge }: { e: Entry; look: Look; badge?: string }) {
  const on = e.item.kind === 'section' ? sitesWith(e.item.id) : []
  const { on: picked, flip } = useCollect(e.item)
  return (
    <li className="group relative">
      {/* The whole picture collects it; the + beside the name says whether it is in. */}
      <button type="button" onClick={flip} aria-label={`${picked ? 'Remove' : 'Collect'} ${e.name}`} className={`block w-full overflow-hidden rounded-lg border bg-white transition-colors ${picked ? 'border-ink ring-1 ring-ink' : 'border-line group-hover:border-ink'}`}>
        <LazyMount className="pointer-events-none aspect-[16/10] overflow-hidden"><ItemPreview item={e.item} look={look} /></LazyMount>
      </button>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-medium leading-snug">{e.name}</h3>
          <Meta>{[badge, on.length ? `On ${on.slice(0, 2).map(siteName).join(', ')}${on.length > 2 ? ` +${on.length - 2}` : ''}` : undefined]}</Meta>
        </div>
        <CollectButton item={e.item} />
      </div>
    </li>
  )
}

function Meta({ children }: { children: (string | undefined)[] }) {
  const xs = children.filter(Boolean)
  return xs.length ? <p className="mt-1.5 text-xs text-muted">{xs.join(' · ')}</p> : null
}

function Empty({ onClear }: { onClear: () => void }): ReactNode {
  return <div className="py-20 text-center"><p className="text-xl">Nothing matches all of that.</p><button type="button" className="link mt-3" onClick={onClear}>Clear filters</button></div>
}
