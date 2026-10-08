'use client'
// The user's own files — logo, first-screen video or 3D, photos — added or replaced in place. Used by the kit (Pages →
// Your files) and by the recipe page (Your files tab), so there is one way to add media. Bytes stay in this browser
// (lib/files.ts); the spec keeps only their names and sizes, and the build kit puts them at the paths the site uses.
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { deleteFile, getFile, storeUpload } from '@/lib/files'
import type { AssetId, MediaPlan, RecipeSpec, UploadedAsset } from '@/types/domain'

export type MediaPatch = { uploads: UploadedAsset[]; assets: AssetId[]; mediaPlan?: MediaPlan }
type Slot = { asset: AssetId; label: string; line: string; accept: string; many: boolean; show: (s: RecipeSpec) => boolean }

export const SLOTS: Slot[] = [
  // No logo slot: it is never asked for — without one the builder sets the name as a wordmark (decision 47).
  { asset: 'video', label: 'First-screen video', line: 'The film on your first screen. Send the original export, not a web copy.', accept: 'video/*', many: false, show: (s) => s.lead === 'video' },
  { asset: '3d', label: '3D scene', line: 'GLB or GLTF for your first screen.', accept: '.glb,.gltf', many: false, show: (s) => s.lead === '3d' },
  { asset: 'product-photos', label: 'Product photos', line: 'Front, three-quarter and a detail of each product.', accept: 'image/*', many: true, show: (s) => s.lead === 'product' || s.purpose === 'ecommerce' || s.purpose === 'product' },
  { asset: 'images', label: 'Photos', line: 'Work, people, places and details for the rest of the site.', accept: 'image/*', many: true, show: () => true },
]

/** The first-screen file this recipe needs and doesn't have yet (video or 3D), if any. */
export const missingLeadFile = (s: RecipeSpec) => SLOTS.find((x) => (x.asset === 'video' || x.asset === '3d') && x.show(s) && !(s.uploads ?? []).some((u) => u.asset === x.asset))

export function MediaSlots({ spec, onChange, columns = 'lg:grid-cols-2' }: { spec: RecipeSpec; onChange: (p: MediaPatch) => void; columns?: string }) {
  const uploads = spec.uploads ?? []
  const add = async (asset: AssetId, many: boolean, files: FileList | null) => {
    if (!files?.length) return
    const metas = await Promise.all([...files].slice(0, many ? 24 : 1).map((f) => storeUpload(f, asset)))
    const replaced = many ? [] : uploads.filter((u) => u.asset === asset)
    await Promise.all(replaced.filter((u) => u.fileId).map((u) => deleteFile(u.fileId!)))
    onChange({
      uploads: [...uploads.filter((u) => !replaced.includes(u)), ...metas],
      assets: spec.assets.includes(asset) ? spec.assets : [...spec.assets, asset],
      ...(asset === 'video' || asset === '3d' ? { mediaPlan: 'have' as const } : {}),
    })
  }
  const remove = async (u: UploadedAsset) => {
    if (u.fileId) await deleteFile(u.fileId)
    const rest = uploads.filter((x) => x !== u)
    onChange({ uploads: rest, assets: rest.some((x) => x.asset === u.asset) ? spec.assets : spec.assets.filter((a) => a !== u.asset) })
  }
  return (
    <div className={`grid gap-4 ${columns}`}>
      {SLOTS.filter((s) => s.show(spec)).map((s) => {
        const mine = uploads.filter((u) => u.asset === s.asset)
        return (
          <div key={s.asset} id={`slot-${s.asset}`} className="rounded-lg border border-line bg-white p-5">
            <div className="flex items-start justify-between gap-3">
              <div><p className="font-medium">{s.label}</p><p className="mt-0.5 text-sm text-muted">{s.line}</p></div>
              <label className="btn btn-line btn-sm shrink-0 cursor-pointer">
                {mine.length && !s.many ? 'Replace' : 'Add'}
                <input type="file" accept={s.accept} multiple={s.many} className="sr-only" onChange={(e) => { add(s.asset, s.many, e.target.files); e.target.value = '' }} />
              </label>
            </div>
            {mine.length > 0
              ? <ul className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">{mine.map((u) => <Thumb key={u.fileId ?? u.name} u={u} onRemove={() => remove(u)} />)}</ul>
              : <p className="mt-4 rounded-md border border-dashed border-line p-4 text-center text-sm text-muted">Nothing yet — the build kit uses a clearly marked placeholder.</p>}
          </div>
        )
      })}
    </div>
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
    <li className="group relative aspect-square overflow-hidden rounded-md border border-line bg-paper">
      {url && u.kind === 'video' ? <video src={url} muted loop autoPlay playsInline className="h-full w-full object-cover" />
        // eslint-disable-next-line @next/next/no-img-element -- local object URL of the user's own file
        : url ? <img src={url} alt={u.name} className="h-full w-full object-cover" />
        : <span className="grid h-full place-items-center p-2 text-center text-xs text-muted">{u.name}</span>}
      <button type="button" onClick={onRemove} aria-label={`Remove ${u.name}`} className="absolute right-1 top-1 rounded-full bg-ink/80 p-1 text-paper opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"><X size={12} /></button>
    </li>
  )
}
