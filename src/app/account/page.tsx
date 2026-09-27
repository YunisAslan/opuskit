'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { PageIntro } from '@/components/ui'
import { auth, useUser } from '@/features/auth'
import { useAccess } from '@/features/billing'
import { resolveRef, useGenerations, useSaved } from '@/features/recipes/library'
import { useHydrated } from '@/lib/store'

export default function AccountPage() {
  const user = useUser()
  const router = useRouter()
  const gens = useGenerations()
  const saved = useSaved()
  const { entitlements } = useAccess('')
  const hydrated = useHydrated()
  if (!hydrated) return <div className="min-h-screen" />

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-5 py-32 text-center">
        <h1 className="display text-4xl">You&apos;re not logged in.</h1>
        <p className="mt-3 text-ink-2">Log in to see your recipes and purchases.</p>
        <div className="mt-8 flex justify-center gap-3"><Link href="/login" className="btn btn-ink">Log in</Link><Link href="/signup" className="btn btn-line">Create account</Link></div>
      </div>
    )
  }

  const created = Object.entries(gens).sort((a, b) => b[1].createdAt - a[1].createdAt)
  return (
    <>
      <PageIntro title={`Hello, ${user.name}.`}>{user.email}</PageIntro>
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 pb-24 md:grid-cols-3 md:px-8">
        <section aria-labelledby="mine" className="md:col-span-2">
          <h2 id="mine" className="border-t border-ink pt-3 text-2xl font-medium tracking-tight">Your recipes</h2>
          {created.length === 0 ? <p className="mt-4 text-ink-2">None yet. <Link href="/create" className="link">Create your first recipe</Link>.</p> : (
            <ul className="mt-4 divide-y divide-line">
              {created.map(([id]) => { const hit = resolveRef(`gen:${id}`, gens); return hit && <li key={id}><Link href={hit.href} className="flex justify-between py-3 hover:text-pencil"><span>{hit.recipe.title}</span><span className="text-sm text-muted">{new Date(gens[id].createdAt).toLocaleDateString()}</span></Link></li> })}
            </ul>
          )}
          <p className="mt-6 text-sm text-muted">{saved.length} saved · <Link href="/saved" className="link">View saved</Link></p>
        </section>
        <section aria-labelledby="purchases">
          <h2 id="purchases" className="border-t border-ink pt-3 text-2xl font-medium tracking-tight">Purchases</h2>
          {entitlements.length === 0 ? <p className="mt-4 text-ink-2">No purchases yet. <Link href="/pricing" className="link">See pricing</Link>.</p> : (
            <ul className="mt-4 space-y-2">
              {entitlements.map((e) => <li key={e}>{e === 'library' ? 'The Library' : resolveRef(e.replace(/^recipe:/, ''), gens)?.recipe.title ?? e}</li>)}
            </ul>
          )}
          <button type="button" className="btn btn-line btn-sm mt-10" onClick={() => { auth.signOut(); router.push('/') }}>Log out</button>
        </section>
      </div>
    </>
  )
}
