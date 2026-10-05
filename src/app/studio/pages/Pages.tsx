'use client'
// Pages (docs/plan-library.md): your site's name, then which pages it has — a start site's own, else the kind of site's —
// plus what is usually there and your own. On each page its parts, placed by the engine: move or remove only (the
// controls show on hover); new parts come from the Library with +.
import { ArrowDown, ArrowRight, ArrowUp, Plus, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
import { LazyMount } from '@/components/LazyMount'
import { SectionPreview } from '@/components/SectionPreview'
import { Chip } from '@/components/ui'
import { Input } from '@/components/ui/input'
import { purposes } from '@/data/taxonomy'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from '@/components/ui/select'
import { HeroPreview, heroName } from '@/app/kit/HeroPreview'
import { pageTypes, sections } from '@/data/patterns'
import { addPage, heroOf, isStandardPage, jobOf, missingPages, movePage, moveSection, pageGroups, removePage, removeSection } from '@/features/kit/plan'
import { itemKey, itemName, lookChoices, placement, siteName, startSite, type CollectionItem } from '@/features/library/collection'
import { planFromStudio, updateCollection, useCollection } from '@/lib/collection'
import { readPlan, updatePlan, usePlan, writePlan } from '@/lib/kit'
import { useHydrated } from '@/lib/store'
import type { KitPlan, PageTypeId, PurposeId } from '@/types/domain'
import { NeedsStudio, StepFrame, usePlanLook } from '../shared'

/** Why a collected thing is not on the pages. */
const WHY: Record<CollectionItem['kind'], string> = { site: 'not the start', section: 'removed', hero: 'another first screen is used', menu: 'another menu is used', footer: 'another footer is used', effect: 'no part here can carry it' }

export function Pages() {
  const ready = useHydrated()
  const plan = usePlan()
  const c = useCollection()
  const [pageId, setPageId] = useState<string>()
  const [own, setOwn] = useState('')
  const { recipe, pv } = usePlanLook(plan)
  if (!ready) return null
  if (plan.via !== 'studio' || !plan.pages.length) return <NeedsStudio />

  const page = plan.pages.find((p) => p.id === pageId) ?? plan.pages[0]
  const built = recipe.pages.find((p) => p.id === page.id)
  const collected = new Set(c.items.flatMap((i) => (i.kind === 'section' ? [i.id] : i.kind === 'hero' ? ['hero'] : [])))
  // Every change says what happened and can be undone.
  const change = (message: string, f: (p: KitPlan) => KitPlan) => { const before = readPlan(); writePlan(f(before)); toast(message, { action: { label: 'Undo', onClick: () => writePlan(before) } }) }
  const add = (type: PageTypeId, label?: string) => { let id = ''; updatePlan((p) => { const r = addPage(p, type, label); id = r.id; return r.plan }); setPageId(id) }
  const suggested = missingPages(plan).slice(0, 4)
  const sites = lookChoices(c), start = startSite(c)
  const where = placement(plan, c)
  // Name and sentence live on the plan and on the Collection, so a rebuild keeps them.
  const say = (k: 'name' | 'about', v: string) => { updatePlan((p) => ({ ...p, [k]: v || undefined })); updateCollection((x) => ({ ...x, [k]: v })) }
  // Kind of site or start site changed: the pages are rebuilt from the Collection.
  const rebuild = (patch: { purpose?: PurposeId; look?: (typeof sites)[number] }) => { updateCollection((x) => ({ ...x, ...patch })); planFromStudio() }
  const title = (
    <div className="max-w-3xl">
      <input value={plan.name ?? ''} maxLength={60} onChange={(e) => say('name', e.target.value)} placeholder="Your site’s name" aria-label="Your site’s name"
        className="display w-full border-b border-transparent bg-transparent text-[clamp(2.2rem,5vw,4rem)] outline-none placeholder:text-ink/25 focus:border-ink/20 focus-visible:outline-none" />
      <input value={plan.about ?? ''} maxLength={160} onChange={(e) => say('about', e.target.value)} placeholder="In one sentence: what you do, and for whom" aria-label="What the site is, in one sentence"
        className="mt-1 w-full border-b border-transparent bg-transparent text-lg text-ink-2 outline-none placeholder:text-muted/60 focus:border-ink/20 focus-visible:outline-none" />
      {!!c.items.length && (
        <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
          <span>From your Collection: <span className="text-ink">{where.placed.length} of {c.items.length}</span> on your pages.</span>
          {where.waiting.map((i) => <span key={itemKey(i)} className="rounded-full bg-paper-2 px-2.5 py-0.5 text-xs text-ink-2">{itemName(i)} — {WHY[i.kind]}</span>)}
        </p>
      )}
      {(!plan.purpose || sites.length > 1) && (
        <div className="mt-5 flex flex-wrap items-center gap-1.5">
          {!plan.purpose
            ? <><span className="mr-1 text-sm text-muted">What are you making?</span>{(Object.keys(purposes) as PurposeId[]).filter((k) => k !== 'other').map((k) => <Chip key={k} active={false} onClick={() => rebuild({ purpose: k })}>{purposes[k].name}</Chip>)}</>
            : <><span className="mr-1 text-sm text-muted">Start from</span>{sites.map((r) => <Chip key={r} active={r === start} onClick={() => rebuild({ look: r })}>{siteName(r)}</Chip>)}</>}
        </div>
      )}
    </div>
  )

  return (
    <StepFrame at="Pages" title={title} next={<Link href="/studio/style" className="btn btn-ink btn-sm"><span>Next<span className="hidden sm:inline">: Style</span></span><ArrowRight size={14} aria-hidden /></Link>}>
      <div className="mt-10 grid gap-8 lg:grid-cols-[18rem_1fr] lg:items-start">
        <div className="space-y-6 lg:sticky lg:top-36">
          <ol className="space-y-1" aria-label="Your pages">
            {plan.pages.map((p, i) => (
              <li key={p.id} className={`group flex items-center gap-1 rounded-lg pr-1 ${p.id === page.id ? 'bg-ink text-paper' : 'hover:bg-paper-2'}`}>
                <button type="button" onClick={() => setPageId(p.id)} aria-current={p.id === page.id ? 'page' : undefined} className="flex min-w-0 flex-1 items-center justify-between gap-2 px-3 py-2.5 text-left">
                  <span className="truncate font-medium">{p.label}</span><span className="text-xs tabular-nums opacity-60">{p.sections.length || ''}</span>
                </button>
                <span className="flex md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
                  <Icon label={`Move ${p.label} up`} disabled={i === 0} onClick={() => updatePlan((x) => movePage(x, p.id, -1))}><ArrowUp size={14} /></Icon>
                  <Icon label={`Move ${p.label} down`} disabled={i === plan.pages.length - 1} onClick={() => updatePlan((x) => movePage(x, p.id, 1))}><ArrowDown size={14} /></Icon>
                  <Icon label={`Remove ${p.label}`} disabled={plan.pages.length === 1} onClick={() => change(`Removed: ${p.label}`, (x) => removePage(x, p.id))}><X size={14} /></Icon>
                </span>
              </li>
            ))}
          </ol>

          {!!suggested.length && (
            <div>
              <p className="text-sm text-muted">Usually also there</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {suggested.map((s) => <button key={s.type} type="button" onClick={() => add(s.type, s.label)} className="inline-flex items-center gap-1 rounded-full border border-line bg-white px-3 py-1.5 text-sm hover:border-ink"><Plus size={13} aria-hidden />{s.label}</button>)}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Select value="" onValueChange={(v) => add(v as PageTypeId)}>
              <SelectTrigger className="w-full bg-white" aria-label="Add a page"><span className="inline-flex items-center gap-1.5 text-muted"><Plus size={14} aria-hidden />Add a page</span></SelectTrigger>
              <SelectContent className="max-h-80">
                {pageGroups.map((g) => <SelectGroup key={g.name}><SelectLabel>{g.name}</SelectLabel>{g.ids.map((id) => <SelectItem key={id} value={id}>{pageTypes[id].name}</SelectItem>)}</SelectGroup>)}
              </SelectContent>
            </Select>
            <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); if (own.trim()) { add('custom', own.trim().slice(0, 60)); setOwn('') } }}>
              <Input value={own} onChange={(e) => setOwn(e.target.value)} placeholder="Your own page" aria-label="Name of your own page" className="h-10 bg-white" />
              <button type="submit" disabled={!own.trim()} className="btn btn-line btn-sm shrink-0 disabled:opacity-40">Add</button>
            </form>
          </div>
        </div>

        <section aria-labelledby="page-title">
          <h2 id="page-title" className="text-2xl font-medium tracking-tight">{page.label}</h2>
          {isStandardPage(page.type) && !page.sections.length
            ? <p className="mt-4 rounded-lg bg-paper-2 px-4 py-3 text-ink-2">Written for you — a {pageTypes[page.type].name.toLowerCase()} page needs no parts.</p>
            : (
              <ol className="mt-4 space-y-2" aria-label={`Parts of ${page.label}`}>
                {page.sections.map((s, i) => (
                  <li key={s.key} className="group flex items-center gap-4 rounded-lg border border-line bg-white p-2 pr-3">
                    <LazyMount className="pointer-events-none aspect-[16/10] w-36 shrink-0 overflow-hidden rounded-md border border-line sm:w-44">
                      {s.id === 'hero' ? <HeroPreview plan={plan} id={heroOf(plan, s)} /> : <SectionPreview id={s.id} {...pv} tone={built?.sections[i]?.tone} media={built?.sections[i]?.media} variant={built?.sections[i]?.variant?.id} className="aspect-[16/10]" />}
                    </LazyMount>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium leading-snug">{s.id === 'hero' ? 'First screen' : jobOf(s.id)}</p>
                      <p className="mt-0.5 truncate text-sm text-muted">{s.id === 'hero' ? heroName(heroOf(plan, s)) : built?.sections[i]?.variant ? `${sections[s.id].name} — ${built.sections[i].variant!.name}` : sections[s.id].name}</p>
                      {collected.has(s.id) && <p className="mt-1 text-xs font-medium text-pencil">From your Collection</p>}
                    </div>
                    <span className="flex shrink-0 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
                      <Icon label="Move up" disabled={i === 0} onClick={() => updatePlan((x) => moveSection(x, page.id, s.key, -1))}><ArrowUp size={16} /></Icon>
                      <Icon label="Move down" disabled={i === page.sections.length - 1} onClick={() => updatePlan((x) => moveSection(x, page.id, s.key, 1))}><ArrowDown size={16} /></Icon>
                      <Icon label="Remove" onClick={() => change(`Removed from ${page.label}`, (x) => removeSection(x, page.id, s.key))}><X size={16} /></Icon>
                    </span>
                  </li>
                ))}
              </ol>
            )}
          <Link href="/library?shelf=sections" className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink"><Plus size={14} aria-hidden />More parts from the Library</Link>
        </section>
      </div>
    </StepFrame>
  )
}

function Icon({ label, disabled, onClick, children }: { label: string; disabled?: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button type="button" aria-label={label} title={label} disabled={disabled} onClick={onClick} className="grid size-8 place-items-center rounded-full hover:bg-black/10 disabled:pointer-events-none disabled:opacity-25">{children}</button>
}
