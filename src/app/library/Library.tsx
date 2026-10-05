'use client'
// Discover (docs/plan-library.md): three shelves — sites, sections, effects — of sample cards. Wide screens browse with a
// sidebar (what you're making, the shelves, the open shelf's groups with counts: a group shows just that group, like a
// category); phones keep the same as chips and tabs across the top. Anything can go into the Collection with +.
import { ChevronRight, Search } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { useState, type ReactNode } from 'react'
import { LazyMount } from '@/components/LazyMount'
import { Chip } from '@/components/ui'
import { Checkbox } from '@/components/ui/checkbox'
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
      name: v ? `${sections[id].name} — ${v.name.charAt(0).toLowerCase()}${v.name.slice(1)}` : sections[id].name, line: v?.line ?? cap(sectionGuide[id]?.look ?? '') + '.',
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

const slug = (g: string) => `g-${g.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

export function Library() {
  const params = useSearchParams()
  const router = useRouter()
  const ready = useHydrated()
  const c = useCollection()
  const shelf = (SHELVES.find(([s]) => s === params.get('shelf'))?.[0] ?? 'sites') as Shelf
  const [q, setQ] = useState('')
  const [group, setGroup] = useState<string | null>(null) // one group of the open shelf, or all of it
  const [fam, setFam] = useState<FamilyId | null>(null)
  const [built, setBuilt] = useState(false)
  const go = (s: Shelf) => { setGroup(null); router.replace(s === 'sites' ? '/library' : `/library?shelf=${s}`, { scroll: false }); window.scrollTo({ top: 0, behavior: window.scrollY < 1600 ? 'smooth' : 'auto' }) }
  // Picking a group starts its list at the top, without a long scroll through everything above it.
  const pick = (g: string | null) => { setGroup(g); window.scrollTo({ top: 0, behavior: window.scrollY < 1600 ? 'smooth' : 'auto' }) }
  const kind = c.purpose
  const setKind = (p: PurposeId | undefined) => updateCollection((x) => ({ ...x, purpose: p }))
  const counts: Record<Shelf, number> = { sites: SITES.length, sections: SECTION_ENTRIES.length, effects: EFFECT_ENTRIES.length }
  const [entries, groups] = shelf === 'sections' ? [SECTION_ENTRIES, SECTION_GROUPS] : [EFFECT_ENTRIES, EFFECT_GROUPS]
  const found = entries.filter((e) => !q || e.text.includes(q.toLowerCase()))
  const search = (
    <label className="block w-full"><span className="sr-only">Search the {shelf}</span>
      <span className="relative block"><Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
        <Input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${shelf}`} className="h-10 w-full rounded-full bg-white pl-10" /></span>
    </label>
  )

  return (
    <>
    <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-10 md:px-8 md:pt-12 lg:grid lg:grid-cols-[15.5rem_1fr] lg:gap-8">
      <Sidebar shelf={shelf} q={q} group={group} fam={fam} built={built} setBuilt={setBuilt}
        open={(s, g) => { if (s !== shelf) go(s); if (s === 'sites') setFam(g as FamilyId | null); else pick(g) }} />

      <div className="min-w-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h1 className="display text-[clamp(2.2rem,3.4vw,3.2rem)]">Find what you like. Collect it.</h1>
          <div className="hidden w-72 lg:block">{search}</div>
        </div>

        {/* The kind of site is an optional filter, never a question: it puts that kind's sites first and marks the
            sections it usually has. */}
        <div className="mt-6 flex items-center gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] max-lg:-mx-5 max-lg:px-5 [&>*]:shrink-0 [&>*]:whitespace-nowrap" role="group" aria-label="For a kind of site">
          <span className="mr-1 text-sm text-muted">For</span>
          <Chip active={ready && !kind} onClick={() => setKind(undefined)}>Any site</Chip>
          {KINDS.map((p) => <Chip key={p} active={ready && kind === p} onClick={() => setKind(kind === p ? undefined : p)}>{purposes[p].name}</Chip>)}
        </div>

        {/* Phones and tablets: shelves, search and groups across the top. */}
        <div className="lg:hidden">
          <div className="sticky top-16 z-20 -mx-5 mt-6 space-y-3 border-b border-line bg-paper/95 px-5 py-3 backdrop-blur-sm md:-mx-8 md:px-8">
            <div className="flex gap-1" role="tablist" aria-label="Shelves">
              {SHELVES.map(([id, label]) => (
                <button key={id} role="tab" aria-selected={shelf === id} onClick={() => go(id)} className="rounded-full px-4 py-2 text-sm aria-selected:bg-ink aria-selected:text-paper hover:bg-paper-2">
                  {label} <span className="tabular-nums opacity-60">{counts[id]}</span>
                </button>
              ))}
            </div>
            {search}
          </div>
          <div className="-mx-5 mt-4 flex gap-1.5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0 [&>*]:shrink-0 [&>*]:whitespace-nowrap">
            {shelf === 'sites'
              ? <>{FAMS.map((f) => <Chip key={f} active={fam === f} onClick={() => setFam(fam === f ? null : f)}>{families[f].name}</Chip>)}<Chip active={built} onClick={() => setBuilt(!built)}>Built and live only</Chip></>
              : <><Chip active={!group} onClick={() => pick(null)}>All</Chip>{groups.map((g) => <Chip key={g} active={group === g} onClick={() => pick(group === g ? null : g)}>{g}</Chip>)}</>}
          </div>
        </div>

        <motion.div key={`${shelf}|${group}|${fam}|${built}|${kind}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: 'easeOut' }} className="pt-6 lg:pt-8">
          {ready && shelf === 'sites' && <Sites q={q} kind={kind} fam={fam} built={built} onClear={() => { setFam(null); setBuilt(false) }} />}
          {ready && shelf !== 'sites' && <Shelf entries={found} groups={groups} group={group} onClear={() => { setGroup(null); setQ('') }} kind={kind}
            usual={shelf === 'sections' && kind ? new Set(purposes[kind].pages.flatMap((p) => p.sections ?? [])) : undefined} kindName={kind && purposes[kind].name} />}
        </motion.div>
      </div>
    </div>
    </>
  )
}

// ─── Sidebar (wide screens) ─────────────────────────────────────────────────

/** Like a documentation sidebar: one type size (14px) everywhere; shelves as plain rows with a chevron, each opening
 *  and closing on its own (not an accordion — any can be open at once); their groups indented on a thin guide line, the
 *  picked one in the accent with its stretch of that line lit, sliding to the next pick. A group in another shelf opens
 *  that shelf on it. */
const GROUPS_OF: Record<Exclude<Shelf, 'sites'>, [Entry[], string[]]> = { sections: [SECTION_ENTRIES, SECTION_GROUPS], effects: [EFFECT_ENTRIES, EFFECT_GROUPS] }
function Sidebar({ shelf, q, group, fam, built, setBuilt, open }: {
  shelf: Shelf; q: string; group: string | null; fam: FamilyId | null; built: boolean; setBuilt: (b: boolean) => void; open: (s: Shelf, g: string | null) => void
}) {
  const [shut, setShut] = useState<Set<Shelf>>(new Set()) // every shelf starts open; each closes and opens by itself
  const toggle = (s: Shelf) => setShut((x) => { const y = new Set(x); if (y.has(s)) y.delete(s); else y.add(s); return y })
  const itemsOf = (id: Shelf): [string, string | null, number][] => {
    if (id === 'sites') return [['All feels', null, SITES.length], ...FAMS.map((f): [string, string, number] => [families[f].name, f, SITES.filter((s) => s.families.includes(f)).length])]
    const [entries, groups] = GROUPS_OF[id]
    const found = shelf === id && q ? entries.filter((e) => e.text.includes(q.toLowerCase())) : entries
    return [['All', null, found.length], ...groups.map((g): [string, string, number] => [g, g, found.filter((e) => e.group === g).length])]
  }
  const picked = (id: Shelf, key: string | null) => shelf === id && (id === 'sites' ? fam === key : group === key)
  return (
    <aside className="hidden text-sm lg:sticky lg:top-24 lg:block lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto lg:pb-6 lg:pl-2 lg:pr-4 lg:[scrollbar-color:var(--color-line)_transparent] lg:[scrollbar-width:thin]" aria-label="Browse">
      <MotionConfig reducedMotion="user">
        <nav className="space-y-1" aria-label="Shelves">
          {SHELVES.map(([id, label]) => {
            const isOpen = !shut.has(id)
            return (
              <div key={id}>
                <button type="button" aria-expanded={isOpen} onClick={() => toggle(id)} className={`flex w-full items-center justify-between py-2 text-left transition-colors ${shelf === id ? 'font-medium text-ink' : 'text-ink-2 hover:text-ink'}`}>
                  {label}<ChevronRight size={15} className={`text-muted transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} aria-hidden />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.ul key="list" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
                      className="ml-1.5 overflow-hidden border-l border-line">
                      {itemsOf(id).map(([name, key, n]) => { const on = picked(id, key); return (
                        <li key={key ?? 'all'} className="relative">
                          {on && <motion.span layoutId="lit" className="absolute inset-y-1 -left-px w-0.5 rounded-full bg-pencil" transition={{ type: 'spring', stiffness: 500, damping: 40 }} />}
                          <button type="button" aria-pressed={on} disabled={!n} onClick={() => open(id, key)} className={`flex w-full items-center justify-between py-1.5 pl-4 pr-1 text-left transition-colors disabled:opacity-35 ${on ? 'text-pencil' : 'text-ink-2 hover:text-ink'}`}>
                            <span className="truncate">{name}</span><span className={`tabular-nums ${on ? 'text-pencil/70' : 'text-muted'}`}>{n}</span>
                          </button>
                        </li>
                      ) })}
                      {id === 'sites' && <li className="py-2 pl-4"><label className="flex items-center gap-2 text-ink-2"><Checkbox checked={built} onCheckedChange={(v) => { if (shelf !== 'sites') open('sites', fam); setBuilt(v === true) }} />Built and live only</label></li>}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </nav>
      </MotionConfig>
    </aside>
  )
}

