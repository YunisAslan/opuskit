'use client'
// Discover (docs/plan-library.md): sites only — whole sites are what people know how to judge. The + on a site asks
// what you like about it (decision 35): its whole look, or only its colours, lettering, first screen or movement; parts
// are taken on its own page. The Library is only browsing — no steps; Build my site (header, Collection) starts them.
// One row of filters above the cards: kinds of site, feels (several of each).
import { Maximize2 } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { useState } from 'react'
import { LazyMount } from '@/components/LazyMount'
import { Chip } from '@/components/ui'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { directions, families, purposes } from '@/data/taxonomy'
import { shelfSites, siteName, siteSpec } from '@/features/library/collection'
import { useHydrated } from '@/lib/store'
import type { FamilyId, PurposeId } from '@/types/domain'
import { SiteThumb, StartBlank, exampleOf } from './parts'
import { LikeButton } from './SiteTake'

const SITES = shelfSites.map((ref) => { const spec = siteSpec(ref)!; return { ref, spec, name: siteName(ref), families: directions[spec.direction].families } })
// Kinds and feels, related ones side by side; only those some site has (a filter never offers an empty list).
const has = (p: PurposeId) => SITES.some((s) => s.spec.purpose === p)
const KINDS = ([
  ['portfolio', 'agency', 'studio', 'personal-brand', 'experiment'],
  ['fashion', 'ecommerce', 'product', 'saas'],
  ['restaurant', 'hotel', 'real-estate', 'event'],
  ['blog', 'nonprofit', 'course', 'clinic', 'spa'],
] as PurposeId[][]).flat().filter(has)
const FEELS = (['quiet', 'minimal', 'editorial', 'organic', 'bold', 'raw', 'cinematic', 'experimental', 'futuristic'] as FamilyId[]).filter((f) => SITES.some((s) => s.families.includes(f)))

export function Library() {
  const ready = useHydrated()
  const [feels, setFeels] = useState<FamilyId[]>([])
  // Kinds of site: only a filter. Inspiration comes from any kind — a shop can take a restaurant's colours — so the
  // owner's own kind (You) is never set or read here.
  const [kinds, setKinds] = useState<PurposeId[]>([])
  const clear = () => { setKinds([]); setFeels([]) }

  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-10 md:px-8 md:pt-12">
      {/* One message: look at sites, take the pieces you like, your site is put together from them. */}
      <h1 className="display text-[clamp(2rem,3vw,2.75rem)]">Take what you like.</h1>
      <p className="mt-2 text-ink-2">Look through real sites and take the pieces you like — your site is put together from them.</p>

      {/* Two filters, both alike: a label, chips beside it to tick (several at once). */}
      <div className="relative mt-8 space-y-2.5">
        {(!!kinds.length || !!feels.length) && <button type="button" onClick={clear} className="absolute right-0 top-0 text-[13px] text-muted hover:text-ink">Clear filters</button>}
        <Multi label="Kind" options={KINDS} name={(k) => purposes[k as PurposeId].name} value={kinds} onChange={(v) => setKinds(v as PurposeId[])} />
        <Multi label="Feel" options={FEELS} name={(f) => families[f as FamilyId].name} value={feels} onChange={(v) => setFeels(v as FamilyId[])} />
      </div>

      <motion.div key={`${kinds.join()}|${feels.join()}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: 'easeOut' }} className="pt-10">
        {ready && <Sites kinds={kinds} feels={feels} onClear={clear} />}
      </motion.div>
      <p className="mt-16 border-t border-line pt-6 text-sm text-muted">Nothing here for you? <StartBlank /></p>
    </div>
  )
}

// ─── A filter: chips to tick ──────────────────────────────────────────────

function Multi({ label, options, name, value, onChange }: { label: string; options: string[]; name: (id: string) => string; value: string[]; onChange: (v: string[]) => void }) {
  const flip = (id: string) => onChange(value.includes(id) ? value.filter((x) => x !== id) : [...value, id])
  return (
    <div role="group" aria-labelledby={`f-${label}`} className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-4">
      <h2 id={`f-${label}`} className="label w-12 shrink-0 text-muted">{label}</h2>
      <div className="flex flex-wrap gap-1.5">
        {options.map((id) => <Chip key={id} small active={value.includes(id)} onClick={() => flip(id)}>{name(id)}</Chip>)}
      </div>
    </div>
  )
}

// ─── Sites ──────────────────────────────────────────────────────────────────

function Sites({ kinds, feels, onClear }: { kinds: PurposeId[]; feels: FamilyId[]; onClear: () => void }) {
  const list = SITES.filter((s) => (!kinds.length || kinds.includes(s.spec.purpose)) && (!feels.length || feels.some((f) => s.families.includes(f))))
  if (!list.length) return <div className="py-20 text-center"><p className="text-xl">Nothing matches all of that.</p><button type="button" className="link mt-3" onClick={onClear}>Clear filters</button></div>
  return (
    <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {list.map((s) => (
        <li key={s.ref} className="group relative">
          <Link href={`/library/sites/${s.ref.replace(':', '/')}`} className="block">
            <div className="overflow-hidden rounded-lg border border-line transition-[border-color,translate,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:border-ink group-hover:shadow-[0_16px_32px_-20px_rgb(0_0_0/.45)]"><LazyMount className="aspect-[16/10]"><SiteThumb site={s.ref} auto /></LazyMount></div>
            <h2 className="mt-3 text-lg font-medium tracking-tight group-hover:text-pencil">{s.name}</h2>
            <p className="mt-0.5 text-sm text-muted">{purposes[s.spec.purpose].name} · {directions[s.spec.direction].name}</p>
          </Link>
          <div className="absolute right-2.5 top-2.5 flex gap-1.5">
            <Expand site={s} />
            <LikeButton site={s.ref} />
          </div>
        </li>
      ))}
    </ul>
  )
}

/** The site large: its recording with controls, or — for a site not recorded yet — the live site itself. */
function Expand({ site: s }: { site: (typeof SITES)[number] }) {
  const [open, setOpen] = useState(false)
  const e = exampleOf(s.ref)
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} title="See it larger" aria-label={`See ${s.name} larger`}
        className="grid size-8 place-items-center rounded-full bg-white/90 text-ink shadow-sm backdrop-blur-sm transition-colors hover:bg-white"><Maximize2 size={14} aria-hidden /></button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex w-[min(94vw,72rem)] max-w-none flex-col gap-0 overflow-hidden p-0 sm:max-w-none">
          <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3 pr-14">
            <div className="min-w-0">
              <DialogTitle className="truncate text-lg font-medium tracking-tight">{s.name}</DialogTitle>
              <DialogDescription className="text-sm text-muted">{purposes[s.spec.purpose].name} · {directions[s.spec.direction].name}</DialogDescription>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link href={`/library/sites/${s.ref.replace(':', '/')}`} className="hidden h-9 items-center rounded-[3px] px-3.5 text-sm text-ink-2 hover:bg-paper-2 hover:text-ink sm:inline-flex">See its parts</Link>
              <LikeButton site={s.ref} label="I like…" className="h-9 px-3.5" />
            </div>
          </div>
          {e?.clip
            ? <video src={e.clip} poster={`/examples/${e.slug}.jpg`} muted loop playsInline autoPlay controls className="block max-h-[78vh] w-full bg-black object-contain" />
            : e?.livePath ? <iframe src={e.livePath} title={`${s.name}, the live site`} className="block h-[78vh] w-full bg-white" />
            : <SiteThumb site={s.ref} />}
        </DialogContent>
      </Dialog>
    </>
  )
}
