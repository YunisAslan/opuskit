'use client'
// Bytes for files the user uploads during creation. RecipeSpec/localStorage only ever hold a fileId
// (a File can't survive JSON.stringify), so the actual video/image data lives here instead.
// ponytail: single flat IndexedDB store, no eviction — fine at MVP scale, add a size cap/LRU if it matters later.

import type { AssetId, UploadedAsset } from '@/types/domain'

const DB = 'opuskit-files'
const STORE = 'files'

function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1)
    req.onupgradeneeded = () => req.result.createObjectStore(STORE)
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

export async function putFile(id: string, file: File) {
  try {
    const db = await open()
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite')
      tx.objectStore(STORE).put(file, id)
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    })
  } catch { /* private browsing / unsupported — upload still works, just isn't retained for the zip */ }
}

export async function getFile(id: string): Promise<File | null> {
  try {
    const db = await open()
    return await new Promise((resolve, reject) => {
      const req = db.transaction(STORE, 'readonly').objectStore(STORE).get(id)
      req.onsuccess = () => resolve((req.result as File | undefined) ?? null)
      req.onerror = () => reject(req.error)
    })
  } catch { return null }
}

export async function deleteFile(id: string) {
  try { const db = await open(); db.transaction(STORE, 'readwrite').objectStore(STORE).delete(id) } catch { /* nothing to clean up */ }
}

/** Stores the bytes and returns the reference plus what we could read (size, duration). */
export async function storeUpload(file: File, asset: AssetId, extra?: Pick<UploadedAsset, 'place' | 'sample'>): Promise<UploadedAsset> {
  const fileId = crypto.randomUUID().slice(0, 12)
  await putFile(fileId, file) // the actual bytes; UploadedAsset (below) only ever holds this reference, never the File itself
  const base: UploadedAsset = { asset, name: file.name, kind: file.type.startsWith('video') ? 'video' : file.type.startsWith('image') ? 'image' : 'other', fileId, ...extra }
  const url = URL.createObjectURL(file)
  try {
    if (base.kind === 'image') {
      const i = new Image(); i.src = url; await i.decode()
      return { ...base, width: i.naturalWidth, height: i.naturalHeight }
    }
    if (base.kind === 'video') {
      const v = document.createElement('video'); v.preload = 'metadata'; v.src = url
      await new Promise((ok, fail) => { v.onloadedmetadata = ok; v.onerror = fail })
      return { ...base, width: v.videoWidth, height: v.videoHeight, duration: v.duration }
    }
  } catch { /* unreadable → keep name + bytes, skip dimensions */ } finally { URL.revokeObjectURL(url) }
  return base
}

/** A built example's photo or film, fetched and kept like an upload — so it goes into the Build Package the same way. */
export async function storeSample(url: string, asset: AssetId, extra: Pick<UploadedAsset, 'place' | 'sample'>): Promise<UploadedAsset> {
  const blob = await (await fetch(url)).blob()
  return storeUpload(new File([blob], url.split('/').pop()!, { type: blob.type }), asset, extra)
}
