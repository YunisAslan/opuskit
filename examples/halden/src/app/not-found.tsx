import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { notFound } from '@/content/site'

// 404, in the same voice: the dark, one line, the way back.
export default function NotFound() {
  return (
    <main id="main" className="flex min-h-svh flex-col px-(--gutter)">
      <div className="mx-auto flex h-(--nav-h) w-full max-w-(--container) items-center border-b border-(--color-border)">
        <Link href="/" aria-label="Halden, home" className="flex min-h-11 items-center"><Logo /></Link>
      </div>
      <div className="mx-auto flex w-full max-w-(--container) flex-1 flex-col justify-end pb-24">
        <h1 className="type-display">{notFound.title}</h1>
        <p className="type-body mt-6 max-w-[34ch] text-(--color-muted) md:text-[1.125rem]">{notFound.line}</p>
        <Link href="/" className="btn btn-line mt-10 self-start">{notFound.action}</Link>
      </div>
    </main>
  )
}
