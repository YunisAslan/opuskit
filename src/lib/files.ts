'use client'
// Bytes for files the user uploads during creation. RecipeSpec/localStorage only ever hold a fileId
// (a File can't survive JSON.stringify), so the actual video/image data lives here instead.
// ponytail: single flat IndexedDB store, no eviction — fine at MVP scale, add a size cap/LRU if it matters later.

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
