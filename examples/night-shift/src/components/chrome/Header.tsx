import Link from 'next/link'
import { Logo } from './Logo'
import { StatusLine } from './StatusLine'

// The logo alone at the top-left; the live status line at the top-right (under the logo on phones).
export function Header({ status }: { status: [string, string] }) {
  return (
    <header className="absolute inset-x-0 top-0 z-30 px-6 pt-5">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" aria-label="Night Shift, home" className="inline-flex min-h-11 w-fit items-center"><Logo /></Link>
        <StatusLine fallback={status} />
      </div>
    </header>
  )
}
