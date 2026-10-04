// Static site: no server of our own. Each form posts its fields as JSON to NEXT_PUBLIC_FORM_ENDPOINT (any form
// service — Formspree, Basin, a Google Apps Script) when it's set at build time.
// ponytail: with no endpoint set, submissions are only confirmed on screen, not stored — set the env var before launch.
export async function submitForm(form: string, data: Record<string, string | boolean>) {
  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT
  if (!endpoint) return
  const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ form, ...data }) })
  if (!res.ok) throw new Error(`Form endpoint answered ${res.status}`)
}

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