// ─── Sites ──────────────────────────────────────────────────────────────────

const FAMS = (Object.keys(families) as FamilyId[]).filter((f) => SITES.some((s) => s.families.includes(f)))

function Sites({ q, kind, fam, built, onClear }: { q: string; kind?: PurposeId; fam: FamilyId | null; built: boolean; onClear: () => void }) {
  const list = SITES.filter((s) => (!fam || s.families.includes(fam)) && (!built || s.built) && (!q || s.text.includes(q.toLowerCase())))
  // The chosen kind of site first: those sites lead, the rest follow.
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
      {!list.length && <Empty onClear={onClear} />}
      {kind && !!mine.length && <h2 className="text-sm text-muted">For a {purposes[kind].name.toLowerCase()}</h2>}
      <ul className="mt-4 grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">{mine.map(card)}</ul>
      {!!rest.length && <><h2 className="mt-14 text-sm text-muted">Other sites</h2>
        <ul className="mt-4 grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">{rest.map(card)}</ul></>}
    </>
  )
}

// ─── Sections and effects ───────────────────────────────────────────────────

function Shelf({ entries, groups, group, onClear, kind, usual, kindName }: { entries: Entry[]; groups: string[]; group: string | null; onClear: () => void; kind?: PurposeId; usual?: Set<SectionId>; kindName?: string }) {
  const list = entries.filter((e) => !group || e.group === group)
  const shown = groups.filter((g) => list.some((e) => e.group === g))
  return (
    <>
      {!list.length && <Empty onClear={onClear} />}
      {shown.map((g, i) => (
        <section key={g} className={i ? 'mt-12' : ''} aria-labelledby={slug(g)}>
          <h2 id={slug(g)} className="flex items-baseline justify-between border-t border-ink pt-3 text-xl font-medium tracking-tight">{g}<span className="text-sm font-normal tabular-nums text-muted">{list.filter((e) => e.group === g).length}</span></h2>
          <ul className="mt-5 grid gap-x-5 gap-y-9 sm:grid-cols-2 xl:grid-cols-3">
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
      {/* A click on the picture collects it (the + is the button for keyboards and screen readers). Effects stay live
          under the pointer — a cursor or hover effect has to be tried to be seen. */}
      <div onClick={flip} className={`relative cursor-pointer overflow-hidden rounded-lg border bg-white transition-colors ${picked ? 'border-ink ring-1 ring-ink' : 'border-line group-hover:border-ink'}`}>
        <LazyMount className={`aspect-[16/10] overflow-hidden ${e.item.kind === 'effect' ? '' : 'pointer-events-none'}`}><ItemPreview item={e.item} look={look} /></LazyMount>
      </div>
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
