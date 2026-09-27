import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-32 text-center">
      <h1 className="display text-5xl">This page doesn&apos;t exist.</h1>
      <p className="mt-4 text-ink-2">The link may be old. Start from a recipe instead.</p>
      <div className="mt-8 flex justify-center gap-3"><Link href="/explore" className="btn btn-ink">Explore recipes</Link><Link href="/" className="btn btn-line">Home</Link></div>
    </div>
  )
}
