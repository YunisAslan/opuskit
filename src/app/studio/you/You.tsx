'use client'
// You — the first step (docs/plan-library.md decisions 35, 38): what the site is, in the owner's own words — a name, one
// sentence and what they are making (six plain answers, `OFFERS`, read from the sentence; the sentence names the exact
// kind inside the one picked). What visitors should do is read from the pages (`inferGoal`).
// A site liked only for its colours never decides what the owner is.
// Everything the site is — its pages, its parts, its words — comes from here; the sites they like only lend a look.
import { ArrowRight, BookOpen, HandHeart, MapPin, MonitorSmartphone, PenTool, ShoppingBag, type LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { OFFERS, OFFER_IDS, kindFor, offerOf, purposeFrom, type OfferId } from '@/features/library/inspire'
import { updateCollection, useCollection } from '@/lib/collection'
import { updatePlan, usePlan } from '@/lib/plan'
import { useHydrated } from '@/lib/store'
import { StepFrame } from '../shared'

// Each answer gets a plain sign, no pictures of other sites (they read as "your site will look like this").
const ICON: Record<OfferId, LucideIcon> = { work: PenTool, service: HandHeart, things: ShoppingBag, place: MapPin, online: MonitorSmartphone, words: BookOpen }

const NEXT = [
  ['02', 'Direction', 'What you took in the Library, mixed into your brand. Change any look, colour or lettering and see your brand change with it.'],
  ['03', 'Recipe', 'Download it for your AI tool, which builds the site. Your photos go in there too.'],
] as const

export function You() {
  const ready = useHydrated()
  const c = useCollection()
  const plan = usePlan()
  const router = useRouter()
  if (!ready) return null
  const guess = purposeFrom(c.about)
  const kind = c.purpose ?? guess, offer = offerOf(kind, c.offer)
  // Words live on the Collection (and on a direction already picked), so nothing typed is lost either way.
  const say = (k: 'name' | 'about', v: string) => {
    updateCollection((x) => ({ ...x, [k]: v }))
    if (plan.via === 'studio') updatePlan((p) => ({ ...p, [k]: v.trim() || undefined }))
  }
  const done = !!c.name?.trim() && !!kind
  const next = () => {
    if (!done) return
    updateCollection((x) => ({ ...x, purpose: kind }))
    router.push('/studio/direction')
  }
  const nextLabel = 'Make it yours'

  return (
    <StepFrame at="You" title={<><p className="label mb-4">Step 1 · Only yours</p><h1 className="display text-[clamp(2.2rem,4vw,3.4rem)]">Tell us about your site.</h1></>}
      next={<button type="button" onClick={next} disabled={!done} className="btn btn-ink btn-sm disabled:opacity-40"><span>Next<span className="hidden sm:inline">: {nextLabel}</span></span><ArrowRight size={14} aria-hidden /></button>}>
      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14">
        <div className="divide-y divide-line border border-line bg-white">
          <Field label="Name" htmlFor="you-name">
            <Input id="you-name" value={c.name ?? ''} maxLength={60} onChange={(e) => say('name', e.target.value)} placeholder="Lind Ceramics" autoFocus
              className="h-14 rounded-[2px] border-0 bg-transparent px-4 text-[clamp(1.5rem,2.4vw,2rem)]! font-medium tracking-tight shadow-none focus-visible:ring-0" />
          </Field>
          <Field label="In one sentence" htmlFor="you-about" hint={`${(c.about ?? '').length} / 160`}>
            <Textarea id="you-about" value={c.about ?? ''} maxLength={160} rows={2} onChange={(e) => say('about', e.target.value)} placeholder="What you do, and for whom — e.g. Small-batch tableware, thrown and glazed by hand in my studio."
              className="min-h-0 resize-none rounded-[2px] border-0 bg-transparent px-4 py-3 text-lg! leading-snug shadow-none focus-visible:ring-0" />
          </Field>
          <Field label="What are you making?">
            {/* Six plain answers; the sentence names the exact kind inside the one picked. */}
            <div role="radiogroup" aria-label="What are you making?" className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {OFFER_IDS.map((o) => {
                const on = offer === o, Icon = ICON[o]
                return (
                  <button key={o} type="button" role="radio" aria-checked={on} onClick={() => updateCollection((x) => ({ ...x, offer: o, purpose: kindFor(o, x.about) }))}
                    className={`flex items-center gap-3 rounded-[3px] border px-3.5 py-3 text-left transition-colors ${on ? 'border-ink bg-ink text-paper' : 'border-line bg-white hover:border-ink'}`}>
                    <Icon size={18} strokeWidth={1.6} className={`shrink-0 ${on ? 'text-paper' : 'text-muted'}`} aria-hidden />
                    <span className="min-w-0"><span className="block text-sm font-medium">{OFFERS[o].name}</span><span className={`block truncate text-xs ${on ? 'text-paper/70' : 'text-muted'}`}>{OFFERS[o].line}</span></span>
                  </button>
                )
              })}
            </div>
          </Field>
        </div>

        <aside aria-labelledby="next-steps">
          <p id="next-steps" className="label">What happens next</p>
          <ol className="mt-3 border-t border-line">
            {NEXT.map(([n, name, text]) => (
              <li key={n} className="grid grid-cols-[2.5rem_1fr] gap-x-3 border-b border-line py-4">
                <span className="label tabular-nums text-muted">{n}</span>
                <span><span className="block font-medium">{name}</span><span className="mt-1 block text-sm leading-relaxed text-ink-2">{text}</span></span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm text-muted">{c.items.length ? <>{c.items.length} taken in the Library. </> : 'Nothing taken yet — your site then starts from its kind. '}<Link href="/library" className="link text-ink-2">{c.items.length ? 'Take more' : 'Open the Library'}</Link></p>
          {!done && <p className="mt-2 text-sm text-muted">{!c.name?.trim() ? 'Give your site a name to go on.' : 'Say what you offer to go on.'}</p>}
        </aside>
      </div>
    </StepFrame>
  )
}

/** One ruled row of the form: its label in the head, the field under it. */
function Field({ label, htmlFor, hint, children }: { label: string; htmlFor?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="px-5 py-4 md:px-6">
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label htmlFor={htmlFor} className="label">{label}</label>
        {hint && <span className="label text-pencil">{hint}</span>}
      </div>
      {children}
    </div>
  )
}

