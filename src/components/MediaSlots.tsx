'use client'
// Your files (the recipe page's tab): one row per picture or film the site needs — straight from the shot list — with
// the owner's own files on it, an Add, and Samples: real photos and films from the sites built with OpusKit, those the
// owner took parts from first. A sample is fetched and kept exactly like an upload (lib/files.ts), placed on its part, so
// the Build Package puts it at the path the site uses; the owner's own file replaces it later.
import { Check, Film, Images, Loader2, Plus, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import samples from '@/data/example-media.generated.json'
import { siteName } from '@/features/library/collection'
import { deleteFile, getFile, storeSample, storeUpload } from '@/lib/files'
import type { AssetId, MediaPlan, RecipeSpec, Shot, UniversalRecipe, UploadedAsset } from '@/types/domain'

export type MediaPatch = { uploads: UploadedAsset[]; assets: AssetId[]; mediaPlan?: MediaPlan }
type Sites = Record<string, { photos: string[]; films: { src: string; poster?: string }[] }>
type Row = { key: string; where: string; shows: string; format: string; asset: AssetId; film: boolean; count?: number; samples: boolean; accept: string }
/** One file on the row: a film, a 3D scene, or a part that shows one picture — a new one replaces it. */
const isSingle = (row: Row) => row.film || row.asset === '3d' || row.count === 1

const SITES = samples as Sites
const fileOf = (url: string) => url.split('/').pop()!
/** "Home · Product grid; Shop · Product grid" → "Product grid — Home, Shop": a part on several pages, said once. */
const placeName = (where: string) => {
  const xs = where.split('; ').map((x) => x.split(' · '))
  return xs.length > 1 && xs.every((x) => x.length === 2 && x[1] === xs[0][1]) ? `${xs[0][1]} — ${xs.map((x) => x[0]).join(', ')}` : where
}
/** A row's own pictures in a sample site first: its files are named after the same part (productGrid-1.jpg,
 *  collection-salt-quay.jpg). */
const flat = (x: string) => x.toLowerCase().replace(/[^a-z0-9]/g, '')
const byPart = (key: string) => { const own = (f: string) => Number(flat(fileOf(f)).startsWith(flat(key))); return (a: string, b: string) => own(b) - own(a) }

/** The rows: every shot, then a 3D scene when the first screen is 3D. */
function rowsOf(r: UniversalRecipe): Row[] {
  const spec = r.metadata.spec
  const productSet = r.assetRequirements.some((a) => a.asset === 'product-photos' && a.set)
  const shots = r.media.shots.map((s: Shot): Row => {
    const film = s.kind === 'film'
    const asset: AssetId = film ? 'video' : productSet && (s.key === 'hero' || /product|collection|categor/i.test(s.key)) ? 'product-photos' : 'images'
    return { key: s.key, where: s.where, shows: s.shows, format: s.format, asset, film, count: film || s.per ? undefined : s.count, samples: true, accept: film ? 'video/*' : 'image/*' }
  })
  return spec.lead === '3d' ? [...shots, { key: '3d', where: 'First screen — 3D scene', shows: 'The scene on your first screen', format: 'GLB or GLTF, under 3 MB', asset: '3d', film: false, samples: false, accept: '.glb,.gltf' }] : shots
}

export function MediaSlots({ r, onChange }: { r: UniversalRecipe; onChange: (p: MediaPatch) => void }) {
  const spec = r.metadata.spec
  const uploads = useMemo(() => spec.uploads ?? [], [spec.uploads])
  const rows = useMemo(() => rowsOf(r), [r])
  const [open, setOpen] = useState<Row | null>(null)
  // Sites the owner took parts from come first in the samples (decision 52's "from Fennwood").
  const taken = useMemo(() => [...new Set((spec.taken ?? []).map((t) => t.site).filter((s) => s.startsWith('example:')).map((s) => s.slice(8)))].filter((s) => SITES[s]), [spec.taken])

  const commit = (next: UploadedAsset[], assets: AssetId[]) => onChange({ uploads: next, assets, ...(next.some((u) => u.asset === 'video' || u.asset === '3d') ? { mediaPlan: 'have' as const } : {}) })
  // A film or a 3D scene is one file: a new one replaces the old.
  const add = async (row: Row, made: Promise<UploadedAsset>[]) => {
    const metas = await Promise.all(made)
    const replaced = isSingle(row) ? mineOf(row) : []
    await Promise.all(replaced.filter((u) => u.fileId).map((u) => deleteFile(u.fileId!)))
    commit([...uploads.filter((u) => !replaced.includes(u)), ...metas], spec.assets.includes(row.asset) ? spec.assets : [...spec.assets, row.asset])
  }
  const remove = async (u: UploadedAsset) => {
    if (u.fileId) await deleteFile(u.fileId)
    const rest = uploads.filter((x) => x !== u)
    commit(rest, rest.some((x) => x.asset === u.asset) ? spec.assets : spec.assets.filter((a) => a !== u.asset))
  }
  function mineOf(row: Row) { return uploads.filter((u) => u.asset === row.asset && (row.film || row.asset === '3d' ? true : u.place === row.where)) }
  // Files added before parts had rows (no place): the build still uses them, in order.
  const loose = uploads.filter((u) => (u.asset === 'images' || u.asset === 'product-photos') && !rows.some((x) => x.where === u.place))

  return (
    <>
      <div className="border-l border-t border-line">
        {rows.map((row) => {
          const mine = mineOf(row)
          const single = isSingle(row)
          return (
            <div key={row.key} id={`slot-${row.key}`} className="grid border-b border-r border-line bg-white md:grid-cols-[15rem_minmax(0,1fr)]">
              <div className="border-b border-line px-4 py-3.5 md:border-b-0 md:border-r">
                <p className="label text-ink">{placeName(row.where)}</p>
                <p className="mt-1.5 text-xs text-muted">{row.format}</p>
              </div>
              <div className="flex flex-col gap-3 px-4 py-3.5">
                <p className="text-sm text-ink-2 first-letter:uppercase">{row.shows}</p>
                <div className="flex flex-wrap items-center gap-2">
                  {mine.map((u) => <Thumb key={u.fileId ?? u.name} u={u} onRemove={() => remove(u)} />)}
                  <label className="btn btn-line btn-sm cursor-pointer gap-1.5">
                    <Plus size={14} aria-hidden />{single && mine.length ? 'Replace' : 'Add yours'}
                    <input type="file" accept={row.accept} multiple={!single} className="sr-only"
                      onChange={(e) => { const fs = [...(e.target.files ?? [])].slice(0, single ? 1 : 24); e.target.value = ''; if (fs.length) add(row, fs.map((f) => storeUpload(f, row.asset, row.film || row.asset === '3d' ? undefined : { place: row.where }))) }} />
                  </label>
                  {row.samples && (
                    <button type="button" onClick={() => setOpen(row)} className="btn btn-line btn-sm gap-1.5">
                      {row.film ? <Film size={14} aria-hidden /> : <Images size={14} aria-hidden />}Samples
                    </button>
                  )}
                  {row.count && row.count > 1 && <span className="label ml-auto text-muted">{Math.min(mine.length, row.count)} / {row.count}</span>}
                </div>
              </div>
            </div>
          )
        })}
        {loose.length > 0 && (
          <div className="grid border-b border-r border-line bg-white md:grid-cols-[15rem_minmax(0,1fr)]">
            <div className="border-b border-line px-4 py-3.5 md:border-b-0 md:border-r"><p className="label text-ink">More photos</p><p className="mt-1.5 text-xs text-muted">Placed where the site still needs one</p></div>
            <div className="flex flex-wrap gap-2 px-4 py-3.5">{loose.map((u) => <Thumb key={u.fileId ?? u.name} u={u} onRemove={() => remove(u)} />)}</div>
          </div>
        )}
      </div>
      {open && <SamplePicker row={open} taken={taken} mine={mineOf(open)} onClose={() => setOpen(null)}
        onPick={(url, site) => add(open, [storeSample(url, open.asset, { ...(open.film ? {} : { place: open.where }), sample: siteName(`example:${site}`) })])}
        onRemove={remove} />}
    </>
  )
}

/** Real photos or films from the built sites, one site at a time: the ones the owner took parts from first. */
function SamplePicker({ row, taken, mine, onPick, onRemove, onClose }: { row: Row; taken: string[]; mine: UploadedAsset[]; onPick: (url: string, site: string) => Promise<void>; onRemove: (u: UploadedAsset) => Promise<void>; onClose: () => void }) {
  const sites = useMemo(() => {
    const has = (s: string) => (row.film ? SITES[s].films.length : SITES[s].photos.length) > 0
    return [...taken.filter(has), ...Object.keys(SITES).filter((s) => !taken.includes(s) && has(s))]
  }, [row.film, taken])
  const [site, setSite] = useState(sites[0])
  const [busy, setBusy] = useState<string>()
  // Films are few (one a site): all of them at once, named. Photos: one site at a time.
  const items = row.film ? sites.flatMap((s) => SITES[s].films.map((f) => ({ ...f, site: s })))
    : site ? [...SITES[site].photos].sort(byPart(row.key)).map((src) => ({ src, poster: undefined, site })) : []
  const pickedOf = (src: string, s: string) => mine.find((u) => u.sample === siteName(`example:${s}`) && u.name === fileOf(src))
  const toggle = async (src: string, s: string) => {
    if (busy) return
    setBusy(src)
    try { const had = pickedOf(src, s); await (had ? onRemove(had) : onPick(src, s)) } finally { setBusy(undefined) }
  }
  return (
    <Dialog open onOpenChange={(o) => { if (!o) onClose() }}>
      <DialogContent className="flex h-[min(90vh,52rem)] w-[min(96vw,72rem)] max-w-none flex-col gap-0 overflow-hidden p-0 sm:max-w-none">
        <div className="border-b border-line px-5 py-3.5 pr-14 md:px-6">
          <DialogTitle className="truncate text-xl font-medium tracking-tight">Samples for {placeName(row.where).split(' — ')[0].split(' · ').pop()}</DialogTitle>
          <DialogDescription className="line-clamp-2 text-sm text-muted first-letter:uppercase">{row.shows}</DialogDescription>
        </div>
        {/* One ruled cell per site, like the recipe tabs; the ones the owner took parts from are marked. */}
        {!row.film && <div role="tablist" aria-label="Sites" className="flex shrink-0 overflow-x-auto border-b border-line [scrollbar-width:none]">
          {sites.map((s) => (
            <button key={s} type="button" role="tab" aria-selected={s === site} onClick={() => setSite(s)}
              className={`relative flex h-11 shrink-0 items-center gap-2 border-r border-line px-4 text-sm transition-colors ${s === site ? 'bg-white text-ink after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-pencil' : 'text-ink-2 hover:bg-paper-2 hover:text-ink'}`}>
              {siteName(`example:${s}`)}{taken.includes(s) && <span className="label text-pencil">taken</span>}
            </button>
          ))}
        </div>}
        <ul className={`grid min-h-0 flex-1 auto-rows-min content-start gap-2 overflow-y-auto p-5 md:p-6 [scrollbar-color:var(--color-line)_transparent] [scrollbar-width:thin] ${row.film ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'}`}>
          {items.map((x) => {
            const picked = !!pickedOf(x.src, x.site)
            return (
              <li key={x.src}>
                <button type="button" aria-pressed={picked} onClick={() => toggle(x.src, x.site)} aria-label={`${picked ? 'Remove' : 'Use'} ${fileOf(x.src)}`}
                  className={`group relative block w-full overflow-hidden rounded-[3px] border bg-paper-2 transition-[border-color,box-shadow] ${row.film ? 'aspect-video' : 'aspect-[4/5]'} ${picked ? 'border-pencil ring-2 ring-pencil' : 'border-line hover:border-ink'}`}>
                  {row.film
                    ? <SampleFilm src={x.src} poster={x.poster} />
                    : <Image src={x.src} alt="" fill sizes="(min-width: 1024px) 14rem, 45vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.04]" />}
                  <span className={`absolute right-2 top-2 grid size-6 place-items-center rounded-full transition-colors ${picked ? 'bg-pencil text-paper' : 'bg-ink/70 text-[#fff] opacity-0 group-hover:opacity-100'}`}>
                    {busy === x.src ? <Loader2 size={13} className="animate-spin" aria-hidden /> : picked ? <Check size={13} aria-hidden /> : <Plus size={13} aria-hidden />}
                  </span>
                </button>
                {row.film && <p className="mt-1.5 flex items-center gap-2 text-sm text-ink-2">{siteName(`example:${x.site}`)}{taken.includes(x.site) && <span className="label text-pencil">taken</span>}</p>}
              </li>
            )
          })}
        </ul>
        <div className="flex items-center justify-between gap-3 border-t border-line bg-white px-5 py-3.5 md:px-6">
          <p className="text-sm text-ink-2">{mine.length ? `${mine.length} on this part` : 'Real pictures from sites built with OpusKit — a start until yours are ready.'}</p>
          <button type="button" onClick={onClose} className="btn btn-ink btn-sm">Done</button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

/** A film sample: its poster still, playing while the pointer is on it. */
function SampleFilm({ src, poster }: { src: string; poster?: string }) {
  return (
    <video src={src} poster={poster} muted loop playsInline preload="none" className="size-full object-cover"
      onPointerEnter={(e) => { if (!matchMedia('(prefers-reduced-motion: reduce)').matches) e.currentTarget.play().catch(() => {}) }}
      onPointerLeave={(e) => e.currentTarget.pause()} />
  )
}

function Thumb({ u, onRemove }: { u: UploadedAsset; onRemove: () => void }) {
  const [url, setUrl] = useState<string>()
  useEffect(() => {
    let live = true, made: string | undefined
    if (u.fileId && u.kind !== 'other') getFile(u.fileId).then((f) => { if (f && live) setUrl((made = URL.createObjectURL(f))) })
    return () => { live = false; if (made) URL.revokeObjectURL(made) }
  }, [u.fileId, u.kind])
  return (
    <span className="group relative block size-16 overflow-hidden rounded-[3px] border border-line bg-paper" title={u.sample ? `Sample from ${u.sample}` : u.name}>
      {url && u.kind === 'video' ? <video src={url} muted loop autoPlay playsInline className="size-full object-cover" />
        // eslint-disable-next-line @next/next/no-img-element -- local object URL of the user's own file
        : url ? <img src={url} alt={u.name} className="size-full object-cover" />
        : <span className="grid size-full place-items-center p-1 text-center text-[10px] leading-tight text-muted">{u.name}</span>}
      {u.sample && <span className="absolute inset-x-0 bottom-0 truncate bg-ink/75 px-1 py-0.5 text-[10px] text-[#fff]">{u.sample}</span>}
      <button type="button" onClick={onRemove} aria-label={`Remove ${u.name}`} className="absolute right-0.5 top-0.5 rounded-full bg-ink/80 p-1 text-paper opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"><X size={11} /></button>
    </span>
  )
}
