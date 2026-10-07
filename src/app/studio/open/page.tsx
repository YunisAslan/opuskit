'use client'
// /studio/open?from=gen:id|example:slug|seed:slug&to=brand|pages — opens a finished recipe in the building steps.
// Old /kit?from=… links are redirected here (next.config.ts).
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useRef } from 'react'
import exampleSpecs from '@/data/example-specs.generated.json'
import { examples } from '@/data/examples'
import { seedBySlug } from '@/data/recipes'
import { specFromChoices } from '@/features/kit/plan'
import { isValidSpec, specFromSeed } from '@/features/recipes/engine'
import type { Generation } from '@/features/recipes/library'
import { openInStudio } from '@/lib/collection'
import { KEYS, get } from '@/lib/store'
import type { RecipeSpec } from '@/types/domain'

function Open() {
  const params = useSearchParams(), router = useRouter(), done = useRef(false)
  useEffect(() => {
    if (done.current) return
    done.current = true
    const [kind, id] = (params.get('from') ?? '').split(':')
    const gen = kind === 'gen' ? get<Record<string, Generation>>(KEYS.generations, {})[id]?.spec : undefined
    const spec = kind === 'seed' && seedBySlug[id] ? specFromSeed(seedBySlug[id])
      : kind === 'example' ? (exampleSpecs as Record<string, RecipeSpec>)[id] ?? specFromChoices(examples.find((e) => e.slug === id)?.choices ?? [])
      : isValidSpec(gen) ? gen : null
    if (!spec) return router.replace('/library')
    openInStudio(spec, kind === 'gen' ? id : undefined)
    router.replace(params.get('to') === 'brand' ? '/studio/brand' : '/studio/pages')
  }, [params, router])
  return <div className="min-h-screen" />
}

export default function OpenPage() {
  return <Suspense><Open /></Suspense>
}
