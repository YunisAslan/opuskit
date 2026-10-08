'use client'
// /studio/open?from=gen:id|example:slug|seed:slug — opens a finished recipe in Direction (decision 44).
// /studio/open?recipe=<base64url spec> — saves a recipe sent in a link, then shows it.
// Old /kit?from=… links are redirected here (next.config.ts).
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useRef } from 'react'
import exampleSpecs from '@/data/example-specs.generated.json'
import { examples } from '@/data/examples'
import { seedBySlug } from '@/data/recipes'
import { specFromChoices } from '@/features/kit/plan'
import { isValidSpec, normalizeSpec, specFromSeed } from '@/features/recipes/engine'
import { saveGeneration, toggleSaved, type Generation } from '@/features/recipes/library'
import { openInStudio } from '@/lib/collection'
import { KEYS, get } from '@/lib/store'
import type { RecipeSpec } from '@/types/domain'

function Open() {
  const params = useSearchParams(), router = useRouter(), done = useRef(false)
  useEffect(() => {
    if (done.current) return
    done.current = true
    // ?recipe=<base64url JSON spec>: a recipe handed over in a link — saved in this browser, then shown.
    const sent = params.get('recipe')
    if (sent) {
      try {
        const spec = JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(sent.replace(/-/g, '+').replace(/_/g, '/')), (ch) => ch.charCodeAt(0))))
        if (isValidSpec(spec)) { const gid = saveGeneration(normalizeSpec(spec)); if (!get<{ ref: string }[]>(KEYS.saved, []).some((s) => s.ref === `gen:${gid}`)) toggleSaved(`gen:${gid}`); return router.replace(`/result/${gid}`) }
      } catch { /* a broken link falls through to the Library */ }
      return router.replace('/library')
    }
    const [kind, id] = (params.get('from') ?? '').split(':')
    const gen = kind === 'gen' ? get<Record<string, Generation>>(KEYS.generations, {})[id]?.spec : undefined
    const spec = kind === 'seed' && seedBySlug[id] ? specFromSeed(seedBySlug[id])
      : kind === 'example' ? (exampleSpecs as Record<string, RecipeSpec>)[id] ?? specFromChoices(examples.find((e) => e.slug === id)?.choices ?? [])
      : isValidSpec(gen) ? gen : null
    if (!spec) return router.replace('/library')
    const name = kind === 'example' ? examples.find((e) => e.slug === id)?.title.split(/,| — /)[0] : kind === 'seed' ? seedBySlug[id].title : undefined
    openInStudio(spec, kind === 'gen' ? id : undefined, name ?? 'your saved recipe')
    router.replace('/studio/direction')
  }, [params, router])
  return <div className="min-h-screen" />
}

export default function OpenPage() {
  return <Suspense><Open /></Suspense>
}
